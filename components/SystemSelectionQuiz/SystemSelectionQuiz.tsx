'use client';

import { FormEvent, useState } from 'react';
import styles from './SystemSelectionQuiz.module.css';
import { isValidUaPhone, normalizeUaPhone } from '@/lib/phone';

type QuizStep = {
  question: string;
  hint: string;
  multiple?: boolean;
  options: string[];
  defaultAnswer: string[];
};

const systemLabels: Record<string, string> = {
  backup: 'Захист від відключень',
  full: 'Повна автономність',
};

const quizSteps: QuizStep[] = [
  {
    question: 'Для чого потрібна система?',
    hint: 'Оберіть один варіант',
    options: [systemLabels.backup, systemLabels.full],
    defaultAnswer: [],
  },
  {
    question: 'Який у вас тип будинку?',
    hint: 'Оберіть один варіант',
    options: ['Приватний будинок', 'Заміський будинок', 'Таунхаус', 'Інше'],
    defaultAnswer: ['Заміський будинок'],
  },
  {
    question: 'На який час потрібне резервне живлення?',
    hint: 'Оберіть один варіант',
    options: ['До 4 годин', '4–8 годин', '8–12 годин', '12–24 години', 'Понад 24 години'],
    defaultAnswer: ['4–8 годин'],
  },
  {
    question: 'Як часто у вас бувають відключення?',
    hint: 'Оберіть один варіант',
    options: ['Рідко', 'Кілька разів/тиждень', 'Щодня', 'Непередбачувано'],
    defaultAnswer: ['Непередбачувано'],
  },
  {
    question: 'Чи хочете виробляти власну електроенергію?',
    hint: 'Оберіть один варіант',
    options: ['Так, хочу сонячні панелі', 'Достатньо резерву', 'Не знаю'],
    defaultAnswer: ['Достатньо резерву'],
  },
  {
    question: 'Будинок підключений до мережі?',
    hint: 'Оберіть один варіант',
    options: ['Так', 'Ні', 'Планується'],
    defaultAnswer: ['Так'],
  },
  {
    question: 'Що потрібно забезпечити під час відключення?',
    hint: 'Оберіть необхідне',
    multiple: true,
    options: [
      'Холодильник',
      'Освітлення',
      'Роутер',
      'Опалення Насос',
      'Кондиціонер',
      'Увесь будинок',
    ],
    defaultAnswer: ['Холодильник', 'Освітлення', 'Роутер', 'Опалення Насос'],
  },
];

const phoneStepIndex = quizSteps.length;

interface SystemSelectionQuizProps {
  defaultSystem?: string;
}

