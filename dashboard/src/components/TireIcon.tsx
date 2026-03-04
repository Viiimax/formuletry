import React from 'react';
import clsx from 'clsx';

type TireIconProps = {
    compound: string;
    className?: string;
    size?: number;
};

export default function TireIcon({ compound, className, size = 32 }: TireIconProps) {
    const getTireConfig = (comp: string) => {
        const c = comp.toLowerCase();
        if (c.includes("soft")) return { color: "#EF4444", letter: "S" }; // Red
        if (c.includes("medium")) return { color: "#FACC15", letter: "M" }; // Yellow
        if (c.includes("hard")) return { color: "#FFFFFF", letter: "H" }; // White
        if (c.includes("inter")) return { color: "#22C55E", letter: "I" }; // Green
        if (c.includes("wet")) return { color: "#3B82F6", letter: "W" }; // Blue
        return { color: "#9CA3AF", letter: "?" }; // Unknown - Gray
    };

    const config = getTireConfig(compound);

    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 172 172" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={clsx("shrink-0", className)}
        >
            <circle cx="86" cy="86" r="86" fill="black"/>
            <path d="M70 19C40.6787 26.58 19 53.4792 19 85.5C19 117.521 40.6787 144.42 70 152" stroke={config.color} strokeWidth="20"/>
            <path d="M101 152C130.321 144.42 152 117.521 152 85.5C152 53.4792 130.321 26.58 101 19" stroke={config.color} strokeWidth="20"/>
            <text x="86" y="116" fontSize="76" fontWeight="900" fontFamily="sans-serif" fill={config.color} textAnchor="middle">
                {config.letter}
            </text>
        </svg>
    );
}