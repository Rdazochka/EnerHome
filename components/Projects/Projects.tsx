'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './Projects.module.css';

const projects = [
  {
    srcMobile: '/images/projects/project-1-mobile.png',
    srcDesktop: '/images/projects/project-1-desktop.png',
    alt: 'Будиночок із сонячними панелями на даху',
  },
  {
    srcMobile: '/images/projects/project-2-mobile.png',
    srcDesktop: '/images/projects/project-2-desktop.png',
    alt: 'Встановлений генератор біля приватного будинку',
  },
  {
    srcMobile: '/images/projects/project-3-mobile.png',
    srcDesktop: '/images/projects/project-3-desktop.png',
    alt: 'Сонячна електростанція на даху заміського будинку',
  },
  {
    srcMobile: '/images/projects/project-4-mobile.png',
    srcDesktop: '/images/projects/project-4-desktop.png',
    alt: 'Комплексна енергосистема біля житлового будинку',
  },
  {
    srcMobile: '/images/projects/project-5-mobile.png',
    srcDesktop: '/images/projects/project-5-desktop.png',
    alt: 'Резервне живлення для приватного будинку',
  },
];

const SLIDE_COUNT = projects.length;
const LOOP_COPIES = 3;
const INITIAL_INDEX = Math.floor(SLIDE_COUNT / 2);
const INITIAL_LOOP_INDEX = SLIDE_COUNT + INITIAL_INDEX;
const DESKTOP_MQ = '(min-width: 1440px)';
const DESKTOP_GAP = 24;
const DESKTOP_CARD_WIDTH = 398;
const DESKTOP_CARD_HEIGHT = 613;
const SLIDE_MS = 750;

const slides = Array.from({ length: SLIDE_COUNT * LOOP_COPIES }, (_, loopIndex) => ({
  project: projects[loopIndex % SLIDE_COUNT],
  logicalIndex: loopIndex % SLIDE_COUNT,
  loopIndex,
  copy: Math.floor(loopIndex / SLIDE_COUNT),
}));

function isDesktopViewport() {
  return window.matchMedia(DESKTOP_MQ).matches;
}

