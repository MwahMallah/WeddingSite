"use client";

import { useControls } from "leva";
import { useEffect } from "react";
import Header from "./components/Header/Header";
import GuestInvite from "./components/GuestInvite/GuestInvite";
import Location from "./components/Location/Location";
import DayProgram from "./components/DayProgram/DayProgram";
import DressCode from "./components/DressCode/DressCode";
import Wishes from "./components/Wishes/Wishes";
import RSVP from "./components/RSVP/RSVP";
import Countdown from "./components/Countdown/Countdown";

export default function Home() {
	// const { fgColor } = useControls({
	// 	fgColor: "#a8a385",
	// });

	// useEffect(() => {
	// 	document.documentElement.style.setProperty("--foreground", fgColor);
	// }, [fgColor]);

	return (
		<div className="flex flex-col justify-center">
			<Header />
			<GuestInvite />
			<Location />
			<DayProgram />
			<DressCode />
			<Wishes />
			<RSVP />
			<Countdown />
		</div>
	);
}
