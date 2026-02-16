# Fintex Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)

A modern, full-featured admin dashboard for the Fintex platform. Manage clients, content, finance, and dashboard access with an intuitive interface.

**Live Demo:** [finetex-dashboard.vercel.app](https://finetex-dashboard.vercel.app)

---

## Features

| Module | Description |
|--------|-------------|
| **Dashboard Overview** | Stats, charts, quick navigation to key sections |
| **Clients** | Client management, search, filter by status, export to CSV |
| **Content** | Lesson management, topics, quizzes, practical examples |
| **Finance** | Revenue tracking, transaction history |
| **Manage Users** | Grant/revoke dashboard access, add users by email with credentials export |
| **Settings** | Profile, notifications, dark mode, change password |

### Additional Capabilities

- **Theme:** Light/dark mode with persistent preference
- **Responsive:** Mobile-first design with collapsible sidebar
- **Animations:** Smooth transitions via Framer Motion
- **Charts:** Revenue and user activity visualizations (Recharts)

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/shayan9689/Finetex-Dashboard.git
cd Finetex-Dashboard/fintex-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to the login page.

### Build for Production

```bash
npm run build
npm run start
```

---

## Project Structure

```
Finetex-Dashboard/
├── fintex-dashboard/           # Main application
│   ├── src/
│   │   ├── app/                # Next.js App Router
│   │   │   ├── dashboard/      # Dashboard routes
│   │   │   ├── login/          # Login page
│   │   │   └── ...
│   │   ├── components/         # React components
│   │   │   ├── charts/
│   │   │   ├── forms/
│   │   │   └── layout/
│   │   ├── contexts/
│   │   └── lib/
│   └── public/
└── README.md
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

---

## Deployment

Deploy to [Vercel](https://vercel.com) or any Node.js hosting platform. The project is configured for zero-config deployment on Vercel.

---

## License

Private — All rights reserved.

---

## Author

**Shayan**  
GitHub: [@shayan9689](https://github.com/shayan9689)
