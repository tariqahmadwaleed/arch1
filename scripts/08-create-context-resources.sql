-- Create historical_eras table
CREATE TABLE IF NOT EXISTS historical_eras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  region TEXT,
  key_characteristics TEXT,
  notable_buildings TEXT[] DEFAULT '{}',
  image_url TEXT,
  saves_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create ideologies table
CREATE TABLE IF NOT EXISTS ideologies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  key_principles TEXT,
  notable_architects TEXT[] DEFAULT '{}',
  time_period TEXT,
  image_url TEXT,
  saves_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create architects table
CREATE TABLE IF NOT EXISTS architects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  birth_year INTEGER,
  death_year INTEGER,
  nationality TEXT,
  biography TEXT NOT NULL,
  notable_works TEXT[] DEFAULT '{}',
  awards TEXT[] DEFAULT '{}',
  style TEXT,
  image_url TEXT,
  saves_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create architectural_styles table
CREATE TABLE IF NOT EXISTS architectural_styles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  period TEXT,
  region TEXT,
  description TEXT NOT NULL,
  key_features TEXT,
  materials TEXT[] DEFAULT '{}',
  notable_examples TEXT[] DEFAULT '{}',
  image_url TEXT,
  saves_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create plants table (trees, plants, vegetation)
CREATE TABLE IF NOT EXISTS plants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  scientific_name TEXT,
  type TEXT NOT NULL CHECK (type IN ('tree', 'plant', 'shrub', 'grass')),
  native_region TEXT,
  climate_zone TEXT,
  water_requirements TEXT,
  sunlight_requirements TEXT,
  soil_type TEXT[] DEFAULT '{}',
  height_range TEXT,
  growth_rate TEXT,
  maintenance_level TEXT,
  uses TEXT[] DEFAULT '{}',
  characteristics TEXT,
  image_url TEXT,
  saves_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create soil_types table
CREATE TABLE IF NOT EXISTS soil_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  composition TEXT NOT NULL,
  texture TEXT,
  ph_level TEXT,
  drainage TEXT,
  fertility TEXT,
  suitable_plants TEXT[] DEFAULT '{}',
  characteristics TEXT,
  uses TEXT[] DEFAULT '{}',
  image_url TEXT,
  saves_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create structural_systems table
CREATE TABLE IF NOT EXISTS structural_systems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  materials TEXT[] DEFAULT '{}',
  advantages TEXT,
  disadvantages TEXT,
  typical_applications TEXT[] DEFAULT '{}',
  span_range TEXT,
  load_capacity TEXT,
  seismic_performance TEXT,
  cost_range TEXT,
  construction_complexity TEXT,
  image_url TEXT,
  diagram_url TEXT,
  saves_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_historical_eras_period ON historical_eras(period);
CREATE INDEX IF NOT EXISTS idx_ideologies_name ON ideologies(name);
CREATE INDEX IF NOT EXISTS idx_architects_name ON architects(name);
CREATE INDEX IF NOT EXISTS idx_architectural_styles_period ON architectural_styles(period);
CREATE INDEX IF NOT EXISTS idx_plants_type ON plants(type);
CREATE INDEX IF NOT EXISTS idx_plants_climate ON plants(climate_zone);
CREATE INDEX IF NOT EXISTS idx_soil_types_name ON soil_types(name);
CREATE INDEX IF NOT EXISTS idx_structural_systems_category ON structural_systems(category);

-- Enable RLS
ALTER TABLE historical_eras ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE architects ENABLE ROW LEVEL SECURITY;
ALTER TABLE architectural_styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE soil_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE structural_systems ENABLE ROW LEVEL SECURITY;

-- RLS Policies (all viewable by everyone)
CREATE POLICY "Historical eras are viewable by everyone"
  ON historical_eras FOR SELECT USING (true);

CREATE POLICY "Ideologies are viewable by everyone"
  ON ideologies FOR SELECT USING (true);

CREATE POLICY "Architects are viewable by everyone"
  ON architects FOR SELECT USING (true);

CREATE POLICY "Architectural styles are viewable by everyone"
  ON architectural_styles FOR SELECT USING (true);

CREATE POLICY "Plants are viewable by everyone"
  ON plants FOR SELECT USING (true);

CREATE POLICY "Soil types are viewable by everyone"
  ON soil_types FOR SELECT USING (true);

CREATE POLICY "Structural systems are viewable by everyone"
  ON structural_systems FOR SELECT USING (true);
