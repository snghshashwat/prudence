# Prudence Advisory

Marketing website and client/admin dashboard for Prudence Advisory (family
office, NRI services, and SME accounting/CFO advisory). Built with Next.js
(App Router, TypeScript), Tailwind CSS, shadcn/ui, and Supabase (Postgres,
Auth, Row Level Security).

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- shadcn/ui (Radix primitives) for the dashboard component library
- Supabase: Postgres, Auth, and RLS for both data and access control
- `@supabase/ssr` for session handling across Server Components, Server
  Actions, and middleware

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in your Supabase project values
npm run dev
```

The marketing site works immediately at `/` with no Supabase connection
required. `/login`, `/signup`, `/dashboard`, and `/admin` need a Supabase
project (see below) to function.

### Supabase setup

1. Create a project at [supabase.com](https://supabase.com) (or run
   `supabase start` locally with the Supabase CLI).
2. Copy the project URL, anon key, and service role key into `.env.local`.
3. Run the migrations in `supabase/migrations/` in order (via the Supabase
   CLI: `supabase db push`, or by pasting each file into the SQL editor in
   order).
4. Run `supabase/seed.sql` to populate the service catalog (~42 individual
   services across NRI / Family Business / Accounting-CFO pillars, matching
   the brochure).
5. In **Authentication → Providers → Email**, turn off "Confirm email" 
   this build signs users in immediately after signup with no email
   confirmation flow.
6. Run `npm run seed:demo` to create a demo admin account and two demo
   customer accounts (one NRI persona, one family-business persona) with
   sample assigned services and updates, so the dashboards aren't empty on
   first login. Demo password: `PrudenceDemo123!`.

### Roles

- **Customer**, self-serve signup at `/signup`. Can only see their own
  profile, services, and updates (enforced by Postgres RLS, not just the UI).
- **Admin**, no self-serve signup. Provisioned via `scripts/seed-demo-users.ts`
  using the Supabase service-role key. Can manage all clients, assign/update
  services, and compose broadcast or client-specific updates.

## Dashboard pages

**Customer** (`/dashboard`): Overview · My Services · Updates · Profile ·
Settings · Support.
**Admin** (`/admin`): Overview · Clients (searchable, filterable) · Client
detail (assign services, edit status/notes) · Updates (compose broadcast or
targeted, delete) · Service Catalog (activate/deactivate) · Profile · Settings.

Settings covers appearance (light / dark / system), notification preferences
(persisted to `profiles`), account details, and password change.

## Security

**Demo mode is an auth bypass.** The one-click demo logins skip
authentication entirely. They are gated behind `NEXT_PUBLIC_ENABLE_DEMO`
and force-disabled whenever `NODE_ENV === "production"`, checked in three
places: the button (render), the server action (execution), and `proxy.ts`
(stale cookie). Never set that flag on a deployed environment.

Other measures in place:

- **RLS is the real access control**, not the UI. Customers can only select
  their own `profiles` / `client_services` rows and broadcast-or-own
  `updates`; only `is_admin()` can write. Layout role checks are convenience.
- UPDATE policies carry `WITH CHECK` as well as `USING` (migration `0008`),
  so a permitted row can't be rewritten into a state you couldn't select 
  e.g. re-pointing a `client_services` row at another client.
- `profiles.id` is immutable and `role` can't be self-escalated (triggers).
- `updates` have no UPDATE policy, sent announcements are immutable.
- Service-role key is `server-only` and never reaches the browser.
- Security headers + `noindex`/`no-store` on `/dashboard` and `/admin`; those
  paths are also disallowed in `robots.txt`.
- Demo cookie is `httpOnly`, `sameSite=lax`, and `secure` in production.

Known gap: no Content-Security-Policy yet. Next's dev overlay and inline
runtime need a nonce-based CSP to be worth anything, which needs testing
against Supabase and `next/font`, see the note in `next.config.ts`.

## Google (Gmail) sign-in

The button is wired and appears on `/login` and `/signup`; it just needs
credentials. Until they're added it shows an inline "not connected yet"
message rather than redirecting anywhere.

To enable:

1. Google Cloud Console → create an OAuth 2.0 Client ID (Web application).
2. Add the authorised redirect URI Supabase gives you, i.e.
   `https://<project-ref>.supabase.co/auth/v1/callback`.
3. Supabase dashboard → Authentication → Providers → Google → paste the
   client ID and secret, enable.
