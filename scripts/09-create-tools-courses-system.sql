-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  instructor TEXT NOT NULL,
  institution TEXT,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  language TEXT DEFAULT 'English',
  duration TEXT,
  price NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  format TEXT CHECK (format IN ('online', 'in-person', 'hybrid')),
  start_date DATE,
  end_date DATE,
  enrollment_url TEXT,
  syllabus_url TEXT,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  saves_count INTEGER DEFAULT 0,
  enrollments_count INTEGER DEFAULT 0,
  rating NUMERIC(3,2) DEFAULT 0,
  ratings_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create course_enrollments table
CREATE TABLE IF NOT EXISTS course_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'ongoing' CHECK (status IN ('ongoing', 'completed', 'dropped')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(course_id, user_id)
);

-- Create course_reminders table
CREATE TABLE IF NOT EXISTS course_reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reminder_date TIMESTAMPTZ NOT NULL,
  is_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, user_id)
);

-- Create software_tools table
CREATE TABLE IF NOT EXISTS software_tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  developer TEXT,
  platform TEXT[] DEFAULT '{}',
  pricing_model TEXT CHECK (pricing_model IN ('free', 'paid', 'freemium', 'subscription')),
  price NUMERIC,
  features TEXT[] DEFAULT '{}',
  use_cases TEXT[] DEFAULT '{}',
  website_url TEXT,
  download_url TEXT,
  image_url TEXT,
  rating NUMERIC(3,2) DEFAULT 0,
  ratings_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  downloads_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_courses_start_date ON courses(start_date);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_user ON course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_course ON course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_course_reminders_user ON course_reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_software_tools_category ON software_tools(category);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE software_tools ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses
CREATE POLICY "Courses are viewable by everyone"
  ON courses FOR SELECT USING (true);

-- RLS Policies for enrollments
CREATE POLICY "Users can view own enrollments"
  ON course_enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in courses"
  ON course_enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments"
  ON course_enrollments FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for course reminders
CREATE POLICY "Users can view own course reminders"
  ON course_reminders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can set course reminders"
  ON course_reminders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own course reminders"
  ON course_reminders FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for software tools
CREATE POLICY "Software tools are viewable by everyone"
  ON software_tools FOR SELECT USING (true);
