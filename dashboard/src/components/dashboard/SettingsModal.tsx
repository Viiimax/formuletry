"use client";

import { X, Monitor, Zap, Gauge, Tv, AlignJustify, Star } from "lucide-react";
import { useSettingsStore } from "@/stores/useSettingsStore";

// Componente de Switch (Toggle)
const ToggleSwitch = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
      active ? "bg-blue-600" : "bg-gray-700"
    }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
        active ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  // Conexión con el Store
  const { 
    delay, setDelay, 
    oledMode, setOledMode,
    speedUnit, setSpeedUnit,
    compactMode, setCompactMode 
  } = useSettingsStore();

  // Función para manejar el cambio en el input numérico
  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // Asegurarse de que es un número válido y no negativo
    if (!isNaN(value) && value >= 0) {
      setDelay(value);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#1F2937] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <Monitor className="w-5 h-5 text-blue-400" />
            Configuración
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-8 overflow-y-auto max-h-[80vh]">
          
          {/* SECCIÓN 1: SINCRONIZACIÓN (DELAY) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                Sincronización TV
              </h3>
              <span className="text-xs font-mono text-gray-400 bg-black/30 px-2 py-1 rounded">
                {delay === 0 ? "LIVE" : `-${delay}s DELAY`}
              </span>
            </div>

            <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Tv className="w-5 h-5 text-gray-400" />
                    <div>
                        <p className="text-white font-medium text-sm">Broadcast Delay</p>
                        <p className="text-xs text-gray-500">Ajusta para coincidir con tu TV (segundos)</p>
                    </div>
                </div>
                
                {/* Input Numérico Simple */}
                <div className="flex items-center">
                    <input
                        type="number"
                        min="0"
                        value={delay}
                        onChange={handleDelayChange}
                        className="w-20 h-10 bg-[#111827] border border-white/10 rounded-lg text-white text-center font-mono focus:outline-none focus:border-blue-500 appearance-none"
                    />
                </div>
            </div>
          </div>

          {/* SECCIÓN: VISUALIZACIÓN */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                Visualización
              </h3>
            </div>

            <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlignJustify className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-white font-medium text-sm">Modo Compacto</p>
                  <p className="text-xs text-gray-500">Apila los sectores para evitar el scroll horizontal</p>
                </div>
              </div>
              <ToggleSwitch
                active={compactMode}
                onClick={() => setCompactMode(!compactMode)}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}