# Northline Supply — React Product Catalog

A responsive product catalog built with **React 18**, **React Router 6** and **Vite**.
It renders a 16-product catalogue from a JSON file through reusable components, with
search, category filtering, sorting, load-more paging, cart, wishlist and a dark mode
that all survive a page refresh.

![Home page](screenshots/home.png)

> **New to this codebase?** Read [`GUIDE.md`](GUIDE.md) — a beginner-friendly
> walkthrough of every file, how the app boots, how to add product photos, and a
> "where do I change X?" cheat-sheet.

---

## Features

**Required**
- Five routes: Home `/`, Products `/products`, Product Details `/product/:id`, About `/about`, and a `*` 404 page
- Reusable components: `Navbar`, `Footer`, `ProductCard`, `ProductList`, `CategoryFilter`, `SearchBar`, `SortSelect`, `LoadMore`
- 16 products stored in `src/data/products.json` and rendered dynamically through props
- Search by product name, description or category
- Category filtering with live per-category counts
- Sorting by Price (low→high), Price (high→low), Rating and Name (A→Z)
- Clicking a product opens a full detail page with specification table, features and related items
- Functional components throughout, with `useState`, `useEffect`, `useMemo` and `useContext`
- Responsive from 320 px upward

**Bonus**
- Add to cart with quantity controls and an order summary
- Wishlist with a saved-items page
- Dark mode toggle
- Cart, wishlist and theme persisted in `localStorage`
- Shareable filtered URLs (`/products?category=Audio`)
- Debounced search, loading skeletons, empty states, and a back-to-top scroll reset on route change

---

## Getting started

Requires **Node.js 18+**.

```bash
# 1. install dependencies
npm install

# 2. start the dev server (http://localhost:5173)
npm run dev

# 3. build for production
npm run build

# 4. preview the production build locally
npm run preview
```

---

## Project structure

```
src/
├── components/          Reusable UI pieces
│   ├── Navbar.jsx           Sticky nav, mobile menu, cart + wishlist badges
│   ├── Footer.jsx
│   ├── ProductCard.jsx      Single product tile (props in, nothing fetched)
│   ├── ProductList.jsx      Grid + empty state
│   ├── CategoryFilter.jsx   Category chips with counts
│   ├── SearchBar.jsx        Controlled search input
│   ├── SortSelect.jsx       Sort dropdown
│   ├── LoadMore.jsx         "Load more" pagination
│   ├── ProductVisual.jsx    Per-category SVG schematic, tinted per product
│   ├── Rating.jsx           Star rating with partial fill
│   ├── EmptyState.jsx
│   ├── ThemeToggle.jsx
│   └── ScrollToTop.jsx      Resets scroll on route change
├── pages/               One component per route
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   ├── About.jsx
│   ├── Wishlist.jsx
│   ├── Cart.jsx
│   └── NotFound.jsx
├── context/             Global state via Context API
│   ├── CartContext.jsx
│   ├── WishlistContext.jsx
│   └── ThemeContext.jsx
├── hooks/               Custom hooks
│   ├── useLocalStorage.js   useState that persists
│   ├── useDebounce.js       Delays fast-changing values
│   └── useDocumentTitle.js  Syncs the tab title to the route
├── utils/
│   ├── filterProducts.js    Search / filter / sort logic (pure functions)
│   └── format.js            Price and rating formatting
├── data/
│   └── products.json        The catalogue — 16 products
├── styles/
│   └── index.css            Design tokens + all component styles
├── App.jsx              Route table
└── main.jsx             Entry point, providers, Router
```

---

## How the catalogue logic works

All searching, filtering and sorting lives in `src/utils/filterProducts.js` as pure
functions, so the components stay presentational and the logic can be tested on its own:

```js
applyCatalogFilters(products, { search, category, sortBy })
// → filterByCategory → searchProducts → sortProducts
```

`sortProducts` copies the array before sorting, so the imported JSON is never mutated.

---

## Screenshots

| Home | Products |
|---|---|
| ![Home](screenshots/home.png) | ![Products](screenshots/products.png) |

| Product details | Dark mode |
|---|---|
| ![Details](screenshots/details.png) | ![Dark mode](screenshots/dark.png) |

> To regenerate: run `npm run dev`, then capture each route into `screenshots/`
> as `home.png`, `products.png`, `details.png` and `dark.png`.

---

## Tech stack

| Tool | Role |
|---|---|
| React 18 | UI, functional components and hooks |
| React Router 6 | Client-side routing, URL params, query params |
| Vite 5 | Dev server and production bundling |
| Context API | Cart, wishlist and theme state |
| CSS custom properties | Light and dark themes from one token set |

---

## Deploying

The app uses `BrowserRouter`, so a static host needs a rewrite rule sending all paths
to `index.html`.

- **Netlify** — add `public/_redirects` containing `/*  /index.html  200`
- **Vercel** — works out of the box
- **GitHub Pages** — switch `BrowserRouter` to `HashRouter` in `src/main.jsx`, since Pages
  cannot rewrite paths

---

## Licence

Built as a learning project. Product names, copy and specifications are fictional.
