'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Props interface for BiColor component
 */
type BiColorProps = {
  /** Percentage value (0-100) determining the ratio of orange to blue pixels */
  percentage: number;
  /** Index value used to trigger re-calculations when changed */
  index: number;
};

/* ========================================
   COLOR CONSTANTS
   ======================================== */

/** Blue color in RGBA format [R, G, B, A] - represents one category/state */
const colorBlue = [0, 0, 255, 255];

/** Orange color in RGBA format [R, G, B, A] - represents alternative category/state */
const colorOrange = [255, 128, 0, 255];

/**
 * BiColor Component
 *
 * Renders a canvas with randomly distributed pixels in two colors based on percentage.
 * The component creates a visual representation useful for psychological research,
 * particularly in signal detection tasks and probability visualization.
 *
 * @param {BiColorProps} props - Component properties
 * @param {number} props.percentage - Percentage (0-100) of orange pixels
 * @param {number} props.index - Trigger value for re-calculation
 * @returns {JSX.Element} Canvas element with two-color pixel distribution
 */
const BiColor = ({ percentage, index }: BiColorProps) => {
  /* ========================================
     STATE AND REFS
     ======================================== */

  /** Canvas size in pixels (width and height) */
  const [canvasSize, setCanvasSize] = useState(256);

  /** Reference to the HTML canvas element */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /** Array storing color assignments for each pixel (0 = orange, 1 = blue) */
  const colorArray = useRef<number[]>([]);

  /** Reference to the 2D rendering context */
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  /** Reference to ImageData for pixel manipulation */
  const imgDataRef = useRef<ImageData | null>(null);

  /** Total number of pixels in the canvas */
  /** Total number of pixels in the canvas */
  const pixelAmount = canvasSize * canvasSize;

  /* ========================================
     EFFECTS AND LIFECYCLE
     ======================================== */

  /**
   * Effect: Handle responsive canvas sizing
   *
   * Adjusts canvas size based on screen width for responsive behavior.
   * Currently set to 256px for all screen sizes, but structure allows
   * for easy responsive adjustments.
   */
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(window.innerWidth < 640 ? 256 : 256);
    };

    // Initialize size on mount
    handleResize();

    // Add resize listener for responsive behavior
    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Effect: Initialize canvas and trigger recalculation
   *
   * Sets up the canvas context and initializes the color array whenever
   * the canvas size or index changes. The index dependency allows external
   * components to trigger re-randomization.
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    canvas.width = canvas.height = canvasSize;

    // Get 2D rendering context
    ctxRef.current = canvas.getContext('2d');

    // Initialize color array with zeros (all orange initially)
    colorArray.current = new Array(pixelAmount).fill(0);

    // Calculate and render the initial distribution
    recalculate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasSize, index]);

  /* ========================================
     CANVAS MANIPULATION FUNCTIONS
     ======================================== */

  /**
   * Sets the color of a specific pixel in the ImageData
   *
   * @param {number} pixel - The pixel index (multiply by 4 for RGBA data array index)
   * @param {number[]} color - RGBA color array [R, G, B, A]
   */
  function setPixelColor(pixel: number, color: number[]) {
    if (!imgDataRef.current) return;

    // Each pixel has 4 values in the data array (RGBA)
    imgDataRef.current.data[pixel] = color[0]; // Red
    imgDataRef.current.data[pixel + 1] = color[1]; // Green
    imgDataRef.current.data[pixel + 2] = color[2]; // Blue
    imgDataRef.current.data[pixel + 3] = color[3]; // Alpha
  }

  /**
   * Applies colors to all pixels based on the color array
   *
   * Iterates through all pixels and applies either blue or orange color
   * based on the values in the colorArray. This function performs the
   * actual rendering of the color distribution to the canvas.
   */
  function colorize() {
    if (!ctxRef.current) return;

    // Get ImageData for pixel manipulation
    imgDataRef.current = ctxRef.current.getImageData(0, 0, canvasSize, canvasSize);

    // Iterate through all pixels (increment by 4 for RGBA values)
    for (let i = 0; i < imgDataRef.current.data.length; i += 4) {
      const pixelIndex = i / 4; // Convert RGBA index to pixel index

      if (colorArray.current[pixelIndex]) {
        // Value of 1 = blue pixel
        setPixelColor(i, colorBlue);
      } else {
        // Value of 0 = orange pixel
        setPixelColor(i, colorOrange);
      }
    }

    // Apply the modified ImageData back to the canvas
    ctxRef.current.putImageData(imgDataRef.current, 0, 0);
  }

  /**
   * Fisher-Yates shuffle algorithm for random array permutation
   *
   * Randomly shuffles the color array to ensure unbiased distribution
   * of colors across the canvas. This creates a random pattern rather
   * than clustered or ordered color placement.
   *
   * @param {number[]} array - Array to shuffle in-place
   */
  function fisherYates(array: number[]) {
    let i = array.length;

    // Work backwards through the array
    while (--i) {
      // Pick a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements at positions i and j
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  /**
   * Recalculates and redraws the color distribution
   *
   * This is the main function that:
   * 1. Calculates how many pixels should be orange based on percentage
   * 2. Fills the color array with appropriate ratios
   * 3. Randomly shuffles the distribution
   * 4. Applies the colors to the canvas
   *
   * Called whenever the percentage or index changes.
   */
  function recalculate() {
    // Calculate fraction of pixels that should be orange
    const orangeFraction = percentage / 100;
    const colorPixels = Math.round(pixelAmount * orangeFraction);

    // Fill array: first part with 1s (blue), rest with 0s (orange)
    colorArray.current.fill(1, 0, colorPixels); // Blue pixels
    colorArray.current.fill(0, colorPixels); // Orange pixels

    // Randomly shuffle the distribution for natural appearance
    fisherYates(colorArray.current);

    // Apply colors to the canvas
    colorize();
  }

  /* ========================================
     RENDER
     ======================================== */

  return (
    <div className='flex flex-col items-center gap-4 p-4'>
      <canvas
        ref={canvasRef}
        style={{
          width: canvasSize,
          height: canvasSize,
          imageRendering: 'pixelated', // Ensures crisp pixel rendering
        }}
        aria-label={`Two-color visualization showing ${percentage}% orange and ${100 - percentage}% blue distribution`}
      />
    </div>
  );
};

export default BiColor;
