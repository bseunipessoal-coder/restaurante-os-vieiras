export type CategoryType = 'sopa' | 'peixe' | 'carne' | 'sobremesa';

export interface DailySpecial {
  id: string;
  day_of_week: number; // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
  category: CategoryType;
  title: string;
  description: string;
  price: number;
  image_url?: string;
  is_active: boolean;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Reservation {
  id: string;
  booking_date: string; // YYYY-MM-DD
  time_slot: string; // HH:mm
  guests: number;
  client_name: string;
  client_phone: string;
  client_email?: string;
  notes?: string;
  status: ReservationStatus;
  created_at: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  description: string;
  cover_url: string;
}

export interface GalleryPhoto {
  id: string;
  album_id: string;
  photo_url: string;
  caption: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
  whatsapp: string;
  email: string;
  google_maps_url: string;
  waze_url: string;
  opening_hours: {
    weekdays: string;
    weekends: string;
    closed: string;
  };
}
