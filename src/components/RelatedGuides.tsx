import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { coldClimateGuides, GUIDE_HUB } from '@/data/coldClimateGuides';
import { allGuides } from '@/data/blogData';
import { blogPath } from '@/lib/seo';

export default function RelatedGuides({ category, productId }: { category: string; productId?: string }) {
  const guides = coldClimateGuides.filter(g => g.stoneCategories.includes(category)).sort((a, b) => Number(Boolean(productId && b.productIds.includes(productId))) - Number(Boolean(productId && a.productIds.includes(productId)))).slice(0, 3);
  const regional = (['ru', 'de'] as const).map(language => ({ language, guides: allGuides.filter(g => g.language === language && g.stoneCategories.includes(category)).sort((a, b) => Number(Boolean(productId && b.productIds.includes(productId))) - Number(Boolean(productId && a.productIds.includes(productId)))).slice(0, 2) })).filter(group => group.guides.length);

  if (!guides.length && !regional.length) return null;

  return <section aria-label="Further reading" className="container mx-auto px-4 pb-12 md:pb-16" data-related-guides>
    <div className="border-t border-border/20 pt-8 md:pt-10 grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] gap-x-16 gap-y-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">From the Stone Journal</p>
        <h2 className="font-serif text-2xl md:text-[28px] font-normal tracking-wide leading-tight p-0 mb-3">Further reading</h2>
        <p className="text-sm font-normal text-muted-foreground leading-relaxed max-w-xs">Considered guidance on choosing, detailing and caring for natural stone.</p>
        <Link to={GUIDE_HUB} className="inline-flex min-h-11 items-center gap-2 mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background">
          View all stone guides <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>

      <div className="min-w-0">
        <ul className="divide-y divide-border/15 [&>li:first-child>a]:pt-0">
          {guides.map(g => <li key={g.slug}>
            <Link to={`/blog/${g.slug}`} className="group flex items-center justify-between gap-5 py-4 text-foreground/80 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background">
              <span className="text-[15px] md:text-base font-medium leading-relaxed">{g.title}</span>
              <ArrowRight size={14} className="shrink-0 text-muted-foreground/60 group-hover:text-accent transition-colors" aria-hidden="true" />
            </Link>
          </li>)}
        </ul>

        {regional.length > 0 && <details className="group/editions border-t border-border/15">
          <summary className="flex min-h-12 w-fit cursor-pointer list-none items-center gap-3 py-3 text-xs text-muted-foreground hover:text-foreground transition-colors [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background">
            Read in another language
            <ChevronDown size={13} className="group-open/editions:rotate-180 transition-transform" aria-hidden="true" />
          </summary>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 pt-2 pb-4">
            {regional.map(group => <nav key={group.language} lang={group.language} aria-label={group.language === 'ru' ? 'Руководства на русском языке' : 'Ratgeber auf Deutsch'}>
              <Link to={`/${group.language}/blog`} hrefLang={group.language} className="inline-flex min-h-8 items-center text-xs text-foreground/80 hover:text-foreground transition-colors">{group.language === 'ru' ? 'Русский' : 'Deutsch'}</Link>
              <ul className="space-y-3 mt-2 text-[13px] font-normal leading-relaxed text-muted-foreground">
                {group.guides.map(g => <li key={g.slug}><Link to={blogPath(g)} hrefLang={group.language} className="block hover:text-foreground transition-colors">{g.title}</Link></li>)}
              </ul>
            </nav>)}
          </div>
        </details>}
      </div>
    </div>
  </section>;
}