function wrapIndex(index: number) {
  return ((index % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;
}

function normalizeLoopIndex(index: number) {
  let nextIndex = index;
  if (nextIndex < SLIDE_COUNT) nextIndex += SLIDE_COUNT;
  if (nextIndex >= SLIDE_COUNT * 2) nextIndex -= SLIDE_COUNT;
  return nextIndex;
}

function nearestLoopIndex(logicalIndex: number, currentLoopIndex: number) {
  const target = wrapIndex(logicalIndex);
  const candidates = [target, target + SLIDE_COUNT, target + SLIDE_COUNT * 2];

  return candidates.reduce((closest, candidate) =>
    Math.abs(candidate - currentLoopIndex) < Math.abs(closest - currentLoopIndex)
      ? candidate
      : closest,
  );
}

function getDesktopCardSize(index: number, activeIndex: number) {
  const distance = Math.abs(index - activeIndex);
  if (distance === 0) return { width: 398, height: 613 };
  if (distance === 1) return { width: 292, height: 444 };
  return { width: 226, height: 344 };
}

function getDesktopPackedLeft(index: number, activeIndex: number) {
  let x = 0;
  for (let i = 0; i < index; i += 1) {
    x += getDesktopCardSize(i, activeIndex).width + DESKTOP_GAP;
  }
  return x;
}

function getDesktopCardTransform(index: number, activeIndex: number) {
  const visual = getDesktopCardSize(index, activeIndex);
  const layoutLeft = index * (DESKTOP_CARD_WIDTH + DESKTOP_GAP);
  const scaledLeft = layoutLeft + (DESKTOP_CARD_WIDTH - visual.width) / 2;
  const shift = getDesktopPackedLeft(index, activeIndex) - scaledLeft;
  const scaleX = visual.width / DESKTOP_CARD_WIDTH;
  const scaleY = visual.height / DESKTOP_CARD_HEIGHT;

  return `translate3d(${shift}px, 0, 0) scale(${scaleX}, ${scaleY})`;
}

function getCardClass(index: number, activeIndex: number) {
  const distance = Math.abs(index - activeIndex);

  if (distance === 0) return styles.cardActive;
  if (distance === 1) return styles.cardNear;
  return styles.cardFar;
}

export default function Projects() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const loopIndexRef = useRef(INITIAL_LOOP_INDEX);
  const trackOffsetRef = useRef(0);
  const normalizeTimerRef = useRef(0);
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startOffset: 0,
  });
  const [loopIndex, setLoopIndex] = useState(INITIAL_LOOP_INDEX);
  const [isDesktop, setIsDesktop] = useState(false);
  const [trackOffset, setTrackOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const activeIndex = wrapIndex(loopIndex);

  const commitLoopIndex = useCallback((nextLoopIndex: number) => {
    loopIndexRef.current = nextLoopIndex;
    setLoopIndex(nextLoopIndex);
    return nextLoopIndex;
  }, []);

  const updateOffset = useCallback((index = loopIndexRef.current) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    if (isDesktopViewport()) {
      const x = getDesktopPackedLeft(index, index) + getDesktopCardSize(index, index).width / 2;
      const offset = viewport.clientWidth / 2 - x;
      setTrackOffset(offset);
      trackOffsetRef.current = offset;
      return;
    }

    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;

    const offset = viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
    setTrackOffset(offset);
    trackOffsetRef.current = offset;
  }, []);

  const jumpToLoopIndex = useCallback(
    (nextLoopIndex: number) => {
      setIsJumping(true);
      commitLoopIndex(nextLoopIndex);
      updateOffset(nextLoopIndex);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsJumping(false);
        });
      });
    },
    [commitLoopIndex, updateOffset],
  );

  const scheduleNormalize = useCallback(
    (nextLoopIndex: number) => {
      window.clearTimeout(normalizeTimerRef.current);
      const normalized = normalizeLoopIndex(nextLoopIndex);
      if (normalized === nextLoopIndex) return;

      normalizeTimerRef.current = window.setTimeout(() => {
        jumpToLoopIndex(normalized);
      }, SLIDE_MS);
    },
    [jumpToLoopIndex],
  );

  const goTo = useCallback(
    (index: number) => {
      const nextLoopIndex = nearestLoopIndex(index, loopIndexRef.current);
      commitLoopIndex(nextLoopIndex);
      updateOffset(nextLoopIndex);
      scheduleNormalize(nextLoopIndex);
    },
    [commitLoopIndex, scheduleNormalize, updateOffset],
  );

  useLayoutEffect(() => {
    const media = window.matchMedia(DESKTOP_MQ);
    const sync = () => setIsDesktop(media.matches);

    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useLayoutEffect(() => {
    const normalized = normalizeLoopIndex(loopIndexRef.current);
    commitLoopIndex(normalized);
    updateOffset(normalized);
  }, [commitLoopIndex, isDesktop, updateOffset]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;

      dragRef.current = {
        isDragging: true,
        startX: event.clientX,
        startOffset: trackOffsetRef.current,
      };
      setIsDragging(true);
      viewport.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragRef.current.isDragging) return;

      const nextOffset = dragRef.current.startOffset + (event.clientX - dragRef.current.startX);
      trackOffsetRef.current = nextOffset;
      setTrackOffset(nextOffset);
    };

    const onPointerUp = () => {
      if (!dragRef.current.isDragging) return;

      const delta = trackOffsetRef.current - dragRef.current.startOffset;
      dragRef.current.isDragging = false;
      setIsDragging(false);

      if (Math.abs(delta) > 56) {
        goTo(loopIndexRef.current + (delta < 0 ? 1 : -1));
        return;
      }

      updateOffset(loopIndexRef.current);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      window.scrollBy(0, event.deltaY);
    };

    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('pointercancel', onPointerUp);
    viewport.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerup', onPointerUp);
      viewport.removeEventListener('pointercancel', onPointerUp);
      viewport.removeEventListener('wheel', onWheel);
      window.clearTimeout(normalizeTimerRef.current);
    };
  }, [goTo, updateOffset]);

  useEffect(() => {
    const onResize = () => {
      const normalized = normalizeLoopIndex(loopIndexRef.current);
      commitLoopIndex(normalized);
      updateOffset(normalized);
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [commitLoopIndex, updateOffset]);

  return (
    <section className={styles.section} id="projects">
      <div className={`container ${styles.container}`}>
        <header className={styles.heading}>
          <h2 className={styles.title}>Реалізовані проєкти</h2>
          <p className={styles.subtitle}>Рішення, які вже працюють</p>
        </header>

        <div className={styles.carousel}>
          <div ref={viewportRef} className={styles.viewport}>
            <ul
              ref={trackRef}
              className={`${styles.track} ${isDragging ? styles.trackDragging : ''} ${isJumping ? styles.trackJump : ''}`}
              style={{ transform: `translate3d(${trackOffset}px, 0, 0)` }}
              aria-label="Карусель реалізованих проєктів"
            >
              {slides.map(slide => (
                <li
                  key={`${slide.project.srcDesktop}-${slide.copy}`}
                  className={`${styles.card} ${getCardClass(slide.loopIndex, loopIndex)}`}
                  style={
                    isDesktop
                      ? { transform: getDesktopCardTransform(slide.loopIndex, loopIndex) }
                      : undefined
                  }
                  aria-hidden={slide.copy !== 1 ? true : undefined}
                >
                  <div className={styles.frame1}>
                    <div className={styles.frame2}>
                      <picture>
                        <source media="(min-width: 834px)" srcSet={slide.project.srcDesktop} />
                        <img
                          src={slide.project.srcMobile}
                          alt={slide.copy === 1 ? slide.project.alt : ''}
                          width={311}
                          height={459}
                          className={styles.photo}
                        />
                      </picture>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Попередній проєкт"
            >
              <svg className={styles.navIcon} aria-hidden="true">
                <use href="/sprites.svg#icon-arrow-right" />
              </svg>
            </button>

            <div className={styles.dots} role="tablist" aria-label="Слайди проєктів">
              {projects.map((project, index) => (
                <button
                  key={project.srcDesktop}
                  type="button"
                  className={styles.dot}
                  onClick={() => goTo(index)}
                  aria-label={project.alt}
                  aria-current={index === activeIndex ? 'true' : undefined}
                >
                  <svg className={styles.dotIcon} aria-hidden="true">
                    <use
                      href={
                        index === activeIndex
                          ? '/sprites.svg#icon-circle-green'
                          : '/sprites.svg#icon-circle-white'
                      }
                    />
                  </svg>
                </button>
              ))}
            </div>

            <button
              type="button"
              className={styles.navBtn}
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Наступний проєкт"
            >
              <svg className={styles.navIcon} aria-hidden="true">
                <use href="/sprites.svg#icon-arrow-left" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
