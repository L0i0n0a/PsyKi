"use client"
import Button from "@/components/ui/Button/Button";
import React from "react";
import { useRouter } from 'next/navigation'

const OWModelTheory = () => {
    const router = useRouter();
    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
            <iframe src="/OptimalWeighing.pdf" style={{
          width: '100%',
          height: '100vh',
          border: 'none',
        }} />

            <div className="flex justify-center"><Button text="Zurück" onClick={() => router.push("/")} /></div>
        </div>
    );
};

export default OWModelTheory;