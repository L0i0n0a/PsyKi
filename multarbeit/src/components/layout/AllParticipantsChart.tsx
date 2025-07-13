'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import jsonData from '../../store/results.json';

type BarEntry = {
    label: string;
    value: number;
    isReference?: boolean;
};

const getAllDPrimeIndex199 = (data: any): number[] => {
    const values: number[] = [];

    const search = (obj: any) => {
        if (Array.isArray(obj)) {
            obj.forEach(search);
        } else if (typeof obj === 'object' && obj !== null) {
            if (obj.index === 199 && typeof obj.dPrimeTeam === 'number') {
                values.push(obj.dPrimeTeam);
            }
            Object.values(obj).forEach(search);
        }
    };

    search(data);
    return values;
};

const AllParticipantsChart: React.FC = () => {
    const [bars, setBars] = useState<BarEntry[]>([]);

    useEffect(() => {
        const values = getAllDPrimeIndex199(jsonData);

        // Build bar data with labels
        const participantBars: BarEntry[] = values.map((v, i) => ({
            label: `TN ${i + 1}`,
            value: v,
        }));

        // Insert reference value at the middle
        const middleIndex = Math.floor(participantBars.length / 2);
        const withReference: BarEntry[] = [
            ...participantBars.slice(0, middleIndex),
            { label: 'Referenz', value: 3.8, isReference: true },
            ...participantBars.slice(middleIndex),
        ];

        setBars(withReference);
    }, []);

    const max = Math.max(...bars.map(b => b.value), 4.5);



    return (
        <section className="p-10 bg-white rounded-2xl shadow-xl max-w-5xl mx-auto mt-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">
                <span className="text-violet-600">dPrimeTeam</span>-Werte (Index 199) mit Referenz
            </h2>

            <div className="relative h-64 border-l border-b border-gray-300 pt-8 overflow-x-auto ">
                <div className="flex justify-end items-end gap-2 h-full w-fit relative">
                    {bars.map((bar, i) => {
                        const heightPercent = (bar.value / max) * 100;

                        return (
                            <div key={i} className="flex justify-end items-end flex-col items-center w-8 relative h-full">
                                {/* Label above bar */}
                                <motion.div
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.015 }}
                                    className={`text-xs mb-1 absolute -top-5 ${bar.isReference ? 'text-red-500 font-semibold' : 'text-gray-700'
                                        }`}
                                >
                                    {bar.value.toFixed(2)}
                                </motion.div>

                                {/* Bar */}
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${heightPercent}%` }}
                                    transition={{ duration: 0.5, delay: i * 0.015 }}
                                    className={`w-full rounded-t-md ${bar.isReference
                                            ? 'bg-red-400 border border-red-600'
                                            : 'bg-violet-500 hover:bg-violet-600'
                                        }`}
                                />

                                {/* Bottom label */}
                                <div
                                    className={`text-[10px] mt-1 text-center ${bar.isReference ? 'text-red-500 font-semibold' : 'text-gray-500'
                                        }`}
                                >
                                    {bar.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-3">
                {bars.length - 1} Teilnehmer &nbsp;•&nbsp; 1 Referenzwert
            </div>
        </section>
    );
};




export default AllParticipantsChart;
