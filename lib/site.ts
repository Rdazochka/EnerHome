const fallbackUrl = 'https://ener-home.vercel.app';

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, '');

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production.replace(/\/$/, '')}`;

  const preview = process.env.VERCEL_URL;
  if (preview) return `https://${preview.replace(/\/$/, '')}`;

  return fallbackUrl;
}

export const siteConfig = {
  name: 'EnerHome',
  url: resolveSiteUrl(),
  locale: 'uk_UA',
  title: 'EnerHome — автономна енергія для вашого дому',
  description:
    'Підбираємо сонячні системи, генератори та резервне живлення для приватних будинків. Стабільна енергія там, де мережа працює нестабільно або відсутня.',
  tagline: 'Автономна енергія для вашого дому',
  keywords: [
    'автономне живлення',
    'сонячні панелі',
    'генератор для будинку',
    'резервне електропостачання',
    'інвертор',
    'акумуляторна система',
    'енергонезалежність',
    'EnerHome',
    'Київ',
  ],
  email: 'info@example.com',
  phone: '+380',
  phoneLabel: '+380 XX XXX XX XX',
  address: 'м. Київ, Україна',
  hours: 'Пн–Пт, 09:00–18:00',
} as const;
