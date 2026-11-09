import { Link, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ChevronRight, Clock } from 'lucide-react';
import { blogPosts } from '@/data/blogData';
import SEO from '@/components/SEO';
import ReadingLanguageMenu from '@/components/ReadingLanguageMenu';
import JournalTopics from '@/components/JournalTopics';
import { absoluteUrl, blogPath, SITE_URL } from '@/lib/seo';
import { isInCollection, journalPath, readingTime, type JournalCollection, type ReadingLanguage } from '@/lib/journal';

const copyByLanguage = {
  en: {
    journal: 'The Stone Journal', home: 'Home', eyebrow: 'Knowledge & Insights', collection: 'From the Stone Journal',
    titles: { all: 'The Stone Journal', 'cold-climate': 'Stone for Cold Climates', veneer: 'Thin Stone Veneer' },
    descriptions: {
      all: 'Material guides, practical advice and design ideas for architects, builders and natural stone buyers.',
      'cold-climate': 'Explore stone selection, exterior detailing and winter care for projects in New England, the Great Lakes and other cold regions.',
      veneer: 'Guides to rigid natural stone veneer, flexible panels and custom patterns. Understand the materials, choose a design and prepare your project.',
    },
    quoteTitle: 'Need stone for your project?', quoteBody: 'Send drawings, quantity, destination and intended use. We can discuss samples, custom fabrication and a project quotation.', quote: 'Request a quote', read: 'Read article',
  },
  de: {
    journal: 'Das Steinjournal', home: 'Startseite', eyebrow: 'Wissen und Praxis', collection: 'Aus dem Steinjournal',
    titles: { all: 'Das Steinjournal', 'cold-climate': 'Stein für kalte Regionen', veneer: 'Dünne Steinverblender' },
    descriptions: {
      all: 'Ratgeber zu Naturstein, Gestaltung und Pflege für Planende, Bauunternehmen und Materialeinkauf.',
      'cold-climate': 'Naturstein für kalte Regionen auswählen, Fassadendetails abstimmen und die Winterpflege planen.',
      veneer: 'Starre Steinverblender, flexible Paneele und individuelle Muster: Materialien verstehen und das Projekt vorbereiten.',
    },
    quoteTitle: 'Naturstein für Ihr Projekt?', quoteBody: 'Senden Sie Zeichnungen, Menge, Lieferort und Nutzung. Wir besprechen Muster, Sonderanfertigung und ein projektbezogenes Angebot.', quote: 'Angebot anfragen', read: 'Weiterlesen',
  },
  ru: {
    journal: 'Журнал о камне', home: 'Главная', eyebrow: 'Материалы и практика', collection: 'Материалы журнала',
    titles: { all: 'Журнал о камне', 'cold-climate': 'Камень и холодный климат', veneer: 'Каменная облицовка' },
    descriptions: {
      all: 'Выбор натурального камня, архитектурные решения и практические рекомендации для проектирования, закупки и ухода.',
      'cold-climate': 'Как выбирать камень для холодного климата, продумывать фасадные узлы и организовывать зимний уход.',
      veneer: 'Жесткие каменные элементы, гибкие панели и индивидуальные рисунки: материалы и решения для вашего проекта.',
    },
    quoteTitle: 'Подбираете камень для проекта?', quoteBody: 'Пришлите чертежи, объем, место доставки и назначение. Обсудим образцы, индивидуальное изготовление и предложение по проекту.', quote: 'Запросить предложение', read: 'Читать статью',
  },
};

