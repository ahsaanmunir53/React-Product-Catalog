# Code Guide — Northline Supply Product Catalog

**Who this is for:** someone who has never worked on this project (or maybe never
on a React project at all) and needs to understand how it works and where to change
things.

Read it top to bottom once. After that, use the **[Where do I change X?](#12-where-do-i-change-x--cheat-sheet)**
cheat-sheet as your daily reference.

---

## Table of contents

1. [What this app is](#1-what-this-app-is)
2. [Running it on your machine](#2-running-it-on-your-machine)
3. [The 60-second big picture](#3-the-60-second-big-picture)
4. [How the app starts (boot order)](#4-how-the-app-starts-boot-order)
5. [The folder map](#5-the-folder-map)
6. [The data file — where products live](#6-the-data-file--where-products-live)
7. [File-by-file walkthrough](#7-file-by-file-walkthrough)
8. [Follow one click: typing in the search box](#8-follow-one-click-typing-in-the-search-box)
9. [Follow one click: opening a product](#9-follow-one-click-opening-a-product)
10. [State explained simply](#10-state-explained-simply)
11. [Adding pictures — the complete guide](#11-adding-pictures--the-complete-guide)
12. [Where do I change X? — cheat-sheet](#12-where-do-i-change-x--cheat-sheet)
13. [Common tasks, step by step](#13-common-tasks-step-by-step)
14. [Glossary](#14-glossary)
15. [When something breaks](#15-when-something-breaks)

---

## 1. What this app is

A **product catalogue website**. It shows 16 products, lets you search them, filter
them by category, sort them, open any one of them for full details, save favourites,
and put them in a cart.

It is a **front-end only** app. There is no server and no database. All 16 products
live in one file (`src/data/products.json`) that ships with the app.

Nothing is saved to a server. The cart, wishlist and dark-mode setting are saved in
your **browser's own storage**, which is why they survive a page refresh but do not
follow you to another computer.

---

## 2. Running it on your machine

You need **Node.js version 18 or newer**. Check with `node -v`.

```bash
npm install     # downloads the libraries — do this once
npm run dev     # starts the site at http://localhost:5173
```

Leave `npm run dev` running while you work. Every time you save a file, the browser
updates by itself. You do not need to refresh.

Two other commands:

```bash
npm run build     # creates the dist/ folder — the version you upload to a host
npm run preview   # shows you that built version locally, to check before deploying
```

---

## 3. The 60-second big picture

React builds a page out of **components**. A component is just a JavaScript function
that returns something that looks like HTML. You nest small components inside bigger
ones, like Lego.

This project has three kinds of files that matter:

| Kind | Lives in | What it is |
|---|---|---|
| **Page** | `src/pages/` | One whole screen. Home, Products, Cart… |
| **Component** | `src/components/` | A reusable piece used on many pages. A card, the navbar… |
| **Everything else** | `src/utils/`, `src/hooks/`, `src/context/` | Logic and shared memory, no visuals |

The rule to remember: **pages own the data, components display it.**

The Products page decides *which* products to show. `ProductCard` just draws whichever
product it is handed. That handing-over is called **props**.

```
Products page  ──── passes product ────►  ProductCard  ────►  draws the tile
   (thinks)                                (displays)
```

---

## 4. How the app starts (boot order)

This is the exact order things happen when someone opens the site. Follow it once and
the whole project makes sense.

```
1.  index.html          ← the browser opens this first
        │                 it is nearly empty: <div id="root"></div>
        ▼
2.  src/main.jsx        ← plugs React into that empty div
        │                 also wraps everything in "providers" (shared memory)
        ▼
3.  src/App.jsx         ← the route table: which URL shows which page
        │
        ▼
4.  src/pages/Home.jsx  ← the page matching the current URL
        │
        ▼
5.  src/components/…    ← the small pieces that page uses
```

**Step 1 — `index.html`** (project root)

The only real HTML file. It contains an empty `<div id="root"></div>` and loads the
fonts. React fills that empty div with the entire site.

**Step 2 — `src/main.jsx`**

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>          {/* enables URLs like /products          */}
    <ThemeProvider>        {/* light/dark mode available everywhere  */}
      <CartProvider>       {/* the cart available everywhere         */}
        <WishlistProvider> {/* saved items available everywhere      */}
          <App />
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  </BrowserRouter>
);
```

Those wrappers are **providers**. Think of them as shelves placed above the whole app:
anything inside can reach up and grab the cart without it being passed down by hand
through every component.

**Step 3 — `src/App.jsx`**

The route table. This is the list of every address the site answers to:

```jsx
<Routes>
  <Route path="/"            element={<Home />} />
  <Route path="/products"    element={<Products />} />
  <Route path="/product/:id" element={<ProductDetails />} />   {/* :id = a number */}
  <Route path="/about"       element={<About />} />
  <Route path="/wishlist"    element={<Wishlist />} />
  <Route path="/cart"        element={<Cart />} />
  <Route path="*"            element={<NotFound />} />          {/* anything else */}
</Routes>
```

`path="*"` is the catch-all. Any address that matches nothing above it lands on the
404 page.

`:id` is a **placeholder**. `/product/7` and `/product/12` both open the same
`ProductDetails` component; that component then reads the number and looks up the
right product.

Notice `<Navbar />` and `<Footer />` sit **outside** `<Routes>` in App.jsx. That is
why they stay on screen on every page.

---

## 5. The folder map

```
product-catalog/
│
├── index.html              The HTML shell. Rarely edited.
├── package.json            Project name, scripts, list of libraries.
├── vite.config.js          Build tool settings. Rarely edited.
│
├── public/                 Files copied as-is to the site root.
│   └── images/             ← PUT YOUR PRODUCT PHOTOS HERE (see section 11)
│
└── src/
    ├── main.jsx            Boot file (step 2 above)
    ├── App.jsx             Route table (step 3 above)
    │
    ├── data/
    │   └── products.json   ← ALL 16 PRODUCTS. Edit this to change the catalogue.
    │
    ├── pages/              One file per screen
    │   ├── Home.jsx
    │   ├── Products.jsx
    │   ├── ProductDetails.jsx
    │   ├── About.jsx
    │   ├── Wishlist.jsx
    │   ├── Cart.jsx
    │   └── NotFound.jsx
    │
    ├── components/         Reusable pieces
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ProductCard.jsx
    │   ├── ProductList.jsx
    │   ├── ProductVisual.jsx   ← the product picture
    │   ├── SearchBar.jsx
    │   ├── CategoryFilter.jsx
    │   ├── SortSelect.jsx
    │   ├── LoadMore.jsx
    │   ├── Rating.jsx
    │   ├── EmptyState.jsx
    │   ├── ThemeToggle.jsx
    │   └── ScrollToTop.jsx
    │
    ├── context/            Shared memory (the "shelves" from step 2)
    │   ├── CartContext.jsx
    │   ├── WishlistContext.jsx
    │   └── ThemeContext.jsx
    │
    ├── hooks/              Small reusable behaviours
    │   ├── useLocalStorage.js
    │   ├── useDebounce.js
    │   └── useDocumentTitle.js
    │
    ├── utils/              Plain logic, no visuals
    │   ├── filterProducts.js   ← search / filter / sort lives here
    │   └── format.js           ← price formatting
    │
    └── styles/
        └── index.css       ← ALL styling and both colour themes
```

---

## 6. The data file — where products live

`src/data/products.json`

This is the single most important file for anyone maintaining content. One product
looks like this:

```json
{
  "id": 1,
  "name": "Meridian Over-Ear Headphones",
  "category": "Audio",
  "price": 24999,
  "rating": 4.7,
  "reviews": 218,
  "stock": 14,
  "sku": "NL-AUD-001",
  "swatch": "#2f5bff",
  "image": "",
  "short": "Closed-back studio headphones with 40 mm drivers.",
  "description": "Meridian is tuned for long sessions rather than…",
  "features": ["40 mm dynamic drivers", "Detachable dual-entry cable"],
  "specs": { "Driver": "40 mm dynamic", "Impedance": "32 ohm" }
}
```

What each field controls and where it appears:

| Field | What it does | Shown on |
|---|---|---|
| `id` | Unique number. Builds the URL `/product/1`. **Never reuse a number.** | URL |
| `name` | Product title. Also what search matches. | Card, details, cart |
| `category` | Which filter chip it belongs to. New value = new chip automatically. | Card, filters, home tiles |
| `price` | A plain number, no commas, no "Rs". Formatting is added in code. | Card, details, cart |
| `rating` | 0–5, one decimal. Drives the stars. | Card, details |
| `reviews` | Review count shown in brackets. | Card, details |
| `stock` | Below 10 shows a red "Only N left" warning. | Details |
| `sku` | Product code printed on the picture. | Picture corner |
| `swatch` | Hex colour used to tint the fallback drawing. | Picture |
| `image` | **Photo URL or path. Empty = drawing is used.** See section 11. | Picture |
| `short` | One line under the title on the card. Also searched. | Card |
| `description` | Full paragraph. | Details only |
| `features` | Bullet list. Add or remove as many as you like. | Details only |
| `specs` | Table rows. Left side is the label, right side is the value. | Details only |

**Rules that will save you an hour:**

- It is **JSON**, not JavaScript. Every key needs `"double quotes"`. No comments allowed.
- **No trailing comma** after the last item in a list or object. This is the number one
  cause of a blank white screen.
- After editing, the site reloads by itself. If it goes blank, you broke the JSON —
  check the terminal, it will name the line.

---

## 7. File-by-file walkthrough

### `src/utils/format.js`

Two tiny functions. `formatPrice(24999)` returns `"Rs 24,999"`.

**Change the currency here and it changes everywhere in the app.**

### `src/utils/filterProducts.js`

The brain of the catalogue. No visuals at all — just functions that take a list of
products in and give a list of products out.

```js
getCategories(products)          // ['All', 'Audio', 'Desk', …] built from the data
searchProducts(products, term)   // keeps products whose name/short/category matches
filterByCategory(products, cat)  // keeps one category ('All' keeps everything)
sortProducts(products, sortBy)   // returns a sorted copy
applyCatalogFilters(products, { search, category, sortBy })  // runs all three
```

`SORT_OPTIONS` at the top of this file is the dropdown list. Add an entry there and a
matching `case` in `sortProducts`, and a new sort option appears in the UI.

> **A detail worth understanding:** `sortProducts` starts with `const list = [...products]`.
> That copies the array first. JavaScript's `.sort()` permanently rearranges the array
> you give it — without the copy, sorting once by price would scramble the original
> product list for the rest of the session. Copying prevents a bug you would struggle
> to find.

### `src/hooks/useLocalStorage.js`

Normal React state forgets everything on refresh. This is state that remembers.

```js
const [theme, setTheme] = useLocalStorage('nl.theme', 'light');
```

Use it exactly like `useState`, but pass a storage key first. It reads that key on
first load and writes back on every change. Wrapped in `try/catch` because private
browsing mode blocks storage — the app keeps working, it just forgets on refresh.

### `src/hooks/useDebounce.js`

Waits until typing stops before acting. Without it, typing "headphones" would re-filter
the list ten times. With it, filtering happens once, 200 ms after the last keystroke.

### `src/hooks/useDocumentTitle.js`

Sets the browser tab text per page.

### `src/context/*.jsx` — shared memory

Three contexts, all the same shape:

- **CartContext** — what's in the cart. Shape: `{ productId: quantity }`. Gives you
  `addItem`, `decreaseItem`, `removeItem`, `clearCart`, `count`.
- **WishlistContext** — an array of saved product ids. Gives you `isSaved`, `toggleSaved`.
- **ThemeContext** — `'light'` or `'dark'`, plus `toggleTheme`.

Any component can read them without props:

```jsx
import { useCart } from '../context/CartContext';

function Something() {
  const { addItem, count } = useCart();
  …
}
```

**How dark mode actually works:** `ThemeContext` writes `data-theme="dark"` onto the
`<html>` tag. In `index.css`, the block `[data-theme='dark'] { … }` redefines every
colour variable. One attribute repaints the whole site — no component knows or cares.

### `src/components/ProductVisual.jsx` — the product picture

Two behaviours in one component:

1. If the product has an `image` value → show that photo.
2. If it doesn't, **or the photo fails to load** → draw an SVG shape based on the
   category, tinted with `swatch`.

That fallback is why the grid never shows a broken-image icon. Full instructions in
section 11.

### `src/components/ProductCard.jsx` — one tile

Receives one product through props and draws it. It does not know where the product
came from — that's what makes it reusable on Home, Products, Wishlist and Details.

```jsx
export default function ProductCard({ product }) { … }
```

It wraps the picture and title in `<Link to={`/product/${product.id}`}>`, which is how
clicking navigates. **Use `<Link>`, never `<a href>`** — a plain `<a>` reloads the whole
site and loses the cart.

### `src/components/ProductList.jsx`

Takes an array, loops it into cards. If the array is empty it shows `EmptyState`
instead. This is why "no results" looks designed rather than blank.

```jsx
{products.map((p) => <ProductCard key={p.id} product={p} />)}
```

The `key={p.id}` is required by React — it uses it to track which item is which.

### `src/components/SearchBar.jsx`, `CategoryFilter.jsx`, `SortSelect.jsx`

All three are **controlled components**. They hold no memory of their own. They receive
a current value and a function to call when the user changes it:

```jsx
<SearchBar value={search} onChange={setSearch} />
```

The real value lives in `Products.jsx`. This is deliberate: one place holds the truth,
so search + filter + sort can never disagree with each other.

### `src/components/LoadMore.jsx`

The paging button. Shows "Showing 8 of 16" and loads 8 more per click. When everything
is visible it switches to "All 16 products shown."

### `src/components/Navbar.jsx`

Sticky top bar. Uses `NavLink` (not `Link`) for the menu items — `NavLink` automatically
adds an `active` class to the link matching the current URL, which draws the underline.
Also holds the burger menu state for mobile and the live cart/wishlist counters.

### `src/components/ScrollToTop.jsx`

Renders nothing. It watches the URL and scrolls to the top when it changes. Without it,
clicking a product from halfway down the list would open the detail page halfway down.

### `src/pages/Home.jsx`

The landing page. Everything on it is **derived from the data**, not typed by hand:

```jsx
const featured = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
```

Add a higher-rated product to the JSON and the featured row updates by itself. The
category tiles and the three statistics work the same way.

### `src/pages/Products.jsx` — the most important page

This one page holds all the filter state:

```jsx
const [products, setProducts] = useState([]);      // the catalogue
const [loading, setLoading]   = useState(true);    // show skeletons?
const [search, setSearch]     = useState('');      // search text
const [category, setCategory] = useState('All');   // active chip
const [sortBy, setSortBy]     = useState('featured');
const [visible, setVisible]   = useState(8);       // how many are on screen
```

It runs four effects:

1. **Load the catalogue** — a 350 ms timer stands in for a server request so the
   loading skeletons are real. Replace this block with `fetch()` when a real API exists.
2. **Keep the category in the URL** — so `/products?category=Audio` can be shared.
3. **Reset paging** — any filter change puts you back to the first 8 results.
4. *(via `useMemo`)* **Recalculate the filtered list** only when something actually changed.

### `src/pages/ProductDetails.jsx`

Reads the id from the URL:

```jsx
const { id } = useParams();     // '/product/7'  →  id = '7'
```

Then finds that product. **If no product matches, it shows a 404 message instead of
crashing** — that's the `notFound` state. This matters because anyone can type
`/product/999` into the address bar.

Also renders the spec table, the quantity picker, and three related products from the
same category.

### `src/pages/Cart.jsx`

Turns `{ 1: 2, 5: 1 }` into real rows by looking each id up in the JSON, then adds up
the total. Free shipping over Rs 20,000 — those two numbers are constants at the top
of the file.

### `src/pages/NotFound.jsx`

The 404 page. Reached by `path="*"` in App.jsx.

### `src/styles/index.css`

One stylesheet, in this order:

1. `:root { … }` — light theme colour variables
2. `[data-theme='dark'] { … }` — the same variables, dark values
3. Layout and typography
4. Component styles, grouped by component with `/* ---------- comment ---------- */` headers

**Never hardcode a colour in a component.** Use a variable (`var(--accent)`) so dark
mode keeps working.

---

## 8. Follow one click: typing in the search box

This is the full chain. Understanding this one flow explains most of React.

```
User types "head" into the search input
        │
        ▼
SearchBar calls  onChange("head")
        │        (SearchBar itself stores nothing)
        ▼
Products.jsx  setSearch("head")        ← state changes here
        │
        ▼
useDebounce waits 200 ms after typing stops
        │
        ▼
debouncedSearch becomes "head"
        │
        ▼
useMemo re-runs applyCatalogFilters(products, { search:"head", category, sortBy })
        │
        ▼
filterProducts.js filters and sorts → returns 1 matching product
        │
        ▼
React re-renders Products → ProductList → one ProductCard
        │
        ▼
An effect resets `visible` back to 8, so paging starts fresh
```

The key idea: **you never touch the page yourself.** You change a value, and React
redraws whatever depended on it.

---

## 9. Follow one click: opening a product

```
User clicks a card
        │
        ▼
<Link to="/product/7">  changes the URL — no page reload
        │
        ▼
App.jsx route table matches  path="/product/:id"
        │
        ▼
ProductDetails renders;  useParams() gives id = "7"
        │
        ▼
useEffect runs: products.find(p => String(p.id) === "7")
        │
        ├── found     → setProduct(found), tab title updates
        └── not found → setNotFound(true) → in-page 404 message
        │
        ▼
ScrollToTop notices the URL changed → scrolls to the top
```

---

## 10. State explained simply

Four kinds of memory, and when to use each:

| Kind | Lives for | Use it for | Example here |
|---|---|---|---|
| `useState` | Until you leave the page | Something only this page cares about | search text, quantity picker |
| **Context** | The whole visit | Something many pages need | cart, wishlist, theme |
| **localStorage** | Forever (this browser) | Something that must survive refresh | cart, wishlist, theme |
| **URL** | Shareable, bookmarkable | Something worth linking to | `?category=Audio`, `/product/7` |

The cart uses three of them at once: Context so any page can reach it, localStorage so
a refresh doesn't empty it, and `useState` inside the context to trigger redraws.

**Rule of thumb:** start with `useState` in the page. Only lift it into Context when a
second, unrelated page needs the same value.

---

## 11. Adding pictures — the complete guide

Right now every product shows a **drawing**, because every `image` field in
`products.json` is empty (`"image": ""`). The moment you put something in that field,
that product shows a real photo instead. No code changes needed.

### The two methods

#### Method A — download the photo into the project *(recommended)*

Best for real work: the images are yours, they load fast, and they never disappear
because someone else deleted them.

**Step 1.** Create the folder if it isn't there:

```
public/images/
```

**Step 2.** Save your photos into it. Use simple lowercase names, no spaces:

```
public/images/meridian-headphones.jpg
public/images/pocket-dac.jpg
public/images/gan-charger.jpg
```

**Step 3.** In `src/data/products.json`, fill in the `image` field. The path starts
with `/images/` — **not** `public/`, because `public` becomes the site root when built:

```json
{
  "id": 1,
  "name": "Meridian Over-Ear Headphones",
  "swatch": "#2f5bff",
  "image": "/images/meridian-headphones.jpg",
  ...
}
```

Save. The photo appears immediately.

> ⚠️ The most common mistake: writing `"public/images/photo.jpg"`. It must be
> `"/images/photo.jpg"` — leading slash, no `public`.

#### Method B — use a URL from the internet

Fastest for a demo or a placeholder. The image lives on someone else's server.

```json
"image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
```

Paste the full address including `https://`. That's the whole change.

**Trade-off, honestly:** if that site goes down, blocks hotlinking, or the owner
deletes the photo, your catalogue shows the fallback drawing instead. Fine for a demo,
not for a real shop.

### Which method for which job

| Situation | Use |
|---|---|
| Real product photos for a live site | **A** — download into `public/images/` |
| Quick demo, placeholder pictures | **B** — a URL |
| Client sent you a Google Drive link | **A** — download first, then add |
| Photos on Instagram | **A** — download, then add. Instagram blocks direct linking |

### What happens if the image is wrong

Nothing breaks. `ProductVisual.jsx` catches the failure with `onError` and falls back
to the drawing:

```jsx
<img src={image} onError={() => setBroken(true)} />
```

So a typo shows a drawing, not a broken icon. Useful, but it also means **a typo is
easy to miss** — if a photo isn't appearing, check the spelling of the filename first.

### Photo guidelines

- **Shape:** roughly 4:3 (e.g. 800 × 600). Cards crop to 4:3, the detail page to a
  square, both using `object-fit: cover` so nothing stretches.
- **Size:** keep files under ~200 KB. A 4 MB photo makes the page crawl.
- **Format:** `.jpg` for photographs, `.png` when you need transparency, `.webp` if
  you want the smallest files.

### Other images in the project

| Image | Where it goes | How to reference it |
|---|---|---|
| Product photos | `public/images/` | `"image": "/images/name.jpg"` in products.json |
| Logo / favicon | `public/` | `<link rel="icon" href="/favicon.png">` in `index.html` |
| Hero or banner picture | `public/images/` | `<img src="/images/hero.jpg" />` in `Home.jsx` |
| README screenshots | `screenshots/` | `![Home](screenshots/home.png)` in README.md |

### Adding a banner image to the home page

If you want a picture at the top of the home page, open `src/pages/Home.jsx`, find the
`<section className="hero">` block, and add after the buttons:

```jsx
<img
  className="hero__image"
  src="/images/hero.jpg"
  alt="Northline products laid out on a desk"
/>
```

Then add to `src/styles/index.css`:

```css
.hero__image {
  width: 100%;
  border-radius: var(--r-lg);
  margin-top: 2rem;
  aspect-ratio: 21 / 9;
  object-fit: cover;
}
```

Always write a real `alt` description — it is read aloud by screen readers and shown
if the image fails.

---

## 12. Where do I change X? — cheat-sheet

| I want to change… | Open this file | Look for |
|---|---|---|
| Product name, price, description | `src/data/products.json` | the product's `id` |
| **Add a product photo** | `src/data/products.json` | the `"image": ""` field |
| Add or remove a product | `src/data/products.json` | copy a whole `{ … }` block, give it a new `id` |
| Add a new category | `src/data/products.json` | just type a new `"category"` — the chip appears by itself |
| Currency or price format | `src/utils/format.js` | `formatPrice` |
| Site colours | `src/styles/index.css` | `:root { }` (light) and `[data-theme='dark'] { }` |
| Accent colour only | `src/styles/index.css` | `--accent:` |
| Fonts | `index.html` (the Google link) + `index.css` | `--display`, `--body`, `--mono` |
| Menu links | `src/components/Navbar.jsx` | the `<NavLink>` list |
| Footer text and links | `src/components/Footer.jsx` | — |
| Home page headline | `src/pages/Home.jsx` | `hero__title` |
| Number of featured products | `src/pages/Home.jsx` | `.slice(0, 4)` |
| How many products load at once | `src/pages/Products.jsx` | `const PAGE_SIZE = 8` |
| Sort options | `src/utils/filterProducts.js` | `SORT_OPTIONS` + `sortProducts` |
| What search looks at | `src/utils/filterProducts.js` | `searchProducts` |
| Search delay | `src/pages/Products.jsx` | `useDebounce(search, 200)` |
| Delivery cost / free-shipping limit | `src/pages/Cart.jsx` | `SHIPPING`, `FREE_OVER` |
| "Only N left" warning point | `src/pages/ProductDetails.jsx` | `product.stock < 10` |
| 404 page wording | `src/pages/NotFound.jsx` | — |
| About page text | `src/pages/About.jsx` | — |
| Add a whole new page | `src/pages/` + `src/App.jsx` | see section 13 |
| Browser tab titles | the page file | `useDocumentTitle('…')` |
| Site name in the tab | `src/hooks/useDocumentTitle.js` | the template string |

---

## 13. Common tasks, step by step

### Add a new product

1. Open `src/data/products.json`.
2. Copy an entire `{ … }` block including the braces.
3. Paste it before the closing `]`, and add a comma after the previous block.
4. Change **`id` to a number no other product has**.
5. Change the rest of the fields.
6. Save. It appears on the Products page immediately.

### Add a new category

Just use a new value in a product's `"category"` field:

```json
"category": "Lighting"
```

The filter chip, the count and the home-page tile all appear automatically, because
`getCategories()` reads the categories out of the data instead of a hardcoded list.

### Change the main colour

`src/styles/index.css`, near the top:

```css
:root {
  --accent: #2f5bff;      /* light mode */
}
[data-theme='dark'] {
  --accent: #6b8cff;      /* dark mode — slightly lighter so it stays readable */
}
```

Change both. Every button, link and highlight follows.

### Add a new page (e.g. Contact)

**Step 1** — create `src/pages/Contact.jsx`:

```jsx
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Contact() {
  useDocumentTitle('Contact');
  return (
    <section className="section section--top prose">
      <p className="eyebrow">Contact</p>
      <h1 className="section__title">Get in touch</h1>
      <p>Email us at hello@example.com</p>
    </section>
  );
}
```

**Step 2** — register it in `src/App.jsx`:

```jsx
import Contact from './pages/Contact';
…
<Route path="/contact" element={<Contact />} />
```

Put it **above** the `path="*"` line — the catch-all must always stay last.

**Step 3** — link to it in `src/components/Navbar.jsx`:

```jsx
<NavLink to="/contact" onClick={close}>Contact</NavLink>
```

### Add a new sort option

`src/utils/filterProducts.js`:

```js
export const SORT_OPTIONS = [
  …,
  { value: 'reviews', label: 'Most Reviewed' },   // 1. add the dropdown entry
];

export function sortProducts(products, sortBy) {
  const list = [...products];
  switch (sortBy) {
    …
    case 'reviews':                               // 2. add the matching rule
      return list.sort((a, b) => b.reviews - a.reviews);
  }
}
```

Nothing else to touch — the dropdown builds itself from `SORT_OPTIONS`.

### Connect a real server instead of the JSON file

In `src/pages/Products.jsx`, replace the fake-loading effect:

```jsx
useEffect(() => {
  setLoading(true);
  fetch('https://your-api.com/products')
    .then((res) => res.json())
    .then((data) => { setProducts(data); setLoading(false); })
    .catch(() => setLoading(false));
}, []);
```

As long as the server sends objects with the same field names, nothing else changes.

---

## 14. Glossary

| Term | Plain meaning |
|---|---|
| **Component** | A function that returns markup. The building block of React. |
| **Props** | Values passed into a component, like arguments to a function. |
| **State** | A value a component remembers. Changing it redraws the screen. |
| **Hook** | A function starting with `use…` that adds a capability to a component. |
| **`useState`** | Gives a component memory. |
| **`useEffect`** | Runs code *after* rendering — loading data, setting the title, timers. |
| **`useMemo`** | Caches an expensive calculation so it doesn't re-run needlessly. |
| **Context** | Shared memory available to every component without passing props. |
| **Route** | A URL, and the page that answers to it. |
| **JSX** | The HTML-looking syntax inside JavaScript files. |
| **Render** | React drawing (or redrawing) the screen. |
| **`.jsx` vs `.js`** | `.jsx` files contain JSX markup; `.js` files are plain logic. |
| **Vite** | The tool that runs the dev server and builds the final files. |
| **`npm`** | Installs libraries and runs the scripts in `package.json`. |

---

## 15. When something breaks

| What you see | Usual cause | Fix |
|---|---|---|
| Blank white page | Broken JSON — usually a trailing comma | Read the terminal, it names the line |
| `Cannot read properties of undefined` | Using a field that doesn't exist on a product | Check the spelling in products.json |
| Image not showing (drawing instead) | Wrong path | Must be `/images/x.jpg`, not `public/images/x.jpg` |
| Nothing happens when clicking a product | Used `<a href>` instead of `<Link to>` | Swap it back to `<Link>` |
| Cart empties on refresh | Private browsing blocks localStorage | Expected — test in a normal window |
| Changes not appearing | Dev server stopped | Re-run `npm run dev` |
| `command not found: npm` | Node.js isn't installed | Install Node 18+ |
| Works locally, 404 on the live site after refresh | Host isn't rewriting paths | See the deploy notes in README.md |

**Two habits worth forming**

1. Keep the browser console open (**F12**). React writes the real reason there, and it
   is almost always more precise than what you see on screen.
2. Change one thing, save, look. When five things change at once and the page breaks,
   you have five suspects instead of one.

---

*Guide written for the Northline Supply catalogue. If you change how something works,
update the matching row in section 12 so the next person is not misled.*
