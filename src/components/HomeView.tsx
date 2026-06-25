import React from 'react';
import { Plane, ArrowLeft, Sparkles, MapPin, Smile, BookOpen, Clock, CheckCircle, Heart, Phone } from 'lucide-react';
import { faqList, getWhatsAppLink, getBackupWhatsAppLink } from '../data';
import { useLanguage } from '../LanguageContext';

// @ts-ignore
import istanbulVisaGuide from '../assets/images/istanbul_visa_guide_v2_1780993175897.png';
// @ts-ignore
import jijelBejaiaBus from '../assets/images/jijel_bejaia_bus_1780993368841.png';
// @ts-ignore
import algiersMonument from '../assets/images/algiers_monument_1780991978072.png';
// @ts-ignore
import makkahKaaba from '../assets/images/makkah_holy_kaaba_1781111493593.png';
// @ts-ignore
import worldLandmarksCollage from '../assets/images/world_landmarks_collage_1781111789213.png';
// @ts-ignore
import algeriaFlagTourism from '../assets/images/algeria_flag_tourism_1781111805585.png';
// @ts-ignore
import travelFlightPlane from '../assets/images/travel_flight_plane_1781111990606.png';
// @ts-ignore
import luxuryHotelsResorts from '../assets/images/luxury_hotel_new_1781117201677.png';
// @ts-ignore
import visaAndFlags from '../assets/images/visa_and_flags_1781112021994.png';

interface HomeViewProps {
  navigateTo: (tab: string) => void;
  openFaq: number | null;
  setOpenFaq: (idx: number | null) => void;
  setQuickBookOpen: (open: boolean) => void;
}

