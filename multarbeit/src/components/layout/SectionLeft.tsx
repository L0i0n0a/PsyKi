import React from 'react';
import Button from '../ui/Button/Button';
import Image from 'next/image';

/* ========================================
   TYPE DEFINITIONS
   ======================================== */

/**
 * Props interface for the SectionLeft component
 *
 * Defines the properties required to render a responsive section
 * with text content on the left and an image on the right.
 */
type SectionLeftProps = {
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
 * SectionLeft - Responsive Content Layout Component
 *
 * Creates a flexible two-column layout optimized for presenting research content
 * with text information on the left and supporting visual content on the right.
 * The layout automatically adapts to different screen sizes for optimal viewing.
 *
 * @param {SectionLeftProps} props - Component props for content and behavior
 * @returns {React.FC} Responsive section with left text and right image layout
 */
const SectionLeft: React.FC<SectionLeftProps> = ({ imageSource, imageUrl, title, description, onClick }) => {
  return (
    <div className='flex flex-col md:flex-row items-center gap-8 p-6 max-w-6xl mx-auto'>
      {/* ========================================
          LEFT CONTENT SECTION
          ======================================== */}

      {/* Text content area with title, description, and action button */}
      <div className='w-full md:w-1/2 text-center md:text-left'>
        {/* Section title with prominent typography */}
        <h2 className='text-3xl font-bold mb-4'>{title}</h2>

        {/* Descriptive content with flexible React node rendering */}
        <p className='text-lg text-gray-700 pb-4'>{description}</p>

        {/* Action button centered on mobile, left-aligned on desktop */}
        <div className='flex justify-center'>
          <Button text='Mehr erfahren' onClick={onClick} />
        </div>
      </div>

      {/* ========================================
          RIGHT IMAGE SECTION
          ======================================== */}

      {/* Image display area with attribution */}
      <div className='w-full md:w-1/2'>
        {/* Optimized image with responsive sizing and styling */}
        <Image src={imageUrl} alt={title} width={500} height={500} className='w-full h-auto rounded-xl shadow-md object-cover' />

        {/* Image source attribution text */}
        <p className='imageSourceText'>{imageSource}</p>
      </div>
    </div>
  );
};

export default SectionLeft;
