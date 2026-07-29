import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { DailySpecial, GalleryAlbum, GalleryPhoto, Reservation, ReservationStatus, RestaurantInfo } from '../types';
import { INITIAL_ALBUMS, INITIAL_DAILY_SPECIALS, INITIAL_PHOTOS, INITIAL_RESERVATIONS, INITIAL_RESTAURANT_INFO } from './mockData';

// Keys for LocalStorage fallback
const STORAGE_KEYS = {
  DAILY_SPECIALS: 'os_vieiras_daily_specials',
  RESERVATIONS: 'os_vieiras_reservations',
  ALBUMS: 'os_vieiras_albums',
  PHOTOS: 'os_vieiras_photos',
  INFO: 'os_vieiras_info',
};

// LocalStorage helpers
function getStoredData<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function setStoredData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

// ----------------------------------------------------
// RESTAURANT INFO
// ----------------------------------------------------
export async function getRestaurantInfo(): Promise<RestaurantInfo> {
  return INITIAL_RESTAURANT_INFO;
}

// ----------------------------------------------------
// DAILY SPECIALS
// ----------------------------------------------------
export async function getDailySpecials(dayOfWeek?: number): Promise<DailySpecial[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('daily_specials').select('*').eq('is_active', true);
      if (dayOfWeek !== undefined) {
        query = query.eq('day_of_week', dayOfWeek);
      }
      const { data, error } = await query;
      if (!error && data) return data as DailySpecial[];
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local storage', err);
    }
  }

  const allSpecials = getStoredData<DailySpecial[]>(STORAGE_KEYS.DAILY_SPECIALS, INITIAL_DAILY_SPECIALS);
  if (dayOfWeek !== undefined) {
    return allSpecials.filter(item => item.day_of_week === dayOfWeek && item.is_active);
  }
  return allSpecials;
}

export async function getAllDailySpecialsAdmin(): Promise<DailySpecial[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('daily_specials').select('*').order('day_of_week', { ascending: true });
      if (!error && data) return data as DailySpecial[];
    } catch (err) {
      console.warn('Supabase fetch failed, using local storage', err);
    }
  }
  return getStoredData<DailySpecial[]>(STORAGE_KEYS.DAILY_SPECIALS, INITIAL_DAILY_SPECIALS);
}

export async function saveDailySpecial(special: Omit<DailySpecial, 'id'> & { id?: string }): Promise<DailySpecial> {
  if (isSupabaseConfigured && supabase) {
    try {
      if (special.id) {
        const { data, error } = await supabase.from('daily_specials').update(special).eq('id', special.id).select().single();
        if (!error && data) return data as DailySpecial;
      } else {
        const { data, error } = await supabase.from('daily_specials').insert(special).select().single();
        if (!error && data) return data as DailySpecial;
      }
    } catch (err) {
      console.warn('Supabase save failed, saving locally', err);
    }
  }

  const specials = getStoredData<DailySpecial[]>(STORAGE_KEYS.DAILY_SPECIALS, INITIAL_DAILY_SPECIALS);
  let updatedItem: DailySpecial;

  if (special.id) {
    updatedItem = special as DailySpecial;
    const index = specials.findIndex(s => s.id === special.id);
    if (index !== -1) specials[index] = updatedItem;
    else specials.push(updatedItem);
  } else {
    updatedItem = {
      ...special,
      id: 'ds-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6)
    };
    specials.push(updatedItem);
  }

  setStoredData(STORAGE_KEYS.DAILY_SPECIALS, specials);
  return updatedItem;
}

export async function deleteDailySpecial(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('daily_specials').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete failed', err);
    }
  }

  const specials = getStoredData<DailySpecial[]>(STORAGE_KEYS.DAILY_SPECIALS, INITIAL_DAILY_SPECIALS);
  const filtered = specials.filter(s => s.id !== id);
  setStoredData(STORAGE_KEYS.DAILY_SPECIALS, filtered);
  return true;
}

