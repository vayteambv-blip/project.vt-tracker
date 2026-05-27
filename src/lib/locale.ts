export type Locale = "ru" | "nl";

export const SUPPORTED_LOCALES: Locale[] = ["ru", "nl"];

export const DEFAULT_LOCALE: Locale = "ru";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "ru" || value === "nl";
}

