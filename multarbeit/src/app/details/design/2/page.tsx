"use client"
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import BiColor from "@/components/canvas/BiColor";
import Image from "next/image";

const DesignDecisionsPage2 = () => {
    const router = useRouter();
    const [step, setStep] = useState(0);

    

    const instructionSteps = [
        {
            title: "Herzlich willkommen zu unserer Studie!",
            content: (
            <>
                <p className="mb-4">
                In dieser Studie sehen Sie in jedem Durchgang ein Bild mit Farbpunkten.
                </p>
                <p className="mb-4">
                Ihre Aufgabe ist es zu entscheiden, ob mehr <span className="text-orange-500 font-semibold">orange</span> oder mehr <span className="text-blue-500 font-semibold">blaue</span> Punkte enthalten sind.
                </p>
                <p className="mb-4">
                In dieser ersten Phase (ca. 20 Bilder) machen Sie sich mit der Aufgabe vertraut. Gleichzeitig ermitteln wir anhand Ihrer Entscheidungen, wie gut Sie Muster erkennen können – also Ihre individuelle <strong>Sensitivität</strong>.
                </p>
                <p className="mb-6">
                Entscheiden Sie einfach so, wie Sie es für richtig halten.
                </p>
            </>
            ),
        },
        {
            title: "Instruktion vor der Hauptphase (mit Entscheidungsassistenz)",
            content: (
            <>
                <p className="mb-4">
                <strong>Start der Hauptphase – Unterstützung durch ein Assistenzsystem</strong><br />
                Ab jetzt erhalten Sie zusätzlich zu Ihrer eigenen Einschätzung eine Entscheidungshilfe durch ein automatisiertes System. Dieses analysiert dieselben Bilder wie Sie und gibt seine Einschätzung ab.
                </p>
                <p className="mb-4">
                Um beide Informationen zu nutzen, können Sie das sogenannte <strong>Entscheidungskriterium 𝑍</strong> verwenden. Dieses kombiniert Ihre Einschätzung und die der Hilfe – gewichtet nach Ihrer Zuverlässigkeit.
                </p>
                <p className="mb-4">
                Ihre Einschätzung und die des Systems gehen also anteilig in die Entscheidung ein. Je nachdem, wie zuverlässig jede Quelle ist, wird sie stärker oder schwächer gewichtet.
                </p>
                <p className="mb-6">
                💡 <strong>Hinweis:</strong> Die automatisierte Hilfe hat eine durchschnittliche Genauigkeit von <strong>93 %</strong>, und Ihre eigene Gewichtung wurde auf Basis Ihrer Leistung in der Testphase berechnet.
                </p>
                <p className="mb-6">
                Sie können frei entscheiden, ob und wie stark Sie das System nutzen möchten – unser Ziel ist es nur, transparent zu machen, wie man aus beiden Einschätzungen eine fundierte Entscheidung ableiten könnte.
                </p>
            </>
            ),
        },
        {
            title: "Letzte Hinweise vor Beginn",
            content: (
            <>
                <p className="mb-4">
                Gleich geht es los! Achten Sie auf Ihre Intuition, aber auch auf die Hinweise des Assistenzsystems.
                </p>
                <p className="mb-4">
                Es gibt keine „richtige“ Nutzung – Sie können sich frei entscheiden, wie stark Sie das System einbeziehen.
                </p>
                <p className="mb-6">
                Viel Erfolg und danke für Ihre Teilnahme!
                </p>
            </>
            ),
        },
    ];

    const isLastStep = step === instructionSteps.length - 1;
    const isFirstStep = step === 0;
    
    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="header border10">
                <h1 className="text-4xl font-bold m-4 text-center">Prototyp-Entwurf & Userflows</h1>
            </div>
            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">Zielgruppe</h2>
                <h2 className="text-2xl mb-4">Welche Zielgruppe soll die Anwendung testen und evaluieren?</h2>
                <div>
                    <p className="mt-6 text-lg">Zentrale Anforderungen:</p>
                    <ul className="ml-6 list-disc list-inside mt-2 space-y-1">
                        <li>ATI-Score: </li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </section>
            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">User Flows</h2>
                <h2 className="text-2xl mb-4">Wie navigieren Nutzende durch die Anwendung?</h2>
                <div className="sectionBased">
                    <div>
                        <p className="mt-6 text-lg">Erklärung durch den Userflow:</p>
                        <ul className="ml-6 list-decimal mt-2 space-y-1">
                            <li className="textColourGreen font-bold">Einführungstext</li>
                            <li className="textColourGreen font-bold">Testphase (20 Bilder)</li>
                            <ul className="list-disc pl-6 mt-1 space-y-1">
                                <li>Entscheidung auf Z-Skala angeben (von “sehr sicher blau” bis “sehr sicher orange” - z.B. mit Schieberegler von -3 bis +3)</li>
                                <li>Feedback alle 5 oder 10 Bilder? (zu …% richtig)</li>
                                <li>Feedback zum Abschluss der Phase (Sensitivität / Genauigkeit)</li>
                            </ul>
                            <li className="textColourGreen font-bold">Instruktionstext vor der Hauptphase</li>
                            <li className="textColourGreen font-bold">Hauptphase (50 Bilder)</li>
                            <ul className="list-disc pl-6 mt-1 space-y-1">
                                <li>Entscheidung auf Z-Skala angeben</li>
                                <li>Kumulierter Z-Wert auf Skala als Entscheidungshilfe</li>
                                <li>Anzeige, wie sehr Entscheidung Mensch & KI jeweils eingeflossen sind</li>
                                <li>Optional ausklappbare Infos, wie die Berechnung vorgenommen wurde</li>
                                <li>Bestätigungsfeld mit Antwortempfehlung annehmen?</li>
                            </ul>
                            <li className="textColourGreen font-bold">Abschluss</li>
                            <ul className="list-disc pl-6 mt-1 space-y-1">
                                <li>Selbstreflexion des Menschen (Welche Strategie genutzt? / Wie sehr OW-Strategie genutzt?)</li>
                                <li>Ergebnisse zeigen (optional im Vergleich zur Testphase / zu Entscheidung Mensch vor KI-Hilfe / zu KI ohne Mensch)</li>
                            </ul>
                        </ul>
                    </div>
                    <div>
                        <Image src={"/Rastergrafik.svg"} height={400} width={400} alt=""></Image>
                        <p className="imageSourceText text-center">Inkscape</p>
                    </div>
                </div>

            </section>

            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold mb-4">Textuelle Erklärungen für den Prototypen</h2>

                <div className="h-auto bg-gradient-to-br from-blue-50 to-orange-100 flex items-center justify-center px-6">
                    <div className="w-full max-w-2xl m-8 bg-white shadow-lg rounded-xl p-8 text-gray-800">
                    <h1 className="text-2xl font-bold mb-4 text-center">
                        {instructionSteps[step].title}
                    </h1>

                    {instructionSteps[step].content}

                    <div className="flex justify-between mt-6">
                        <button
                        onClick={() => setStep((s) => Math.max(0, s - 1))}
                        disabled={isFirstStep}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                            isFirstStep
                            ? 'bg-gray-300 text-white cursor-not-allowed'
                            : 'bg-gray-200 text-white hover:bg-gray-300'
                        }`}
                        >
                        Zurück
                        </button>

                        <button
                        onClick={() => setStep((s) => Math.min(instructionSteps.length - 1, s + 1))}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
                        >
                        {isLastStep ? 'Fertig' : 'Weiter'}
                        </button>
                    </div>

                    <div className="mt-4 text-center text-sm text-gray-500">
                        Schritt {step + 1} von {instructionSteps.length}
                    </div>
                    </div>
                </div>
            </section>


            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">Vorüberlegungen zum Prototyp</h2>
                <h2 className="text-2xl mb-4">Welchen Umfang soll der Prototyp haben?</h2>
                <div>
                    <p className="mt-6 text-lg">Anzahl der Tests</p>
                    <ul className="ml-6 list-disc list-inside mt-2 space-y-1">
                        <li>   </li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <h2 className="text-2xl mb-4">Welche Komponenten sollen enthalten sein?</h2>
                <div>
                    <p className="mt-6 text-lg">Länge der Tests</p>
                    <ul className="ml-6 list-disc list-inside mt-2 space-y-1">
                        <li>   </li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <h2 className="text-2xl mb-4">Wie bekommen Nutzende Feedback?</h2>
                <div>
                    <p className="mt-6 text-lg">Länge der Tests</p>
                    <ul className="ml-6 list-disc list-inside mt-2 space-y-1">
                        <li>   </li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </section>

            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">Umsetzungsüberlegungen für die Anwendung</h2>
                <h2 className="text-2xl mb-4">Wie können die Bilder erstellt werden?</h2>
                <BiColor />
                <h2 className="text-2xl mb-4">Welche Formeln des OW-Modell sind wo einzusetzen?</h2>
            </section>



            <div className="flex justify-center"><Button text="Zurück" onClick={() => router.push("/")} /></div>
        </div>
    );
};

export default DesignDecisionsPage2;
