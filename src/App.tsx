import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { DailySpecials } from './components/DailySpecials';
import { FullMenu } from './components/FullMenu';
import { ReservationForm } from './components/ReservationForm';
import { Gallery } from './components/Gallery';
import { LocationContact } from './components/LocationContact';
import { Backoffice } from './components/Backoffice';
import { Footer } from './components/Footer';
import { getRestaurantInfo } from './services/restaurantService';
import type { RestaurantInfo } from './types';
import { INITIAL_RESTAURANT_INFO } from './services/mockData';

export function App() {
  const [info, setInfo] = useState<RestaurantInfo>(INITIAL_RESTAURANT_INFO);
  const [isBackofficeOpen, setIsBackofficeOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  useEffect(() => {
    async function loadInfo() {
      const data = await getRestaurantInfo();
      setInfo(data);
    }
    loadInfo();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* NAVIGATION BAR */}
      <Navbar
        onOpenAdmin={() => setIsBackofficeOpen(true)}
        onOpenReservation={() => setIsReservationModalOpen(true)}
      />

      {/* MAIN WEBSITE CONTENT */}
      <main className="flex-grow">
        {/* HERO SECTION */}
        <Hero
          info={info}
          onOpenReservation={() => setIsReservationModalOpen(true)}
        />

        {/* QUEM SOMOS / ABOUT US */}
        <AboutUs />

        {/* PRATOS DO DIA (SEMANAL & HOJE) */}
        <DailySpecials
          onOpenReservation={() => setIsReservationModalOpen(true)}
        />

        {/* A NOSSA CARTA / FULL MENU */}
        <FullMenu />

        {/* FORMULÁRIO DE RESERVAS (INLINE SECTION) */}
        <section className="bg-slate-950 relative border-t border-b border-slate-900">
          <ReservationForm />
        </section>

        {/* GALERIA DE FOTOS COM ÁLBUNS */}
        <Gallery />

        {/* ONDE ESTAMOS & CONTACTOS (LOURES, GOOGLE MAPS, WAZE) */}
        <LocationContact info={info} />
      </main>

      {/* FOOTER */}
      <Footer
        info={info}
        onOpenAdmin={() => setIsBackofficeOpen(true)}
      />

      {/* RESERVATION MODAL OVERLAY */}
      {isReservationModalOpen && (
        <ReservationForm
          isOpen={true}
          onClose={() => setIsReservationModalOpen(false)}
        />
      )}

      {/* BACKOFFICE ADMIN MODAL OVERLAY */}
      <Backoffice
        isOpen={isBackofficeOpen}
        onClose={() => setIsBackofficeOpen(false)}
      />

    </div>
  );
}

export default App;
