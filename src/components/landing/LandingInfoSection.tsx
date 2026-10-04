import React, { useState } from 'react';
import {
  Keyboard,
  Award,
  Zap,
  Target,
  Clock,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Play,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { InterfaceLocale, KeyboardLayoutName, TestDuration } from '../../types';

interface LandingInfoSectionProps {
  locale: InterfaceLocale;
  onStartTest: (duration: TestDuration, layout?: KeyboardLayoutName) => void;
  onOpenCurriculum: () => void;
  onOpenWeakKeys: () => void;
}

export const LandingInfoSection: React.FC<LandingInfoSectionProps> = ({
  locale,
  onStartTest,
  onOpenCurriculum,
  onOpenWeakKeys,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const speedTiers = [
    {
      tier: 'Başlangıç',
      tierEn: 'Beginner',
      range: '0 - 30 WPM',
      color: 'text-slate-300',
      borderColor: 'border-[#334155]',
      bgColor: 'bg-[#1e293b]',
      desc: 'Tuşları arayarak, genelde 2-4 parmakla yazılan seviye. On parmak eğitiminin ilk adımı.',
      descEn: 'Hunt-and-peck typing with 2-4 fingers. The starting point for touch typing.',
    },
    {
      tier: 'Orta Seviye',
      tierEn: 'Intermediate',
      range: '30 - 55 WPM',
      color: 'text-sky-400',
      borderColor: 'border-[#334155]',
      bgColor: 'bg-[#1e293b]',
      desc: 'Ev sırası yerleşmeye başlamış, günlük ofis, e-posta ve okul işleri için standart hız.',
      descEn: 'Home row established, standard speed for daily office, email, and academic work.',
    },
    {
      tier: 'İleri Seviye',
      tierEn: 'Advanced',
      range: '55 - 80 WPM',
      color: 'text-emerald-400',
      borderColor: 'border-[#334155]',
      bgColor: 'bg-[#1e293b]',
      desc: 'Ekrana bakmadan akıcı yazan profesyoneller, yazılımcılar, gazeteciler ve katipler.',
      descEn: 'Touch typists writing without glancing at keyboard: developers, authors, journalists.',
    },
    {
      tier: 'Profesyonel',
      tierEn: 'Professional',
      range: '80 - 105 WPM',
      color: 'text-amber-400',
      borderColor: 'border-[#334155]',
      bgColor: 'bg-[#1e293b]',
      desc: 'Yüksek ritmik hız, gelişmiş kas hafızası ve %96+ hatasızlık oranı.',
      descEn: 'High rhythmic velocity, advanced muscle memory, and 96%+ accuracy rate.',
    },
    {
      tier: 'Usta / E-Sporcu',
      tierEn: 'Master / Elite',
      range: '105+ WPM',
      color: 'text-indigo-400',
      borderColor: 'border-[#334155]',
      bgColor: 'bg-[#1e293b]',
      desc: 'Dünya klavye şampiyonaları ve sıralamalarında ilk %1\'lik dilim.',
      descEn: 'Top 1% worldwide in keyboard championships and competitive typing leaderboards.',
    },
  ];

  const faqs = [
    {
      q: 'WPM (Words Per Minute) Nedir ve Net WPM Nasıl Hesaplanır?',
      a: 'WPM (Dakika Başına Kelime), standart uluslararası klavye standardına göre 5 karakter (boşluklar dahil) 1 kelime kabul edilerek hesaplanır. Net WPM ise brüt yazma hızınızdan düzeltilmeyen hataların düşülmesiyle elde edilen gerçek hızınızdır: Net WPM = (Doğru Karakter Sayısı / 5) - (Hatalar / Süre).',
    },
    {
      q: 'On Parmak Yazmak Neden Bu Kadar Önemlidir?',
      a: 'On parmak tekniği, klavyeye bakma zorunluluğunu tamamen ortadan kaldırarak göz ve boyun kaslarındaki stresi %60 azaltır. Günde 2 saat yazı yazan biri hızını 40 WPM\'den 80 WPM\'e çıkardığında yılda yaklaşık 21 iş günü zaman tasarrufu sağlar ve düşüncelerini kesintisiz ekrana döker.',
    },
    {
      q: 'Türkçe Q ve Türkçe F Klavye Arasındaki Bilimsel Fark Nedir?',
      a: 'Türkçe F Klavye (TS 2117), Prof. Dr. İhsan Sıtkı Yener tarafından Türkçedeki milyonlarca kelime taranarak en sık kullanılan harflerin (A, E, K, İ, M, L) ev sırasına ve en güçlü parmaklara yerleştirildiği bilimsel bir düzendir. Q klavye ise İngilizce daktilolarda harf kollarının çarpışmasını engellemek için harfleri yavaşlatacak şekilde tasarlanmıştır.',
    },
    {
      q: 'Hız Testinde En İdeal Süre Hangisidir (15s, 60s, 120s)?',
      a: '60 Saniye (1 Dakika) testi, dünya genelinde adliye katipliği sınavlarında ve iş başvurularında kullanılan altın standarttır. 15 ve 30 saniyelik testler anlık parmak sprint hızınızı (Burst WPM) ölçerken, 3 dakika ve üzeri testler yazma dayanıklılığınızı ve ritim tutarlılığınızı ölçer.',
    },
    {
      q: 'Verilerim ve Kişisel Rekorlarım Güvende mi?',
      a: 'Evet! Platformumuz KVKK ve GDPR gizlilik standartlarına tam uyumludur. Tüm test geçmişiniz, kişisel rekorlarınız ve analitik verileriniz varsayılan olarak tamamen kendi tarayıcınızın yerel depolama alanında (localStorage) şifresiz üçüncü taraflarla paylaşılmadan saklanır.',
    },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto mt-14 mb-4 px-2 space-y-12 select-none border-t border-[#334155] pt-12">
      {/* 1. SECTION: WPM TIERS & SPEED BENCHMARKS */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs font-semibold text-sky-400 tracking-wider uppercase font-mono">
            Uluslararası WPM Standartları ve Seviye Kılavuzu
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight text-white">
            {locale === 'tr' ? 'Klavye Hızınız Hangi Seviyede?' : 'Where Do You Stand in Typing Speed?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            {locale === 'tr'
              ? 'Standart uluslararası WPM baremleri ve dünya çapındaki kullanıcı ortalamaları.'
              : 'Global typing velocity standards and worldwide user percentiles.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {speedTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl bg-[#111827] border ${tier.borderColor} flex flex-col justify-between space-y-3`}
            >
              <div className="space-y-1.5">
                <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-bold font-mono ${tier.bgColor} ${tier.color}`}>
                  {locale === 'tr' ? tier.tier : tier.tierEn}
                </span>
                <div className={`text-xl font-bold font-mono tracking-tight ${tier.color}`}>
                  {tier.range}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {locale === 'tr' ? tier.desc : tier.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. SECTION: TOUCH TYPING SCIENCE & GOLDEN RULES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: 5 Altın Kural */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#111827] border border-[#334155] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
            <Target className="w-4 h-4" />
            <span>Klavye Hızını 2 Katına Çıkaran 5 Altın Kural</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white font-sans">
            Doğru Teknikle Yazma Hızınızı Zirveye Taşıyın
          </h3>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#0a0e17] border border-[#334155]">
              <div className="w-6 h-6 rounded-lg bg-[#0284c7] text-white font-bold font-mono flex items-center justify-center shrink-0 text-xs">
                1
              </div>
              <div>
                <strong className="text-white block mb-0.5">Asla Klavyeye Bakmayın</strong>
                <span>Tuşları gözlerinizle değil, parmak uçlarınızdaki dokunma hissi ve kas hafızasıyla bulun.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#0a0e17] border border-[#334155]">
              <div className="w-6 h-6 rounded-lg bg-[#0284c7] text-white font-bold font-mono flex items-center justify-center shrink-0 text-xs">
                2
              </div>
              <div>
                <strong className="text-white block mb-0.5">Önce Doğruluk, Sonra Hız</strong>
                <span>%95'in altındaki doğrulukla hızlı yazmak zaman kaybettirir. Yavaş ama hatasız başlayın.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#0a0e17] border border-[#334155]">
              <div className="w-6 h-6 rounded-lg bg-[#0284c7] text-white font-bold font-mono flex items-center justify-center shrink-0 text-xs">
                3
              </div>
              <div>
                <strong className="text-white block mb-0.5">F ve J Kabartmalarını Kerteriz Alın</strong>
                <span>Her iki işaret parmağınız temel duruşta F ve J çıkıntıları üzerinde dinlenmeli ve oradan uzanmalıdır.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#0a0e17] border border-[#334155]">
              <div className="w-6 h-6 rounded-lg bg-[#0284c7] text-white font-bold font-mono flex items-center justify-center shrink-0 text-xs">
                4
              </div>
              <div>
                <strong className="text-white block mb-0.5">Zayıf Tuşlarınıza Özel Antrenman Yapın</strong>
                <span>En çok takıldığınız Türkçe harfleri (Ş, Ğ, Ç, İ, Ö, Ü) algoritmayla tespit edip pratik yapın.</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={onOpenCurriculum}
              className="px-4 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium text-xs transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Derslere Başla</span>
            </button>
            <button
              onClick={onOpenWeakKeys}
              className="px-4 py-2 rounded-xl bg-[#1e293b] hover:bg-[#334155] text-white border border-[#334155] font-medium text-xs transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Zayıf Tuş Analizi</span>
            </button>
          </div>
        </div>

        {/* Right: Türkçe Q vs Türkçe F Karşılaştırması */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#111827] border border-[#334155] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
            <Cpu className="w-4 h-4" />
            <span>Klavye Mimarisi: Türkçe Q vs. Türkçe F (TS 2117)</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white font-sans">
            Hangi Klavye Düzeni Sizin İçin Daha Uygun?
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            Klavyeler rastgele üretilmemiştir. Türkçe metin yazarken hangi düzenin ne kadar avantaj sağladığını inceleyin:
          </p>

          <div className="space-y-3 text-xs">
            {/* Türkçe Q */}
            <div className="p-3.5 rounded-2xl bg-[#0a0e17] border border-[#334155] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>Türkçe Q Klavye</span>
                </span>
                <span className="text-[11px] font-mono text-sky-400 font-semibold">%88 Evrensel Yaygınlık</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed font-normal">
                Tüm bilgisayarlarda, laptoplarda ve akıllı telefonlarda standart olarak yüklüdür. İngilizce kod yazanlar ve yabancı dillerde çalışanlar için geçiş kolaylığı sunar.
              </p>
            </div>

            {/* Türkçe F */}
            <div className="p-3.5 rounded-2xl bg-[#0a0e17] border border-[#334155] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Türkçe F Klavye (TS 2117 Milli Standart)</span>
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">Dünya Şampiyonu</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed font-normal">
                Türkçe harf frekanslarına göre optimize edilmiştir. Vuruşların %86'sı en güçlü ev sırasında gerçekleşir, parmak yorgunluğunu minimize eder. Adalet Bakanlığı ve kamu personeli için resmi standarttır.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={() => onStartTest(60, 'tr-q')}
              className="px-3.5 py-2 rounded-xl bg-[#1e293b] hover:bg-[#334155] text-white border border-[#334155] font-medium text-xs transition-colors"
            >
              Türkçe Q Testi (60s)
            </button>
            <button
              onClick={() => onStartTest(60, 'tr-f')}
              className="px-3.5 py-2 rounded-xl bg-[#1e293b] hover:bg-[#334155] text-white border border-[#334155] font-medium text-xs transition-colors"
            >
              Türkçe F Testi (60s)
            </button>
          </div>
        </div>
      </div>

      {/* 3. SECTION: SIKÇA SORULAN SORULAR (FAQ ACCORDION) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#334155] space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
          <HelpCircle className="w-4 h-4" />
          <span>Sıkça Sorulan Sorular (SSS)</span>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#0a0e17] border border-[#334155] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-sky-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-sky-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4.5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#334155] animate-in fade-in duration-150 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
