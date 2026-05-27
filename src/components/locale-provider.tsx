"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "vt-tracker:locale";

function getSnapshot(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const storedLocale = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(storedLocale) ? storedLocale : DEFAULT_LOCALE;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const sync = () => callback();

  window.addEventListener("storage", sync);
  window.addEventListener("vt-tracker-locale-change", sync);

  return () => {
    window.removeEventListener("storage", sync);
    window.removeEventListener("vt-tracker-locale-change", sync);
  };
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_LOCALE);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale: Locale) => {
        if (typeof window === "undefined") {
          return;
        }

        window.localStorage.setItem(STORAGE_KEY, nextLocale);
        window.dispatchEvent(new Event("vt-tracker-locale-change"));
      },
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return context;
}
