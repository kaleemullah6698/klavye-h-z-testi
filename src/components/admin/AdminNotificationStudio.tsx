import React, { useState } from 'react';
import {
  Bell,
  Smartphone,
  Monitor,
  Send,
  CheckCircle2,
  Trash2,
  Shield,
  Layers,
  Globe,
  Radio,
  Sparkles,
} from 'lucide-react';
import { InterfaceLocale } from '../../types';
import {
  AdminNotificationCampaign,
  NotificationCategory,
} from '../../types/curriculum';
import {
  dispatchAdminNotification,
  loadAdminCampaigns,
} from '../../lib/curriculum/pushNotificationService';
import { useTranslation } from '../../messages/i18n';

interface AdminNotificationStudioProps {
  locale: InterfaceLocale;
}

export const AdminNotificationStudio: React.FC<AdminNotificationStudioProps> = ({ locale }) => {
  const t = useTranslation(locale);
  const [campaigns, setCampaigns] = useState<AdminNotificationCampaign[]>(() => loadAdminCampaigns());

  const [title, setTitle] = useState('Haftalık Klavye Turnuvası Başladı! 🏆');
  const [message, setMessage] = useState('Bu haftanın 60 saniyelik Türkçe Q testi yayında. Sıralamadaki yerini al!');
  const [destinationUrl, setDestinationUrl] = useState('/challenges');
  const [category, setCategory] = useState<NotificationCategory>('CHALLENGES');
  const [targetAudience, setTargetAudience] = useState<'all' | 'registered' | 'guests'>('all');
  const [targetLocale, setTargetLocale] = useState<'all' | 'tr' | 'en'>('all');
  const [previewDevice, setPreviewDevice] = useState<'android' | 'windows' | 'mac'>('android');
  const [isSuccess, setIsSuccess] = useState(false);

  const estimatedRecipients = targetAudience === 'all' ? 2450 : targetAudience === 'registered' ? 1680 : 770;

  const handleSend = () => {
    if (!title || !message) return;
    const newCamp = dispatchAdminNotification(
      title,
      message,
      destinationUrl,
      category,
      targetAudience,
      targetLocale
    );
    setCampaigns(loadAdminCampaigns());
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#334155] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-sky-400 tracking-wider uppercase font-mono">
            Admin Web Push Notification Studio
          </p>
          <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-[#e4e8f1]">
            {locale === 'tr' ? 'Bildirim Yönetim Stüdyosu' : 'Notification Studio'}
          </h1>
          <p className="text-xs text-slate-300 max-w-lg font-medium">
            {locale === 'tr'
              ? 'W3C Web Push & RFC 8292 VAPID standartlarında hedef kitle filtreli anlık bildirim gönderimi ve otomatik 410 Gone temizliği.'
              : 'Zero-SDK native browser push notification dispatch with audience targeting and 410 Gone auto-pruning.'}
          </p>
        </div>

        <div className="bg-[#0a0e17] px-4 py-3 rounded-2xl border border-[#334155] text-right font-mono">
          <span className="text-[10px] text-slate-300 block font-sans font-medium">Hedef Kitle Tahmini</span>
          <span className="text-xl font-bold text-[#0284c7]">
            🎯 {estimatedRecipients.toLocaleString()} Cihaz
          </span>
        </div>
      </div>

      {/* Main Studio Grid: Form on Left, Device Mockup on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 space-y-4 p-6 rounded-3xl bg-[#111827] border border-[#334155] shadow-sm">
          <h2 className="text-sm font-bold text-[#e4e8f1] font-sans flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#0284c7]" />
            <span>Kampanya Detayları</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-200 mb-1 font-semibold">Bildirim Başlığı</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0a0e17] border border-[#334155] rounded-xl px-3 py-2 text-[#e4e8f1] focus:outline-none focus:border-[#0284c7]"
              />
            </div>

            <div>
              <label className="block text-slate-200 mb-1 font-semibold">Bildirim Metni / Gövde</label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#0a0e17] border border-[#334155] rounded-xl px-3 py-2 text-[#e4e8f1] focus:outline-none focus:border-[#0284c7]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-200 mb-1 font-semibold">Hedef Kitle</label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value as any)}
                  className="w-full bg-[#0a0e17] border border-[#334155] rounded-xl px-3 py-2 text-[#e4e8f1]"
                >
                  <option value="all">Tüm Kullanıcılar (Misafir + Üye)</option>
                  <option value="registered">Sadece Kayıtlı Üyeler</option>
                  <option value="guests">Sadece Misafir Ziyaretçiler</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-200 mb-1 font-semibold">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#0a0e17] border border-[#334155] rounded-xl px-3 py-2 text-[#e4e8f1]"
                >
                  <option value="CHALLENGES">Meydan Okumalar (Turnuva)</option>
                  <option value="STREAKS">Seri Koruması (Streak)</option>
                  <option value="LESSONS">Ders Hatırlatıcısı</option>
                  <option value="PROGRESS">Haftalık Analiz & Rapor</option>
                  <option value="GOALS">Günlük Hedefler</option>
                  <option value="ACHIEVEMENTS">Başarı & Rozet</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-200 mb-1 font-semibold">Tıklama Yönlendirme URL'si</label>
              <input
                type="text"
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                className="w-full bg-[#0a0e17] border border-[#334155] rounded-xl px-3 py-2 text-[#e4e8f1] focus:outline-none focus:border-[#0284c7] font-mono text-[11px]"
              />
            </div>

            <button
              type="button"
              onClick={handleSend}
              className="w-full mt-2 py-3 rounded-2xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all hover:brightness-105"
            >
              <Send className="w-4 h-4" />
              <span>Bildirimi Şimdi Gönder (VAPID Signed)</span>
            </button>

            {isSuccess && (
              <div className="p-3 rounded-xl bg-[#1e293b] border border-[#22c55e] text-[#22c55e] text-center font-bold flex items-center justify-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Bildirim Başarıyla Dağıtıldı ve Teslim Edildi!</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Mockup Preview (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#111827] border border-[#334155] shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#334155]">
              <span className="text-xs font-bold text-[#e4e8f1] flex items-center gap-1.5 font-sans">
                <Smartphone className="w-4 h-4 text-[#0284c7]" />
                <span>Canlı Cihaz Önizlemesi</span>
              </span>

              <div className="flex items-center gap-1 bg-[#0a0e17] p-1 rounded-xl border border-[#334155] text-[10px]">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('android')}
                  className={`px-2 py-0.5 rounded-lg font-semibold ${previewDevice === 'android' ? 'bg-[#0284c7] text-white font-bold' : 'text-slate-300'}`}
                >
                  Android
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('windows')}
                  className={`px-2 py-0.5 rounded-lg font-semibold ${previewDevice === 'windows' ? 'bg-[#0284c7] text-white font-bold' : 'text-slate-300'}`}
                >
                  Win 11
                </button>
              </div>
            </div>

            {/* Device Box Mockup */}
            <div className="mt-4 p-4 rounded-2xl bg-[#0a0e17] border border-[#334155] shadow-inner space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#1e293b] border border-[#334155] shadow-sm space-y-1.5 animate-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between text-[10px] text-slate-300 font-medium">
                  <span className="flex items-center gap-1 text-sky-400 font-bold">
                    <Bell className="w-3 h-3" />
                    <span>Klavye Hız Testi</span>
                  </span>
                  <span>Şimdi</span>
                </div>

                <div className="font-bold text-xs text-[#e4e8f1]">
                  {title}
                </div>

                <p className="text-[11px] text-slate-200 leading-relaxed font-normal">
                  {message}
                </p>

                <div className="pt-2 text-[9px] text-slate-300 font-mono border-t border-[#334155] flex justify-between font-medium">
                  <span>URL: {destinationUrl}</span>
                  <span className="text-sky-400 uppercase font-bold">{category}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-300 font-medium p-3 rounded-xl bg-[#0a0e17] border border-[#334155]">
            ℹ️ VAPID RFC 8292 protokolüyle şifrelenir; tarayıcı izin vermeyen veya aboneliği sonlanmış cihazlar (HTTP 410) otomatik olarak veri tabanından temizlenir.
          </div>
        </div>
      </div>

      {/* Delivery Dashboard / Campaign Log */}
      <div className="p-6 rounded-3xl bg-[#111827] border border-[#334155] shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#e4e8f1] font-sans flex items-center justify-between">
          <span>Gönderim ve Teslimat Raporu</span>
          <span className="text-xs text-slate-300 font-medium">Son Kampanyalar</span>
        </h3>

        <div className="space-y-3">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-4 rounded-2xl bg-[#0a0e17]/80 border border-[#334155] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#00e5ff]/15 text-[#00e5ff]">
                    {camp.category}
                  </span>
                  <span className="font-bold text-[#e4e8f1]">{camp.title}</span>
                </div>
                <p className="text-[11px] text-slate-200 mt-1">{camp.message}</p>
                <div className="text-[10px] text-slate-300 mt-1 font-mono font-medium">{camp.sentAt}</div>
              </div>

              <div className="flex items-center gap-4 font-mono text-right shrink-0">
                <div>
                  <span className="text-sm font-bold text-[#22c55e] block">
                    {camp.deliveredCount}
                  </span>
                  <span className="text-[10px] text-slate-300 font-sans font-medium">Teslim</span>
                </div>

                <div>
                  <span className="text-sm font-bold text-[#ef4444] block">
                    {camp.failedCount}
                  </span>
                  <span className="text-[10px] text-slate-300 font-sans font-medium">Başarısız</span>
                </div>

                <div>
                  <span className="text-sm font-bold text-[#a855f7] block">
                    {camp.prunedCount}
                  </span>
                  <span className="text-[10px] text-slate-300 font-sans font-medium">Temizlenen (410)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
