# Fintex Admin Dashboard

Administrative panel for the Fintex platform — manage clients, content, finance, and dashboard access.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React

## Project Structure

```
fintex-dashboard/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── dashboard/            # Dashboard routes
│   │   │   ├── clients/          # Clients management
│   │   │   ├── content/          # Content management
│   │   │   ├── finance/          # Finance & revenue
│   │   │   ├── help/             # Help & support
│   │   │   ├── manage-users/     # Dashboard access (Settings)
│   │   │   └── settings/         # User settings
│   │   ├── login/                # Login page
│   │   ├── globals.css           # Global styles & theme
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Root (redirects to login)
│   ├── components/
│   │   ├── charts/               # Chart components
│   │   ├── forms/                # Form components
│   │   └── layout/               # Layout components
│   ├── contexts/                 # React contexts (Theme)
│   └── lib/                      # Utilities & animations
├── public/                       # Static assets
└── ...
```

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
