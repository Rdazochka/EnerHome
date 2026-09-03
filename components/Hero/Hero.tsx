'use client';

import styles from './Hero.module.css';

interface HeroProps {
  onConsultationClick?: () => void;
}

export default function Hero({ onConsultationClick }: HeroProps) {
  return (
    <section className={styles.hero} id="hero">
      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>
          Надійна енергія для вашого будинку — незалежно від ситуації
        </h1>
        <p className={styles.subtitle}>
          Підберемо систему резервного або автономного живлення відповідно до потреб вашого
          будинку.
        </p>
        <button type="button" className={styles.cta} onClick={onConsultationClick}>
          Консультація
        </button>
      </div>
    </section>
  );
}
