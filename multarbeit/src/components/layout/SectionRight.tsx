import React from "react";
import Button from "../ui/Button/Button";
import Image from "next/image";

const SectionRight = ({ imageUrl, title, description, onClick }: {imageUrl: string, title: string, description: string, onClick?: () => void, type?: "button" }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-6 max-w-6xl mx-auto">
      <div className="w-full md:w-1/2">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={500}
          className="w-full h-auto rounded-xl shadow-md object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-gray-700 pb-4">{description}</p>
        <Button text="Mehr erfahren" onClick={onClick} />
      </div>
    </div>
  );
};

export default SectionRight;
