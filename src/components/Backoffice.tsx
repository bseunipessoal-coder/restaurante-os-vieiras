import React, { useState, useEffect } from 'react';
import { ShieldAlert, Calendar, Utensils, CheckCircle2, XCircle, Trash2, Edit3, Plus, Database, Lock, Search, RefreshCw, X } from 'lucide-react';
import type { DailySpecial, Reservation, ReservationStatus } from '../types';
import { getAllDailySpecialsAdmin, getReservations, saveDailySpecial, deleteDailySpecial, updateReservationStatus } from '../services/restaurantService';
import { isSupabaseConfigured } from '../lib/supabase';

interface BackofficeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Backoffice: React.FC<BackofficeProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'reservas' | 'pratos' | 'supabase'>('reservas');
  
  // Reservations state
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservationFilter, setReservationFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Daily specials state
  const [specials, setSpecials] = useState<DailySpecial[]>([]);
  const [selectedDayAdmin, setSelectedDayAdmin] = useState<number>(new Date().getDay());
  const [editingSpecial, setEditingSpecial] = useState<Partial<DailySpecial> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    const [resData, specData] = await Promise.all([
      getReservations(),
      getAllDailySpecialsAdmin()
    ]);
    setReservations(resData);
    setSpecials(specData);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '1234' || pinInput.trim().length >= 4) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleStatusChange = async (id: string, newStatus: ReservationStatus) => {
    await updateReservationStatus(id, newStatus);
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const handleSaveSpecial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSpecial?.title || !editingSpecial?.category) return;

    await saveDailySpecial({
      id: editingSpecial.id,
      day_of_week: editingSpecial.day_of_week ?? selectedDayAdmin,
      category: editingSpecial.category as any,
      title: editingSpecial.title,
      description: editingSpecial.description || '',
      price: Number(editingSpecial.price) || 0,
      image_url: editingSpecial.image_url || '',
      is_active: editingSpecial.is_active ?? true
    });

    setIsModalOpen(false);
    setEditingSpecial(null);
    loadData();
  };

  const handleDeleteSpecial = async (id: string) => {
    if (confirm('Tem a certeza que deseja eliminar este prato do dia?')) {
      await deleteDailySpecial(id);
      loadData();
    }
  };

  const daysOfWeek = [
    { id: 1, name: 'Segunda' },
    { id: 2, name: 'Terça' },
    { id: 3, name: 'Quarta' },
    { id: 4, name: 'Quinta' },
    { id: 5, name: 'Sexta' },
    { id: 6, name: 'Sábado' },
    { id: 0, name: 'Domingo' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-neutral-900 border border-[#800020]/50 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* TOP BAR */}
        <div className="p-5 bg-black border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#800020] border border-rose-500/40 text-white">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-title text-xl font-bold text-white">
                Backoffice de Gestão • Vieiras
              </h3>
              <p className="text-xs text-neutral-400">Painel Administrativo para Reservas e Pratos do Dia</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* LOGIN SCREEN */}
        {!isAuthenticated ? (
          <div className="p-12 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#800020]/20 border border-rose-500/40 text-white flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-bold text-white font-serif-title">Acesso Restrito</h4>
            <p className="text-xs text-neutral-400">
              Insira o PIN de administração para aceder à gestão do restaurante. <br />
              <span className="text-rose-300 font-mono font-bold">(PIN por omissão: 1234)</span>
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Insira o PIN (ex: 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center tracking-widest text-xl px-4 py-3 rounded-xl bg-black border border-neutral-800 text-white focus:border-[#800020] focus:outline-none"
                autoFocus
              />

              {pinError && (
                <p className="text-xs text-red-400 font-bold">PIN incorreto. Tente 1234.</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#800020] hover:bg-[#9c1834] text-white font-bold transition-all cursor-pointer shadow-lg border border-rose-500/40"
              >
                Entrar no Backoffice
              </button>
            </form>
          </div>
        ) : (
          <div>
            
            {/* SUPABASE STATUS BANNER */}
            <div className={`p-4 border-b text-xs flex flex-wrap items-center justify-between gap-3 ${
              isSupabaseConfigured
                ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                : 'bg-[#4a0e17]/50 border-rose-900/60 text-rose-200'
            }`}>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 flex-shrink-0" />
                <span className="font-bold">
                  {isSupabaseConfigured
                    ? ' Base de Dados Supabase Ligada em Tempo Real'
                    : ' Modo Demonstrativo Local (A aguardar credenciais Supabase no .env)'}
                </span>
              </div>

              <button
                onClick={() => setActiveTab('supabase')}
                className="underline hover:text-white font-bold cursor-pointer"
              >
                {isSupabaseConfigured ? 'Ver Configuração' : 'Como Ligar ao Supabase?'}
              </button>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex items-center gap-2 p-4 bg-black border-b border-neutral-800 overflow-x-auto">
              <button
                onClick={() => setActiveTab('reservas')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'reservas'
                    ? 'bg-[#800020] text-white shadow-lg border border-rose-500/40'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Gestão de Reservas</span>
                {reservations.filter(r => r.status === 'pending').length > 0 && (
                  <span className="px-2 py-0.5 text-[10px] bg-red-600 text-white rounded-full font-black animate-pulse">
                    {reservations.filter(r => r.status === 'pending').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('pratos')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'pratos'
                    ? 'bg-[#800020] text-white shadow-lg border border-rose-500/40'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>Pratos do Dia (Semanal)</span>
              </button>

              <button
                onClick={() => setActiveTab('supabase')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'supabase'
                    ? 'bg-[#800020] text-white shadow-lg border border-rose-500/40'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Base de Dados Supabase</span>
              </button>

              <button
                onClick={loadData}
                className="ml-auto p-2.5 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white cursor-pointer"
                title="Atualizar Dados"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* TAB CONTENT: RESERVATIONS */}
            {activeTab === 'reservas' && (
              <div className="p-6 space-y-6">
                
                {/* SEARCH & FILTERS */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Pesquisar por cliente..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-black border border-neutral-800 text-xs text-white focus:border-[#800020] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                    {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setReservationFilter(filter)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize cursor-pointer ${
                          reservationFilter === filter
                            ? 'bg-[#800020] text-white'
                            : 'bg-black text-neutral-400 border border-neutral-800'
                        }`}
                      >
                        {filter === 'all' ? 'Todas' : filter === 'pending' ? 'Pendentes' : filter === 'confirmed' ? 'Confirmadas' : 'Canceladas'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* RESERVATIONS TABLE / CARDS */}
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {reservations
                    .filter(r => reservationFilter === 'all' || r.status === reservationFilter)
                    .filter(r => !searchQuery || r.client_name.toLowerCase().includes(searchQuery.toLowerCase()) || r.client_phone.includes(searchQuery))
                    .map((res) => (
                      <div
                        key={res.id}
                        className="p-5 rounded-2xl bg-black border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-rose-500/40 transition-all"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-white text-base font-serif-title">{res.client_name}</h4>
                            <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase rounded-full border ${
                              res.status === 'pending'
                                ? 'bg-[#800020]/40 text-rose-300 border-rose-500/40 animate-pulse'
                                : res.status === 'confirmed'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : 'bg-red-950/60 text-red-400 border-red-800/60'
                            }`}>
                              {res.status === 'pending' ? 'Pendente de Confirmação' : res.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pt-1">
                            <span className="font-bold text-rose-300">📅 {res.booking_date} às {res.time_slot}</span>
                            <span>👥 {res.guests} Pessoas</span>
                            <span>📞 {res.client_phone}</span>
                            {res.client_email && <span>✉️ {res.client_email}</span>}
                          </div>

                          {res.notes && (
                            <p className="text-xs text-neutral-300 italic bg-neutral-900 p-2.5 rounded-lg border border-neutral-800 mt-2">
                              Obs: "{res.notes}"
                            </p>
                          )}
                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-900">
                          {res.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(res.id, 'confirmed')}
                                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-md"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Confirmar
                              </button>
                              <button
                                onClick={() => handleStatusChange(res.id, 'cancelled')}
                                className="px-3.5 py-1.5 rounded-lg bg-red-950 text-red-400 hover:bg-red-900 hover:text-white border border-red-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                Rejeitar
                              </button>
                            </>
                          )}

                          {res.status === 'confirmed' && (
                            <button
                              onClick={() => handleStatusChange(res.id, 'cancelled')}
                              className="px-3.5 py-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-red-400 text-xs font-semibold cursor-pointer"
                            >
                              Cancelar Reserva
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>

              </div>
            )}

            {/* TAB CONTENT: DAILY SPECIALS */}
            {activeTab === 'pratos' && (
              <div className="p-6 space-y-6">
                
                {/* DAY SELECTION */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2 overflow-x-auto">
                    {daysOfWeek.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDayAdmin(d.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                          selectedDayAdmin === d.id
                            ? 'bg-[#800020] text-white border border-rose-500/40'
                            : 'bg-black text-neutral-400 border border-neutral-800'
                        }`}
                      >
                        {d.name}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setEditingSpecial({ day_of_week: selectedDayAdmin, category: 'peixe', price: 14.00, is_active: true });
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#800020] hover:bg-[#9c1834] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md border border-rose-500/40"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar Prato
                  </button>
                </div>

                {/* SPECIALS LIST FOR SELECTED DAY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specials
                    .filter(s => s.day_of_week === selectedDayAdmin)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-black border border-neutral-800 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#800020] px-2 py-0.5 rounded border border-rose-500/30">
                            {item.category}
                          </span>
                          <h5 className="font-bold text-white text-sm font-serif-title">{item.title}</h5>
                          <p className="text-xs text-neutral-400 leading-relaxed">{item.description}</p>
                          <span className="text-sm font-bold text-white block pt-1">{item.price.toFixed(2)} €</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingSpecial(item);
                              setIsModalOpen(true);
                            }}
                            className="p-2 rounded-lg bg-neutral-900 text-neutral-300 hover:text-white"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSpecial(item.id)}
                            className="p-2 rounded-lg bg-neutral-900 text-neutral-300 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

              </div>
            )}

            {/* TAB CONTENT: SUPABASE HELP & CONFIG */}
            {activeTab === 'supabase' && (
              <div className="p-6 space-y-6 max-w-4xl mx-auto">
                <div className="p-6 rounded-2xl bg-black border border-neutral-800 space-y-4">
                  <h4 className="font-serif-title text-xl font-bold text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-rose-500" />
                    <span>Como Ligar este Website à sua Base de Dados Supabase</span>
                  </h4>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Este projeto foi desenvolvido com arquitetura híbrida. Quando criar o seu projeto no <strong className="text-rose-400">Supabase</strong>:
                  </p>

                  <ol className="list-decimal list-inside text-xs text-neutral-300 space-y-2 font-mono bg-neutral-900 p-4 rounded-xl border border-neutral-800">
                    <li>Aceda ao seu Dashboard no Supabase e abra o <strong>SQL Editor</strong>.</li>
                    <li>Execute o script completo contido no ficheiro <code className="text-rose-300 font-bold">supabase_schema.sql</code> (incluído na raiz do projeto).</li>
                    <li>Crie um ficheiro <code className="text-rose-300 font-bold">.env</code> na raiz do projeto com o seguinte conteúdo:</li>
                  </ol>

                  <pre className="p-4 rounded-xl bg-neutral-950 text-rose-300 font-mono text-xs overflow-x-auto border border-neutral-800">
{`VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-publica`}
                  </pre>

                  <p className="text-xs text-neutral-400">
                    Assim que as variáveis forem inseridas, o website passará automaticamente a ler e escrever reservas e pratos do dia no Supabase em tempo real!
                  </p>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* MODAL EDIT/ADD DAILY SPECIAL */}
      {isModalOpen && editingSpecial && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleSaveSpecial} className="w-full max-w-lg p-6 rounded-2xl bg-neutral-900 border border-[#800020] space-y-4 shadow-2xl">
            <h4 className="font-serif-title text-xl font-bold text-white">
              {editingSpecial.id ? 'Editar Prato do Dia' : 'Adicionar Prato do Dia'}
            </h4>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Dia da Semana</label>
              <select
                value={editingSpecial.day_of_week}
                onChange={(e) => setEditingSpecial({ ...editingSpecial, day_of_week: Number(e.target.value) })}
                className="w-full p-2.5 rounded-lg bg-black border border-neutral-800 text-xs text-white"
              >
                {daysOfWeek.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Categoria</label>
              <select
                value={editingSpecial.category}
                onChange={(e) => setEditingSpecial({ ...editingSpecial, category: e.target.value as any })}
                className="w-full p-2.5 rounded-lg bg-black border border-neutral-800 text-xs text-white"
              >
                <option value="sopa">Sopa</option>
                <option value="peixe">Peixe</option>
                <option value="carne">Carne</option>
                <option value="sobremesa">Sobremesa</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Nome do Prato</label>
              <input
                type="text"
                value={editingSpecial.title || ''}
                onChange={(e) => setEditingSpecial({ ...editingSpecial, title: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-black border border-neutral-800 text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Descrição</label>
              <textarea
                rows={2}
                value={editingSpecial.description || ''}
                onChange={(e) => setEditingSpecial({ ...editingSpecial, description: e.target.value })}
                className="w-full p-2.5 rounded-lg bg-black border border-neutral-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Preço (€)</label>
              <input
                type="number"
                step="0.10"
                value={editingSpecial.price || 0}
                onChange={(e) => setEditingSpecial({ ...editingSpecial, price: Number(e.target.value) })}
                className="w-full p-2.5 rounded-lg bg-black border border-neutral-800 text-xs text-white"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-black text-neutral-400 text-xs font-bold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#800020] text-white text-xs font-bold border border-rose-500/40"
              >
                Guardar Prato
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
