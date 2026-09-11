import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export { allRoutes, metaFor, ogFor, canonicalFor, schemasFor, SITE_URL } from './seo.js';

export function render(page) {
  return renderToString(<App initialPage={page} />);
}
