"use client";

import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

function Location() {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				start: "top 75%",
				once: true,
			},
		});

		tl.from(".location-heading", {
			y: -20,
			opacity: 0,
		}).to(".location-image", {
			opacity: 1,
		});
	});

	return (
		<div
			ref={containerRef}
			className="mt-40 flex flex-col items-center text-center"
		>
			<h1 className="location-heading text-5xl pb-5 text-foreground">
				Локація Святкування
			</h1>
			<div className="location-image rounded-3xl overflow-hidden opacity-0">
				<Image
					alt="Локация"
					src={"/images/Location.PNG"}
					width={1206}
					height={1596}
				/>
			</div>
			<p className="mt-2">Место Crystal Hall</p>
			<div className="mt-6">
				<Link
					href="https://maps.app.goo.gl/a5sGJcRYPNFdBA1p9?g_st=it"
					target="_blank"
					className="inline-block rounded-4xl bg-foreground text-background px-6 py-3 hover:opacity-80 transition"
				>
					Подивитись на мапі
				</Link>
			</div>
		</div>
	);
}

export default Location;
