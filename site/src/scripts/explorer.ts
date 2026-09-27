import { matchesResource, searchRank } from '../lib/search';
import { parseReadingContext, readingContextKey } from '../lib/reading-context';

const explorer = document.querySelector<HTMLElement>('[data-resource-explorer]');
if (explorer) {
  const input = document.querySelector<HTMLInputElement>('#resource-search')!;
  const topicButtons = [...explorer.querySelectorAll<HTMLButtonElement>('button[data-topic]')];
  const typeButtons = [...explorer.querySelectorAll<HTMLButtonElement>('button[data-type]')];
  const cards = [...explorer.querySelectorAll<HTMLElement>('.resource-card')];
  const list = explorer.querySelector('.resource-list');
  const reset = document.querySelector<HTMLButtonElement>('#reset-filters')!;
  const roleSelect = document.querySelector<HTMLSelectElement>('#resource-role');
  const deliverySelect = document.querySelector<HTMLSelectElement>('#resource-delivery');
  const activeFilters = document.querySelector<HTMLElement>('#active-filters');
  const params = new URLSearchParams(location.search);
  let topic = topicButtons.some(button => button.dataset.topic === params.get('topic')) ? params.get('topic')! : 'all';
  let type = typeButtons.some(button => button.dataset.type === params.get('type')) ? params.get('type')! : 'all';
  const validOption = (select: HTMLSelectElement | null, key: string) => [...(select?.options ?? [])].some(option => option.value === params.get(key)) ? params.get(key)! : 'all';
  let role = validOption(roleSelect, 'role');
  let delivery = validOption(deliverySelect, 'delivery');
  input.value = params.get('q') || '';
  if (roleSelect) roleSelect.value = role;
  if (deliverySelect) deliverySelect.value = delivery;
  const buttonLabel = (buttons: HTMLButtonElement[], field: 'topic' | 'type', value: string) => {
    const button = buttons.find(button => button.dataset[field] === value);
    return button?.textContent?.replace(/\s*\d+\s*$/u, '').trim() ?? value;
  };
  function update() {
    let count = 0;
    let allTopicCount = 0;
    const topicCounts = new Map<string, number>();
    const typeCounts = new Map<string, number>();
    for (const card of cards) {
      const resource = {search:card.dataset.search || '',topic:card.dataset.topic || '',type:card.dataset.type || '',role:card.dataset.role,delivery:card.dataset.delivery};
      const matchesOtherTopicFilters = matchesResource(resource,{query:input.value,topic:'all',type,role,delivery});
      if (matchesOtherTopicFilters) {
        allTopicCount++;
        topicCounts.set(resource.topic, (topicCounts.get(resource.topic) || 0) + 1);
      }
      if (matchesResource(resource,{query:input.value,topic,type:'all',role,delivery})) {
        typeCounts.set(resource.type, (typeCounts.get(resource.type) || 0) + 1);
      }
      const match = matchesOtherTopicFilters && (topic === 'all' || resource.topic === topic);
      card.hidden = !match;
      if (match) count++;
    }
    if (list) [...cards].sort((a,b) => searchRank(b.dataset.title ?? '',input.value)-searchRank(a.dataset.title ?? '',input.value)).forEach(card => list.append(card));
    topicButtons.forEach(button => {
      button.setAttribute('aria-pressed',String(button.dataset.topic === topic));
      const matches = button.dataset.topic === 'all' ? allTopicCount : topicCounts.get(button.dataset.topic!) || 0;
      button.querySelector<HTMLElement>('[data-topic-count]')!.textContent = String(matches);
    });
    const allTypeCount = [...typeCounts.values()].reduce((sum,value)=>sum+value,0);
    typeButtons.forEach(button => {
      button.setAttribute('aria-pressed',String(button.dataset.type === type));
      const counter = button.querySelector('[data-type-count]');
      if (counter) counter.textContent = String(button.dataset.type === 'all' ? allTypeCount : typeCounts.get(button.dataset.type!) || 0);
    });
    document.querySelector('#resource-count')!.textContent = `共 ${count} 条资源`;
    document.querySelector<HTMLElement>('#no-results')!.hidden = count !== 0;
    reset.hidden = !input.value && [topic,type,role,delivery].every(value=>value==='all');
    const url = new URL(location.href);
    for (const [key,value] of Object.entries({q:input.value,topic:topic==='all'?'':topic,type:type==='all'?'':type,role:role==='all'?'':role,delivery:delivery==='all'?'':delivery})) {
      if (value) url.searchParams.set(key,value); else url.searchParams.delete(key);
    }
    history.replaceState(null,'',url);
    activeFilters?.replaceChildren();
    const chips: {label:string;clear:()=>void}[] = [];
    if(input.value) chips.push({label:`搜索：${input.value}`,clear:()=>{input.value='';}});
    if(topic!=='all') chips.push({label:buttonLabel(topicButtons,'topic',topic),clear:()=>{topic='all';}});
    if(type!=='all') chips.push({label:buttonLabel(typeButtons,'type',type),clear:()=>{type='all';}});
    if(role!=='all') chips.push({label:roleSelect?.selectedOptions[0]?.textContent ?? role,clear:()=>{role='all';if(roleSelect)roleSelect.value='all';}});
    if(delivery!=='all') chips.push({label:deliverySelect?.selectedOptions[0]?.textContent ?? delivery,clear:()=>{delivery='all';if(deliverySelect)deliverySelect.value='all';}});
    if(activeFilters) {
      activeFilters.hidden = !chips.length;
      for(const chip of chips) {
        const button=document.createElement('button');button.type='button';button.textContent=`${chip.label} ×`;button.setAttribute('aria-label',`移除筛选：${chip.label}`);
        button.addEventListener('click',()=>{chip.clear();update();input.focus();});activeFilters.append(button);
      }
    }
    const summary=document.querySelector('#filter-summary');
    if(summary) summary.textContent=chips.length?`${chips.length} 项条件 · ${count} 条结果`:`全部资源 · ${count} 条`;
  }
  input.addEventListener('input',update);
  topicButtons.forEach(button=>button.addEventListener('click',()=>{topic=button.dataset.topic!;update();}));
  typeButtons.forEach(button=>button.addEventListener('click',()=>{type=button.dataset.type!;update();}));
  roleSelect?.addEventListener('change',()=>{role=roleSelect.value;update();});
  deliverySelect?.addEventListener('change',()=>{delivery=deliverySelect.value;update();});
  function clear() {topic='all';type='all';role='all';delivery='all';input.value='';if(roleSelect)roleSelect.value='all';if(deliverySelect)deliverySelect.value='all';update();input.focus();}
  reset.addEventListener('click',clear);
  document.querySelector('[data-reset-all]')?.addEventListener('click',clear);
  update();
  const panel=explorer.querySelector<HTMLDetailsElement>('.filter-panel');
  if(panel && typeof matchMedia==='function') {
    const desktop=matchMedia('(min-width: 761px)');
    const syncPanel=()=>{panel.open=desktop.matches;};syncPanel();desktop.addEventListener('change',syncPanel);
  }
  explorer.querySelectorAll<HTMLAnchorElement>('[data-resource-profile-link]').forEach(link=>link.addEventListener('click',()=>{
    try { sessionStorage.setItem(readingContextKey,JSON.stringify({from:location.pathname+location.search+location.hash,target:new URL(link.href).pathname,scrollY:window.scrollY})); } catch { /* Native browser back remains available. */ }
  }));
  try {
    const context=parseReadingContext(JSON.parse(sessionStorage.getItem(readingContextKey)||'null'),location.origin,location.pathname);
    const referrer=document.referrer?new URL(document.referrer):null;
    if(context && context.from===location.pathname+location.search+location.hash && referrer?.origin===location.origin && referrer.pathname===context.target) {
      requestAnimationFrame(()=>window.scrollTo({top:context.scrollY,behavior:'instant'}));sessionStorage.removeItem(readingContextKey);
    }
  } catch { /* No saved return position. */ }
}
