# ArchNet Jordan

A comprehensive platform for architecture professionals in Jordan, featuring projects, portfolios, competitions, jobs, books, research, tools, courses, and community interactions.

## Features

- **Projects & Portfolios**: Showcase architectural work with rich media galleries
- **Competitions & Jobs**: Browse and apply to architecture competitions and job opportunities
- **Books & Research**: Access architectural literature and research papers
- **Tools & Courses**: Educational resources and professional development
- **Community**: Posts, comments, messaging, and social interactions
- **Context Resources**: Historical eras, architectural styles, natural environment, structural systems

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage, Realtime)
- **State Management**: Zustand, SWR
- **UI Components**: Radix UI, shadcn/ui
- **Testing**: Jest, React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-org/archnet-jordan.git
cd archnet-jordan
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit \`.env.local\` with your Supabase credentials.

### Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Run the migration scripts in order:
\`\`\`bash
# In Supabase SQL Editor, run each script in /scripts/ folder in order:
# 01-create-users-and-profiles.sql
# 02-create-projects-system.sql
# ... (continue with all scripts)
\`\`\`

3. Set up Storage buckets in Supabase Dashboard:
   - \`avatars\` (public)
   - \`projects\` (public)
   - \`documents\` (private)
   - \`thumbnails\` (public)

### Development

Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

Run tests:
\`\`\`bash
npm test
\`\`\`

Run tests in CI mode:
\`\`\`bash
npm run test:ci
\`\`\`

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables from \`.env.example\`
4. Deploy

### Supabase Configuration

1. Ensure all migration scripts are run
2. Configure RLS policies (included in migration scripts)
3. Set up Storage buckets and policies
4. Enable Realtime for required tables

## Project Structure

\`\`\`
archnet-jordan/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── competitions/      # Competitions pages
│   ├── context/           # Context resources
│   ├── news/              # News pages
│   ├── profile/           # User profiles
│   └── ...
├── components/            # React components
│   ├── ui/               # UI primitives
│   └── ...
├── lib/                   # Utilities and actions
│   ├── actions/          # Server actions
│   ├── supabase/         # Supabase clients
│   └── ...
├── scripts/               # Database migration scripts
└── public/               # Static assets
\`\`\`

## Environment Variables

See \`.env.example\` for required environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.
