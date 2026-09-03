'use client';

import Image from 'next/image';
import HashLink from '@/components/HashLink';
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
              <HashLink
                href="#hero"
                className={styles.item}
                delay={140}
                onClick={onClose}
                aria-label="Головна"
              >
                <svg className={styles.homeIcon} width="20" height="20" aria-hidden="true">
                  <use href="/sprites.svg#icon-home" />
                </svg>
              </HashLink>
            </li>

            {navItems.map(item => (
              <li key={item.href}>
                <HashLink
                  href={item.href}
                  className={styles.item}
                  delay={140}
                  onClick={onClose}
                >
                  {item.label}
                </HashLink>
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
