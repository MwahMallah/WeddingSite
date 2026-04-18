"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WEDDING_DATE = new Date("2026-08-06T15:30:00");

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function getTimeLeft(): TimeLeft {
    const diff = WEDDING_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

function pad(n: number, len = 2) {
    return String(n).padStart(len, "0");
}

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
        return () => clearInterval(id);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                once: true,
            },
            defaults: { ease: "power2.out", duration: 0.9 },
        });

        tl.from(".countdown-counter", { opacity: 0, y: -20 })
            .from(".countdown-image", { y: 240, opacity: 0 }, "<0.3");
    }, { scope: containerRef });

    const units = [
        { value: pad(timeLeft.days, 3), label: "Дні" },
        { value: pad(timeLeft.hours), label: "Год" },
        { value: pad(timeLeft.minutes), label: "Хв" },
        { value: pad(timeLeft.seconds), label: "Сек" },
    ];

    return (
        <div ref={containerRef} className="flex justify-center px-5 mt-10">
            <div className="relative w-full max-w-md overflow-hidden rounded-t-[9999px] bg-foreground">

                {/* Top — sage arch with title + countdown */}
                <div className="countdown-counter bg-foreground text-background text-center pt-20 pb-12 px-8">
                    <h2 className="font-cormorant italic text-4xl mb-10">
                        До Зустрічі Через...
                    </h2>

                    <div className="flex items-start justify-center gap-1">
                        {units.map((unit, i) => (
                            <Fragment key={unit.label}>
                                <div key={unit.label} className="flex flex-col items-center min-w-[3rem]">
                                    <span className="font-cormorant italic font-bold text-5xl leading-none">
                                        {unit.value}
                                    </span>
                                    <span className="font-cormorant italic text-xl mt-2">
                                        {unit.label}
                                    </span>
                                </div>
                                {i < units.length - 1 && (
                                    <span key={`sep-${i}`} className="font-cormorant font-bold text-5xl leading-none px-1 pb-8 self-end">
                                        :
                                    </span>
                                )}
                            </Fragment>
                        ))}
                    </div>
                </div>

                {/* Bottom — wedding photo */}
                <div className="countdown-image relative w-full aspect-[3/4]">
                    <Image
                        src="/images/WeddingBottom.jpeg"
                        alt="До зустрічі"
                        fill
                        className="object-cover object-top rounded-t-[9999px]"
                    />
                </div>

            </div>
        </div>
    );
}
