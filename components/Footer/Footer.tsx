import HashLink from '@/components/HashLink';
import styles from './Footer.module.css';
import { siteConfig } from '@/lib/site';

const socials = [
  { href: '#', icon: 'icon-instagram', label: 'Instagram' },
  { href: '#', icon: 'icon-facebook', label: 'Facebook' },
  { href: '#', icon: 'icon-telegram', label: 'Telegram' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <HashLink href="#hero" className={styles.logo} aria-label={siteConfig.name}>
              <svg className={styles.logoImg} width="118" height="54" aria-hidden="true">
                <use href="/sprites.svg#icon-logo" />
              </svg>
            </HashLink>
            <p className={styles.tagline}>{siteConfig.tagline}</p>
          </div>

          <div className={styles.company}>
            <h2 className={styles.heading}>Компанія</h2>
            <ul className={styles.list}>
              <li>
                <HashLink href="#projects">Проєкти</HashLink>
              </li>
              <li>
                <HashLink href="#about">Про нас</HashLink>
              </li>
            </ul>
          </div>

          <div className={styles.contacts}>
            <h2 className={styles.heading}>Контакти</h2>
            <ul className={styles.list}>
              <li>
                <a href={`tel:${siteConfig.phone}`}>{siteConfig.phoneLabel}</a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li>{siteConfig.address}</li>
              <li>{siteConfig.hours}</li>
            </ul>
          </div>

          <ul className={styles.socials} aria-label="Соціальні мережі">
            {socials.map((social) => (
              <li key={social.icon}>
                <a href={social.href} aria-label={social.label}>
                  <svg className={styles.socialIcon} aria-hidden="true">
                    <use href={`/sprites.svg#${social.icon}`} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            <span>© 2026 {siteConfig.name} —</span> <span>Усі права захищені</span>
          </p>
          <a href={`mailto:${siteConfig.email}?subject=Privacy%20Policy`}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
