'use client';

import en from '@/locales/en.json';
import de from '@/locales/de.json';

type Locale = 'en' | 'de';

// Extract keys from one of the dictionaries to provide type safety
type TranslationKeys = keyof typeof en;

const dictionaries = {
  en,
  de,
} as const;

export const useTranslation = (locale: Locale = 'de') => {
  const t = (key: TranslationKeys): string => {
    return dictionaries[locale][key] || key;
  };

  return { t };
};
