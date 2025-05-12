"use client"
import Carousel from "@/components/layout/Carousel";
import SectionLeft from "@/components/layout/SectionLeft";
import SectionRight from "@/components/layout/SectionRight";
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter();

    return (
        <div>
            <div className="header">
                <h1 className="text-4xl font-bold m-4 text-center">Multimediale Ausarbeitung</h1>
                <h2 className="text-3xl m-4 text-center">Strategie: Optimale Gewichtung</h2>
            </div>
            
            <SectionRight imageSource="Benchmarking Aided Decision Making in a Signal Detection Task
Megan L. Bartlett and Jason S. McCarley, Human Factors 2017 59:6, 881-900" onClick={() => router.push("/details/theory")} imageUrl="/graph.png" title="Optimale Gewichtung: Theorie " description={
                    <>
                        Das Optimal Weighting (OW) Modell ist ein <strong>theoretisches Modell</strong>, das beschreibt, wie ein Mensch oder ein System die Hinweise von einem <strong>menschlichen Entscheider</strong> und eines <strong>automatisierten Hilfsmittels</strong> optimal kombiniert, um die <strong>beste mögliche Entscheidung</strong> zu treffen.
                    </>
                } />
            <SectionLeft imageSource="Med Badr Chemmaoui (Unsplash)" onClick={() => router.push("/details/design/1")} imageUrl="/unsplash_med.jpg" title="Erste Designentscheidungen" description={
                <>
                    Unsere Anwendung richtet sich an <strong>Berufsgruppen mit hoher Verantwortung</strong> in der <strong>visuellen Entscheidungsfindung</strong> (z. B. Radiologie, Qualitätssicherung, Meteorologie), bei denen <strong>Genauigkeit</strong> und <strong>Verlässlichkeit</strong> entscheidend sind. Basierend auf dem Optimal Weighting Modell kombinieren wir objektive Leistungsdaten (z. B. Sensitivität aus einem Vor-Test) mit subjektiver Sicherheit, um menschliche und KI-basierte Hinweise <strong>optimal zu gewichten</strong>. Ziel ist eine <strong>adaptive Entscheidungsunterstützung</strong>, die Fehler reduziert, Transparenz schafft und dem Nutzer trotz KI-Empfehlung die <strong>Kontrolle</strong> lässt. Die <strong>Nutzerführung</strong> umfasst einen kurzen <strong>Baseline-Test</strong> und einen Hauptdurchgang mit erklärter Entscheidungsunterstützung.
                </>
            } />
            <h2 className="text-3xl font-bold m-4 text-center">Erste Scribbles</h2>
            <Carousel images={["/IMG_0086.png", "/IMG_0087.png"]} imageDescriptions={["Scribble 1: Menschliche Einschätzung", "Scribble 2: Vergleich Mensch und KI"]} /> 
        </div>
    );
}
