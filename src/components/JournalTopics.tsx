import { Link } from 'react-router-dom';
import { journalPath, type JournalCollection, type ReadingLanguage } from '@/lib/journal';

export default function JournalTopics({ language, collection }: { language: ReadingLanguage; collection: JournalCollection }) {
  const labels = {
    en: ['All articles', 'Cold climates', 'Stone veneer'],
    de: ['Alle Artikel', 'Kaltes Klima', 'Steinverblender'],
    ru: ['Все статьи', 'Холодный климат', 'Облицовка'],
  }[language];
  const collections: JournalCollection[] = ['all', 'cold-climate', 'veneer'];
  return <nav aria-label={{ en: 'Article topics', de: 'Artikelthemen', ru: 'Темы статей' }[language]} data-journal-topics className="grid grid-cols-3 sm:flex sm:justify-center border-b border-border/30 mb-10 sm:mb-12">
    {collections.map((topic, index) => <Link key={topic} to={journalPath(language, topic)} aria-current={collection === topic ? 'page' : undefined} className={`flex min-h-14 items-center justify-center px-2 sm:px-7 py-3 text-[13px] sm:text-sm leading-snug text-center border-b-2 transition-colors ${collection === topic ? 'border-accent text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
      {labels[index]}
    </Link>)}
  </nav>;
}
