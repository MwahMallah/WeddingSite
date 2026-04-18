"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Wishes() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                once: true,
            },
            defaults: { ease: "power2.out" },
        });

        tl.from(".wishes-title", { opacity: 0, y: -20 })
            .from(".wishes-desc", { opacity: 0, y: 20 })
            .from(".wishes-heart", { opacity: 0, scale: 0, duration: 0.5, stagger: 0.2 });
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="bg-foreground my-10 text-background mx-5 rounded-t-[9999px] rounded-b-[9999px] p-16 flex flex-col items-center text-center justify-center"
        >
            <h2 className="wishes-title font-playfair font-bold text-4xl my-6">ПОБАЖАННЯ</h2>
            <p className="wishes-desc font-cormorant text-xl max-w-sm leading-relaxed mb-8">
                Просимо вас не дарувати нам квіти, ми не встигнемо насолодитися їх красою
            </p>
            <Heart className="wishes-heart w-10 h-10 fill-background stroke-background mb-5" />
            <p className="wishes-desc font-cormorant text-xl max-w-sm leading-relaxed mb-8">
                Приємним компліментом для нас буде, якщо ви замість квітів вирішите подарувати нам пляшку вашого алкогольного напою з датою, коли ми її маємо відкрити
            </p>
            <Heart className="wishes-heart w-10 h-10 fill-background stroke-background mb-5" />
            <p className="wishes-desc font-cormorant text-xl max-w-sm leading-relaxed mb-8">
                Якщо ви хочете подарувати нам цінний та потрібний подарунок, ми будемо дуже вдячні за вклад у бюджет нашої молодої сім’ї    
            </p>
        </div>
    );
}
