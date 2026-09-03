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

export default function Solutions() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateActiveIndex = () => {
      const width = track.clientWidth;
      if (width === 0) return;
      const nextIndex = Math.round(track.scrollLeft / width);
      setActiveIndex(Math.min(Math.max(nextIndex, 0), solutions.length - 1));
    };

    track.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => track.removeEventListener('scroll', updateActiveIndex);
  }, []);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const nextIndex = (index + solutions.length) % solutions.length;
    track.scrollTo({
      left: nextIndex * track.clientWidth,
      behavior: 'smooth',
    });
    setActiveIndex(nextIndex);
  };

  return (
    <section className={styles.section} id="solutions">
      <div className={`container ${styles.container}`}>
        <h2 className={styles.title}>Наші рішення</h2>

        <div className={styles.carousel}>
          <ul ref={trackRef} className={styles.track}>
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
