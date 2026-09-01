'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Header.module.css';
import ConsultationModal from '@/components/ConsultationModal/ConsultationModal';

const navItems = [
  { href: '#hero', label: 'Про нас' },
  { href: '#solutions', label: 'Рішення' },
  { href: '#projects', label: 'Проєкти' },
  { href: '#faq', label: 'FAQs' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#hero" className={styles.logo}>
          <Image
            src="/Logo.png"
            alt="EnerHome"
            width={118}
            height={54}
            className={styles.logoImg}
          />
        </a>

        <nav className={styles.nav}>
          <a href="#hero" className={styles.navHomeIcon}>
            <svg width="24" height="24">
              <use href="/sprites.svg#icon-home" />
            </svg>
          </a>
          {navItems.map(item => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <button className={styles.cta} onClick={() => setIsModalOpen(true)}>
          Консультація
        </button>

        <button
          className={styles.burger}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Відкрити меню"
        >
          <svg className={styles.burgerIcon}>
            <use href="/sprites.svg#icon-burger" />
          </svg>
        </button>
      </div>

      <div
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayActive : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuActive : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <a href="#hero" className={styles.logo} onClick={handleLinkClick}>
            <Image
              src="/Logo.png"
              alt="EnerHome"
              width={118}
              height={54}
              className={styles.mobileLogo}
            />
          </a>

          <button
            className={styles.closeBtn}
            onClick={() => setIsMenuOpen(false)}
            aria-label="Закрити меню"
          >
            <svg className={styles.closeIcon}>
              <use href="/sprites.svg#icon-close" />
            </svg>
          </button>
        </div>

        <nav className={styles.mobileNav}>
          <div className={styles.mobileMenuTitle}>Меню</div>
          <div className={styles.mobileMenuLine} />

          <a href="#hero" className={styles.mobileNavItem} onClick={handleLinkClick}>
            <svg className={styles.mobileNavIcon}>
              <use href="/sprites.svg#icon-home" />
            </svg>
          </a>

          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={styles.mobileNavItem}
              onClick={handleLinkClick}
            >
              <span className={styles.mobileNavLink}>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className={styles.mobileCtaWrapper}>
          <button className={styles.mobileCta} onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }}>
            Консультація
          </button>
        </div>
      </div>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}
