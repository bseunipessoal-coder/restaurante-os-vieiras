import type { DailySpecial, GalleryAlbum, GalleryPhoto, Reservation, RestaurantInfo } from '../types';

export const INITIAL_RESTAURANT_INFO: RestaurantInfo = {
  name: 'Vieiras',
  tagline: 'Gastronomia Tradicional Portuguesa & Sabores de Família',
  address: 'Rua Principal de Loures, Nº 45',
  city: 'Loures',
  postal_code: '2670-401',
  phone: '+351 219 830 123',
  whatsapp: '+351 912 345 678',
  email: 'reservas@osvieiras.pt',
  google_maps_url: 'https://maps.google.com/?q=Loures+Portugal',
  waze_url: 'https://waze.com/ul?q=Loures&navigate=yes',
  opening_hours: {
    weekdays: 'Almoço: 12:00 - 15:30 | Jantar: 19:30 - 22:30',
    weekends: 'Almoço: 12:00 - 16:00 | Jantar: 19:30 - 23:00',
    closed: 'Encerrado à Segunda-feira à noite'
  }
};

export const INITIAL_DAILY_SPECIALS: DailySpecial[] = [
  // Segunda-feira (1)
  {
    id: 'ds-1-1',
    day_of_week: 1,
    category: 'sopa',
    title: 'Creme de Legumes com Croutons de Alho',
    description: 'Sopa aveludada de legumes frescos da horta com azeite de oliva e croutons dourados.',
    price: 3.50,
    is_active: true
  },
  {
    id: 'ds-1-2',
    day_of_week: 1,
    category: 'peixe',
    title: 'Bacalhau com Broa à Vieira',
    description: 'Posta nobre de bacalhau cozida no forno sob crosta crocante de broa de milho, alho, azeite virgem e batatas a murro.',
    price: 14.50,
    image_url: '/bacalhau.png',
    is_active: true
  },
  {
    id: 'ds-1-3',
    day_of_week: 1,
    category: 'carne',
    title: 'Bochechas de Porco Preto Estofadas',
    description: 'Estofadas lentamente em vinho tinto de Loures com puré de batata doce e grelos salteados.',
    price: 13.90,
    is_active: true
  },
  {
    id: 'ds-1-4',
    day_of_week: 1,
    category: 'sobremesa',
    title: 'Leite Creme Queimado da Avó',
    description: 'Receita tradicional da família Vieira aromatizada com pau de canela e casca de limão.',
    price: 4.20,
    is_active: true
  },

  // Terça-feira (2)
  {
    id: 'ds-2-1',
    day_of_week: 2,
    category: 'sopa',
    title: 'Caldo Verde Tradicional',
    description: 'Com chouriço regional assado e fio de azeite extra virgem.',
    price: 3.80,
    is_active: true
  },
  {
    id: 'ds-2-2',
    day_of_week: 2,
    category: 'peixe',
    title: 'Arroz de Tamboril com Coentros',
    description: 'Arroz malandrinho de tamboril suculento, camarão fresco e coentros aromáticos da horta.',
    price: 15.50,
    is_active: true
  },
  {
    id: 'ds-2-3',
    day_of_week: 2,
    category: 'carne',
    title: 'Cozido à Portuguesa da Casa',
    description: 'Seleção tradicional de carnes de porco, chouriço de carne, morcela, couve portuguesa e enchidos.',
    price: 14.00,
    is_active: true
  },
  {
    id: 'ds-2-4',
    day_of_week: 2,
    category: 'sobremesa',
    title: 'Mousse de Chocolate Caseira com Raspa de Laranja',
    description: 'Chocolate rico 70% cacau feito no dia.',
    price: 4.00,
    is_active: true
  },

  // Quarta-feira (3)
  {
    id: 'ds-3-1',
    day_of_week: 3,
    category: 'sopa',
    title: 'Sopa de Peixe à Moda da Costa',
    description: 'Rica em pedaços de peixe fresco e coentros picados.',
    price: 4.50,
    is_active: true
  },
  {
    id: 'ds-3-2',
    day_of_week: 3,
    category: 'peixe',
    title: 'Polvo à Lagareiro',
    description: 'Tentáculos de polvo assados com alho abundante, azeite transmontano e batatinhas a murro.',
    price: 16.50,
    is_active: true
  },
  {
    id: 'ds-3-3',
    day_of_week: 3,
    category: 'carne',
    title: 'Vitela Assada no Forno de Lenha',
    description: 'Acompanhada de batata assada lourinha e esparregado de espinafres frescos.',
    price: 13.50,
    is_active: true
  },
  {
    id: 'ds-3-4',
    day_of_week: 3,
    category: 'sobremesa',
    title: 'Sericaia com Ameixa d’Elvas',
    description: 'Típica sobremesa alentejana polvilhada com canela.',
    price: 4.50,
    is_active: true
  },

  // Quinta-feira (4)
  {
    id: 'ds-4-1',
    day_of_week: 4,
    category: 'sopa',
    title: 'Sopa de Pedra de Almeirim',
    description: 'Com feijão encarnado, carnes variadas e enchidos saborosos.',
    price: 4.00,
    is_active: true
  },
  {
    id: 'ds-4-2',
    day_of_week: 4,
    category: 'peixe',
    title: 'Feijoada de Marisco',
    description: 'Feijão branco aveludado com gambas, lulas e amêijoas frescas.',
    price: 14.90,
    is_active: true
  },
  {
    id: 'ds-4-3',
    day_of_week: 4,
    category: 'carne',
    title: 'Coelho à Caçadora',
    description: 'Estofado aromático com batatas assadas aos cubos e molho de vinho reduzido.',
    price: 12.50,
    is_active: true
  },
  {
    id: 'ds-4-4',
    day_of_week: 4,
    category: 'sobremesa',
    title: 'Pudim Abade de Priscos',
    description: 'Pudim rico de gemas e toucinho com calda de caramelo.',
    price: 4.80,
    is_active: true
  },

  // Sexta-feira (5)
  {
    id: 'ds-5-1',
    day_of_week: 5,
    category: 'sopa',
    title: 'Sopa à Lavrador com Feijão e Massa',
    description: 'Conforto caseiro numa tigela fumegante.',
    price: 3.50,
    is_active: true
  },
  {
    id: 'ds-5-2',
    day_of_week: 5,
    category: 'peixe',
    title: 'Cataplana de Peixe e Marisco',
    description: 'Peixe do dia, pimentos doces, tomate e marisco cozinhados na tradicional cataplana de cobre.',
    price: 17.00,
    is_active: true
  },
  {
    id: 'ds-5-3',
    day_of_week: 5,
    category: 'carne',
    title: 'Picanha Grelhada na Brasa',
    description: 'Acompanhada de feijão preto temperado, arroz branco, farofa estaladiça e banana frita.',
    price: 14.50,
    is_active: true
  },
  {
    id: 'ds-5-4',
    day_of_week: 5,
    category: 'sobremesa',
    title: 'Tarte de Amêndoa Conventual',
    description: 'Crocante de amêndoa dourada no forno.',
    price: 4.20,
    is_active: true
  },

  // Sábado (6)
  {
    id: 'ds-6-1',
    day_of_week: 6,
    category: 'sopa',
    title: 'Canja de Galinha do Campo com Moinhos',
    description: 'Confecionada com galinha caipira e hortelã fresca.',
    price: 3.80,
    is_active: true
  },
  {
    id: 'ds-6-2',
    day_of_week: 6,
    category: 'peixe',
    title: 'Arroz de Marisco Especial "Vieiras"',
    description: 'Servido em tacho de barro, rico em sapateira, lagosta, camarão e coentros.',
    price: 18.50,
    is_active: true
  },
  {
    id: 'ds-6-3',
    day_of_week: 6,
    category: 'carne',
    title: 'Cabrito Assado com Batatinhas',
    description: 'Cabrito tenro de leite assado lentamente com alecrim, alho e vinho branco.',
    price: 17.50,
    is_active: true
  },
  {
    id: 'ds-6-4',
    day_of_week: 6,
    category: 'sobremesa',
    title: 'Bolo da Casa de Bolacha e Doce de Leite',
    description: 'Textura suave e cremosa com topping de amêndoa fatiada.',
    price: 4.00,
    is_active: true
  },

  // Domingo (0)
  {
    id: 'ds-0-1',
    day_of_week: 0,
    category: 'sopa',
    title: 'Velouté de Marisco com Coentros',
    description: 'Sopa rica e cremosíssima com essência de marisco fresco.',
    price: 4.50,
    is_active: true
  },
  {
    id: 'ds-0-2',
    day_of_week: 0,
    category: 'peixe',
    title: 'Caldeirada à Moda de Loures',
    description: 'Mistura selecionada de peixes da nossa costa, cebolada aromática e batata fatiada.',
    price: 15.00,
    is_active: true
  },
  {
    id: 'ds-0-3',
    day_of_week: 0,
    category: 'carne',
    title: 'Nacos de Novilho na Pedra',
    description: 'Carne de novilho maturada servida em pedra vulcânica quente com molhos artesanais.',
    price: 16.90,
    is_active: true
  },
  {
    id: 'ds-0-4',
    day_of_week: 0,
    category: 'sobremesa',
    title: 'Toucinho do Céu com Gelado de Baunilha',
    description: 'Doce tradicional português acompanhado por gelado cremoso.',
    price: 4.80,
    is_active: true
  }
];

