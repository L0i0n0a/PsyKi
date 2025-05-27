"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button/Button";
import BiColor from "@/components/canvas/BiColor";

const DesignDecisionsPage2 = () => {

    const router = useRouter();
    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="header border10">
                <h1 className="text-4xl font-bold m-4 text-center">Prototyp-Entwurf & Userflows</h1>
            </div>

            <BiColor/>


            <div className="flex justify-center"><Button text="Zurück" onClick={() => router.push("/")} /></div>
        </div>
    );
};

export default DesignDecisionsPage2;
