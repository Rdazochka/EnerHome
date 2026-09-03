let pageScrollRaf = 0;
const elementScrollRafs = new WeakMap<HTMLElement, number>();

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function animateWindowScroll(to: number, duration = 1000) {
  cancelAnimationFrame(pageScrollRaf);

  const from = window.scrollY || document.documentElement.scrollTop;
  const distance = to - from;
  if (Math.abs(distance) < 1) return;

  const start = performance.now();

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const next = from + distance * easeInOutCubic(t);
    document.documentElement.scrollTop = next;
    document.body.scrollTop = next;
    if (t < 1) {
      pageScrollRaf = requestAnimationFrame(tick);
    }
  };

  pageScrollRaf = requestAnimationFrame(tick);
}

export function animateScrollLeft(element: HTMLElement, to: number, duration = 700) {
  const prev = elementScrollRafs.get(element);
  if (prev) cancelAnimationFrame(prev);

  const from = element.scrollLeft;
  const distance = to - from;
  if (Math.abs(distance) < 1) return;

  const start = performance.now();

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    element.scrollLeft = from + distance * easeInOutCubic(t);
    if (t < 1) {
      elementScrollRafs.set(element, requestAnimationFrame(tick));
    }
  };

  elementScrollRafs.set(element, requestAnimationFrame(tick));
}

export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const header =
    Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
    ) || 45;

  const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - header);
  animateWindowScroll(top, 1000);
  history.replaceState(null, '', `#${id}`);
}

export function handleHashLinkClick(
  event: { preventDefault: () => void },
  href: string,
  delay = 0,
) {
  if (!href.startsWith('#') || href === '#') return;

  event.preventDefault();
  const id = href.slice(1);
  if (delay > 0) {
    window.setTimeout(() => scrollToId(id), delay);
    return;
  }
  scrollToId(id);
}
