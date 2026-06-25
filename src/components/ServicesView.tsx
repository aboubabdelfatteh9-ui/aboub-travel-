import React from 'react';
import { useLanguage } from '../LanguageContext';

interface ServicesViewProps {
  setQuickTrip: (trip: string) => void;
  setQuickBookOpen: (open: boolean) => void;
}

export default function ServicesView({
  setQuickTrip,
  setQuickBookOpen,
}: ServicesViewProps) {
  const { language, dir } = useLanguage();

  const content = {
    title: language === 'ar' ? "خدمات وكالة عبعوب الاحترافية 🏨" : language === 'fr' ? "Services Professionnels d'Aboub Travel 🏨" : "Aboub Travel Professional Services 🏨",
    subtitle: language === 'ar' ? "ننفرد بتوفير تجربة سياحة راقية لكل من يثق بنا وبقدراتنا المحلية والإقليمية." : language === 'fr' ? "Nous offrons une expérience de voyage d'exception à tous nos clients privilégiés." : "We deliver exceptional travel experiences to our valued clients.",
    
    flightTitle: language === 'ar' ? "حجز تذاكر الطيران" : language === 'fr' ? "Billets d'Avion" : "Flight Tickets Booking",
    flightDesc: language === 'ar' 
      ? "نوفّر لك حجوزات طيران مؤكدة وآمنة على مختلف الخطوط الجوية المحلية والدولية (الخطوط الجزائرية، الطيران التركي، الطيران القطري وغيرها) مع إيجاد أفضل المواقيت والمقاعد وبأسعار رائعة." 
      : language === 'fr' 
        ? "Nous assurons des réservations de vols sûres et confirmées sur toutes les compagnies aériennes (Air Algérie, Turkish Airlines, Qatar Airways...) avec de meilleurs tarifs." 
        : "We secure dynamic and confirmed flight bookings across all major airlines (Air Algerie, Turkish Airlines, Qatar Airways...) with the best available pricing.",
    flightBtn: language === 'ar' ? "طلب حجز طيران فوري" : language === 'fr' ? "Demander un Vol" : "Request Flight Booking",

    hotelTitle: language === 'ar' ? "حجز فنادق وشقق عائلية" : language === 'fr' ? "Hôtels & Appartements" : "Hotels & Apartments",
    hotelDesc: language === 'ar' 
      ? "تتمتع وكالة عبعوب بشراكات متينة مع كبرى الفنادق والشقق السكنية في إسطنبول، تونس وسائر مدن الجزائر الساحلية. نضمن لكم حجوزات نظيفة ومكيفة بمواقع استراتيجية قريبة من المترو والخدمات." 
      : language === 'fr' 
        ? "Aboub Travel bénéficie de partenariats solides en Turquie et Tunisie ainsi que sur toute la côte algérienne pour vous garantir un hébergement de qualité." 
        : "Aboub Travel has strong direct partnerships in Istanbul, Tunisia, and Algerian coastlines, securing clean, well-managed, and air-conditioned accommodation.",
    hotelBtn: language === 'ar' ? "طلب تفاصيل الحجز الفندقي" : language === 'fr' ? "Demander un Hébergement" : "Request Hotel Details",

    visaTitle: language === 'ar' ? "معالجة التأشيرات (Visa)" : language === 'fr' ? "Traitement des Visas" : "Visa Processing Services",
    visaDesc: language === 'ar' 
      ? "فريق من المختصين في معالجة طلبات تأشيرات السفر الدولية (فيزات تركيا، دول شنغن الأوروبية، دول الخليج العربي، آسيا، وأمريكا وغيرها). نساعدك في تنظيم الأوراق والملفات والترجمة وصياغة حجوزات الطيران والفنادق الداعمة للملف لتقليل نسبة الرفض." 
      : language === 'fr' 
        ? "Des experts de traitement de dossiers de visa (Turquie, Schengen, Golfe, Asie, Canada, USA...). Nous préparons vos formulaires, traductions et réservations." 
        : "Expert visa processing services for Turkey, Schengen, Gulf countries, Asia, Canada, USA... We assist you in organizing documents, translations, and bookings.",
    visaBtn: language === 'ar' ? "إطلب الخدمة فورياً" : language === 'fr' ? "Demander l'Assistance" : "Request Visa Support"
  };

  return (
    <div className="space-y-12 animate-fade-in text-slate-100" id="services-view" style={{ direction: dir }}>
      
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h2 className="text-4xl font-extrabold text-white">{content.title}</h2>
        <p className="text-sm text-slate-400">{content.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Service A */}
        <div className={`glass p-8 rounded-[3rem] border border-white/10 flex flex-col justify-between space-y-6 relative overflow-hidden ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className="space-y-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center text-white text-3xl shadow-lg ${dir === 'rtl' ? 'mr-0' : 'ml-0'}`}>
              ✈️
            </div>
            <h3 className="text-2xl font-black text-rose-400">{content.flightTitle}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {content.flightDesc}
            </p>
          </div>
          <button 
            onClick={() => { setQuickTrip(language === 'ar' ? 'حجز تذاكر طيران' : 'Flight Tickets Booking'); setQuickBookOpen(true); }}
            className="w-full red-accent text-white py-3 rounded-2xl font-black text-center shadow-md hover:opacity-95 transition cursor-pointer"
          >
            {content.flightBtn}
          </button>
        </div>

        {/* Service B */}
        <div className={`glass-dark p-8 rounded-[3rem] border border-white/15 flex flex-col justify-between space-y-6 relative overflow-hidden ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="space-y-4 relative z-10">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-500 to-blue-600 flex items-center justify-center text-white text-3xl shadow-xl ${dir === 'rtl' ? 'mr-0' : 'ml-0'}`}>
              🏨
            </div>
            <h3 className="text-2xl font-black text-rose-400">{content.hotelTitle}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {content.hotelDesc}
            </p>
          </div>
          <button 
            onClick={() => { setQuickTrip(language === 'ar' ? 'حجز فنادق مميزة (فريق عبعوب)' : 'Hotels & Accommodation Booking'); setQuickBookOpen(true); }}
            className="w-full red-accent text-white py-3 rounded-2xl font-black text-center shadow-md hover:opacity-95 transition cursor-pointer"
          >
            {content.hotelBtn}
          </button>
        </div>

        {/* Service C */}
        <div className={`glass p-8 rounded-[3rem] border border-white/10 flex flex-col justify-between space-y-6 relative overflow-hidden ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className="space-y-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl shadow-lg ${dir === 'rtl' ? 'mr-0' : 'ml-0'}`}>
              📑
            </div>
            <h3 className="text-2xl font-black text-rose-400">{content.visaTitle}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {content.visaDesc}
            </p>
          </div>
          <button 
            onClick={() => { setQuickTrip(language === 'ar' ? 'معالجة ملف تأشيرة فيزا' : 'Visa Processing Assistance'); setQuickBookOpen(true); }}
            className="w-full red-accent text-white py-3 rounded-2xl font-black text-center shadow-md hover:opacity-95 transition cursor-pointer"
          >
            {content.visaBtn}
          </button>
        </div>

      </div>

    </div>
  );
}
