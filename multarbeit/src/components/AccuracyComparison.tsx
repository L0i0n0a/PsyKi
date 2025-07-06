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
  menschAccuracy: number;
  kiAccuracy: number;
};

function scaleToPercent(val: number) {
  return ((val + 1) / 2) * 100;
}

export default function AccuracyComparison({ menschPercent, kiPercent, locale, decision, menschAccuracy, kiAccuracy }: AccuracyComparisonProps) {
  const { t } = useTranslation(locale);

  // const minThickness = 0.8;
  // const maxThickness = 14;

  // const scaleThickness = (percent: number) => minThickness + (percent / 100) * (maxThickness - minThickness);

  // const menschThickness = scaleThickness(menschPercent);
  // const kiThickness = scaleThickness(kiPercent);
  const decisionPercent = decision;

  const menschX = scaleToPercent(menschPercent); // menschPercent is now -1..1
  const kiX = scaleToPercent(kiPercent);

  // 0–100 maps to 0–100%

  //console.log(decision);

  // Todo correct calculation for decision aid
  const decisionX = scaleToPercent(decision);

  // const bubbleX = 50; // stays centered

  const curveYStart = 64;
  const curveYEnd = 64;
  const controlY = 0;

  const decisionXPx = decisionX;
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
    '#FB8C00', // dark orange (right)
    '#FFE0B2', // light orange (left)

    menschX / 100
  );

  const kiColor = interpolateColor(
    '#90CAF9', // light blue (left)
    '#0D47A1', // dark blue (right)
    kiX / 100
  );

const clampedDecision = Math.max(-1, Math.min(1, decisionPercent));
const color = Math.abs(clampedDecision); // always a positive interpolation factor between 0 and 1

const decisionColor =
  decisionPercent >= 0
    ? interpolateColor(
        '#90CAF9', // light blue (start)
        '#0D47A1', // dark blue (end)
        color
      )
    : interpolateColor(
        '#FFE0B2', // light orange (start)
        '#FB8C00', // dark orange (end)
        color
      );


  function VariableWidthCurve({
    x1,
    y1,
    cx,
    cy,
    x2,
    y2,
    color,
    min,
    max,
    steps = 40,
  }: {
    x1: number;
    y1: number;
    cx: number;
    cy: number;
    x2: number;
    y2: number;
    color: string;
    min: number;
    max: number;
    steps?: number;
  }) {
    const segments = [];
    for (let i = 0; i < steps; i++) {
      const t1 = i / steps;
      const t2 = (i + 1) / steps;
      // Quadratic Bezier formula
      const getPoint = (t: number) => ({
        x: (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2,
        y: (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2,
      });
      const p1 = getPoint(t1);
      const p2 = getPoint(t2);
      // Thickness: thick at ends, thin in middle
      const thickness = min + (max - min) * (2 * (t1 - 0.5) ** 2); // Parabola: max at ends, min at middle
      segments.push(<line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={color} strokeWidth={thickness} strokeLinecap='round' fill='none' />);
    }
    return <>{segments}</>;
  }

  return (
    <div className='flex flex-col items-center justify-center p-6'>
      <h1 className='text-2xl mb-36 text-center'> {t('zScore')}</h1>
      <div className='flex flex-col w-full max-w-3xl'>
        <div className='flex items-center justify-between relative  w-full'>
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
                className='absolute top-10 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white shadow z-10'
                style={{
                  left: `${decisionX}%`,
                  transform: 'translateX(-50%) translateY(-50%)',
                  backgroundColor: decisionColor,
                  border: '5px solid #ffffff',
                }}
              />

              {/* SVG Curves */}
              <svg className='absolute top-[-130px] left-0 w-full h-[200px] pointer-events-none' xmlns='http://www.w3.org/2000/svg' viewBox='0 -10 100 100' preserveAspectRatio='none'>
                {/* Mensch variable-width curve */}
                <VariableWidthCurve x1={menschX} y1={curveYStart} cx={menschX + 2} cy={controlY} x2={decisionXPx} y2={curveYEnd} color={menschColor} min={4} max={14} />
                {/* KI variable-width curve */}
                <VariableWidthCurve x1={kiX} y1={curveYStart} cx={kiX - 8} cy={controlY} x2={decisionXPx} y2={curveYEnd} color={kiColor} min={4} max={14} />
              </svg>
            </div>

            {/* Labels */}
            <div className='flex justify-between text-sm text-gray-600 mt-2 px-1'>
              <span>{t('labelStrongOrange')}</span>
              <span>{t('labelOrange')}</span>
              <span>{t('labelNeutral')}</span>
              <span>{t('labelBlue')}</span>
              <span>{t('labelStrongBlue')}</span>
            </div>
          </div>
          {/* Prozentwerte unterhalb der Marker */}
          <div className='my-14 absolute top-4 w-full flex flex-col justify-center text-center font-semibold px-2'>
            <p>{t('accuracyValues')}</p>
            <div className='flex flex-row justify-center'>
              <div>
                <p className='text-base font-semibold'>{t('human')}</p>
                <p className='text-lg font-bold'>{menschAccuracy}%</p>
              </div>
              <div>
                <p className='text-base font-semibold'>{t('ki')}</p>
                <p className='text-lg font-semibold'>{kiAccuracy}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
