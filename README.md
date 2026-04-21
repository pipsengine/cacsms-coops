# CACSMS Coops

Enterprise-structured Next.js application for cooperative society operations, including membership, treasury, loans, governance, notices, onboarding, and portal workflows.

## Stack

- Next.js 15
- React 19
- TypeScript
- Prisma with PostgreSQL
- Firebase and Firebase Admin

## Local Development

Prerequisites:

- Node.js 20+
- npm
- PostgreSQL database for Prisma-backed flows

1. Install dependencies:
   `npm install`
2. Create `.env.local` from `.env.example` and populate the required environment variables.
3. Generate the Prisma client:
   `npx prisma generate`
4. Start the development server:
   `npm run dev`

## Quality Checks

- Lint: `npm run lint`
- Production build: `npm run build`

## GitHub Setup

The local repository is configured to use:

- Remote: `https://github.com/pipsengine/cacsms-coops.git`
- Default branch: `main`

If the GitHub repository does not exist yet, create it first, then push with either GitHub Desktop, a browser-based sign-in flow, or a personal access token. GitHub no longer supports account-password authentication for git push.
