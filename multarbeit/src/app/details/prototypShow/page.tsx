'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';

const OWModelPrototyp: React.FC = () => {
  // Initialize Next.js router for navigation
  const router = useRouter();

  return (
    <div className='max-w-5xl mx-auto px-4 py-8 space-y-6'>
      {/* PDF Viewer Container */}
      <iframe
        src='/DesignPrototypVerknüpfung_OW.pdf'
        style={{
          width: '100%',
          height: '100vh', // Full viewport height for optimal viewing
          border: 'none', // Clean appearance without borders
        }}
        title='Optimal Weighting Model Prototype Documentation'
      />

      {/* Navigation Controls */}
      <div className='flex justify-center'>
        <Button text='Zurück' onClick={() => router.push('/')} />
      </div>
    </div>
  );
};

export default OWModelPrototyp;
