"use client"
import React from "react";
import { useState } from "react";
import Image from "next/image";


const Carousel = ({ images }: {images: string[]}) => {
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
    <div className="relative w-full max-w-xl mx-auto overflow-hidden rounded-2xl shadow-lg">
      <Image
        src={images[current]}
        alt={`Slide ${current}`}
        width={64}
        height={64}
        className="w-full h-64 transition-all duration-500"
      />
      <button
        onClick={prevSlide}
        className="hover:cursor-pointer absolute top-1/2 left-4 transform -translate-y-1/2 bg-sky-400 bg-opacity-70 rounded-full p-2 hover:bg-opacity-100"
      >

        <span>{"<"}</span>


      </button>
      <button
        onClick={nextSlide}
        className="hover:cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 bg-sky-400 bg-opacity-70 rounded-full p-2 hover:bg-opacity-100"
      >

            <span>{">"}</span>

      </button>
    </div>
  );
};

export default Carousel;
