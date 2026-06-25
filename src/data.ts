export const istanbulPrices = {
  adult: 129000,
  kid: 99000,
  infant: 18000,
  single: 169000
};

export const getTunisiaPricePerPerson = (guests: number): number => {
  if (guests >= 5) return 24000;
  if (guests === 4) return 28000;
  if (guests === 3) return 30000;
  return 33500; // 2 guests or single (fallback)
};

export const getJijelPricePerPerson = (option: 'apartment' | 'hotel', guests: number): number => {
  if (option === 'hotel') {
    return 25000;
  } else {
    if (guests >= 5) return 12900;
    if (guests === 4) return 13500;
    if (guests === 3) return 14500;
    return 17500; // 2 guests or single (fallback)
  }
};

export const getWhatsAppLink = (text: string): string => {
  return `https://wa.me/213667910148?text=${encodeURIComponent(text)}`;
};

export const getBackupWhatsAppLink = (text: string): string => {
  return `https://wa.me/213696789633?text=${encodeURIComponent(text)}`;
};

export interface FAQItem {
  q: string;
  a: string;
}

export const faqList: FAQItem[] = [
  {
    q: "كيف يمكنني تأكيد حجزي لدى وكالة عبعوب للسياحة؟",
    a: "يمكنك تأكيد الحجز بسهولة إما بزيارة مقرنا الرسمي ببلدية تبسبست في تقرت (خلف البلدية، بجوار متوسطة نصرات حشاني)، أو التواصل معنا مباشرة عبر الأرقام الرسمية وتطبيق الواتساب للتسجيل عن بعد وإرسال الوثائق وتأكيد الدفع."
  },
  {
    q: "ما هي الوثائق المطلوبة لحجز الرحلات الدولية (تونس وتركيا)؟",
    a: "لرحلة تونس تحتاج إلى جواز ساري المفعول (أكثر من 6 أشهر)، ولرحلة تركيا تحتاج لجواز سفر ساري المفعول مع نسخة واضحة لتجهيز التأشيرة السياحية من طرف فريقنا التقني بالوكالة."
  },
  {
    q: "هل توفر الوكالة تسهيلات للمسافرين من ولايات أخرى؟",
    a: "نعم وبكل سرور! نوفر إمكانية الحجز الكامل عبر الواتساب للزبائن من خارج ولاية تقرت، مع توفير كافة تفاصيل خطة السير ونقاط الالتقاء المتعددة على خط الحافلة السياحية المتجهة لتونس أو المطار."
  },
  {
    q: "كيف يمكنني استخدام المخطط الذكي بالذكاء الاصطناعي؟",
    a: "المخطط الذكي مدعوم بالكامل بتقنيات Gemini 3.5 الحديثة. كل ما عليك هو كتابة اسم الوجهة السياحية والمدة والميزانية، ليفصّل لك فورياً برنامجاً سياحياً لزيارات المعالم وتكلفة السفر التقريبية وكيفية الترتيب معنا."
  }
];
