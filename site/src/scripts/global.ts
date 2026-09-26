import { matchesQuery } from '../lib/search';

const themeButton = document.querySelector<HTMLButtonElement>('.theme-toggle');
function syncThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton?.setAttribute('aria-label', dark ? '切换浅色模式' : '切换深色模式');
}
syncThemeButton();
themeButton?.addEventListener('click',()=>{
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('agentic-infra-theme', theme); } catch { /* Theme still works without storage. */ }
  syncThemeButton();
  renderDiagrams();
});

type SearchItem = {title:string;description:string;category:string;url:string;keywords:string};
const items: SearchItem[] = JSON.parse(document.querySelector('#search-data')?.textContent || '[]');
const dialog = document.querySelector<HTMLDialogElement>('#search-dialog')!;
const input = document.querySelector<HTMLInputElement>('#global-search')!;
const results = document.querySelector('#search-results')!;
let previousFocus: HTMLElement | null = null;
function search() {
  const filtered = items.filter(item=>matchesQuery(`${item.title} ${item.description} ${item.category} ${item.keywords}`,input.value));
  const shown = filtered.slice(0,12);
  results.replaceChildren();
  shown.forEach(item=>{
    const link=document.createElement('a');link.href=item.url;link.className='search-result';
    const category=document.createElement('span');category.className='search-result-category';category.textContent=item.category;
    const title=document.createElement('strong');title.textContent=item.title;
    const description=document.createElement('p');description.textContent=item.description;
    link.append(category,title,description);results.append(link);
  });
  document.querySelector('#search-status')!.textContent = filtered.length ? `找到 ${filtered.length} 条结果${filtered.length>12?' · 显示前 12 条':''}` : '没有匹配结果，试试其他关键词';
  if (!shown.length) { const message=document.createElement('p');message.className='search-empty';message.textContent='可以试试「沙箱」「memory」或「MCP」。';results.append(message); }
}
function openSearch() { previousFocus = document.activeElement as HTMLElement; dialog.showModal(); search(); input.focus(); }
document.querySelectorAll('[data-search-open]').forEach(button=>button.addEventListener('click',openSearch));
document.querySelector('[data-search-close]')?.addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>previousFocus?.focus());
dialog.addEventListener('click',(event)=>{const rect=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom))dialog.close();});
input.addEventListener('input',search);
dialog.addEventListener('keydown',event=>{
  const links=[...results.querySelectorAll<HTMLAnchorElement>('a')];
  const at=links.indexOf(document.activeElement as HTMLAnchorElement);
  if(event.key==='ArrowDown'){event.preventDefault();links[Math.min(at+1,links.length-1)]?.focus();}
  if(event.key==='ArrowUp'){event.preventDefault();if(at<=0)input.focus();else links[at-1]?.focus();}
  if(event.key==='Enter'&&document.activeElement===input){event.preventDefault();links[0]?.click();}
});
document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();if(dialog.open)dialog.close();else openSearch();}});

const diagramBlocks = [...document.querySelectorAll<HTMLElement>('pre > code.language-mermaid')].map(code=>({pre:code.parentElement!,source:code.textContent || '',output:null as HTMLElement|null}));
let diagramVersion = 0;
async function renderDiagrams() {
  if(!diagramBlocks.length)return;
  const version = ++diagramVersion;
  try {
    const { default: mermaid } = await import('mermaid');
    if (version !== diagramVersion) return;
    mermaid.initialize({startOnLoad:false,securityLevel:'strict',theme:document.documentElement.dataset.theme==='dark'?'dark':'neutral',fontFamily:'system-ui, sans-serif'});
    for (const [index, block] of diagramBlocks.entries()) {
      const {svg} = await mermaid.render(`infra-diagram-${version}-${index}`,block.source);
      if(version!==diagramVersion)return;
      const output=block.output||document.createElement('div');output.className='mermaid-diagram';output.innerHTML=svg;
      output.setAttribute('role','img');
      output.setAttribute('aria-label',output.querySelector('svg > title')?.textContent || '文中示意图');
      if(!block.output){block.pre.after(output);block.output=output;}block.pre.hidden=true;
    }
  } catch { /* Keep the original diagram source readable if rendering fails. */ }
}
renderDiagrams();