4. Set `NEXT_PUBLIC_SITE_URL` for production so the post-login redirect
   points at the deployed domain (`src/app/(auth)/auth/callback/route.ts`
   handles the code exchange and routes by role).

## Animation & WebGL

Motion (Framer Motion) drives the scroll reveals and hero entrance via
`components/marketing/motion-primitives.tsx`. Reduced motion is handled
globally by `<MotionConfig reducedMotion="user">`, never branch component
markup on `useReducedMotion()`, that breaks hydration.

The hero has a small decorative WebGL layer (one fragment shader, no
three.js) in `components/marketing/hero-canvas.tsx`. It is strictly
progressive enhancement: a CSS gradient always renders underneath, and
`lib/use-webgl-capability.ts` switches the canvas off for reduced-motion
users, screens ≤900px, devices with <4 cores or <4GB RAM, Save-Data, and
anything without WebGL. When it does run it's capped at 30fps and 1.5x DPR,
and pauses when scrolled out of view or the tab is hidden.

## Contact form

The landing page ends with an enquiry form (`/#enquire`) that writes to
`contact_enquiries` (migration `0009`) and surfaces at `/admin/enquiries`
with a new / contacted / closed workflow.

Three layers of protection, all verified against a bypass attempt:

- **Zod validation server-side**, so stripping the HTML `required` and
  `minlength` attributes in devtools still gets rejected.
- **Honeypot field** hidden off-screen. Bots fill it; those submissions get
  a success screen but are silently discarded rather than stored.
- **In-memory rate limit** (5 per IP per 10 minutes). Per-instance and
  resets on restart, so put a real edge rate limiter in front in production.

RLS lets anyone insert but only `is_admin()` select, so the public can write
enquiries and never read them back.

## Writing style

House style avoids em and en dashes. Use commas, colons, or separate
sentences instead. `grep -rn '—' src` should return nothing.

## Theming

Light mode and dark mode solve different problems on purpose, not the same
problem twice:

- **Light mode is the brand.** Navy is the dominant hue, on white/cream. No
  gold, no brand-color chips beyond navy itself.
- **Dark mode is a dark theme, not "the brand, but dark."** No navy wash, no
  blue accent, no hue at all beyond the functional green completed-status.
  Grayscale only. Depth comes from lightness contrast between surfaces
  (sidebar darkest, page mid-tone, cards lightest), the same way
  Linear/Vercel/GitHub's dark themes get richness without tinting every
  surface some color.

This codebase has gone back and forth on dark mode more than once (gold →
monochrome → navy wash → back to neutral). If dark mode ever looks "off"
again, the fix is almost never a new color, it's a lightness/contrast
problem between surfaces. Reach for that first.

`--deep` (sidebar, hero, footer) is navy in light mode, neutral black in
dark mode, it flips, unlike most tokens here. `--navy` (heading/text) flips
the other way: dark text in light mode, light text in dark mode. Both live
in `globals.css`.

Use `bg-primary text-primary-foreground` for primary buttons so they adapt
(navy fill in light mode, off-white fill in dark mode) rather than
hard-coding a color. Note the always-dark sections (`bg-deep`: hero, footer,
sidebar) can't use theme-flipping tokens for emphasis in light mode, since
`--navy` there is dark navy, the same as the always-dark background, and
would be invisible. Those use literal `white/opacity` instead, see
`hero.tsx` and `contact-footer.tsx`.

## Project structure

- `src/app/(marketing)`, public landing page
- `src/app/(auth)`, login / signup
- `src/app/(customer)/dashboard`, customer portal
- `src/app/(admin)/admin`, admin back office
- `src/lib/data/`, read queries (Server Components, RLS-scoped)
- `src/lib/actions/`, mutations (Server Actions)
- `src/lib/content/services.ts`, brochure copy, shared by the landing page
  and `supabase/seed.sql`
- `src/lib/site-config.ts`, brand copy + **placeholder** contact details
  (email/phone/website/office address, replace before launch)

## Deferred / out of scope

Not built in this pass, called out here so they're not mistaken for bugs:

- Document upload / secure file exchange (updates are in-app text only)
- Billing / payments
- Outbound email notifications for updates (in-app only)
- Multi-admin permission tiers (single `admin` role)

## Scripts

- `npm run dev`, start the dev server
- `npm run build`, production build (includes type checking)
- `npm run seed:demo`, create demo admin + customer accounts and sample data
- `npm run lint`, ESLint
