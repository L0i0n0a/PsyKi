import React from 'react';
// import { useState } from "react";
import { useTranslation } from '@/utils/translation';
// import dataDe from '@/lib/dataMainDe.json';
// import dataEn from '@/lib/dataMainEn.json';

type AccuracyComparisonProps = {
  menschPercent: number; // 0–100
  kiPercent: number;
  locale: 'de' | 'en';
  decision: number;
};

export default function AccuracyComparison({ menschPercent, kiPercent, locale, decision }: AccuracyComparisonProps) {
  const { t } = useTranslation(locale);

  const minThickness = 0.5;
  const maxThickness = 14;

  const scaleThickness = (percent: number) => minThickness + (percent / 100) * (maxThickness - minThickness);

  const menschThickness = scaleThickness(menschPercent);
  const kiThickness = scaleThickness(kiPercent);
  const decisionPercent = decision;

  const menschX = (100 - menschPercent) / 2;
  const kiX = 50 + kiPercent / 2;

  console.log(decision);

  // Todo correct calculation for decision aid
  const decisionX = decisionPercent <= 50 ? 50 - decisionPercent : decisionPercent;

  // const bubbleX = 50; // stays centered

  const curveYStart = 64;
  const curveYEnd = 64;
  const controlY = 0;

  const decisionXPx = (decisionX / 100) * 100;
  function hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function interpolateColor(color1: string, color2: string, t: number) {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const r = Math.round(c1.r + (c2.r - c1.r) * t);
    const g = Math.round(c1.g + (c2.g - c1.g) * t);
    const b = Math.round(c1.b + (c2.b - c1.b) * t);
    return rgbToHex({ r, g, b });
  }

  const menschColor = interpolateColor(
    '#FFE0B2', // light orange (0%)
    '#FB8C00', // dark orange (100%)
    menschPercent / 100
  );

  const kiColor = interpolateColor(
    '#90CAF9', // light blue (0%)
    '#0D47A1', // dark blue (100%)
    kiPercent / 100
  );

const decisionColor =
  decisionPercent >= 50
    ? interpolateColor(
        '#90CAF9', // light orange
        '#0D47A1', // dark orange
        (decisionPercent - 50) / 50 // maps 50–100 to 0–1
      )
    : interpolateColor(
        '#FFE0B2', // light blue
        '#FB8C00', // dark blue
        (50 - decisionPercent) / 50 // maps 50–0 to 0–1
      );



  return (
    <div className='flex flex-col items-center justify-center p-6'>
      <h1 className='text-2xl mb-36 text-center'> {t('zScore')}</h1>
      <div className='flex flex-col w-full max-w-3xl'>
        <div className='flex items-center justify-between relative  w-full'>
          {/* Mensch */}
          <div className='text-center'>
            <p className='text-lg font-semibold'>{t('human')}</p>
            <p className='text-xl font-bold'>{menschPercent}%</p>
          </div>

          {/* Z-Score Visualisierung */}
          <div className='relative flex-1 mx-4'>
            <div
              className='h-8 w-full rounded-full relative overflow-visible'
              style={{
                background: 'linear-gradient(to right, #FB8C00 , #FFE0B2 50%,  #90CAF9 50%, #0D47A1)',
              }}>
              {/* Vertical Divider */}
              <div className='absolute left-[50%] top-0 h-full w-0.5 bg-white opacity-70 z-10' />

              {/* Mensch Marker */}
              <div
                className='absolute top-8 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white shadow z-10'
                style={{
                  left: `${menschX}%`,
                  transform: 'translateX(-50%) translateY(-50%)',
                  backgroundColor: menschColor,
                }}
              />

              {/* KI Marker */}
              <div
                className='absolute top-8 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white shadow z-10'
                style={{
                  left: `${kiX}%`,
                  transform: 'translateX(-50%) translateY(-50%)',
                  backgroundColor: kiColor,
                }}
              />

              {/* Decision Marker */}
              <div>
                <p
                  className='absolute top-[-60] -translate-y-1/2 z-10'
                  style={{
                    left: `${decisionX}%`,
                    transform: 'translateX(-50%) translateY(-50%)',
                    color: decisionColor,
                  }}>
                  {t('result')}
                </p>
              </div>
              <div
                className='absolute top-8 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white shadow z-10'
                style={{
                  left: `${decisionX}%`,
                  transform: 'translateX(-50%) translateY(-50%)',
                  backgroundColor: decisionColor,
                }}
              />

              {/* SVG Curves */}
              <svg className='absolute top-[-130px] left-0 w-full h-[200px] pointer-events-none' xmlns='http://www.w3.org/2000/svg' viewBox='0 -10 100 100' preserveAspectRatio='none'>
                {/* Mensch thinner curve */}
                <path
                  d={`M ${menschX} ${curveYStart} Q ${menschX + 2} ${controlY}, ${decisionXPx} ${curveYEnd}`}
                  stroke={menschColor}
                  strokeWidth={menschThickness * 0.6}
                  strokeLinecap='round'
                  fill='none'
                />
                {/* Mensch thicker overlay */}
                {/*   <path
    d={`M ${menschX} ${curveYStart} Q ${menschX + 2} ${controlY}, ${bubbleX} ${curveYEnd}`}
    stroke={menschColor}
    strokeWidth={menschThickness} // max thickness
    strokeLinecap="round"
    fill="none"
    strokeOpacity={0.3} // lighter overlay for smoothness
  /> */}

                {/* KI thinner curve */}
                <path d={`M ${kiX} ${curveYStart} Q ${kiX - 8} ${controlY}, ${decisionXPx} ${curveYEnd}`} stroke={kiColor} strokeWidth={kiThickness * 0.6} strokeLinecap='round' fill='none' />
                {/* KI thicker overlay */}
                {/*   <path
    d={`M ${kiX} ${curveYStart} Q ${kiX - 8} ${controlY}, ${bubbleX} ${curveYEnd}`}
    stroke={kiColor}
    strokeWidth={kiThickness}
    strokeLinecap="round"
    fill="none"
    strokeOpacity={0.3}
  /> */}
              </svg>
            </div>

            {/* Labels */}
            <div className='flex justify-between text-sm text-gray-600 mt-2 px-1'>
              <span>100%</span>
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* KI */}
          <div className='text-center'>
            <p className='text-lg font-semibold'>{t('ki')}</p>
            <p className='text-xl font-bold'>{kiPercent}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
