import React from 'react';
import Button from '../ui/Button/Button';
import Image from 'next/image';

type SectionMiddleProps = {
  imageSource: string;
  imageUrl: string;
  title: string;
  description: React.ReactNode;
  onClick?: () => void;
  type?: 'button';
};

const SectionMiddle: React.FC<SectionMiddleProps> = ({
  imageSource,
  imageUrl,
  title,
  description,
  onClick,
}) => {
  return (
    <div className='flex flex-col items-center gap-6 p-6 max-w-4xl mx-auto text-center'>
      <div className=''>
        <h2 className='text-3xl font-bold mb-4'>{title}</h2>
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={300}
          className='w-full h-auto rounded-xl shadow-md object-cover mx-auto'
        />
        <p className='imageSourceText mt-2 text-sm text-gray-500'>{imageSource}</p>
      </div>
      <div className='w-full'>
        
        <p className='text-lg text-gray-700 mb-4'>{description}</p>
        <div className='flex justify-center'>
          <Button text='Mehr erfahren' onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default SectionMiddle;