// ----------------------------------------------------
// RESERVATIONS
// ----------------------------------------------------
export async function createReservation(reservation: Omit<Reservation, 'id' | 'created_at' | 'status'>): Promise<Reservation> {
  const newReservation: Reservation = {
    ...reservation,
    id: 'res-' + Date.now(),
    status: 'pending',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .insert({
          booking_date: reservation.booking_date,
          time_slot: reservation.time_slot,
          guests: reservation.guests,
          client_name: reservation.client_name,
          client_phone: reservation.client_phone,
          client_email: reservation.client_email,
          notes: reservation.notes,
          status: 'pending'
        })
        .select()
        .single();

      if (!error && data) return data as Reservation;
    } catch (err) {
      console.warn('Supabase reservation insert failed, saving to local storage', err);
    }
  }

  const currentReservations = getStoredData<Reservation[]>(STORAGE_KEYS.RESERVATIONS, INITIAL_RESERVATIONS);
  currentReservations.unshift(newReservation);
  setStoredData(STORAGE_KEYS.RESERVATIONS, currentReservations);
  return newReservation;
}

export async function getReservations(): Promise<Reservation[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('booking_date', { ascending: true })
        .order('time_slot', { ascending: true });

      if (!error && data) return data as Reservation[];
    } catch (err) {
      console.warn('Supabase fetch reservations failed, using local storage', err);
    }
  }

  return getStoredData<Reservation[]>(STORAGE_KEYS.RESERVATIONS, INITIAL_RESERVATIONS);
}

export async function updateReservationStatus(id: string, status: ReservationStatus): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('reservations').update({ status }).eq('id', id);
    } catch (err) {
      console.warn('Supabase update status failed', err);
    }
  }

  const reservations = getStoredData<Reservation[]>(STORAGE_KEYS.RESERVATIONS, INITIAL_RESERVATIONS);
  const target = reservations.find(r => r.id === id);
  if (target) {
    target.status = status;
    setStoredData(STORAGE_KEYS.RESERVATIONS, reservations);
  }
  return true;
}

// ----------------------------------------------------
// GALLERY (ALBUMS & PHOTOS)
// ----------------------------------------------------
export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('gallery_albums').select('*');
      if (!error && data && data.length > 0) return data as GalleryAlbum[];
    } catch (err) {
      console.warn('Supabase albums fetch failed', err);
    }
  }
  return getStoredData<GalleryAlbum[]>(STORAGE_KEYS.ALBUMS, INITIAL_ALBUMS);
}

export async function getGalleryPhotos(albumId?: string): Promise<GalleryPhoto[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('gallery_photos').select('*');
      if (albumId) query = query.eq('album_id', albumId);
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data as GalleryPhoto[];
    } catch (err) {
      console.warn('Supabase photos fetch failed', err);
    }
  }

  const allPhotos = getStoredData<GalleryPhoto[]>(STORAGE_KEYS.PHOTOS, INITIAL_PHOTOS);
  if (albumId) {
    return allPhotos.filter(p => p.album_id === albumId);
  }
  return allPhotos;
}

export async function addGalleryPhoto(albumId: string, photoUrl: string, caption: string): Promise<GalleryPhoto> {
  const photoData = {
    id: 'ph-' + Date.now(),
    album_id: albumId,
    photo_url: photoUrl,
    caption
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('gallery_photos').insert({
        album_id: albumId,
        photo_url: photoUrl,
        caption
      }).select().single();
      if (!error && data) return data as GalleryPhoto;
    } catch (err) {
      console.warn('Supabase photo insert failed', err);
    }
  }

  const photos = getStoredData<GalleryPhoto[]>(STORAGE_KEYS.PHOTOS, INITIAL_PHOTOS);
  photos.push(photoData);
  setStoredData(STORAGE_KEYS.PHOTOS, photos);
  return photoData;
}
