import React, { useState, useEffect } from 'react';
import { Images, Eye, X, Layers } from 'lucide-react';
import type { GalleryAlbum, GalleryPhoto } from '../types';
import { getGalleryAlbums, getGalleryPhotos } from '../services/restaurantService';

export const Gallery: React.FC = () => {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [albumData, photoData] = await Promise.all([
        getGalleryAlbums(),
        getGalleryPhotos()
      ]);
      setAlbums(albumData);
      setPhotos(photoData);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredPhotos = selectedAlbumId
    ? photos.filter(p => p.album_id === selectedAlbumId)
    : photos;

  return (
    <section id="galeria" className="py-24 bg-neutral-950 relative border-t border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Images className="w-3.5 h-3.5" />
            <span>Memórias & Ambiente</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-white mb-4">
            Galeria de Fotos <span className="bordeaux-gradient-text">Os Vieiras</span>
          </h2>

          <p className="text-neutral-300 text-base">
            Explore a nossa casa, os pratos confecionados com paixão e os momentos que marcam a nossa história em Loures.
          </p>
        </div>

        {/* ALBUM FILTER TABS */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-12">
          <button
            onClick={() => setSelectedAlbumId(null)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              selectedAlbumId === null
                ? 'bg-[#800020] text-white shadow-xl shadow-[#800020]/40 border border-rose-500/40'
                : 'bg-black border border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Todos os Álbuns ({photos.length})</span>
          </button>

          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => setSelectedAlbumId(album.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedAlbumId === album.id
                  ? 'bg-[#800020] text-white shadow-xl shadow-[#800020]/40 border border-rose-500/40'
                  : 'bg-black border border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {album.title}
            </button>
          ))}
        </div>

        {/* PHOTOS GRID */}
        {loading ? (
          <div className="text-center py-12 text-neutral-400">A carregar galeria de fotos...</div>
        ) : filteredPhotos.length === 0 ? (
          <div className="text-center py-12 text-neutral-400">Nenhuma fotografia encontrada para este álbum.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setLightboxPhoto(photo)}
                className="group relative h-64 rounded-2xl overflow-hidden border border-neutral-800 bg-black cursor-pointer shadow-lg hover:border-rose-500/50 transition-all"
              >
                <img
                  src={photo.photo_url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 text-rose-300 text-xs font-bold mb-1">
                    <Eye className="w-4 h-4" />
                    <span>Ver em Alta Resolução</span>
                  </div>
                  <p className="text-sm font-medium text-white line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxPhoto(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full text-center space-y-4">
            <img
              src={lightboxPhoto.photo_url}
              alt={lightboxPhoto.caption}
              className="max-h-[75vh] w-auto mx-auto rounded-2xl border border-rose-500/40 shadow-2xl object-contain"
            />
            <p className="text-white font-medium text-base font-serif-title">
              {lightboxPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
