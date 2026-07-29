import React from 'react';
import { MapPin, Navigation, ShieldAlert, Heart } from 'lucide-react';
import type { RestaurantInfo } from '../types';

interface FooterProps {
  info: RestaurantInfo;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ info, onOpenAdmin }) => {
  return (
    <footer className="bg-black border-t border-neutral-900 text-neutral-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-900">
          
          {/* BRAND */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Vieiras Logo" className="w-10 h-10 object-contain rounded-full border border-amber-500/60 shadow-md" />
              <span className="font-serif-title text-2xl font-bold text-white">Vieiras</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Restaurante tradicional português em Loures. Sabores autênticos de família confecionados diariamente com dedicação.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-rose-400">Navegação</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-white transition-colors">Quem Somos</a></li>
              <li><a href="#pratos-dia" className="hover:text-white transition-colors">Pratos do Dia</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">A Nossa Carta</a></li>
              <li><a href="#reservas" className="hover:text-white transition-colors">Reservas Online</a></li>
              <li><a href="#galeria" className="hover:text-white transition-colors">Galeria de Fotografias</a></li>
            </ul>
          </div>

          {/* GPS NAVIGATION */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-rose-400">Localização (Loures)</h5>
            <p className="text-xs text-neutral-300">{info.address}, {info.city}</p>
            <div className="pt-2 space-y-2">
              <a
                href={info.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-rose-400 hover:text-white font-bold block"
              >
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Google Maps Directo</span>
              </a>

              <a
                href={info.waze_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-sky-400 hover:text-white font-bold block"
              >
                <Navigation className="w-4 h-4 text-sky-400" />
                <span>Navegar pelo Waze</span>
              </a>
            </div>
          </div>

          {/* BACKOFFICE & ADMIN */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-rose-400">Gestão do Restaurante</h5>
            <p className="text-xs text-neutral-400">
              Aceda ao painel interno para validar reservas e atualizar os pratos do dia.
            </p>
            <button
              onClick={onOpenAdmin}
              className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-white hover:border-[#800020] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span>Aceder ao Backoffice</span>
            </button>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} Restaurante "Vieiras" — Todos os direitos reservados. Loures, Portugal.</p>
          <p className="flex items-center gap-1">
            <span>Desenvolvido com</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para a Gastronomia Portuguesa</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
