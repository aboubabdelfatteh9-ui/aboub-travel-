import React from 'react';
import { useLanguage } from '../LanguageContext';
import { getWhatsAppLink } from '../data';
// @ts-ignore
import makkahKaaba from '../assets/images/makkah_holy_kaaba_1781111493593.png';

export default function UmrahView() {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: "برامج الحج والعمرة غرة عام 1446هـ",
      verse: "“وأتمّوا الحَجَّ والعُمْرَةَ لله”",
      desc: "تستعد وكالة عبعوب لإطلاق عروض عمرة غرة عام 1446هجرية، شاملة أرقى الفنادق الفاخرة القريبة من ساحة الحرم المكي والحرم المدني الشريف، مع توفير مؤطرين ومرشدين بكفاءة عالية.",
      soon: "✨ قريباً جداً - فتح باب التسجيل الأولي",
      lead: "سجل اهتمامك الآن لتكون من أوائل الذين يحصلون على فورية الأسعار والخصومات فور إطلاقها!",
      button: "📝 سجل اسمك معنا في الواتساب مجاناً",
      whatsapp: "مرحبا وكالة عبعوب، أرغب في تسجيل اسمي واهتمامي المسبق لرحلة العمرة القادمة لعام 1446هـ وإشعاري فور صدور البرامج والأسعار."
    },
    fr: {
      title: "Programmes de Omra & Hadj 1446H",
      verse: "“Et accomplissez pour Allah le pèlerinage et l'Omra”",
      desc: "L'agence Aboub Travel s'apprête à lancer ses offres de Omra pour l'année 1446 de l'Hégire, comprenant des hôtels de luxe à proximité immédiate du Haram de la Mecque et de Médine, avec un encadrement religieux hautement qualifié.",
      soon: "✨ Très bientôt - Ouverture des pré-inscriptions",
      lead: "Enregistrez votre intérêt dès maintenant pour recevoir en priorité les tarifs et les réductions dès leur parution !",
      button: "📝 S'inscrire gratuitement via WhatsApp",
      whatsapp: "Bonjour Aboub Travel, je souhaite m'inscrire sur la liste d'attente pour la prochaine Omra 1446H et être informé dès la sortie des prix et des programmes."
    },
    en: {
      title: "Umrah & Hajj Programs 1446H",
      verse: "“And perform properly the Hajj and Umrah for Allah”",
      desc: "Aboub Travel is preparing to launch its premium Umrah packages for the Hijri year 1446, featuring luxury hotels near the Holy Mosques in Makkah and Madinah, alongside highly experienced guides.",
      soon: "✨ Coming Soon - Pre-registration Opening",
      lead: "Register your interest now to be among the first to receive instant rates and early bird discounts once launched!",
      button: "📝 Register Free via WhatsApp",
      whatsapp: "Hello Aboub Travel, I would like to pre-register for the upcoming Umrah tour 1446H and get notified as soon as programs and pricing are released."
    }
  };

  const t = content[language] || content['ar'];

  return (
    <div className="space-y-8 animate-fade-in text-center py-16" id="umrah-view">
      <div className="max-w-2xl mx-auto glass rounded-[3.5rem] border border-white/10 card-shadow space-y-6 relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl"></div>
        
        {/* Beautiful Kaaba Header Banner */}
        <div className="w-full h-64 relative overflow-hidden rounded-t-[3.5rem] border-b border-white/5">
          <img 
            src={makkahKaaba} 
            alt="Makkah Holy Kaaba" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <span className="absolute bottom-4 left-4 w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center text-xl shadow-lg border border-amber-400 font-bold">
            🕋
          </span>
        </div>

        <div className="p-8 md:p-12 pt-4 md:pt-6 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{t.title}</h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            {t.verse}
            <br />
            {t.desc}
          </p>

          <div className="bg-amber-500/20 text-amber-300 font-extrabold px-6 py-3 rounded-full text-sm sm:text-base border border-amber-500/30 inline-block rotate-[-2deg]">
            {t.soon}
          </div>

          <div className="h-px bg-white/10 my-4"></div>

          <div className="space-y-4">
            <p className="text-xs text-slate-400 px-4">{t.lead}</p>
            <a 
              href={getWhatsAppLink(t.whatsapp)}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black px-6 py-3 rounded-xl shadow-lg hover:scale-103 transition cursor-pointer text-sm sm:text-base"
            >
              {t.button}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
