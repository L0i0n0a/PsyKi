"use client"
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import BiColor from "@/components/canvas/BiColor";
import Image from "next/image";

const DesignDecisionsPage3 = () => {
    const router = useRouter();


    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="header border10">
                <h1 className="text-4xl font-bold m-4 text-center">Wissenschaftskommunikation & Feedback</h1>
            </div>

            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">Rückblick OW-Modell</h2>
                <h2 className="text-2xl mb-4">Wie funktioniert das Modell?</h2>
                <div>
                    <p className="mt-6 text-lg">Es beschreibt, wie ein Mensch oder ein System die Hinweise eines menschlichen Entscheiders und eines automatisierten Hilfsmittels optimal kombiniert, um die bestmögliche Entscheidung zu treffen.</p>
                    <Image src="/ow1.png" alt="" width={300} height={300}/>
                    <Image src="/ow3.png" alt="" width={300} height={300} />
                </div>
            </section>

            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">Ablauf in der Anwendung</h2>
                <h2 className="text-2xl mb-4">Wie durchlaufen Nutzende die Anwendung?</h2>
                {/* Einführung */}
                <div className="mb-6">
                    <h4 className="text-lg font-semibold mt-4">1. Einführung</h4>
                    <ul className="ml-6 list-disc list-inside mt-2 space-y-1">
                        <li>Erklärung des Ablaufs und der Aufgabe</li>
                        <li>Ziel: Grundlage &amp; Verständnis schaffen</li>
                    </ul>
                </div>

                {/* Testphase */}
                <div className="mb-6">
                    <h4 className="text-lg font-semibold mt-4">2. Testphase</h4>
                    <ul className="ml-6 list-disc list-inside mt-2 space-y-1">
                        <li>Ermittlung der Sensitivität des Menschen und Feedback nach jeder Entscheidung</li>
                        <li>Mensch soll sich verbessern:
                            <ul className="list-disc list-inside ml-4 mt-1">
                                <li>an den Entscheidungsprozess gewöhnen</li>
                                <li>Sensitivität erhalten</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* Hauptphase */}
                <div className="mb-6">
                    <h4 className="text-lg font-semibold mt-4">3. Hauptphase</h4>
                    <ul className="ml-6 list-disc list-inside mt-2 space-y-1">
                        <li>Einführung inkl. Erklärung der Strategie</li>
                        <li>Struktur:
                            <ul className="list-disc list-inside ml-4 mt-1">
                                <li>Entscheidungsblöcke</li>
                                <li>Feedback zwischendurch</li>
                            </ul>
                        </li>
                        <li>Ziele:
                            <ul className="list-disc list-inside ml-4 mt-1">
                                <li>Compliance verstärken</li>
                                <li>Motivation hochhalten</li>
                                <li>Monotonie verhindern</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* Abschluss */}
                <div className="mb-6">
                    <h4 className="text-lg font-semibold mt-4">4. Abschluss</h4>
                    <ul className="ml-6 list-disc list-inside mt-2 space-y-1">
                        <li>Ergebnisse:
                            <ul className="list-disc list-inside ml-4 mt-1">
                                <li>Genauigkeit mit KI</li>
                                <li>Vergleich zur Testphase</li>
                                <li>Häufigkeit der übernommenen Empfehlungen</li>
                            </ul>
                        </li>
                        <li>Ziel: Feedback geben</li>
                    </ul>
                </div>
            </section>

            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">Gestaltung der Anwendung</h2>
                <h2 className="text-2xl mb-4">Wie ist die Anwendung gestaltet, um die Strategie zu fördern?</h2>
                <div>
                    <p className="mt-6 text-lg">Zentrale Anforderungen:</p>
                    <ul className="ml-6 list-disc list-inside mt-2 space-y-1">
                        <li><strong>Schlicht:</strong> Farbliche Gestaltung minimal gehalten, um Biases vorzubeugen</li>
                        <li><strong>Übersichtlich:</strong> Cognitive Load gering halten </li>
                        <li><strong>Gebrauchtstauglich:</strong> einfaches und verständliches Layout</li>
                        <li><strong>Progress:</strong> Eine Fortschritt</li>
                    </ul>
                </div>
            </section>

            <div className="flex justify-center"><Button text="Zurück" onClick={() => router.push("/")} /></div>
        </div>
    );
};

export default DesignDecisionsPage3;
