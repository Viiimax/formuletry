import clsx from "clsx";
import TireIcon from "../TireIcon"; // Ajusta la ruta relativa si es necesario
import type { Stint } from "@/types/state.type";

type Props = {
    stints: Stint[] | undefined;
};

export default function DriverTire({ stints }: Props) {
    const stops = stints ? stints.length - 1 : 0;
    const currentStint = stints ? stints[stints.length - 1] : null;

    return (
        <div className="flex flex-row items-center gap-1 place-self-start">
            {currentStint ? (
                <TireIcon compound={currentStint.Compound || ""} size={20} />
            ) : (
                <div className="h-5 w-5 animate-pulse rounded-full bg-slate-800" />
            )}

            <div>
                <p className="text-xs leading-tight font-medium">
                    L {currentStint?.TotalLaps ?? 0}
                    {currentStint?.New ? "" : "*"}
                </p>

                <p className="text-[10px] leading-tight text-slate-500">
                    PIT {stops}
                </p>
            </div>
        </div>
    );
}
