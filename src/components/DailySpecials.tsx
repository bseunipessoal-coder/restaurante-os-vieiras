import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, AlertCircle } from 'lucide-react';
import type { DailySpecial } from '../types';
import { getDailySpecials } from '../services/restaurantService';

interface DailySpecialsProps {
  onOpenReservation: (dateStr?: string) => void;
}

const DAYS = [
  { id: 1, name: 'Segunda-feira', short: 'Seg' },
  { id: 2, name: 'Terça-feira', short: 'Ter' },
  { id: 3, name: 'Quarta-feira', short: 'Qua' },
  { id: 4, name: 'Quinta-feira', short: 'Qui' },
  { id: 5, name: 'Sexta-feira', short: 'Sex' },
  { id: 6, name: 'Sábado', short: 'Sáb' },
  { id: 0, name: 'Domingo', short: 'Dom' },
];

export const DailySpecials: React.FC<DailySpecialsProps> = ({ onOpenReservation }) => {
  const currentTodayDay = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState<number>(currentTodayDay);
  const [specials, setSpecials] = useState<DailySpecial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSpecials() {
      setLoading(true);
      const data = await getDailySpecials(selectedDay);
      setSpecials(data);
      setLoading(false);
    }
    loadSpecials();
  }, [selectedDay]);

  const categoryLabels: Record<string, { label: string; icon: string; color: string }> = {
    sopa: { label: 'Sopa do Dia', icon: '🥣', color: 'from-[#4a0e17]/60 to-black text-rose-300' },
    peixe: { label: 'Especialidade de Peixe', icon: '🐟', color: 'from-[#6b1422]/60 to-black text-rose-200' },
    carne: { label: 'Especialidade de Carne', icon: '🥩', color: 'from-[#800020]/60 to-black text-rose-300' },
    sobremesa: { label: 'Sobremesa da Casa', icon: '🍮', color: 'from-[#9c1834]/60 to-black text-rose-200' },
  };

  return (
    <section id="pratos-dia" className="py-24 bg-neutral-950 relative border-t border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Menu Semanal Selecionado</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-white mb-4">
            Pratos do Dia no <span className="bordeaux-gradient-text">Vieiras</span>
          </h2>

          <p className="text-neutral-300 text-base">
            Todos os dias preparamos menus frescos com os melhores ingredientes do mercado. 
            Consulte a nossa ementa e garanta a sua mesa.
          </p>
        </div>

        {/* DAY SELECTOR TABS */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {DAYS.map((day) => {
            const isToday = day.id === currentTodayDay;
            const isSelected = day.id === selectedDay;

            return (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`relative px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap flex flex-col items-center min-w-[105px] cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#800020] to-[#9c1834] text-white shadow-xl shadow-[#800020]/40 scale-105 border border-rose-500/40 z-10'
                    : 'bg-black/90 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {isToday && (
                  <span className={`px-2 py-0.5 text-[9px] font-black uppercase rounded-full mb-1 ${
                    isSelected ? 'bg-white text-[#800020]' : 'bg-[#800020] text-white border border-rose-500/40'
                  }`}>
                    HOJE
                  </span>
                )}
                <span>{day.short}</span>
                <span className="text-[11px] font-normal opacity-80">{day.name}</span>
              </button>
            );
          })}
        </div>

        {/* CURRENT DAY HIGHLIGHT TITLE */}
        <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-rose-500" />
            <h3 className="text-xl font-bold text-white font-serif-title">
              Ementa para {DAYS.find(d => d.id === selectedDay)?.name}
            </h3>
            {selectedDay === currentTodayDay && (
              <span className="px-2.5 py-1 rounded-md bg-[#800020] text-white text-xs font-bold border border-rose-500/40">
                Menu de Hoje
              </span>
            )}
          </div>

          <button
            onClick={() => onOpenReservation()}
            className="text-xs font-bold text-rose-400 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5" />
            Reservar para este dia
          </button>
        </div>

        {/* DISHES CARDS GRID */}
        {loading ? (
          <div className="text-center py-12 text-neutral-400">A carregar pratos do dia...</div>
        ) : specials.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-black border border-neutral-800">
            <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <p className="text-neutral-300 font-medium">A ementa para este dia está em atualização no backoffice.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specials.map((item) => {
              const meta = categoryLabels[item.category] || { label: item.category, icon: '🍴', color: 'from-neutral-900 to-black text-neutral-200' };

              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-black border border-neutral-800 hover:border-[#800020] transition-all hover:shadow-2xl hover:shadow-[#800020]/20 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* OPTIONAL IMAGE HEADER */}
                    {item.image_url ? (
                      <div className="h-44 w-full relative overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/90 border border-neutral-800 text-xs font-bold text-rose-300 backdrop-blur-md">
                          {meta.icon} {meta.label}
                        </span>
                      </div>
                    ) : (
                      <div className={`p-4 bg-gradient-to-b ${meta.color} border-b border-neutral-800/80 flex items-center justify-between`}>
                        <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-white">
                          <span>{meta.icon}</span>
                          <span>{meta.label}</span>
                        </span>
                      </div>
                    )}

                    <div className="p-5">
                      <h4 className="font-serif-title text-lg font-bold text-white mb-2 group-hover:text-rose-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-neutral-900 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase text-neutral-500 font-bold">Preço</span>
                      <span className="text-xl font-bold font-serif-title text-white">
                        {item.price.toFixed(2)} €
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenReservation()}
                      className="px-3.5 py-1.5 rounded-lg bg-[#800020] hover:bg-[#9c1834] text-white text-xs font-bold transition-all cursor-pointer border border-rose-500/30"
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
