'use client';

import { useEffect, useRef, useState } from 'react';
import SystemSelection, { type SystemValue } from '@/components/SystemSelection/SystemSelection';
import SystemSelectionQuiz from '@/components/SystemSelectionQuiz/SystemSelectionQuiz';
import styles from './SystemSelectionSwap.module.css';

export default function SystemSelectionSwap() {
  const swapRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);
  const [selectedSystem, setSelectedSystem] = useState<SystemValue | null>(null);
  const isQuizVisible = selectedSystem !== null;

  useEffect(() => {
    const swap = swapRef.current;
    if (!swap) return;

    // Hand the height back to the layout once the swap animation is over.
    const releaseHeight = (event: TransitionEvent) => {
      if (event.target === swap && event.propertyName === 'height') {
        swap.style.height = '';
      }
    };

    swap.addEventListener('transitionend', releaseHeight);
    return () => swap.removeEventListener('transitionend', releaseHeight);
  }, []);

  const showQuiz = (system: SystemValue) => {
    const swap = swapRef.current;
    const quiz = quizRef.current;

    if (!swap || !quiz) {
      setSelectedSystem(system);
      return;
    }

    // Pin the current height, then animate to the incoming section's height.
    swap.style.height = `${swap.offsetHeight}px`;
    const quizHeight = quiz.offsetHeight;
    setSelectedSystem(system);

    requestAnimationFrame(() => {
      swap.style.height = `${quizHeight}px`;
    });
  };

  return (
    <div ref={swapRef} className={styles.swap}>
      <div
        className={`${styles.view} ${isQuizVisible ? '' : styles.viewActive}`}
        aria-hidden={isQuizVisible}
      >
        <SystemSelection onSelectSystem={showQuiz} />
      </div>

      <div
        ref={quizRef}
        className={`${styles.view} ${isQuizVisible ? styles.viewActive : ''}`}
        aria-hidden={!isQuizVisible}
      >
        <SystemSelectionQuiz key={selectedSystem ?? 'default'} defaultSystem={selectedSystem ?? 'full'} />
      </div>
    </div>
  );
}
