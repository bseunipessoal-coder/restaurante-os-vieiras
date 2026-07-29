import React, { useState, useEffect } from 'react';
import { Calendar, Menu as MenuIcon, X, ShieldAlert, UtensilsCrossed } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Quem Somos', href: '#about' },
    { name: 'Pratos do Dia', href: '#pratos-dia', badge: 'Hoje' },
    { name: 'A Nossa Carta', href: '#menu' },
    { name: 'Reservas', href: '#reservas' },
    { name: 'Galeria', href: '#galeria' },
    { name: 'Onde Estamos', href: '#contactos' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-[#800020]/40 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black via-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full border-2 border-amber-500/60 p-1 flex items-center justify-center bg-black group-hover:border-amber-400 transition-all shadow-lg shadow-amber-500/10">
              <img
                src="/logo.png"
                alt="Os Vieiras Logo"
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <UtensilsCrossed className="w-5 h-5 text-amber-400 absolute" style={{ display: 'none' }} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-title text-2xl font-extrabold text-white tracking-wide group-hover:text-rose-300 transition-colors">
                Os Vieiras
              </span>
              <span className="text-[10px] uppercase tracking-widest text-rose-300 font-bold">
                Restaurante • Loures
              </span>
            </div>
          </a>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-neutral-200 hover:text-white transition-colors relative flex items-center gap-1.5 py-1"
              >
                {link.name}
                {link.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-black bg-[#800020] text-white border border-rose-500/40 rounded-full animate-pulse">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* CTA BUTTONS */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenReservation}
              className="px-5 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-r from-[#800020] to-[#b81d3e] text-white hover:from-[#9c1834] hover:to-[#d42c50] transition-all shadow-lg shadow-[#800020]/40 flex items-center gap-2 cursor-pointer border border-rose-500/30"
            >
              <Calendar className="w-4 h-4 text-white" />
              Reservar Mesa
            </button>

            <button
              onClick={onOpenAdmin}
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#800020] transition-all cursor-pointer relative"
              title="Aceder ao Backoffice de Gestão"
            >
              <ShieldAlert className="w-4 h-4" />
              <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500' : 'bg-rose-600 animate-ping'}`} />
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenReservation}
              className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#800020] text-white hover:bg-[#9c1834] flex items-center gap-1 border border-rose-500/40"
            >
              <Calendar className="w-3.5 h-3.5" />
              Reservar
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-200 hover:text-white focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-[#800020]/40 backdrop-blur-2xl px-4 pt-3 pb-6 mt-3 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-white hover:text-rose-300 py-2 border-b border-neutral-900"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full text-center py-3 px-4 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm font-bold flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              Backoffice de Gestão
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
