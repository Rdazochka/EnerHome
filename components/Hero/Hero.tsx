'use client';

import styles from './Hero.module.css';

interface HeroProps {
  onConsultationClick?: () => void;
}

export default function Hero({ onConsultationClick }: HeroProps) {
  return (
    <section className={styles.hero} id="hero">
      <picture className={styles.picture}>
        <source
          media="(min-width: 1440px)"
          srcSet="/images/hero/hero-section-desktop.jpg 1x, /images/hero/hero-section-desktop-2x.jpg 2x"
        />
        <source
          media="(min-width: 834px)"
          srcSet="/images/hero/hero-section-tablet.jpg 1x, /images/hero/hero-section-tablet-2x.jpg 2x"
        />
        <img
          src="/images/hero/hero-section-mobile.jpg"
          srcSet="/images/hero/hero-section-mobile.jpg 1x, /images/hero/hero-section-mobile-2x.jpg 2x"
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