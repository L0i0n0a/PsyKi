'use client';

import React, { useState } from 'react';
import Image from 'next/image';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Props interface for the Carousel component
 *
 * The component requires matched arrays of images and descriptions
 * to provide proper context for each visual element.
 */
type CarouselProps = {
  /** Array of image paths/URLs to display in the carousel */
  images: string[];
  /** Array of descriptions corresponding to each image */
  imageDescriptions: string[];
};

/* ========================================
   MAIN COMPONENT
   ======================================== */

/**
 * Carousel Component
 *
 * Renders an interactive image carousel with navigation controls and descriptions.
 * The component manages the current slide state and provides smooth transitions
 * between images. It's designed to showcase design evolution and visual documentation
 * in the research application.
 *
 * @param {CarouselProps} props - Component properties
 * @param {string[]} props.images - Array of image paths to display
 * @param {string[]} props.imageDescriptions - Array of image descriptions
 * @returns {JSX.Element} Interactive carousel or error message
 */
const Carousel: React.FC<CarouselProps> = ({ images, imageDescriptions }) => {
  /* ========================================
     STATE MANAGEMENT
     ======================================== */

  /** Current slide index (0-based) */
  const [current, setCurrent] = useState(0);

  /** Total number of images in the carousel */
  const length = images.length;

  /* ========================================
     NAVIGATION HANDLERS
     ======================================== */

  /**
   * Navigate to the previous slide
   *
   * Implements circular navigation - when at the first slide (index 0),
   * clicking previous will go to the last slide for seamless user experience.
   */
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  /**
   * Navigate to the next slide
   *
   * Implements circular navigation - when at the last slide,
   * clicking next will go to the first slide for continuous browsing.
   */
  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  /* ========================================
     ERROR HANDLING
     ======================================== */

  // Handle empty or invalid image arrays
  if (!Array.isArray(images) || images.length === 0) {
    return <div className='text-center text-gray-500 p-8'>No images available.</div>;
  }

  /* ========================================
     RENDER
     ======================================== */

  return (
    <div className='relative h-96 w-full max-w-xl mx-auto overflow-hidden rounded-2xl shadow-lg mb-8'>
      {/* Main Image Container */}
      <div className='flex flex-col justify-between h-full p-4'>
        {/* Current Image with Next.js Optimization */}
        <Image
          src={images[current]}
          alt={imageDescriptions[current] || `Slide ${current + 1}`}
          width={400}
          height={400}
          className='w-full transition-all duration-500'
          priority={current === 0} // Prioritize loading the first image
        />

        {/* Image Description */}
        <p className='imageSourceText'>{imageDescriptions[current]}</p>
      </div>

      {/* Navigation Controls */}

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className='hover:cursor-pointer absolute top-1/2 left-4 transform -translate-y-1/2 bg-sky-400 bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-opacity duration-200'
        aria-label='Vorheriges Bild'
        disabled={length <= 1} // Disable if only one image
      >
        <span className='text-white font-bold'>&lt;</span>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className='hover:cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 bg-sky-400 bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-opacity duration-200'
        aria-label='Nächstes Bild'
        disabled={length <= 1} // Disable if only one image
      >
        <span className='text-white font-bold'>&gt;</span>
      </button>

      {/* Slide Indicators (Optional - shown if multiple images) */}
      {length > 1 && (
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${index === current ? 'bg-sky-400' : 'bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Gehe zu Bild ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
