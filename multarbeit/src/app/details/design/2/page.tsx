"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import BiColor from "@/components/canvas/BiColor";
import Image from "next/image";

const DesignDecisionsPage2 = () => {

    const router = useRouter();
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
                <div>
                    <p className="mt-6 text-lg">Erklärung durch den Userflow</p>
                    <ul className="ml-6 list-disc list-inside mt-2 space-y-1">
                        <li>ATI-Score: </li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div>
                    <Image src={"/Rastergrafik.svg"} height={400} width={400} alt=""></Image>
                    <p className="imageSourceText text-right">Inkscape</p>
                </div>
            </section>

            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">Vorüberelegungen zum Prototyp</h2>
                <h2 className="text-2xl mb-4">Welchen Umfang soll der Prototyp haben?</h2>
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
