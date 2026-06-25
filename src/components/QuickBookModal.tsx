import React, { useState, useEffect } from 'react';
import { X, Plane, Building, FileText, Compass, Calendar, Users, MapPin, Coffee } from 'lucide-react';
import { getWhatsAppLink } from '../data';
import { useLanguage } from '../LanguageContext';

interface QuickBookModalProps {
  quickBookOpen: boolean;
  setQuickBookOpen: (open: boolean) => void;
  initialTrip?: string;
}

type ServiceCategory = 'flight' | 'hotel' | 'visa' | 'package';

export default function QuickBookModal({
  quickBookOpen,
  setQuickBookOpen,
  initialTrip = 'تركيا - اسطنبول',
}: QuickBookModalProps) {
  const { t, language, dir } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [quickName, setQuickName] = useState<string>('');
  const [quickPhone, setQuickPhone] = useState<string>('');
  const [quickNotes, setQuickNotes] = useState<string>('');
  const [quickTrip, setQuickTrip] = useState<string>(initialTrip);
  
  // Dynamic Service Category
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('package');

  // —— 1) FLIGHT SPECIFIC FIELDS ——
  const [flightFrom, setFlightFrom] = useState<string>('');
  const [flightTo, setFlightTo] = useState<string>('');
  const [flightDepartureDate, setFlightDepartureDate] = useState<string>('2026-07-20');
  const [flightReturnDate, setFlightReturnDate] = useState<string>('2026-08-05');
  const [flightAdults, setFlightAdults] = useState<number>(1);
  const [flightChildren, setFlightChildren] = useState<number>(0);

  // —— 2) HOTEL SPECIFIC FIELDS ——
  const [hotelCity, setHotelCity] = useState<string>('');
  const [hotelCheckIn, setHotelCheckIn] = useState<string>('2026-07-20');
  const [hotelCheckOut, setHotelCheckOut] = useState<string>('2026-07-27');
  const [hotelAdults, setHotelAdults] = useState<number>(1);
  const [hotelChildren, setHotelChildren] = useState<number>(0);
  const [hotelBoardType, setHotelBoardType] = useState<string>('فطور صباحي');
  const [hotelServices, setHotelServices] = useState<string>('');

  // —— 3) VISA SPECIFIC FIELDS ——
  const [visaCountry, setVisaCountry] = useState<string>('تركيا 🇹🇷');
  const [visaType, setVisaType] = useState<string>('tourist');

  const visaCountries = [
    { value: 'تركيا 🇹🇷', label: language === 'ar' ? 'تركيا 🇹🇷' : language === 'fr' ? 'Turquie 🇹🇷' : 'Turkey 🇹🇷' },
    { value: 'المملكة العربية السعودية 🇸🇦', label: language === 'ar' ? 'المملكة العربية السعودية (سياحة / عمرة) 🇸🇦' : language === 'fr' ? 'Arabie Saoudite (Tourisme / Omra) 🇸🇦' : 'Saudi Arabia (Tourism / Umrah) 🇸🇦' },
    { value: 'الإمارات العربية المتحدة 🇦🇪', label: language === 'ar' ? 'الإمارات العربية المتحدة (دبي/أبوظبي) 🇦🇪' : language === 'fr' ? 'Émirats Arabes Unis (Dubaï) 🇦🇪' : 'United Arab Emirates (Dubai) 🇦🇪' },
    { value: 'قطر 🇶🇦', label: 'قطر 🇶🇦' },
    { value: 'مصر 🇪🇬', label: language === 'ar' ? 'مصر 🇪🇬' : language === 'fr' ? 'Égypte 🇪🇬' : 'Egypt 🇪🇬' },
    { value: 'فرنسا 🇫🇷', label: language === 'ar' ? 'فرنسا (تأشيرة شنغن) 🇫🇷' : language === 'fr' ? 'France (Visa Schengen) 🇫🇷' : 'France (Schengen Visa) 🇫🇷' },
    { value: 'إسبانيا 🇪🇸', label: language === 'ar' ? 'إسبانيا (تأشيرة شينغن) 🇪🇸' : language === 'fr' ? 'Espagne (Visa Schengen) 🇪🇸' : 'Spain (Schengen Visa) 🇪🇸' },
    { value: 'إيطاليا 🇮🇹', label: language === 'ar' ? 'إيطاليا (تأشيرة شنغن) 🇮🇹' : language === 'fr' ? 'Italie (Visa Schengen) 🇮🇹' : 'Italy (Schengen Visa) 🇮🇹' },
    { value: 'المملكة المتحدة 🇬🇧', label: language === 'ar' ? 'المملكة المتحدة (لندن) 🇬🇧' : language === 'fr' ? 'Royaume-Uni (Londres) 🇬🇧' : 'United Kingdom (London) 🇬🇧' },
    { value: 'الولايات المتحدة الأمريكية 🇺🇸', label: language === 'ar' ? 'الولايات المتحدة الأمريكية 🇺🇸' : language === 'fr' ? 'États-Unis 🇺🇸' : 'United States 🇺🇸' },
    { value: 'كندا 🇨🇦', label: 'كندا 🇨🇦' },
    { value: 'ماليزيا 🇲🇾', label: 'ماليزيا 🇲🇾' },
    { value: 'تايلاند 🇹🇭', label: 'تايلاند 🇹🇭' },
    { value: 'وجهة دولية أخرى 🌍', label: language === 'ar' ? 'وجهة أو دولة أخرى 🌍' : 'Autre destination / Other 🌍' },
  ];

  // Sync category with the current selected trip/service
  useEffect(() => {
    setQuickTrip(initialTrip);
    syncCategory(initialTrip);
    if (quickBookOpen) {
      setStep(1);
    }
  }, [initialTrip, quickBookOpen]);

  const syncCategory = (tripValue: string) => {
    if (tripValue === 'حجز تذاكر طيران' || tripValue.includes('طيران') || tripValue.includes('flight') || tripValue.includes('Flight')) {
      setServiceCategory('flight');
    } else if (tripValue === 'حجز فنادق مميزة (فريق عبعوب)' || tripValue.includes('فنادق') || tripValue.includes('شقة') || tripValue.includes('hotel') || tripValue.includes('Hotel')) {
      setServiceCategory('hotel');
    } else if (tripValue === 'معالجة ملف تأشيرة فيزا' || tripValue.includes('تأشيرة') || tripValue.includes('فيزا') || tripValue.includes('visa') || tripValue.includes('Visa')) {
      setServiceCategory('visa');
    } else {
      setServiceCategory('package');
    }
  };

  const handleTripDropdownChange = (val: string) => {
    setQuickTrip(val);
    syncCategory(val);
  };

  const handleCategoryTabClick = (cat: ServiceCategory) => {
    setServiceCategory(cat);
    if (cat === 'flight') setQuickTrip('حجز تذاكر طيران');
    else if (cat === 'hotel') setQuickTrip('حجز فنادق مميزة (فريق عبعوب)');
    else if (cat === 'visa') setQuickTrip('معالجة ملف تأشيرة فيزا');
    else setQuickTrip('باقة إسطنبول - تركيا (129,000 دج)');
  };

  const handleFlightDateChange = (dateType: 'dep' | 'ret', val: string) => {
    if (dateType === 'dep') {
      setFlightDepartureDate(val);
      const depTime = new Date(val).getTime();
      const retTime = new Date(flightReturnDate).getTime();
      if (!isNaN(depTime) && !isNaN(retTime) && depTime > retTime) {
        setFlightReturnDate(val);
      }
    } else {
      setFlightReturnDate(val);
      const depTime = new Date(flightDepartureDate).getTime();
      const retTime = new Date(val).getTime();
      if (!isNaN(depTime) && !isNaN(retTime) && depTime > retTime) {
        setFlightDepartureDate(val);
      }
    }
  };

  const handleHotelDateChange = (dateType: 'in' | 'out', val: string) => {
    if (dateType === 'in') {
      setHotelCheckIn(val);
      const inTime = new Date(val).getTime();
      const outTime = new Date(hotelCheckOut).getTime();
      if (!isNaN(inTime) && !isNaN(outTime) && inTime > outTime) {
        setHotelCheckOut(val);
      }
    } else {
      setHotelCheckOut(val);
      const inTime = new Date(hotelCheckIn).getTime();
      const outTime = new Date(val).getTime();
      if (!isNaN(inTime) && !isNaN(outTime) && inTime > outTime) {
        setHotelCheckIn(val);
      }
    }
  };

  const isStep1Valid = quickName.trim() !== '' && quickPhone.trim() !== '';

  const isStep2Valid = () => {
    if (serviceCategory === 'flight') {
      return flightFrom.trim() !== '' && flightTo.trim() !== '' && flightDepartureDate.trim() !== '';
    }
    if (serviceCategory === 'hotel') {
      return hotelCity.trim() !== '' && hotelCheckIn.trim() !== '' && hotelCheckOut.trim() !== '';
    }
    return true;
  };

  if (!quickBookOpen) return null;

  const handleQuickBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let textDesc = '';

    if (serviceCategory === 'flight') {
      textDesc = `Bonjour Aboub Travel, je souhaite réserver un vol / Hello Aboub Travel, flight inquiry:
👤 Name/Nom: ${quickName || 'N/A'}
📞 Tel/WhatsApp: ${quickPhone || 'N/A'}
🛫 Departure/De: ${flightFrom || 'N/A'}
🛬 Destination/Vers: ${flightTo || 'N/A'}
📅 Outbound Date: ${flightDepartureDate || 'N/A'}
📅 Inbound Date: ${flightReturnDate || 'N/A'}
👥 Adults: ${flightAdults}
👶 Children: ${flightChildren}
💬 Notes: ${quickNotes || 'N/A'}`;
    } 
    else if (serviceCategory === 'hotel') {
      textDesc = `Bonjour Aboub Travel, demande de réservation d'hôtel / Cozy Hotel request:
👤 Name/Nom: ${quickName || 'N/A'}
📞 Tel/WhatsApp: ${quickPhone || 'N/A'}
📍 City/Ville: ${hotelCity || 'N/A'}
📅 Check-In: ${hotelCheckIn || 'N/A'}
📅 Check-Out: ${hotelCheckOut || 'N/A'}
👥 Adults: ${hotelAdults}
👶 Children: ${hotelChildren}
🍽️ Accommodation: ${hotelBoardType}
🏨 Preferences: ${hotelServices || 'N/A'}
💬 Notes: ${quickNotes || 'N/A'}`;
    } 
    else if (serviceCategory === 'visa') {
      textDesc = `Bonjour Aboub Travel, demande de dossier de visa / Visa application service:
👤 Name/Nom: ${quickName || 'N/A'}
📞 Tel/WhatsApp: ${quickPhone || 'N/A'}
🌍 Destination: ${visaCountry}
📑 Visa Type: ${visaType}
💬 Notes: ${quickNotes || 'N/A'}`;
    } 
    else {
      textDesc = `Bonjour Aboub Travel, demande d'inscription aux offres / Package signup request:
👤 Name/Nom: ${quickName || 'N/A'}
📞 Tel/WhatsApp: ${quickPhone || 'N/A'}
⛱️ Trip/Baque Select: ${quickTrip}
💬 Notes: ${quickNotes || 'N/A'}`;
    }
    
    window.open(getWhatsAppLink(textDesc), '_blank');
    setQuickBookOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      if (step === 1 && isStep1Valid) {
        setStep(2);
      } else if (step === 2 && isStep2Valid()) {
        setStep(3);
      }
      return;
    }
    handleQuickBookSubmit(e);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-4 overflow-y-auto">
      <div className={`glass max-w-xl w-full rounded-[2.5rem] p-6 md:p-8 border border-white/15 card-shadow space-y-6 ${dir === 'rtl' ? 'text-right' : 'text-left'} animate-fade-in relative max-h-[92vh] overflow-y-auto`}>
        
        {/* Close Button */}
        <button 
          onClick={() => setQuickBookOpen(false)}
          className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} glass w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white cursor-pointer z-10`}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <span className="inline-block red-accent text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider">Aboub Express Booking</span>
          <h3 className="text-2xl md:text-3xl font-black text-white">{t('modal.title')}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t('modal.desc')}
          </p>
        </div>

        {/* Progress Bar (Forced LTR for correct left-to-right alignment of numbers/ticks) */}
        <div className="py-2 px-1" style={{ direction: 'ltr' }}>
          <div className="relative flex items-center justify-between w-full">
            {/* Background progress track */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-white/10 rounded-full z-0"></div>
            {/* Active progress track */}
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-red-600 to-rose-500 rounded-full transition-all duration-300 z-0"
              style={{
                width: step === 1 ? '16%' : step === 2 ? '50%' : '100%'
              }}
            ></div>

            {/* Step 1 Checkpoint */}
            <button
              type="button"
              onClick={() => step > 1 && setStep(1)}
              className="relative z-10 flex flex-col items-center gap-1 group focus:outline-none"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                step >= 1 
                  ? 'bg-rose-600 text-white ring-4 ring-rose-950/50' 
                  : 'bg-slate-900 border border-white/10 text-slate-400'
              }`}>
                {step > 1 ? '✓' : '1'}
              </div>
              <span className={`text-[10px] font-bold ${step === 1 ? 'text-rose-400 font-extrabold' : 'text-slate-400'}`}>
                {language === 'ar' ? 'البيانات' : language === 'fr' ? 'Coordonnées' : 'Info'}
              </span>
            </button>

            {/* Step 2 Checkpoint */}
            <button
              type="button"
              onClick={() => {
                if (step > 2) setStep(2);
                else if (step === 1 && isStep1Valid) setStep(2);
              }}
              disabled={step === 1 && !isStep1Valid}
              className={`relative z-10 flex flex-col items-center gap-1 group focus:outline-none ${step === 1 && !isStep1Valid ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                step >= 2 
                  ? 'bg-rose-600 text-white ring-4 ring-rose-950/50' 
                  : 'bg-slate-900 border border-white/10 text-slate-400'
              }`}>
                {step > 2 ? '✓' : '2'}
              </div>
              <span className={`text-[10px] font-bold ${step === 2 ? 'text-rose-400 font-extrabold' : 'text-slate-400'}`}>
                {language === 'ar' ? 'تفاصيل الحجز' : language === 'fr' ? 'Détails' : 'Details'}
              </span>
            </button>

            {/* Step 3 Checkpoint */}
            <button
              type="button"
              disabled={step < 3 && (!isStep1Valid || !isStep2Valid())}
              onClick={() => {
                if (isStep1Valid && isStep2Valid()) setStep(3);
              }}
              className={`relative z-10 flex flex-col items-center gap-1 group focus:outline-none ${step < 3 && (!isStep1Valid || !isStep2Valid()) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                step >= 3 
                  ? 'bg-rose-600 text-white ring-4 ring-rose-950/50' 
                  : 'bg-slate-900 border border-white/10 text-slate-400'
              }`}>
                3
              </div>
              <span className={`text-[10px] font-bold ${step === 3 ? 'text-rose-400 font-extrabold' : 'text-slate-400'}`}>
                {language === 'ar' ? 'التأكيد' : language === 'fr' ? 'Confirmation' : 'Confirm'}
              </span>
            </button>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          
          {/* —— STEP 1: SERVICE TYPE & BASICS —— */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  {language === 'ar' ? 'اختر الخدمة المطلوبة:' : language === 'fr' ? 'Sélectionnez le type de service :' : 'Choose Service Type:'}
                </label>
                {/* Dynamic Category Tabs */}
                <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-950/60 rounded-2xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => handleCategoryTabClick('flight')}
                    className={`py-2 px-1 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
                      serviceCategory === 'flight' 
                        ? 'bg-rose-600 text-white shadow-lg font-black scale-102' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Plane className="w-4 h-4" />
                    <span>{language === 'ar' ? 'حجز طيران' : language === 'fr' ? 'Vol' : 'Flights'}</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleCategoryTabClick('hotel')}
                    className={`py-2 px-1 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
                      serviceCategory === 'hotel' 
                        ? 'bg-rose-600 text-white shadow-lg font-black scale-102' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>{language === 'ar' ? 'حجز فنادق' : language === 'fr' ? 'Hôtel' : 'Hotels'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCategoryTabClick('visa')}
                    className={`py-2 px-1 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
                      serviceCategory === 'visa' 
                        ? 'bg-rose-600 text-white shadow-lg font-black scale-102' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>{language === 'ar' ? 'تأشيرات' : language === 'fr' ? 'Visa' : 'Visas'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCategoryTabClick('package')}
                    className={`py-2 px-1 rounded-xl text-[11px] font-bold flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
                      serviceCategory === 'package' 
                        ? 'bg-rose-600 text-white shadow-lg font-black scale-102' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Compass className="w-4 h-4" />
                    <span>{language === 'ar' ? 'رحلاتنا' : language === 'fr' ? 'Séjour' : 'Tours'}</span>
                  </button>
                </div>
              </div>

              {/* Main User Fields: Name and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className={`space-y-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <label className="block text-xs font-bold text-slate-300">{t('modal.name')} <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder={language === 'ar' ? 'مثلاً: محمد عباسي' : 'Ex: Jean Dupont'}
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    className={`w-full bg-slate-950/60 text-white px-4 py-2.5 rounded-xl border border-white/10 text-xs focus:outline-none focus:border-red-500 font-semibold ${
                      dir === 'rtl' ? 'text-right' : 'text-left'
                    }`}
                    required
                  />
                </div>

                <div className={`space-y-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <label className="block text-xs font-bold text-slate-300">{t('modal.phone')} <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Ex: 0696789633"
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    className={`w-full bg-slate-950/60 text-white px-4 py-2.5 rounded-xl border border-white/10 text-xs focus:outline-none focus:border-red-500 font-bold ${
                      dir === 'rtl' ? 'text-right' : 'text-left'
                    }`}
                    style={{ direction: 'ltr' }}
                    required
                  />
                </div>
              </div>

              {/* Interactive Prompt / Hint */}
              <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-center">
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                  {language === 'ar' ? '⚡ املأ اسمك ورقم الموبايل للانتقال للخطوة التالية وإجراء الحجز فوراً.' : '⚡ Remplissez votre nom et téléphone pour passer à l\'étape suivante.'}
                </p>
              </div>

              {/* Action */}
              <button
                type="button"
                disabled={!isStep1Valid}
                onClick={() => setStep(2)}
                className={`w-full py-3.5 rounded-xl font-black text-xs shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  isStep1Valid 
                    ? 'bg-gradient-to-r from-red-600 to-rose-500 text-white hover:scale-[1.01] hover:brightness-115' 
                    : 'bg-slate-900 text-slate-500 border border-white/5 opacity-55 cursor-not-allowed'
                }`}
              >
                {language === 'ar' ? 'التالي: تفاصيل طلبك ➔' : language === 'fr' ? 'Suivant : Vos détails ➔' : 'Next: Your Details ➔'}
              </button>
            </div>
          )}

          {/* —— STEP 2: CATEGORY SPECIFIC DETAILS —— */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              
              {/* —— CATEGORY 1: FLIGHT FIELDS —— */}
              {serviceCategory === 'flight' && (
                <div className="space-y-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className={`flex items-center gap-1.5 pb-2 border-b border-white/10 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <Plane className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-black text-rose-300">{language === 'ar' ? 'تفاصيل تذكرة الطيران المطلوبة:' : 'Détails du vol souhaité / Flight details:'}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold text-slate-300 flex items-center gap-1 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                        <MapPin className="w-3 h-3 text-rose-400" />
                        <span>{t('flight.from')} <span className="text-red-500">*</span></span>
                      </label>
                      <input 
                        type="text" 
                        placeholder={language === 'ar' ? 'مثال: الجزائر العاصمة' : 'Ex: Alger / Oran'}
                        value={flightFrom}
                        onChange={(e) => setFlightFrom(e.target.value)}
                        className={`w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-white/10 text-xs focus:border-rose-500 font-medium ${
                          dir === 'rtl' ? 'text-right' : 'text-left'
                        }`}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold text-slate-300 flex items-center gap-1 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>{t('flight.to')} <span className="text-red-500">*</span></span>
                      </label>
                      <input 
                        type="text" 
                        placeholder={language === 'ar' ? 'مثال: إسطنبول' : 'Ex: Istanbul / Paris'}
                        value={flightTo}
                        onChange={(e) => setFlightTo(e.target.value)}
                        className={`w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-white/10 text-xs focus:border-rose-500 font-medium ${
                          dir === 'rtl' ? 'text-right' : 'text-left'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold text-slate-300 flex items-center gap-1 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                        <Calendar className="w-3 h-3 text-rose-400" />
                        <span>{t('flight.date.out')} <span className="text-red-500">*</span></span>
                      </label>
                      <input 
                        type="date"
                        value={flightDepartureDate}
                        onChange={(e) => handleFlightDateChange('dep', e.target.value)}
                        className={`w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-white/10 text-xs focus:border-rose-500 font-bold ${
                          dir === 'rtl' ? 'text-right' : 'text-left'
                        }`}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold text-slate-300 flex items-center gap-1 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{t('flight.date.ret')}</span>
                      </label>
                      <input 
                        type="date"
                        value={flightReturnDate}
                        onChange={(e) => handleFlightDateChange('ret', e.target.value)}
                        className={`w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-white/10 text-xs focus:border-rose-500 font-bold ${
                          dir === 'rtl' ? 'text-right' : 'text-left'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Passenger counts */}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold text-slate-300 flex items-center gap-1 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                        <Users className="w-3 h-3 text-slate-400" />
                        <span>{language === 'ar' ? 'البالغين:' : 'Adultes/Adults:'}</span>
                      </label>
                      <input 
                        type="number"
                        min="1"
                        max="30"
                        value={flightAdults}
                        onChange={(e) => setFlightAdults(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-white/10 text-center text-xs focus:border-rose-500 font-extrabold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold text-slate-300 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{language === 'ar' ? 'الأطفال أقل من 12 سنة:' : 'Enfants/Children <12:'}</label>
                      <input 
                        type="number"
                        min="0"
                        max="15"
                        value={flightChildren}
                        onChange={(e) => setFlightChildren(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-white/10 text-center text-xs focus:border-rose-500 font-extrabold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* —— CATEGORY 2: HOTEL FIELDS —— */}
              {serviceCategory === 'hotel' && (
                <div className="space-y-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className={`flex items-center gap-1.5 pb-2 border-b border-white/10 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <Building className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-black text-emerald-300">{language === 'ar' ? 'تفاصيل حجز الفندق أو الشقة:' : 'Détails d\'hôtel souhaité / Hotel details:'}</span>
                  </div>

                  <div className="space-y-1">
                    <label className={`block text-[11px] font-bold text-slate-300 flex items-center gap-1 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                      <MapPin className="w-3 h-3 text-rose-400" />
                      <span>{t('hotel.dest')} <span className="text-red-500">*</span></span>
                    </label>
                    <input 
                      type="text" 
                      placeholder={language === 'ar' ? 'مثال: سوسة، تونس' : 'Ex: Sousse, Tunisie / Bejaia'}
                      value={hotelCity}
                      onChange={(e) => setHotelCity(e.target.value)}
                      className={`w-full bg-slate-950 text-white px-3 py-2.5 rounded-xl border border-white/10 text-xs focus:border-emerald-500 font-medium ${
                        dir === 'rtl' ? 'text-right' : 'text-left'
                      }`}
                      required
                    />
                  </div>

                  {/* Dates for Hotels */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold text-slate-300 flex items-center gap-1 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                        <Calendar className="w-3 h-3 text-emerald-400" />
                        <span>{language === 'ar' ? 'تاريخ الدخول:' : language === 'fr' ? 'Check-in :' : 'Check-In:'} <span className="text-red-500">*</span></span>
                      </label>
                      <input 
                        type="date"
                        value={hotelCheckIn}
                        onChange={(e) => handleHotelDateChange('in', e.target.value)}
                        className={`w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-white/10 text-xs focus:border-emerald-500 font-bold ${
                          dir === 'rtl' ? 'text-right' : 'text-left'
                        }`}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold text-slate-300 flex items-center gap-1 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                        <Calendar className="w-3 h-3 text-rose-400" />
                        <span>{language === 'ar' ? 'تاريخ المغادرة:' : language === 'fr' ? 'Check-out :' : 'Check-Out:'} <span className="text-red-500">*</span></span>
                      </label>
                      <input 
                        type="date"
                        value={hotelCheckOut}
                        min={hotelCheckIn}
                        onChange={(e) => handleHotelDateChange('out', e.target.value)}
                        className={`w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-white/10 text-xs focus:border-emerald-500 font-bold ${
                          dir === 'rtl' ? 'text-right' : 'text-left'
                        }`}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className={`block text-[11px] font-bold text-slate-300 flex items-center gap-1 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                      <Coffee className="w-3 h-3 text-amber-400" />
                      <span>{language === 'ar' ? 'الوجبات المقترحة:' : 'Pension/Meals:'}</span>
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 text-[10px] font-bold text-center">
                      {[
                        { val: 'مبيت فقط', label: language === 'ar' ? 'مبيت فقط' : 'Chambre seule' },
                        { val: 'فطور صباحي', label: language === 'ar' ? 'فطور صباحي' : 'Petit déj' },
                        { val: 'نصف معاش', label: language === 'ar' ? 'نصف معاش' : 'Demi-pension' },
                        { val: 'معاش كامل', label: language === 'ar' ? 'معاش كامل' : 'Pension Complète' },
                      ].map((option) => (
                        <button
                          key={option.val}
                          type="button"
                          onClick={() => setHotelBoardType(option.val)}
                          className={`py-2 px-1 rounded-lg border transition cursor-pointer ${
                            hotelBoardType === option.val 
                              ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200 font-black' 
                              : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold text-slate-300 flex items-center gap-1 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                        <Users className="w-3 h-3 text-slate-400" />
                        <span>{language === 'ar' ? 'البالغين:' : 'Adultes/Adults:'}</span>
                      </label>
                      <input 
                        type="number"
                        min="1"
                        max="10"
                        value={hotelAdults}
                        onChange={(e) => setHotelAdults(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-white/10 text-center text-xs focus:border-emerald-500 font-extrabold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className={`block text-[11px] font-bold text-slate-300 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{language === 'ar' ? 'الأطفال أقل من 12 سنة:' : 'Enfants/Children:'}</label>
                      <input 
                        type="number"
                        min="0"
                        max="10"
                        value={hotelChildren}
                        onChange={(e) => setHotelChildren(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-slate-950 text-white px-3 py-2 rounded-xl border border-white/10 text-center text-xs focus:border-emerald-500 font-extrabold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* —— CATEGORY 3: VISA FIELDS —— */}
              {serviceCategory === 'visa' && (
                <div className="space-y-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className={`flex items-center gap-1.5 pb-2 border-b border-white/10 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <FileText className="w-4 h-4 text-cyan-500" />
                    <span className="text-xs font-black text-cyan-300">{t('card.visa.tag')}</span>
                  </div>

                  <div className="space-y-1">
                    <label className={`block text-xs font-bold text-slate-300 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t('visa.country')}</label>
                    <select 
                      value={visaCountry}
                      onChange={(e) => setVisaCountry(e.target.value)}
                      className={`w-full bg-slate-950 text-white px-3 py-2.5 rounded-xl border border-white/10 text-xs focus:outline-none focus:border-cyan-500 font-bold cursor-pointer ${
                        dir === 'rtl' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {visaCountries.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className={`block text-xs font-bold text-slate-300 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{language === 'ar' ? 'نوع التأشيرة:' : 'Type de Visa / Visa Type:'}</label>
                    <select 
                      value={visaType}
                      onChange={(e) => setVisaType(e.target.value)}
                      className={`w-full bg-slate-950 text-white px-3 py-2.5 rounded-xl border border-white/10 text-xs focus:outline-none focus:border-cyan-500 font-bold cursor-pointer ${
                        dir === 'rtl' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <option value="tourist">✈️ Tourist Visa</option>
                      <option value="work">💼 Work / Business Visa</option>
                      <option value="study">🎓 Study / Educational Visa</option>
                      <option value="medical">🏥 Medical / Health Visa</option>
                      <option value="family">👥 Personal / Family Visit</option>
                    </select>
                  </div>
                </div>
              )}

              {/* —— CATEGORY 4: STANDARD PACKAGE DETAILS —— */}
              {serviceCategory === 'package' && (
                <div className="space-y-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className={`flex items-center gap-1.5 pb-2 border-b border-white/10 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <Compass className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-black text-rose-300">{language === 'ar' ? 'حدد وجهتك المفضلة:' : 'Choisissez votre séjour / Target Package:'}</span>
                  </div>

                  <div className="space-y-1">
                    <select 
                      value={quickTrip}
                      onChange={(e) => handleTripDropdownChange(e.target.value)}
                      className={`w-full bg-slate-950 text-white px-3 py-2.5 rounded-xl border border-white/10 text-xs focus:outline-none focus:border-red-500 font-bold cursor-pointer ${
                        dir === 'rtl' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <option value="باقة إسطنبول - تركيا (129,000 دج)">🇹🇷 Turkey - Istanbul (8 Days / Voyages Organisés)</option>
                      <option value="باقة تونس - سوسة والحمامات">🇹🇳 Tunisia - Sousse / Hammamet (Vols & Hôtels)</option>
                      <option value="عرض خاص تونس - فندق Soviva Resort (45,000 دج)">🇹🇳 Tunisia - Soviva Resort Special Deal</option>
                      <option value="رحلة جيجل والشرق الساحر (12,900 دج)">🇩🇿 Algeria - Jijel & Bejaia (Excursion d'été)</option>
                      <option value="رحلة الجزائر العاصمة وبومرداس وتيبازة (12,500 دج)">🇩🇿 Algeria - Algiers / Tipaza / Boumerdes</option>
                      <option value="البقاع المقدسة - الحج والعمرة 1446هـ2">🕋 Holy Umrah Package (Saison 1446H-2026)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Navigation Action Buttons */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 bg-slate-900 border border-white/10 text-slate-300 hover:text-white rounded-xl font-bold text-xs transition cursor-pointer"
                >
                  {language === 'ar' ? '⬅ السابق' : language === 'fr' ? '⬅ Précédent' : '⬅ Back'}
                </button>
                
                <button
                  type="button"
                  disabled={!isStep2Valid()}
                  onClick={() => setStep(3)}
                  className={`col-span-2 py-3 rounded-xl font-black text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    isStep2Valid()
                      ? 'bg-gradient-to-r from-red-600 to-rose-500 text-white hover:scale-[1.01] hover:brightness-110'
                      : 'bg-slate-800 text-slate-400 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {language === 'ar' ? 'التالي: تأكيد وحجز المقعد ➔' : language === 'fr' ? 'Suivant : Récapitulatif ➔' : 'Next: Summary ➔'}
                </button>
              </div>
            </div>
          )}

          {/* —— STEP 3: RECAPITULATION & WhatsApp SUBMIT (High Conversion) —— */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              {/* Summary Card */}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-bold text-white text-sm">{language === 'ar' ? 'ملخص طلب الحجز المقترح:' : 'Récapitulatif de votre demande :'}</span>
                  <span className="text-[10px] red-accent px-2.5 py-0.5 rounded text-white font-black uppercase tracking-wider">{serviceCategory}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <span className="text-slate-400 font-bold">{t('modal.name')}: </span>
                    <span className="font-semibold text-white">{quickName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold">{t('modal.phone')}: </span>
                    <span className="font-bold text-white tracking-wide" style={{ direction: 'ltr', display: 'inline-block' }}>{quickPhone}</span>
                  </div>
                  {serviceCategory === 'flight' && (
                    <>
                      <div>
                        <span className="text-slate-400 font-bold">{t('flight.from')}: </span>
                        <span className="font-semibold text-white">{flightFrom}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold">{t('flight.to')}: </span>
                        <span className="font-semibold text-white">{flightTo}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold">{t('flight.date.out')}: </span>
                        <span className="font-semibold text-white font-mono">{flightDepartureDate}</span>
                      </div>
                      {flightReturnDate && (
                        <div>
                          <span className="text-slate-400 font-bold">{t('flight.date.ret')}: </span>
                          <span className="font-semibold text-white font-mono">{flightReturnDate}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-slate-400 font-bold">{language === 'ar' ? 'الركاب:' : 'Passagers:'} </span>
                        <span className="font-bold text-rose-400">{flightAdults} {language === 'ar' ? 'بالغ' : 'Ad'} / {flightChildren} {language === 'ar' ? 'طفل' : 'Ch'}</span>
                      </div>
                    </>
                  )}

                  {serviceCategory === 'hotel' && (
                    <>
                      <div>
                        <span className="text-slate-400 font-bold">{t('hotel.dest')}: </span>
                        <span className="font-semibold text-white">{hotelCity}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold">{language === 'ar' ? 'تاريخ الدخول:' : language === 'fr' ? 'Check-In :' : 'Check-In:'}: </span>
                        <span className="font-semibold text-white font-mono">{hotelCheckIn}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold">{language === 'ar' ? 'تاريخ المغادرة:' : language === 'fr' ? 'Check-Out :' : 'Check-Out:'}: </span>
                        <span className="font-semibold text-white font-mono">{hotelCheckOut}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold">{language === 'ar' ? 'نوع الإقامة وعرض الوجبات:' : 'Régime repas :'}: </span>
                        <span className="font-semibold text-white">{hotelBoardType}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold">{language === 'ar' ? 'الأفراد النزلاء:' : 'Séjournants:'} </span>
                        <span className="font-bold text-emerald-400">{hotelAdults} {language === 'ar' ? 'بالغ' : 'Ad'} / {hotelChildren} {language === 'ar' ? 'طفل' : 'Ch'}</span>
                      </div>
                    </>
                  )}

                  {serviceCategory === 'visa' && (
                    <>
                      <div>
                        <span className="text-slate-400 font-bold">{t('visa.country')}: </span>
                        <span className="font-semibold text-white">{visaCountry}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold">{language === 'ar' ? 'نوع تأشيرة السفر المطلوب:' : 'Type de Visa demandé :'} </span>
                        <span className="font-semibold text-rose-300">{visaType === 'tourist' ? '✈️ Tourist' : visaType === 'work' ? '💼 Work/Business' : visaType === 'study' ? '🎓 Study' : visaType === 'medical' ? '🏥 Medical' : '👥 Personal/Family'}</span>
                      </div>
                    </>
                  )}

                  {serviceCategory === 'package' && (
                    <div className="col-span-2">
                      <span className="text-slate-400 font-bold">{language === 'ar' ? 'البرنامج السياحي المختار:' : 'Séjour / Offre proposé :'}: </span>
                      <span className="font-semibold text-rose-400">{quickTrip}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Extra Notes & Preferences */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300">
                  {language === 'ar' ? 'أية تفاصيل أو تفضيلات أخرى للفريق (اختياري):' : 'Recommandations spéciales / Particularités (optionnel) :'}
                </label>
                <textarea 
                  placeholder={language === 'ar' ? 'مثلاً: تفضيل فندق 4 نجوم، مقعد بجانب النافذة، تاريخ محدد... اكتبها هنا' : 'Ex: Lit bébé de préférence, hôtel 4-étoiles au centre, chambre double...'}
                  value={quickNotes}
                  onChange={(e) => setQuickNotes(e.target.value)}
                  rows={2}
                  className={`w-full bg-slate-950/50 text-white p-3 rounded-xl border border-white/10 text-xs focus:outline-none focus:border-red-500 font-medium ${
                    dir === 'rtl' ? 'text-right' : 'text-left'
                  }`}
                />
              </div>

              {/* Final Step Navigation & Submit (Immediate redirection to friendly agent via WhatsApp) */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-3.5 bg-slate-900 border border-white/10 text-slate-300 hover:text-white rounded-xl font-bold text-xs transition cursor-pointer"
                >
                  {language === 'ar' ? '⬅ السابق' : language === 'fr' ? '⬅ Précédent' : '⬅ Back'}
                </button>
                
                <button 
                  type="submit"
                  className="col-span-2 bg-gradient-to-r from-red-600 to-rose-500 text-white py-3.5 rounded-xl font-black text-xs shadow-md hover:scale-[1.01] hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  📱 {language === 'ar' ? 'تأكيد وإرسال للوكالة فوراً' : 'Finaliser & envoyer sur WhatsApp'}
                </button>
              </div>
            </div>
          )}

        </form>

      </div>
    </div>
  );
}
