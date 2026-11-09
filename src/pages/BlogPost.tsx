import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts } from '@/data/blogData';
import { blogContent } from '@/data/blogContent';
import { products } from '@/data/products';
import { SITE_URL, absoluteUrl, blogPath } from '@/lib/seo';
import SEO from '@/components/SEO';
import ReadingLanguageMenu from '@/components/ReadingLanguageMenu';
import { journalPath, readingTime } from '@/lib/journal';

const labels = {
  en: { back: 'The Stone Journal', summary: 'At a glance', contents: 'In this guide', questions: 'Common questions', sources: 'Sources and further reading', related: 'Related reading', products: 'Explore the materials', quote: 'Discuss your stone specification', quoteText: 'Send your drawings, destination, preferred construction and finish. We will discuss samples, custom dimensions and the documentation needed for your project.', cta: 'Request a project quote', hub: 'Cold-climate stone guides', veneer: 'Stone veneer and custom panels' },
  de: { back: 'Naturstein-Ratgeber', summary: 'Kurz erklärt', contents: 'In diesem Ratgeber', questions: 'Häufige Fragen', sources: 'Quellen und weiterführende Informationen', related: 'Weitere Ratgeber', products: 'Materialien entdecken', quote: 'Ihre Naturstein-Spezifikation besprechen', quoteText: 'Senden Sie Zeichnungen, Lieferort, gewünschte Konstruktion und Oberfläche. Wir besprechen Muster, Sondermaße und die benötigten Unterlagen.', cta: 'Projektangebot anfragen', hub: 'Naturstein für kalte Regionen', veneer: 'Steinverblender und Sonderpaneele' },
  ru: { back: 'Руководства по натуральному камню', summary: 'Кратко', contents: 'В этом руководстве', questions: 'Частые вопросы', sources: 'Источники и дополнительные материалы', related: 'Другие руководства', products: 'Посмотреть материалы', quote: 'Обсудим спецификацию камня', quoteText: 'Пришлите чертежи, место доставки, желаемую конструкцию и обработку. Обсудим образцы, индивидуальные размеры и необходимые документы.', cta: 'Запросить предложение', hub: 'Камень для холодного климата', veneer: 'Облицовка и панели на заказ' },
};

