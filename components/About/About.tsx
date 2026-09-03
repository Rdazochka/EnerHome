import styles from './About.module.css';

const reasons = [
  {
    title: 'Індивідуальний підхід.',
    text: 'Підбираємо систему під площу будинку, споживання та ваші потреби.',
  },
  {
    title: 'Енергонезалежність.',
    text: 'Менше залежності від перебоїв електромережі та зовнішніх умов.',
  },
  {
    title: 'Комплексне рішення.',
    text: 'Від підбору обладнання до встановлення та запуску системи.',
  },
];

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div className={`container ${styles.container}`}>
        <div className={styles.card}>
          <h2 className={styles.title}>Про нас</h2>
          <p className={styles.slogan}>Ваша енергія. Ваш дім. Ваша незалежність.</p>

          <div className={styles.copy}>
            <p>
              Ми створюємо автономні енергетичні рішення для приватних будинків і дач. Допомагаємо
              отримати стабільне електропостачання там, де мережа працює нестабільно або взагалі
              відсутня.
            </p>
            <p>
              Підбираємо систему відповідно до потреб вашого будинку — від резервного живлення для
              найнеобхіднішого до повністю автономного енергозабезпечення.
            </p>
          </div>

          <h3 className={styles.why}>Чому саме ми?</h3>

          <ol className={styles.reasons}>
            {reasons.map((reason, index) => (
              <li key={reason.title}>
                <span className={styles.reasonTitle}>
                  {index + 1}. {reason.title}
                </span>{' '}
                {reason.text}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
