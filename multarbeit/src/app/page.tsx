"use client"
import Carousel from "@/components/layout/Carousel";
import SectionLeft from "@/components/layout/SectionLeft";
import SectionRight from "@/components/layout/SectionRight";
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter();

    return (
        <div>
            <div>
                <h1>Multimediale Ausarbeitung</h1>
                <h2>Strategie: Optimale Gewichtung</h2>
            </div>
            <Carousel images={["file.svg", "globe.svg"]} />
            <SectionRight onClick={() => router.push("/details/theory")} imageUrl="window.avg" title="Optimale Gewichtung: Theorie " description="Das Optimal Weighting (OW) Modell ist ein theoretisches Modell, das beschreibt, wie ein Mensch oder ein System die Hinweise von einem menschlichen Entscheider und eines automatisierten Hilfsmittels optimal kombiniert, um die beste mögliche Entscheidung zu treffen." />
            <SectionLeft onClick={() => router.push("/details/design/1")} imageUrl="vercel.svg" title="Erste Designentscheidungen" description="Unsere Anwendung richtet sich an Berufsgruppen mit hoher Verantwortung in der visuellen Entscheidungsfindung (z. B. Radiologie, Qualitätssicherung, Meteorologie), bei denen Genauigkeit und Verlässlichkeit entscheidend sind. Basierend auf dem Optimal Weighting Modell kombinieren wir objektive Leistungsdaten (z. B. Sensitivität aus einem Vor-Test) mit subjektiver Sicherheit, um menschliche und KI-basierte Hinweise optimal zu gewichten. Ziel ist eine adaptive Entscheidungsunterstützung, die Fehler reduziert, Transparenz schafft und dem Nutzer trotz KI-Empfehlung die Kontrolle lässt. Die Nutzerführung umfasst einen kurzen Baseline-Test und einen Hauptdurchgang mit erklärter Entscheidungsunterstützung." />
        </div>
    );
}