export default function BlogPost() {
  const { slug, locale } = useParams<{ slug: string; locale?: string }>();
  const post = blogPosts.find(p => p.slug === slug && (p.language || 'en') === (locale || 'en'));
  const rawContent = post ? blogContent[post.slug] : undefined;
  if (!post || !rawContent) return <main className="min-h-screen pt-40 px-4 text-center"><SEO title="Article not found" noindex /><h1 className="text-3xl mb-6">Article not found</h1><Link to="/blog">Back to the journal</Link></main>;
  const lang = post.language || 'en';
  const text = labels[lang];
  const guide = post.guide;
  const path = blogPath(post);
  const family = guide?.translationOf || post.slug;
  const editions = blogPosts.filter(p => p.slug === family || p.guide?.translationOf === family);
  const defaultEdition = editions.find(p => p.slug === family) || post;
  const alternates = editions.length > 1 ? [...editions.map(p => ({ language: p.language || 'en', url: blogPath(p) })), { language: 'x-default', url: blogPath(defaultEdition) }] : [];
  const toc: { id: string; title: string }[] = [];
  const content = rawContent.replace(/<h2(?: id="([^"]+)")?>(.*?)<\/h2>/g, (_, existingId, heading) => {
    const id = existingId || `section-${toc.length + 1}`;
    toc.push({ id, title: heading.replace(/<[^>]*>/g, '') });
    return `<h2 id="${id}" class="scroll-mt-28">${heading}</h2>`;
  });
  const faqText = guide?.faqs.map(f => `${f.question} ${f.answer}`).join(' ') || '';
  const wordCount = `${content.replace(/<[^>]*>/g, ' ')} ${guide?.summary || ''} ${faqText}`.split(/\s+/).filter(Boolean).length;
  const related = blogPosts.filter(p => p.slug !== post.slug && (p.language || 'en') === lang).sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category)).slice(0, 3);
  const relatedProducts = (guide?.productIds || []).map(id => products.find(p => p.id === id)).filter(Boolean);
  const date = new Date(`${post.date}T12:00:00Z`).toLocaleDateString(lang === 'de' ? 'de-DE' : lang === 'ru' ? 'ru-RU' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  const schema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': `${absoluteUrl(path)}#article`,
    headline: post.title, description: post.metaDescription, image: absoluteUrl(post.image),
    author: { '@type': 'Organization', name: post.author, url: `${SITE_URL}/about` },
    publisher: { '@type': 'Organization', name: 'Roop Stone Impex', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
    datePublished: `${post.date}T12:00:00+05:30`, dateModified: `${post.updated || post.date}T12:00:00+05:30`,
    wordCount, inLanguage: lang, articleSection: post.category, keywords: post.keywords,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
    ...(guide ? { abstract: guide.summary, citation: guide.sources.map(s => s.url) } : {}),
  };
  return <main className="min-h-screen bg-background" lang={lang}>
    <SEO title={post.title} description={post.metaDescription} keywords={post.keywords} image={post.image} imageAlt={guide?.imageAlt || post.title} url={absoluteUrl(path)} type="article" language={lang} alternates={alternates} structuredData={schema} breadcrumbs={[{ name: 'Home', url: SITE_URL }, { name: text.back, url: absoluteUrl(lang === 'en' ? '/blog' : `/${lang}/blog`) }, { name: post.title, url: absoluteUrl(path) }]} />
    <header className="container mx-auto max-w-4xl px-5 pt-32 pb-10">
      <div className="flex min-h-20 items-center justify-between gap-5 border-b border-border/25 pb-5 mb-9">
        <Link to={journalPath(lang)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground min-w-0"><ArrowLeft size={16} className="shrink-0" />{text.back}</Link>
        {editions.length > 1 && <ReadingLanguageMenu language={lang} article options={editions.map(edition => ({ language: edition.language || 'en', href: blogPath(edition) }))} />}
      </div>
      <p className="text-xs uppercase tracking-[0.18em] text-accent mb-4">{post.category}</p>
      <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-6">{post.title}</h1>
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground"><span>{post.author}</span><time dateTime={post.date} className="inline-flex gap-1.5 items-center"><Calendar size={15} />{date}</time><span className="inline-flex gap-1.5 items-center"><Clock size={15} />{readingTime(post.readTime, lang)}</span></div>
    </header>
    <figure className="container mx-auto max-w-5xl px-5 mb-12"><img src={post.image} alt={guide?.imageAlt || post.title} width="1400" height="600" fetchPriority="high" className="w-full aspect-[21/9] rounded-xl object-cover" /></figure>
    <div className="container mx-auto max-w-3xl px-5">
      {guide && <section className="rounded-xl border border-accent/30 bg-accent/5 p-6 mb-8"><h2 className="text-xs tracking-widest uppercase text-accent mb-3">{text.summary}</h2><p className="text-base md:text-lg leading-relaxed">{guide.summary}</p></section>}
      <nav aria-label={text.contents} className="border-y border-border py-6 mb-10"><h2 className="font-medium mb-3">{text.contents}</h2><ol className="space-y-2 text-sm text-muted-foreground">{toc.map((h, i) => <li key={h.id}><a href={`#${h.id}`} className="hover:text-accent">{i + 1}. {h.title}</a></li>)}</ol></nav>
      <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:font-normal prose-headings:leading-snug prose-h2:text-2xl prose-h2:mt-12 prose-p:leading-relaxed prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-table:text-sm prose-th:text-left prose-td:py-3" dangerouslySetInnerHTML={{ __html: content }} />
      {guide && <>
        <section className="mt-12 border-t border-border pt-8"><h2 className="font-serif text-2xl mb-6">{text.questions}</h2><div className="space-y-6">{guide.faqs.map(f => <div key={f.question}><h3 className="font-medium mb-2">{f.question}</h3><p className="text-muted-foreground leading-relaxed">{f.answer}</p></div>)}</div></section>
        <section className="my-10 rounded-xl bg-card border border-border p-6"><h2 className="font-medium mb-3">{text.sources}</h2><ul className="space-y-2 text-sm text-muted-foreground">{guide.sources.map(s => <li key={s.url}><a href={s.url} className="underline underline-offset-4 hover:text-accent">{s.title}</a></li>)}</ul></section>
        <div className="flex flex-wrap gap-3 text-sm mb-12"><Link className="underline underline-offset-4" to={journalPath(lang, 'cold-climate')}>{text.hub}</Link><Link className="underline underline-offset-4" to={journalPath(lang, 'veneer')}>{text.veneer}</Link></div>
      </>}
    </div>
    {relatedProducts.length > 0 && <section className="container mx-auto max-w-5xl px-5 py-12"><h2 className="font-serif text-2xl mb-6">{text.products}</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-5">{relatedProducts.map(p => <Link key={p!.id} to={`/products/${p!.id}`} className="group"><img src={p!.image} alt={p!.name} width="360" height="260" loading="lazy" className="aspect-[4/3] w-full object-cover rounded-lg mb-3" /><h3 className="text-sm group-hover:text-accent">{p!.name}</h3></Link>)}</div></section>}
    <section className="container mx-auto max-w-4xl px-5 py-12"><div className="bg-card border border-border rounded-xl p-8 md:p-12 text-center"><h2 className="font-serif text-2xl md:text-3xl mb-4">{text.quote}</h2><p className="text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">{text.quoteText}</p><Link to="/contact#query-form" className="inline-flex gap-2 items-center bg-accent text-black px-7 py-3 rounded-full font-medium">{text.cta}<ArrowRight size={18} /></Link></div></section>
    <section className="container mx-auto max-w-6xl px-5 py-16"><h2 className="font-serif text-2xl mb-8">{text.related}</h2><div className="grid md:grid-cols-3 gap-8">{related.map(p => <Link key={p.slug} to={blogPath(p)}><img src={p.image} alt={p.guide?.imageAlt || p.title} width="600" height="360" loading="lazy" className="aspect-[16/10] w-full object-cover rounded-lg mb-4" /><p className="text-xs text-accent mb-2">{p.category}</p><h3 className="text-lg leading-snug">{p.title}</h3></Link>)}</div></section>
  </main>;
}
