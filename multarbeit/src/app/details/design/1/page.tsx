"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";

const DesignDecisionsPage = () => {

    const router = useRouter();
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="header">
                <h1 className="text-4xl font-bold m-4 text-center">Erste Designentscheidungen</h1>
            </div>

            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">Zielgruppe</h2>
                <h2 className="text-2xl">Welche Menschen profitieren von unserer Strategie?</h2>
                <p className="text-lg p-4 textColourGreen">
                    Unsere Anwendung richtet sich an Berufsgruppen, die in hochverantwortlichen
                    Entscheidungssituationen arbeiten, in denen <strong>Signal Detection</strong> eine zentrale Rolle spielt. Dazu zählen:
                </p>
                <ul className="ml-6 list-disc list-inside mt-2 space-y-1">
                    <li><strong>Medizinische Diagnostik</strong> (z. B. Radiologie)</li>
                    <li><strong>Qualitätsprüfung</strong> (z. B. Schweißerprüfung)</li>
                    <li><strong>Defekterkennung</strong> (z. B. Produktion)</li>
                    <li><strong>Capture-Bilder</strong></li>
                    <li><strong>Bildauswertung in sicherheitsrelevanten Kontexten</strong> (z. B. Meteorologie)</li>
                    <li><strong>Überwachung und Sicherheit</strong> (z. B. Videostreamanalyse)</li>
                </ul>
                <div className="flex flex-col md:flex-row items-center gap-8 p-6 max-w-6xl mx-auto ">
                    <div>
                        <p className="mt-4 p-4 text-lg">Zentrale Anforderungen:</p>
                        <ul className="ml-6 list-disc list-inside mt-2 space-y-1">
                            <li>Hohe Genauigkeit und Verlässlichkeit</li>
                            <li>Minimierung von Fehlern (v. a. False Alarms)</li>
                            <li>Berücksichtigung subjektiver Sicherheit</li>
                            <li>Entscheidungsunterstützung ohne Überforderung</li>
                            <li>Vermeidung voreiliger Urteile</li>
                        </ul></div>
                    <div>
                        <Image src={"/zielgruppe.png"} height={400} width={400} alt=""></Image>
                        <p className="imageSourceText">ChatGPT</p>
                    </div>
                </div>

            </section>

            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">Strategische Überlegungen</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Bayesianisches Entscheidungsmodell mit Typ-2-Komponenten</li>
                    <li>Kombination aus objektiver Sensitivität und subjektiver Sicherheit</li>
                    <li>Minimierung von Fehlentscheidungen durch adaptives Gewichtungssystem</li>
                    <li>Dynamische Anpassung der menschlichen Zuverlässigkeit</li>
                    <li>Transparente, erklärbare Vorschläge der KI</li>
                    <li>Direktes Feedback (richtig/falsch) im Vor-Test</li>
                    <li>Explainable AI: verständliche Begründungen für KI-Vorschläge</li>
                </ul>
            </section>

            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">Nutzerführung & Ablauf (UX)</h2>
                <div className="mt-4">
                    <h3 className="text-xl font-medium">1. Vorbereitungsphase (Baseline-Test)</h3>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>10–20 Beispielbilder mit Entscheidungs- und Sicherheitsabfrage</li>
                        <li>Direktes Feedback pro Antwort</li>
                        <li>Berechnung der Sensitivität (d′) des Nutzers</li>
                    </ul>
                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-medium">2. Haupt-Testphase</h3>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                        <li>50 Testbilder im Durchlauf</li>
                        <li>Pro Bild: Entscheidung, Sicherheit angeben, KI-Vorschlag erhalten</li>
                        <li>Z-Wert-Berechnung basierend auf Mensch+KI</li>
                        <li>Begründeter Vorschlag („KI 93 % sicher für Orange“)</li>
                        <li>Nutzer entscheidet, ob er Vorschlag annimmt</li>
                    </ul>
                </div>
            </section>

            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">Zusätzliche Hinweise & Ideen</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>KI-Sicherheit sensibel visualisieren, um unkritische Übernahme zu vermeiden</li>
                    <li>Vorschläge als Hilfestellung, nicht als endgültige Entscheidung</li>
                    <li>Lernprozesse und Ermüdung durch dynamische Gewichtung berücksichtigen</li>
                    <li>Mockups: Entscheidungsbild, Confidence-Slider, KI-Hinweis</li>
                </ul>
            </section>

            <div className="flex justify-center"><Button text="Zurück" onClick={() => router.push("/")} /></div>
        </div>
    );
};

export default DesignDecisionsPage;
