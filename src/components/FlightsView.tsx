import React, { useState, useEffect } from 'react';
import { Calendar, Users, Plane, ArrowLeft, ArrowRight, Shield, Award, CheckCircle, Search, ChevronsUpDown } from 'lucide-react';
import { getWhatsAppLink } from '../data';
import { ALL_AIRPORTS } from '../data/airports';
import { useLanguage } from '../LanguageContext';
// @ts-ignore
import travelFlightPlane from '../assets/images/travel_flight_plane_1781111990606.png';

interface FlightsViewProps {
  navigateTo: (tab: string) => void;
}

export default function FlightsView({ navigateTo }: FlightsViewProps) {
  const { t, language, dir } = useLanguage();
  const [tripType, setTripType] = useState<'round-trip' | 'one-way'>('round-trip');
  const [depSearch, setDepSearch] = useState('');
  const [arrSearch, setArrSearch] = useState('');
  const [depOpen, setDepOpen] = useState(false);
  const [arrOpen, setArrOpen] = useState(false);
  const [depDate, setDepDate] = useState('2026-07-20');
  const [retDate, setRetDate] = useState('2026-08-05');

  const getDaysInMonth = (month: number, year: number) => {
    // month is 1-indexed (1-12)
    return new Date(year, month, 0).getDate();
  };

  const splitDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    return {
      year: parts[0] || '2026',
      month: parts[1] || '07',
      day: parts[2] || '20'
    };
  };

  const handleDateChange = (dateType: 'dep' | 'ret', unit: 'year' | 'month' | 'day', val: string) => {
    const current = dateType === 'dep' ? depDate : retDate;
    const parts = current.split('-');
    let y = parts[0] || '2026';
    let m = parts[1] || '07';
    let d = parts[2] || '20';
    
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
    if (dateType === 'dep') {
      setDepDate(updated);
      const depTime = new Date(updated).getTime();
      const retTime = new Date(retDate).getTime();
      if (!isNaN(depTime) && !isNaN(retTime) && depTime > retTime) {
        setRetDate(updated);
      }
    } else {
      setRetDate(updated);
      const depTime = new Date(depDate).getTime();
      const retTime = new Date(updated).getTime();
      if (!isNaN(depTime) && !isNaN(retTime) && depTime > retTime) {
        setDepDate(updated);
      }
    }
  };
  const [adults, setAdults] = useState<number>(0);
  const [kids, setKids] = useState<number>(0);
  const [cabinClass, setCabinClass] = useState<'economy' | 'business' | 'first'>('economy');
  const [baggage, setBaggage] = useState<'standard' | 'extra' | 'double'>('extra');

  const getBaggageText = () => {
    if (language === 'ar') {
      if (baggage === 'standard') return 'حقيبة يد 10 كغ فقط';
      if (baggage === 'extra') return 'حقيبة يد 10 كغ + حقيبة شحن 23 كغ';
      return 'حقيبة يد + حقيبتين شحن (مجموع 46 كغ)';
    } else if (language === 'fr') {
      if (baggage === 'standard') return 'Bagage cabine 10 kg seulement';
      if (baggage === 'extra') return 'Bagage cabine 10 kg + bagage cabine 23 kg';
      return 'Bagage cabine + 2 bagages cabine (total 46 kg)';
    } else {
      if (baggage === 'standard') return 'Cabin bag 10 kg only';
      if (baggage === 'extra') return 'Cabin bag 10 kg + checked bag 23 kg';
      return 'Cabin bag + 2 checked bags (total 46 kg)';
    }
  };

  const getCabinText = () => {
    if (language === 'ar') {
      if (cabinClass === 'economy') return 'الدرجة السياحية (Economy)';
      if (cabinClass === 'business') return 'درجة رجال الأعمال (Business)';
      return 'الدرجة الأولى الفاخرة (First Class)';
    } else if (language === 'fr') {
      if (cabinClass === 'economy') return 'Classe Économique (Economy)';
      if (cabinClass === 'business') return 'Classe Affaires (Business)';
      return 'Première Classe (First)';
    } else {
      if (cabinClass === 'economy') return 'Economy Class';
      if (cabinClass === 'business') return 'Business Class';
      return 'First Class';
    }
  };

  const getBadgeText = (text: string, fallback: string) => {
    // If text contains a code in parenthesis (e.g. (ALG)), extract it
    const match = text.match(/\(([A-Z]{3})\)/i);
    if (match) return match[1].toUpperCase();

    const clean = text.trim();
    if (!clean) return fallback;
    if (clean.length >= 3 && clean.length <= 5 && /^[a-zA-Z0-9]+$/.test(clean)) {
      return clean.toUpperCase();
    }
    // Also check if any word of 3 letters matches
    const words = clean.split(/[\s,]+/);
    for (const word of words) {
      if (word.length === 3 && /^[a-zA-Z]{3}$/.test(word)) {
        return word.toUpperCase();
      }
    }
    return fallback;
  };

  // Filter Airports logic with prioritised sorting (Algeria first, exact prefix code match first)
  const getFilteredAirports = (searchVal: string) => {
    const q = searchVal.toLowerCase().trim();
    if (!q) {
      // Default initial display: prioritizing all Algerian airports followed by key international hubs
      return ALL_AIRPORTS.filter(a => a.countryAr === 'الجزائر' || ['IST', 'TUN', 'JED', 'DXB', 'CDG'].includes(a.code)).slice(0, 25);
    }

    const matches = ALL_AIRPORTS.filter(airport => {
      return (
        airport.code.toLowerCase().includes(q) ||
        airport.name.toLowerCase().includes(q) ||
        airport.english.toLowerCase().includes(q) ||
        airport.airport.toLowerCase().includes(q) ||
        airport.countryAr.toLowerCase().includes(q) ||
        airport.country.toLowerCase().includes(q) ||
        (airport.tags && airport.tags.toLowerCase().includes(q))
      );
    });

    return matches.sort((a, b) => {
      const aCode = a.code.toLowerCase();
      const bCode = b.code.toLowerCase();
      // Exact code match absolute priority
      if (aCode === q) return -1;
      if (bCode === q) return 1;

      // Starts with query on code or name
      const aStartCode = aCode.startsWith(q);
      const bStartCode = bCode.startsWith(q);
      if (aStartCode && !bStartCode) return -1;
      if (bStartCode && !aStartCode) return 1;

      const aStartName = a.name.toLowerCase().startsWith(q) || a.english.toLowerCase().startsWith(q);
      const bStartName = b.name.toLowerCase().startsWith(q) || b.english.toLowerCase().startsWith(q);
      if (aStartName && !bStartName) return -1;
      if (bStartName && !aStartName) return 1;

      // Algeria regional priority for easier customer flow
      const aDz = a.countryAr === 'الجزائر';
      const bDz = b.countryAr === 'الجزائر';
      if (aDz && !bDz) return -1;
      if (bDz && !aDz) return 1;

      return 0;
    }).slice(0, 15);
  };

  const handlesubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depSearch.trim() || !arrSearch.trim()) return;

    let message = "";
    if (language === 'ar') {
      message = `مرحباً وكالة عبعوب للأسفار والرحلات،
أود الاستعلام وحجز تذكرة طيران معتمدة بالتفاصيل التالية:
- نوع الرحلة: ${tripType === 'round-trip' ? 'ذهاب وعودة 🔄' : 'ذهاب فقط ➡️'}
- مطار المغادرة: ${depSearch.trim()}
- مطار الوصول: ${arrSearch.trim()}
- تاريخ المغادرة: ${depDate}
${tripType === 'round-trip' ? `- تاريخ العودة: ${retDate}` : ''}
- درجة السفر: ${getCabinText()}
- الأمتعة المفضلة: ${getBaggageText()}
- المسافرون: بالغين (${adults}) ${kids > 0 ? `| أطفال (${kids})` : ''}

يرجى إفادتنا بأفضل أسعار شركات الطيران المتوفرة والرحلات المتاحة في أقرب وقت. شكراً لكم!`;
    } else if (language === 'fr') {
      message = `Bonjour Agence de Voyage Aboub,
Je souhaite me renseigner et réserver un billet d'avion avec les détails suivants :
- Type de vol : ${tripType === 'round-trip' ? 'Aller-Retour 🔄' : 'Aller-Simple ➡️'}
- Aéroport de départ : ${depSearch.trim()}
- Aéroport d'arrivée : ${arrSearch.trim()}
- Date de départ : ${depDate}
${tripType === 'round-trip' ? `- Date de retour : ${retDate}` : ''}
- Classe de voyage : ${getCabinText()}
- Bagages : ${getBaggageText()}
- Voyageurs : Adultes (${adults}) ${kids > 0 ? `| Enfants (${kids})` : ''}

Merci de me communiquer les meilleurs tarifs et vos vols disponibles dès que possible. Cordialement !`;
    } else {
      message = `Hello Aboub Travel Agency,
I would like to inquire about and book a flight ticket with the following details:
- Trip type: ${tripType === 'round-trip' ? 'Round-trip 🔄' : 'One-way ➡️'}
- Departure airport: ${depSearch.trim()}
- Arrival airport: ${arrSearch.trim()}
- Departure date: ${depDate}
${tripType === 'round-trip' ? `- Return date: ${retDate}` : ''}
- Travel class: ${getCabinText()}
- Baggage allowance: ${getBaggageText()}
- Passengers: Adults (${adults}) ${kids > 0 ? `| Kids (${kids})` : ''}

Please let us know the best available airlines fare and options as soon as possible. Thank you!`;
    }

    const link = getWhatsAppLink(message);
    window.open(link, '_blank');
  };

  return (
    <div className="space-y-12 animate-fade-in" id="flights-booking-view">
      
      {/* Return to Home Section */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() => navigateTo('home')} 
          className="glass py-2 px-5 rounded-2xl border border-white/10 font-bold text-slate-300 hover:text-white flex items-center gap-2 cursor-pointer transition text-sm"
        >
          {dir === 'rtl' ? <ArrowRight className="w-4 h-4 text-rose-500" /> : <ArrowLeft className="w-4 h-4 text-rose-500" />}
          <span>{t("btn.backHome")}</span>
        </button>
        <span className="text-xs text-slate-400 font-bold">
          {language === 'ar' 
            ? 'بوابة حجز تذاكر الطيران المعتمدة ✈️' 
            : language === 'fr' 
              ? 'Portail agréé de réservation de vols ✈️' 
              : 'Authorized Flight Booking Portal ✈️'}
        </span>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto glass rounded-[3.5rem] border border-white/10 card-shadow overflow-hidden relative">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl"></div>
        
        {/* Banner header image */}
        <div className="w-full h-72 relative overflow-hidden border-b border-white/5">
          <img 
            src={travelFlightPlane} 
            alt="تذاكر وحجوزات طيران طائرة تحلق فوق السحاب" 
            className="w-full h-full object-cover"
          />
          {/* Deep gradient background overlay directly on the picture */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
          
          <div className={`absolute bottom-6 right-6 left-6 ${dir === 'rtl' ? 'text-right' : 'text-left'} z-10 text-white space-y-2 select-none keep-white`}>
            <span className="inline-block text-[10px] font-black tracking-widest text-blue-300 bg-blue-600/30 border border-blue-400/40 px-3.5 py-1 rounded-full mb-1 bg-blue-600">
              {language === 'ar' ? '🎫 حجز وتأكيد مؤكد فوري' : language === 'fr' ? '🎫 Réservation & confirmation immédiate' : '🎫 Instant Booking & Confirmation'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              {t("flight.search.title")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-100 max-w-xl leading-relaxed font-bold drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.95)]">
              {t("flight.search.subtitle")}
            </p>
          </div>
        </div>

        {/* Dynamic Flight Selector Form */}
        <form onSubmit={handlesubmitWhatsApp} className={`p-6 md:p-10 space-y-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          
          {/* Trip Type Selector & Cabin Class selection */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 p-2 rounded-2xl border border-white/10 select-none">
            
            {/* Round trip vs One way */}
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => setTripType('round-trip')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${tripType === 'round-trip' ? 'red-accent text-white shadow' : 'text-slate-300 hover:bg-white/5'}`}
              >
                🔄 {language === 'ar' ? 'ذهاب وعودة' : language === 'fr' ? 'Aller-Retour' : 'Round-Trip'}
              </button>
              <button 
                type="button"
                onClick={() => setTripType('one-way')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${tripType === 'one-way' ? 'red-accent text-white shadow' : 'text-slate-300 hover:bg-white/5'}`}
              >
                ➡️ {language === 'ar' ? 'ذهاب فقط' : language === 'fr' ? 'Aller Simple' : 'One-Way'}
              </button>
            </div>

            {/* Flight Class Selection */}
            <div className="flex gap-1 items-center">
              <span className="text-xs text-slate-400 ml-2">{t("flight.class")}</span>
              <select 
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value as any)}
                className="bg-slate-950/85 border border-white/10 rounded-xl py-1 px-3 text-xs font-bold text-white outline-none cursor-pointer focus:border-rose-500 max-w-[200px]"
              >
                <option value="economy">{language === 'ar' ? 'السياحية 🎒' : language === 'fr' ? 'Classe Économique 🎒' : 'Economy Class 🎒'}</option>
                <option value="business">{language === 'ar' ? 'رجال الأعمال 💼' : language === 'fr' ? 'Affaires 💼' : 'Business Class 💼'}</option>
                <option value="first">{language === 'ar' ? 'الدرجة الأولى 👑' : language === 'fr' ? 'Première Classe 👑' : 'First Class 👑'}</option>
              </select>
            </div>
          </div>

          {/* Airport Selectors Grid (with free text inputs and autocomplete suggestions) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            {/* Departure Free Input */}
            <div className="space-y-2 relative" id="dep-airport-input-container">
              <label className={`text-xs font-black text-slate-300 block flex items-center gap-1 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <span>{t("flight.from")}</span>
              </label>
              
              <div className="relative">
                <input 
                  type="text"
                  required
                  placeholder={language === 'ar' ? "أدخل رمز المطار أو اسم المدينة (مثال: ALG, CDG)..." : language === 'fr' ? "Code aéroport ou ville (ex: ALG, CDG)..." : "Airport code or city (e.g., ALG, CDG)..."}
                  value={depSearch}
                  onFocus={() => setDepOpen(true)}
                  onBlur={() => setTimeout(() => setDepOpen(false), 250)}
                  onChange={(e) => {
                    setDepSearch(e.target.value);
                    setDepOpen(true);
                  }}
                  className={`w-full bg-slate-950 border border-white/10 rounded-2xl py-3 px-14 text-xs font-bold text-white outline-none focus:border-rose-500 transition ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                />
                <div className={`absolute ${dir === 'rtl' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 flex items-center gap-1.5 font-mono select-none`}>
                  <span className="text-[10px] uppercase font-black text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20">
                    {getBadgeText(depSearch, 'DEP')}
                  </span>
                </div>
                <div className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 pointer-events-none`}>
                  <Search className="w-4 h-4 text-rose-500" />
                </div>

                {/* Autocomplete Dropdown */}
                {depOpen && (
                  <div className={`absolute left-0 right-0 mt-2 bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-y-auto max-h-72 z-50 divide-y divide-white/5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <div className="p-2 text-[10px] font-black text-slate-400 bg-slate-900/60 select-none flex justify-between items-center px-3 sticky top-0 backdrop-blur-md border-b border-white/5">
                      <span>{language === 'ar' ? 'اضغط لتحديد المطار فوراً' : language === 'fr' ? 'Cliquez pour sélectionner l\'aéroport' : 'Click to select airport'}</span>
                      <span>{language === 'ar' ? 'مقترحات مطارات العالم' : language === 'fr' ? 'Suggestions d\'aéroports' : 'Airport suggestions'} ({getFilteredAirports(depSearch).length})</span>
                    </div>
                    {getFilteredAirports(depSearch).map((airport) => (
                      <div 
                        key={`dep-${airport.code}-${airport.name}`}
                        onMouseDown={() => {
                          setDepSearch(`(${airport.code}) ${airport.name} - ${airport.countryAr}`);
                          setDepOpen(false);
                        }}
                        className="p-3 hover:bg-white/10 cursor-pointer transition flex items-center justify-between gap-3 text-right"
                      >
                        {/* Tags & Code Left */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 rounded whitespace-nowrap">
                            {airport.countryAr}
                          </span>
                          <span className="text-[11px] font-mono font-black text-rose-400 bg-rose-950/40 border border-rose-500/25 px-2 py-0.5 rounded">
                            {airport.code}
                          </span>
                        </div>
                        {/* Airport Text Right */}
                        <div className="flex flex-col items-end gap-0.5 max-w-[70%]">
                          <span className="text-xs font-black text-white">{airport.name}</span>
                          <span className="text-[10px] text-slate-400 font-bold leading-normal truncate w-full">{airport.airport}</span>
                        </div>
                      </div>
                    ))}
                    {getFilteredAirports(depSearch).length === 0 && (
                      <div className="p-4 text-center text-xs font-bold text-slate-500">
                        لا توجد مطارات مطابقة، يمكنك المتابعة بالكتابة الحرة 🚀
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Arrival Free Input */}
            <div className="space-y-2 relative" id="arr-airport-input-container">
              <label className={`text-xs font-black text-slate-300 block flex items-center gap-1 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <span>{t("flight.to")}</span>
              </label>
              
              <div className="relative">
                <input 
                  type="text"
                  required
                  placeholder={language === 'ar' ? "أدخل رمز المطار أو اسم المدينة (مثال: IST, CDG)..." : language === 'fr' ? "Code aéroport ou ville (ex: IST, CDG)..." : "Airport code or city (e.g., IST, CDG)..."}
                  value={arrSearch}
                  onFocus={() => setArrOpen(true)}
                  onBlur={() => setTimeout(() => setArrOpen(false), 250)}
                  onChange={(e) => {
                    setArrSearch(e.target.value);
                    setArrOpen(true);
                  }}
                  className={`w-full bg-slate-950 border border-white/10 rounded-2xl py-3 px-14 text-xs font-bold text-white outline-none focus:border-rose-500 transition ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                />
                <div className={`absolute ${dir === 'rtl' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 flex items-center gap-1.5 font-mono select-none`}>
                  <span className="text-[10px] uppercase font-black text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
                    {getBadgeText(arrSearch, 'ARR')}
                  </span>
                </div>
                <div className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 pointer-events-none`}>
                  <Search className="w-4 h-4 text-blue-400" />
                </div>

                {/* Autocomplete Dropdown */}
                {arrOpen && (
                  <div className={`absolute left-0 right-0 mt-2 bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-y-auto max-h-72 z-50 divide-y divide-white/5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <div className="p-2 text-[10px] font-black text-slate-400 bg-slate-900/60 select-none flex justify-between items-center px-3 sticky top-0 backdrop-blur-md border-b border-white/5">
                      <span>{language === 'ar' ? 'اضغط لتحديد المطار فوراً' : language === 'fr' ? 'Cliquez pour sélectionner l\'aéroport' : 'Click to select airport'}</span>
                      <span>{language === 'ar' ? 'مقترحات مطارات العالم' : language === 'fr' ? 'Suggestions d\'aéroports' : 'Airport suggestions'} ({getFilteredAirports(arrSearch).length})</span>
                    </div>
                    {getFilteredAirports(arrSearch).map((airport) => (
                      <div 
                        key={`arr-${airport.code}-${airport.name}`}
                        onMouseDown={() => {
                          setArrSearch(`(${airport.code}) ${language === 'ar' ? airport.name : airport.english} - ${language === 'ar' ? airport.countryAr : airport.country}`);
                          setArrOpen(false);
                        }}
                        className={`p-3 hover:bg-white/10 cursor-pointer transition flex items-center justify-between gap-3 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                      >
                        {/* Tags & Code Left */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 rounded whitespace-nowrap">
                            {language === 'ar' ? airport.countryAr : airport.country}
                          </span>
                          <span className="text-[11px] font-mono font-black text-blue-400 bg-blue-950/40 border border-blue-500/25 px-2 py-0.5 rounded">
                            {airport.code}
                          </span>
                        </div>
                        {/* Airport Text Right */}
                        <div className={`flex flex-col ${dir === 'rtl' ? 'items-end' : 'items-start'} gap-0.5 max-w-[70%]`}>
                          <span className="text-xs font-black text-white">{language === 'ar' ? airport.name : airport.english}</span>
                          <span className="text-[10px] text-slate-400 font-bold leading-normal truncate w-full">{airport.airport}</span>
                        </div>
                      </div>
                    ))}
                    {getFilteredAirports(arrSearch).length === 0 && (
                      <div className="p-4 text-center text-xs font-bold text-slate-500">
                        {language === 'ar' ? 'لا توجد مطارات مطابقة، يمكنك المتابعة بالكتابة الحرة 🚀' : language === 'fr' ? 'Aucun aéroport trouvé, tapez librement 🚀' : 'No matching airports, type freely 🚀'}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Dates & Passengers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Departure Date */}
            <div className="space-y-2">
              <label className={`text-xs font-black text-slate-300 flex items-center gap-1.5 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <Calendar className="w-4 h-4 text-rose-500" />
                <span>{t("flight.date.out")}</span>
              </label>
              <div className="flex gap-2">
                <div className="flex-1 focus-within:border-rose-500 rounded-2xl border border-white/10 bg-slate-950 px-2 py-1 flex flex-col justify-center">
                  <span className="text-[9px] text-slate-400 font-bold text-center block mb-0.5">{language === 'ar' ? 'اليوم' : language === 'fr' ? 'Jour' : 'Day'}</span>
                  <select
                    value={parseInt(splitDate(depDate).day, 10).toString()}
                    onChange={(e) => handleDateChange('dep', 'day', e.target.value)}
                    className="bg-transparent text-center text-xs font-black text-white outline-none cursor-pointer w-full text-center"
                    style={{ direction: 'ltr' }}
                  >
                    {Array.from(
                      { length: getDaysInMonth(parseInt(splitDate(depDate).month, 10), parseInt(splitDate(depDate).year, 10)) },
                      (_, i) => i + 1
                    ).map(d => (
                      <option key={d} value={d.toString()}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 focus-within:border-rose-500 rounded-2xl border border-white/10 bg-slate-950 px-2 py-1 flex flex-col justify-center">
                  <span className="text-[9px] text-slate-400 font-bold text-center block mb-0.5">{language === 'ar' ? 'الشهر' : language === 'fr' ? 'Mois' : 'Month'}</span>
                  <select
                    value={parseInt(splitDate(depDate).month, 10).toString()}
                    onChange={(e) => handleDateChange('dep', 'month', e.target.value)}
                    className="bg-transparent text-center text-xs font-black text-white outline-none cursor-pointer w-full text-center"
                    style={{ direction: 'ltr' }}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                      <option key={m} value={m.toString()}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-[1.2] focus-within:border-rose-500 rounded-2xl border border-white/10 bg-slate-950 px-2 py-1 flex flex-col justify-center">
                  <span className="text-[9px] text-slate-400 font-bold text-center block mb-0.5">{language === 'ar' ? 'السنة' : language === 'fr' ? 'Année' : 'Year'}</span>
                  <select
                    value={splitDate(depDate).year}
                    onChange={(e) => handleDateChange('dep', 'year', e.target.value)}
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

            {/* Return Date (Conditional) */}
            <div className={`space-y-2 transition-all duration-300 ${tripType === 'one-way' ? 'opacity-40 pointer-events-none' : ''}`}>
              <label className={`text-xs font-black text-slate-300 flex items-center gap-1.5 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>{t("flight.date.ret")}</span>
              </label>
              <div className="flex gap-2">
                <div className="flex-1 focus-within:border-blue-500 rounded-2xl border border-white/10 bg-slate-950 px-2 py-1 flex flex-col justify-center">
                  <span className="text-[9px] text-slate-400 font-bold text-center block mb-0.5">{language === 'ar' ? 'اليوم' : language === 'fr' ? 'Jour' : 'Day'}</span>
                  <select
                    disabled={tripType === 'one-way'}
                    value={parseInt(splitDate(retDate).day, 10).toString()}
                    onChange={(e) => handleDateChange('ret', 'day', e.target.value)}
                    className="bg-transparent text-center text-xs font-black text-white outline-none cursor-pointer w-full text-center"
                    style={{ direction: 'ltr' }}
                  >
                    {Array.from(
                      { length: getDaysInMonth(parseInt(splitDate(retDate).month, 10), parseInt(splitDate(retDate).year, 10)) },
                      (_, i) => i + 1
                    ).map(d => (
                      <option key={d} value={d.toString()}>{d}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 focus-within:border-blue-500 rounded-2xl border border-white/10 bg-slate-950 px-2 py-1 flex flex-col justify-center">
                  <span className="text-[9px] text-slate-400 font-bold text-center block mb-0.5">{language === 'ar' ? 'الشهر' : language === 'fr' ? 'Mois' : 'Month'}</span>
                  <select
                    disabled={tripType === 'one-way'}
                    value={parseInt(splitDate(retDate).month, 10).toString()}
                    onChange={(e) => handleDateChange('ret', 'month', e.target.value)}
                    className="bg-transparent text-center text-xs font-black text-white outline-none cursor-pointer w-full text-center"
                    style={{ direction: 'ltr' }}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                      <option key={m} value={m.toString()}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-[1.2] focus-within:border-blue-500 rounded-2xl border border-white/10 bg-slate-950 px-2 py-1 flex flex-col justify-center">
                  <span className="text-[9px] text-slate-400 font-bold text-center block mb-0.5">{language === 'ar' ? 'السنة' : language === 'fr' ? 'Année' : 'Year'}</span>
                  <select
                    disabled={tripType === 'one-way'}
                    value={splitDate(retDate).year}
                    onChange={(e) => handleDateChange('ret', 'year', e.target.value)}
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

            {/* Passengers selection */}
            <div className="space-y-2">
              <label className={`text-xs font-black text-slate-300 flex items-center gap-1.5 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{t("flight.passengers")}</span>
              </label>
              <div className="flex items-center justify-between border border-white/10 bg-slate-950 rounded-2xl p-2 h-11">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{language === 'ar' ? 'بالغين:' : language === 'fr' ? 'Adultes:' : 'Adults:'}</span>
                  <select 
                    value={adults} 
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="bg-transparent text-white font-bold outline-none text-xs cursor-pointer"
                  >
                    {[0,1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="h-5 w-px bg-white/10"></div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{language === 'ar' ? 'أطفال:' : language === 'fr' ? 'Enfants:' : 'Children:'}</span>
                  <select 
                    value={kids} 
                    onChange={(e) => setKids(Number(e.target.value))}
                    className="bg-transparent text-white font-bold outline-none text-xs cursor-pointer"
                  >
                    {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Baggage selections */}
          <div className="space-y-4">
            <span className={`text-xs font-black text-slate-300 block ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              🧳 {language === 'ar' ? 'خيارات الأمتعة ووزن الحقائب المفضل' : language === 'fr' ? 'Options de bagages et poids idéal' : 'Baggage options and preferred weight'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className={`border rounded-2xl p-4 flex flex-col justify-between cursor-pointer text-center select-none transition ${baggage === 'standard' ? 'border-rose-500 bg-rose-500/5' : 'border-white/15 hover:border-white/30'}`}>
                <input 
                  type="radio" 
                  name="flight-baggage" 
                  checked={baggage === 'standard'}
                  onChange={() => setBaggage('standard')}
                  className="sr-only" 
                />
                <span className="text-[10px] font-black text-slate-400">
                  {language === 'ar' ? 'اقتصادي خفيف' : language === 'fr' ? 'Éco Léger' : 'Light Economy'}
                </span>
                <span className="text-sm font-black text-white mt-1">
                  {language === 'ar' ? 'حقيبة يد 10 كغ (مضمنة)' : language === 'fr' ? 'Bagage à main 10 kg (inclus)' : 'Cabin bag 10 kg (included)'}
                </span>
                <span className="text-[9px] text-slate-400 mt-2">
                  {language === 'ar' ? 'مثالية لرحلات الأعمال السريعة' : language === 'fr' ? 'Idéal pour courts voyages d\'affaires' : 'Perfect for quick business trips'}
                </span>
              </label>

              <label className={`border rounded-2xl p-4 flex flex-col justify-between cursor-pointer text-center select-none transition ${baggage === 'extra' ? 'border-rose-500 bg-rose-500/5' : 'border-white/15 hover:border-white/30'}`}>
                <input 
                  type="radio" 
                  name="flight-baggage" 
                  checked={baggage === 'extra'} 
                  onChange={() => setBaggage('extra')}
                  className="sr-only" 
                />
                <span className="text-[10px] font-black text-blue-400">
                  {language === 'ar' ? 'الخيار الموصى به 🌟' : language === 'fr' ? 'Option recommandée 🌟' : 'Recommended Option 🌟'}
                </span>
                <span className="text-sm font-black text-white mt-1">
                  {language === 'ar' ? 'حقيبة يد + حقيبة شحن (23 كغ)' : language === 'fr' ? 'Bagage main + chargin (23 kg)' : 'Cabin bag + Check-in bag (23 kg)'}
                </span>
                <span className="text-[9px] text-slate-300 mt-2">
                  {language === 'ar' ? 'مثالية لرحلات السياحة والتسوق' : language === 'fr' ? 'Idéal pour tourisme et shopping' : 'Perfect for tourism & shopping'}
                </span>
              </label>

              <label className={`border rounded-2xl p-4 flex flex-col justify-between cursor-pointer text-center select-none transition ${baggage === 'double' ? 'border-rose-500 bg-rose-500/5' : 'border-white/15 hover:border-white/30'}`}>
                <input 
                  type="radio" 
                  name="flight-baggage" 
                  checked={baggage === 'double'} 
                  onChange={() => setBaggage('double')}
                  className="sr-only" 
                />
                <span className="text-[10px] font-black text-amber-500">
                  {language === 'ar' ? 'العائلية والأوزان الكبرى' : language === 'fr' ? 'Familial & Grand volume' : 'Family & heavy weight'}
                </span>
                <span className="text-sm font-black text-white mt-1">
                  {language === 'ar' ? 'حقيبة يد + حقيبتين عاديتين (46 كغ)' : language === 'fr' ? 'Bagage main + 2 bagages (46 kg)' : 'Cabin bag + 2 check-in bags (46 kg)'}
                </span>
                <span className="text-[9px] text-slate-400 mt-2">
                  {language === 'ar' ? 'للرحلات الطويلة والإقامات الطويلة' : language === 'fr' ? 'Pour les longs séjours' : 'For long-term vacations'}
                </span>
              </label>
            </div>
          </div>

          {/* Form Submit & Contact Details info footer */}
          <div className="h-px bg-white/10 my-6"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-950/40 p-5 rounded-3xl border border-white/5">
            <div className={`space-y-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <span className="text-[10px] font-black text-emerald-400 block">
                ✓ {language === 'ar' ? 'وكالة معتمدة ووكيل كبار شركات الطيران' : language === 'fr' ? 'Agence agréée par les compagnies leaders' : 'Authorized Agency & leading airlines partner'}
              </span>
              <p className="text-xs text-slate-400 leading-relaxed font-bold">
                {language === 'ar' 
                  ? 'يقوم فريقنا بمراجعة الجداول الزمنية للرحلات المتاحة وتحصيل الخصومات الحصرية وإرسال فورية السعر والتأكيد مباشرة عبر رقم الواتساب الخاص بك مجاناً وبدون أي التزامات.' 
                  : language === 'fr' 
                    ? 'Notre équipe vérifie les vols disponibles, récolte les remises de l\'agence et vous envoie le devis directement via WhatsApp gratuitement et sans engagement.' 
                    : 'Our team checks all available flights, collects agency discounts, and sends you our fast quote directly on WhatsApp for free with no obligation.'}
              </p>
            </div>
            
            <button 
              type="submit"
              className="w-full md:w-auto h-12 bg-gradient-to-r from-rose-500 to-red-600 text-slate-950 font-black px-10 rounded-2xl hover:scale-103 transition cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/10 shrink-0 text-sm"
            >
              🚀 {language === 'ar' ? 'استعلام وتأكيد حجز التذكرة فورياً' : language === 'fr' ? 'Rechercher & Réserver mon Billet' : 'Search & Book My Flight Ticket'}
            </button>
          </div>

        </form>

      </div>

      {/* Trust Elements */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
        <div className="glass p-5 rounded-3xl border border-white/5 flex flex-col items-center gap-2">
          <Shield className="w-8 h-8 text-rose-500" />
          <h4 className="text-sm font-black text-white">
            {language === 'ar' ? 'حجز آمن بالكامل' : language === 'fr' ? 'Paiement & Voyage Sécures' : 'Fully Secured Booking'}
          </h4>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            {language === 'ar' 
              ? 'بثقة تامة مع تسليم فوري لرمز الحجز الرسمي المعتمد من قبل شركات الطيران المدني.' 
              : language === 'fr' 
                ? 'Confirmation instantanée du code PNR officiel de la compagnie aérienne.' 
                : 'Full confidence with instant delivery of the official airline confirmation code (PNR).'}
          </p>
        </div>
        <div className="glass p-5 rounded-3xl border border-white/5 flex flex-col items-center gap-2">
          <Award className="w-8 h-8 text-amber-500" />
          <h4 className="text-sm font-black text-white">
            {language === 'ar' ? 'أسعار وعقود حصرية' : language === 'fr' ? 'Tarifs Négociés Exclusifs' : 'Exclusive Negotiated Rates'}
          </h4>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            {language === 'ar' 
              ? 'تحصيل أفضل العروض والخصومات بالدينار الجزائري وتوفير عناء عمليات السداد المعقدة.' 
              : language === 'fr' 
                ? 'Meilleurs prix garantis en Dinars Algériens pour vous éviter des tracas monétaires.' 
                : 'Best flight rates in Algerian Dinars, avoiding complex international payments.'}
          </p>
        </div>
        <div className="glass p-5 rounded-3xl border border-white/5 flex flex-col items-center gap-2">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
          <h4 className="text-sm font-black text-white">
            {language === 'ar' ? 'دعم متواصل عالي السرعة' : language === 'fr' ? 'Assistance Directe 24/7' : 'Continuous 24/7 Support'}
          </h4>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            {language === 'ar' 
              ? 'فريق تسيير الطيران في عبعوب متواجد لتعديل التذاكر أو معالجة الأوزان والمقاعد على مدار الساعة.' 
              : language === 'fr' 
                ? 'Equipe disponible pour modifier vos billets, sièges ou bagages supplémentaires.' 
                : 'Aboub Travel support team is always ready to assist changing seats, dates or baggage on the go.'}
          </p>
        </div>
      </div>

    </div>
  );
}
