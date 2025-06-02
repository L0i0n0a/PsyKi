'use client';
import { useRouter } from 'next/navigation';

const Prototyp = () => {
  const router = useRouter();

  return (
    <div className='max-w-6xl mx-auto p-6 space-y-8'>
      <div className='header border10'>
        <h1 className='text-4xl font-bold m-4 text-center'>Prototyp V1</h1>
      </div>
      <div className='max-w-4xl mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh]'>
        <h1 className='text-4xl font-bold mb-6 text-center'>Willkommen zum Prototyp V1</h1>
        <p className='mb-8 text-lg text-center'>
          In dieser Studie sehen Sie in jedem Durchgang ein Bild mit Farbpunkten. <br /> Ihre Aufgabe ist es zu entscheiden, ob mehr orange oder mehr blaue Punkte enthalten sind. In dieser ersten
          Phase (20 Bilder) machen Sie sich mit der Aufgabe vertraut. Gleichzeitig ermitteln wir anhand Ihrer Entscheidungen, wie gut Sie Muster erkennen können – also Ihre individuelle Sensitivität.
          Entscheiden Sie einfach so, wie Sie es für richtig halten.
        </p>
        <button
          className='px-6 py-2 text-white hover:bg-[#004346]! rounded-full transition-all duration-200 ease-in-out text-lg font-semibold cursor-pointer'
          onClick={() => router.push('/prototyp/testphase')}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Prototyp;
