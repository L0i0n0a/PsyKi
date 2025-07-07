'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type CarouselProps = {
  images: string[];
  imageDescriptions: string[];
};

const Carousel: React.FC<CarouselProps> = ({ images, imageDescriptions }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // --- Handlers ---
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  // --- Render ---
  if (!Array.isArray(images) || images.length === 0) {
    return <div>No images available.</div>;
  }

  return (
    <div className='relative h-96 w-full max-w-xl mx-auto overflow-hidden rounded-2xl shadow-lg mb-8'>
      <div className='flex flex-col justify-between h-full p-4'>
        <Image src={images[current]} alt={imageDescriptions[current] || `Slide ${current + 1}`} width={400} height={400} className='w-full transition-all duration-500' />
        <p className='imageSourceText'>{imageDescriptions[current]}</p>
      </div>

      <button
        onClick={prevSlide}
        className='hover:cursor-pointer absolute top-1/2 left-4 transform -translate-y-1/2 bg-sky-400 bg-opacity-70 rounded-full p-2 hover:bg-opacity-100'
        aria-label='Vorheriges Bild'>
        <span className='text-white'>&lt;</span>
      </button>
      <button
        onClick={nextSlide}
        className='hover:cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 bg-sky-400 bg-opacity-70 rounded-full p-2 hover:bg-opacity-100'
        aria-label='Nächstes Bild'>
        <span className='text-white'>&gt;</span>
      </button>
    </div>
  );
};

export default Carousel;
