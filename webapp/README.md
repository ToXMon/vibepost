# VibePost Webapp

VibePost is a Next.js app for AI-native publishing with decentralized primitives:

- Wallet auth via SIWE (no OAuth dependency)
- IPFS content pinning for published posts
- Akash-ready container deployment
- Motion-polished landing UI for hackathon demos

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Verify (antfarm)

```bash
npm run antfarm:verify
```

## Environment

Create `.env.local`:

```env
AUTH_SECRET="replace-me"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
PINATA_JWT=""
RESEND_API_KEY=""
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

## Decentralized deployment (Akash)

From repo root, use `akash-deploy.yml` as the SDL entrypoint and deploy with Akash Console/CLI.

## Notes

- Local metadata state currently persists in `.data/vibepost.json`
- Published post content is pinned to IPFS and linked by CID
