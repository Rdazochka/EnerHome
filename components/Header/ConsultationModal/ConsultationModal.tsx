'use client';

import { FormEvent, useEffect, useState } from 'react';
import styles from './ConsultationModal.module.css';
import { isValidUaPhone, normalizeUaPhone } from '@/lib/phone';

type ModalStatus = 'form' | 'error' | 'success';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [phone, setPhone] = useState('+380');
  const [status, setStatus] = useState<ModalStatus>('form');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setPhone('+380');
        setStatus('form');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (event?: FormEvent) => {
    event?.preventDefault();
    if (!isValidUaPhone(phone)) {
      setStatus('error');
      return;
    }
    setStatus('success');
  };

  const handlePhoneChange = (value: string) => {
    setPhone(normalizeUaPhone(value));
    if (status === 'error') setStatus('form');
  };

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayActive : ''}`}
      onClick={onClose}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-modal-title"
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Закрити модалку"
        >
          <svg className={styles.closeIcon} aria-hidden="true">
            <use href="/sprites.svg#icon-close-modal-sm" />
          </svg>
        </button>

        <div className={`${styles.card} ${status === 'success' ? styles.cardSuccess : ''}`}>
          {status === 'success' ? (
            <>
              <h2 id="consultation-modal-title" className={styles.title}>
                Дякуємо! Заявку надіслано
              </h2>
              <svg className={styles.successIcon} aria-hidden="true">
                <use href="/sprites.svg#icon-check" />
              </svg>
              <p className={styles.successText}>
                Ми отримали ваш номер телефону. Наш спеціаліст зв’яжеться з вами, щоб підібрати
                оптимальне рішення для вашого будинку.
              </p>
            </>
          ) : (
            <>
              <h2 id="consultation-modal-title" className={styles.title}>
                Отримайте безкоштовну консультацію
              </h2>
              <p className={styles.description}>
                Залиште номер телефону — наш спеціаліст зв’яжеться з вами та допоможе підібрати
                оптимальне енергетичне рішення для вашого будинку.
              </p>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div
                  className={`${styles.inputWrapper} ${status === 'error' ? styles.inputWrapperError : ''}`}
                >
                  <svg className={styles.inputIcon} aria-hidden="true">
                    <use href="/sprites.svg#icon-phone" />
                  </svg>
                  <div className={styles.inputField}>
                    <input
                      type="tel"
                      className={styles.input}
                      value={phone}
                      onChange={e => handlePhoneChange(e.target.value)}
                      placeholder="+380"
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={13}
                      aria-invalid={status === 'error'}
                      aria-describedby={status === 'error' ? 'consultation-phone-error' : undefined}
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <p id="consultation-phone-error" className={styles.error}>
                    Будь ласка, введіть коректний номер телефону.
                  </p>
                )}

                <div className={styles.submitGroup}>
                  <button
                    type="submit"
                    className={`${styles.submitBtn} ${status === 'error' ? styles.submitBtnDisabled : ''}`}
                    disabled={status === 'error'}
                  >
                    Консультація
                  </button>

                  <p className={styles.consent}>
                    Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
