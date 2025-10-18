-- Create competitions table
CREATE TABLE IF NOT EXISTS competitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  organizer TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  prize_amount NUMERIC,
  prize_currency TEXT DEFAULT 'USD',
  eligibility TEXT,
  requirements TEXT,
  submission_format TEXT,
  image_url TEXT,
  website_url TEXT,
  registration_deadline TIMESTAMPTZ,
  submission_deadline TIMESTAMPTZ NOT NULL,
  announcement_date TIMESTAMPTZ,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'past')),
  winner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  winner_project_id UUID,
  tags TEXT[] DEFAULT '{}',
  saves_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create competition_applications table
CREATE TABLE IF NOT EXISTS competition_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'under_review', 'accepted', 'rejected', 'winner')),
  submission_files TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(competition_id, user_id)
);

-- Create competition_reminders table
CREATE TABLE IF NOT EXISTS competition_reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reminder_date TIMESTAMPTZ NOT NULL,
  is_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(competition_id, user_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_competitions_status ON competitions(status);
CREATE INDEX IF NOT EXISTS idx_competitions_deadline ON competitions(submission_deadline);
CREATE INDEX IF NOT EXISTS idx_competitions_category ON competitions(category);
CREATE INDEX IF NOT EXISTS idx_competition_applications_competition ON competition_applications(competition_id);
CREATE INDEX IF NOT EXISTS idx_competition_applications_user ON competition_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_competition_reminders_user ON competition_reminders(user_id);

-- Enable RLS
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_reminders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for competitions
CREATE POLICY "Competitions are viewable by everyone"
  ON competitions FOR SELECT
  USING (true);

-- RLS Policies for applications
CREATE POLICY "Users can view own applications"
  ON competition_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create applications"
  ON competition_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON competition_applications FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for reminders
CREATE POLICY "Users can view own reminders"
  ON competition_reminders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can set reminders"
  ON competition_reminders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reminders"
  ON competition_reminders FOR DELETE
  USING (auth.uid() = user_id);
