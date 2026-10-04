import React, { useState } from 'react';
import {
  BookOpen,
  Keyboard,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { InterfaceLocale, KeyboardLayoutName, TestDuration } from '../../types';
import { useTranslation } from '../../messages/i18n';

interface SeoPagesProps {
  view: 'guide' | 'layouts' | 'articles';
  locale: InterfaceLocale;
  onStartTestWithConfig: (duration?: TestDuration, layout?: KeyboardLayoutName) => void;
}

export const SeoPages: React.FC<SeoPagesProps> = ({
  view,
  locale,
  onStartTestWithConfig,
}) => {
  const t = useTranslation(locale);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedArticle, setSelectedArticle] = useState<number>(0);

  const articles = [
    {
      id: 0,
      title:
        locale === 'tr'
          ? 'MonkeyType Alternatifleri 2026: Türkçe Destekli Hız Testi'
          : 'Monkeytype Alternatives 2026: Turkish Supported Typing Platforms',
      badge: 'Karşılaştırma',
      date: '30 Eylül 2026',
      readTime: '4 dk',
      content: (
        <div className="space-y-4 text-[#e4e8f1]/80 leading-relaxed text-sm">
          <p>
            Monkeytype ve TypingFastest dünya genelinde minimalist arayüzü ve akıcı yazma motoruyla klavye tutkunlarının en çok tercih ettiği platformlardan biri haline geldi. Ancak Türk kullanıcılar için Monkeytype gibi global araçlarda Türkçe karakter optimizasyonu (`ç, ğ, ı, İ, ö, ş, ü`) ve özellikle Türkçe F klavye düzeni çoğu zaman ikinci planda kalmaktadır.
          </p>
          <h3 className="text-base font-bold text-[#e4e8f1] font-sans mt-3">
            Neden Yerli ve Türkçe Optimize Bir Hız Testi Gerekli?
          </h3>
          <p>
            Türkçe, sondan eklemeli yapısı ve ses uyumu kuralları nedeniyle İngilizceye göre çok farklı bir hece ritmine sahiptir. Klavye Hız Testi platformumuz;
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#e4e8f1]/80">
            <li>
              <strong>Türkçe Q ve Türkçe F</strong> klavye standartlarına (TS 2117) tam uyumlu canlı tuş haritası sunar.
            </li>
            <li>
              Büyük <strong>'İ'</strong> ve noktasız <strong>'ı'</strong> gibi Türk alfabesine özgü harf karşılaştırmalarını tarayıcı dilinden bağımsız olarak %100 hatasız değerlendirir.
            </li>
            <li>
              DOM doğrudan işleme motoru ile sıfır gecikme (zero input latency) sağlayarak 60+ FPS hassasiyetinde vuruş kaydeder.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 1,
      title:
        locale === 'tr'
          ? 'Klavye Hızı Nasıl Artırılır? Bilimsel 7 İpucu'
          : 'How to Increase Typing Speed: 7 Evidence-Based Tips',
      badge: 'Eğitim',
      date: '28 Eylül 2026',
      readTime: '5 dk',
      content: (
        <div className="space-y-4 text-[#e4e8f1]/80 leading-relaxed text-sm">
          <p>
            Dakikada 40 kelimeden 80+ kelimeye çıkmak yalnızca daha hızlı tuşlara basmakla değil, kas hafızasını doğru inşa etmek ve gereksiz kas gerginliğini ortadan kaldırmakla mümkündür.
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-[#0a0e17]/80 border border-[#334155]">
              <h4 className="font-bold text-[#00e5ff] text-sm">1. Klavyeye Bakma Alışkanlığını Kesin Olarak Bırakın</h4>
              <p className="text-xs text-slate-200 mt-1">Klavyeye baktığınız her an gözlerinizin odak mesafesi değişir ve beyniniz satır takibini kaybeder. F ve J tuşlarındaki çıkıntıları referans alarak gözlerinizi yalnızca ekrana sabitleyin.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0a0e17]/80 border border-[#334155]">
              <h4 className="font-bold text-[#22c55e] text-sm">2. Hızı Değil, %96 Üzeri Doğruluğu Hedefleyin</h4>
              <p className="text-xs text-slate-200 mt-1">Hata yaptığınızda geri silme (Backspace) tuşuna basmak en az 3-4 saniyelik net WPM kaybına yol açar. Yavaş fakat hatasız yazmak, aceleyle yanlış yazmaktan her zaman daha yüksek WPM üretir.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0a0e17]/80 border border-[#334155]">
              <h4 className="font-bold text-[#a855f7] text-sm">3. Ritim ve Tutarlılık (Consistency) Geliştirin</h4>
              <p className="text-xs text-slate-200 mt-1">Metronom gibi sabit tempolu bir tuş ritmi, düzensiz hız patlamalarından çok daha az zihinsel yorgunluk yaratır.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title:
        locale === 'tr'
          ? 'Türk Q ve Türk F Klavye Farkı: Hangisi Daha Hızlı?'
          : 'Turkish Q vs Turkish F Keyboard: Which is Faster?',
      badge: 'Analiz',
      date: '25 Eylül 2026',
      readTime: '6 dk',
      content: (
        <div className="space-y-4 text-slate-200 leading-relaxed text-sm">
          <p>
            Türkiye’de bilgisayarların büyük çoğunluğunda Türkçe Q klavye kullanılsa da, dünya daktilo ve klavye hız şampiyonalarında Türkiye’ye rekorlar getiren düzen <strong>Türkçe F klavyedir</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-[#0a0e17]/80 border border-[#334155]">
              <span className="font-bold text-[#00e5ff] block mb-1">Türkçe F Klavye (TS 2117)</span>
              <p className="text-slate-200">1955 yılında İhsan Sıtkı Yener tarafından Türkçedeki 30.000 kelimenin harf frekansı ölçülerek geliştirilmiştir. Türkçede en sık kullanılan harfler (`A, E, İ, K, L, M, T`) en güçlü parmakların altına yerleştirilmiştir.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0a0e17]/80 border border-[#334155]">
              <span className="font-bold text-[#a855f7] block mb-1">Türkçe Q Klavye</span>
              <p className="text-slate-200">1870'lerde İngilizce daktiloların mekanik kollarının birbirine çarpmasını engellemek için tasarlanan QWERTY düzenine Türkçe harflerin kenarlara eklenmiş halidir. Küresel yazılım ekosistemi standardıdır.</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-8 space-y-10 animate-in fade-in duration-300">
      {/* VIEW: ON PARMAK REHBERİ */}
      {view === 'guide' && (
        <section className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#334155] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0284c7] text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white font-sans">
                {locale === 'tr' ? 'On Parmak Klavye Rehberi' : 'Touch Typing Mastery Guide'}
              </h2>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                {locale === 'tr'
                  ? 'Doğru duruş, temel sıra yerleşimi ve kas hafızası teknikleri'
                  : 'Correct posture, home-row anchor points, and muscle memory training'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#0a0e17] border border-[#334155] space-y-2">
              <span className="font-bold text-sky-400 text-sm block">
                {locale === 'tr' ? '1. Ev Sırası (Home Row) Yerleşimi' : '1. Home Row Anchor Position'}
              </span>
              <p className="text-slate-300 leading-relaxed font-normal">
                {locale === 'tr'
                  ? 'Sol el parmaklarınız A - S - D - F, sağ el parmaklarınız ise J - K - L - Ş tuşlarının üzerine rahatça oturmalıdır. F ve J tuşlarındaki küçük kabartılar, gözünüzü ekrandan ayırmadan ellerinizi merkezlemenizi sağlar.'
                  : 'Left hand fingers rest on A-S-D-F; right hand rests on J-K-L-;. The small tactile notches on F and J anchor your hands without glancing.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0a0e17] border border-[#334155] space-y-2">
              <span className="font-bold text-emerald-400 text-sm block">
                {locale === 'tr' ? '2. Ergonomik Oturuş ve Bilek Açısı' : '2. Ergonomic Wrist & Screen Posture'}
              </span>
              <p className="text-slate-300 leading-relaxed font-normal">
                {locale === 'tr'
                  ? 'Bileklerinizi masa tablasına sertçe yaslamayın; parmaklar tuşların üzerine kemer şeklinde kavisli düşmelidir. Ekran göz hizasından 15-20 derece aşağıda olmalı, omurganız dik durmalıdır.'
                  : 'Keep wrists elevated and gently hovering above the desk. Fingers should be lightly curved like holding a tennis ball.'}
              </p>
            </div>
          </div>

          {/* Quick CTA to start test */}
          <div className="p-5 rounded-2xl bg-[#0a0e17] border border-[#334155] flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-bold text-white text-sm block">
                {locale === 'tr' ? 'Hemen Parmaklarınızı Test Edin' : 'Test Your Finger Speed Right Now'}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {locale === 'tr'
                  ? '60 saniyelik Türkçe test ile mevcut WPM hızınızı anında öğrenin.'
                  : 'Start a 60-second test to discover your baseline WPM.'}
              </span>
            </div>
            <button
              onClick={() => onStartTestWithConfig(60, 'tr-q')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium text-xs transition-colors"
            >
              <span>{locale === 'tr' ? '60s Testi Başlat' : 'Start 60s Test'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* VIEW: KLAVYE DÜZENLERİ */}
      {view === 'layouts' && (
        <section className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#334155] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0284c7] text-white flex items-center justify-center">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white font-sans">
                {locale === 'tr' ? 'Klavye Düzenleri ve Standartlar' : 'Keyboard Layouts & Standards'}
              </h2>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                {locale === 'tr'
                  ? 'Türkçe Q, Türkçe F (TS 2117) ve Uluslararası QWERTY karşılaştırması'
                  : 'Detailed breakdown of Turkish Q, Turkish F (TS 2117), and English QWERTY'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#0a0e17]/80 border border-[#334155] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30">
                  Türkçe Q Klavye
                </span>
                <h4 className="text-sm font-bold text-[#e4e8f1] mt-1">
                  En Yaygın Türkiye Standardı
                </h4>
                <p className="text-xs text-slate-200 mt-1 max-w-xl font-normal">
                  Türkiye'deki neredeyse tüm dizüstü ve masaüstü klavyelerinde fabrika çıkışı gelen düzendir. Sağ tarafta Ğ, Ü, Ş, İ, Ö, Ç tuşları yer alır.
                </p>
              </div>
              <button
                onClick={() => onStartTestWithConfig(60, 'tr-q')}
                className="px-4 py-2 rounded-xl bg-[#111827] hover:bg-[#1a2332] text-[#e4e8f1] text-xs font-semibold border border-[#334155] hover:border-[#00e5ff]/40 transition-all shrink-0"
              >
                {locale === 'tr' ? 'Türkçe Q ile Test Yap' : 'Test Turkish Q'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#0a0e17]/80 border border-[#334155] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/30">
                  Türkçe F Klavye (TS 2117)
                </span>
                <h4 className="text-sm font-bold text-[#e4e8f1] mt-1">
                  Bilimsel Milli Hız Standardı
                </h4>
                <p className="text-xs text-slate-200 mt-1 max-w-xl font-normal">
                  Türkçe metin yazımında parmak yükü dengeli olarak iki ele dağıtılır (%49 sol el, %51 sağ el). Dünya şampiyonu Türk zabıt katipleri ve daktilograflar bu düzeni kullanır.
                </p>
              </div>
              <button
                onClick={() => onStartTestWithConfig(60, 'tr-f')}
                className="px-4 py-2 rounded-xl bg-[#111827] hover:bg-[#1a2332] text-[#e4e8f1] text-xs font-semibold border border-[#334155] hover:border-[#00e5ff]/40 transition-all shrink-0"
              >
                {locale === 'tr' ? 'Türkçe F ile Test Yap' : 'Test Turkish F'}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#0a0e17]/80 border border-[#334155] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#a855f7]/15 text-[#a855f7] border border-[#a855f7]/30">
                  İngilizce QWERTY
                </span>
                <h4 className="text-sm font-bold text-[#e4e8f1] mt-1">
                  Küresel Yazılım ve Kodlama Standardı
                </h4>
                <p className="text-xs text-slate-200 mt-1 max-w-xl font-normal">
                  Yazılım geliştiriciler ve İngilizce yazışma yapan profesyoneller için standart köşeli parantezler, noktalı virgül ve özel karakter ergonomisi sağlar.
                </p>
              </div>
              <button
                onClick={() => onStartTestWithConfig(60, 'en-qwerty')}
                className="px-4 py-2 rounded-xl bg-[#111827] hover:bg-[#1a2332] text-[#e4e8f1] text-xs font-semibold border border-[#334155] hover:border-[#00e5ff]/40 transition-all shrink-0"
              >
                {locale === 'tr' ? 'QWERTY ile Test Yap' : 'Test QWERTY'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* VIEW: MAKALELER */}
      {view === 'articles' && (
        <section className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#334155] shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0284c7] text-white flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#e4e8f1] font-sans">
                {locale === 'tr' ? 'Yazma Rehberleri ve Blog' : 'Typing Articles & Insights'}
              </h2>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                {locale === 'tr'
                  ? 'Hız geliştirme, klavye ergonomisi ve karşılaştırmalar'
                  : 'Speed building techniques, ergonomics, and tool benchmarks'}
              </p>
            </div>
          </div>

          {/* Article tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-[#334155]">
            {articles.map((art) => (
              <button
                key={art.id}
                onClick={() => setSelectedArticle(art.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedArticle === art.id
                    ? 'bg-[#0284c7] text-white font-bold'
                    : 'bg-[#0a0e17] text-slate-200 hover:text-white border border-[#334155]'
                }`}
              >
                {art.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Active Article Content */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3 text-xs text-slate-300 font-mono font-medium">
              <span className="px-2 py-0.5 rounded bg-[#1e293b] text-[#38bdf8] border border-[#334155] font-bold">
                {articles[selectedArticle].badge}
              </span>
              <span>{articles[selectedArticle].date}</span>
              <span>•</span>
              <span>{articles[selectedArticle].readTime} okuma</span>
            </div>

            <h3 className="text-xl font-bold text-[#e4e8f1] font-sans">
              {articles[selectedArticle].title}
            </h3>

            {articles[selectedArticle].content}
          </div>
        </section>
      )}

      {/* SSS (FAQ Section) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#334155] shadow-sm space-y-5">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-[#00e5ff]" />
          <h3 className="text-lg font-bold text-[#e4e8f1] font-sans">
            {t.seo.faqTitle}
          </h3>
        </div>

        <div className="space-y-3">
          {[
            { q: t.seo.faq1Q, a: t.seo.faq1A },
            { q: t.seo.faq2Q, a: t.seo.faq2A },
            { q: t.seo.faq3Q, a: t.seo.faq3A },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#0a0e17]/80 border border-[#334155] overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 flex items-center justify-between text-left font-semibold text-[#e4e8f1] text-sm hover:text-[#00e5ff] transition-colors"
              >
                <span>{item.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#00e5ff] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-300 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-200 leading-relaxed border-t border-[#334155] pt-3 font-normal">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
