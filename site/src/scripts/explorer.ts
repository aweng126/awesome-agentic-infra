import { matchesResource } from '../lib/search';

const explorer = document.querySelector<HTMLElement>('[data-resource-explorer]');
if (explorer) {
  const input = document.querySelector<HTMLInputElement>('#resource-search')!;
  const topicButtons = [...explorer.querySelectorAll<HTMLButtonElement>('[data-topic]')].filter(el => el.tagName === 'BUTTON');
  const typeButtons = [...explorer.querySelectorAll<HTMLButtonElement>('[data-type]')].filter(el => el.tagName === 'BUTTON');
  const cards = [...explorer.querySelectorAll<HTMLElement>('.resource-card')];
  const reset = document.querySelector<HTMLButtonElement>('#reset-filters')!;
  const params = new URLSearchParams(location.search);
  let topic = topicButtons.some(button => button.dataset.topic === params.get('topic')) ? params.get('topic')! : 'all';
  let type = typeButtons.some(button => button.dataset.type === params.get('type')) ? params.get('type')! : 'all';
  input.value = params.get('q') || '';
  function update() {
    let count = 0;
    for (const card of cards) {
      const match = matchesResource({search:card.dataset.search || '',topic:card.dataset.topic || '',type:card.dataset.type || ''},{query:input.value,topic,type});
      card.hidden = !match;
      if (match) count++;
    }
    topicButtons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.topic === topic)));
    typeButtons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.type === type)));
    document.querySelector('#resource-count')!.textContent = `共 ${count} 条资源`;
    document.querySelector<HTMLElement>('#no-results')!.hidden = count !== 0;
    reset.hidden = !input.value && topic === 'all' && type === 'all';
    const url = new URL(location.href);
    for (const [key,value] of Object.entries({q:input.value,topic:topic==='all'?'':topic,type:type==='all'?'':type})) {
      if (value) url.searchParams.set(key,value); else url.searchParams.delete(key);
    }
    history.replaceState(null,'',url);
  }
  input.addEventListener('input',update);
  topicButtons.forEach(button=>button.addEventListener('click',()=>{topic=button.dataset.topic!;update();}));
  typeButtons.forEach(button=>button.addEventListener('click',()=>{type=button.dataset.type!;update();}));
  function clear() {topic='all';type='all';input.value='';update();input.focus();}
  reset.addEventListener('click',clear);
  document.querySelector('[data-reset-all]')?.addEventListener('click',clear);
  update();
}
