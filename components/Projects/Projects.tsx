'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import styles from './Projects.module.css';

const projects = [
  {
    src: '/images/projects/gallery-1.jpg',
    alt: 'Генератор і газовий резервуар біля приватного будинку',
  },
  {
    src: '/images/projects/gallery-2.jpg',
    alt: 'Встановлений генератор із газовими балонами біля заміського будинку',
  },
  {
    src: '/images/projects/gallery-3.jpg',
    alt: 'Дерев’яний будинок із сонячними панелями на даху',
  },
  {
    src: '/images/projects/gallery-4.jpg',
    alt: 'Сонячна електростанція на даху заміського котеджу',
  },
  {
    src: '/images/projects/gallery-5.jpg',
    alt: 'Будинок у розрізі з накопичувачем енергії та сонячними панелями',
  },
];

const SLIDE_COUNT = projects.length;
const LOOP_COPIES = 5;
const CENTER_COPY = Math.floor(LOOP_COPIES / 2);
const CENTER_COPY_START = SLIDE_COUNT * CENTER_COPY;
const INITIAL_LOOP_INDEX = CENTER_COPY_START + Math.floor(SLIDE_COUNT / 2);
/* Keep one full copy of headroom on both sides so stepping never runs out of slides. */
const SAFE_MIN_LOOP_INDEX = SLIDE_COUNT;
const SAFE_MAX_LOOP_INDEX = SLIDE_COUNT * (LOOP_COPIES - 1) - 1;
const VISIBLE_COPY = CENTER_COPY;
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
  return CENTER_COPY_START + wrapIndex(index);
}

function nearestLoopIndex(logicalIndex: number, currentLoopIndex: number) {
  const target = wrapIndex(logicalIndex);
  const candidates = Array.from(
    { length: LOOP_COPIES },
    (_, copy) => target + SLIDE_COUNT * copy,
  ).filter(candidate => candidate >= SAFE_MIN_LOOP_INDEX && candidate <= SAFE_MAX_LOOP_INDEX);

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

    // Both boxes share an offsetParent, so the difference is the card's
    // untransformed position inside the viewport.
    const cardLeft = card.offsetLeft - viewport.offsetLeft;
    const offset = viewport.clientWidth / 2 - (cardLeft + card.offsetWidth / 2);
    setTrackOffset(offset);
    trackOffsetRef.current = offset;
  }, []);

  const jumpToLoopIndex = useCallback(
    (nextLoopIndex: number) => {
      if (nextLoopIndex === loopIndexRef.current) return;

      // Rewind to an equivalent slide with transitions off, flushing the style
      // change so it becomes the new starting point instead of being animated.
      flushSync(() => {
        setIsJumping(true);
        commitLoopIndex(nextLoopIndex);
        updateOffset(nextLoopIndex);
      });

      trackRef.current?.getBoundingClientRect();
      flushSync(() => setIsJumping(false));
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

  const moveTo = useCallback(
    (nextLoopIndex: number) => {
      commitLoopIndex(nextLoopIndex);
      updateOffset(nextLoopIndex);
      scheduleNormalize(nextLoopIndex);
    },
    [commitLoopIndex, scheduleNormalize, updateOffset],
  );

  // Dots jump straight to a slide, so pick the copy that is closest to travel to.
  const goTo = useCallback(
    (index: number) => {
      moveTo(nearestLoopIndex(index, loopIndexRef.current));
    },
    [moveTo],
  );

  // Arrows and swipes always advance one slide in the requested direction.
  const step = useCallback(
    (direction: 1 | -1) => {
      const next = loopIndexRef.current + direction;

      if (next >= SAFE_MIN_LOOP_INDEX && next <= SAFE_MAX_LOOP_INDEX) {
        moveTo(next);
        return;
      }

      // Out of headroom: rewind to the middle copy first so the step stays a step.
      window.clearTimeout(normalizeTimerRef.current);
      jumpToLoopIndex(normalizeLoopIndex(loopIndexRef.current));
      moveTo(loopIndexRef.current + direction);
    },
    [jumpToLoopIndex, moveTo],
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
        step(delta < 0 ? 1 : -1);
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
  }, [step, updateOffset]);

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
                  key={`${slide.project.src}-${slide.copy}`}
                  className={`${styles.card} ${getCardClass(slide.loopIndex, loopIndex)}`}
                  style={
                    isDesktop
                      ? { transform: getDesktopCardTransform(slide.loopIndex, loopIndex) }
                      : undefined
                  }
                  aria-hidden={slide.copy !== VISIBLE_COPY ? true : undefined}
                >
                  <div className={styles.frame1}>
                    <div className={styles.frame2}>
                      <picture>
                        <img
                          src={slide.project.src}
                          alt={slide.copy === VISIBLE_COPY ? slide.project.alt : ''}
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
              onClick={() => step(-1)}
              aria-label="Попередній проєкт"
            >
              <svg className={styles.navIcon} aria-hidden="true">
                <use href="/sprites.svg#icon-arrow-right" />
              </svg>
            </button>

            <div className={styles.dots} role="tablist" aria-label="Слайди проєктів">
              {projects.map((project, index) => (
                <button
                  key={project.src}
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
              onClick={() => step(1)}
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
