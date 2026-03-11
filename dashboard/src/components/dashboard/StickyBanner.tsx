"use client";
import { useState } from "react";

export default function StickyBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#111827]/95 backdrop-blur-md border-t border-white/10 p-3 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-2">
        
        {/* Contenido del Banner (Adaptado al texto que elegiste) */}
        <a 
          href="https://twitter.com/formuletry" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg border-2 border-dashed border-white/20 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-blue-400/50 transition-colors">
            <span className="text-gray-400 group-hover:text-blue-400 text-[10px] font-bold tracking-wider transition-colors">AD</span>
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-tight group-hover:text-blue-400 transition-colors">
              Tu Marca Aquí
            </p>
            <p className="text-gray-400 text-xs hidden sm:block">
              Conecta tu negocio con miles de fanáticos del motorsport. Sé nuestro Sponsor Oficial.
            </p>
            <p className="text-gray-400 text-xs sm:hidden">
              Conecta con miles de fans.
            </p>
          </div>
        </a>

        {/* Botón de Cerrar */}
        <button 
          onClick={() => setIsVisible(false)}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0"
          aria-label="Cerrar anuncio"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
      </div>
    </div>
  );
}