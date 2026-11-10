import { renderToString } from 'react-dom/server';
import { Routes, Route } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import StoneGuides from '@/pages/StoneGuides';
import ProductDetails from '@/pages/ProductDetails';
import StoneForApplication from '@/pages/StoneForApplication';

export function renderSeoPage(path: string) {
  const context: { helmet?: any } = {};
  const body = renderToString(<HelmetProvider context={context}><StaticRouter location={path}><Navigation /><Routes>
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<BlogPost />} />
    <Route path="/:locale/blog" element={<Blog />} />
    <Route path="/:locale/blog/:slug" element={<BlogPost />} />
    <Route path="/guides/cold-climate-stone" element={<StoneGuides />} />
    <Route path="/thin-stone-veneer" element={<StoneGuides />} />
    <Route path="/products/:id" element={<ProductDetails />} />
    <Route path="/stone/:slug" element={<StoneForApplication />} />
  </Routes><Footer /></StaticRouter></HelmetProvider>);
  const helmet = context.helmet;
  return { body, head: [helmet.title, helmet.meta, helmet.link, helmet.script].map(value => value.toString()).join('\n'), language: path.startsWith('/de/') ? 'de' : path.startsWith('/ru/') ? 'ru' : 'en' };
}
