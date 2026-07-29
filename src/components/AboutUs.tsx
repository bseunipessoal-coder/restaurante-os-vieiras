import React from 'react';
import { Award, HeartHandshake, UtensilsCrossed, Sparkles } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      {/* Subtle bordeaux glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#800020]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* IMAGE GRID */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-[#800020]/50 shadow-2xl">
              <img
                src="/hero.png"
                alt="Ambiente do Restaurante Os Vieiras"
                className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/90 border border-neutral-800 backdrop-blur-md">
                <p className="text-sm font-medium text-neutral-200 italic">
                  "Na mesa do restaurante Os Vieiras, cada refeição é servida como uma celebração em família."
                </p>
                <span className="block text-xs font-bold text-rose-400 mt-2 uppercase tracking-wider">
                  — Família Vieira • Loures
                </span>
              </div>
            </div>

            {/* FLOATING BADGE */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[#800020] to-[#b81d3e] text-white shadow-2xl font-bold border border-rose-500/40 z-20">
              <Sparkles className="w-8 h-8 text-white" />
              <div>
                <span className="block text-xs uppercase tracking-wider text-white font-black">Qualidade Garantida</span>
                <span className="text-sm font-extrabold">Receitas Tradicionais</span>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>A Nossa História</span>
            </div>

            <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Quem Somos: A Paixão dos <span className="bordeaux-gradient-text">"Vieiras"</span> pela Boa Mesa
            </h2>

            <p className="text-neutral-300 text-base leading-relaxed">
              O restaurante <strong className="text-rose-400">"Os Vieiras"</strong> nasceu da dedicação de uma família com raízes profundas na cozinha tradicional portuguesa. Localizados no coração de <strong className="text-white">Loures</strong>, trazemos para a mesa os pratos mais emblemáticos da nossa gastronomia.
            </p>

            <p className="text-neutral-400 text-sm leading-relaxed">
              Desde o fiel Bacalhau assado no forno sob crosta de broa crocante, até às feijoadas de marisco richíssimas e bochechas estofadas lentamente, prezamos o tempo correto de confeção e os ingredientes mais frescos comprados aos produtores locais.
            </p>

            {/* HIGHLIGHT FEATURES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                <HeartHandshake className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-sm">Atendimento Acolhedor</h4>
                  <p className="text-xs text-neutral-400">Sentir-se-á sempre em casa na nossa sala de refeições.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                <Award className="w-6 h-6 text-rose-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-sm">Pratos do Dia Variados</h4>
                  <p className="text-xs text-neutral-400">Uma ementa semanal nova e fresca de Segunda a Domingo.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
