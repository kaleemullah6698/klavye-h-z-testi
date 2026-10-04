import React from 'react';
import {
  Keyboard,
  Award,
  Zap,
  Target,
  Clock,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Cpu,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { InterfaceLocale, KeyboardLayoutName, TestDuration } from '../../types';

interface TurkishLanguageSectionProps {
  locale: InterfaceLocale;
  onStartTest: (duration: TestDuration, layout?: KeyboardLayoutName) => void;
  onOpenCurriculum: () => void;
  onOpenWeakKeys: () => void;
}

export const TurkishLanguageSection: React.FC<TurkishLanguageSectionProps> = ({
  locale,
  onStartTest,
  onOpenCurriculum,
  onOpenWeakKeys,
}) => {
  const turkishSpecialChars = [
    { char: 'Ç', lower: 'ç', code: 'KeyC', desc: 'Sol el orta/yüzük parmağı', sound: 'Sert sessiz' },
    { char: 'Ğ', lower: 'ğ', code: 'BracketLeft', desc: 'Sağ el serçe parmağı', sound: 'Yumuşak g' },
    { char: 'I', lower: 'ı', code: 'KeyI', desc: 'Sağ el orta parmağı (Noktasız)', sound: 'Kalın sesli' },
    { char: 'İ', lower: 'i', code: 'Quote', desc: 'Sağ el serçe parmağı (Noktalı)', sound: 'İnce sesli' },
    { char: 'Ö', lower: 'ö', code: 'Comma', desc: 'Sağ el yüzük parmağı', sound: 'Yuvarlak ince' },
    { char: 'Ş', lower: 'ş', code: 'Semicolon', desc: 'Sağ el serçe parmağı', sound: 'Sert sessiz' },
    { char: 'Ü', lower: 'ü', code: 'BracketRight', desc: 'Sağ el serçe parmağı', sound: 'Yuvarlak ince' },
  ];

  const alphabetFrequency = [
    { letter: 'A', percent: '11.9%', rank: '1', hand: 'Sol El (F: Ev Sırası)' },
    { letter: 'E', percent: '8.9%', rank: '2', hand: 'Sol El (F: Ev Sırası)' },
    { letter: 'İ', percent: '8.6%', rank: '3', hand: 'Sağ El (F: Ev Sırası)' },
    { letter: 'K', percent: '4.7%', rank: '4', hand: 'Sağ El (F: Ev Sırası)' },
    { letter: 'L', percent: '5.9%', rank: '5', hand: 'Sağ El (F: Ev Sırası)' },
    { letter: 'M', percent: '3.7%', rank: '6', hand: 'Sağ El (F: Ev Sırası)' },
    { letter: 'T', percent: '3.3%', rank: '7', hand: 'Sağ El (F: Ev Sırası)' },
    { letter: 'R', percent: '6.9%', rank: '8', hand: 'Sol El (F: Üst Sıra)' },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto my-12 px-2 select-none space-y-10 border-t border-[#334155] pt-12">
      {/* 1. Header & Section Title */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <p className="text-xs font-semibold text-sky-400 tracking-wider uppercase font-mono">
          TS 2117 Milli Standart • Türkçe Dil & Klavye Optimizasyonu
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight text-white">
          {locale === 'tr'
            ? 'Türkçe On Parmak Klavye ve Hız Testi Rehberi'
            : 'Turkish Touch Typing & Language Standards'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
          {locale === 'tr'
            ? 'Türk alfabesine özel harf duyarlılığı (ç, ğ, ı, İ, ö, ş, ü), bilimsel F klavye ergonomisi ve Adalet Bakanlığı Zabıt Katipliği sınav standartları.'
            : 'Deep optimization for Turkish alphabet morphology, scientific F layout ergonomics, and official court typist exam benchmarks.'}
        </p>
      </div>

      {/* 2. Interactive Turkish Character Matrix */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#111827] border border-[#334155] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#334155]">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
            <Cpu className="w-4 h-4" />
            <span>Türk Alfabesine Özgü 7 Karakter ve Sıfır Gecikme Algoritması</span>
          </div>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>İ/i ve I/ı Ayrımı Kusursuz</span>
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-normal">
          Türkçe hız testlerinde en sık karşılaşılan sorun noktalı <strong className="text-white">İ/i</strong> ile noktasız <strong className="text-white">I/ı</strong> harflerinin işletim sistemi veya tarayıcı dili kaynaklı yanlış eşleşmesidir. Platformumuz doğrudan donanım tarama kodlarını (hardware scan codes) işleyerek Türkçe karakterleri sıfır gecikmeyle analiz eder.
        </p>

        {/* Character Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {turkishSpecialChars.map((item) => (
            <div
              key={item.char}
              className="p-3.5 rounded-2xl bg-[#0a0e17] border border-[#334155] flex flex-col items-center text-center space-y-1.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1e293b] border border-[#334155] flex items-center justify-center text-xl font-bold font-mono text-sky-400">
                {item.char}
              </div>
              <div className="text-xs font-bold text-white font-mono">
                {item.lower}
              </div>
              <div className="text-[10px] text-slate-300 font-medium leading-tight">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Turkish F Keyboard Science vs. Turkish Q Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: F Klavye Bilimsel Mucizesi */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#111827] border border-[#334155] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
              <Award className="w-4 h-4 text-sky-400" />
              <span>TS 2117 Milli Standart: Türkçe F Klavye</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white font-sans">
              Dünya Daktilo Şampiyonlarının Klavyeliği
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              1955 yılında Prof. Dr. İhsan Sıtkı Yener tarafından Türkçenin 30 binden fazla kelimesi taranarak tasarlanan F klavye, harf frekanslarına göre dünyada bilimsel olarak üretilmiş en verimli klavyedir.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-1 font-normal">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0a0e17] border border-[#334155]">
                <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                <span><strong>%86 Ev Sırası Vuruşu:</strong> Parmaklar tuş aramak için hareket etmek zorunda kalmaz.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0a0e17] border border-[#334155]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span><strong>%49 Sol / %51 Sağ El Dengesi:</strong> İki elin iş yükü kusursuz şekilde eşitlenir.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0a0e17] border border-[#334155]">
                <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                <span><strong>Sesli Harfler Sol Elde:</strong> Türkçe hece yapısına uygun ritmik el değişimi sağlar.</span>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              onClick={() => onStartTest(60, 'tr-f')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Türkçe F Klavye Testini Başlat (60s)</span>
            </button>
          </div>
        </div>

        {/* Card 2: Zabıt Katipliği Sınav Formatı */}
        <div className="p-6 sm:p-7 rounded-3xl bg-[#111827] border border-[#334155] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              <FileCheck className="w-4 h-4 text-amber-400" />
              <span>Adalet Bakanlığı Zabıt Katipliği Sınavı Standartları</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white font-sans">
              3 Dakikada 90 Kelime Barajına Hazırlık
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Adalet Bakanlığı zabıt ve icra katipliği sınavlarında adaylardan 3 dakika (180 saniye) içinde imla kurallarına uygun olarak en az net 90 kelime yazmaları istenir.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-1 font-normal">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0a0e17] border border-[#334155]">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span><strong>180 Saniye (3 Dakika) Süre:</strong> Gerçek adliye sınav formatında süre sayacı.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0a0e17] border border-[#334155]">
                <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                <span><strong>Büyük/Küçük Harf ve Noktalama:</strong> İmla hataları doğrudan net puandan düşer.</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0a0e17] border border-[#334155]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span><strong>Net Kelime Hesaplaması:</strong> Brüt vuruşlardan yanlış kelimeler eksiltilerek net sonuç verilir.</span>
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              onClick={() => onStartTest(180, 'tr-q')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>3 Dakikalık Katiplik Sınav Modunu Başlat (180s)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Turkish Letter Frequency Bar (Türkçe Harf Frekansı Tablosu) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#111827] border border-[#334155] space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-[#334155]">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider font-mono">
            <Target className="w-4 h-4" />
            <span>Türkçede En Çok Kullanılan Harfler ve Frekansları</span>
          </div>
          <span className="text-xs text-slate-300 font-mono font-medium">TDK 50.000+ Kelimelik Veri Tabanı</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {alphabetFrequency.map((item) => (
            <div
              key={item.letter}
              className="p-3 rounded-2xl bg-[#0a0e17] border border-[#334155] flex flex-col items-center text-center space-y-1"
            >
              <span className="text-lg font-bold font-mono text-sky-400">{item.letter}</span>
              <span className="text-xs font-bold text-white font-mono">{item.percent}</span>
              <span className="text-[10px] text-slate-300 leading-tight font-medium">{item.hand}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Fast Action Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#111827] border border-[#334155] flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-base sm:text-lg font-bold text-white font-sans">
            Klavye Hızınızı Zirveye Taşımaya Hazır mısınız?
          </h4>
          <p className="text-xs text-slate-300 font-medium">
            Türkçe On Parmak dersleri, zayıf tuş analizi ve günlük meydan okumalar ile hızınızı artırın.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onStartTest(60, 'tr-q')}
            className="px-4 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium text-xs transition-colors flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>1 Dk Türkçe Q Testi</span>
          </button>
          <button
            onClick={onOpenCurriculum}
            className="px-4 py-2.5 rounded-xl bg-[#1e293b] hover:bg-[#334155] text-white border border-[#334155] font-medium text-xs transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>On Parmak Dersleri</span>
          </button>
          <button
            onClick={onOpenWeakKeys}
            className="px-4 py-2.5 rounded-xl bg-[#1e293b] hover:bg-[#334155] text-white border border-[#334155] font-medium text-xs transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Zayıf Harf Analizi</span>
          </button>
        </div>
      </div>
    </section>
  );
};
