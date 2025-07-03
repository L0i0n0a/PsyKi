'use client';

import { useEffect } from 'react';
import { initJsPsych } from 'jspsych';
import htmlSliderPlugin from '@jspsych/plugin-html-slider-response';
import htmlButtonPlugin from '@jspsych/plugin-html-button-response';

export default function TestPage() {
  const TOKEN = process.env.NEXT_PUBLIC_SAVE_DATA_TOKEN ?? '';

  useEffect(() => {
    const runJsPsych = async () => {
      const jsPsych = initJsPsych({
        on_finish: async () => {
          const jsonData = jsPsych.data.get().json();

          const res = await fetch('/api/save-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-secret-token': TOKEN,
            },
            body: jsonData,
          });

          if (res.ok) {
            alert('✅ Data saved successfully!');
          } else {
            alert('❌ Failed to save data.');
          }
        },
      });

      const timeline = [];

      timeline.push({
        type: htmlSliderPlugin,
        stimulus: '<p>Move the slider to indicate your color preference.</p>',
        labels: ['Red', 'Blue'],
        min: 0,
        max: 100,
        step: 1,
        slider_start: 50,
        data: { trial_type: 'slider' },
      });

      timeline.push({
        type: htmlButtonPlugin,
        stimulus: '<p>Now choose a color:</p>',
        choices: ['Red', 'Blue'],
        data: { trial_type: 'button' },
      });

      jsPsych.run(timeline);
    };

    runJsPsych();
  }, []);

  return (
    <div className='p-10'>
      <h1 className='text-2xl font-bold mb-4'>jsPsych Test</h1>
      <div id='jspsych-experiment'></div>
    </div>
  );
}
