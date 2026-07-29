-- ==========================================================
-- SCRIPT SQL SUPABASE - RESTAURANTE "OS VIEIRAS" (LOURES)
-- Copie e cole este script no SQL Editor do seu Dashboard Supabase
-- ==========================================================

-- 1. Tabela de Pratos do Dia (Segunda a Domingo: 0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
CREATE TABLE IF NOT EXISTS daily_specials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  category VARCHAR(50) NOT NULL, -- 'sopa', 'peixe', 'carne', 'sobremesa'
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabela de Reservas
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_date DATE NOT NULL,
  time_slot VARCHAR(20) NOT NULL, -- ex: '12:30', '13:00', '20:00'
  guests INT NOT NULL CHECK (guests > 0),
  client_name VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50) NOT NULL,
  client_email VARCHAR(255),
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabela de Álbuns de Fotos
CREATE TABLE IF NOT EXISTS gallery_albums (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cover_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabela de Fotos da Galeria
CREATE TABLE IF NOT EXISTS gallery_photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id UUID REFERENCES gallery_albums(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  caption VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS (Row Level Security) com acesso de leitura pública e escrita para todos (ou autenticado)
ALTER TABLE daily_specials ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público para leitura
CREATE POLICY "Permitir leitura pública de Pratos do Dia" ON daily_specials FOR SELECT USING (true);
CREATE POLICY "Permitir inserção e atualização de Pratos do Dia" ON daily_specials FOR ALL USING (true);

CREATE POLICY "Permitir criação de reservas por clientes" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura e gestão de reservas" ON reservations FOR ALL USING (true);

CREATE POLICY "Permitir leitura de álbuns" ON gallery_albums FOR SELECT USING (true);
CREATE POLICY "Permitir leitura de fotos" ON gallery_photos FOR SELECT USING (true);
CREATE POLICY "Permitir gestão da galeria" ON gallery_albums FOR ALL USING (true);
CREATE POLICY "Permitir gestão de fotos" ON gallery_photos FOR ALL USING (true);

-- SEED DE DADOS INICIAIS (PRATOS DO DIA PARA "OS VIEIRAS")
INSERT INTO daily_specials (day_of_week, category, title, description, price, image_url) VALUES
(1, 'peixe', 'Bacalhau com Broa à Vieira', 'Posta de bacalhau cozida no forno sob crosta de broa de milho, alho, azeite virim e batatas a murro.', 14.50, '/bacalhau.png'),
(1, 'carne', 'Bochechas de Porco Preto', 'Estofadas lentamente em vinho tinto de Loures com puré de batata doce e grelos salteados.', 13.90, ''),
(2, 'peixe', 'Arroz de Tamboril com Coentros', 'Arroz malandrinho de tamboril suculento, camarão fresco e coentros da horta.', 15.50, ''),
(2, 'carne', 'Cozido à Portuguesa da Casa', 'Seleção tradicional de carnes de porco, enchidos regionais, couve e legumes cozidos no ponto.', 14.00, ''),
(3, 'peixe', 'Polpo à Lagareiro', 'Polvo assado no forno com alho abundante, azeite transmontano e batatinhas assadas.', 16.50, ''),
(3, 'carne', 'Vitela Assada no Forno de Lenha', 'Com batata assada aromática e esparregado de espinafres.', 13.50, ''),
(4, 'peixe', 'Feijoada de Marisco', 'Feijão branco aveludado com gambas, lulas e amêijoas frescas.', 14.90, ''),
(4, 'carne', 'Coelho à Caçadora', 'Estofado com carvalhas, aromáticas e batata frita aos cubos.', 12.50, ''),
(5, 'peixe', 'Cataplana de Peixe e Marisco', 'Aroma inconfundível de peixe do dia, pimentos e ervas aromáticas.', 17.00, ''),
(5, 'carne', 'Picanha Grelhada na Brasa', 'Acompanhada de feijão preto, arroz biológico, farofa e banana frita.', 14.50, ''),
(6, 'peixe', 'Arroz de Marisco Especial "Os Vieiras"', 'Riquíssimo em lagosta, sapateira, camarão e coentros frescos.', 18.50, ''),
(6, 'carne', 'Cabrito Assado com Batatas', 'Cabrito tenro assado com alecrim, vinho branco e batatinhas louras.', 17.50, ''),
(0, 'peixe', 'Caldeirada à Moda de Loures', 'Variedade de peixes da nossa costa estofados com tomate, pimentos e batata fatiada.', 15.00, ''),
(0, 'carne', 'Nacos de Novilho na Pedra', 'Para finalizar na mesa ao seu gosto, servido com molhos da casa e batata frita rústica.', 16.90, '');
