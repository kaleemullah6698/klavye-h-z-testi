/**
 * Authentic Turkish word list
 * Curated from high-frequency Turkish text, literature, and news corpora.
 */
export const TURKISH_COMMON_WORDS: string[] = [
  'bir', 'bu', 've', 'için', 'da', 'de', 'çok', 'o', 'ben', 'ile',
  'ne', 'var', 'gibi', 'daha', 'kadar', 'sonra', 'ama', 'kendi', 'en', 'her',
  'diye', 'zaman', 'şey', 'oldu', 'büyük', 'gün', 'yok', 'ancak', 'biz', 'böyle',
  'önce', 'sen', 'bunu', 'başka', 'olur', 'bana', 'bütün', 'şimdi', 'yeni', 'hiç',
  'insan', 'iki', 'üç', 'dört', 'beş', 'ilk', 'yapmak', 'gelen', 'yer', 'küçük',
  'iyi', 'neden', 'nasıl', 'güzel', 'ayrıca', 'biri', 'buna', 'artık', 'olduğu', 'tüm',
  'birlikte', 'çünkü', 'olarak', 'doğru', 'bile', 'öyle', 'tek', 'aynı', 'son', 'böylece',
  'iş', 'yıl', 'dünya', 'onun', 'yüzden', 'üzerinde', 'göre', 'karşı', 'arasında', 'içinde',
  'durum', 'kullanılan', 'olan', 'zamanla', 'hayat', 'insanlar', 'çocuk', 'kadın', 'erkek', 'yol',
  'su', 'el', 'göz', 'baş', 'gece', 'sabah', 'akşam', 'ev', 'okul', 'kitap',
  'kalem', 'masa', 'kapı', 'pencere', 'deniz', 'gök', 'yıldız', 'güneş', 'hava', 'toprak',
  'ağaç', 'çiçek', 'kuş', 'şehir', 'ülke', 'dil', 'söz', 'cümle', 'yazı', 'klavye',
  'ekran', 'bilgi', 'fikir', 'düşünce', 'akıl', 'gönül', 'sevgi', 'dost', 'arkadaş', 'aile',
  'çalışma', 'başarı', 'hedef', 'hız', 'zamanlama', 'dakika', 'saniye', 'doğruluk', 'kelime', 'harf',
  'adım', 'ses', 'renk', 'ışık', 'yürek', 'kuvvet', 'güç', 'kolay', 'zor', 'tatlı',
  'derin', 'açık', 'kapalı', 'sıcak', 'soğuk', 'hızlı', 'yavaş', 'temiz', 'aydınlık', 'sessiz',
  'özgür', 'mutlu', 'huzur', 'umut', 'sabır', 'cesaret', 'güven', 'değer', 'emek', 'saygı',
  'anlamak', 'dinlemek', 'öğrenmek', 'gelişmek', 'paylaşmak', 'üretmek', 'yürümek', 'koşmak', 'bakmak', 'görmek',
  'bilmek', 'bulmak', 'almak', 'vermek', 'gelmek', 'gitmek', 'başlamak', 'bitirmek', 'taşımak', 'korumak',
  'yaşamak', 'anlatmak', 'okumak', 'yazmak', 'düşünmek', 'hissetmek', 'sevmek', 'unutmak', 'hatırlamak', 'inanmak',
  'öğretmen', 'öğrenci', 'bilim', 'sanat', 'edebiyat', 'kültür', 'tarih', 'gelecek', 'hafıza', 'rüya',
  'gerçek', 'doğa', 'orman', 'dağ', 'nehir', 'yağmur', 'rüzgar', 'bahar', 'yaz', 'sonbahar',
  'kış', 'mavi', 'yeşil', 'kırmızı', 'beyaz', 'siyah', 'sarı', 'altın', 'gümüş', 'aydın',
  'sağlık', 'can', 'nefes', 'ömür', 'fayda', 'fark', 'seçim', 'karar', 'yolculuk', 'macera',
  'keşif', 'mucize', 'şans', 'fırsat', 'deneyim', 'tecrübe', 'alışkanlık', 'yetenek', 'beceri', 'ustalık',
  'çaba', 'azim', 'inanç', 'samimiyet', 'nezaket', 'merhamet', 'adalet', 'eşitlik', 'barış', 'dayanışma',
  'özlem', 'coşku', 'heyecan', 'dinginlik', 'dingin', 'berraklık', 'engin', 'sonsuz', 'özgün', 'parlak',
  'özellik', 'yöntem', 'teknik', 'sistem', 'düzen', 'uyum', 'ahenk', 'ritim', 'tempo', 'denge'
];

export interface WordGenerationOptions {
  punctuation?: boolean;
  numbers?: boolean;
}

const PUNCTUATIONS = ['.', ',', '!', '?', ';', ':', '-', '...', '"'];

/**
 * Returns a randomized list of words of given count with optional punctuation and numbers.
 */
export function getRandomTurkishWords(
  count = 50,
  options?: WordGenerationOptions
): string[] {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    // If numbers enabled, occasionally insert a number
    if (options?.numbers && Math.random() < 0.15) {
      const num = Math.floor(Math.random() * 999) + 1;
      result.push(num.toString());
      continue;
    }

    const randomIndex = Math.floor(Math.random() * TURKISH_COMMON_WORDS.length);
    let word = TURKISH_COMMON_WORDS[randomIndex];

    if (options?.punctuation) {
      // 20% chance of punctuation
      const pRand = Math.random();
      if (pRand < 0.08) {
        word = word + ',';
      } else if (pRand < 0.16) {
        word = word + '.';
      } else if (pRand < 0.20) {
        word = `"${word}"`;
      } else if (pRand < 0.23) {
        word = word + '?';
      } else if (pRand < 0.25) {
        word = word + '!';
      }
    }

    result.push(word);
  }
  return result;
}
