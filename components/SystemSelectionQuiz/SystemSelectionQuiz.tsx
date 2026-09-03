'use client';

import { useState } from 'react';
import styles from './SystemSelectionQuiz.module.css';
import SystemSelectionModal from './SystemSelectionModal';

export default function SystemSelectionQuiz() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState('full');

  return (
    <>
      <section className={styles.systemSelection}>
        <div className={styles.systemSelection_content}>
          <div className={styles.systemSelection_inner}>
            <h2 className={styles.systemSelection_title}>Підберіть систему під свій будинок</h2>

            <div className={styles.systemSelection_row}>
              <div className={styles.systemSelection_info}>
                <h3 className={styles.systemSelection_subtitle}>Не знаєте, що вам потрібно?</h3>

                <p className={styles.systemSelection_text}>
                  Відповідайте на кілька простих запитань — і отримаєте рекомендоване рішення.
                </p>
              </div>

              <div className={styles.systemSelection_question}>
                <h3 className={styles.systemSelection_questionTitle}>Підберемо систему для вас</h3>

                <p className={styles.systemSelection_content_question}>
                  Для чого потрібна система?
                </p>

                <div className={styles.systemSelection_content_options}>
                  <label className={styles.systemSelection_content_option}>
                    <input
                      type="radio"
                      name="system"
                      value="backup"
                      checked={selectedSystem === 'backup'}
                      onChange={() => setSelectedSystem('backup')}
                      style={{ display: 'none' }}
                    />

                    <span className={styles.systemSelection_content_optionIcon}>
                      <svg
                        className={styles.systemSelection_content_optionIconOuter}
                        aria-hidden="true"
                      >
                        <use href="/sprites.svg#icon-circle-stroke" />
                      </svg>

                      {selectedSystem === 'backup' && (
                        <svg
                          className={styles.systemSelection_content_optionIconFill}
                          aria-hidden="true"
                        >
                          <use href="/sprites.svg#icon-circle-fill" />
                        </svg>
                      )}
                    </span>

                    <span className={styles.systemSelection_content_optionText}>
                      Захист від відключень
                    </span>
                  </label>

                  <label className={styles.systemSelection_content_option}>
                    <input
                      type="radio"
                      name="system"
                      value="full"
                      checked={selectedSystem === 'full'}
                      onChange={() => setSelectedSystem('full')}
                      style={{ display: 'none' }}
                    />

                    <span className={styles.systemSelection_content_optionIcon}>
                      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                        <use href="/sprites.svg#icon-circle-stroke" />
                      </svg>

                      {selectedSystem === 'full' && (
                        <svg
                          className={styles.systemSelection_content_optionIconFill}
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          aria-hidden="true"
                        >
                          <use href="/sprites.svg#icon-circle-fill" />
                        </svg>
                      )}
                    </span>

                    <span className={styles.systemSelection_content_optionText}>
                      Повна автономність
                    </span>
                  </label>
                </div>

                <button
                  type="button"
                  className={styles.systemSelection_content_button}
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
