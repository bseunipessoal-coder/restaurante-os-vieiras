import React from 'react';
import { MapPin, Navigation, Phone, MessageSquare, Clock, ExternalLink } from 'lucide-react';
import type { RestaurantInfo } from '../types';

interface LocationContactProps {
  info: RestaurantInfo;
}

export const LocationContact: React.FC<LocationContactProps> = ({ info }) => {
  return (
    <section id="contactos" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>Loures • Portugal</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-white mb-4">
            Onde Estamos & <span className="bordeaux-gradient-text">Contactos</span>
          </h2>

          <p className="text-neutral-300 text-base">
            Estamos convenientemente localizados em <strong>Loures</strong>, com fácil acesso e estacionamento nas proximidades.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LOCATION INFO & GPS BUTTONS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-2xl">
              
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-[#800020] text-white border border-rose-500/40 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-bold mb-1">Localização</h4>
                  <p className="text-lg font-bold text-white font-serif-title">{info.address}</p>
                  <p className="text-sm text-neutral-300">{info.postal_code} {info.city}, Portugal</p>
                </div>
              </div>

              {/* MAPS & WAZE BUTTONS */}
              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <span className="text-xs uppercase tracking-wider text-rose-400 font-bold block mb-2">
                  Navegação Directa GPS (1-Clique):
                </span>

                <a
                  href={info.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#800020] hover:bg-[#9c1834] text-white font-bold text-sm flex items-center justify-between transition-all shadow-xl cursor-pointer border border-rose-500/40"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-white" />
                    <span>Abrir no Google Maps</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-90" />
                </a>

                <a
                  href={info.waze_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm flex items-center justify-between transition-all shadow-xl cursor-pointer border border-neutral-700"
                >
                  <div className="flex items-center gap-3">
                    <Navigation className="w-5 h-5 text-sky-400" />
                    <span>Navegar pelo Waze</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-90" />
                </a>
              </div>

              {/* PHONE & WHATSAPP */}
              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-rose-500" />
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase block font-bold">Telefone Fixo</span>
                      <span className="text-sm font-bold text-white">{info.phone}</span>
                    </div>
                  </div>
                  <a href={`tel:${info.phone}`} className="px-3.5 py-1.5 rounded-lg bg-[#800020] text-white text-xs font-bold hover:bg-[#9c1834] transition-colors border border-rose-500/30">
                    Ligar
                  </a>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase block font-bold">WhatsApp Directo</span>
                      <span className="text-sm font-bold text-white">{info.whatsapp}</span>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors"
                  >
                    Chat
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* OPENING HOURS & MAP */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* OPENING HOURS */}
            <div className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-rose-500" />
                <h3 className="font-serif-title text-xl font-bold text-white">
                  Horário de Funcionamento
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black border border-neutral-800">
                  <span className="text-neutral-300 font-medium">Terça a Sexta-Feira</span>
                  <span className="font-bold text-rose-300">{info.opening_hours.weekdays}</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black border border-neutral-800">
                  <span className="text-neutral-300 font-medium">Sábado e Domingo</span>
                  <span className="font-bold text-rose-300">{info.opening_hours.weekends}</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-black border border-neutral-800">
                  <span className="text-neutral-300 font-medium">Segunda-Feira</span>
                  <span className="font-bold text-red-500">{info.opening_hours.closed}</span>
                </div>
              </div>
            </div>

            {/* MAP CARD VISUAL */}
            <div className="relative h-64 rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-2xl">
              <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-6 text-center">
                <MapPin className="w-12 h-12 text-[#800020] mb-3 animate-bounce" />
                <h4 className="font-serif-title text-xl font-bold text-white">
                  Restaurante Vieiras em Loures
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm mt-1 mb-4">
                  Rua Principal de Loures, Nº 45 • 2670-401 Loures
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={info.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#800020] hover:bg-[#9c1834] text-white text-xs font-bold shadow-md transition-colors border border-rose-500/40"
                  >
                    Ver no Google Maps
                  </a>
                  <a
                    href={info.waze_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold shadow-md transition-colors border border-neutral-700"
                  >
                    Ver no Waze
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
