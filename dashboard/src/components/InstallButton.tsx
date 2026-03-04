"use client";

import { useState, useEffect } from "react";
import { Download, Share, PlusSquare } from "lucide-react";

export default function InstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [showIOSInstructions, setShowIOSInstructions] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Detectar si ya está instalada
        if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
            setIsStandalone(true);
        }

        // Detectar iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        setIsIOS(/iphone|ipad|ipod/.test(userAgent));

        // Capturar evento de instalación
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    const handleInstallClick = async () => {
        if (isIOS) {
            setShowIOSInstructions(true);
            setTimeout(() => setShowIOSInstructions(false), 5000);
            return;
        }
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') setDeferredPrompt(null);
        }
    };

    // Mostrar siempre el botón, respetando el tipo de dispositivo
    // Eliminamos la condición que oculta el botón

    return (
        <div className="relative flex-1 flex">
            <button 
                onClick={handleInstallClick}
                className="group w-full flex items-center justify-center gap-2 px-2 py-3 md:px-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 backdrop-blur-md text-gray-300 hover:text-white font-medium transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_4px_20px_rgba(16,185,129,0.15)]"
            >
                <Download className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-xs md:text-sm tracking-wide truncate">Install App</span>
            </button>

            {/* Tooltip para iOS */}
            {showIOSInstructions && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-60 p-3 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl text-xs text-white text-center animate-in fade-in slide-in-from-bottom-2 z-50 flex flex-col items-center gap-2">
                    <p className="font-bold text-slate-200">Para instalar en tu iPhone:</p>
                    <div className="flex items-center justify-center gap-2 text-slate-300">
                        <span>1. Toca Compartir en tu navegador </span>
                        <Share className="w-4 h-4" />
                    </div>
                    <p className="text-slate-400 text-xs">(El botón que se encuentra al lado del link)</p>
                    <div className="flex items-center justify-center gap-2 text-slate-300">
                        <span>2. Luego toca Agregar a inicio</span>
                        <PlusSquare className="w-4 h-4" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 border-b border-r border-slate-600 transform rotate-45"></div>
                </div>
            )}
        </div>
    );
}