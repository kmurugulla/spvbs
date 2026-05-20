export default function decorate(block) {
  const link = block.querySelector('a');
  if (!link) return;

  const url = new URL(link.href);
  let videoId = '';

  if (url.hostname.includes('youtube.com')) {
    videoId = url.searchParams.get('v');
  } else if (url.hostname.includes('youtu.be')) {
    videoId = url.pathname.slice(1);
  }

  if (videoId) {
    const wrapper = document.createElement('div');
    wrapper.className = 'embed-youtube';
    wrapper.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}"
      frameborder="0" allowfullscreen loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
    </iframe>`;
    block.replaceChildren(wrapper);
  }
}
