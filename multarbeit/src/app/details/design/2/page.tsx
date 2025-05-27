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
                <h2 className="text-2xl font-semibold">User Flows</h2>
                <h2 className="text-2xl mb-4">Wie navigieren Nutzende durch die Anwendung?</h2>
                
            </section>

            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">Voruberelegungen zum Prototyp</h2>
                <h2 className="text-2xl mb-4">Welchen Umfang soll der Prototyp haben?</h2>
                
            </section>

            <section className="sectionBorder">
                <h2 className="text-2xl font-semibold">Umsetzungsueberlegungen fuer die Anwendung</h2>
                <h2 className="text-2xl mb-4">Wie koennen die Bilder erstellt werden?</h2>
                <BiColor />
            </section>
            


            <div className="flex justify-center"><Button text="Zurück" onClick={() => router.push("/")} /></div>
        </div>
    );
};

export default DesignDecisionsPage2;
