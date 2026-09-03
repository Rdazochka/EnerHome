'use client';

import styles from './FinalCta.module.css';

interface FinalCtaProps {
  onConsultationClick?: () => void;
}

export default function FinalCta({ onConsultationClick }: FinalCtaProps) {
  return (
    <section className={styles.section} id="consultation">
      <div className={`container ${styles.container}`}>
        <div className={styles.card}>
          <h2 className={styles.title}>Не знаєте, яке рішення підійде вашому будинку?</h2>
          <p className={styles.text}>
            Розкажіть про свої потреби — ми підберемо оптимальну систему та покажемо її орієнтовну
            вартість.
          </p>
          <button type="button" className={styles.cta} onClick={onConsultationClick}>
            Консультація
          </button>
        </div>
      </div>
    </section>
  );
}
