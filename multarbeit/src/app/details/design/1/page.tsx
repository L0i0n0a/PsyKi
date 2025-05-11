"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button/Button";

const DesignDecisionsPage = () => {

    const router = useRouter();
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold">📌 Erste Designentscheidungen</h1>

            <section>
                <h2 className="text-2xl font-semibold">🎯 Zielgruppe</h2>
                <p>
                    Unsere Anwendung richtet sich an Berufsgruppen, die in hochverantwortlichen
                    Entscheidungssituationen arbeiten, in denen <strong>Signal Detection</strong> eine zentrale Rolle spielt. Dazu zählen:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Medizinische Diagnostik</strong> (z. B. Radiologie)</li>
                    <li><strong>Qualitätsprüfung</strong> (z. B. Schweißerprüfung)</li>
                    <li><strong>Defekterkennung</strong> (z. B. Produktion, Instandhaltung)</li>
                    <li><strong>Bildauswertung in sicherheitsrelevanten Kontexten</strong> (z. B. Meteorologie)</li>
                    <li><strong>Überwachung und Sicherheit</strong> (z. B. Videostreamanalyse)</li>
                </ul>
                <p className="mt-4">Zentrale Anforderungen:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Hohe Genauigkeit und Verlässlichkeit</li>
                    <li>Minimierung von Fehlern (v. a. False Alarms)</li>
                    <li>Berücksichtigung subjektiver Sicherheit</li>
                    <li>Entscheidungsunterstützung ohne Überforderung</li>
                    <li>Vermeidung voreiliger Urteile</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">🧠 Strategische Überlegungen</h2>
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

            <section>
                <h2 className="text-2xl font-semibold">🧭 Nutzerführung & Ablauf (UX)</h2>
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

            <section>
                <h2 className="text-2xl font-semibold">📝 Zusätzliche Hinweise & Ideen</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>KI-Sicherheit sensibel visualisieren, um unkritische Übernahme zu vermeiden</li>
                    <li>Vorschläge als Hilfestellung, nicht als endgültige Entscheidung</li>
                    <li>Lernprozesse und Ermüdung durch dynamische Gewichtung berücksichtigen</li>
                    <li>Mockups: Entscheidungsbild, Confidence-Slider, KI-Hinweis</li>
                </ul>
            </section>

            <Button text="Zuruck" onClick={() => router.push("/")} />
        </div>
    );
};

export default DesignDecisionsPage;
