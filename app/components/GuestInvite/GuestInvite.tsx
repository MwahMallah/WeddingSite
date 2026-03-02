"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function GuestInvite() {
	const containerRef = useRef<HTMLDivElement>(null);
	const typingRef = useRef<HTMLHeadingElement>(null);

	const fullText = "Дорогі Гості!";
	const [typed, setTyped] = useState("");

	const month = "жовтень";
	const weekday = "п'ятниця";
	const day = "25";
	const year = "2026";

	useGSAP(
		() => {
			if (!containerRef.current) return;

			// --- стартовые состояния (чтобы ничего не мигало)
			gsap.set(".gi-line", {
				opacity: 0,
				scaleX: 0,
				transformOrigin: "center",
			});
			gsap.set(".gi-sideText", { opacity: 0 });
			gsap.set(".gi-day", { opacity: 0, y: 20 });
			gsap.set(".gi-year", { opacity: 0 });
			gsap.set(".gi-names", { opacity: 0, y: -20 });

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 75%",
					once: true,
				},
				defaults: { ease: "power2.out" },
			});

			tl.to(".gi-names", { opacity: 1, duration: 0.7, y: 0 })
				.to(".gi-line.top", { opacity: 1, scaleX: 1, duration: 0.6 }, 0.2)
				.to(".gi-line.bottom", { opacity: 1, scaleX: 1, duration: 0.6 }, 0.4)
				.to(".gi-sideText", { opacity: 1, duration: 0.8 }, 0.7)
				.to(".gi-day", { opacity: 1, y: 0, duration: 1.0 }, 1.0)
				.to(".gi-year", { opacity: 1, duration: 0.8 }, 1.3)
				.add(() => {
					let i = 0;
					setTyped("");

					const tick: gsap.TickerCallback = () => {
						i += 1;
						setTyped(fullText.slice(0, i));
						if (i >= fullText.length) {
							gsap.ticker.remove(typedTick);
						}
					};

					let acc = 0;
					const typedTick: gsap.TickerCallback = (_time, deltaTime) => {
						acc += deltaTime;
						if (acc >= 150) {
							acc = 0;
							tick(0, 0, 0, 0);
						}
					};

					gsap.ticker.add(typedTick);
					// cleanup на всякий (если компонент размонтируется)
					ScrollTrigger.addEventListener("refreshInit", () => {
						gsap.ticker.remove(typedTick);
					});
				}, 1.55)
				.to({}, { duration: fullText.length * 0.15 })
				.from(".gi-main-text", { opacity: 0, y: 20 }, ">");
		},
		{ scope: containerRef },
	);

	return (
		<div
			ref={containerRef}
			className="pt-40 pb-20 flex flex-col items-center text-white px-4 bg-foreground rounded-b-full"
			style={{
				fontFamily: "'Cormorant Garamond', serif",
			}}
		>
			<div className="gi-names">
				<h1 className="text-5xl">Taras & Katya</h1>
			</div>
			{/* DATE BLOCK */}
			<div
				className="select-none mt-5 flex justify-center w-full"
				style={{ fontFamily: "'Playfair Display', serif" }}
			>
				<div className="flex items-center justify-between w-full max-w-[460px]">
					{/* left side */}
					<div className="flex flex-col items-center min-w-[100px]">
						<div className="gi-line top h-px w-full rounded bg-white" />
						<div className="gi-sideText uppercase tracking-[0.12em] text-[22px]">
							{month}
						</div>
						<div className="gi-line bottom h-px w-full rounded bg-white" />
					</div>

					{/* center */}
					<div className="flex flex-col items-center">
						<div className="gi-day text-[90px] font-medium leading-none tracking-[0.05em]">
							{day}
						</div>
						<div className="gi-year mt-2 text-[22px] font-light italic tracking-[0.15em]">
							{year}
						</div>
					</div>

					{/* right side */}
					<div className="flex flex-col items-center min-w-[100px]">
						<div className="gi-line top h-px w-full rounded bg-white" />
						<div className="gi-sideText uppercase tracking-[0.12em] text-[22px]">
							{weekday}
						</div>
						<div className="gi-line bottom h-px w-full rounded bg-white" />
					</div>
				</div>
			</div>

			{/* TYPING BLOCK */}
			<div className="mt-6 h-[50px] flex items-center justify-center">
				<h2
					ref={typingRef}
					className="text-center whitespace-pre-line overflow-hidden"
					style={{
						fontFamily: "'Cormorant Garamond', serif",
						fontSize: "40px",
					}}
				>
					{typed}
				</h2>
			</div>

			{/* INVITE TEXT */}
			<div className="gi-main-text mt-6 max-w-[700px] w-[80%] text-center opacity-90">
				<p className="mb-3">
					Незабаром у нашому житті відбудеться важлива подія – наше весілля.
				</p>
				<p>
					Ми раді запросити вас на наше весілля. Будь ласка, приєднуйтесь до
					нас, щоб відсвяткувати цей особливий день разом!
				</p>
			</div>
		</div>
	);
}

export default GuestInvite;
