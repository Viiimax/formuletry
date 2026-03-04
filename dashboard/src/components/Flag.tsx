"use client";

import { clsx } from "clsx";
import { useState, useEffect } from "react";

type Props = {
	countryCode: string | undefined;
	className?: string;
};

export default function Flag({ countryCode, className }: Props) {
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		setHasError(false);
	}, [countryCode]);

	return (
		<div className={clsx("flex h-12 w-16 content-center justify-center shrink-0", className)}>
			{countryCode && !hasError ? (
				/* Usamos img estándar para evitar el Image Optimization Engine de Vercel en SVGs */
				<img
					src={`/country-flags/${countryCode.toLowerCase()}.svg`}
					alt={countryCode}
					width={64}
					height={48}
					className="overflow-hidden rounded-lg object-cover"
					onError={() => setHasError(true)}
				/>
			) : (
				<div className="h-full w-full overflow-hidden rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
					<span className="text-[10px] text-slate-500 font-bold uppercase">
						{countryCode || "?"}
					</span>
				</div>
			)}
		</div>
	);
}
