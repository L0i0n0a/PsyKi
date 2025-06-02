'use client';

import React, { useEffect, useRef, useState } from 'react';

type BiColorV2Props = {
  percentage: number;
};

const BiColorV2 = ({ percentage }: BiColorV2Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const colorArray = useRef<number[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imgDataRef = useRef<ImageData | null>(null);

  const [canvasSize, setCanvasSize] = useState(256);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.height = canvasSize;
    ctxRef.current = canvas.getContext('2d');
    colorArray.current = new Array(pixelAmount).fill(300);
    recalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasSize, percentage]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCanvasSize(256);
      } else {
        setCanvasSize(256);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pixelAmount = canvasSize * canvasSize;

  const color1 = [255, 128, 0, 255];

  const color2 = [0, 0, 255, 255];

  const [stats, setStats] = useState({ color1: 0, color2: 0, percentage: 0 });

  console.log('stats', stats);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.height = canvasSize;
    ctxRef.current = canvas.getContext('2d');
    colorArray.current = new Array(pixelAmount).fill(300);
    recalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasSize]);

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
    let testColor1 = 0;
    for (let i = 0; i < imgDataRef.current.data.length; i += 4) {
      if (colorArray.current[i / 4]) {
        setPixelColor(i, color1);
        testColor1++;
      } else {
        setPixelColor(i, color2);
      }
    }
    ctxRef.current.putImageData(imgDataRef.current, 0, 0);

    const percentage = Math.round((testColor1 / pixelAmount) * 100);
    setStats({
      color1: testColor1,
      color2: pixelAmount - testColor1,
      percentage,
    });
  }

  function fisherYates(array: number[]) {
    let i = array.length;
    while (--i) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function recalculate() {
    const colorPixels = Math.round(pixelAmount * percentage);
    colorArray.current.fill(1, 0, colorPixels);
    colorArray.current.fill(0, colorPixels);
    fisherYates(colorArray.current);
    colorize();
  }

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

export default BiColorV2;
