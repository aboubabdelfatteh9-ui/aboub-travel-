import React, { useState } from 'react';
import { Calendar, Building, HelpCircle, ArrowRight, Shield, Award, CheckCircle, Bed, User, MapPin, Search } from 'lucide-react';
import { getWhatsAppLink } from '../data';
import { ALL_DESTINATIONS } from '../data/destinations';
import { useLanguage } from '../LanguageContext';
// @ts-ignore
import luxuryHotelsResorts from '../assets/images/luxury_hotel_new_1781117201677.png';

interface HotelsViewProps {
  navigateTo: (tab: string) => void;
}

export default function HotelsView({ navigateTo }: HotelsViewProps) {
  const { language, dir } = useLanguage();
  
  const [destSearch, setDestSearch] = useState('');
  const [destOpen, setDestOpen] = useState(false);
  const [starRating, setStarRating] = useState('4-star');
  const [checkIn, setCheckIn] = useState('2026-07-25');
  const [checkOut, setCheckOut] = useState('2026-08-01');

  const getDaysInMonth = (month: number, year: number) => {
    // month is 1-indexed (1-12)
    return new Date(year, month, 0).getDate();
  };

  const splitDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    return {
      year: parts[0] || '2026',
      month: parts[1] || '07',
      day: parts[2] || '25'
    };
  };

  const handleDateChange = (dateType: 'in' | 'out', unit: 'year' | 'month' | 'day', val: string) => {
    const current = dateType === 'in' ? checkIn : checkOut;
    const parts = current.split('-');
    let y = parts[0] || '2026';
    let m = parts[1] || '07';
    let d = parts[2] || '25';
    
    if (unit === 'year') y = val;
    if (unit === 'month') m = val.padStart(2, '0');
    if (unit === 'day') d = val.padStart(2, '0');
    
    // Validate and clamp day
    const numY = parseInt(y, 10);
    const numM = parseInt(m, 10);
    const maxDays = getDaysInMonth(numM, numY);
    let numD = parseInt(d, 10);
    if (numD > maxDays) {
      numD = maxDays;
    }
    d = numD.toString().padStart(2, '0');
    
    const updated = `${y}-${m}-${d}`;
    if (dateType === 'in') {
      setCheckIn(updated);
      const inTime = new Date(updated).getTime();
      const outTime = new Date(checkOut).getTime();
      if (!isNaN(inTime) && !isNaN(outTime) && inTime > outTime) {
        setCheckOut(updated);
      }
    } else {
      setCheckOut(updated);
      const inTime = new Date(checkIn).getTime();
      const outTime = new Date(updated).getTime();
      if (!isNaN(inTime) && !isNaN(outTime) && inTime > outTime) {
        setCheckIn(updated);
      }
    }
  };
  const [roomType, setRoomType] = useState('family-suite');
  const [adultsCount, setAdultsCount] = useState<number>(0);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [mealPlan, setMealPlan] = useState<'breakfast' | 'half-board' | 'all-inclusive'>('half-board');

  const ROOM_TYPES = [
    { value: 'single', name: language === 'ar' ? 'غرفة فردية لشخص واحد (Single Room)' : language === 'fr' ? 'Chambre Individuelle (Single)' : 'Single Room (1 Person)' },
    { value: 'double', name: language === 'ar' ? 'غرفة ثنائية لشخصين (Double / Twin Room)' : language === 'fr' ? 'Chambre Double / Twin' : 'Double / Twin Room (2 Persons)' },
    { value: 'triple', name: language === 'ar' ? 'غرفة ثلاثية لثلاثة أشخاص (Triple Room)' : language === 'fr' ? 'Chambre Triple' : 'Triple Room (3 Persons)' },
    { value: 'family-suite', name: language === 'ar' ? 'جناح عائلي واسع ومجهز بالكامل (Family Suite)' : language === 'fr' ? 'Suite Familiale Spacieuse' : 'Spacious Family Suite' }
  ];

  const roomTypeName = ROOM_TYPES.find(r => r.value === roomType)?.name || roomType;

  const getMealPlanText = () => {
    if (mealPlan === 'breakfast') {
      return language === 'ar' ? 'فطور الصباح فقط (Breakfast)' : language === 'fr' ? 'Petit-déjeuner inclus seulement' : 'Breakfast only';
    }
    if (mealPlan === 'half-board') {
      return language === 'ar' ? 'نصف إقامة (فطور الصباح وعشاء - Half Board)' : language === 'fr' ? 'Demi-pension (Petit-déjeuner + Dîner)' : 'Half Board (Breakfast + Dinner)';
    }
    return language === 'ar' ? 'إقامة كاملة شاملة كليا (فطور وغداء وعشاء ومشروبات - All Inclusive)' : language === 'fr' ? 'Pension Complète / All-Inclusive' : 'Full Board / All-Inclusive';
  };

  const getStarRatingText = () => {
    if (starRating === '5-star') return language === 'ar' ? '⭐⭐⭐⭐⭐ فندق 5 نجوم فاخر وممتاز جداً' : '⭐⭐⭐⭐⭐ Hôtel 5 Étoiles Luxe';
    if (starRating === '4-star') return language === 'ar' ? '⭐⭐⭐⭐ فندق 4 نجوم راقي وممتاز' : '⭐⭐⭐⭐ Hôtel 4 Étoiles Privilège';
    if (starRating === '3-star') return language === 'ar' ? '⭐⭐⭐ فندق 3 نجوم اقتصادي ونظيف' : '⭐⭐⭐ Hôtel 3 Étoiles Standard';
    if (starRating === '2-star') return language === 'ar' ? '⭐⭐ فندق نجمتان مريح واقتصادي' : '⭐⭐ Hôtel 2 Étoiles Simple';
    if (starRating === '1-star') return language === 'ar' ? '⭐ فندق نجمة واحدة اقتصادي أساسي' : '⭐ Hôtel 1 Étoile Économique';
    return language === 'ar' ? '🏠 شقة سكنية عائلية مجهزة بالكامل ومكيفة (شقق)' : '🏠 Appartement Familial Équipé & Climatisé';
  };

  const getFilteredDestinations = (searchVal: string) => {
    const q = searchVal.toLowerCase().trim();
    if (!q) {
      return ALL_DESTINATIONS.filter(d => d.id.startsWith('curated') || d.country === 'الجزائر' || d.country === 'تونس').slice(0, 25);
    }

    return ALL_DESTINATIONS.filter(dest => {
      return (
        dest.city.toLowerCase().includes(q) ||
        dest.cityEn.toLowerCase().includes(q) ||
        dest.country.toLowerCase().includes(q) ||
        dest.countryEn.toLowerCase().includes(q) ||
        (dest.tags && dest.tags.toLowerCase().includes(q))
      );
    }).sort((a, b) => {
      const aCurated = a.id.startsWith('curated');
      const bCurated = b.id.startsWith('curated');
      if (aCurated && !bCurated) return -1;
      if (bCurated && !aCurated) return 1;

      const aDz = a.country === 'الجزائر';
      const bDz = b.country === 'الجزائر';
      if (aDz && !bDz) return -1;
      if (bDz && !aDz) return 1;

      const aTn = a.country === 'تونس';
      const bTn = b.country === 'تونس';
      if (aTn && !bTn) return -1;
      if (bTn && !aTn) return 1;

      return 0;
    }).slice(0, 15);
  };

  const handlesubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const isAr = language === 'ar';
    const message = isAr ? `مرحباً وكالة عبعوب للأسفار والرحلات،
أود الاستفسار وحجز فندق/إقامة سياحية بالتفاصيل التالية:
- الوجهة المطلوبة: ${destSearch}
- تصنيف الإقامة المفضل: ${getStarRatingText()}
- نوع الغرفة المطلوبة: ${roomTypeName}
- تاريخ الدخول الاستحقاقي: ${checkIn}
- تاريخ الخروج والعودة: ${checkOut}
- تفاصيل النزلاء المسافرين: ${adultsCount} بالغين و ${childrenCount} أطفال
- نظام الوجبات المفضل: ${getMealPlanText()}

الرجاء موافاتنا بالفنادق المتاحة وأسعار الإقامات الحصرية المتوفرة بالموسم لديكم. شكراً جزيلاً!`
: `Bonjour Aboub Travel,
Je souhaite demander un devis et réserver un hôtel :
- Destination: ${destSearch}
- Catégorie d'hôtel: ${getStarRatingText()}
- Type de chambre: ${roomTypeName}
- Date d'arrivée: ${checkIn}
- Date de départ: ${checkOut}
- Voyageurs: ${adultsCount} Adulte(s), ${childrenCount} Enfant(s)
- Formule repas: ${getMealPlanText()}

Merci de nous envoyer les offres d'hôtels disponibles.`;

    const link = getWhatsAppLink(message);
    window.open(link, '_blank');
  };

  const labels = {
    back: language === 'ar' ? 'الرجوع للرئيسية' : language === 'fr' ? "Retour à l'accueil" : "Back to Home",
    portalTitle: language === 'ar' ? 'بوابة حجز الفنادق العالمية والمحلية الفاخرة 🏨' : language === 'fr' ? "Réservation d'Hôtels Internationaux & Locaux 🏨" : "Luxury Global & Local Hotel Booking 🏨",
    exclusive: language === 'ar' ? '🏨 عقود حصرية وتثبيت فوري' : language === 'fr' ? "🏨 Tarifs Négociés & Confirmation Directe" : "🏨 Exclusive Rates & Direct Confirmation",
    title: language === 'ar' ? 'حجوزات الفنادق والشقق العائلية' : language === 'fr' ? "Hôtels & Appartements Familiaux" : "Hotels & Family Apartments",
    desc: language === 'ar' 
      ? 'استكشف باقة من أرقى الفنادق والمنتجعات الشاطئية في تونس وتركيا بالإضافة لشقق عائلية راقية بالجزائر العاصمة وجيجل وسائر مدن العالم.' 
      : language === 'fr' 
        ? "Explorez notre sélection d'hôtels et de complexes hôteliers en Tunisie, en Turquie, en Algérie et partout dans le monde." 
        : "Discover fine beach resorts and luxury hotels in Tunisia, Turkey, Algeria, and major destinations worldwide.",
    destLabel: language === 'ar' ? 'الوجهة السياحية، أدخل اسم مدينة أو فندق' : language === 'fr' ? "Destination touristique (Ville ou Hôtel)" : "Tourist Destination (City or Hotel)",
    destPlaceholder: language === 'ar' 
      ? 'أدخل مدينة أو فندق ترغب بزيارته (مثال: جيجل، الحمامات، إسطنبول، دبي...)' 
      : language === 'fr' 
        ? "Saisissez une ville ou un hôtel (Ex: Hammamet, Istanbul, Alger, Dubaï...)" 
        : "Search cities, resorts or hotels (e.g., Hammamet, Istanbul, Algiers, Dubai...)",
    suggestionHeader: language === 'ar' ? 'مقترحات المدن والوجهات' : language === 'fr' ? "Destinations suggérées" : "Suggested Destinations",
    suggestionSub: language === 'ar' ? 'اضغط لتلبية وتحديد وجهتك السياحية' : language === 'fr' ? "Cliquez sur une suggestion ci-dessous" : "Click to select destination",
    emptyDest: language === 'ar' ? 'لم نجد أي وجهة مطابقة، يمكنك كتابة الوجهة المرغوبة بحرية 🚀' : language === 'fr' ? "Aucun résultat trouvé, vous pouvez écrire librement 🚀" : "No exact match found, feel free to type custom destination 🚀",
    starLabel: language === 'ar' ? 'تصنيف وبنية الإقامة المقترحة' : language === 'fr' ? "Catégorie de l'Hébergement" : "Accommodation Category",
    star5: language === 'ar' ? 'فندق 5 نجوم فاخر (5 Stars)' : language === 'fr' ? "Hôtel 5 Étoiles Luxe" : "Luxury 5-Star Hotel",
    star4: language === 'ar' ? 'فندق 4 نجوم مميز (4 Stars)' : language === 'fr' ? "Hôtel 4 Étoiles Supérieur" : "Superior 4-Star Hotel",
    star3: language === 'ar' ? 'فندق 3 نجوم اقتصادي (3 Stars)' : language === 'fr' ? "Hôtel 3 Étoiles Standard" : "Standard 3-Star Hotel",
    star2: language === 'ar' ? 'فندق نجمتين بسيط (2 Stars)' : language === 'fr' ? "Hôtel 2 Étoiles Simple" : "Simple 2-Star Hotel",
    star1: language === 'ar' ? 'فندق نجمة واحدة (1 Star)' : language === 'fr' ? "Hôtel 1 Étoile" : "1-Star Hotel",
    starApp: language === 'ar' ? 'شقة سياحية عائلية مجهزة (Apartment)' : language === 'fr' ? "Appartement Familiale équipé" : "Fully Equipped Family Apartment",
    roomLabel: language === 'ar' ? 'نوع وتصميم الغرفة المفضلة' : language === 'fr' ? "Type de chambre préféré" : "Preferred Room Type",
    dateIn: language === 'ar' ? 'تاريخ الدخول والوصول' : language === 'fr' ? "Date d'entrée (Check-In)" : "Check-In Date",
    dateOut: language === 'ar' ? 'تاريخ المغادرة والعودة' : language === 'fr' ? "Date de sortie (Check-Out)" : "Check-Out Date",
    guestHeader: language === 'ar' ? '👥 تحديد دقيق لعدد المسافرين والنزلاء' : language === 'fr' ? "👥 Nombre de Voyageurs (Adultes & Enfants)" : "👥 Precise Guests & Travel Party Count",
    adultsLabel: language === 'ar' ? 'عدد الكبار والبالغين (السن +12 سنة)' : language === 'fr' ? "Adultes (Âge 12 ans et +)" : "Adults (Age 12+ years)",
    childrenLabel: language === 'ar' ? 'عدد الأطفال المرافقين (السن 2 إلى 11 سنة)' : language === 'fr' ? "Enfants (Âge 2 à 11 ans)" : "Children (Age 2-11 years)",
    adultsCountStr: (count: number) => {
      if (language !== 'ar') return `${count} ${count > 1 ? 'Adults' : 'Adult'}`;
      return count === 0 ? 'بدون بالغين' : count === 1 ? 'بالغ واحد' : count === 2 ? 'شخصين بالغين' : `${count} بالغين`;
    },
    kidsCountStr: (count: number) => {
      if (language !== 'ar') return `${count} ${count > 1 ? 'Children' : 'Child'}`;
      return count === 0 ? 'بدون أطفال مرافقين' : count === 1 ? 'طفل واحد' : count === 2 ? 'طفلين اثنين' : `${count} أطفال`;
    },
    mealHeader: language === 'ar' ? '🍽️ نظام وخطة الوجبات المفضلة لديك' : language === 'fr' ? "🍽️ Formule de Restauration Préférée" : "🍽️ Preferred Dining / Meal Plan Option",
    optionBreakfastSub: language === 'ar' ? 'إفطار صباحي' : language === 'fr' ? "Petit-Déjeuner" : "Bed & Breakfast",
    optionBreakfastVal: language === 'ar' ? 'تضمين فطور الصباح ☕' : language === 'fr' ? "Petit-déjeuner inclus ☕" : "Breakfast only ☕",
    optionBreakfastDesc: language === 'ar' ? 'عشاء مستقل لتجربة المطاعم المحلية' : language === 'fr' ? "Idéal pour explorer les restaurants locaux" : "Great option to explore local restaurants",
    optionHalfSub: language === 'ar' ? 'نصف إقامة عائلية 🌟' : language === 'fr' ? "Demi-Pension 🌟" : "Half-Board 🌟",
    optionHalfVal: language === 'ar' ? 'فطور الصباح + العشاء 🍖' : language === 'fr' ? "Petit-déjeuner + Dîner 🍖" : "Breakfast + Dinner 🍖",
    optionHalfDesc: language === 'ar' ? 'الخيار المثالي والأكثر توفيراً وراحة للعائلات' : language === 'fr' ? "Excellent choix confortable pour familles" : "Saves budget, deeply relaxing and popular layout",
    optionAllSub: language === 'ar' ? 'إقامة كاملة وشاملة' : language === 'fr' ? "Tout Inclus (All Inclusive)" : "All Inclusive",
    optionAllVal: language === 'ar' ? 'كامل الوجبات والمشروبات 🍹' : language === 'fr' ? "Pension Complète + Boissons 🍹" : "All meals & drinks included 🍹",
    optionAllDesc: language === 'ar' ? 'راحة واستجمام متميز بدون تفكير في التكاليف' : language === 'fr' ? "Détente absolue sans penser au budget" : "Worry-free experience with maximum comfort",
    partnershipCheck: language === 'ar' ? '✓ شراكات مباشرة مع كبار موفري الفنادق' : language === 'fr' ? "✓ Partenariats Directs & Tarifs Négociés" : "✓ Direct Sourcing & Negotiated Tarifs",
    partnershipDesc: language === 'ar' 
      ? 'تضم وكالة عبعوب شبكة عقود قوية ومباشرة في تونس (الحمامات، سوسة) وتركيا (إسطنبول) لضمان أسعار عائلية ممتازة وحجوزات حقيقية مؤكدة يتم إرسال وثائق سكنها مباشرة عبر الواتساب.' 
      : language === 'fr' 
        ? "Aboub Travel s'appuie sur des contrats exclusifs en Tunisie et en Turquie, garantissant les meilleurs prix et des vouchers confirmés de suite par WhatsApp." 
        : "Aboub Travel features strong direct contracts in Tunisia & Turkey, guaranteeing top family pricing and instant booking vouchers sent over WhatsApp.",
    btnBooking: language === 'ar' ? '🏨 طلب عرض تسعير وحجز الفندق فوراً' : language === 'fr' ? "🏨 Demander un devis & Réserver de suite" : "🏨 Request Quote & Confirm Booking Now",
    trust1Title: language === 'ar' ? 'تأكيد سكن حقيقي وموثق' : language === 'fr' ? "Logements Certifiés" : "100% Certified Booking",
    trust1Desc: language === 'ar' ? 'فنادق عائلية متميزة تم اختيارها وتجريبها من قبل كادر عبعوب لضمان أعلى جودة لعائلتكم.' : language === 'fr' ? "Sélectionnés de près par notre équipe pour le confort de votre famille." : "Personally verified by Aboub Travel specialists for absolute comfort.",
    trust2Title: language === 'ar' ? 'أسعار ملائمة وعقود حصرية' : language === 'fr' ? "Tarifs Exclusifs" : "Exclusive Best Rates",
    trust2Desc: language === 'ar' ? 'تخفيضات ومميزات خاصة بالوكالة لا تتوفر على بوابات الحجز العامة عبر الإنترنت.' : language === 'fr' ? "Remises significatives par rapport aux plateformes publiques du web." : "Deep direct discounts not available on public websites.",
    trust3Title: language === 'ar' ? 'مرونة تامة في التعديل' : language === 'fr' ? "Flexibilité Totale" : "Complete Booking Flexibility",
    trust3Desc: language === 'ar' ? 'دعم متواصل عالي المرونة في حال الرغبة بتمديد الإقامة أو تغيير الوجبات والغرف مجاناً.' : language === 'fr' ? "Support premium 24/7 en cas de changement de séjour ou de repas." : "Dedicated 24/7 client assistant for changes or extensions."
  };

  return (
    <div className="space-y-12 animate-fade-in text-slate-100" id="hotels-booking-view" style={{ direction: dir }}>
      
      {/* Return to Home Section */}
      <div className="flex justify-between items-center bg-slate-950/20 p-3.5 rounded-3xl border border-white/5">
        <button 
          onClick={() => navigateTo('home')} 
          className="glass py-2 px-5 rounded-2xl border border-white/10 font-bold text-slate-300 hover:text-white flex items-center gap-2 cursor-pointer transition text-sm"
        >
          <ArrowRight className={`w-4 h-4 text-violet-500 ${dir === 'rtl' ? '' : 'rotate-180'}`} />
          <span>{labels.back}</span>
        </button>
        <span className="text-xs text-slate-400 font-bold">{labels.portalTitle}</span>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto glass rounded-[3.5rem] border border-white/10 card-shadow overflow-hidden relative">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl"></div>
        
        {/* Banner header image */}
        <div className="w-full h-72 relative overflow-hidden border-b border-white/5">
          <img 
            src={luxuryHotelsResorts} 
            alt="luxury hotels resorts" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
          
          <div className={`absolute bottom-6 right-6 left-6 z-10 text-white space-y-2 select-none keep-white ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <span className="inline-block text-[10px] font-black tracking-widest text-violet-300 bg-violet-600/30 border border-violet-400/40 px-3.5 py-1 rounded-full mb-1">
              {labels.exclusive}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">{labels.title}</h2>
            <p className="text-xs sm:text-sm text-slate-100 max-w-xl leading-relaxed font-bold drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.95)]">
              {labels.desc}
            </p>
          </div>
        </div>

        {/* Dynamic Hotels Booking Form */}
        <form onSubmit={handlesubmitWhatsApp} className={`p-6 md:p-10 space-y-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          
          {/* Destination Autocomplete Input */}
          <div className="space-y-2 relative" id="hotel-destination-search-container">
            <label className={`text-xs font-black text-slate-300 block flex items-center gap-1.5 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
              <MapPin className="w-4 h-4 text-violet-400" />
              <span>{labels.destLabel}</span>
            </label>
            <div className="relative">
              <input 
                type="text"
                required
                placeholder={labels.destPlaceholder}
                value={destSearch}
                onFocus={() => setDestOpen(true)}
                onBlur={() => setTimeout(() => setDestOpen(false), 250)}
                onChange={(e) => {
                  setDestSearch(e.target.value);
                  setDestOpen(true);
                }}
                className={`w-full bg-slate-950 border border-white/10 rounded-2xl py-3.5 px-12 text-xs font-bold text-white outline-none focus:border-violet-500 transition ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="w-4 h-4 text-violet-500" />
              </div>

              {/* Autocomplete Dropdown suggestions list */}
              {destOpen && (
                <div className={`absolute left-0 right-0 mt-2 bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-y-auto max-h-72 z-50 divide-y divide-white/5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <div className="p-2.5 text-[10px] font-black text-slate-400 bg-slate-900/60 select-none flex justify-between items-center px-4 sticky top-0 backdrop-blur-md border-b border-white/5">
                    <span>{labels.suggestionSub}</span>
                    <span>{labels.suggestionHeader} ({getFilteredDestinations(destSearch).length})</span>
                  </div>
                  {getFilteredDestinations(destSearch).map((dest) => (
                    <div 
                      key={dest.id}
                      onMouseDown={() => {
                        setDestSearch(`${dest.flag} ${dest.city} - ${dest.country}`);
                        setDestOpen(false);
                      }}
                      className="p-3.5 hover:bg-white/10 cursor-pointer transition flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1 rounded-xl">
                        <span className="text-xs">{dest.flag}</span>
                        <span className="text-[10px] font-black text-slate-300">{dest.country}</span>
                      </div>
                      <div className={`flex flex-col gap-0.5 max-w-[70%] ${dir === 'rtl' ? 'items-end' : 'items-start'}`}>
                        <span className="text-xs font-black text-white">{dest.city}</span>
                        <span className="text-[10px] text-slate-500 font-bold font-mono tracking-wide truncate w-full">{dest.cityEn}, {dest.countryEn}</span>
                      </div>
                    </div>
                  ))}
                  {getFilteredDestinations(destSearch).length === 0 && (
                    <div className="p-4 text-center text-xs font-bold text-slate-500">
                      {labels.emptyDest}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Hotel Class stars rating selection & Room type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className={`text-xs font-black text-slate-300 block flex items-center gap-1.5 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <Building className="w-4 h-4 text-violet-400" />
                <span>{labels.starLabel}</span>
              </label>
              <select 
                value={starRating}
                onChange={(e) => setStarRating(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-3 px-4 text-xs font-bold text-white outline-none cursor-pointer focus:border-violet-500 transition"
              >
                <option value="5-star">⭐ ⭐ ⭐ ⭐ ⭐ {labels.star5}</option>
                <option value="4-star">⭐ ⭐ ⭐ ⭐ {labels.star4}</option>
                <option value="3-star">⭐ ⭐ ⭐ {labels.star3}</option>
                <option value="2-star">⭐ ⭐ {labels.star2}</option>
                <option value="1-star">⭐ {labels.star1}</option>
                <option value="apartment">{labels.starApp}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className={`text-xs font-black text-slate-300 block flex items-center gap-1.5 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <Bed className="w-4 h-4 text-pink-400" />
                <span>{labels.roomLabel}</span>
              </label>
              <select 
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-2xl py-3 px-4 text-xs font-bold text-white outline-none cursor-pointer focus:border-violet-500 transition"
              >
                {ROOM_TYPES.map(room => (
                  <option key={room.value} value={room.value}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Calendar CheckIn CheckOut Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2 border-b border-white/5">
            
            <div className="space-y-2">
              <label className={`text-xs font-black text-slate-300 flex items-center gap-1.5 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <Calendar className="w-4 h-4 text-violet-500" />
                <span>{labels.dateIn}</span>
              </label>
              <div className="flex gap-2 font-mono">
                <div className="flex-1 focus-within:border-violet-500 rounded-2xl border border-white/10 bg-slate-950 px-2 py-1 flex flex-col justify-center">
                  <span className="text-[9px] text-slate-400 font-bold text-center block mb-0.5">{language === 'ar' ? 'اليوم' : language === 'fr' ? 'Jour' : 'Day'}</span>
                  <select
                    value={parseInt(splitDate(checkIn).day, 10).toString()}
                    onChange={(e) => handleDateChange('in', 'day', e.target.value)}
                    className="bg-transparent text-center text-xs font-black text-white outline-none cursor-pointer w-full text-center"
                    style={{ direction: 'ltr' }}
                  >
                    {Array.from(
                      { length: getDaysInMonth(parseInt(splitDate(checkIn).month, 10), parseInt(splitDate(checkIn).year, 10)) },
                      (_, i) => i + 1
                    ).map(d => (
                      <option key={d} value={d.toString()}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 focus-within:border-violet-500 rounded-2xl border border-white/10 bg-slate-950 px-2 py-1 flex flex-col justify-center">
                  <span className="text-[9px] text-slate-400 font-bold text-center block mb-0.5">{language === 'ar' ? 'الشهر' : language === 'fr' ? 'Mois' : 'Month'}</span>
                  <select
                    value={parseInt(splitDate(checkIn).month, 10).toString()}
                    onChange={(e) => handleDateChange('in', 'month', e.target.value)}
                    className="bg-transparent text-center text-xs font-black text-white outline-none cursor-pointer w-full text-center"
                    style={{ direction: 'ltr' }}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                      <option key={m} value={m.toString()}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-[1.2] focus-within:border-violet-500 rounded-2xl border border-white/10 bg-slate-950 px-2 py-1 flex flex-col justify-center">
                  <span className="text-[9px] text-slate-400 font-bold text-center block mb-0.5">{language === 'ar' ? 'السنة' : language === 'fr' ? 'Année' : 'Year'}</span>
                  <select
                    value={splitDate(checkIn).year}
                    onChange={(e) => handleDateChange('in', 'year', e.target.value)}
                    className="bg-transparent text-center text-xs font-black text-white outline-none cursor-pointer w-full text-center"
                    style={{ direction: 'ltr' }}
                  >
                    {[2026, 2027, 2028].map(y => (
                      <option key={y} value={y.toString()}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-xs font-black text-slate-300 flex items-center gap-1.5 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <Calendar className="w-4 h-4 text-pink-500" />
                <span>{labels.dateOut}</span>
              </label>
              <div className="flex gap-2 font-mono">
                <div className="flex-1 focus-within:border-pink-500 rounded-2xl border border-white/10 bg-slate-950 px-2 py-1 flex flex-col justify-center">
                  <span className="text-[9px] text-slate-400 font-bold text-center block mb-0.5">{language === 'ar' ? 'اليوم' : language === 'fr' ? 'Jour' : 'Day'}</span>
                  <select
                    value={parseInt(splitDate(checkOut).day, 10).toString()}
                    onChange={(e) => handleDateChange('out', 'day', e.target.value)}
                    className="bg-transparent text-center text-xs font-black text-white outline-none cursor-pointer w-full text-center"
                    style={{ direction: 'ltr' }}
                  >
                    {Array.from(
                      { length: getDaysInMonth(parseInt(splitDate(checkOut).month, 10), parseInt(splitDate(checkOut).year, 10)) },
                      (_, i) => i + 1
                    ).map(d => (
                      <option key={d} value={d.toString()}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 focus-within:border-pink-500 rounded-2xl border border-white/10 bg-slate-950 px-2 py-1 flex flex-col justify-center">
                  <span className="text-[9px] text-slate-400 font-bold text-center block mb-0.5">{language === 'ar' ? 'الشهر' : language === 'fr' ? 'Mois' : 'Month'}</span>
                  <select
                    value={parseInt(splitDate(checkOut).month, 10).toString()}
                    onChange={(e) => handleDateChange('out', 'month', e.target.value)}
                    className="bg-transparent text-center text-xs font-black text-white outline-none cursor-pointer w-full text-center"
                    style={{ direction: 'ltr' }}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                      <option key={m} value={m.toString()}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-[1.2] focus-within:border-pink-500 rounded-2xl border border-white/10 bg-slate-950 px-2 py-1 flex flex-col justify-center">
                  <span className="text-[9px] text-slate-400 font-bold text-center block mb-0.5">{language === 'ar' ? 'السنة' : language === 'fr' ? 'Année' : 'Year'}</span>
                  <select
                    value={splitDate(checkOut).year}
                    onChange={(e) => handleDateChange('out', 'year', e.target.value)}
                    className="bg-transparent text-center text-xs font-black text-white outline-none cursor-pointer w-full text-center"
                    style={{ direction: 'ltr' }}
                  >
                    {[2026, 2027, 2028].map(y => (
                      <option key={y} value={y.toString()}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Guest Count Selector */}
          <div className="space-y-3">
            <span className={`text-xs font-black text-slate-300 block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{labels.guestHeader}</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-950/5 dark:bg-slate-950/20 p-5 rounded-3xl border border-black/5 dark:border-white/5">
              
              <div className="space-y-3">
                <label className={`text-xs font-black text-slate-300 flex items-center gap-1.5 select-none ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                  <User className="w-4 h-4 text-violet-400" />
                  <span>{labels.adultsLabel}</span>
                </label>
                <div className="flex items-center justify-between bg-white dark:bg-slate-950 border border-black/10 dark:border-white/10 rounded-2xl p-2 h-12">
                  <button
                    type="button"
                    onClick={() => setAdultsCount(prev => Math.max(0, prev - 1))}
                    className="w-10 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/15 active:scale-95 text-black dark:text-white font-extrabold text-2xl rounded-xl transition flex items-center justify-center border border-black/5 dark:border-white/5 cursor-pointer leading-none"
                  >
                    -
                  </button>
                  <span className="text-sm font-black text-slate-900 dark:text-white px-4">
                    {labels.adultsCountStr(adultsCount)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAdultsCount(prev => prev + 1)}
                    className="w-10 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/15 active:scale-95 text-black dark:text-white font-extrabold text-2xl rounded-xl transition flex items-center justify-center border border-black/5 dark:border-white/5 cursor-pointer leading-none"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className={`text-xs font-black text-slate-300 flex items-center gap-1.5 select-none ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                  <User className="w-4 h-4 text-pink-400" />
                  <span>{labels.childrenLabel}</span>
                </label>
                <div className="flex items-center justify-between bg-white dark:bg-slate-950 border border-black/10 dark:border-white/10 rounded-2xl p-2 h-12">
                  <button
                    type="button"
                    onClick={() => setChildrenCount(prev => Math.max(0, prev - 1))}
                    className="w-10 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/15 active:scale-95 text-black dark:text-white font-extrabold text-2xl rounded-xl transition flex items-center justify-center border border-black/5 dark:border-white/5 cursor-pointer leading-none"
                  >
                    -
                  </button>
                  <span className="text-sm font-black text-slate-900 dark:text-white px-4">
                    {labels.kidsCountStr(childrenCount)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setChildrenCount(prev => prev + 1)}
                    className="w-10 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/15 active:scale-95 text-black dark:text-white font-extrabold text-2xl rounded-xl transition flex items-center justify-center border border-black/5 dark:border-white/5 cursor-pointer leading-none"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Meal Option selection */}
          <div className="space-y-4">
            <span className={`text-xs font-black text-slate-300 block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{labels.mealHeader}</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <label className={`border rounded-2xl p-4 flex flex-col justify-between cursor-pointer text-center select-none transition ${mealPlan === 'breakfast' ? 'border-violet-500 bg-violet-500/5' : 'border-white/15 hover:border-white/30'}`}>
                <input 
                  type="radio" 
                  name="hotel-meal" 
                  checked={mealPlan === 'breakfast'}
                  onChange={() => setMealPlan('breakfast')}
                  className="sr-only" 
                />
                <span className="text-[10px] font-black text-slate-400">{labels.optionBreakfastSub}</span>
                <span className="text-sm font-black text-white mt-1">{labels.optionBreakfastVal}</span>
                <span className="text-[9px] text-slate-400 mt-2">{labels.optionBreakfastDesc}</span>
              </label>

              <label className={`border rounded-2xl p-4 flex flex-col justify-between cursor-pointer text-center select-none transition ${mealPlan === 'half-board' ? 'border-violet-500 bg-violet-500/5' : 'border-white/15 hover:border-white/30'}`}>
                <input 
                  type="radio" 
                  name="hotel-meal" 
                  checked={mealPlan === 'half-board'} 
                  onChange={() => setMealPlan('half-board')}
                  className="sr-only" 
                />
                <span className="text-[10px] font-black text-violet-400">{labels.optionHalfSub}</span>
                <span className="text-sm font-black text-white mt-1">{labels.optionHalfVal}</span>
                <span className="text-[9px] text-slate-300 mt-2">{labels.optionHalfDesc}</span>
              </label>

              <label className={`border rounded-2xl p-4 flex flex-col justify-between cursor-pointer text-center select-none transition ${mealPlan === 'all-inclusive' ? 'border-violet-500 bg-violet-500/5' : 'border-white/15 hover:border-white/30'}`}>
                <input 
                  type="radio" 
                  name="hotel-meal" 
                  checked={mealPlan === 'all-inclusive'} 
                  onChange={() => setMealPlan('all-inclusive')}
                  className="sr-only" 
                />
                <span className="text-[10px] font-black text-pink-500">{labels.optionAllSub}</span>
                <span className="text-sm font-black text-white mt-1">{labels.optionAllVal}</span>
                <span className="text-[9px] text-slate-400 mt-2">{labels.optionAllDesc}</span>
              </label>

            </div>
          </div>

          <div className="h-px bg-white/10 my-6"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-950/40 p-5 rounded-3xl border border-white/5">
            <div className={`space-y-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <span className="text-[10px] font-black text-emerald-400 block">{labels.partnershipCheck}</span>
              <p className="text-xs text-slate-400 leading-relaxed font-bold">
                {labels.partnershipDesc}
              </p>
            </div>
            
            <button 
              type="submit"
              className="w-full md:w-auto h-12 bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-black px-10 rounded-2xl hover:scale-103 transition cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-violet-500/10 shrink-0 text-sm"
            >
              {labels.btnBooking}
            </button>
          </div>

        </form>

      </div>

      {/* Trust Elements */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
        <div className="glass p-5 rounded-3xl border border-white/5 flex flex-col items-center gap-2">
          <Shield className="w-8 h-8 text-violet-500" />
          <h4 className="text-sm font-black text-white">{labels.trust1Title}</h4>
          <p className="text-[10px] text-slate-400 leading-relaxed">{labels.trust1Desc}</p>
        </div>
        <div className="glass p-5 rounded-3xl border border-white/5 flex flex-col items-center gap-2">
          <Award className="w-8 h-8 text-pink-500" />
          <h4 className="text-sm font-black text-white">{labels.trust2Title}</h4>
          <p className="text-[10px] text-slate-400 leading-relaxed">{labels.trust2Desc}</p>
        </div>
        <div className="glass p-5 rounded-3xl border border-white/5 flex flex-col items-center gap-2">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
          <h4 className="text-sm font-black text-white">{labels.trust3Title}</h4>
          <p className="text-[10px] text-slate-400 leading-relaxed">{labels.trust3Desc}</p>
        </div>
      </div>

    </div>
  );
}
