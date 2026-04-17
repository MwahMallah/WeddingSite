import { useGSAP } from "@gsap/react";
import ProgramItem from "./ProgramItem";
import { useRef } from "react";

import gsap from "gsap";


export default function DayProgram() {
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

        tl.from(".pi-1", { opacity: 0, y: 20 })
            .from(".pi-2", { opacity: 0, y: 20 }, ">0.05")
            .from(".pi-3", { opacity: 0, y: 20 }, ">0.05")
            .from(".pi-title", { opacity: 0 }, 0.5);
    }, []);

    return <div ref={containerRef} className="bg-foreground my-10 text-background mx-5 border-foreground rounded-t-[9999px] rounded-b-[9999px] p-10 flex flex-col align-center justify-center">
        <h2 className="text-3xl my-8 self-center pi-title">ПРОГРАМА ДНЯ</h2>
        <div className="flex flex-col gap-6">
            <ProgramItem imageSrc="/images/Glasses.png" time="15:30" desc="Збір гостей" cn="pi-1"/>
            <ProgramItem imageSrc="/images/Plates.png" time="16:00" desc="Святковий банкет" cn="pi-2"/>
            <ProgramItem imageSrc="/images/Cake.png" time="22:00" desc="Завершення вечора" cn="pi-3"/>
        </div>
    </div>
}