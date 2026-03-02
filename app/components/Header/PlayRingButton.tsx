"use client";

import { useGSAP } from "@gsap/react";
import { Pause, Play } from "lucide-react";
import gsap from "gsap";
import { useRef } from "react";
import useAudio from "./useAudio";

function PlayRingButton() {
	const ringRef = useRef<HTMLDivElement>(null);
	const text = "включити пісню • включити пісню •";
	const radius = 75;
	const characters = text.split("");

	const { isPlaying, toggle } = useAudio({
		path: "/audio/wedding_song.mp3",
	});

	useGSAP(() => {
		gsap.to(ringRef.current, {
			rotation: 360,
			repeat: -1,
			duration: 8,
			ease: "none",
			transformOrigin: "50% 50%",
		});
	});

	return (
		<div className="relative mt-[-44px] z-50">
			<div ref={ringRef} className="absolute inset-0 pointer-events-none">
				{characters.map((char, i) => {
					const angle = (360 / characters.length) * i;
					return (
						<span
							key={i}
							className="absolute left-1/2 top-1/2 tracking-widest ring-char text-white text-[15px]"
							style={{
								transform: `
                  rotate(${angle}deg)
                  translate(${radius}px)
                  rotate(90deg)
                `,
								transformOrigin: "0 0",
							}}
						>
							{char}
						</span>
					);
				})}
			</div>
			<div
				className="
          flex items-center justify-center
          rounded-full w-24 h-24 bg-[#efe9c3]
          hover:opacity-80 cursor-pointer
        "
				onClick={toggle}
			>
				{isPlaying ? (
					<Pause className="w-8 h-8" />
				) : (
					<Play className="w-8 h-8" />
				)}
			</div>
		</div>
	);
}

export default PlayRingButton;
