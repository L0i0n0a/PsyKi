'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/utils/translation';
import { motion } from 'framer-motion';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Props interface for the FeedbackCard component
 *
 * Contains all possible performance metrics that can be used to generate
 * personalized feedback messages for participants in the research study.
 */
interface FeedbackCardProps {
  /** Feedback message type identifier for content selection */
  type: number;
  /** Optional index for animation sequencing */
  index?: number;
  /** AI system accuracy percentage (0-100) */
  accuracyAI?: number;
  /** User accuracy percentage without AI assistance (0-100) */
  accuracyUser?: number;
  /** User accuracy percentage without any help (0-100) */
  accuracyWithoutHelp?: number;
  /** User accuracy percentage with AI assistance (0-100) */
  accuracyWithHelp?: number;
  /** Number of times user trusted AI recommendations */
  trustedCount?: number;
  /** Number of times trusted AI recommendations were correct */
  correctTrustedCount?: number;
  /** Total number of decisions/trials */
  totalCount?: number;
  /** Number of AI recommendations accepted by user */
  acceptedCount?: number;
  /** Number of accepted AI recommendations that were correct */
  acceptedCorrectCount?: number;
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

/**
 * Template string interpolation utility
 *
 * Replaces template variables in the format {{variableName}} with actual values
 * from the provided data object. This allows for dynamic content generation
 * based on participant performance metrics.
 *
 * Example: "Your accuracy is {{accuracyUser}}%" becomes "Your accuracy is 85%"
 *
 * @param {string} template - Template string with {{variable}} placeholders
 * @param {Record<string, unknown>} vars - Object containing variable values
 * @returns {string} Interpolated string with variables replaced
 */
function interpolate(template: string, vars: Record<string, unknown>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return key in vars ? String(vars[key]) : '';
  });
}

/* ========================================
   MAIN COMPONENT
   ======================================== */

/**
 * Feedback Card Component
 *
 * Renders an animated feedback card that displays personalized performance
 * messages to participants. The content is dynamically generated based on
 * the participant's behavior patterns and performance metrics, providing
 * meaningful feedback to guide learning and improve human-AI collaboration.
 *
 * The component uses:
 * - Template-based content system for flexible message generation
 * - Animation system for engaging user experience
 * - Internationalization for research context flexibility
 * - Performance data integration for personalized feedback
 *
 * @param {FeedbackCardProps} props - Component properties
 * @returns {JSX.Element} Animated feedback card with personalized content
 */
export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  type,
  index = 0,
  // Default values represent typical research study metrics
  accuracyAI = 93, // AI system baseline accuracy
  accuracyUser = 72, // User baseline accuracy
  accuracyWithoutHelp = 70, // User accuracy without assistance
  accuracyWithHelp = 82, // User accuracy with AI assistance
  trustedCount = 7, // Number of AI recommendations trusted
  correctTrustedCount = 6, // Number of correct trusted recommendations
  totalCount = 50, // Total number of trials/decisions
  acceptedCount = 35, // Number of AI recommendations accepted
  acceptedCorrectCount = 30, // Number of correct accepted recommendations
}) => {
  /* ========================================
     STATE MANAGEMENT
     ======================================== */

  /** Current locale for internationalization (German default) */
  const [locale] = useState<'de' | 'en'>('de');

  /** Translation hook for content localization */
  const { t } = useTranslation(locale);

  /* ========================================
     CONTENT PREPARATION
     ======================================== */

  /**
   * Performance data object for template interpolation
   *
   * Contains all metrics that can be referenced in feedback message templates.
   * This centralized approach makes it easy to add new metrics or modify
   * existing ones without changing the interpolation logic.
   */
  const contentData = {
    trustedCount,
    correctTrustedCount,
    accuracyAI,
    accuracyUser,
    accuracyWithoutHelp,
    accuracyWithHelp,
    totalCount,
    acceptedCount,
    acceptedCorrectCount,
  };

  // Get localized content based on feedback type
  const title = t(`feedback.titles.${type}`);
  const rawContent = t(`feedback.content.${type}`);

  // Interpolate performance data into the content template
  const content = interpolate(rawContent, contentData);

  /* ========================================
     RENDER
     ======================================== */

  return (
    <motion.div
      key={index}
      // Animation configuration for smooth entry/exit
      initial={{ opacity: 0, y: 50 }} // Start below and transparent
      animate={{ opacity: 1, y: 0 }} // Animate to visible and in position
      exit={{ opacity: 0, y: -50 }} // Exit upward and fade out
      transition={{
        duration: 0.4,
        ease: 'easeOut',
      }}
      className='md:text-2xl text-md p-2 max-w-4xl font-bold w-full mx-auto bg-gradient-to-r from-[#39ab52] to-[#66ad28] text-gray-900 rounded-[10px] shadow-lg mt-8 text-center z-10 absolute top-[-120] left-1/2 -translate-x-1/2'
      role='alert'
      aria-live='polite'>
      {/* Content Container */}
      <mark
        style={{
          background: 'none',
          color: '#ffffff',
          padding: 0,
        }}>
        <div className='flex flex-col items-center justify-center'>
          {/* Feedback Title */}
          <div className='font-bold' role='heading' aria-level={3}>
            {title}
          </div>

          {/* Feedback Content with Performance Data */}
          <div className='text-white font-normal text-base mt-1'>{content}</div>
        </div>
      </mark>
    </motion.div>
  );
};
