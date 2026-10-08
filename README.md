<div align="center">

# SurgiCore

**Surgical operations platform — marketing + staff dashboard**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)

[Repository](https://github.com/ubaid-dev-01/surgicore) · [Author](https://github.com/ubaid-dev-01) · [Portfolio](https://ubaid-dev-01.vercel.app)

</div>

---

## Overview

SurgiCore Pro is a surgical ops product surface: public marketing (services, doctors, booking) plus an authenticated staff dashboard covering analytics, inventory, billing, and audit log views.

## Features

- Marketing site (services, doctors, blog, booking)
- Staff login gate
- Analytics and audit log
- Inventory and billing dashboards
- Responsive clinical UI system

## Architecture

Vite SPA with public marketing routes and `/dashboard` operational modules. Designed for Vercel static/SPA hosting.

## Tech stack

- React
- Vite
- TypeScript
- TanStack Query
- Tailwind + shadcn/ui
- GSAP

## Project structure

```text
SurgiCore/
├── src/pages/dashboard/
├── src/layouts/ components/
└── docs/
```

## Getting started

```bash
npm install
npm run dev
```

## Environment

UI demo can run without secrets. Wire auth/API keys when connecting a live backend.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` / `build` / `test` | Vite lifecycle |

## Documentation

| Doc | Purpose |
| --- | --- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System shape, data flow, boundaries |
| [docs/SETUP.md](docs/SETUP.md) | Local install, env, runbook |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | Branching, commits, PR checklist |


## Author

**M Ubaid Javaid** — Software Engineer (MERN / Next.js)

- GitHub: [https://github.com/ubaid-dev-01](https://github.com/ubaid-dev-01)
- Portfolio: [https://ubaid-dev-01.vercel.app](https://ubaid-dev-01.vercel.app)
- Email: mubaidjavaid97@gmail.com

## License

Source is published for portfolio and engineering review. Client product ownership is not implied unless stated in a case study.

