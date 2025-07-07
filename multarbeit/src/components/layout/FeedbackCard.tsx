'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/utils/translation';
import { motion } from 'framer-motion';

interface FeedbackCardProps {
  type: number;
  index?: number;
  accuracyAI?: number;
  accuracyUser?: number;
  accuracyWithoutHelp?: number;
  accuracyWithHelp?: number;
  trustedCount?: number;
  correctTrustedCount?: number;
  totalCount?: number;
  acceptedCount?: number;
  acceptedCorrectCount?: number;
}

// --- Helper Functions ---
function interpolate(template: string, vars: Record<string, unknown>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return key in vars ? String(vars[key]) : '';
  });
}

// --- Component ---
export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  type,
  index = 0,
  accuracyAI = 93,
  accuracyUser = 72,
  accuracyWithoutHelp = 70,
  accuracyWithHelp = 82,
  trustedCount = 7,
  correctTrustedCount = 6,
  totalCount = 50,
  acceptedCount = 35,
  acceptedCorrectCount = 30,
}) => {
  const [locale] = useState<'de' | 'en'>('de');
  const { t } = useTranslation(locale);

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

  const title = t(`feedback.titles.${type}`);
  const rawContent = t(`feedback.content.${type}`);
  const content = interpolate(rawContent, contentData);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='md:text-2xl text-md p-2 max-w-4xl font-bold w-full mx-auto bg-gradient-to-r from-[#39ab52] to-[#66ad28] text-gray-900 rounded-[10px] shadow-lg mt-8 text-center z-10 absolute top-[-120] left-1/2 -translate-x-1/2'>
      <mark style={{ background: 'none', color: '#ffffff', padding: 0 }}>
        <div className='flex flex-col items-center justify-center'>
          <div className='font-bold'>{title}</div>
          <div className='text-white font-normal text-base mt-1'>{content}</div>
        </div>
      </mark>
    </motion.div>
  );
};