export const INITIAL_ALBUMS: GalleryAlbum[] = [
  {
    id: 'album-1',
    title: 'A Nossa Casa & Ambiente',
    description: 'Conheça a nossa sala de refeições acolhedora e o ambiente familiar em Loures.',
    cover_url: '/hero.png'
  },
  {
    id: 'album-2',
    title: 'Especialidades & Pratos',
    description: 'Imagens dos nossos pratos de peixe fresco, carnes assadas e sobremesas conventuais.',
    cover_url: '/bacalhau.png'
  },
  {
    id: 'album-3',
    title: 'História & Família Vieira',
    description: 'Momentos especiais ao longo dos anos a servir quem nos visita.',
    cover_url: '/logo.png'
  }
];

export const INITIAL_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    album_id: 'album-1',
    photo_url: '/hero.png',
    caption: 'Sala principal acolhedora com luz quente e detalhes em madeira.'
  },
  {
    id: 'photo-2',
    album_id: 'album-2',
    photo_url: '/bacalhau.png',
    caption: 'Bacalhau com Broa preparado no forno tradicional.'
  },
  {
    id: 'photo-3',
    album_id: 'album-3',
    photo_url: '/logo.png',
    caption: 'O nosso logótipo símbolo da tradição da família Vieira.'
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-101',
    booking_date: '2026-07-30',
    time_slot: '13:00',
    guests: 4,
    client_name: 'António Silva',
    client_phone: '912 999 888',
    client_email: 'antonio.silva@gmail.com',
    notes: 'Mesa perto da janela se possível. Cadeira de bebé.',
    status: 'confirmed',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'res-102',
    booking_date: '2026-07-30',
    time_slot: '20:30',
    guests: 2,
    client_name: 'Maria João Fernandes',
    client_phone: '966 555 444',
    client_email: 'mj.fernandes@outlook.pt',
    notes: 'Aniversário de casamento.',
    status: 'pending',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'res-103',
    booking_date: '2026-07-31',
    time_slot: '13:30',
    guests: 6,
    client_name: 'Carlos Oliveira',
    client_phone: '933 111 222',
    notes: 'Almoço de empresas.',
    status: 'pending',
    created_at: new Date().toISOString()
  }
];