export default function Blog({ collection: requestedCollection }: { collection?: JournalCollection }) {
  const { locale } = useParams<{ locale?: string }>();
  const [searchParams] = useSearchParams();
  const language: ReadingLanguage = locale === 'de' || locale === 'ru' ? locale : 'en';
  const queryCollection = searchParams.get('collection');
  const collection = requestedCollection || (queryCollection === 'veneer' || queryCollection === 'cold-climate' ? queryCollection : 'all');
  const copy = copyByLanguage[language];
  const posts = blogPosts.filter(post => (post.language || 'en') === language && isInCollection(post, collection));
  const pagePath = language === 'en' ? journalPath(language, collection) : journalPath(language);
  const title = copy.titles[collection];
  const description = copy.descriptions[collection];
  const languageOptions = (['en', 'de', 'ru'] as const).map(value => ({ language: value, href: journalPath(value, collection) }));

  return <motion.main initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="min-h-screen bg-background" lang={language} data-journal-collection={collection}>
    <SEO
      title={title}
      description={description}
      language={language}
      url={absoluteUrl(pagePath)}
      keywords={language === 'ru' ? 'натуральный камень, кварцит, сланец, облицовка, холодный климат, камень на заказ' : language === 'de' ? 'Naturstein, Steinverblender, Sandstein, Winterpflege, Sonderanfertigung' : 'natural stone guides, stone veneer, quartzite, sandstone, cold climate stone'}
      structuredData={{
        '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, description,
        url: absoluteUrl(pagePath), inLanguage: language,
        publisher: { '@type': 'Organization', name: 'Roop Stone Impex', url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
        mainEntity: { '@type': 'ItemList', itemListElement: posts.map((post, index) => ({ '@type': 'ListItem', position: index + 1, url: absoluteUrl(blogPath(post)), name: post.title })) },
      }}
      breadcrumbs={[{ name: copy.home, url: SITE_URL }, { name: title, url: absoluteUrl(pagePath) }]}
    />

    <header className="container mx-auto max-w-6xl px-4 md:px-8 pt-28 md:pt-32">
      <div className="flex min-h-20 items-center justify-between gap-5 border-b border-border/25 pb-5" data-journal-utility>
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-muted-foreground min-w-0">
          <Link to={collection === 'all' ? '/' : journalPath(language)} className="hover:text-foreground transition-colors">{collection === 'all' ? copy.home : copy.journal}</Link>
          <ChevronRight size={13} className="shrink-0" aria-hidden="true" />
          <span className="text-foreground">{collection === 'all' ? copy.journal : title}</span>
        </nav>
        <ReadingLanguageMenu language={language} options={languageOptions} />
      </div>

      <div className="text-center max-w-3xl mx-auto pt-10 md:pt-12 pb-10 md:pb-12">
        <p className="text-[11px] sm:text-xs tracking-[0.24em] uppercase text-accent mb-4">{collection === 'all' ? copy.eyebrow : copy.collection}</p>
        <h1 className="text-4xl md:text-5xl font-light leading-tight tracking-tight mb-5">{title}</h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">{description}</p>
      </div>
      <JournalTopics language={language} collection={collection} />
    </header>

    <section aria-label={title} className="container mx-auto max-w-6xl px-4 md:px-8 pb-16 md:pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {posts.map(post => <article key={post.slug} className="group">
          <Link to={blogPath(post)} className="block">
            <div className="relative overflow-hidden rounded-lg aspect-[16/10] mb-5 bg-muted">
              <img src={post.image} alt={post.guide?.imageAlt || post.title} width="720" height="450" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute top-3 left-3 bg-background/95 text-[10px] sm:text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 rounded-sm">{post.category}</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground mb-3">
              <time dateTime={post.date} className="inline-flex items-center gap-1.5"><Calendar size={13} aria-hidden="true" />{new Date(`${post.date}T12:00:00Z`).toLocaleDateString(language === 'de' ? 'de-DE' : language === 'ru' ? 'ru-RU' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time>
              <span className="inline-flex items-center gap-1.5"><Clock size={13} aria-hidden="true" />{readingTime(post.readTime, language)}</span>
            </div>
            <h2 className="font-sans text-lg font-medium leading-snug mb-3 group-hover:text-accent transition-colors">{post.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
            <span className="inline-flex items-center gap-2 text-sm font-medium">{copy.read}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
          </Link>
        </article>)}
      </div>
    </section>

    <section className="py-16 md:py-20 px-4 md:px-8 bg-card border-t border-border/30">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-light mb-4">{copy.quoteTitle}</h2>
        <p className="text-muted-foreground mb-7 max-w-xl mx-auto leading-relaxed">{copy.quoteBody}</p>
        <Link to="/contact#query-form" className="inline-flex items-center gap-2 bg-accent text-black px-7 py-3.5 text-sm font-medium hover:bg-accent/90 transition-colors">{copy.quote}<ArrowRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  </motion.main>;
}
