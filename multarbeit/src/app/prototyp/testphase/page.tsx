'use client';
import { useState } from 'react';
import BiColorV2 from '@/components/canvas/BiColorV2';
import ColorSlider from '@/components/ui/Slider/Slider';
import data from '@/lib/dataTest.json';
import { useRouter } from 'next/navigation';

const Testphase = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [finished, setFinished] = useState(false);

  const handleClick = () => {
    if (finished) return;
    if (index < data.length - 1) {
      setIndex(index + 1);
      setSliderValue(50);
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
          <h1 className='text-4xl font-bold mb-6 text-center'>
            Start der Hauptphase <br /> Unterstützung durch ein Assistenzsystem
          </h1>
          <p className='mb-8 text-lg text-center'>
            Ab jetzt erhalten Sie zusätzlich zu Ihrer eigenen Einschätzung eine Entscheidungshilfe durch ein automatisiertes System. Dieses analysiert dieselben Bilder wie Sie und gibt seine
            Einschätzung ab. Um beide Informationen zu nutzen, können Sie das sogenannte Entscheidungskriterium 𝑍 verwenden. Dieses kombiniert Ihre Einschätzung und die der Hilfe – gewichtet nach
            ihrer Zuverlässigkeit. Ihre Einschätzung und die des Systems gehen also anteilig in die Entscheidung ein. Je nachdem, wie zuverlässig jede Quelle ist, wird sie stärker oder schwächer
            gewichtet. <br />
            💡 Hinweis: Die automatisierte Hilfe hat eine durchschnittliche Genauigkeit von 93%, und Ihre eigene Gewichtung wurde auf Basis Ihrer Leistung in der Testphase berechnet. Sie können frei
            entscheiden, ob und wie stark Sie das System nutzen möchten – unser Ziel ist es nur, transparent zu machen, wie man aus beiden Einschätzungen eine fundierte Entscheidung ableiten könnte.
          </p>
          <button
            className='px-6 py-2 text-white hover:bg-[#004346]! rounded-full transition-all duration-200 ease-in-out text-lg font-semibold cursor-pointer'
            onClick={() => router.push('/prototyp/mainphase')}>
            Weiter
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
        <h2 className='self-start font-bold text-2xl pb-4'>Testphase: {current.header}/20</h2>
        <div className='items-center h-full w-full sectionBorder justify-around flex drop-shadow-xl rounded-2xl bg-white p-6'>
          <BiColorV2 percentage={current.color} />
          <div className='flex h-[256px] m-4 flex-col items-center justify-center space-y-4'>
            <div className='text-lg mt-auto text-center mb-4 flex flex-col items-center justify-center w-full'>
              <ColorSlider initial={50} value={sliderValue} onChange={(val) => setSliderValue(val)} />
            </div>
            <div className='flex justify-center mt-auto'>
              <button className='px-6 py-2 text-white hover:bg-[#004346]! rounded-full transition-all duration-200 ease-in-out text-lg font-semibold cursor-pointer' onClick={handleClick}>
                Bestätigen & Weiter
              </button>
            </div>
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
          <div className='pt-8 h-4 text-center text-lg text-[#004346]'>
            <div className='flex items-center justify-center space-x-1'>
              <div className='font-bold'>Hinweis: </div>
              <div> Bisher lagen Sie zu 80% richtig.</div>
            </div>
            <div className='text-sm text-gray-500'>Platzhalter Prozentzahl im Prototyp V1 noch nicht integriert</div>
          </div>
        ) : (
          <div className='pt-8 h-4'></div>
        )}
      </div>
    </div>
  );
};

export default Testphase;
