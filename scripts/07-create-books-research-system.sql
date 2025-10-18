-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  publisher TEXT,
  isbn TEXT,
  publication_year INTEGER,
  category TEXT NOT NULL,
  language TEXT DEFAULT 'English',
  pages INTEGER,
  description TEXT,
  cover_image_url TEXT,
  pdf_url TEXT,
  preview_url TEXT,
  tags TEXT[] DEFAULT '{}',
  likes_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  downloads_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  rating NUMERIC(3,2) DEFAULT 0,
  ratings_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create research table
CREATE TABLE IF NOT EXISTS research (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  abstract TEXT NOT NULL,
  authors TEXT[] NOT NULL,
  institution TEXT,
  publication_date DATE,
  category TEXT NOT NULL,
  research_type TEXT CHECK (research_type IN ('thesis', 'dissertation', 'paper', 'journal', 'conference')),
  keywords TEXT[] DEFAULT '{}',
  pdf_url TEXT,
  doi TEXT,
  citation_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  downloads_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create book_ratings table
CREATE TABLE IF NOT EXISTS book_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(book_id, user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category);
CREATE INDEX IF NOT EXISTS idx_books_author ON books(author);
CREATE INDEX IF NOT EXISTS idx_books_year ON books(publication_year);
CREATE INDEX IF NOT EXISTS idx_research_category ON research(category);
CREATE INDEX IF NOT EXISTS idx_research_type ON research(research_type);
CREATE INDEX IF NOT EXISTS idx_research_user ON research(user_id);
CREATE INDEX IF NOT EXISTS idx_book_ratings_book ON book_ratings(book_id);
CREATE INDEX IF NOT EXISTS idx_book_ratings_user ON book_ratings(user_id);

-- Enable RLS
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE research ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_ratings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for books
CREATE POLICY "Books are viewable by everyone"
  ON books FOR SELECT
  USING (true);

-- RLS Policies for research
CREATE POLICY "Research is viewable by everyone"
  ON research FOR SELECT
  USING (true);

CREATE POLICY "Users can submit research"
  ON research FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own research"
  ON research FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for book ratings
CREATE POLICY "Ratings are viewable by everyone"
  ON book_ratings FOR SELECT
  USING (true);

CREATE POLICY "Users can rate books"
  ON book_ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ratings"
  ON book_ratings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own ratings"
  ON book_ratings FOR DELETE
  USING (auth.uid() = user_id);
