'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Solutions.module.css';

const solutions = [
  {
    title: 'Сонячні системи',
    description: 'Власна генерація електроенергії.',
    icon: '/images/solutions/solution-1.png',
  },
  {
    title: 'Генератори',
    description: 'Резервне джерело енергії.',
    icon: '/images/solutions/solution-2.png',
  },
  {
    title: 'Зарядні станції',
    description: 'Мобільне резервне живлення для основних приладів.',
    icon: '/images/solutions/solution-3.png',
  },
  {
    title: 'Акумуляторні системи',
    description: 'Зберігання енергії для використання під час відключень.',
    icon: '/images/solutions/solution-4.png',
  },
  {
    title: 'Інвертори',
    description: 'Керування та перетворення енергії.',
    icon: '/images/solutions/solution-5.png',
  },
  {
    title: 'Комплексні системи',
    description: 'Поєднуємо кілька технологій в одне рішення для вашого будинку.',
    icon: '/images/solutions/solution-6.png',
  },
];

const CAROUSEL_MQ = '(max-width: 833px)';

export default function Solutions() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, delta: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCarousel, setIsCarousel] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(CAROUSEL_MQ);
    const sync = () => {
      setIsCarousel(media.matches);
      setDragX(0);
      setIsDragging(false);
    };
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const goTo = (index: number) => {
    setActiveIndex(Math.min(solutions.length - 1, Math.max(0, index)));
    setDragX(0);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !isCarousel) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      dragRef.current = { active: true, startX: event.clientX, delta: 0 };
      setIsDragging(true);
      viewport.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragRef.current.active) return;
      const delta = event.clientX - dragRef.current.startX;
      dragRef.current.delta = delta;
      setDragX(delta);
    };

    const onPointerUp = () => {
      if (!dragRef.current.active) return;
      const { delta } = dragRef.current;
      dragRef.current.active = false;
      setIsDragging(false);
      setDragX(0);

      const threshold = Math.min(80, viewport.clientWidth * 0.18);
      if (delta <= -threshold) goTo(activeIndex + 1);
      else if (delta >= threshold) goTo(activeIndex - 1);
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
    };
  }, [activeIndex, isCarousel]);

  return (
    <section className={styles.section} id="solutions">
      <div className={`container ${styles.container}`}>
        <h2 className={styles.title}>Наші рішення</h2>

        <div className={styles.carousel}>
          <div ref={viewportRef} className={styles.viewport}>
            <ul
              className={`${styles.track} ${isDragging ? styles.trackDragging : ''}`}
              style={
                isCarousel
                  ? {
                      transform: `translate3d(calc(${-activeIndex * 100}% + ${dragX}px), 0, 0)`,
                    }
                  : undefined
              }
            >
              {solutions.map((solution, index) => (
                <li
                  key={solution.title}
                  className={`${styles.card} ${index === 0 ? styles.card1 : ''} ${index === 1 ? styles.card2 : ''}`}
                >
                  <article className={styles.cardInner}>
                    <h3 className={styles.cardTitle}>{solution.title}</h3>

                    <div className={styles.iconWrap} aria-hidden="true">
                      <Image
                        src={solution.icon}
                        alt=""
                        width={150}
                        height={150}
                        className={styles.icon}
                      />
                    </div>

                    <p className={styles.cardDescription}>{solution.description}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Попереднє рішення"
            >
              <svg className={styles.navIcon} aria-hidden="true">
                <use href="/sprites.svg#icon-arrow-right" />
              </svg>
            </button>

            <div className={styles.dots} role="tablist" aria-label="Слайди рішень">
              {solutions.map((solution, index) => (
                <button
                  key={solution.title}
                  type="button"
                  className={styles.dot}
                  onClick={() => goTo(index)}
                  aria-label={solution.title}
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
              aria-label="Наступне рішення"
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
