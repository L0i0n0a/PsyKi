'use client';

import en from '@/locales/en.json';
import de from '@/locales/de.json';

type Locale = 'en' | 'de';

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

// --- Translation Hook ---
export const useTranslation = (locale: Locale = 'de') => {
  const getNestedTranslation = (obj: unknown, key: string): string => {
    const result = key.split('.').reduce((acc, part) => (acc && typeof acc === 'object' && (acc as Record<string, unknown>)[part] !== undefined ? (acc as Record<string, unknown>)[part] : null), obj);
    return typeof result === 'string' ? result : key;
  };

  // Main translation function
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
