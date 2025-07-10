'use client';

import React, { useEffect, useRef, useState } from 'react';

type BiColorProps = {
  percentage: number;
  index: number;
};

const colorBlue = [0, 0, 255, 255];
const colorOrange = [255, 128, 0, 255];

const BiColor = ({ percentage, index }: BiColorProps) => {
  const [canvasSize, setCanvasSize] = useState(256);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const colorArray = useRef<number[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imgDataRef = useRef<ImageData | null>(null);

  const pixelAmount = canvasSize * canvasSize;

  // --- Effects ---
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(window.innerWidth < 640 ? 256 : 256);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.height = canvasSize;
    ctxRef.current = canvas.getContext('2d');
    colorArray.current = new Array(pixelAmount).fill(0);
    recalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasSize, index]);

  // --- Functions ---
  function setPixelColor(pixel: number, color: number[]) {
    if (!imgDataRef.current) return;
    imgDataRef.current.data[pixel] = color[0];
    imgDataRef.current.data[pixel + 1] = color[1];
    imgDataRef.current.data[pixel + 2] = color[2];
    imgDataRef.current.data[pixel + 3] = color[3];
  }

  function colorize() {
    if (!ctxRef.current) return;
    imgDataRef.current = ctxRef.current.getImageData(0, 0, canvasSize, canvasSize);
    for (let i = 0; i < imgDataRef.current.data.length; i += 4) {
      if (colorArray.current[i / 4]) {
        setPixelColor(i, colorBlue);
      } else {
        setPixelColor(i, colorOrange);
      }
    }
    ctxRef.current.putImageData(imgDataRef.current, 0, 0);
  }

  function fisherYates(array: number[]) {
    let i = array.length;
    while (--i) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function recalculate() {
    const orangeFraction = percentage / 100;
    const colorPixels = Math.round(pixelAmount * orangeFraction);
    colorArray.current.fill(1, 0, colorPixels);
    colorArray.current.fill(0, colorPixels);
    fisherYates(colorArray.current);
    colorize();
  }

  // --- Render ---
  return (
    <div className='flex flex-col items-center gap-4 p-4'>
      <canvas
        ref={canvasRef}
        style={{
          width: canvasSize,
          height: canvasSize,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};

export default BiColor;
