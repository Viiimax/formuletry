import clsx from "clsx";

type Props = {
	teamColor: string;
	short: string;
	position?: number;
	className?: string;
};

export default function DriverTag({ position, teamColor, short, className }: Props) {
	// Function to darken the team color
	const darkenColor = (color: string, percent: number = 0.3) => {
		const hex = color.replace('#', '');
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		
		const darkenedR = Math.floor(r * (1 - percent));
		const darkenedG = Math.floor(g * (1 - percent));
		const darkenedB = Math.floor(b * (1 - percent));
		
		return `rgb(${darkenedR}, ${darkenedG}, ${darkenedB})`;
	};

	const getCustomTeamColor = (teamColor: string, driverTla: string) => {
		switch (driverTla) {
			case "BOR":
			case "HUL":
				return "#800020"; // Bordo para Audi
			case "BOT":
			case "PER":
				return "#FFFFFF"; // Blanco para Cadillac
			default:
				return `#${teamColor}`;
		}
	};

	const getDarkerTeamColor = (teamColor: string, driverTla: string) => {
		const color = getCustomTeamColor(teamColor, driverTla);

		if (driverTla === "BOT" || driverTla === "PER") {
			return "#E0E0E0"; // Gris más oscuro para Cadillac
		}

		// Verificar si el color está en formato hexadecimal
		if (color.startsWith("#")) {
			const hex = color.replace("#", "");
			const r = parseInt(hex.substring(0, 2), 16);
			const g = parseInt(hex.substring(2, 4), 16);
			const b = parseInt(hex.substring(4, 6), 16);

			const darkenedR = Math.max(0, Math.floor(r * 0.7));
			const darkenedG = Math.max(0, Math.floor(g * 0.7));
			const darkenedB = Math.max(0, Math.floor(b * 0.7));

			return `rgb(${darkenedR}, ${darkenedG}, ${darkenedB})`;
		}

		// Si el color ya está en formato RGB, oscurecer directamente
		const rgb = color.replace(/rgb\(|\)/g, "").split(",").map(Number);
		const darkened = rgb.map((c) => Math.max(0, c - 30));
		return `rgb(${darkened.join(", ")})`;
	};

	const getFontColor = (driverTla: string, isName: boolean = false) => {
		switch (driverTla) {
			case "BOT":
			case "PER":
				return "#000000"; // Negro para Cadillac (posición y nombre)
			default:
				return isName ? "#FFFFFF" : "#FFFFFF"; // Blanco para otros equipos
		}
	};

	return (
		<div
			id="walkthrough-driver-position"
			className={clsx(
				"flex w-fit items-center",
				className,
			)}
		>
			{position && (
				<div 
					className="flex items-center justify-center w-6 h-6 rounded-l font-mono font-bold text-xs"
					style={{ 
						backgroundColor: getCustomTeamColor(teamColor, short), 
						color: getFontColor(short) // Cambiar color de fuente según el equipo
					}}
				>
					{position}
				</div>
			)}
			<div 
				className="flex items-center px-2 py-1 rounded-r text-sm"
				style={{ 
					backgroundColor: getDarkerTeamColor(teamColor, short), 
					color: getFontColor(short, true) // Cambiar color del nombre según el equipo
				}}
			>
				<p className="font-mono text-xs font-semibold">
					{short}
				</p>
			</div>
		</div>
	);
}
