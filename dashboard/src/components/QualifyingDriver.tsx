"use client";

import { motion } from "motion/react";
import clsx from "clsx";

import DriverTag from "./driver/DriverTag";
import TireIcon from "./TireIcon"; // Ajusta esta ruta relativa según la ubicación exacta de TireIcon.tsx

import type { Driver as DriverType, TimingAppDataDriver, TimingDataDriver } from "@/types/state.type";

type Props = {
    driver: DriverType;
    timingDriver: TimingDataDriver;
    appTimingDriver: TimingAppDataDriver | undefined;

    currentBestName: string | undefined;
    currentBestTime: string | undefined;
};

export default function DriverQuali({
    driver,
    timingDriver,
    appTimingDriver,
    currentBestName,
    currentBestTime,
}: Props) {
    const stints = appTimingDriver?.Stints ?? [];
    const currentStint = stints ? stints[stints.length - 1] : null;

    const currentTime = timingDriver.Sectors[2].Value
        ? timingDriver.Sectors[2].Value
        : timingDriver.Sectors[1].Value
            ? timingDriver.Sectors[1].Value
            : timingDriver.Sectors[0].Value
                ? timingDriver.Sectors[0].Value
                : "-- --";

    return (
        <motion.div
            layout
            className="flex min-w-72 flex-col gap-2"
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
        >
            <div className="flex justify-between">
                <DriverTag position={parseInt(timingDriver.Position)} teamColor={driver.TeamColour} short={driver.Tla} />
                <div>
                    {currentStint ? (
                        <TireIcon compound={currentStint.Compound || ""} size={32} />
                    ) : (
                        <div className="h-8 w-8 animate-pulse rounded-md bg-zinc-800 font-semibold" />
                    )}
                </div>
            </div>

            <div className="flex justify-between">
                <p className="text-3xl font-semibold">{currentTime}</p>

                <div className="flex flex-col items-end">
                    {currentBestTime && (
                        <>
                            <p className="text-xl leading-none text-zinc-500">{currentBestTime}</p>
                            <p className="text-sm leading-none font-medium text-zinc-500">{currentBestName}</p>
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-1">
                {timingDriver.Sectors.map((sector, i) => (
                    <div className="flex flex-col gap-1" key={`quali.sector.${driver.Tla}.${i}`}>
                        <div
                            className={clsx("h-4 rounded-md", {
                                "bg-zinc-500!": !sector.Value,
                                "bg-violet-500": sector.OverallFastest,
                                "bg-emerald-500": sector.PersonalFastest,
                                "bg-amber-400": !sector.OverallFastest && !sector.PersonalFastest,
                            })}
                        />
                        <p
                            className={clsx("text-center text-lg leading-none font-semibold", {
                                "text-zinc-500!": !sector.Value,
                                "text-violet-500": sector.OverallFastest,
                                "text-emerald-500": sector.PersonalFastest,
                                "text-yellow-500": !sector.OverallFastest && !sector.PersonalFastest,
                            })}
                        >
                            {!!sector.Value ? sector.Value : "-- ---"}
                        </p>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
