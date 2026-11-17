/**
 * Lead form rules shared by the form (LeadForm.tsx) and the API route
 * (app/api/lead/route.ts), so the browser and server never disagree.
 */
export const NAME_MAX = 80;
export const PHONE_MAX = 30;
const PHONE_MIN_DIGITS = 6;

/** Digits, spaces, "+", "(", ")" and "-" only. Also used as the input's `pattern`. */
export const PHONE_PATTERN = `[0-9 +\\(\\)\\-]{${PHONE_MIN_DIGITS},${PHONE_MAX}}`;
const PHONE_REGEX = new RegExp(`^${PHONE_PATTERN}$`);

export function isValidPhone(phone: string) {
  return PHONE_REGEX.test(phone) && phone.replace(/\D/g, "").length >= PHONE_MIN_DIGITS;
}

export function isValidName(name: string) {
  return name.length > 0 && name.length <= NAME_MAX;
}
