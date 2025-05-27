'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Button from '../ui/Button/Button';

const codeString = `const BiColor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const colorArray = useRef<number[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null); // <-- add this
  const imgDataRef = useRef<ImageData | null>(null); // <-- add this

  const canvasSize = 512;
  const pixelAmount = canvasSize * canvasSize;

  const color1 = [255, 128, 0, 255];
  const color2 = [0, 0, 255, 255];

  const [stats, setStats] = useState({ color1: 0, color2: 0, percentage: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.height = canvasSize;
    ctxRef.current = canvas.getContext('2d');
    colorArray.current = new Array(pixelAmount).fill(0);
    recalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const percentage = parseFloat(inputRef.current?.value || '0.05');
    const colorPixels = Math.round(pixelAmount * percentage);
    colorArray.current.fill(1, 0, colorPixels);
    colorArray.current.fill(0, colorPixels);
    fisherYates(colorArray.current);
    colorize();
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <canvas ref={canvasRef} className=""></canvas>
      <div className="flex items-center justify-around gap-4">
        <input
          ref={inputRef}
          type="number"
          min="0"
          max="1"
          step="0.05"
          defaultValue="0.05"
          className="w-20 font-bold border-2 rounded-full px-2 py-1 mt-4"
        />
        <Button
          text="Neu berechnen"
          onClick={recalculate}
        />
      </div>
      <div className="mt-2 text-center font-mono">
        <div>Pixel gesamt: {pixelAmount}</div>
        <div>Farbe 1: {stats.color1}</div>
        <div>Farbe 2: {stats.color2}</div>
        <div>Prozentsatz Farbe 1: {stats.percentage}%</div>
        <div>Prozentsatz Farbe 2: {100 - stats.percentage}%</div>
      </div>
      <div className="w-full mt-6">
        <h2 className="text-lg font-bold mb-2">Code:</h2>
        <SyntaxHighlighter language="javascript" className="rounded-xl" style={vscDarkPlus} wrapLines={true}>
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default BiColor;`;


const BiColor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const colorArray = useRef<number[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null); // <-- add this
  const imgDataRef = useRef<ImageData | null>(null); // <-- add this

  const canvasSize = 512;
  const pixelAmount = canvasSize * canvasSize;

  const color1 = [255, 128, 0, 255];
  const color2 = [0, 0, 255, 255];

  const [stats, setStats] = useState({ color1: 0, color2: 0, percentage: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.height = canvasSize;
    ctxRef.current = canvas.getContext('2d');
    colorArray.current = new Array(pixelAmount).fill(0);
    recalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const percentage = parseFloat(inputRef.current?.value || '0.05');
    const colorPixels = Math.round(pixelAmount * percentage);
    colorArray.current.fill(1, 0, colorPixels);
    colorArray.current.fill(0, colorPixels);
    fisherYates(colorArray.current);
    colorize();
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <canvas ref={canvasRef} className=""></canvas>
      <div className="flex items-center justify-around gap-4">
        <input
          ref={inputRef}
          type="number"
          min="0"
          max="1"
          step="0.05"
          defaultValue="0.05"
          className="w-20 font-bold border-2 rounded-full px-2 py-1 mt-4"
        />
        <Button
          text="Neu berechnen"
          onClick={recalculate}
        />
      </div>
      <div className="mt-2 text-center font-mono">
        <div>Pixel gesamt: {pixelAmount}</div>
        <div>Farbe 1: {stats.color1}</div>
        <div>Farbe 2: {stats.color2}</div>
        <div>Prozentsatz Farbe 1: {stats.percentage}%</div>
        <div>Prozentsatz Farbe 2: {100 - stats.percentage}%</div>
      </div>
      <div className="w-full mt-6">
        <h2 className="text-lg font-bold mb-2">Code:</h2>
        <SyntaxHighlighter language="javascript" className="rounded-xl" style={vscDarkPlus} wrapLines={true}>
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default BiColor;