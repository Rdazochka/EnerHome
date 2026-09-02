import { useEffect, useState } from 'react';
import styles from './SystemSelectionModal.module.css';

type SystemSelectionModalProps = {
  onClose: () => void;
};

export default function SystemSelectionModal({ onClose }: SystemSelectionModalProps) {
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Закрити">
          ×
        </button>

        <h2 className={styles.title}>Підберіть систему під свій будинок</h2>

        <form className={styles.form}>
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
                <span>Замiський будинок</span>
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
                phone.length > 0 ? styles.phoneValid : styles.phoneInvalid
              }`}
            >
              <span className={styles.phoneCode}>+380</span>

              <input
                type="tel"
                className={styles.phoneInput}
                value={phone}
                onChange={event => setPhone(event.target.value)}
              />
            </div>

            {phone.length === 0 && (
              <p className={styles.phoneError}>Будь ласка, введіть номер телефону</p>
            )}
          </div>

          <button type="submit" className={styles.submitButton} disabled={phone.length === 0}>
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
