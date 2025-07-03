'use client';

import { useState } from 'react';

export default function TestPage() {
  const [status, setStatus] = useState('');
  const TOKEN = process.env.NEXT_PUBLIC_SAVE_DATA_TOKEN ?? '';

  const handleSave = async () => {
    const res = await fetch('/api/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-secret-token': TOKEN,
      },
      body: JSON.stringify({ message: 'PsyKi Test' }),
    });

    if (res.ok) {
      setStatus('✅ Data saved successfully!');
    } else {
      setStatus('❌ Failed to save data.');
    }
  };

  return (
    <div className='p-10'>
      <h1 className='text-2xl font-bold mb-4'>Save Test</h1>
      <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={handleSave}>
        PsyKi Test
      </button>
      <div className='mt-4'>{status}</div>
    </div>
  );
}
