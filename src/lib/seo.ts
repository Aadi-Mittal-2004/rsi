export const SITE_URL = 'https://www.roopstoneimpex.in';
export function absoluteUrl(value = '/'): string {
  return new URL(value, SITE_URL).href;
}
export function canonicalUrl(value: string): string {
  const parsed = new URL(value, SITE_URL);
  const path = parsed.pathname === '/' ? '/' : parsed.pathname.replace(/\/+$/, '');
  return `${SITE_URL}${path}`;
}
export function blogPath(post: { slug: string; language?: string }): string {
  return `${post.language && post.language !== 'en' ? `/${post.language}` : ''}/blog/${post.slug}`;
}
