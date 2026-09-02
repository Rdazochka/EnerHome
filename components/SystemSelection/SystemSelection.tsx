'use client';

import styles from './SystemSelection.module.css';

interface SystemSelectionProps {
  onConsultationClick?: () => void;
}

const systems = [
  {
    title: 'Захист від відключень',
    description:
      'Електромережа є, але вам потрібне резервне живлення під час відключень.',
    ctaLabel: 'Підібрати резервне рішення',
  },
  {
    title: 'Автономне енергозабезпечення',
    description:
      'Електромережі немає або ви хочете забезпечити будинок власною енергією.',
    ctaLabel: 'Підібрати автоному систему',
  },
];

export default function SystemSelection({ onConsultationClick }: SystemSelectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Надійна енергія для вашого будинку — незалежно від ситуації
        </h2>

        <div className={styles.cards}>
          {systems.map((system) => (
            <div key={system.title} className={styles.card}>
              <h3 className={styles.cardTitle}>{system.title}</h3>
              <p className={styles.cardDescription}>{system.description}</p>
              <button className={styles.cardCta} onClick={onConsultationClick}>
                {system.ctaLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
