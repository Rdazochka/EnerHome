'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Header.module.css';

const navItems = [
  { href: '#hero', label: 'Про нас' },
  { href: '#solutions', label: 'Рішення' },
  { href: '#projects', label: 'Проєкти' },
  { href: '#faq', label: 'FAQs' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div className={`${styles.container} container`}>
        <a href="#hero" className={styles.logo}>
          <Image
            src="/logo.svg"
            alt="EnerHome"
            width={118}
            height={54}
            className={styles.logoImg}
          />
        </a>

        <nav className={styles.nav}>
          {navItems.map(item => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#consultation" className={styles.cta}>
          Консультація
        </a>

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
              src="/logo.svg"
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
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={styles.mobileNavLink}
              onClick={handleLinkClick}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.mobileCtaWrapper}>
          <a href="#consultation" className={styles.mobileCta} onClick={handleLinkClick}>
            Консультація
          </a>
        </div>
      </div>
    </header>
  );
}
