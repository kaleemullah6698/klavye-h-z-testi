import React from 'react';
import { Keyboard, Heart, ShieldCheck, Zap, GraduationCap, Flame, Trophy, Bell } from 'lucide-react';
import { InterfaceLocale, KeyboardLayoutName, TestDuration } from '../../types';
import { NavView } from './Header';
import { useTranslation } from '../../messages/i18n';

interface FooterProps {
  locale: InterfaceLocale;
  onSelectDurationTest: (d: TestDuration) => void;
  onSelectLayoutTest: (layout: KeyboardLayoutName) => void;
  onSelectNav: (view: NavView) => void;
}

export const Footer: React.FC<FooterProps> = ({
  locale,
  onSelectDurationTest,
  onSelectLayoutTest,
  onSelectNav,
}) => {
  const t = useTranslation(locale);

  return (
    <footer className="w-full bg-[#0a0e17] border-t border-[#334155] mt-16 pt-12 pb-8 text-xs text-slate-300">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {/* Brand & Mission Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0284c7] flex items-center justify-center text-white font-bold">
              <Keyboard className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-white tracking-tight">
              {t.appTitle}
            </span>
          </div>
          <p className="text-slate-200 leading-relaxed text-xs">
            {t.footer.about}
          </p>
          <div className="flex items-center gap-2 text-xs text-[#22c55e] font-semibold pt-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Öğrenme, Meydan Okuma & Gamification</span>
          </div>
        </div>

        {/* Education & Competition Features */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-[#f8fafc] text-xs uppercase tracking-wider">
            {locale === 'tr' ? 'Eğitim & Yarışma' : 'Learning & Competition'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onSelectNav('curriculum')}
                className="text-slate-200 hover:text-[#00e5ff] transition-colors flex items-center gap-1.5 font-medium"
              >
                <GraduationCap className="w-3.5 h-3.5 text-[#00e5ff]" />
                <span>On Parmak Dersleri (Müfredat)</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectNav('challenges')}
                className="text-slate-200 hover:text-[#00e5ff] transition-colors flex items-center gap-1.5 font-medium"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Günün Meydan Okuması (UTC+3)</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectNav('leaderboard')}
                className="text-slate-200 hover:text-[#00e5ff] transition-colors flex items-center gap-1.5 font-medium"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Liderlik Tablosu & Sıralama</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectNav('weakkeys')}
                className="text-slate-200 hover:text-[#00e5ff] transition-colors flex items-center gap-1.5 font-medium"
              >
                <Zap className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>Zayıf Tuş Isı Haritası (Heatmap)</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectNav('admin')}
                className="text-slate-200 hover:text-[#a855f7] transition-colors flex items-center gap-1.5 font-medium"
              >
                <Bell className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>Admin Bildirim Stüdyosu (VAPID)</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Duration Tests Links */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-[#f8fafc] text-xs uppercase tracking-wider">
            {locale === 'tr' ? 'Hız Testleri' : 'Speed Tests'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onSelectDurationTest(60)}
                className="text-slate-200 hover:text-[#00e5ff] transition-colors font-medium text-left"
              >
                1 Dakikalık Test (60s Standart)
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectDurationTest(30)}
                className="text-slate-200 hover:text-[#00e5ff] transition-colors font-medium text-left"
              >
                30 Saniyelik Hızlı Sprint
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectDurationTest(15)}
                className="text-slate-200 hover:text-[#00e5ff] transition-colors font-medium text-left"
              >
                15 Saniyelik Hız Patlaması
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectLayoutTest('tr-q')}
                className="text-slate-200 hover:text-[#00e5ff] transition-colors font-medium text-left"
              >
                Türkçe Q Klavye Testi
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectLayoutTest('tr-f')}
                className="text-slate-200 hover:text-[#00e5ff] transition-colors font-medium text-left"
              >
                Türkçe F Klavye Testi (TS 2117)
              </button>
            </li>
          </ul>
        </div>

        {/* Guides & SEO Articles */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-[#f8fafc] text-xs uppercase tracking-wider">
            {locale === 'tr' ? 'Rehberler' : 'Guides'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onSelectNav('guide')}
                className="text-slate-200 hover:text-[#00e5ff] transition-colors text-left font-medium"
              >
                Doğru Parmak Duruşu ve Ergonomi
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectNav('layouts')}
                className="text-slate-200 hover:text-[#00e5ff] transition-colors text-left font-medium"
              >
                Türk Q ve Türk F Klavye Karşılaştırması
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectNav('articles')}
                className="text-slate-200 hover:text-[#00e5ff] transition-colors text-left font-medium"
              >
                Klavye Hızı Nasıl Artırılır? (7 İpucu)
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectNav('articles')}
                className="text-slate-200 hover:text-[#00e5ff] transition-colors text-left font-medium"
              >
                MonkeyType Alternatifleri 2026
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-5xl mx-auto px-4 pt-6 border-t border-[#334155] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
        <div>{t.footer.copyright}</div>
        <div className="flex items-center gap-4">
          <span className="text-slate-200 font-medium">KVKK Uyumlu • Gizli Profil</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-slate-200 font-medium">
            <span>Türkiye için tasarlandı</span>
            <Heart className="w-3.5 h-3.5 text-[#ef4444] fill-[#ef4444]" />
          </span>
        </div>
      </div>
    </footer>
  );
};
