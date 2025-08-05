import React from 'react';
import Button from '../ui/Button/Button';
import Image from 'next/image';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Props interface for the SectionMiddle component
 *
 * Defines the properties required to render a centered section
 * with vertical content flow and emphasized visual presentation.
 */
type SectionMiddleProps = {
  /** Source attribution text displayed below the image */
  imageSource: string;
  /** URL path to the image file for display */
  imageUrl: string;
  /** Main heading text for the section */
  title: string;
  /** Descriptive content rendered as React nodes for flexibility */
  description: React.ReactNode;
  /** Optional click handler for the action button */
  onClick?: () => void;
  /** Optional button type specification (currently supports 'button') */
  type?: 'button';
};

/* ========================================
   COMPONENT IMPLEMENTATION
   ======================================== */

/**
 * SectionMiddle - Centered Vertical Content Layout Component
 *
 * Creates a focused, center-aligned layout optimized for presenting key research
 * content with visual emphasis. The vertical flow guides user attention through
 * title, image, description, and action elements in a logical sequence.
 *
 * @param {SectionMiddleProps} props - Component props for content and behavior
 * @returns {React.FC} Centered vertical section with emphasized content layout
 */
const SectionMiddle: React.FC<SectionMiddleProps> = ({ imageSource, imageUrl, title, description, onClick }) => {
  return (
    <div className='flex flex-col items-center gap-6 p-6 max-w-4xl mx-auto text-center'>
      {/* ========================================
          UPPER CONTENT SECTION
          ======================================== */}

      {/* Title and image container with centered alignment */}
      <div className=''>
        {/* Section title with prominent typography */}
        <h2 className='text-3xl font-bold mb-4'>{title}</h2>

        {/* Featured image with responsive sizing and professional styling */}
        <Image src={imageUrl} alt={title} width={400} height={300} className='w-full h-auto rounded-xl shadow-md object-cover mx-auto' />

        {/* Image source attribution with subtle styling */}
        <p className='imageSourceText mt-2 text-sm text-gray-500'>{imageSource}</p>
      </div>

      {/* ========================================
          LOWER CONTENT SECTION
          ======================================== */}

      {/* Description and action button container */}
      <div className='w-full'>
        {/* Descriptive content with enhanced readability */}
        <p className='text-lg text-gray-700 mb-4'>{description}</p>

        {/* Action button centered for user interaction */}
        <div className='flex justify-center'>
          <Button text='Mehr erfahren' onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default SectionMiddle;
