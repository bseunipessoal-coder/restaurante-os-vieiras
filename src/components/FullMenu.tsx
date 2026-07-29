import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface MenuItem {
  title: string;
  desc: string;
  price: string;
  category: 'entradas' | 'peixe' | 'carne' | 'sobremesas' | 'vinhos';
  highlight?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  // Entradas
  { category: 'entradas', title: 'Pão de Alho & Azeitonas Temperadas da Casa', desc: 'Pão saloio grelhado com alho, azeite extra virgem e azeitonas da região.', price: '3.50 €' },
  { category: 'entradas', title: 'Amêijoas à Bulhão Pato', desc: 'Amêijoas frescas salteadas em azeite, alho, vinho branco e coentros.', price: '13.50 €', highlight: true },
  { category: 'entradas', title: 'Tábua de Queijos e Chouriço Assado em Bagaço', desc: 'Queijo de ovelha curado, chouriço de carne na brasa e tostinhas.', price: '11.00 €' },
  { category: 'entradas', title: 'Pica-Pau de Novilho com Pickles', desc: 'Cubos de novilho tenro salteados em molho de mostarda e alho com broa.', price: '12.00 €' },

  // Peixe
  { category: 'peixe', title: 'Bacalhau à Zé do Pipo', desc: 'Posta de bacalhau sob cama de refogado de cebola, coberta de maionese caseira gratinada e puré de batata.', price: '15.00 €' },
  { category: 'peixe', title: 'Robalo Fresco da Nossa Costa na Grelha', desc: 'Servido com batata cozida e legumes ao vapor regados a azeite virgem.', price: '16.50 €' },
  { category: 'peixe', title: 'Choco Frito à Moda de Setúbal', desc: 'Tiras de choco tenro em polme estaladiço com batata frita e molho tártaro.', price: '13.80 €', highlight: true },

  // Carne
  { category: 'carne', title: 'Bochechas de Porco Preto com Puré de Batata Doce', desc: 'Cozinhadas lentamente em lume brando durante 6 horas.', price: '14.50 €', highlight: true },
  { category: 'carne', title: 'Bife à "Os Vieiras"', desc: 'Lombo de novilho grelhado com molho artesanal de natas, alho e presunto serrano, servido com batata frita caseira.', price: '17.00 €' },
  { category: 'carne', title: 'Secretos de Porco Ibérico na Brasa', desc: 'Com flor de sal, arroz de feijão preto e salada verde fresca.', price: '14.00 €' },

  // Sobremesas
  { category: 'sobremesas', title: 'Doce da Casa "Os Vieiras"', desc: 'Camadas de creme aveludado, bolacha e raspa de chocolate negro.', price: '4.00 €', highlight: true },
  { category: 'sobremesas', title: 'Toucinho do Céu Tradicional', desc: 'Doce tradicional feito com gemas de ovo e amêndoa fatiada.', price: '4.50 €' },
  { category: 'sobremesas', title: 'Fruta da Época Selecionada', desc: 'Melão de Santa Bárbara, Ananás dos Açores ou Laranja doce.', price: '3.00 €' },

  // Vinhos
  { category: 'vinhos', title: 'Vinho da Casa "Os Vieiras" (Branco / Tinto)', desc: 'Produzido na região demarcada de Lisboa / Loures, aromático e estruturado (Garrafa 75cl).', price: '9.50 €', highlight: true },
  { category: 'vinhos', title: 'Quinta das Carvalhas Tinto (Douro)', desc: 'Notas de frutos vermelhos e madeira elegante.', price: '18.00 €' },
  { category: 'vinhos', title: 'Verde Quinta da Aveleda', desc: 'Fresco, frutado e ligeiramente efervescente.', price: '12.00 €' },
];

export const FullMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'entradas' | 'peixe' | 'carne' | 'sobremesas' | 'vinhos'>('peixe');

  const categories = [
    { id: 'entradas', name: 'Entradas & Petiscos' },
    { id: 'peixe', name: 'Pratos de Peixe' },
    { id: 'carne', name: 'Pratos de Carne' },
    { id: 'sobremesas', name: 'Sobremesas Conventuais' },
    { id: 'vinhos', name: 'Carta de Vinhos' },
  ];

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Utensils className="w-3.5 h-3.5" />
            <span>Gastronomia Portuguesa</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-white mb-4">
            A Nossa <span className="bordeaux-gradient-text">Carta de Especialidades</span>
          </h2>

          <p className="text-neutral-300 text-base">
            Além dos nossos Pratos do Dia, dispomos de uma seleção permanente de entradas, 
            pratos principais e vinhos para todos os gostos.
          </p>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#800020] text-white shadow-xl shadow-[#800020]/40 border border-rose-500/40'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* MENU LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl bg-neutral-950 border ${
                item.highlight ? 'border-[#800020] bg-gradient-to-r from-[#800020]/10 to-black' : 'border-neutral-800'
              } flex flex-col justify-between hover:border-rose-500/40 transition-all`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="font-serif-title text-lg font-bold text-white flex items-center gap-2">
                    <span>{item.title}</span>
                    {item.highlight && (
                      <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded bg-[#800020] text-white border border-rose-500/40">
                        Especialidade
                      </span>
                    )}
                  </h4>
                  <span className="font-serif-title font-bold text-rose-300 text-lg whitespace-nowrap">
                    {item.price}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
