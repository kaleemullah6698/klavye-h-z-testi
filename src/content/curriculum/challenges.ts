import { DailyChallenge } from '../../types/curriculum';

export function getDailyChallenge(): DailyChallenge {
  // Current date in UTC+3 (Turkey Time)
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const turkeyTime = new Date(utc + 3600000 * 3);
  const dateStr = turkeyTime.toISOString().slice(0, 10);

  // Expiration is next midnight in UTC+3
  const nextMidnight = new Date(turkeyTime);
  nextMidnight.setHours(24, 0, 0, 0);

  const passages = [
    'Bilgi güçtür ve azimle birleştiğinde aşamayacağı hiçbir engel yoktur. Her yeni gün parmaklarımızın hızını ve zihnimizin çevikliğini geliştirmek için eşsiz bir fırsattır.',
    'Doğru alışkanlıklar küçük adımlarla başlar; her gün on beş dakika düzenli çalışan bir insan, yılda yüzlerce saatlik ustalık biriktirmiş olur.',
    'Geleceğin dünyasında hızlı ve hatasız yazabilmek, fikirlerinizi gecikmeden gerçeğe dönüştürmenin en doğrudan ve en etkili anahtarıdır.',
    'Sabır ve odaklanma bir araya geldiğinde karmaşık hedefler berraklaşır. Zorluklar karşısında yılmadan devam edenler daima zirveye ulaşır.',
    'Yazmak düşüncelerin mimarisidir; sağlam temeller üzerine kurulan her kelime kalıcı ve etkileyici bir eser olarak geleceğe miras kalır.',
  ];

  const dayIndex = Math.abs(dateStr.split('-').reduce((acc, part) => acc + parseInt(part, 10), 0)) % passages.length;

  return {
    id: `daily-${dateStr}`,
    type: 'daily',
    title: `Günün Meydan Okuması (${dateStr})`,
    description: 'Tüm kullanıcılarla aynı metinde yarışın. Baraj: %90 doğruluk. Sıfırlanma: Gece 00:00 (UTC+3).',
    passage: passages[dayIndex],
    durationSeconds: 60,
    minAccuracy: 90,
    expiresAt: nextMidnight.toISOString(),
    participantCount: 420 + (dayIndex * 37),
  };
}

export function getWeeklyChallenge(): DailyChallenge {
  const now = new Date();
  const weekNumber = Math.ceil(now.getDate() / 7);
  const monthStr = now.toISOString().slice(0, 7);

  return {
    id: `weekly-${monthStr}-w${weekNumber}`,
    type: 'weekly',
    title: `Haftalık Büyük Dayanıklılık Kupası (Hafta ${weekNumber})`,
    description: '3 dakikalık (180s) uzun soluklu maraton. Liderlik tablosunda en üst sıraya tırmanın!',
    passage: 'Başarı bir varış noktası değil, her gün sabırla sürdürülen kesintisiz bir yolculuktur. Karşınıza çıkan zorluklar sadece iradenizi sınamak ve sizi daha dirençli kılmak için vardır. Klavyede hızlanmak da tıpkı bir enstrüman çalmak gibidir; önce doğru notaları öğrenir, sonra ritmi yakalar ve nihayetinde düşüncelerinizle parmaklarınız arasında kusursuz bir ahenk kurarsınız.',
    durationSeconds: 180,
    minAccuracy: 92,
    expiresAt: new Date(now.getTime() + 86400000 * 5).toISOString(),
    participantCount: 1840,
  };
}
