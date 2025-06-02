'use client';
import { useState } from 'react';
import BiColorV2 from '@/components/canvas/BiColorV2';
import ColorSlider from '@/components/ui/Slider/Slider';
import data from '@/lib/dataMain.json';
import { useRouter } from 'next/navigation';

const Mainphase = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [finished, setFinished] = useState(false);
  const [showRecom, setShowRecom] = useState(false);

  const handleClick = () => {
    if (finished) return;
    setShowRecom(true);
  };

  const handleChoice = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setSliderValue(50);
      setShowRecom(false);
    } else {
      setFinished(true);
    }
  };

  const current = data[index];

  if (finished) {
    return (
      <div className='max-w-6xl mx-auto p-6 space-y-8'>
        <div className='header border10'>
          <h1 className='text-4xl font-bold m-4 text-center'>Prototyp V1</h1>
        </div>
        <div className='max-w-4xl mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh]'>
          <h1 className='text-4xl font-bold mb-6 text-center'>Fertig!</h1>
          <p className='mb-8 text-lg text-center'>Vielen Dank für Ihre Teilnahme! Sie haben die Hauptphase des Prototyps erfolgreich abgeschlossen.</p>
          <button className='px-6 py-2 text-white hover:bg-[#004346]! rounded-full transition-all duration-200 ease-in-out text-lg font-semibold cursor-pointer' onClick={() => router.push('/')}>
            Zurück zur Hauptseite
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8 min-h-screen h-full'>
      <div className='header border10'>
        <h1 className='text-4xl font-bold m-4 text-center'>Prototyp V1</h1>
      </div>
      <div className='text-2xl flex justify-center'>Entscheiden Sie ob mehr orange oder mehr blaue Punkte im Bild zu sehen sind.</div>
      <div className='min-h-[60vh] max-w-4xl mx-auto h-full flex flex-col items-center justify-center'>
        <h2 className='self-start font-bold text-2xl pb-4'>Hauptphase: {current.header}/20</h2>
        <div className='items-center h-full w-full sectionBorder justify-around flex md:flex-row flex-col drop-shadow-xl rounded-2xl bg-white p-6'>
          <BiColorV2 percentage={current.color} />
          <div className='flex h-[256px] m-4 flex-col items-center justify-center space-y-4'>
            {!showRecom ? (
              <div>
            <div className='text-lg mt-auto md:min-w-xs text-center mb-4 flex flex-col items-center justify-center w-full'>
              <ColorSlider initial={50} value={sliderValue} onChange={(val) => setSliderValue(val)} />
            </div>
                <div className='flex justify-center mt-auto'>
                  <button className='px-6 py-2 text-white hover:bg-[#004346]! rounded-full transition-all duration-200 ease-in-out text-lg font-semibold cursor-pointer' onClick={handleClick}>
                    Bestätigen & Weiter
                  </button>
                </div>
              </div>
            ) : (
              <div className='flex flex-col min-w-xs items-center w-full space-y-4'>
                <div>Das Assistenzsystem empfiehlt:</div>
                <div className='text-lg font-semibold max-w-3xs text-center'>{current.recom}</div>
                <div className='flex w-full justify-center space-x-4'>
                  <button className='px-6 py-2 bg-orange-500! text-white rounded-full text-lg font-semibold transition hover:bg-orange-800! cursor-pointer' onClick={handleChoice}>
                    Orange
                  </button>
                  <button className='px-6 py-2 bg-blue-600! text-white rounded-full text-lg font-semibold transition hover:bg-blue-800! cursor-pointer' onClick={handleChoice}>
                    Blau
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='w-full h-8 bg-gray-100 border-2 drop-shadow-xl border-[#508991] text-center rounded-full! mt-8 overflow-hidden'>
          <div
            className='h-full bg-green-400 transition-all duration-300'
            style={{
              width: `${((index + 1) / data.length) * 100}%`,
            }}></div>
        </div>
        {index > 0 && (index + 1) % 5 === 0 ? (
          <div className='pt-8 md:pb-0 pb-20 h-4 text-center text-lg text-[#004346]'>
            <div className='flex items-center justify-center space-x-1'>
              <div className='font-bold'>Hinweis: </div>
              <div> Bisher lagen Sie zu 80% richtig.</div>
            </div>
            <div className='text-sm text-gray-500'>Platzhalter Prozentzahl im Prototyp V1 noch nicht integriert</div>
          </div>
        ) : (
          <div className='pt-8 md:pb-0 pb-20 h-4'></div>
        )}
      </div>
    </div>
  );
};

export default Mainphase;
