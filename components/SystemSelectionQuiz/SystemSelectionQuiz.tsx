'use client';

import { useState } from 'react';
import styles from './SystemSelectionQuiz.module.css';
import SystemSelectionModal from './SystemSelectionModal';

const quizOptions = [
  { value: 'backup', label: 'Захист від відключень' },
  { value: 'full', label: 'Повна автономність' },
];

export default function SystemSelectionQuiz() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState('full');

  return (
    <>
      <section className={styles.quiz}>
        <div className={styles.quizOuter}>
          <div className={styles.quizInner}>
            <h2 className={styles.quizTitle}>Підберіть систему під свій будинок</h2>

            <div className={styles.quizRow}>
              <div className={styles.quizInfo}>
                <h3 className={styles.quizSubtitle}>Не знаєте, що вам потрібно?</h3>

                <p className={styles.quizText}>
                  Відповідайте на кілька простих запитань — і отримаєте рекомендоване рішення.
                </p>
              </div>

              <div className={styles.quizCard}>
                <h3 className={styles.quizCardTitle}>Підберемо систему для вас</h3>

                <p className={styles.quizQuestion}>Для чого потрібна система?</p>

                <div className={styles.quizOptions}>
                  {quizOptions.map(option => (
                    <label key={option.value} className={styles.quizOption}>
                      <input
                        type="radio"
                        name="system"
                        value={option.value}
                        className={styles.optionInput}
                        checked={selectedSystem === option.value}
                        onChange={() => setSelectedSystem(option.value)}
                      />

                      <span className={styles.optionIcon}>
                        <svg className={styles.optionIconOuter} aria-hidden="true">
                          <use href="/sprites.svg#icon-circle-stroke" />
                        </svg>

                        {selectedSystem === option.value && (
                          <svg className={styles.optionIconFill} aria-hidden="true">
                            <use href="/sprites.svg#icon-circle-fill" />
                          </svg>
                        )}
                      </span>

                      <span className={styles.optionText}>{option.label}</span>
                    </label>
                  ))}
                </div>

                <button
                  type="button"
                  className={styles.quizNextBtn}
                  onClick={() => setIsModalOpen(true)}
                >
                  Наступне питання →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && <SystemSelectionModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
