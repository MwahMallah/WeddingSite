import Image from "next/image";

export interface ProgramItemProps {
    imageSrc: string;
    time: string;
    desc: string;
    cn: string;
}

export default function ProgramItem({imageSrc, time, desc, cn}: ProgramItemProps) {
    return <div className={`flex flex-col justify-center items-center py-4 ${cn}`}>
        <Image
            alt={desc}
            src={imageSrc}  
            width={72}
            height={81}
            className="w-25 h-25 object-contain"
        />

        <p className="text-5xl font-bold">{time}</p>
        <p className="text-2xl">{desc}</p>
    </div>
}