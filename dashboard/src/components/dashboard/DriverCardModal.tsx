import React from "react";
import { X, Disc, Activity, ArrowUp, ArrowDown } from "lucide-react";
import clsx from "clsx";
import { useDataStore } from "@/stores/useDataStore";
import DriverMiniSectors from "../driver/DriverMiniSectors";
import { sortPos } from "@/lib/sorting";
import type { Driver, TimingDataDriver } from "@/types/state.type";

interface DriverCardModalProps {
    driver: Driver;
    timingDriver: TimingDataDriver;
    onClose: () => void;
}

const DriverCardModal: React.FC<DriverCardModalProps> = ({ driver, timingDriver, onClose }) => {
    // 1. Regla de oro: Convertir número a string
    const driverNumStr = String(driver.RacingNumber);

    // 2. Extraer datos del store
    const timingStatsDriver = useDataStore((state) => state.state?.TimingStats?.Lines[driverNumStr]);
    const appTimingDriver = useDataStore((state) => state.state?.TimingAppData?.Lines[driverNumStr]);
    const allDrivers = useDataStore((state) => state.state?.DriverList);
    const allTiming = useDataStore((state) => state.state?.TimingData?.Lines);
    const sessionPart = useDataStore((state) => state.state?.TimingData?.SessionPart);

    // 3. Calcular neumático
    const lastStint = appTimingDriver?.Stints?.[appTimingDriver.Stints.length - 1];
    const tyreCompound = lastStint?.Compound || "N/A";
    const isNewTyre = lastStint?.New === "true";
    const tyreLaps = lastStint?.TotalLaps || 0;

    // Helper para el color de los neumáticos
    const getTyreColor = (compound: string) => {
        const c = compound.toUpperCase();
        if (c.includes("SOFT")) return "text-red-500";
        if (c.includes("MEDIUM")) return "text-yellow-400";
        if (c.includes("HARD")) return "text-white";
        if (c.includes("INTER") || c.includes("INTERMEDIATE")) return "text-green-500";
        if (c.includes("WET")) return "text-blue-500";
        return "text-white";
    };

    // 4. Lógica de Gaps con función helper
    const getGapToFront = (line: any) => {
        if (!line) return "--";
        const gap = line.IntervalToPositionAhead?.Value ??
                    (line.Stats ? line.Stats[sessionPart ? sessionPart - 1 : 0]?.TimeDifftoPositionAhead : undefined) ??
                    line.TimeDiffToPositionAhead ??
                    "";
        return gap ? gap : "--";
    };

    // 5. Calcular pilotos adelante y atrás
    let driverAhead: Driver | null = null;
    let driverBehind: Driver | null = null;
    let gapAhead = "--";
    let gapBehind = "--";

    if (allTiming && allDrivers) {
        const sortedLines = Object.values(allTiming).sort(sortPos);
        const myIndex = sortedLines.findIndex((l) => String(l.RacingNumber) === driverNumStr);

        // Piloto adelante
        if (myIndex > 0) {
            const aheadLine = sortedLines[myIndex - 1];
            driverAhead = allDrivers[aheadLine.RacingNumber];
            gapAhead = getGapToFront(timingDriver);
        } else if (myIndex === 0) {
            gapAhead = "LÍDER";
        }

        // Piloto atrás
        if (myIndex < sortedLines.length - 1) {
            const behindLine = sortedLines[myIndex + 1];
            driverBehind = allDrivers[behindLine.RacingNumber];
            gapBehind = getGapToFront(behindLine);
        }
    }

    return (
        // Overlay
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            {/* Modal Container */}
            <div 
                className="relative w-full max-w-sm md:max-w-2xl bg-[#1F2937] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Detalle Escudería (barra de color) */}
                <div 
                    className="absolute w-1 top-0 bottom-0 left-0 rounded-l-2xl"
                    style={{ backgroundColor: `#${driver.TeamColour}` }}
                />

                {/* Header */}
                <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-6 pl-6 md:pl-8 border-b border-white/10 bg-white/5">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-3xl md:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                                {driver.RacingNumber}
                            </h2>
                            <h3 className="text-base md:text-lg font-bold text-white">
                                {driver.FirstName} {driver.LastName.toUpperCase()}
                            </h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: `#${driver.TeamColour}` }}
                            />
                            <p className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-wider">
                                {driver.TeamName}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="px-2 md:px-3 py-1 bg-black/30 text-white font-bold rounded text-lg md:text-xl tabular-nums">
                            P{timingDriver.Position}
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Body - Bento Box Layout */}
                <div className="p-4 md:p-6 space-y-3 overflow-y-auto max-h-[80vh]">
                    
                    {/* Fila 1: Grid 3 columnas - Neumáticos | Tiempos | Pits */}
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                        
                        {/* Neumáticos */}
                        <div className="bg-black/20 p-3 md:p-4 rounded-xl border border-white/5 flex flex-col items-center text-center">
                            <Disc className="w-4 h-4 text-gray-400 mb-2" />
                            
                            {/* Nombre del compuesto con su color oficial */}
                            <p className={clsx("text-lg font-black uppercase tracking-wide", getTyreColor(tyreCompound))}>
                                {tyreCompound}
                            </p>
                            
                            {/* Estado y Vueltas simplificados */}
                            <div className="flex flex-col items-center gap-0.5 mt-1.5">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                                    {isNewTyre ? "NUEVO" : "USADO"}
                                </span>
                                <span className="text-xs text-slate-500 font-mono font-medium">
                                    {tyreLaps}L
                                </span>
                            </div>
                        </div>

                        {/* Tiempos (Last Lap arriba, Best Lap abajo) */}
                        <div className="bg-black/20 p-3 md:p-4 rounded-xl border border-white/5 flex flex-col gap-2 md:gap-3 text-center">
                            <div>
                                <p className="text-[10px] md:text-xs text-gray-500 mb-1">Última</p>
                                <p className="text-xs md:text-lg font-mono font-bold text-emerald-400 tabular-nums">
                                    {timingDriver.LastLapTime?.Value || "--:--.---"}
                                </p>
                            </div>
                            <div className="border-t border-white/5 pt-2 md:pt-3">
                                <p className="text-[10px] md:text-xs text-gray-500 mb-1">Mejor</p>
                                <p className="text-xs md:text-lg font-mono font-bold text-purple-400 tabular-nums">
                                    {timingStatsDriver?.PersonalBestLapTime?.Value || "--:--.---"}
                                </p>
                            </div>
                        </div>

                        {/* Pits */}
                        <div className="bg-black/20 p-3 md:p-4 rounded-xl border border-white/5 flex flex-col items-center text-center">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-bold text-gray-500 uppercase">PITS</span>
                            </div>
                            <p className="text-2xl md:text-3xl font-black text-white mb-2 tabular-nums">
                                {appTimingDriver?.Stints ? appTimingDriver.Stints.length - 1 : 0}
                            </p>
                            <span className={clsx(
                                "text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full font-bold uppercase inline-block",
                                timingDriver.InPit ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
                            )}>
                                {timingDriver.InPit ? "En Boxes" : "En Pista"}
                            </span>
                        </div>
                    </div>

                    {/* Fila 2 y 3: Ahead y Behind (apilados en mobile, lado a lado en PC) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        
                        {/* Adelante */}
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                            {gapAhead === "LÍDER" ? (
                                <div className="flex items-center justify-center h-full">
                                    <span className="text-2xl font-black text-amber-400">LÍDER</span>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 mb-3">
                                        <ArrowUp className="w-4 h-4 text-emerald-500" />
                                        <span className="text-xs text-gray-500 uppercase font-bold">Adelante</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-black text-white">
                                            {driverAhead ? driverAhead.Tla : "---"}
                                        </span>
                                        <span className="text-2xl font-mono font-bold tabular-nums text-white">
                                            {gapAhead}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Atrás */}
                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2 mb-3">
                                <ArrowDown className="w-4 h-4 text-red-500" />
                                <span className="text-xs text-gray-500 uppercase font-bold">Atrás</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-mono font-bold text-white tabular-nums">
                                    {gapBehind}
                                </span>
                                <span className="text-2xl font-black text-white">
                                    {driverBehind ? driverBehind.Tla : "---"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Fila 4: Minisectores */}
                    <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-3">Rendimiento por Sectores</p>
                        <div className="overflow-x-auto">
                            <DriverMiniSectors 
                                sectors={timingDriver.Sectors} 
                                bestSectors={timingStatsDriver?.BestSectors} 
                                className="w-full justify-between" 
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DriverCardModal;
