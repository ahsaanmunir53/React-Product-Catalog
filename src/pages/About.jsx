import useDocumentTitle from '../hooks/useDocumentTitle';
import products from '../data/products.json';

export default function About() {
  useDocumentTitle('About');
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <section className="section section--top prose">
      <p className="eyebrow">About</p>
      <h1 className="section__title">How this catalogue is put together</h1>

      <p>
        Northline Supply is a small catalogue of {products.length} products across{' '}
        {categories.length} categories. Nothing is listed because a brand paid to be here.
        Each entry names the specification that decides the purchase — impedance, litres,
        watts, water resistance — and leaves the marketing adjectives out.
      </p>

      <h2>What gets listed</h2>
      <ul>
        <li><strong>It has to be repairable or replaceable in part.</strong> Detachable cables, hot-swap switches, standard mounts.</li>
        <li><strong>The specification has to be honest.</strong> Rated capacity, not peak capacity. Typical battery life, not laboratory battery life.</li>
        <li><strong>It has to survive being carried.</strong> Everything here is expected to live in a bag, not on a shelf.</li>
      </ul>

      <h2>About this build</h2>
      <p>
        This is a front-end project built with React and React Router. The catalogue is
        stored as a single JSON file and rendered through reusable components, with search,
        category filtering, sorting and load-more paging handled in React state. Cart,
        wishlist and theme preferences persist in <code>localStorage</code>, so a refresh
        keeps them.
      </p>

      <h2>Stack</h2>
      <ul className="stacklist">
        <li><span>React 18</span> functional components and hooks</li>
        <li><span>React Router 6</span> five routes including a 404 catch-all</li>
        <li><span>Vite</span> dev server and production build</li>
        <li><span>Context API</span> cart, wishlist and theme state</li>
        <li><span>CSS custom properties</span> light and dark themes from one token set</li>
      </ul>
    </section>
  );
}
