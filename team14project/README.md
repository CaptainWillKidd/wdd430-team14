# wdd430-team14

Project Members:
Alanxander Bredee Holden
Samuel Jonathan
Wesley Pontes Lima
Willian Alves Canuto
Folusho Bamidele Sanni

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



Handcrafted Haven - Project Status Update


Overview
This project has been pivoted to "Handcrafted Haven", a multi-vendor marketplace for independent artisans. 
The design system uses a Rose/Red & Stone Grey color palette with Serif typography for an artisanal feel.



Completed Modules
1. Global Architecture
Root Layout (src/app/layout.tsx): Implements a persistent Navbar and Footer that appears on every page.

Component Separation: Reusable UI elements (Navbar/Footer) are located in src/components/, keeping the page logic clean.



2. Public Pages
Landing Page (src/app/page.tsx): Features the "Handcrafted Haven" hero section, category previews (Classical, Modern, Decorative), and artisan call-to-action.

Shop Catalog (src/app/shop/page.tsx): A functional product grid with sidebar filters for Category, Search, and Price.

Product Details (src/app/shop/[id]/page.tsx): A dynamic routing page that displays detailed info, artisan profiles, and reviews for individual products.



3. Authentication (Refactored)
Route Groups: We used a route group (auth) to share a layout between Login and Register without affecting the URL.

Split Layout: Both pages share a branded left-side panel with the "Handcrafted Haven" imagery.

Role Selection: Users can toggle between "Customer" and Artisan" roles during login/signup (Logic currently redirects both to Shop until Dashboard is built).



Current File Structure
(Team Members: Please follow this structure when adding new features)

Plaintext

team14project/
├── next.config.ts           # Configured for external images (placehold.co)
├── src/
│   ├── components/          # Shared UI Components
│   │   ├── Navbar.tsx       # Top navigation (Links to Shop, Login)
│   │   └── Footer.tsx       # Site footer
│   │
│   └── app/                 # Page Routes
│       ├── layout.tsx       # Root Layout (Wraps ALL pages)
│       ├── page.tsx         # Home / Landing Page
│       │
│       ├── (auth)/          # Authentication Group (Shared Layout)
│       │   ├── layout.tsx   # Branding Sidebar for Auth pages
│       │   ├── login/       # Route: /login
│       │   │   └── page.tsx
│       │   └── register/    # Route: /register
│       │       └── page.tsx
│       │
│       └── shop/            # Marketplace
│           ├── page.tsx     # Route: /shop (Catalog & Filters)
│           └── [id]/        # Route: /shop/1 (Dynamic Product Page)
│               └── page.tsx



Next Steps (To Do)

Shopping Cart (Priority):
File: Create src/app/cart/page.tsx.
Task: Implement the cart view where users can update quantities and remove items.


Checkout Flow:
File: Create src/app/checkout/page.tsx.
Task: Form for shipping details and order summary.


Artisan Dashboard (Future):
File: Create src/app/dashboard/page.tsx.
Task: Create the private workspace for artisans to view orders and analytics.
