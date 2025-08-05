'use client';

import en from '@/locales/en.json';
import de from '@/locales/de.json';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/** Supported locale identifiers for the research application */
type Locale = 'en' | 'de';

/** Translation dictionaries mapping for type safety */
const dictionaries = {
  en,
  de,
} as const;

/**
 * Interface for dynamic content data used in research result displays
 *
 * Contains statistical and performance metrics that can be interpolated
 * into translated strings for personalized research feedback.
 */
type ContentData = Partial<{
  /** Number of trials where AI assistance was trusted */
  trustedCount: number;
  /** Number of correct decisions when AI was trusted */
  correctTrustedCount: number;
  /** AI model accuracy percentage for current session */
  accuracyAI: number;
  /** Human participant accuracy percentage */
  accuracyUser: number;
  /** Accuracy when working without AI assistance */
  accuracyWithoutHelp: number;
  /** Accuracy when working with AI assistance */
  accuracyWithHelp: number;
  /** Total number of completed trials */
  totalCount: number;
  /** Number of AI recommendations accepted */
  acceptedCount: number;
  /** Number of correct decisions among accepted recommendations */
  acceptedCorrectCount: number;
  /** Number of correct decisions made */
  rightCount: number;
  /** Total number of all trials presented */
  allCount: number;
}>;

/* ========================================
   TRANSLATION HOOK
   ======================================== */

/**
 * Translation Hook for Internationalization
 *
 * Provides a translation function that supports nested key lookup and
 * dynamic content interpolation. Enables seamless language switching
 * for research participants while maintaining data-driven personalization.
 *
 */
export const useTranslation = (locale: Locale = 'de') => {
  /**
   * Retrieve nested translation value using dot notation
   *
   * Traverses the translation object hierarchy to find the requested
   * translation key. Returns the original key if no translation is found.
   *
   * @param obj - Translation dictionary object
   * @param key - Dot-separated key path (e.g., 'section.item.text')
   * @returns Translated string or original key as fallback
   */
  const getNestedTranslation = (obj: unknown, key: string): string => {
    const result = key.split('.').reduce((acc, part) => (acc && typeof acc === 'object' && (acc as Record<string, unknown>)[part] !== undefined ? (acc as Record<string, unknown>)[part] : null), obj);
    return typeof result === 'string' ? result : key;
  };

  /**
   * Main translation function with dynamic content interpolation
   *
   * Retrieves translations from the dictionary and replaces template
   * variables with dynamic research data. Supports personalized feedback
   * and result displays with participant-specific metrics.
   *
   * @param key - Translation key (supports dot notation for nested keys)
   * @param contentData - Optional research metrics for variable interpolation
   * @returns Translated and interpolated string
   */
  const t = (key: string, contentData?: ContentData): string => {
    let translation = getNestedTranslation(dictionaries[locale], key);

    // Interpolate dynamic content data if provided
    if (contentData) {
      Object.entries(contentData).forEach(([k, v]) => {
        translation = translation.replaceAll(`{{${k}}}`, String(v));
      });
    }

    return translation;
  };

  return { t };
};
