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

type ContentData = Partial<{
  trustedCount: number;
  correctTrustedCount: number;
  accuracyAI: number;
  accuracyUser: number;
  accuracyWithoutHelp: number;
  accuracyWithHelp: number;
  totalCount: number;
  acceptedCount: number;
  acceptedCorrectCount: number;
  rightCount: number;
  allCount: number;
}>;


export const useTranslation = (locale: Locale = 'de') => {
  const getNestedTranslation = (obj: any, key: string): string => {
    return key
      .split('.')
      .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), obj) || key;
  };

  const t = (key: string, contentData?: ContentData): string => {
    let translation = getNestedTranslation(dictionaries[locale], key);

    if (contentData) {
      Object.entries(contentData).forEach(([k, v]) => {
        translation = translation.replaceAll(`{{${k}}}`, String(v));
      });
    }

    return translation;
  };
  return { t };
};
