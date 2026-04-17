import Image from "next/image";

export interface ColorCircleProps {
    imageSrc?: string;
}

export default function ColorCircle({ imageSrc }: ColorCircleProps) {
    return (
        <div className="w-24 h-24 rounded-full border-2 border-foreground/40 shadow-md overflow-hidden flex-shrink-0 bg-foreground/10">
            {imageSrc && (
                <Image
                    src={imageSrc}
                    alt="Dress code color"
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                />
            )}
        </div>
    );
}
