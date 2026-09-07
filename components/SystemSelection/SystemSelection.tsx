'use client';

import styles from './SystemSelection.module.css';

export type SystemValue = 'backup' | 'full';

interface SystemSelectionProps {
  onSelectSystem?: (system: SystemValue) => void;
}

const systems: { value: SystemValue; title: string; description: string; ctaLabel: string }[] = [
  {
    value: 'backup',
    title: 'Захист від відключень',
    description: 'Електромережа є, але вам потрібне резервне живлення під час відключень.',
    ctaLabel: 'Підібрати резервне рішення',
  },
  {
    value: 'full',
    title: 'Автономне енергозабезпечення',
    description: 'Електромережі немає або ви хочете забезпечити будинок власною енергією.',
    ctaLabel: 'Підібрати автономну систему',
  },
];

export default function SystemSelection({ onSelectSystem }: SystemSelectionProps) {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>
          Надійна енергія для вашого будинку — незалежно від ситуації
        </h2>

        <div className={styles.cards}>
          {systems.map(system => (
            <div key={system.value} className={styles.card}>
              <h3 className={styles.cardTitle}>{system.title}</h3>
              <p className={styles.cardDescription}>{system.description}</p>
              <button
                type="button"
                className={styles.cardCta}
                onClick={() => onSelectSystem?.(system.value)}
              >
                {system.ctaLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
