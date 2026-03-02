import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PlayRingButton from "./PlayRingButton";

function Header() {
	const imageCoverRef = useRef<HTMLDivElement>(null);
	useGSAP(() => {
		gsap.to(imageCoverRef.current, {
			opacity: 1,
			duration: 1.2,
			ease: "power2.out",
		});
	});

	return (
		<div className="flex flex-col items-center">
			<div
				ref={imageCoverRef}
				className="opacity-0 border-solid border-5 rounded-b-full border-zinc-100 overflow-hidden"
			>
				<Image
					src={"/images/Header.JPG"}
					width={853}
					height={907}
					alt={"Красивое фото"}
				/>
			</div>
			<PlayRingButton />
		</div>
	);
}

export default Header;
