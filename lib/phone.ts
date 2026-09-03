/** Ukrainian mobile operator codes (2 digits after +380) */
const UA_MOBILE_OPERATORS = new Set([
  '39',
  '50',
  '63',
  '66',
  '67',
  '68',
  '73',
  '75',
  '77',
  '91',
  '92',
  '93',
  '94',
  '95',
  '96',
  '97',
  '98',
  '99',
]);

export function normalizeUaPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  const withoutCountry = digits.startsWith('380') ? digits.slice(3) : digits;
  return `+380${withoutCountry.slice(0, 9)}`;
}

export function isValidUaPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  if (!/^380\d{9}$/.test(digits)) return false;

  const operator = digits.slice(3, 5);
  if (!UA_MOBILE_OPERATORS.has(operator)) return false;

  const subscriber = digits.slice(5);
  return !/^0+$/.test(subscriber);
}
