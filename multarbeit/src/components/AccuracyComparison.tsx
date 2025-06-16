import React from 'react';

export default function AccuracyComparison() {
  const menschPercent = 30;
  const kiPercent = 100;

  const minThickness = 0.5;
  const maxThickness = 16;

  const scaleThickness = (percent: number) => minThickness + (percent / 100) * (maxThickness - minThickness);

  const menschThickness = scaleThickness(menschPercent);
  const kiThickness = scaleThickness(kiPercent);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function generateGrowingThicknessLines(p0: [number, number], p1: [number, number], p2: [number, number], color: string, thicknessStart: number, thicknessEnd: number, segments = 40) {
    const lines = [];

    // Quadratic Bézier helper
    function quadBezier(t: number, p0: [number, number], p1: [number, number], p2: [number, number]) {
      const x = (1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0];
      const y = (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1];
      return [x, y];
    }

    for (let i = 0; i < segments; i++) {
      const t1 = i / segments;
      const t2 = (i + 1) / segments;

      const [x1, y1] = quadBezier(t1, p0, p1, p2);
      const [x2, y2] = quadBezier(t2, p0, p1, p2);

      const strokeWidth = thicknessStart + (thicknessEnd - thicknessStart) * t2;

      lines.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={strokeWidth} strokeLinecap='round' />);
    }

    return lines;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white p-6'>
      <h1 className='text-2xl mb-24 text-center'>Kumulierter Z-Score</h1>
      <div className='flex flex-col w-full max-w-xl'>
        <div className='flex items-center justify-between relative'>
          {/* Mensch */}
          <div className='text-center'>
            <p className='text-lg font-semibold'>Mensch</p>
            <p className='text-xl font-bold'>78%</p>
          </div>

          {/* Z-Score Visualisierung */}
          <div className='relative flex-1 mx-4'>
            <div
              className='h-8 w-full rounded-full relative overflow-visible'
              style={{
                background: 'linear-gradient(to right, #FB8C00 , #FFE0B2 50%,  #90CAF9 50%, #0D47A1)',
              }}>
              {/* Z-Score Bubble */}
              <div className='absolute left-[50%] transform -translate-x-1/2 -top-16 flex items-center justify-center w-24 h-12 bg-gray-500 text-white text-lg font-bold rounded-full shadow-lg z-20'>
                0,6
              </div>

              {/* Vertical Divider */}
              <div className='absolute left-[50%] top-0 h-full w-0.5 bg-white opacity-70 z-10' />

              {/* Mensch Marker */}
              <div className='absolute left-[22%] transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow z-10' />

              {/* KI Marker */}
              <div className='absolute left-[88%] transform -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-800 rounded-full border-2 border-white shadow z-10' />

              {/* SVG Lines */}
              <svg className='absolute top-[-64px] left-0 w-full h-[84px] pointer-events-none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 84' preserveAspectRatio='none'>
                <path d='M 21 88 Q 23 10, 50 24' stroke='#FB8C00' strokeWidth={menschThickness} strokeLinecap='round' fill='none' />
                <path d='M 88 84 Q 80 10, 50 24' stroke='#0D47A1' strokeWidth={kiThickness} strokeLinecap='round' fill='none' />

                {/*    {generateGrowingThicknessLines(
    [21, 88],  // start point (slider)
    [23, 10],  // control point
    [50, 24],  // end point (bubble)
    "#FB8C00", // color
    1,         // thickness start (thin at slider)
    12         // thickness end (thick at bubble)
  )}
  {generateGrowingThicknessLines(
    [88, 84],
    [80, 10],
    [50, 24],
    "#0D47A1",
    1,
    40
  )} */}
              </svg>

              {/* <svg
  className="absolute top-[-64px] left-0 w-full h-[84px] pointer-events-none"
  xmlns="http://www.w3.org/2000/svg"
>
  <line
    x1="22%"
    y1="84"
    x2="50%"
    y2="24"
    stroke="#FB8C00"
    strokeWidth={menschThickness}
    strokeLinecap="round"
  />
  <line
    x1="88%"
    y1="84"
    x2="50%"
    y2="24"
    stroke="#0D47A1"
    strokeWidth={kiThickness}
    strokeLinecap="round"
  />
</svg> */}
            </div>

            {/* Labels below the slider */}
            <div className='flex justify-between text-sm text-gray-600 mt-2 px-1'>
              <span>100%</span>
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* KI */}
          <div className='text-center'>
            <p className='text-lg font-semibold'>KI</p>
            <p className='text-xl font-bold'>93%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
