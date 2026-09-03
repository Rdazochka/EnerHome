'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Header.module.css';
import MobileMenu from './Mobile-menu/MobileMenu';

const navItems = [
  { href: '#about', label: 'Про нас' },
  { href: '#solutions', label: 'Рішення' },
  { href: '#projects', label: 'Проєкти' },
  { href: '#faq', label: 'FAQs' },
];

interface HeaderProps {
  onConsultationClick?: () => void;
}

function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} width="78" height="35" aria-hidden="true" focusable="false">
      <use href="/sprites.svg#icon-logo" />
    </svg>
  );
}

export default function Header({ onConsultationClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const syncHeight = () => {
      document.documentElement.style.setProperty(
        '--header-height',
        `${header.offsetHeight}px`
      );
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header ref={headerRef} className={styles.header}>
        <div className={styles.container}>
          <a href="#hero" className={styles.logo} aria-label="EnerHome">
            <Logo className={styles.logoImg} />
          </a>

          <nav className={styles.nav}>
            <a href="#hero" className={styles.navHomeIcon} aria-label="Головна">
              <svg width="24" height="24" aria-hidden="true">
                <use href="/sprites.svg#icon-home" />
              </svg>
            </a>
            {navItems.map(item => (
              <a key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>

          <button type="button" className={styles.cta} onClick={onConsultationClick}>
            Консультація
          </button>

          <button
            type="button"
            className={styles.burger}
            onClick={() => setIsMenuOpen(open => !open)}
            aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
            aria-expanded={isMenuOpen}
          >
            <svg
              className={isMenuOpen ? styles.closeIcon : styles.burgerIcon}
              aria-hidden="true"
            >
              <use href={isMenuOpen ? '/sprites.svg#icon-close' : '/sprites.svg#icon-burger'} />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        navItems={navItems}
        onClose={() => setIsMenuOpen(false)}
        onConsultationClick={onConsultationClick}
      />
    </>
  );
}
