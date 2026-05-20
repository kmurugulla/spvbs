export default function decorate(block) {
  const items = [...block.children];
  const dl = document.createElement('dl');
  dl.className = 'accordion-list';

  items.forEach((item) => {
    const question = item.children[0];
    const answer = item.children[1];

    const dt = document.createElement('dt');
    const button = document.createElement('button');
    button.className = 'accordion-trigger';
    button.setAttribute('aria-expanded', 'false');
    button.textContent = question?.textContent?.trim() || '';
    dt.append(button);

    const dd = document.createElement('dd');
    dd.className = 'accordion-content';
    dd.hidden = true;
    if (answer) dd.innerHTML = answer.innerHTML;

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      dd.hidden = expanded;
    });

    dl.append(dt, dd);
  });

  block.replaceChildren(dl);
}
