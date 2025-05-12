"use client"
import Button from "@/components/ui/Button/Button";
import React from "react";
import { useRouter } from 'next/navigation'

const OWModelTheory = () => {
    const router = useRouter();
    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
            <h1 className="text-3xl font-bold text-sky-600">Optimal Weighting (OW) Modell – Theoretische Erklärung</h1>

            <section>
                <h2 className="text-2xl font-semibold">Grundlagen</h2>
                <p>Das Optimal Weighting (OW) Modell beschreibt die optimale Kombination menschlicher und automatischer Hinweise zur Entscheidungsfindung.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Grundprinzip</h2>
                <ul className="list-disc pl-6">
                    <li>Mensch und System sind unabhängige Signaldetektoren.</li>
                    <li>Beide liefern Likelihood-Schätzungen, bewertet durch ihre Sensitivität d’.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Gewichtung der Hinweise</h2>
                <p>Die Hinweise werden gewichtet, um maximale Teamleistung zu erzielen:</p>
                <pre className="bg-gray-100 p-4 rounded">Z = a_human × X_human + a_aid × X_aid</pre>
                <p>Gewichte ai sind proportional zu den d&apos;-Werten: <code>a_i ∝ d&apos;_i</code></p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Gesamtsensitivität berechnen</h2>
                <p>
                    Die kombinierte Sensitivität (d&apos;OW) ergibt sich durch:
                </p>
                <pre className="bg-gray-100 p-4 rounded">d&apos;_OW = sqrt(d&apos;^2_operator + d&apos;^2_aid)</pre>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Beispiel: Farb-Detektion</h2>
                <p>
                    Aufgabe: Entscheiden ob ein Bild orange (Signal) oder blau (Rauschen) dominiert.
                </p>
                <ul className="list-disc pl-6">
                    <li>Operator: d&apos; = 1.0</li>
                    <li>Hilfe: d&apos; = 3.0</li>
                </ul>
                <p>Beispielwerte:</p>
                <pre className="bg-gray-100 p-4 rounded">
                    X_operator = +0.8
                    X_aid = +2.5
                    Z = 2.075 (Ergebnis &gt; 0: Entscheidung &quot;Orange&quot;)
                </pre>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Sensitivität berechnen</h2>
                <p>d&apos; = z(Hit Rate) - z(False Alarm Rate)</p>
                <p>Beispiel:</p>
                <pre className="bg-gray-100 p-4 rounded">
                    HR = 0.82, FAR = 0.14
                    z(0.82) ≈ 0.92, z(0.14) ≈ -1.08
                    =={">"} d&apos; = 2.0
                </pre>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Designimplikationen</h2>
                <ul className="list-disc pl-6">
                    <li>Training zum Verständnis von d’ und Z</li>
                    <li>Visuelle Vereinfachung der Entscheidung</li>
                    <li>Dynamische Anpassung der d’-Werte</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">Team-Kriterium</h2>
                <pre className="bg-gray-100 p-4 rounded">
                    c_OW = (d&apos;_op × c_op + d&apos;_aid × c_aid) / (d&apos;_op + d&apos;_aid)
                </pre>
                <p>Das Kriterium für Entscheidungen wird ebenfalls gewichtet.</p>
            </section>

            <Button text="Zuruck" onClick={() => router.push("/")} />
        </div>
    );
};

export default OWModelTheory;