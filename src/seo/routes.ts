import { blogPosts } from '@/data/blogData';
import { products } from '@/data/products';
import { getAllApplicationSlugs, getAllComparisonSlugs, getAllExportSlugs } from '@/data/seoPages';
import { GUIDE_HUB, VENEER_HUB } from '@/data/coldClimateGuides';
import { blogPath } from '@/lib/seo';

export function getSeoRoutes() {
  const staticPaths = ['/', '/products', '/pricing', '/about', '/contact', '/incubator', '/apply', '/return-policy', '/blog', '/de/blog', '/ru/blog', GUIDE_HUB, VENEER_HUB];
  return [
    ...staticPaths.map(path => ({ path, lastmod: undefined as string | undefined })),
    ...products.map(p => ({ path: `/products/${p.id}`, lastmod: undefined })),
    ...getAllApplicationSlugs().map(p => ({ path: `/stone/${p.slug}`, lastmod: undefined })),
    ...getAllComparisonSlugs().map(p => ({ path: `/compare/${p.slug}`, lastmod: undefined })),
    ...getAllExportSlugs().map(p => ({ path: `/export/${p.slug}`, lastmod: undefined })),
    ...blogPosts.map(p => ({ path: blogPath(p), lastmod: p.updated || p.date })),
  ];
}
export const prerenderPaths = ['/blog', '/de/blog', '/ru/blog', GUIDE_HUB, VENEER_HUB, ...blogPosts.map(blogPath)];
export { blogPosts };
