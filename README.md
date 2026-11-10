# 🍕 Foodiez — Modern Food Delivery & Restaurant Platform

A full-stack food delivery web application built with **Next.js 14**, **Prisma**, **NextAuth.js**, and **Tailwind CSS**. Features include user authentication, a browsable menu, cart management, order processing, table booking, an admin dashboard, and a stunning animated UI.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-5.10-2D3748?logo=prisma)

---

## ✨ Features

### Customer Features
- 🔐 **Authentication** — Sign up, sign in with credentials or Google OAuth
- 🍔 **Browse Menu** — Filter by food category (Pizza, Burgers, Sushi, etc.)
- 🛒 **Cart Management** — Add/remove items, adjust quantities
- 💳 **Checkout** — Razorpay integration (or demo cash-on-delivery mode)
- 📋 **Order History** — Track all past orders
- 🪑 **Table Booking** — Reserve a table online
- 📬 **Contact Form** — Send messages via Web3Forms
- ℹ️ **About Page** — Beautiful animated page with testimonials

### Admin Features
- 📊 **Dashboard** — View menu items and categories at a glance
- ➕ **Add Menu Items** — Create new dishes with images, descriptions, and pricing
- 📦 **Manage Orders** — View and update order statuses
- 📅 **View Bookings** — See all table reservations

### Technical Highlights
- ⚡ **Server Components** — Direct database queries (no redundant API calls)
- 🎨 **Framer Motion** — Smooth page transitions and animations
- 🔄 **Zustand** — Lightweight state management for cart
- 📱 **Fully Responsive** — Mobile-first design
- 🗃️ **Dual Database Support** — SQLite for development, PostgreSQL for production

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Auth | [NextAuth.js](https://next-auth.js.org/) |
| Database | [Prisma ORM](https://www.prisma.io/) + SQLite / PostgreSQL |
| State | [Zustand](https://zustand-demo.pmnd.rs/) |
| Payments | [Razorpay](https://razorpay.com/) (optional) |
| Icons | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |
| Notifications | [React Hot Toast](https://react-hot-toast.com/) + [SweetAlert2](https://sweetalert2.github.io/) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ installed
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/foodiez.git
cd foodiez
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and customize if needed:

```bash
cp .env.example .env
```

The default `.env` uses **SQLite** (zero setup required). See [Deployment](#-deployment) for PostgreSQL configuration.

### 4. Set up the database and seed data

```bash
npm run seed
```

This creates the SQLite database, pushes the schema, and seeds it with:
- **Admin account:** `admin@gmail.com` / `admin123`
- **Demo user:** `user@foodiez.com` / `user123`
- 8 food categories and 24 menu items with images

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
foodiez/
├── app/
│   ├── (pages)/
│   │   ├── (auth)/          # Sign in & Sign up pages
│   │   ├── (user)/          # Customer pages (dashboard, cart, orders, etc.)
│   │   └── admin/           # Admin pages (home, add-menu-item, orders, bookings)
│   ├── api/                 # API routes (auth, menu, orders, payments, etc.)
│   ├── components/          # Reusable UI components
│   └── layout.tsx           # Root layout
├── lib/
│   ├── auth.ts              # NextAuth configuration
│   └── prisma.ts            # Prisma client singleton
├── prisma/
│   ├── schema.prisma        # Database schema (SQLite)
│   ├── schema.postgresql.prisma  # PostgreSQL schema (for deployment)
│   └── seed.ts              # Database seed script
├── public/                  # Static assets (images, icons)
├── scripts/                 # Utility scripts (db switching)
├── store.ts                 # Zustand store (cart state)
└── types/                   # TypeScript type definitions
```

---

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@gmail.com` | `admin123` |
| User | `user@foodiez.com` | `user123` |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run seed` | Push schema + seed database |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed database with sample data |
| `npm run use:sqlite` | Switch to SQLite schema |
| `npm run use:postgres` | Switch to PostgreSQL schema |
| `npm run lint` | Run ESLint |

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Switch to PostgreSQL:**
   ```bash
   npm run use:postgres
   ```

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

3. **Import project on [Vercel](https://vercel.com/new):**
   - Connect your GitHub repository
   - Set **Build Command:** `prisma generate && next build`
   - Set **Environment Variables:**

     | Variable | Value |
     |----------|-------|
     | `DATABASE_URL` | Your PostgreSQL connection string (use [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app)) |
     | `NEXTAUTH_SECRET` | A random secret string |
     | `NEXTAUTH_URL` | Your deployed URL (e.g., `https://foodiez.vercel.app`) |

4. **After deployment**, seed the production database:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

### Deploy to Render

1. **Switch to PostgreSQL** (same as above)
2. **Create a new Web Service on [Render](https://render.com)**
3. Configure:
   - **Build Command:** `npm install && npx prisma generate && npx prisma db push && npm run build`
   - **Start Command:** `npm start`
   - Add the same environment variables as above
   - Optionally add a Render PostgreSQL database

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | Database connection string |
| `NEXTAUTH_SECRET` | ✅ | JWT signing secret |
| `NEXTAUTH_URL` | ✅ | App URL (`http://localhost:3000` for dev) |
| `GOOGLE_CLIENT_ID` | ❌ | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | ❌ | Google OAuth client secret |
| `RAZORPAY_KEY_ID` | ❌ | Razorpay key (skip for demo mode) |
| `RAZORPAY_KEY_SECRET` | ❌ | Razorpay secret |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | ❌ | Razorpay public key |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | ❌ | Web3Forms access key for contact form |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js, Prisma, and Tailwind CSS**