export default function SystemSelectionQuiz({ defaultSystem = 'full' }: SystemSelectionQuizProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>(() =>
    Object.fromEntries(
      quizSteps.map((step, index) => [
        index,
        index === 0 ? [systemLabels[defaultSystem] ?? systemLabels.full] : step.defaultAnswer,
      ]),
    ),
  );
  const [phone, setPhone] = useState('+380');
  const [attempted, setAttempted] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const isPhoneStep = stepIndex === phoneStepIndex;
  const step = quizSteps[stepIndex];
  const currentAnswer = answers[stepIndex] ?? [];
  const phoneError = attempted && !isValidUaPhone(phone);

  const selectAnswer = (option: string) => {
    setAnswers(prev => {
      const selected = prev[stepIndex] ?? [];

      if (!step.multiple) return { ...prev, [stepIndex]: [option] };

      return {
        ...prev,
        [stepIndex]: selected.includes(option)
          ? selected.filter(item => item !== option)
          : [...selected, option],
      };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);
    if (!isValidUaPhone(phone)) return;
    setIsSent(true);
  };

  return (
    <section className={styles.quiz}>
      <div className={styles.quizOuter}>
        <div className={styles.quizInner}>
          <h2 className={styles.quizTitle}>Підберіть систему під свій будинок</h2>

          <div className={styles.quizRow}>
            <div className={styles.quizInfo}>
              <h3 className={styles.quizSubtitle}>Не знаєте, що вам потрібно?</h3>

              <p className={styles.quizText}>
                Відповідайте на кілька простих запитань — і отримаєте рекомендоване рішення.
              </p>
            </div>

            <div className={styles.quizCard}>
              <h3 className={styles.quizCardTitle}>Підберемо систему для вас</h3>

              {isSent ? (
                <div className={styles.quizDone}>
                  <svg className={styles.quizDoneIcon} aria-hidden="true">
                    <use href="/sprites.svg#icon-check" />
                  </svg>

                  <p className={styles.quizDoneTitle}>Дякуємо! Заявку надіслано</p>

                  <p className={styles.quizDoneText}>
                    Ми зателефонуємо вам і запропонуємо рішення під ваш будинок.
                  </p>
                </div>
              ) : isPhoneStep ? (
                <form className={styles.quizForm} onSubmit={handleSubmit}>
                  <p className={styles.quizQuestion}>Залиште номер телефону</p>

                  <p className={styles.quizHint}>Вам зателефонують</p>

                  <div
                    className={`${styles.phoneWrapper} ${phoneError ? styles.phoneWrapperError : ''}`}
                  >
                    <span className={styles.phoneCode}>+380</span>

                    <input
                      type="tel"
                      className={styles.phoneInput}
                      value={phone.replace(/^\+380/, '')}
                      onChange={event => {
                        let digits = event.target.value.replace(/\D/g, '');
                        if (digits.startsWith('380')) digits = digits.slice(3);
                        setPhone(normalizeUaPhone(digits));
                      }}
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={9}
                      aria-invalid={phoneError}
                      aria-describedby={phoneError ? 'quiz-phone-error' : undefined}
                    />
                  </div>

                  {phoneError && (
                    <p id="quiz-phone-error" className={styles.phoneError}>
                      Будь ласка, введіть коректний номер телефону
                    </p>
                  )}

                  <button type="submit" className={styles.quizSubmitBtn}>
                    Надіслати
                  </button>

                  <p className={styles.quizAgreement}>
                    Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.
                  </p>

                  <button
                    type="button"
                    className={styles.quizBackBtn}
                    onClick={() => setStepIndex(phoneStepIndex - 1)}
                  >
                    ← Попереднє питання
                  </button>
                </form>
              ) : (
                <>
                  <p className={styles.quizProgress}>
                    Питання {stepIndex + 1} з {quizSteps.length}
                  </p>

                  <p className={styles.quizQuestion}>{step.question}</p>

                  <p className={styles.quizHint}>{step.hint}</p>

                  <div className={styles.quizOptions}>
                    {step.options.map(option => {
                      const isChecked = currentAnswer.includes(option);

                      return (
                        <label key={option} className={styles.quizOption}>
                          <input
                            type={step.multiple ? 'checkbox' : 'radio'}
                            name={`quiz-step-${stepIndex}`}
                            value={option}
                            className={styles.optionInput}
                            checked={isChecked}
                            onChange={() => selectAnswer(option)}
                          />

                          {step.multiple ? (
                            <span className={styles.optionBox} aria-hidden="true" />
                          ) : (
                            <span className={styles.optionIcon}>
                              <svg className={styles.optionIconOuter} aria-hidden="true">
                                <use href="/sprites.svg#icon-circle-stroke" />
                              </svg>

                              {isChecked && (
                                <svg className={styles.optionIconFill} aria-hidden="true">
                                  <use href="/sprites.svg#icon-circle-fill" />
                                </svg>
                              )}
                            </span>
                          )}

                          <span className={styles.optionText}>{option}</span>
                        </label>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    className={styles.quizNextBtn}
                    disabled={currentAnswer.length === 0}
                    onClick={() => setStepIndex(stepIndex + 1)}
                  >
                    {stepIndex === quizSteps.length - 1
                      ? 'Залишити номер →'
                      : 'Наступне питання →'}
                  </button>

                  {stepIndex > 0 && (
                    <button
                      type="button"
                      className={styles.quizBackBtn}
                      onClick={() => setStepIndex(stepIndex - 1)}
                    >
                      ← Попереднє питання
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
