import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export { jobs, SITE_URL, buildJobPostingSchema } from './jobs.js';

export function render(page) {
  return renderToString(<App initialPage={page} />);
}