export default function HomeView({
  navigateTo,
  openFaq,
  setOpenFaq,
  setQuickBookOpen,
}: HomeViewProps) {
  const { t, language, dir } = useLanguage();

  // Multi-lingual articles
  const articlesList = {
    ar: [
      {
        title: 'أسرار فيزا تركيا: كيف تضمن القبول لملفك وتتجنب الرفض؟',
        desc: 'يعاني الكثير من المسافرين من رفض تأشيرة دخول تركيا نظراً لخلل بسيط في حجز الفندق أو صياغة الملف. مع وكالة عبعوب، نضمن لك فحصاً وتجهيزاً دقيقاً لملفك مع الحجوزات الرسمية لزيادة نسبة القبول لـ 99%.',
        badge: '💡 دليل التأشيرة الميسر',
        readTime: 'قراءة 4 د',
        chatInquiry: 'مرحبا وكالة عبعوب، قرأت مقال فيزا تركيا وأريد الاستفسار عن تأشيرة تركيا وتجهيز ملفي.'
      },
      {
        title: 'دليلك للعطلة العائلية المثالية في شواطئ جيجل وبجاية',
        desc: 'تحتاج العائلات لخيارات آمنة ومدروسة. لذلك نوضح لكم أهمية السكن ببلدية تاسوست لهدوئها وقربها من البحر، وطرق المحافظة على سلامة وراحة الأطفال أثناء عطلات السفر الطويلة برفقة حافلاتنا المريحة.',
        badge: '⛰️ إرشاد وتوجيه عائلي',
        readTime: 'قراءة 3 د',
        chatInquiry: 'مرحبا وكالة عبعوب، قرأت مقال إرشادات جيجل وأريد معرفة تواريخ انطلاق الحافلات لجيجل هذا الصيف.'
      }
    ],
    fr: [
      {
        title: 'Secrets du Visa Turquie : Comment garantir l\'acceptation de votre dossier ?',
        desc: 'De nombreux voyageurs font face à des refus en raison d\'erreurs simples de réservation d\'hôtel ou de formulaires. Aboub Travel sécurise vos réservations et examine minutieusement votre dossier pour atteindre 99% d\'approbations.',
        badge: '💡 Guide Visa Pratique',
        readTime: '4 min',
        chatInquiry: 'Bonjour Aboub Travel, j\'ai lu l\'article sur le visa Turquie et je veux des détails pour mon dossier.'
      },
      {
        title: 'Votre guide pour des vacances en famille idéales à Jijel et Béjaïa',
        desc: 'Pour des vacances sereines, découvrez pourquoi la tranquille commune de Tassoust est idéale pour les familles à Jijel, et comment assurer la sécurité et le sommeil de vos enfants dans nos bus confortables.',
        badge: '⛰️ Conseils Familles',
        readTime: '3 min',
        chatInquiry: 'Bonjour Aboub Travel, j\'ai lu les astuces de vacances à Jijel et je souhaite connaitre les dates de départ.'
      }
    ],
    en: [
      {
        title: 'Turkey Visa Secrets: How to guarantee file approval & avoid rejection',
        desc: 'Many tourists get rejected due to basic hotel booking mistakes or incomplete forms. Aboub Travel ensures official certified bookings and precise file reviews, raising your approval rate up to 99%.',
        badge: '💡 Smart Visa Guide',
        readTime: '4 min',
        chatInquiry: 'Hello Aboub Travel, I read the Turkey visa tips article and would like assistance with my application.'
      },
      {
        title: 'Your ultimate family vacation guide to the pristine coasts of Jijel & Bejaia',
        desc: 'Families look for premium safety and comfort. Learn why renting near Tassoust is best for peace of mind, and how we coordinate relaxing journeys for children inside our modern shuttle buses.',
        badge: '⛰️ Family Insights',
        readTime: '3 min',
        chatInquiry: 'Hello Aboub Travel, I read the Jijel beach guide and want to inquire about upcoming summer tour dates.'
      }
    ]
  };

  // Multi-lingual testimonials
  const testimonialsList = {
    ar: [
      { name: 'الحاج عبد القادر', loc: 'رحلة تونس العائلية - من ولاية تقرت', text: '"ما شاء الله تبارك الرحمن، سافرنا مع وكالة عبعوب إلى تونس في شقة عائلية فاخرة ومكيفة، التنظيم كان فوق المتوقع والحافلة مريحة جداً. خاصة المرافقة والتوجيه لأفضل المطاعم والمحلات. أنصح بالتعامل معهم بشدة."', avatar: 'ع' },
      { name: 'أم محمد أمين', loc: 'رحلة جيجل وبجاية - من تبسبست', text: '"أجمل عطلة قضيتها مع عائلتي في شواطئ جيجل وبجاية! السعر كان جد مدروس وممتاز جداً مقارنة بالخدمات وفطور الصباح في الطبيعة على ضفاف الوادي كان غاية في السحر والروعة. شكراً جزيلاً للطاقم ومرافق الرحلة الودود."', avatar: 'م' },
      { name: 'ياسين عباس', loc: 'رحلة تركيا المتميزة - من الوادي', text: '"رحلة إسطنبول مع عبعوب كانت تجربة العمر! فندق 4 نجوم بموقع استراتيجي رائع قريب من كل المرافق، وبرنامج الرحلة اليومي كان غنياً ومتكاملاً ولم نشعر بالتعب بفضل المتابعة والخطوط الجوية التركية الممتازة. شكراً لوكالتنا."', avatar: 'ي' }
    ],
    fr: [
      { name: 'El Hadj Abdelkader', loc: 'Séjour Familial Tunisie - de Touggourt', text: '"Louange à Dieu, nous avons voyagé avec l\'agence Aboub Travel vers la Tunisie dans un magnifique appartement familial climatisé. L\'organisation était parfaite et le bus luxueux. Je conseille vivement cette agence."', avatar: 'A' },
      { name: 'Oum Mohamed Amine', loc: 'Voyage Jijel & Béjaïa - de Tebesbest', text: '"Les plus belles vacances passées avec mes enfants sur les plages de Jijel et Béjaïa ! Le tarif était très étudié par rapport aux excellents services fournis par l\'accompagnateur d\'agence."', avatar: 'M' },
      { name: 'Yacine Abassi', loc: 'Circuit Istanbul de Rêve - d\'El Oued', text: '"Le voyage à Istanbul était extraordinaire ! Hôtel 4 étoiles idéalement situé à proximité directe de toutes les activités. Le planning journalier de visites guidées était parfait. Un grand bravo."', avatar: 'Y' }
    ],
    en: [
      { name: 'El Hadj Abdelkader', loc: 'Tunisia Family Trip - from Touggourt', text: '"Praise be to God, we traveled with Aboub Travel to Tunisia. We stayed in a luxurious, fully equipped family apartment. The bus was comfortable, and staff guidance was top-notch. Highly recommended!"', avatar: 'A' },
      { name: 'Oum Mohamed Amine', loc: 'Jijel & Bejaia Coast - from Tebesbest', text: '"The absolute best vacation with my children on the coastlines of Jijel and Bejaia! Priced exceptionally well compared to all the wonderful services we received during the tour."', avatar: 'M' },
      { name: 'Yacine Abassi', loc: 'Turkey Premium Tour - from El Oued', text: '"Our Istanbul trip with Aboub Travel was the tour of a lifetime! 4-star hotel in an outstanding location near all shops, and the daily tour guides were friendly and thoroughly helpful."', avatar: 'Y' }
    ]
  };

  // Multi-lingual FAQ List
  const localizedFaqs = {
    ar: [
      { q: 'ما هي طرق الدفع والتسجيل المتاحة لدى وكالتكم بتقرت؟', a: 'يمكنكم التسجيل بحضوركم لمقر الوكالة وراء بلدية تبسبست بمدينة تقرت، أو عبر إرسال وثائقكم عبر الواتساب وتسديد قيمة الحجز نقداً أو عبر الحساب الجاري البريدي (CCP).' },
      { q: 'هل يشمل سعر باقات تونس وتركيا تذاكر الطيران للذهاب والإياب؟', a: 'نعم، كافّة باقات السفر السياحية المنظمة لتركيا تشتمل على تذاكر الطائرة (ذهاب وإياب) بالفنادق والنقل، بينما تشتمل باقات تونس على تنقل مريح جداً في الحافلات المكيفة.' },
      { q: 'ما هي الأوراق المطلوبة لتوفير الفيزا الإلكترونية لتركيا بالوكالة؟', a: 'تتطلب الفيزا الإلكترونية فقط نسخة واضحة من جواز السفر الشخصي صالح لـ 6 أشهر وصورة بخلفية بيضاء، وتصدر مباشرة بالوكالة لمن تتوفر فيهم شروط العمر.' }
    ],
    fr: [
      { q: 'Quels sont les moyens de paiement et d\'inscription ?', a: 'Vous pouvez vous inscrire directement dans nos bureaux à Touggourt (Tebesbest), ou en transmettant vos documents via WhatsApp et en payant en espèces ou virement CCP.' },
      { q: 'Les séjours en Turquie incluent-ils les billets d\'avion aller-retour ?', a: 'Oui, tous nos séjours organisés en Turquie incluent les billets d\'avion (aller-retour), l\'hôtel ou appartements, les transferts de bagages et les excursions guidées.' },
      { q: 'Quelles sont les pièces requises pour le visa électronique Turquie ?', a: 'Le E-Visa requiert uniquement un passeport valide d\'au moins 6 mois et une photo d\'identité. Nous l\'émettons directement à l\'agence en 5 minutes.' }
    ],
    en: [
      { q: 'How can I register and pay for my travel packages?', a: 'You can register in person at our agency headquarters behind Tebesbest Townhall in Touggourt, or online by sending your credentials on WhatsApp and paying in cash or CCP transfer.' },
      { q: 'Do Turkey and Tunisia packages include return flight tickets?', a: 'Yes! All scheduled international holiday tours to Turkey include return airplane tickets, hotel accommodation, airport shuttle transfers, and guided city tours.' },
      { q: 'What are the required items for Istanbul online E-Visa?', a: 'E-Visa only requires a clear copy of your passport (valid for 6 months) and one colored photo. We process it instantly for eligible ages.' }
    ]
  };

  const currentArticles = articlesList[language] || articlesList['ar'];
  const currentTestimonials = testimonialsList[language] || testimonialsList['ar'];
  const currentFaq = localizedFaqs[language] || localizedFaqs['ar'];

  return (
    <div className="space-y-16 animate-fade-in text-slate-100" id="home-view" style={{ direction: dir }}>

      {/* Hero Banner Area */}
      <div className="relative rounded-[3rem] overflow-hidden bg-slate-950/20 border border-white/10 p-8 md:p-16 text-center space-y-6">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          {t('hero.welcome')}
        </h1>
        <p className="text-xs md:text-base text-slate-300 max-w-2xl mx-auto font-bold leading-relaxed">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href="tel:+213667910148"
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 px-8 py-4 rounded-full font-extrabold text-sm shadow-lg shadow-emerald-950/50 hover:scale-105 transition duration-300 cursor-pointer flex items-center gap-2 border border-emerald-400/30"
          >
            <span className="text-base">📞</span> {t('btn.phone')}
          </a>
        </div>
      </div>

      {/* List of Travel Services */}
      <div className="space-y-8 py-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full text-center">🛎️ {t('home.services.title')}</span>
          <h3 className="text-3xl md:text-4xl font-black text-white">{language === 'ar' ? 'خدمات الوكالة لراحة المسافرين' : 'Our Quality Holiday Services'}</h3>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl mx-auto font-bold leading-relaxed">
            {t('home.services.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: International Trips */}
          <div 
            onClick={() => navigateTo('intl')} 
            className="group bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-rose-500 hover:shadow-2xl hover:shadow-rose-950/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-right"
          >
            <div className="h-44 w-full relative overflow-hidden">
              <img 
                src={worldLandmarksCollage} 
                alt="International programs collage" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              <span className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} w-11 h-11 rounded-2xl bg-slate-950/80 backdrop-blur border border-white/20 text-white flex items-center justify-center text-lg shadow`}>
                ✈️
              </span>
            </div>
            <div className={`p-6 space-y-3 flex-1 flex flex-col justify-between ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-2">
                <span className="inline-block text-[10px] font-black tracking-widest text-rose-400 uppercase bg-rose-500/10 border border-rose-500/25 px-3 py-1 rounded-full">
                  {t('card.intl.tag')}
                </span>
                <h4 className="text-xl font-black text-white group-hover:text-rose-400 transition duration-300">
                  {t('card.intl.title')}
                </h4>
                <p className="text-xs md:text-sm text-slate-300 leading-safe font-bold">
                  {t('card.intl.desc')}
                </p>
              </div>
              <div className={`pt-2 text-xs font-black text-rose-400 flex items-center gap-1.5 group-hover:translate-x-[-4px] transition duration-300 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <span>{t('btn.exploreProgram')}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Local trips */}
          <div 
            onClick={() => navigateTo('local')} 
            className="group bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-950/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-right"
          >
            <div className="h-44 w-full relative overflow-hidden">
              <img 
                src={algeriaFlagTourism} 
                alt="Algerian Tourism flag" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              <span className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} w-11 h-11 rounded-2xl bg-slate-950/80 backdrop-blur border border-white/20 text-white flex items-center justify-center text-xl shadow`}>
                🇩🇿
              </span>
            </div>
            <div className={`p-6 space-y-3 flex-1 flex flex-col justify-between ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-2">
                <span className="inline-block text-[10px] font-black tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full">
                  {t('card.local.tag')}
                </span>
                <h4 className="text-xl font-black text-white group-hover:text-emerald-400 transition duration-300">
                  {t('card.local.title')}
                </h4>
                <p className="text-xs md:text-sm text-slate-300 leading-safe font-bold">
                  {t('card.local.desc')}
                </p>
              </div>
              <div className={`pt-2 text-xs font-black text-emerald-400 flex items-center gap-1.5 group-hover:translate-x-[-4px] transition duration-300 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <span>{t('btn.exploreProgram')}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Umrah */}
          <div 
            onClick={() => navigateTo('umrah')} 
            className="group bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-950/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-right"
          >
            <div className="h-44 w-full relative overflow-hidden">
              <img 
                src={makkahKaaba} 
                alt="Holy Umrah" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              <span className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} w-11 h-11 rounded-2xl bg-slate-950/80 backdrop-blur border border-white/20 text-white flex items-center justify-center text-lg shadow`}>
                🕋
              </span>
            </div>
            <div className={`p-6 space-y-3 flex-1 flex flex-col justify-between ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-2">
                <span className="inline-block text-[10px] font-black tracking-widest text-amber-400 uppercase bg-amber-500/10 border border-amber-500/25 px-3 py-1 rounded-full">
                  {t('card.umrah.tag')}
                </span>
                <h4 className="text-xl font-black text-white group-hover:text-amber-400 transition duration-300">
                  {t('card.umrah.title')}
                </h4>
                <p className="text-xs md:text-sm text-slate-300 leading-safe font-bold">
                  {t('card.umrah.desc')}
                </p>
              </div>
              <div className={`pt-2 text-xs font-black text-amber-400 flex items-center gap-1.5 group-hover:translate-x-[-4px] transition duration-300 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <span>{t('btn.exploreProgram')}</span>
              </div>
            </div>
          </div>

          {/* Card 4: Plane Tickets */}
          <div 
            onClick={() => navigateTo('flights')} 
            className="group bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-950/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-right"
          >
            <div className="h-44 w-full relative overflow-hidden">
              <img 
                src={travelFlightPlane} 
                alt="Airplane wings" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              <span className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} w-11 h-11 rounded-2xl bg-slate-950/80 backdrop-blur border border-white/20 text-white flex items-center justify-center text-lg shadow`}>
                🎫
              </span>
            </div>
            <div className={`p-6 space-y-3 flex-1 flex flex-col justify-between ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-2">
                <span className="inline-block text-[10px] font-black tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/25 px-3 py-1 rounded-full">
                  {t('card.flights.tag')}
                </span>
                <h4 className="text-xl font-black text-white group-hover:text-blue-400 transition duration-300">
                  {t('card.flights.title')}
                </h4>
                <p className="text-xs md:text-sm text-slate-300 leading-safe font-bold">
                  {t('card.flights.desc')}
                </p>
              </div>
              <div className={`pt-2 text-xs font-black text-blue-400 flex items-center gap-1.5 group-hover:translate-x-[-4px] transition duration-300 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <span>{t('btn.exploreProgram')}</span>
              </div>
            </div>
          </div>

          {/* Card 5: Hotels */}
          <div 
            onClick={() => navigateTo('hotels')} 
            className="group bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-950/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-right"
          >
            <div className="h-44 w-full relative overflow-hidden">
              <img 
                src={luxuryHotelsResorts} 
                alt="Hotel Suite" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              <span className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} w-11 h-11 rounded-2xl bg-slate-950/80 backdrop-blur border border-white/20 text-white flex items-center justify-center text-lg shadow`}>
                🏨
              </span>
            </div>
            <div className={`p-6 space-y-3 flex-1 flex flex-col justify-between ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-2">
                <span className="inline-block text-[10px] font-black tracking-widest text-violet-400 uppercase bg-violet-500/10 border border-violet-500/25 px-3 py-1 rounded-full">
                  {t('card.hotels.tag')}
                </span>
                <h4 className="text-xl font-black text-white group-hover:text-violet-400 transition duration-300">
                  {t('card.hotels.title')}
                </h4>
                <p className="text-xs md:text-sm text-slate-300 leading-safe font-bold">
                  {t('card.hotels.desc')}
                </p>
              </div>
              <div className={`pt-2 text-xs font-black text-violet-400 flex items-center gap-1.5 group-hover:translate-x-[-4px] transition duration-300 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <span>{t('btn.exploreProgram')}</span>
              </div>
            </div>
          </div>

          {/* Card 6: Visa setup */}
          <div 
            onClick={() => navigateTo('visa')} 
            className="group bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-950/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-right"
          >
            <div className="h-44 w-full relative overflow-hidden">
              <img 
                src={visaAndFlags} 
                alt="Visas and flags" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              <span className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} w-11 h-11 rounded-2xl bg-slate-950/80 backdrop-blur border border-white/20 text-white flex items-center justify-center text-lg shadow`}>
                📑
              </span>
            </div>
            <div className={`p-6 space-y-3 flex-1 flex flex-col justify-between ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-2">
                <span className="inline-block text-[10px] font-black tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/25 px-3 py-1 rounded-full">
                  {t('card.visa.tag')}
                </span>
                <h4 className="text-xl font-black text-white group-hover:text-cyan-400 transition duration-300">
                  {t('card.visa.title')}
                </h4>
                <p className="text-xs md:text-sm text-slate-300 leading-safe font-bold">
                  {t('card.visa.desc')}
                </p>
              </div>
              <div className={`pt-2 text-xs font-black text-cyan-400 flex items-center gap-1.5 group-hover:translate-x-[-4px] transition duration-300 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <span>{t('btn.exploreProgram')}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Travel Information Articles */}
      <div className="glass p-6 md:p-10 rounded-[3rem] border border-white/10 space-y-8" id="articles-single-card">
        <div className={`border-rose-500 space-y-2 p-1 ${dir === 'rtl' ? 'text-right border-r-4 pr-5' : 'text-left border-l-4 pl-5'}`}>
          <span className="text-xs font-black text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full text-center">✍️ {t('btn.chatWithAi')}</span>
          <h3 className="text-3xl md:text-4xl font-black text-white">{language === 'ar' ? 'مجلة السفر والثقافة' : 'Travel Guide & Magazine'}</h3>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl leading-relaxed font-bold">
            {t('home.faq.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          {currentArticles.map((art, artIdx) => (
            <div 
              key={artIdx}
              className={`flex flex-col md:flex-row gap-6 items-start bg-slate-950/20 p-6 rounded-3xl border border-white/5 hover:border-rose-500/20 transition-all duration-300 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
            >
              <div className="w-full md:w-44 h-40 rounded-2xl overflow-hidden relative shrink-0">
                <img 
                  src={artIdx === 0 ? "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80" : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"} 
                  alt={art.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <span className={`absolute bottom-2 ${dir === 'rtl' ? 'right-2' : 'left-2'} bg-red-600 keep-white font-black py-0.5 px-2 rounded text-[8px] uppercase`}>
                  {art.badge}
                </span>
              </div>
              <div className="space-y-2 flex-1 flex flex-col justify-between h-full">
                <div className="space-y-1">
                  <h4 className="text-base font-black text-white hover:text-rose-300 transition duration-300">{art.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    {art.desc}
                  </p>
                </div>
                <div className={`pt-2 border-t border-white/5 flex items-center justify-between text-[10px]`}>
                  <a 
                    href={getWhatsAppLink(art.chatInquiry)}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-black text-rose-400 hover:text-rose-300 flex items-center gap-1"
                  >
                    <span>{language === 'ar' ? 'استشارة بواتساب ←' : 'Consult via WhatsApp →'}</span>
                  </a>
                  <span className="text-slate-500 font-sans">{art.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Reviews */}
      <div className="space-y-6 pt-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-rose-400 tracking-widest bg-rose-500/10 px-3 py-1 rounded-full select-none">💬 {t('home.testimonials.title')}</span>
          <h3 className="text-3xl font-black text-white">{language === 'ar' ? 'بماذا ينقل زبائننا الكرام؟' : 'Happy Travelers Say...'}</h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">{t('home.testimonials.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentTestimonials.map((item, keyIdx) => (
            <div key={keyIdx} className={`glass p-6 rounded-[2rem] border border-white/5 space-y-4 ${dir === 'rtl' ? 'text-right' : 'text-left'} flex flex-col justify-between`}>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed italic font-bold">
                {item.text}
              </p>
              <div className={`flex items-center gap-3 ${dir === 'rtl' ? 'justify-end flex-row' : 'justify-start flex-row-reverse'}`}>
                <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <h4 className="text-xs font-black text-white">{item.name}</h4>
                  <p className="text-[10px] text-slate-400">{item.loc}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-600/20 text-white flex items-center justify-center font-black text-rose-400 border border-rose-500/10">
                  {item.avatar}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Guide */}
      <div className="glass p-6 md:p-8 rounded-[3rem] border border-white/10 space-y-6">
        <div className={`space-y-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1.5 rounded-full select-none">💡 {t('btn.faq')}</span>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">{t('home.faq.title')}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">{t('home.faq.subtitle')}</p>
        </div>

        <div className="space-y-3">
          {currentFaq.map((faq, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5 overflow-hidden transition-all duration-300">
              <button 
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className={`w-full p-4 font-black text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-white/5 flex justify-between items-center transition-all cursor-pointer ${
                  dir === 'rtl' ? 'text-right flex-row' : 'text-left flex-row-reverse'
                }`}
              >
                <span>{faq.q}</span>
                <span className="text-rose-500 text-sm transition-transform duration-300">{openFaq === idx ? '▲' : '▼'}</span>
              </button>
              {openFaq === idx && (
                <div className={`p-4 pt-1 text-xs text-black dark:text-slate-300 font-bold leading-relaxed bg-slate-100 dark:bg-slate-950/20 border-t border-black/5 dark:border-white/5 animate-fade-in ${
                  dir === 'rtl' ? 'pr-6' : 'pl-6'
                }`}>
                  <p className="text-black dark:text-slate-300 font-bold leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Agency definition */}
      <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-950/40 p-6 md:p-12">
        <div className="absolute top-0 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className={`lg:col-span-7 space-y-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <span className="inline-flex items-center gap-1.5 bg-red-600/20 text-red-300 px-4 py-2 rounded-full text-xs font-black">
              👋 {t('hero.welcome')}
            </span>
            
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight font-sans">
              {t('brand.name')} <span className="block text-xl md:text-2xl text-slate-300 font-bold mt-2">{t('home.info.title')}</span>
            </h1>
            
            <p className="text-slate-200 text-sm md:text-base leading-relaxed font-medium">
              {t('home.info.desc')}
            </p>

            {/* Core Phone Numbers Block */}
            <div className={`p-6 bg-slate-950/70 rounded-[2rem] border border-white/10 space-y-4 font-sans ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <span className="text-xs font-black text-rose-500 dark:text-rose-400 block mb-1">
                📞 {language === 'ar' ? 'قنوات الاتصال والحجز الرسمية (تقرت):' : 'Official Call Center (Touggourt):'}
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Primary Number */}
                <a 
                  href={getWhatsAppLink("Inquiry")}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`phone-main-number-btn bg-emerald-600/10 hover:bg-emerald-600/20 p-4 rounded-xl border border-emerald-500/20 flex items-center justify-between transition cursor-pointer group animate-pulse ${dir === 'rtl' ? 'flex-row text-right' : 'flex-row-reverse text-left'}`}
                >
                  <span className="bg-emerald-500 text-white rounded-lg px-2.5 py-1 text-[10px] font-black group-hover:scale-105 transition">
                    Primary 🟢
                  </span>
                  <div>
                    <b className="block text-emerald-400 text-base font-black tracking-wider font-sans">0667910148</b>
                    <span className="text-[10px] text-slate-300 font-bold">{language === 'ar' ? 'انقر للحجز بالواتساب' : 'Click to Chat'}</span>
                  </div>
                </a>

                {/* Backup Number */}
                <a 
                  href={getBackupWhatsAppLink("Inquiry backup")}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`phone-backup-number-btn bg-amber-600/10 hover:bg-amber-600/25 p-4 rounded-xl border border-amber-500/20 flex items-center justify-between transition cursor-pointer group ${dir === 'rtl' ? 'flex-row text-right' : 'flex-row-reverse text-left'}`}
                >
                  <span className="bg-amber-500 text-slate-950 rounded-lg px-2.5 py-1 text-[10px] font-black group-hover:scale-105 transition">
                    Backup 🚨
                  </span>
                  <div>
                    <b className="block text-amber-500 text-base font-black tracking-wider font-sans">0696789633</b>
                    <span className="text-[10px] text-slate-300 font-bold">{language === 'ar' ? 'الخط الاحتياطي المتاح' : 'Click if primary is busy'}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 h-80 lg:h-[28rem]">
            <img 
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80" 
              alt="Aboub Travel office representation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
            
            <div className={`absolute bottom-6 right-6 left-6 text-white space-y-2 text-shadow-custom ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <span className="bg-rose-600 text-white font-black py-1 px-3 rounded-full text-[10px] uppercase font-sans">
                Office 🏢
              </span>
              <h3 className="text-xl md:text-2xl font-black text-rose-400">{language === 'ar' ? 'مكتبنا بـ (تقرت)' : 'Touggourt Headquarters'}</h3>
              <p className="text-xs text-slate-200 leading-relaxed font-sans font-bold">
                {t('footer.address')}
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
