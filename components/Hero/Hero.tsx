'use client';

import styles from './Hero.module.css';

interface HeroProps {
  onConsultationClick?: () => void;
}

export default function Hero({ onConsultationClick }: HeroProps) {
  return (
    <section className={styles.hero} id="hero">
      <picture className={styles.picture}>
        <source media="(min-width: 1440px)" srcSet="/hero-desk.png" />
        <source media="(min-width: 834px)" srcSet="/hero-tab.png" />
        <img
          src="/hero-mob.png"
          alt="Сучасний енергоефективний будинок з сонячними панелями"
          className={styles.bgImage}
        />
      </picture>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>
          Надійна енергія для вашого будинку — незалежно від ситуації
        </h1>
        <p className={styles.subtitle}>
          Підберемо систему резервного або автономного живлення відповідно до
          потреб вашого будинку.
        </p>
        <button className={styles.cta} onClick={onConsultationClick}>
          Консультація
        </button>
      </div>
    </section>
  );
}