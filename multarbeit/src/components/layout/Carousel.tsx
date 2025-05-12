"use client"
import React from "react";
import { useState } from "react";
import Image from "next/image";


const Carousel = ({ images, imageDescriptions }: {images: string[], imageDescriptions: string[]}) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  if (!Array.isArray(images) || images.length === 0) {
    return <div>No images available.</div>;
  }

  return (
    <div className="relative h-96 w-full max-w-xl mx-auto overflow-hidden rounded-2xl shadow-lg mb-8">
      <div className="flex flex-col justify-between h-full p-4">
      <Image
        src={images[current]}
        alt={`Slide ${current}`}
        width={400}
        height={400}
        className="w-full transition-all duration-500"
      />
      <p className="imageSourceText">{imageDescriptions[current]}</p>
      </div>
      
      <button
        onClick={prevSlide}
        className="hover:cursor-pointer absolute top-1/2 left-4 transform -translate-y-1/2 bg-sky-400 bg-opacity-70 rounded-full p-2 hover:bg-opacity-100"
      >

        <span className="text-white">{"<"}</span>


      </button>
      <button
        onClick={nextSlide}
        className="hover:cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 bg-sky-400 bg-opacity-70 rounded-full p-2 hover:bg-opacity-100"
      >

            <span className="text-white">{">"}</span>

      </button>
    </div>
  );
};

export default Carousel;
