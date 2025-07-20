'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/Button';

const OWModelStrategy: React.FC = () => {
  const router = useRouter();

  return (
    <div className='max-w-5xl mx-auto px-4 py-8 space-y-6'>
      <iframe
        src='/OW_Metagognitive.pdf'
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
        }}
      />
      <div className='flex justify-center'>
        <Button text='Zurück' onClick={() => router.push('/')} />
      </div>
    </div>
  );
};

export default OWModelStrategy;
