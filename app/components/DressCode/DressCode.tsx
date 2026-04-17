"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ColorCircle from "./ColorCircle";

gsap.registerPlugin(ScrollTrigger);

const circles: { imageSrc?: string }[] = [
    {imageSrc: "/images/Dresscode-1.png"},
    {imageSrc: "/images/Dresscode-2.png"},
    {imageSrc: "/images/Dresscode-3.png"},
    {imageSrc: "/images/Dresscode-4.png"},
    {imageSrc: "/images/Dresscode-5.png"},
];

export default function DressCode() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".dc-circle", {
            x: -600,
            rotation: -540,
            opacity: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                once: true,
            },
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="flex text-foreground flex-col items-center text-center px-8 py-10">
            <h2 className="text-3xl font-bold tracking-wide mb-4">ДРЕС-КОД</h2>
            <p className="text-2xl max-w-md mb-10">
                Ми будемо дуже вдячні, якщо ви підтримаєте атмосферу свята та оберете наряди у таких кольорах:
            </p>
            <div className="flex flex-row items-center ml-[-1.5rem]">
                {circles.map((circle, i) => (
                    <div
                        key={i}
                        className="dc-circle"
                        style={{ marginRight: "-2.5rem", zIndex: i }}
                    >
                        <ColorCircle imageSrc={circle.imageSrc} />
                    </div>
                ))}
            </div>
        </div>
    );
}
