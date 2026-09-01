'use client';

import { useState, useEffect } from 'react';
import styles from './ConsultationModal.module.css';

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

  const handleSubmit = () => {
    if (phone.length < 13) {
      setStatus('error');
      return;
    }
    setStatus('success');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayActive : ''}`}
      onClick={handleClose}
    >
      <div className={styles.greenBackdrop} onClick={e => e.stopPropagation()}>
        <button
          className={styles.closeBtnTablet}
          onClick={handleClose}
          aria-label="Закрити модалку"
        >
          <svg className={styles.closeIconTablet}>
            <use href="/sprites.svg#icon-close-modal-md" />
          </svg>
        </button>

        <div className={styles.modalOuter}>
          <button
            className={styles.closeBtnMobile}
            onClick={handleClose}
            aria-label="Закрити модалку"
          >
            <svg className={styles.closeIconMobile}>
              <use href="/sprites.svg#icon-close-modal-sm" />
            </svg>
          </button>

          <div className={styles.modalInner}>
            {status === 'success' ? (
              <>
                <h2 className={styles.title}>Дякуємо! Заявку надіслано</h2>
                <svg className={styles.successIcon}>
                  <use href="/sprites.svg#icon-check" />
                </svg>
                <p className={styles.successText}>
                  Ми отримали ваш номер телефону. Наш спеціаліст зв’яжеться з вами, щоб підібрати
                  оптимальне рішення для вашого будинку.
                </p>
              </>
            ) : (
              <>
                <h2 className={styles.title}>Отримайте безкоштовну консультацію</h2>
                <p className={styles.description}>
                  Залиште номер телефону — наш спеціаліст зв’яжеться з вами та допоможе підібрати
                  оптимальне енергетичне рішення для вашого будинку.
                </p>

                <div className={styles.formGroup}>
                  <div
                    className={`${styles.inputWrapper} ${status === 'error' ? styles.inputWrapperError : ''}`}
                  >
                    <svg className={styles.inputIcon}>
                      <use href="/sprites.svg#icon-phone" />
                    </svg>
                    <input
                      type="tel"
                      className={styles.input}
                      value={phone}
                      onChange={e => {
                        setPhone(e.target.value);
                        if (status === 'error') setStatus('form');
                      }}
                      placeholder="+380"
                    />
                    <div className={styles.inputLine} />
                  </div>

                  {status === 'error' && (
                    <p className={styles.error}>Будь ласка, введіть номер телефону.</p>
                  )}

                  <button
                    className={`${styles.submitBtn} ${status === 'error' ? styles.submitBtnDisabled : ''}`}
                    onClick={handleSubmit}
                    disabled={status === 'error'}
                  >
                    Консультація
                  </button>

                  <p className={styles.consent}>
                    Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
