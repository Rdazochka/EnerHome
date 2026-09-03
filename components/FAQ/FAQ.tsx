'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';
import { faqItems } from '@/lib/faq';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faq} id="faq">
      <div className="container">
        <span className={styles.label}>FAQs</span>
        <h2 className={styles.title}>Не знайшли відповіді на своє питання?</h2>
        <p className={styles.description}>
          Зібрали відповіді на найпоширеніші запитання про автономні
          енергетичні системи, їхню роботу, встановлення
        </p>

        <ul className={styles.list}>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;

            return (
              <li key={item.question} className={styles.item}>
                <button
                  type="button"
                  className={`${styles.question} ${isOpen ? styles.questionActive : ''}`}
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
                  <span>{item.question}</span>
                </button>
                {isOpen && (
                  <div id={panelId} className={styles.answer}>
                    <p>{item.answer}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
