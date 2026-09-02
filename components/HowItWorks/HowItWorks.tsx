import styles from './HowItWorks.module.css';

const steps = [
  {
    number: '01',
    title: 'Розповідаєте про будинок.',
    description: 'Вказуєте основні параметри та потреби.',
  },
  {
    number: '02',
    title: 'Отримуєте рекомендацію.',
    description: 'Ми підбираємо оптимальну конфігурацію.',
  },
  {
    number: '03',
    title: 'Узгоджуємо рішення.',
    description: 'Інженер уточнює технічні деталі.',
  },
  {
    number: '04',
    title: 'Встановлюємо систему.',
    description: 'Виконуємо монтаж та налаштування.',
  },
  {
    number: '05',
    title: 'Ви користуєтесь.',
    description: 'Система забезпечує будинок необхідною енергією.',
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Як це працює</h2>

        <div className={styles.content}>
          <p className={styles.subtitle}>
            Від вашої потреби — до готової системи
          </p>

          <ol className={styles.list}>
            {steps.map((step) => (
              <li key={step.number} className={styles.step}>
                <span className={styles.number}>{step.number}</span>
                <div className={styles.stepContent}>
                  <span className={styles.stepTitle}>{step.title}</span>{' '}
                  <span className={styles.stepDescription}>
                    {step.description}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
