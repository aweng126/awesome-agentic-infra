import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';

const root = path.resolve('dist');
const base = '/awesome-agentic-infra/';
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]))).flat();
}
const files = await walk(root);
const pages = files.filter(file=>file.endsWith('.html'));
let checkedLinks = 0;
const documents = new Map();
for (const page of pages) documents.set(page,parseHTML(await readFile(page,'utf8')).document);
const problems=[];
for(const [file,document] of documents){
  const relative=path.relative(root,file);
  if(document.querySelectorAll('h1').length!==1)problems.push(`${relative}: expected one H1`);
  if(!document.querySelector('main#main-content'))problems.push(`${relative}: missing main target`);
  const pagePath=base+relative.replace(/index\.html$/,'');
  for(const element of document.querySelectorAll('a[href],link[href],script[src],img[src]')){
    const raw=element.getAttribute('href')||element.getAttribute('src');
    if(!raw||/^(https?:|mailto:|data:)/.test(raw))continue;
    const url=new URL(raw,`https://aweng126.github.io${pagePath}`);
    if(!url.pathname.startsWith(base)){problems.push(`${relative}: URL outside project base: ${raw}`);continue;}
    let target=path.join(root,decodeURIComponent(url.pathname.slice(base.length)));
    try {if((await stat(target)).isDirectory())target=path.join(target,'index.html');await stat(target);}
    catch{problems.push(`${relative}: missing local target: ${raw}`);continue;}
    if(url.hash&&target.endsWith('.html')){
      const doc=documents.get(target);
      if(!doc?.getElementById(decodeURIComponent(url.hash.slice(1))))problems.push(`${relative}: missing anchor: ${raw}`);
    }
    checkedLinks++;
  }
}
const explorer=documents.get(path.join(root,'resources/index.html'));
assert.ok(explorer,'Resource explorer must be generated');
const resourceFiles=await readdir('../resources');
assert.equal(pages.filter(p=>path.relative(root,p).startsWith(`topics${path.sep}`)).length,resourceFiles.filter(f=>f.endsWith('.md')).length,'Each source topic needs a page');
const sourceCount=(await Promise.all(resourceFiles.filter(f=>f.endsWith('.md')).map(f=>readFile(`../resources/${f}`,'utf8')))).reduce((total,text)=>total+[...text.split('## Related Topics')[0].matchAll(/^- \[[^\]]+\]\(https:\/\//gm)].length,0);
assert.equal(explorer.querySelectorAll('.resource-card').length,sourceCount,'Every source resource must appear in the explorer');
assert.deepEqual(problems,[],'Generated site link/semantic checks');
console.log(`Verified ${pages.length} HTML pages, ${checkedLinks} internal links/assets, and ${sourceCount} resource cards.`);
