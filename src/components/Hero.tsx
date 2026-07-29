import React from 'react';
import { MapPin, Navigation, Calendar, Utensils, Star, ArrowRight } from 'lucide-react';
import type { RestaurantInfo } from '../types';

interface HeroProps {
  info: RestaurantInfo;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ info, onOpenReservation }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-black">
      {/* Background Image with Bordeaux Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.png"
          alt="Restaurante Vieiras Loures"
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#800020]/20 via-transparent to-black" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-12">
        
        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#800020]/30 border border-rose-500/40 text-white text-xs sm:text-sm font-bold mb-6 shadow-xl backdrop-blur-md">
          <MapPin className="w-4 h-4 text-rose-400" />
          <span>{info.city} • Loures, Portugal</span>
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
        </div>

        {/* Title */}
        <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight mb-6 drop-shadow-2xl">
          Tradição, Família & <br />
          <span className="bordeaux-gradient-text">Sabores Autênticos</span>
        </h1>

        {/* Tagline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed mb-10 drop-shadow">
          Seja bem-vindo ao restaurante <strong className="text-white font-bold">Vieiras</strong>. 
          Pratos com o tempero e a alma da gastronomia portuguesa confeccionados diariamente com o melhor carinho.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onOpenReservation}
            className="w-full sm:w-auto px-8 py-4 text-base font-extrabold rounded-xl bg-gradient-to-r from-[#800020] via-[#9c1834] to-[#b81d3e] text-white hover:from-[#9c1834] hover:to-[#d42c50] border border-rose-500/40 shadow-2xl shadow-[#800020]/50 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Calendar className="w-5 h-5 text-white" />
            <span>Fazer Reserva Online</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#pratos-dia"
            className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-xl bg-neutral-900/90 border border-neutral-800 text-white hover:bg-neutral-800 hover:border-rose-500/50 backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <Utensils className="w-5 h-5 text-rose-400" />
            <span>Ver Pratos do Dia</span>
          </a>
        </div>

        {/* GPS QUICK LINKS (GOOGLE MAPS & WAZE) */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 p-3.5 rounded-2xl bg-black/80 border border-neutral-800 backdrop-blur-md max-w-xl mx-auto shadow-2xl">
          <span className="text-xs uppercase tracking-wider text-neutral-400 font-bold px-2">
            Como Chegar (Loures):
          </span>

          <a
            href={info.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-2 border border-neutral-700 transition-colors shadow-sm"
          >
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>Google Maps</span>
          </a>

          <a
            href={info.waze_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-2 border border-neutral-700 transition-colors shadow-sm"
          >
            <Navigation className="w-4 h-4 text-sky-400" />
            <span>Waze Directo</span>
          </a>
        </div>

        {/* HIGHLIGHT STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-12 border-t border-neutral-900">
          <div className="p-4 rounded-xl bg-black/60 border border-neutral-800/80 backdrop-blur-sm">
            <span className="block text-3xl font-serif-title font-bold text-white mb-1">+25 Anos</span>
            <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">Tradição de Família</span>
          </div>
          <div className="p-4 rounded-xl bg-black/60 border border-neutral-800/80 backdrop-blur-sm">
            <span className="block text-3xl font-serif-title font-bold text-white mb-1">100% Fresco</span>
            <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">Ingredientes Diários</span>
          </div>
          <div className="p-4 rounded-xl bg-black/60 border border-neutral-800/80 backdrop-blur-sm">
            <span className="block text-3xl font-serif-title font-bold text-white mb-1">Loures</span>
            <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">Fácil Estacionamento</span>
          </div>
          <div className="p-4 rounded-xl bg-black/60 border border-neutral-800/80 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 text-white mb-1">
              <Star className="w-5 h-5 fill-rose-500 text-rose-500" />
              <span className="text-2xl font-serif-title font-bold">4.9/5</span>
            </div>
            <span className="text-xs text-rose-400 font-bold uppercase tracking-wider">Avaliação Clientes</span>
          </div>
        </div>

      </div>
    </section>
  );
};
