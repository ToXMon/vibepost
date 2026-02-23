# VibePost

VibePost is an AI-native publishing platform tuned for hackathon demos and fast production hardening.

## Core stack

- **Frontend:** Next.js 16 + React 19 + Tailwind 4 + Framer Motion
- **Auth:** Wallet sign-in (SIWE)
- **Content persistence:** IPFS pinning (CID-backed)
- **App state:** Local JSON store (`.data/vibepost.json`) for rapid iteration
- **Payments:** Stripe (optional)
- **Deployment target:** Akash decentralized cloud (`akash-deploy.yml`)

## Why this architecture

- Replaces centralized OAuth auth flow with wallet-native identity
- Replaces centralized content persistence with IPFS-backed publishing
- Replaces centralized hosting default (Vercel) with Akash deployment path

## Project layout

- `webapp/` → main application
- `akash-deploy.yml` → Akash SDL deployment spec
- `deliverables/` → packaged submission artifacts

## Screenshots

### Homepage — Hero (updated decentralization messaging)
![VibePost Homepage Hero](https://github.com/user-attachments/assets/0d98a1dc-e289-4173-b020-56ff3f177fd3)

### Features & Pricing (updated decentralized feature set)
![Features and Pricing](https://github.com/user-attachments/assets/4bf1c069-b6d3-4104-8294-280ba6a8d3e4)

### Author Dashboard (`/author`, wallet-gated)
![Author Dashboard](https://github.com/user-attachments/assets/b4d87f2d-bd57-4a1e-bc29-2bbeb931d22f)

### Unsubscribed (`/unsubscribed`)
![Unsubscribed Page](https://github.com/user-attachments/assets/3927e770-7139-4c21-a8ce-b78e606e224f)

## Verify

```bash
cd webapp
npm run antfarm:verify
```

## Deploy

Use Akash Console or Akash CLI with `akash-deploy.yml`.
