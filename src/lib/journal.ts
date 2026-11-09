import type { BlogPost } from '@/data/blogData';
import { coldClimateGuides, GUIDE_HUB, VENEER_HUB } from '@/data/coldClimateGuides';

export type ReadingLanguage = 'en' | 'de' | 'ru';
export type JournalCollection = 'all' | 'cold-climate' | 'veneer';

export function journalPath(language: ReadingLanguage, collection: JournalCollection = 'all') {
  if (language === 'en') {
    return collection === 'veneer' ? VENEER_HUB : collection === 'cold-climate' ? GUIDE_HUB : '/blog';
  }
  return `/${language}/blog${collection === 'all' ? '' : `?collection=${collection}`}`;
}

export function isInCollection(post: BlogPost, collection: JournalCollection) {
  if (collection === 'all') return true;
  if (collection === 'cold-climate') return Boolean(post.guide);
  const guide = post.guide?.translationOf
    ? coldClimateGuides.find(item => item.slug === post.guide?.translationOf)
    : post.guide;
  return guide?.category === 'Veneer & Panels' || [
    'oblicovka-kamnem-kleevoy-navesnoy-fasad',
    'gibkiy-kamennyy-shpon-radiusnye-steny',
  ].includes(guide?.slug || '');
}

export function readingTime(value: string, language: ReadingLanguage) {
  const minutes = value.match(/\d+/)?.[0] || '3';
  return language === 'ru' ? `${minutes} мин` : language === 'de' ? `${minutes} Min.` : `${minutes} min read`;
}
