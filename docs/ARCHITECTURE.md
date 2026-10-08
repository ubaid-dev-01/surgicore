# Architecture — SurgiCore

## Intent

SurgiCore Pro is a surgical ops product surface: public marketing (services, doctors, booking) plus an authenticated staff dashboard covering analytics, inventory, billing, and audit log views.

## System shape

Vite SPA with public marketing routes and `/dashboard` operational modules. Designed for Vercel static/SPA hosting.

## Stack decisions

- React
- Vite
- TypeScript
- TanStack Query
- Tailwind + shadcn/ui
- GSAP

## Boundaries

- Secrets stay in environment variables / secret managers — never in git.
- Client bundles only receive public configuration (`NEXT_PUBLIC_*` / `VITE_*`).
- Tenant or role checks belong in middleware / server layers, not UI-only gates.
- Heavy or long-running work should not run inside short-lived serverless handlers unless designed for it.

## Quality bar

- Prefer typed contracts at API and domain boundaries.
- Ship a vertical slice (auth → persisted outcome) before a broad feature surface.
- Document trade-offs in PRs when changing data models or auth.

