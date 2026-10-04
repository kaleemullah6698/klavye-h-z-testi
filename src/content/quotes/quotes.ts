import { ContentLanguage, QuoteItem } from '../../types';

export const TURKISH_QUOTES: QuoteItem[] = [
  {
    id: 'tr-quote-1',
    text: 'Hayatta en hakiki mürşit ilimdir, fendir. İlim ve fenden başka yol gösterici aramak gaflettir, cehalettir, delalettir.',
    author: 'Mustafa Kemal Atatürk',
    source: 'Nutuk & Vecizeler',
    language: 'tr',
    difficulty: 'medium',
  },
  {
    id: 'tr-quote-2',
    text: 'İlim ilim bilmektir, ilim kendin bilmektir. Sen kendini bilmezsin, ya nice okumaktır.',
    author: 'Yunus Emre',
    source: 'Divan',
    language: 'tr',
    difficulty: 'easy',
  },
  {
    id: 'tr-quote-3',
    text: 'Dünyada hayatın bir tek manası varsa o da sevmektir. Hatta mukabele edilmesini bile beklemeden sadece sevmek.',
    author: 'Sabahattin Ali',
    source: 'Kürk Mantolu Madonna',
    language: 'tr',
    difficulty: 'medium',
  },
  {
    id: 'tr-quote-4',
    text: 'Yazı yazmak bir nevi dünyayı yeniden inşa etmektir; her harf bir tuğla, her kelime bir sütundur.',
    author: 'Ahmet Hamdi Tanpınar',
    source: 'Saatleri Ayarlama Enstitüsü',
    language: 'tr',
    difficulty: 'medium',
  },
  {
    id: 'tr-quote-5',
    text: 'Bir insanı sevmekle başlar her şey. Burada her şey bir insanı sevmekle bitti.',
    author: 'Sait Faik Abasıyanık',
    source: 'Alemdağda Var Bir Yılan',
    language: 'tr',
    difficulty: 'easy',
  },
  {
    id: 'tr-quote-6',
    text: 'Yaşamak bir ağaç gibi tek ve hür ve bir orman gibi kardeşçesine, bu hasret bizim.',
    author: 'Nâzım Hikmet',
    source: 'Davet',
    language: 'tr',
    difficulty: 'medium',
  },
  {
    id: 'tr-quote-7',
    text: 'Zaman su gibi akıp giderken geride yalnızca bıraktığımız eserler ve yetiştirdiğimiz güzel nesiller kalır.',
    author: 'Ömer Seyfettin',
    source: 'Seçme Hikayeler',
    language: 'tr',
    difficulty: 'medium',
  },
  {
    id: 'tr-quote-8',
    text: 'Gözler kalbin aynasıdır derler; parmaklar ise aklın ve düşüncenin klavyedeki en sadık tercümanıdır.',
    author: 'Reşat Nuri Güntekin',
    source: 'Çalıkuşu',
    language: 'tr',
    difficulty: 'hard',
  },
  {
    id: 'tr-quote-9',
    text: 'Memleket isterim; gök mavi, dal yeşil, tarla sarı olsun; kuşların çiçeklerin diyarı olsun.',
    author: 'Cahit Sıtkı Tarancı',
    source: 'Otuz Beş Yaş',
    language: 'tr',
    difficulty: 'easy',
  },
  {
    id: 'tr-quote-10',
    text: 'Geleceğin temeli sabırla, sebatla ve her gün bir önceki günden daha iyi olma gayretiyle atılır.',
    author: 'Mehmet Âkif Ersoy',
    source: 'Safahat',
    language: 'tr',
    difficulty: 'medium',
  },
];

export const ENGLISH_QUOTES: QuoteItem[] = [
  {
    id: 'en-quote-1',
    text: 'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.',
    author: 'Jane Austen',
    source: 'Pride and Prejudice',
    language: 'en',
    difficulty: 'medium',
  },
  {
    id: 'en-quote-2',
    text: 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.',
    author: 'Ralph Waldo Emerson',
    source: 'Essays',
    language: 'en',
    difficulty: 'easy',
  },
  {
    id: 'en-quote-3',
    text: 'All that is gold does not glitter, not all those who wander are lost; the old that is strong does not wither.',
    author: 'J.R.R. Tolkien',
    source: 'The Fellowship of the Ring',
    language: 'en',
    difficulty: 'medium',
  },
  {
    id: 'en-quote-4',
    text: 'There is some good in this world, and it is worth fighting for, no matter how steep the climb.',
    author: 'J.R.R. Tolkien',
    source: 'The Two Towers',
    language: 'en',
    difficulty: 'easy',
  },
  {
    id: 'en-quote-5',
    text: 'The only way to achieve the impossible is to believe it is possible and take consistent deliberate action.',
    author: 'Lewis Carroll',
    source: 'Alice in Wonderland',
    language: 'en',
    difficulty: 'medium',
  },
  {
    id: 'en-quote-6',
    text: 'Do not go where the path may lead, go instead where there is no path and leave a trail.',
    author: 'Ralph Waldo Emerson',
    source: 'Selected Writings',
    language: 'en',
    difficulty: 'medium',
  },
];

export function getRandomQuote(language: ContentLanguage): QuoteItem {
  const pool = language === 'tr' ? TURKISH_QUOTES : ENGLISH_QUOTES;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}
