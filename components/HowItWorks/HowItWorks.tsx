import styles from './HowItWorks.module.css';

const steps = [
  {
    number: '01',
    text: 'Розповідаєте про будинок. Вказуєте основні параметри та потреби.',
  },
  {
    number: '02',
    text: 'Отримуєте рекомендацію. Ми підбираємо оптимальну конфігурацію.',
  },
  {
    number: '03',
    text: 'Узгоджуємо рішення. Інженер уточнює технічні деталі.',
  },
  {
    number: '04',
    text: 'Встановлюємо систему. Виконуємо монтаж та налаштування.',
  },
  {
    number: '05',
    text: 'Ви користуєтесь. Система забезпечує будинок необхідною енергією.',
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.frame1}>
        <div className={styles.frame2}>
          <div className={styles.frame3}>
            <h2 className={styles.title}>Як це працює</h2>

            <div className={styles.content}>
              <div className={styles.frame4}>
                <p className={styles.subtitle}>
                  Від вашої потреби — до готової системи
                </p>
              </div>

              <ol className={styles.list}>
            {steps.map((step) => (
              <li key={step.number} className={styles.step}>
                <span className={styles.number}>{step.number}</span>
                <div className={styles.stepContent}>{step.text}</div>
              </li>
            ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
