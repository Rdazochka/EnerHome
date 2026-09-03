'use client';

import { FormEvent, useEffect, useState } from 'react';
import styles from './SystemSelectionModal.module.css';
import { isValidUaPhone, normalizeUaPhone } from '@/lib/phone';

type SystemSelectionModalQuizProps = {
  onClose: () => void;
};

export default function SystemSelectionModalQuiz({ onClose }: SystemSelectionModalQuizProps) {
  const [phone, setPhone] = useState('+380');
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const phoneError = attempted && !isValidUaPhone(phone);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    if (!isValidUaPhone(phone)) return;
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="system-quiz-title"
        onClick={event => event.stopPropagation()}
      >
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Закрити">
          <svg width="24" height="24" viewBox="0 0 26 26" aria-hidden="true">
            <use href="/sprites.svg#icon-close-modal-sm" />
          </svg>
        </button>

        <h2 id="system-quiz-title" className={styles.title}>
          Підберіть систему під свій будинок
        </h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.question}>
            <p className={styles.questionTitle}>1. Який у вас тип будинку?</p>

            <p className={styles.hint}>Оберіть один варіант</p>

            <div className={styles.options}>
              <label className={styles.option}>
                <input type="radio" name="houseType" />
                <span>Приватний будинок</span>
              </label>

              <label className={styles.option}>
                <input type="radio" name="houseType" defaultChecked />
                <span>Заміський будинок</span>
              </label>

              <label className={styles.option}>
                <input type="radio" name="houseType" />
                <span>Таунхаус</span>
              </label>

              <label className={styles.option}>
                <input type="radio" name="houseType" />
                <span>Інше</span>
              </label>
            </div>
          </div>

          <div className={styles.question}>
            <p className={styles.questionTitle}>2. На який час потрібне резервне живлення?</p>

            <p className={styles.hint}>Оберіть один варіант</p>

            <div className={styles.options}>
              <label className={styles.option}>
                <input type="radio" name="backupTime" />
                <span>До 4 годин</span>
              </label>

              <label className={styles.option}>
                <input type="radio" name="backupTime" defaultChecked />
                <span>4–8 годин</span>
              </label>

              <label className={styles.option}>
                <input type="radio" name="backupTime" />
                <span>8–12 годин</span>
              </label>

              <label className={styles.option}>
                <input type="radio" name="backupTime" />
                <span>12–24 години</span>
              </label>

              <label className={styles.option}>
                <input type="radio" name="backupTime" />
                <span>Понад 24 години</span>
              </label>
            </div>
          </div>

          <div className={styles.question}>
            <p className={styles.questionTitle}>3. Як часто у вас бувають відключення?</p>

            <p className={styles.hint}>Оберіть один варіант</p>

            <div className={styles.options}>
              <label className={styles.option}>
                <input type="radio" name="blackoutFrequency" />
                <span>Рідко</span>
              </label>

              <label className={styles.option}>
                <input type="radio" name="blackoutFrequency" />
                <span>Кілька разів/тиждень</span>
              </label>

              <label className={styles.option}>
                <input type="radio" name="blackoutFrequency" />
                <span>Щодня</span>
              </label>

              <label className={styles.option}>
                <input type="radio" name="blackoutFrequency" defaultChecked />
                <span>Непередбачувано</span>
              </label>
            </div>
          </div>

          <div className={styles.question}>
            <p className={styles.questionTitle}>4. Чи хочете виробляти власну електроенергію?</p>

            <p className={styles.hint}>Оберіть один варіант</p>

            <div className={styles.options}>
              <label className={`${styles.option} ${styles.ownEnergyOption}`}>
                <input type="radio" name="ownEnergy" />
                <span>
                  Так, хочу сонячні <br className={styles.desktopLineBreak} />
                  панелі
                </span>
              </label>

              <label className={styles.option}>
                <input type="radio" name="ownEnergy" defaultChecked />
                <span>Достатньо резерву</span>
              </label>

              <label className={styles.option}>
                <input type="radio" name="ownEnergy" />
                <span>Не знаю</span>
              </label>
            </div>
          </div>

          <div className={styles.question}>
            <p className={styles.questionTitle}>5. Будинок підключений до мережі?</p>

            <p className={styles.hint}>Оберіть один варіант</p>

            <div className={styles.options}>
              <label className={styles.option}>
                <input type="radio" name="gridConnection" defaultChecked />
                <span>Так</span>
              </label>

              <label className={styles.option}>
                <input type="radio" name="gridConnection" />
                <span>Ні</span>
              </label>

              <label className={styles.option}>
                <input type="radio" name="gridConnection" />
                <span>Планується</span>
              </label>
            </div>
          </div>

          <div className={styles.question}>
            <p className={styles.questionTitle}>Що потрібно забезпечити під час відключення?</p>

            <p className={styles.hint}>Оберіть необхідне</p>

            <div className={styles.checkboxOptions}>
              <label className={styles.checkboxOption}>
                <input type="checkbox" defaultChecked />
                <span>Холодильник</span>
              </label>

              <label className={styles.checkboxOption}>
                <input type="checkbox" defaultChecked />
                <span>Освітлення</span>
              </label>

              <label className={styles.checkboxOption}>
                <input type="checkbox" defaultChecked />
                <span>Роутер</span>
              </label>

              <label className={styles.checkboxOption}>
                <input type="checkbox" defaultChecked />
                <span>Опалення Насос</span>
              </label>

              <label className={styles.checkboxOption}>
                <input type="checkbox" />
                <span>Кондиціонер</span>
              </label>

              <label className={styles.checkboxOption}>
                <input type="checkbox" />
                <span>Увесь будинок</span>
              </label>
            </div>
          </div>

          <div className={styles.phoneField}>
            <p className={styles.phoneTitle}>Залиште номер телефону</p>

            <p className={styles.phoneHint}>Вам зателефонують</p>

            <div
              className={`${styles.phoneInputWrapper} ${
                phoneError ? styles.phoneInvalid : phone.length > 4 ? styles.phoneValid : ''
              }`}
            >
              <span className={styles.phoneCode}>+380</span>

              <input
                type="tel"
                className={styles.phoneInput}
                value={phone.replace(/^\+380/, '')}
                onChange={event => {
                  let digits = event.target.value.replace(/\D/g, '');
                  if (digits.startsWith('380')) digits = digits.slice(3);
                  setPhone(normalizeUaPhone(digits));
                }}
                inputMode="tel"
                autoComplete="tel"
                maxLength={9}
                aria-invalid={phoneError}
                aria-describedby={phoneError ? 'quiz-phone-error' : undefined}
              />
            </div>

            {phoneError && (
              <p id="quiz-phone-error" className={styles.phoneError}>
                Будь ласка, введіть коректний номер телефону
              </p>
            )}
          </div>

          <button type="submit" className={styles.submitButton} disabled={phoneError}>
            Надіслати
          </button>

          <p className={styles.agreement}>
            Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.
          </p>
        </form>
      </div>
    </div>
  );
}
