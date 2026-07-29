import React, { useState } from 'react';
import { Calendar, Clock, Users, User, Phone, Mail, FileText, CheckCircle2, AlertTriangle, Sparkles, X } from 'lucide-react';
import { createReservation } from '../services/restaurantService';

interface ReservationFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialDate?: string;
}

const TIME_SLOTS_LUNCH = ['12:30', '13:00', '13:30', '14:00', '14:30'];
const TIME_SLOTS_DINNER = ['19:30', '20:00', '20:30', '21:00', '21:30', '22:00'];

export const ReservationForm: React.FC<ReservationFormProps> = ({ onClose, initialDate }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(initialDate || todayStr);
  const [timeSlot, setTimeSlot] = useState('13:00');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [successReservation, setSuccessReservation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date || !timeSlot) {
      setErrorMsg('Por favor preencha todos os campos obrigatórios (Nome, Telefone, Data e Horário).');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await createReservation({
        booking_date: date,
        time_slot: timeSlot,
        guests,
        client_name: name,
        client_phone: phone,
        client_email: email,
        notes: notes,
      });

      setSuccessReservation(res);
    } catch (err) {
      setErrorMsg('Ocorreu um erro ao submeter a reserva. Por favor tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSuccessReservation(null);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    if (onClose) onClose();
  };

  const content = (
    <div id="reservas" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* HEADER */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>Reserva de Mesa Online</span>
        </div>

        <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-white mb-3">
          Garanta a sua mesa no <span className="bordeaux-gradient-text">Vieiras</span>
        </h2>

        <p className="text-neutral-300 text-sm max-w-xl mx-auto">
          As reservas online estão sujeitas a <strong className="text-white">confirmação por parte da nossa equipa</strong>. 
          Receberá a confirmação rapidamente por telefone ou e-mail.
        </p>
      </div>

      {/* SUCCESS CONFIRMATION MODAL / NOTICE */}
      {successReservation ? (
        <div className="p-8 rounded-3xl bg-neutral-900 border border-[#800020] shadow-2xl text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#800020]/30 text-white border border-rose-500/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="font-serif-title text-2xl font-bold text-white">
            Pedido de Reserva Registado com Sucesso!
          </h3>

          <div className="p-4 rounded-xl bg-black border border-neutral-800 text-left space-y-2 text-sm max-w-md mx-auto">
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Estado:</span>
              <span className="font-bold text-white uppercase tracking-wider text-xs px-2 py-0.5 rounded bg-[#800020]">
                Pendente de Confirmação
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Cliente:</span>
              <span className="font-medium text-white">{successReservation.client_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Data & Hora:</span>
              <span className="font-bold text-rose-300">{successReservation.booking_date} às {successReservation.time_slot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Nº de Pessoas:</span>
              <span className="font-medium text-white">{successReservation.guests} Pessoas</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Contacto:</span>
              <span className="font-medium text-white">{successReservation.client_phone}</span>
            </div>
          </div>

          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            A equipa do restaurante <strong>Vieiras</strong> irá rever a disponibilidade do timeslot escolhido e entrará em contacto muito brevemente.
          </p>

          <button
            onClick={resetForm}
            className="px-6 py-3 rounded-xl bg-[#800020] text-white font-bold hover:bg-[#9c1834] transition-all cursor-pointer shadow-lg border border-rose-500/40"
          >
            Efectuar Nova Reserva
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-xl shadow-2xl space-y-6">
          
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: DATE & GUESTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-rose-500" />
                <span>Data da Reserva *</span>
              </label>
              <input
                type="date"
                min={todayStr}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-[#800020] text-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-500" />
                <span>Número de Pessoas *</span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-[#800020] text-sm font-medium"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Pessoa' : 'Pessoas'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* STEP 2: TIMESLOTS */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-500" />
              <span>Horário Disponível (Timeslot) *</span>
            </label>

            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">Almoço</span>
                <div className="flex flex-wrap gap-2">
                  {TIME_SLOTS_LUNCH.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        timeSlot === slot
                          ? 'bg-[#800020] text-white shadow-md shadow-[#800020]/40 scale-105 border border-rose-500/40'
                          : 'bg-black border border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">Jantar</span>
                <div className="flex flex-wrap gap-2">
                  {TIME_SLOTS_DINNER.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        timeSlot === slot
                          ? 'bg-[#800020] text-white shadow-md shadow-[#800020]/40 scale-105 border border-rose-500/40'
                          : 'bg-black border border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: CONTACT INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-rose-500" />
                <span>Nome Completo *</span>
              </label>
              <input
                type="text"
                placeholder="Ex: João Vieira"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-[#800020] text-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-500" />
                <span>Telefone / Telemóvel *</span>
              </label>
              <input
                type="tel"
                placeholder="Ex: 912 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-[#800020] text-sm font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-neutral-400" />
              <span>Endereço de E-mail (Opcional)</span>
            </label>
            <input
              type="email"
              placeholder="seu.email@exemplo.pt"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-[#800020] text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-neutral-400" />
              <span>Observações / Pedidos Especiais</span>
            </label>
            <textarea
              rows={2}
              placeholder="Ex: Cadeira de bebé, alergias alimentares, mesa preferida..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-[#800020] text-sm font-medium"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#800020] via-[#9c1834] to-[#b81d3e] text-white font-extrabold hover:from-[#9c1834] hover:to-[#d42c50] shadow-2xl shadow-[#800020]/40 transition-all cursor-pointer flex items-center justify-center gap-2 text-base border border-rose-500/40"
          >
            {submitting ? (
              <span>A registar pedido de reserva...</span>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Confirmar Pedido de Reserva ({date} às {timeSlot})</span>
              </>
            )}
          </button>
        </form>
      )}

    </div>
  );

  if (onClose) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <div className="relative w-full max-w-3xl my-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-900 z-10"
          >
            <X className="w-6 h-6" />
          </button>
          {content}
        </div>
      </div>
    );
  }

  return content;
};
