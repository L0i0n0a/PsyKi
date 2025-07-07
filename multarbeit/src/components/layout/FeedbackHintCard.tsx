import React from 'react';

type ColorScheme = {
  bg: string;
  hoverBg: string;
  border: string;
  title: string;
  text: string;
};

const colorMap: Record<string, ColorScheme> = {
  green: {
    bg: 'bg-green-50',
    hoverBg: 'hover:bg-green-100',
    border: 'border-green-300',
    title: 'text-green-800',
    text: 'text-green-900',
  },
  blue: {
    bg: 'bg-blue-50',
    hoverBg: 'hover:bg-blue-100',
    border: 'border-blue-300',
    title: 'text-blue-800',
    text: 'text-blue-900',
  },
  yellow: {
    bg: 'bg-yellow-50',
    hoverBg: 'hover:bg-yellow-100',
    border: 'border-yellow-300',
    title: 'text-yellow-800',
    text: 'text-yellow-900',
  },
  violet: {
    bg: 'bg-violet-50',
    hoverBg: 'hover:bg-violet-100',
    border: 'border-violet-300',
    title: 'text-violet-800',
    text: 'text-violet-900',
  },
  orange: {
    bg: 'bg-orange-50',
    hoverBg: 'hover:bg-orange-100',
    border: 'border-orange-300',
    title: 'text-orange-800',
    text: 'text-orange-900',
  },
};

type FeedbackHintCardProps = {
  title: string;
  children: React.ReactNode;
  color: string;
};

const FeedbackHintCard: React.FC<FeedbackHintCardProps> = ({ title, children, color }) => {
  const c = colorMap[color] || colorMap['green'];

  return (
    <div className={`border rounded-xl p-6 shadow-md transition-colors duration-300 ${c.bg} ${c.hoverBg} ${c.border}`}>
      <h3 className={`text-lg font-semibold mb-2 ${c.title}`}>{title}</h3>
      <div className={`text-base leading-relaxed ${c.text}`}>{children}</div>
    </div>
  );
};

export default FeedbackHintCard;
