import { Link } from 'react-router-dom';
import { Check, ChevronDown, Globe2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import type { ReadingLanguage } from '@/lib/journal';

const names = { en: 'English', de: 'Deutsch', ru: 'Русский' };

interface Props {
  language: ReadingLanguage;
  options: { language: ReadingLanguage; href: string }[];
  article?: boolean;
}

export default function ReadingLanguageMenu({ language, options, article = false }: Props) {
  const label = article
    ? { en: 'Article language', de: 'Artikelsprache', ru: 'Язык статьи' }[language]
    : { en: 'Reading language', de: 'Lesesprache', ru: 'Язык материалов' }[language];

  return <div className="shrink-0 text-right" data-reading-language>
    <span className="block text-[10px] sm:text-[11px] tracking-[0.1em] uppercase text-muted-foreground">{label}</span>
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label={`${label}: ${names[language]}`} className="inline-flex min-h-11 items-center justify-end gap-2 text-sm font-medium text-foreground rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background">
          <Globe2 size={15} className="text-muted-foreground" aria-hidden="true" />
          <span>{names[language]}</span>
          <ChevronDown size={14} className="text-muted-foreground" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={6} className="w-44 border-border/40 p-1.5 shadow-lg">
        {options.map(option => <DropdownMenuItem asChild key={option.language} className="cursor-pointer px-3 py-2.5 focus:bg-muted focus:text-foreground">
          <Link to={option.href} lang={option.language} hrefLang={option.language} aria-current={option.language === language ? 'page' : undefined} className="flex items-center justify-between gap-5">
            {names[option.language]}
            {option.language === language && <Check size={14} className="text-accent" aria-hidden="true" />}
          </Link>
        </DropdownMenuItem>)}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>;
}
