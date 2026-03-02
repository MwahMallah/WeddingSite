"use client";

import { useControls } from "leva";
import { useEffect } from "react";
import Header from "./components/Header/Header";

export default function Home() {
	const { bgColor } = useControls({
		bgColor: "#a8a385",
	});

	useEffect(() => {
		document.documentElement.style.setProperty("--background", bgColor);
	}, [bgColor]);

	return (
		<div className="flex min-h-screen justify-center ">
			<Header />
		</div>
	);
}
