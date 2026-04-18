"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { submitRSVP } from "./actions";

gsap.registerPlugin(ScrollTrigger);

const drinkOptions = ["Горілка", "Коньяк", "Шампанське", "Вино"];

export default function RSVP() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                once: true,
            },
            defaults: { ease: "power2.out", duration: 0.6 },
        });

        tl.from(".rsvp-title", { opacity: 0, y: -20 })
            .from(".rsvp-desc", { opacity: 0, y: 20 }, ">0.05")
            .from(".rsvp-field", { opacity: 0, y: 30, stagger: 0.15 }, ">0.1");
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="flex flex-col items-center text-center text-text px-8 py-14">
            <h2 className="rsvp-title font-playfair font-bold text-4xl leading-tight mb-6 max-w-xs">
                ПІДТВЕРДЖЕННЯ ПРИСУТНОСТІ
            </h2>

            <p className="rsvp-desc text-xl max-w-sm mb-2">
                Будь ласка, відправте відповідь про вашу присутність на весіллі
            </p>
            <p className="rsvp-desc text-xl font-bold mb-10">до 1.06.2026</p>

            <form action={submitRSVP} className="w-full max-w-sm flex flex-col gap-8 text-left">
                {/* Name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Ваше ім'я та прізвище"
                    required
                    className="rsvp-field w-full rounded-full border border-foreground/40 bg-background px-6 py-4 outline-none text-text placeholder:text-text/50 text-lg"
                />

                {/* Attendance */}
                <div className="rsvp-field">
                    <p className="font-bold text-lg mb-3">Чи плануєте ви бути на весіллі?</p>
                    <label className="flex items-center gap-3 mb-3 cursor-pointer text-lg">
                        <input type="radio" name="attending" value="yes" className="appearance-none w-5 h-5 border-2 border-text/40 rounded-sm checked:bg-foreground checked:border-foreground cursor-pointer shrink-0" />
                        Так, із задоволенням!
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer text-lg">
                        <input type="radio" name="attending" value="no" className="appearance-none w-5 h-5 border-2 border-text/40 rounded-sm checked:bg-foreground checked:border-foreground cursor-pointer shrink-0" />
                        На жаль, не зможу
                    </label>
                </div>

                {/* Drinks */}
                <div className="rsvp-field">
                    <p className="font-bold text-lg mb-3">Вкажіть, будь ласка, ваші побажання по алкогольним напоям:</p>
                    {drinkOptions.map((drink) => (
                        <label key={drink} className="flex items-center gap-3 mb-3 cursor-pointer text-lg">
                            <input type="checkbox" name="drinks" value={drink} className="appearance-none w-5 h-5 border-2 border-text/40 rounded-sm checked:bg-foreground checked:border-foreground cursor-pointer shrink-0" />
                            {drink}
                        </label>
                    ))}
                </div>

                {/* Submit */}
                <div className="rsvp-field flex justify-end">
                    <button
                        type="submit"
                        className="bg-foreground text-background font-bold tracking-widest text-sm rounded-full px-10 py-4 hover:opacity-80 transition cursor-pointer"
                    >
                        ВІДПРАВИТИ
                    </button>
                </div>
            </form>
        </div>
    );
}
