'use client';

import Image from 'next/image';
import styles from './MobileMenu.module.css';

export type MobileNavItem = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  isOpen: boolean;
  navItems: MobileNavItem[];
  onClose: () => void;
  onConsultationClick?: () => void;
};

export default function MobileMenu({
  isOpen,
  navItems,
  onClose,
  onConsultationClick,
}: MobileMenuProps) {
  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayActive : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <div
        className={`${styles.menu} ${isOpen ? styles.menuActive : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Мобільне меню"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <Image
          className={styles.bgImage}
          src="/images/hero/hero-section-mobile.jpg"
          alt=""
          fill
          sizes="100vw"
          aria-hidden
        />
        <div className={styles.scrim} aria-hidden="true" />

        <nav className={styles.nav}>
          <p className={styles.title}>Меню</p>

          <ul className={styles.list}>
            <li>
              <a href="#hero" className={styles.item} onClick={onClose} aria-label="Головна">
                <svg className={styles.homeIcon} width="20" height="20" aria-hidden="true">
                  <use href="/sprites.svg#icon-home" />
                </svg>
              </a>
            </li>

            {navItems.map(item => (
              <li key={item.href}>
                <a href={item.href} className={styles.item} onClick={onClose}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.ctaWrapper}>
          <button
            type="button"
            className={styles.cta}
            onClick={() => {
              onConsultationClick?.();
              onClose();
            }}
          >
            Консультація
          </button>
        </div>
      </div>
    </>
  );
}
