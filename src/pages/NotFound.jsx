import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found');

  return (
    <section className="section section--top notfound">
      <p className="notfound__code">404</p>
      <h1 className="section__title">This page does not exist</h1>
      <p className="notfound__body">
        The address you followed is not part of this catalogue. It may be mistyped, or the
        page may have been removed.
      </p>
      <div className="notfound__actions">
        <Link className="btn btn--lg" to="/">Go to home</Link>
        <Link className="btn btn--lg btn--outline" to="/products">Browse products</Link>
      </div>
    </section>
  );
}
