import React, { useState } from 'react';
import { getWhatsAppLink } from '../data';
import { useLanguage } from '../LanguageContext';
import { Compass } from 'lucide-react';
// @ts-ignore
import algiersMonument from '../assets/images/algiers_monument_1780991978072.png';
// @ts-ignore
import jijelBejaiaBus from '../assets/images/jijel_bejaia_bus_1780993368841.png';

export default function LocalView() {
  const { language, dir } = useLanguage();

  const tLoc = (ar: string, fr: string, en?: string): string => {
    if (language === 'fr') return fr;
    if (language === 'en') return en || fr;
    return ar;
  };

  const getWhatsAppJijelMsg = (
    calcJijelOption: 'apartment' | 'hotel',
    apartmentType: 'double' | 'triple' | 'quad' | 'penta',
    adultsCount: number,
    kidsWithBed: number,
    kidsNoBedWithSeat: number,
    kidsNoBedNoSeat: number,
    infantsCount: number,
    totalJijelCost: number
  ) => {
    if (language === 'fr' || language === 'en') {
      const accommodation = calcJijelOption === 'hotel' 
        ? "Hôtel Chambre Double/Triple/Quadruple avec petit-déjeuner"
        : `Appartement équipé - ${apartmentType === 'penta' ? 'Quintuple (12 500 DA)' : apartmentType === 'quad' ? 'Quadruple' : apartmentType === 'triple' ? 'Triple' : 'Double'}`;
      
      return `Bonjour Aboub Travel, je souhaite réserver pour le séjour de Jijel & Béjaïa avec hébergement en: (${accommodation}).
Détails du groupe:
- Adultes: ${adultsCount} personne(s)
${kidsWithBed > 0 ? `- Enfants avec lit supplémentaire: ${kidsWithBed}\n` : ''}${kidsNoBedWithSeat > 0 ? `- Enfants avec siège de bus uniquement: ${kidsNoBedWithSeat}\n` : ''}${kidsNoBedNoSeat > 0 ? `- Enfants sans lit/siège (assurance): ${kidsNoBedNoSeat}\n` : ''}${infantsCount > 0 ? `- Bébés (moins de 2 ans): ${infantsCount}\n` : ''}
Le total estimé est de: ${totalJijelCost.toLocaleString('fr-FR')} DA.
Merci de me fournir les étapes et dates de départ.`;
    }
    
    return `مرحبا وكالة عبعوب، أود الحجز لرحلة جيجل وبجاية لإقامة (${calcJijelOption === 'hotel' ? 'فندق غرفة ثنائية / ثلاثية / رباعية مع فطور' : `شقة مجهزة - ${apartmentType === 'penta' ? 'خماسية 5 أفراد 12500 دج' : apartmentType === 'quad' ? 'رباعية' : apartmentType === 'triple' ? 'ثلاثية' : 'ثنائية'}`}).
التشكيلة المطلوبة:
- عدد البالغين: ${adultsCount} شخص بالغ
${kidsWithBed > 0 ? `- عدد أطفال مع سرير ومقعد: ${kidsWithBed} طفل\n` : ''}${kidsNoBedWithSeat > 0 ? `- عدد أطفال مع مقعد دون سرير (10,000 دج): ${kidsNoBedWithSeat} طفل\n` : ''}${kidsNoBedNoSeat > 0 ? `- عدد أطفال دون سرير ومقعد (2,000 دج): ${kidsNoBedNoSeat} طفل\n` : ''}${infantsCount > 0 ? `- عدد الرضع (أقل من سنتين): ${infantsCount} رضيع\n` : ''}
الإجمالي المقدر هو: ${totalJijelCost.toLocaleString('fr-FR')} دج.
من فضلك زودني بالإجراءات وموعد الانطلاق.`;
  };

  const getWhatsAppAlgMsg = (
    calcAlgOption: 'hostel' | 'hotel',
    algHostelType: 'double' | 'triple' | 'quad_penta',
    algAdultsCount: number,
    algKidsWithBed: number,
    algKidsNoBedWithSeat: number,
    algKidsNoBedNoSeat: number,
    algInfantsCount: number,
    totalAlgCost: number,
    unitAlgPrice: number
  ) => {
    if (language === 'fr' || language === 'en') {
      const accommodation = calcAlgOption === 'hotel' 
        ? "Hôtel supérieur Chambre Double/Triple/Quadruple"
        : `Dortoir équipé - ${algHostelType === 'quad_penta' ? 'Chambre Quadruple/Quintuple (12 500 DA)' : algHostelType === 'triple' ? 'Chambre Triple' : 'Chambre Double'}`;
      
      return `Bonjour Aboub Travel, je souhaite réserver pour le séjour d'Alger, Boumerdès & Tipaza avec hébergement en: (${accommodation}).
Détails du groupe:
- Adultes: ${algAdultsCount} personne(s)
${algKidsWithBed > 0 ? `- Enfants avec lit supplémentaire: ${algKidsWithBed}\n` : ''}${algKidsNoBedWithSeat > 0 ? `- Enfants avec siège de bus uniquement: ${algKidsNoBedWithSeat}\n` : ''}${algKidsNoBedNoSeat > 0 ? `- Enfants sans lit/siège (assurance): ${algKidsNoBedNoSeat}\n` : ''}${algInfantsCount > 0 ? `- Bébés (moins de 2 ans): ${algInfantsCount}\n` : ''}
Le total estimé est de: ${totalAlgCost.toLocaleString('fr-FR')} DA.
Merci de me fournir les étapes et dates de départ.`;
    }
    
    return `مرحبا وكالة عبعوب للأسفار، أود الحجز لرحلة الجزائر العاصمة – بومرداس – تيبازة لإقامة (${calcAlgOption === 'hotel' ? 'فندق غرفة ثنائية / ثلاثية / رباعية مميز' : `مرقد مجهز - ${algHostelType === 'quad_penta' ? 'غرفة رباعية أو خماسية 12,500 دج' : algHostelType === 'triple' ? 'غرفة ثلاثية' : 'غرفة ثنائية'}`}).
التشكيلة المطلوبة:
- عدد البالغين: ${algAdultsCount} شخص بالغ
${algKidsWithBed > 0 ? `- عدد أطفال مع سرير إضافي (${unitAlgPrice.toLocaleString('fr-FR')} دج): ${algKidsWithBed} طفل\n` : ''}${algKidsNoBedWithSeat > 0 ? `- عدد أطفال مع مقعد دون سرير (10,000 دج): ${algKidsNoBedWithSeat} طفل\n` : ''}${algKidsNoBedNoSeat > 0 ? `- عدد أطفال دون سرير ودون مقعد (2,000 دج): ${algKidsNoBedNoSeat} طفل\n` : ''}${algInfantsCount > 0 ? `- عدد الرضع (أقل من سنتين): ${algInfantsCount} رضيع\n` : ''}
الإجمالي المقدر هو: ${totalAlgCost.toLocaleString('fr-FR')} دج.
من فضلك زودني بالنواقص وإجراءات تأكيد الحجز وموعد انطلاق شهر جويلية.`;
  };

  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [tripsList, setTripsList] = useState<any[]>([]);
  const [dynamicQuantities, setDynamicQuantities] = useState<Record<string, number>>({});

  React.useEffect(() => {
    const cached = localStorage.getItem('aboub_cached_trips');
    if (cached) {
      try {
        setTripsList(JSON.parse(cached));
      } catch (e) {}
    }

    const fetchTrips = () => {
      fetch('/api/trips')
        .then(res => res.json())
        .then(data => {
          const currentStr = localStorage.getItem('aboub_cached_trips') || '';
          const newStr = JSON.stringify(data);
          if (currentStr !== newStr) {
            setTripsList(data);
            localStorage.setItem('aboub_cached_trips', newStr);
            window.dispatchEvent(new Event('aboub_trips_updated'));
          }
        })
        .catch(err => console.log('Error fetching trips:', err));
    };

    fetchTrips();
    const interval = setInterval(fetchTrips, 8000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const handleUpdates = () => {
      const cached = localStorage.getItem('aboub_cached_trips');
      if (cached) {
        try {
          setTripsList(JSON.parse(cached));
        } catch (e) {}
      }
    };
    window.addEventListener('aboub_trips_updated', handleUpdates);
    return () => window.removeEventListener('aboub_trips_updated', handleUpdates);
  }, []);

  React.useEffect(() => {
    setDynamicQuantities({});
  }, [selectedTrip]);
  const [calcJijelOption, setCalcJijelOption] = useState<'apartment' | 'hotel'>('apartment');
  const [apartmentType, setApartmentType] = useState<'double' | 'triple' | 'quad' | 'penta'>('quad');
  const [adultsCount, setAdultsCount] = useState<number>(0);
  const [kidsWithBed, setKidsWithBed] = useState<number>(0);
  const [kidsNoBedWithSeat, setKidsNoBedWithSeat] = useState<number>(0);
  const [kidsNoBedNoSeat, setKidsNoBedNoSeat] = useState<number>(0);
  const [infantsCount, setInfantsCount] = useState<number>(0);

  // Algiers & Boumerdes & Tipaza Trip states
  const [calcAlgOption, setCalcAlgOption] = useState<'hostel' | 'hotel'>('hostel');
  const [algHostelType, setAlgHostelType] = useState<'double' | 'triple' | 'quad_penta'>('quad_penta');
  const [algAdultsCount, setAlgAdultsCount] = useState<number>(0);
  const [algKidsWithBed, setAlgKidsWithBed] = useState<number>(0);
  const [algKidsNoBedWithSeat, setAlgKidsNoBedWithSeat] = useState<number>(0);
  const [algKidsNoBedNoSeat, setAlgKidsNoBedNoSeat] = useState<number>(0);
  const [algInfantsCount, setAlgInfantsCount] = useState<number>(0);

  let unitJijelPrice = 0;
  if (calcJijelOption === 'hotel') {
    unitJijelPrice = 25000;
  } else {
    if (apartmentType === 'penta') unitJijelPrice = 12500;
    else if (apartmentType === 'quad') unitJijelPrice = 13500;
    else if (apartmentType === 'triple') unitJijelPrice = 14500;
    else unitJijelPrice = 17500;
  }

  const adultsCost = adultsCount * unitJijelPrice;
  const kidsWithBedCost = kidsWithBed * unitJijelPrice;
  const kidsNoBedWithSeatCost = kidsNoBedWithSeat * 10000;
  const kidsNoBedNoSeatCost = kidsNoBedNoSeat * 2000;

  const totalJijelCost = adultsCost + kidsWithBedCost + kidsNoBedWithSeatCost + kidsNoBedNoSeatCost;

  let unitAlgPrice = 0;
  if (calcAlgOption === 'hotel') {
    unitAlgPrice = 23000;
  } else {
    if (algHostelType === 'quad_penta') unitAlgPrice = 12500;
    else if (algHostelType === 'triple') unitAlgPrice = 14500;
    else unitAlgPrice = 15500;
  }

  const algAdultsCost = algAdultsCount * unitAlgPrice;
  const algKidsWithBedCost = algKidsWithBed * unitAlgPrice;
  const algKidsNoBedWithSeatCost = algKidsNoBedWithSeat * 10000;
  const algKidsNoBedNoSeatCost = algKidsNoBedNoSeat * 2000;

  const totalAlgCost = algAdultsCost + algKidsWithBedCost + algKidsNoBedWithSeatCost + algKidsNoBedNoSeatCost;

  return (
    <div className="space-y-16 animate-fade-in" id="local-view" style={{ direction: dir }}>
      
      {/* Header Title */}
      <div className={`border-emerald-500 pr-5 space-y-2 ${dir === 'rtl' ? 'text-right border-r-4 pr-5' : 'text-left border-l-4 pl-5'}`}>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          {language === 'ar' ? '🇩🇿 أقوى الرحلات المحلية والاستجمامية' : language === 'fr' ? '🇩🇿 Nos Meilleurs Voyages Nationaux & Détente' : '🇩🇿 Outstanding Domestic & Coastal Escapes'}
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          {language === 'ar' 
            ? 'استعيدوا الحيوية واكتشفوا روعة الطبيعة وسحر السواحل الجزائرية مع عائلتكم. رحلة صيفية متكاملة ومؤطرة بدقة بالغة إلى لؤلؤة الجمال الشرقي جيجل الخلابة وبجاية.' 
            : language === 'fr' 
              ? 'Ressourcez-vous et découvrez le charme des côtes algériennes avec votre famille. Séjour estival complet et minutieusement organisé vers Jijel et Bejaia.' 
              : 'Rejuvenate and explore the stunning coastlines of Algeria with your family. Fully coordinated and safe summer packages to gorgeous Jijel and Bejaia.'}
        </p>
      </div>

      {selectedTrip === null ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
          
          {/* Card 1: JIJEL & BEJAIA */}
          <div className="bg-slate-900/40 rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-500 group relative">
            
            {/* Elegant Top Image */}
            <div className="h-64 w-full overflow-hidden relative">
              <img 
                src={jijelBejaiaBus} 
                alt="Jijel coastal beach" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              {/* Overlay Badge */}
              <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-emerald-600/90 backdrop-blur text-white font-black py-1 px-3 rounded-xl text-[10px] tracking-wide shadow-md`}>
                {language === 'ar' ? '🚍 حافلة سياحية فاخرة' : language === 'fr' ? '🚍 Bus touristique tout confort' : '🚍 Elite Airconditioned Shuttle'}
              </div>
            </div>

            {/* Content block */}
            <div className={`p-6 md:p-8 flex flex-col justify-between flex-1 space-y-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-3">
                <span className="inline-block text-[10px] font-black tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                  {language === 'ar' ? '⚓ مغامرات واستجمام عائلي' : language === 'fr' ? '⚓ Aventure & Détente en Famille' : '⚓ Family Coastal Leisure & Fun'}
                </span>
                
                <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-emerald-300 transition duration-300">
                  {language === 'ar' ? 'رحلة لؤلؤة الشرق جيجل وبجاية' : language === 'fr' ? 'Séjour Perle de l\'Est Jijel & Bejaia' : 'Jijel & Bejaia Eastern Pearl Stay'}
                </h3>
                
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-semibold">
                  {language === 'ar' 
                    ? 'عطلة مميزة تمزج بين مياه البحر الفيروزية الصافية والكهوف العجيبة ومسارات الطبيعة الجبلية الخلابة مع تنظيم دقيق مخصص لراحة العائلات تماماً.' 
                    : language === 'fr' 
                      ? 'Des vacances idéales combinant eaux turquoise, grottes merveilleuses, et sentiers forestiers dans un encadrement familial chaleureux.' 
                      : 'Delightful getaway combining clear turquoise waters, miraculous grottes, and pristine green mountain parks for cozy family retreats.'}
                </p>

                {/* Minimalist Meta */}
                <div className={`flex ${dir === 'rtl' ? 'justify-end' : 'justify-start'} gap-3 text-xs text-slate-400 font-bold border-t border-b border-white/5 py-3 mt-2`}>
                  <span>🏢 {language === 'ar' ? 'إقامة بشقق فخمة' : language === 'fr' ? 'Résidences de haut standing équipé' : 'Premium Furnished Lodgings'}</span>
                  <span className="text-slate-600">|</span>
                  <span>📅 {language === 'ar' ? 'المدة: 6 أيام / 5 ليالٍ' : language === 'fr' ? 'Durée : 6 Jours / 5 Nuits' : 'Duration: 6 Days / 5 Nights'}</span>
                </div>
              </div>

              <div className={`flex items-center justify-between pt-2 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`${dir === 'rtl' ? 'text-left' : 'text-right'} font-sans`}>
                  <span className="block text-[9px] text-slate-500 font-bold">{language === 'ar' ? 'السعر للشخص يبدأ من' : language === 'fr' ? 'Dès' : 'Starts from'}</span>
                  <span className="text-xl font-black text-emerald-400">12,500 دج</span>
                </div>
                <button 
                  onClick={() => {
                    setSelectedTrip('jijel');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black py-3 px-6 rounded-2xl transition shadow-lg cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {language === 'ar' ? 'استكشف البرنامج والسعر ←' : language === 'fr' ? 'Détails & Tarifs ←' : 'Explore Program & Pricing ←'}
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: ALGIERS & BOUMERDES & TIPAZA */}
          <div className="bg-slate-900/40 rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-950/20 transition-all duration-500 group relative">
            
            {/* Elegant Top Image */}
            <div className="h-64 w-full overflow-hidden relative">
              <img 
                src={algiersMonument} 
                alt="Algiers monument Tipaza ruins" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              {/* Overlay Badge */}
              <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-indigo-600/90 backdrop-blur text-white font-black py-1 px-3 rounded-xl text-[10px] tracking-wide shadow-md`}>
                {language === 'ar' ? '⛱️ صيف واستجمام فاخر' : language === 'fr' ? '⛱️ Vacances d\'été prestigieuces' : '⛱️ Premium Summer Stay'}
              </div>
            </div>

            {/* Content block */}
            <div className={`p-6 md:p-8 flex flex-col justify-between flex-1 space-y-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-3">
                <span className="inline-block text-[10px] font-black tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
                  {language === 'ar' ? '🏢 تاريخ وحضارة وشواطئ زرقاء' : language === 'fr' ? '🏢 Histoire, Culture & Plages Bleues' : '🏢 Heritage, History & Clear Beaches'}
                </span>
                
                <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-indigo-300 transition duration-300">
                  {language === 'ar' ? 'رحلة تيبازة، العاصمة وبومرداس' : language === 'fr' ? 'Echappée Tipaza, Alger & Boumerdes' : 'Tipaza, Algiers & Boumerdes Tour'}
                </h3>
                
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-semibold">
                  {language === 'ar' 
                    ? 'مزيج باهر يجمع روعة شواطئ بومرداس الصافية، والآثار الرومانية بتيبازة، مع جولات ترفيهية بقلب مدينة الجزائر للعائلات ومراكز التسوق الكبرى.' 
                    : language === 'fr' 
                      ? 'L\'alliance parfaite entre plages paradisiaques de Boumerdes, ruines antiques de Tipaza, et sorties de loisirs à Alger Centre.' 
                      : 'The ultimate trip blending sandy shores of Boumerdes, magnificent Roman ruins of Tipaza, and vibrant urban tours of Algiers capital.'}
                </p>

                {/* Minimalist Meta */}
                <div className={`flex ${dir === 'rtl' ? 'justify-end' : 'justify-start'} gap-3 text-xs text-slate-400 font-bold border-t border-b border-white/5 py-3 mt-2`}>
                  <span>🏨 {language === 'ar' ? 'إقامة بفنادق ممتازة' : language === 'fr' ? 'Hébergement en hôtels de qualité' : 'Cozy Approved Hotels'}</span>
                  <span className="text-slate-600">|</span>
                  <span>📅 {language === 'ar' ? 'المدة: 6 أيام / 5 ليالٍ' : language === 'fr' ? 'Durée : 6 Jours / 5 Nuits' : 'Duration: 6 Days / 5 Nights'}</span>
                </div>
              </div>

              <div className={`flex items-center justify-between pt-2 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`${dir === 'rtl' ? 'text-left' : 'text-right'} font-sans`}>
                  <span className="block text-[9px] text-slate-500 font-bold">{language === 'ar' ? 'السعر للشخص يبدأ من' : language === 'fr' ? 'Dès' : 'Starts from'}</span>
                  <span className="text-xl font-black text-indigo-400">12,500 دج</span>
                </div>
                <button 
                  onClick={() => {
                    setSelectedTrip('algiers');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black py-3 px-6 rounded-2xl transition shadow-lg cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {language === 'ar' ? 'استكشف البرنامج والسعر ←' : language === 'fr' ? 'Détails & Tarifs ←' : 'Explore Program & Pricing ←'}
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Local Trips Added by Admin */}
          {tripsList.filter(t => t.category === 'local' && !['jijel', 'algiers'].includes(t.id)).map((trip) => {
            const title = language === 'ar' ? trip.titleAr : (language === 'fr' ? trip.titleFr : trip.titleEn);
            const desc = language === 'ar' ? trip.descAr : (language === 'fr' ? trip.descFr : trip.descEn);
            const hotel = language === 'ar' ? trip.hotelAr : (language === 'fr' ? trip.hotelFr : trip.hotelEn);
            const duration = language === 'ar' ? trip.durationAr : (language === 'fr' ? trip.durationFr : trip.durationEn);
            const badge1 = language === 'ar' ? trip.badge1Ar : (language === 'fr' ? trip.badge1Fr : trip.badge1En);
            const badge2 = language === 'ar' ? trip.badge2Ar : (language === 'fr' ? trip.badge2Fr : trip.badge2En);

            return (
              <div key={trip.id} className="bg-slate-900/40 rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-500 group relative">
                <div className="h-64 w-full overflow-hidden relative">
                  <img 
                    src={trip.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  
                  {badge2 && (
                    <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-emerald-600/90 backdrop-blur text-white font-black py-1 px-3 rounded-xl text-[10px] tracking-wide shadow-md`}>
                      {badge2}
                    </div>
                  )}
                </div>

                <div className={`p-6 md:p-8 flex flex-col justify-between flex-1 space-y-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <div className="space-y-3">
                    {badge1 && (
                      <span className="inline-block text-[10px] font-black tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                        {badge1}
                      </span>
                    )}
                    <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-emerald-300 transition duration-300">
                      {title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-semibold">
                      {desc}
                    </p>

                    <div className={`flex ${dir === 'rtl' ? 'justify-end' : 'justify-start'} gap-3 text-xs text-slate-400 font-bold border-t border-b border-white/5 py-3 mt-2`}>
                      {hotel && <span>🏨 {hotel}</span>}
                      {hotel && duration && <span className="text-slate-600">|</span>}
                      {duration && <span>📅 {duration}</span>}
                    </div>
                  </div>

                  <div className={`flex items-center justify-between pt-2 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`${dir === 'rtl' ? 'text-left' : 'text-right'} font-sans`}>
                      <span className="block text-[9px] text-slate-500 font-bold">{language === 'ar' ? 'السعر للشخص يبدأ من' : language === 'fr' ? 'Dès' : 'Starts from'}</span>
                      <span className="text-xl font-black text-emerald-400">{(trip.price || 0).toLocaleString()} {language === 'ar' ? 'دج' : 'DA'}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedTrip(trip.id);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black py-3 px-6 rounded-2xl transition shadow-lg cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {language === 'ar' ? 'استكشف البرنامج والسعر ←' : language === 'fr' ? 'Détails & Tarifs ←' : 'Explore Program & Pricing ←'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap justify-between items-center bg-slate-950/40 p-4 rounded-2xl border border-white/5 gap-3">
            <button 
              onClick={() => {
                setSelectedTrip(null);
                window.scrollTo({ top: 300, behavior: 'instant' });
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold transition text-xs cursor-pointer select-none border border-white/10"
            >
              <span>
                {language === 'ar' ? '↩️ العودة لجميع الرحلات المحلية' : language === 'fr' ? '↩️ Retour aux offres' : '↩️ Back to all tours'}
              </span>
            </button>
            <span className="text-slate-300 text-xs font-semibold font-sans">
              {language === 'ar' ? 'تفاصيل وحجز رحلة:' : language === 'fr' ? 'Détails et réservation :' : 'Details & enquiry:'} {
                selectedTrip === 'jijel' ? (language === 'ar' ? 'جيجل وبجاية الساحرة' : 'Jijel & Bejaia') :
                selectedTrip === 'algiers' ? (language === 'ar' ? 'الجزائر العاصمة وبومرداس وتيبازة' : 'Algiers, Tipaza & Boumerdes') :
                (() => {
                  const t = tripsList.find(x => x.id === selectedTrip);
                  if (!t) return "";
                  return language === 'ar' ? t.titleAr : (language === 'fr' ? t.titleFr : t.titleEn);
                })()
              }
            </span>
          </div>

          {selectedTrip === 'jijel' && (
            <div className="bg-slate-900/40 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col">
        
        {/* Image banner with badges */}
        <div className="h-80 md:h-[28rem] w-full relative">
          <img 
            src={jijelBejaiaBus} 
            alt="شواطئ جيجل الساحرة"
            className="w-full h-full object-cover animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"></div>
          
          {/* Float badges */}
          <div className="absolute top-6 right-6 flex flex-wrap gap-2">
            <span className="bg-slate-950/80 backdrop-blur text-white font-black py-2 px-4 rounded-full text-xs font-sans border border-white/20 shadow-md">
              {tLoc('🇩🇿 الجزائر - جوهرة الشرق جيجل', '🇩🇿 Algérie - Joyau de l\'Est Jijel', '🇩🇿 Algeria - Eastern Jewel Jijel')}
            </span>
            <span className="bg-emerald-600 text-white font-black py-2 px-4 rounded-full text-xs font-sans shadow-md">
              {tLoc('🚍 حافلة مكيفة ومريحة جداً', '🚍 Bus Climatisé & Confortable', '🚍 Ultra Comfort Air-conditioned Bus')}
            </span>
          </div>

          <div className="absolute bottom-6 right-6 left-6 text-white text-right space-y-2 text-shadow-custom">
            <span className="bg-emerald-500/20 text-emerald-300 font-extrabold px-3 py-1.5 rounded-full text-xs border border-emerald-500/30 font-sans">
              {tLoc('🌊 رحلة بحرية ترفيهية متكاملة طيلة شهر جويلية', '🌊 Croisière de loisirs incluse en Juillet', '🌊 Leisure sea cruise included in July')}
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-white mt-1">
              {tLoc('رحلة جيجل الساحرة وبجاية (6 أيام لؤلؤية)', 'Séjour Magique Jijel & Béjaïa (6 Jours)', 'Charming Jijel & Bejaia Tour (6 Days)')}
            </h3>
            <p className="text-sm text-slate-200 font-medium">
              {tLoc('استمتع بالبحر، سحر الطبيعة العذراء والأنشطة الترفيهية المنسقة خصيصاً لراحة عائلتك', 'Profitez de la mer, d\'une nature vierge et d\'activités conçues pour votre confort', 'Enjoy clean beaches, virgin nature, and activities curated for ultimate family comfort')}
            </p>
          </div>
        </div>

        {/* Package detailed body */}
        <div className="p-6 md:p-10 space-y-10 text-right">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Right side: Program & Activities */}
            <div className="lg:col-span-7 space-y-6">
              <h4 className="text-xl font-bold text-emerald-400 pb-2 border-b border-white/10 flex items-center gap-2">
                <span>{tLoc('🗺️ برنامج الزيارة والخرجات المتكاملة يومياً:', '🗺️ Programme détaillé des visites quotidiennes :', '🗺️ Daily Excursions & Program :')}</span>
              </h4>
              
              <div className="grid grid-cols-1 gap-3 text-xs md:text-sm font-semibold text-slate-200">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start">
                  <span className="text-emerald-500 text-lg">🏖️</span>
                  <div>
                    <b className="block text-white text-sm mb-1">
                      {tLoc('شاطئ تاسوست الهادئ:', 'Plage de Tassoust :', 'Tranquil Tassoust Beach :')}
                    </b>
                    <span>
                      {tLoc('الاسترخاء والتمتع بالسباحة الممتعة طوال اليوم في مياه شاطئ تاسوست النظيفة والمثالية للعائلات.', 'Détente et baignade toute la journée sur la plage sécurisée et propre de Tassoust.', 'Relaxation and clean family swim throughout the day at cozy Tassoust beach.')}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start">
                  <span className="text-emerald-500 text-lg">🌃</span>
                  <div>
                    <b className="block text-white text-sm mb-1">
                      {tLoc('جلسات وسهرات شاطئ كتامة:', 'Soirées animées à Kotama :', 'Charming Kotama Beach Evenings :')}
                    </b>
                    <span>
                      {tLoc('جولات ليلية متميزة جداً في كورنيش شاطئ كتامة الشهير مع السهرات العائلية المبهجة والخدمات المتوفرة.', 'Promenades sur la corniche animée de la plage de Kotama et soirées conviviales.', 'Delightful night walks on the famous Kotama beach corniche with friendly family programs.')}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start">
                  <span className="text-emerald-500 text-lg">🌋</span>
                  <div>
                    <b className="block text-white text-sm mb-1">
                      {tLoc('أغوار الكهوف العجيبة الفريدة:', 'Grottes Merveilleuses Secrètes :', 'The Mystical Marvelous Caves :')}
                    </b>
                    <span>
                      {tLoc('رحلة استكشاف مذهلة لمغارات الكهوف العجيبة والتمتع بالمنحوتات الطبيعية الرائعة التي تشكلت عبر العصور.', 'Visite guidée fantastique des grottes merveilleuses et de leurs impressionnantes stalactites.', 'An outstanding tour in the famous caverns to admire millions-years old calcified natural architecture.')}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start border-r-4 border-r-emerald-500">
                  <span className="text-emerald-400 text-lg">🌳</span>
                  <div>
                    <b className="block text-emerald-300 text-sm mb-1">
                      {tLoc('فطور في الوادي:', 'Petit-déjeuner au bord de l\'Oued :', 'Organic Breakfast in the Valley :')}
                    </b>
                    <span>
                      {tLoc('التمتع بفطور صباحي تقليدي شهي وصحي في قلب الطبيعة الغناء وعلى ضفاف الوادي البارد المنساب.', 'Profiter d\'un petit-déjeuner bio typique près du cours d\'eau frais et boisé.', 'Savor a delicious traditional breakfast on the cool river shores under green tree shadows.')}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start">
                  <span className="text-emerald-500 text-lg">🦁</span>
                  <div>
                    <b className="block text-white text-sm mb-1">
                      {tLoc('حديقة الحيوانات العائلية بجيجل:', 'Parc Zoologique Familial de Jijel :', 'Jijel Family Zoo & Theme Park :')}
                    </b>
                    <span>
                      {tLoc('جولة عائلة ترفيهية مسلية لالتقاط أجمل الصور ومشاهدة أنواع الحيوانات المتنوعة والمسطحات الخضراء ومراكز الألعاب.', 'Découverte ludique de la réserve naturelle d\'animaux sauvages locales et espaces verts.', 'Enjoy watching wild animals, playing at the green theme zones, and snapping great photos.')}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start border-r-4 border-r-emerald-500">
                  <span className="text-emerald-400 text-lg">🌊</span>
                  <div>
                    <b className="block text-emerald-300 text-sm mb-1">
                      {tLoc('شلالات كفريدة بجاية المنسابة (هدية مجانية في اليوم الأخير 🎁):', 'Cascades de Kefrida Béjaïa (Bonus Offert 🎁) :', 'Kefrida Waterfalls Béjaïa (FREE BONUS TRIP 🎁) :')}
                    </b>
                    <span>
                      {tLoc('زيارة رائعة لشلال كفريدة الشهير بولاية بجاية ووداع الطبيعة الساحرة قبل الانطلاق والرجوع للديار بحفظ الله.', 'Randonnée jusqu\'aux célèbres cascades de Kefrida avant le départ vers Touggourt.', 'An incredible trip to Kefrida high waterfalls before heading back home safely.')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Left side: Prices & Interactive Calculator */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Fixed Rate Card */}
              <div className="bg-slate-950/40 p-6 rounded-[2rem] border border-white/10 space-y-4">
                <h4 className="text-base font-black text-white flex items-center justify-between border-b border-white/5 pb-2">
                  <span>{tLoc('🏘️ خيارات الإقامة وأسعار الفرد', '🏘️ Formules & Tarifs par personne', '🏘️ Accommodation & Rates per Person')}</span>
                  <span className="text-xs text-emerald-400 font-bold">{tLoc('رحلات شهر جويلية', 'Départs Juillet 2026', 'July 2026 Tours')}</span>
                </h4>
                
                <div className="space-y-4 text-xs font-bold text-slate-300">
                  
                  {/* Option 1 Detail */}
                  <div className="space-y-2">
                    <span className="text-emerald-400 text-xs block font-bold">{tLoc('🏠 الخيار الأول: شقة عائلية مجهزة ومكيفة', '🏠 Formule 1 : Appartement équipé & Climatisé', '🏠 Option 1: Fully furnished & Air-conditioned apartment')}</span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex justify-between animate-fade-in">
                        <span>{tLoc('👥 شقة خماسية (5 أفراد):', '👥 Quintuple (5 pers) :', '👥 Quintuple (5 people) :')}</span>
                        <span className="text-rose-400 font-black">12,500 DA</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex justify-between">
                        <span>{tLoc('👥 شقة رباعية (4 أفراد):', '👥 Quadruple (4 pers) :', '👥 Quadruple (4 people) :')}</span>
                        <span className="text-rose-400 font-black">13,500 DA</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex justify-between">
                        <span>{tLoc('👥 شقة ثلاثية (3 أفراد):', '👥 Triple (3 pers) :', '👥 Triple (3 people) :')}</span>
                        <span className="text-rose-400 font-black">14,500 DA</span>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/5 flex justify-between">
                        <span>{tLoc('👥 شقة ثنائية (شخصين):', '👥 Double (2 pers) :', '👥 Double (2 people) :')}</span>
                        <span className="text-rose-400 font-black">17,500 DA</span>
                      </div>
                    </div>
                  </div>

                  {/* Option 2 Detail */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-cyan-400 text-xs block font-bold">{tLoc('🏨 الخيار الثاني: فندقي ممتاز بجوار شط كتامة شامل الفطور', '🏨 Formule 2 : Hôtel Premium près de Kotama + P.Déj', '🏨 Option 2: Premium Kotama Beach Hotel + breakfast')}</span>
                    <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 flex justify-between text-[11px]">
                      <span>{tLoc('👤 فندق (غرفة ثنائية / ثلاثية / رباعية):', '👤 Hôtel (Chambre Double/Triple/Quad) :', '👤 Hotel Room (Double/Triple/Quad) :')}</span>
                      <span className="text-rose-400 font-black">25,000 DA</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Integrated Dynamic Selector Calculator for Jijel */}
              <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 space-y-4">
                <b className="text-sm font-black text-emerald-400 block mb-1">
                  {tLoc('🧮 احسب سعر رحلتك لجيجل وبجاية:', '🧮 Calculez le prix de votre séjour :', '🧮 Calculate package price :')}
                </b>
                
                {/* Step 1: Selector for Accommodation Type */}
                <div className="space-y-1">
                  <label className="block text-xs text-slate-400">
                    {tLoc('1. حدد نوع السكن المفضل:', '1. Choisissez le type d\'hébergement :', '1. Select preferred accommodation :')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCalcJijelOption('apartment')}
                      className={`p-2 rounded-xl text-xs font-black text-center transition border cursor-pointer ${
                        calcJijelOption === 'apartment'
                          ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                          : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {tLoc('🏠 شقة عائلية مجهزة', '🏠 Appartement équipé', '🏠 Equipped Apartment')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcJijelOption('hotel')}
                      className={`p-2 rounded-xl text-xs font-black text-center transition border cursor-pointer ${
                        calcJijelOption === 'hotel'
                          ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                          : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {tLoc('🏨 فندق (غرفة ثنائية / ثلاثية / رباعية) + فطور', '🏨 Hôtel + Petit-déjeuner', '🏨 Hotel + Breakfast')}
                    </button>
                  </div>
                </div>

                {/* Step 1.2: Apartment Category (only if apartment is selected) */}
                {calcJijelOption === 'apartment' && (
                  <div className="space-y-1.5 pt-1.5 animate-fade-in border-t border-white/5">
                    <label className="block text-xs text-slate-400">
                      {tLoc('1.2. حدد نوع وفئة الشقة المطلوبة:', '1.2. Choisissez la catégorie d\'appartement :', '1.2. Select apartment category :')}
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setApartmentType('penta')}
                        className={`p-2.5 rounded-xl font-bold text-center transition border cursor-pointer flex flex-col justify-center items-center ${
                          apartmentType === 'penta'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md scale-[1.01]'
                            : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <span className="font-extrabold">{tLoc('👥 شقة خماسية (5 أفراد)', '👥 Quintuple (5 pers)', '👥 Quintuple (5 guests)')}</span>
                        <span className="text-[9px] text-rose-400 font-extrabold mt-0.5">12,500 DA {tLoc('للشخص', '/ pers', '/ guest')}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setApartmentType('quad')}
                        className={`p-2.5 rounded-xl font-bold text-center transition border cursor-pointer flex flex-col justify-center items-center ${
                          apartmentType === 'quad'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md scale-[1.01]'
                            : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <span className="font-extrabold">{tLoc('👥 شقة رباعية (4 أفراد)', '👥 Quadruple (4 pers)', '👥 Quadruple (4 guests)')}</span>
                        <span className="text-[9px] text-rose-400 font-extrabold mt-0.5">13,500 DA {tLoc('للشخص', '/ pers', '/ guest')}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setApartmentType('triple')}
                        className={`p-2.5 rounded-xl font-bold text-center transition border cursor-pointer flex flex-col justify-center items-center ${
                          apartmentType === 'triple'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md scale-[1.01]'
                            : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <span className="font-extrabold">{tLoc('👥 شقة ثلاثية (3 أفراد)', '👥 Triple (3 pers)', '👥 Triple (3 guests)')}</span>
                        <span className="text-[9px] text-rose-400 font-extrabold mt-0.5">14,500 DA {tLoc('للشخص', '/ pers', '/ guest')}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setApartmentType('double')}
                        className={`p-2.5 rounded-xl font-bold text-center transition border cursor-pointer flex flex-col justify-center items-center ${
                          apartmentType === 'double'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md scale-[1.01]'
                            : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <span className="font-extrabold">{tLoc('👥 شقة ثنائية (شخصين)', '👥 Double (2 pers)', '👥 Double (2 guests)')}</span>
                        <span className="text-[9px] text-rose-400 font-extrabold mt-0.5">17,500 DA {tLoc('للشخص', '/ pers', '/ guest')}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Open Guest Selector (Adults) */}
                <div className="space-y-1.5 pt-1.5 border-t border-white/5">
                  <label className="block text-xs text-slate-400">
                    {tLoc('2. حدد عدد الأفراد البالغين (مفتوح):', '2. Nombre d\'adultes (sans limite) :', '2. Number of adults :')}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdultsCount(Math.max(0, adultsCount - 1))}
                      className="w-10 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950/80 rounded-xl border border-black/10 dark:border-white/10 hover:border-emerald-500 hover:dark:border-emerald-500 font-extrabold text-black dark:text-white text-base flex items-center justify-center transition cursor-pointer select-none"
                    >
                      -
                    </button>
                    <input 
                      type="number"
                      min="0"
                      value={adultsCount}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setAdultsCount(Math.max(0, val));
                      }}
                      className="w-full bg-slate-100 dark:bg-slate-950/70 text-black dark:text-white p-2.5 rounded-xl border border-black/10 dark:border-white/10 text-center text-xs font-bold focus:border-emerald-400"
                    />
                    <button
                      type="button"
                      onClick={() => setAdultsCount(adultsCount + 1)}
                      className="w-10 h-10 bg-slate-950/80 rounded-xl border border-white/10 hover:border-emerald-500 font-extrabold text-white text-base flex items-center justify-center transition cursor-pointer select-none"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Step 3: Detailed Children and Infants Setup */}
                <div className="space-y-3 pt-3 border-t border-white/5">
                  <b className="text-xs text-slate-300 block">
                    {tLoc('👶 تفاصيل الأطفال والرضع (إن وجدوا):', '👶 Détails des enfants & bébés (si applicables) :', '👶 Children & Infants details (if applicable) :')}
                  </b>

                  {/* 1. Child with separate bed (Same as adult price) */}
                  <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">{tLoc('🛏️ أطفال (3-10 سنوات) - مع حجز سرير:', '🛏️ Enfants (3-10 ans) - Avec lit supplémentaire :', '🛏️ Children (3-10 years) - With extra bed :')}</span>
                      <span className="text-emerald-400 font-bold">{unitJijelPrice.toLocaleString('fr-FR')} DA {tLoc('/ للطفل', '/ enfant', '/ child')}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{tLoc('يدفع نفس تكلفة الشخص البالغ لتأمين سرير إضافي.', 'Tarif identique à l\'adulte pour l\'obtention d\'un lit séparé.', 'Same as adult price to secure a dedicated extra bed.')}</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setKidsWithBed(Math.max(0, kidsWithBed - 1))}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-emerald-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        -
                      </button>
                      <input 
                        type="number"
                        min="0"
                        value={kidsWithBed}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setKidsWithBed(Math.max(0, val));
                        }}
                        className="w-full bg-slate-950/70 text-white p-1.5 rounded-lg border border-white/10 text-center text-xs font-bold focus:border-emerald-400"
                      />
                      <button
                        type="button"
                        onClick={() => setKidsWithBed(kidsWithBed + 1)}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-emerald-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 2. Child standard - No Bed, with bus seat */}
                  <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">{tLoc('💺 أطفال (3-10 سنوات) - مقعد في الحافلة وبدون سرير:', '💺 Enfants (3-10 ans) - Siège bus uniquement sans lit :', '💺 Children (3-10 years) - Bus seat only, no bed :')}</span>
                      <span className="text-emerald-400 font-bold">10,000 DA {tLoc('/ للطفل', '/ enfant', '/ child')}</span>
                    </div>
                    <p className="text-[10px] text-yellow-400/80 leading-snug">{tLoc('⚠️ السعر خاص بمقعد الحافلة فقط دون توفير سرير إضافي بالسكن.', '⚠️ Ce tarif comprend uniquement la place de bus, sans lit d\'hôtel ou de dortoir.', '⚠️ Included bus seat allocation only, with no additional bed.')}</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setKidsNoBedWithSeat(Math.max(0, kidsNoBedWithSeat - 1))}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-emerald-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        -
                      </button>
                      <input 
                        type="number"
                        min="0"
                        value={kidsNoBedWithSeat}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setKidsNoBedWithSeat(Math.max(0, val));
                        }}
                        className="w-full bg-slate-950/70 text-white p-1.5 rounded-lg border border-white/10 text-center text-xs font-bold focus:border-emerald-400"
                      />
                      <button
                        type="button"
                        onClick={() => setKidsNoBedWithSeat(kidsNoBedWithSeat + 1)}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-emerald-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 3. Child - No Bed and No Seat */}
                  <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">{tLoc('🎫 أطفال (3-10 سنوات) - بدون سرير وبدون مكان حافلة:', '🎫 Enfants (3-10 ans) - Sans lit ni siège (Assurance uniquement) :', '🎫 Children (3-10 years) - No bed & No seat (Insurance only) :')}</span>
                      <span className="text-emerald-400 font-bold">2,000 DA {tLoc('/ للطفل', '/ enfant', '/ child')}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{tLoc('تغطية مصاريف التأمين والخدمات الرمزية فقط.', 'Couverture d\'assurance de voyage obligatoire obligatoire.', 'Covers mandatory administrative and travel insurance only.')}</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setKidsNoBedNoSeat(Math.max(0, kidsNoBedNoSeat - 1))}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-emerald-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        -
                      </button>
                      <input 
                        type="number"
                        min="0"
                        value={kidsNoBedNoSeat}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setKidsNoBedNoSeat(Math.max(0, val));
                        }}
                        className="w-full bg-slate-950/70 text-white p-1.5 rounded-lg border border-white/10 text-center text-xs font-bold focus:border-emerald-400"
                      />
                      <button
                        type="button"
                        onClick={() => setKidsNoBedNoSeat(kidsNoBedNoSeat + 1)}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-emerald-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 4. Infants under 2 years (Free) */}
                  <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">{tLoc('👶 رضع (أقل من سنتين):', '👶 Bébés (moins de 2 ans) :', '👶 Infants (under 2 years) :')}</span>
                      <span className="text-emerald-400 font-bold">{tLoc('مجانًا', 'Gratuit', 'Free')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setInfantsCount(Math.max(0, infantsCount - 1))}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-emerald-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        -
                      </button>
                      <input 
                        type="number"
                        min="0"
                        value={infantsCount}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setInfantsCount(Math.max(0, val));
                        }}
                        className="w-full bg-slate-950/70 text-white p-1.5 rounded-lg border border-white/10 text-center text-xs font-bold focus:border-emerald-400"
                      />
                      <button
                        type="button"
                        onClick={() => setInfantsCount(infantsCount + 1)}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-emerald-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Show detailed bill breakdown */}
                <div className="p-3.5 bg-slate-950/70 rounded-xl border border-white/5 space-y-1.5 text-xs font-sans mt-3">
                  <div className="flex justify-between pr-1 text-slate-400 text-[10px] border-b border-white/5 pb-1">
                    <span>{tLoc('الخدمة المطلوبة', 'Prestation demandée', 'Requested Service')}</span>
                    <span>{tLoc('التكلفة الفرعية', 'Sous-total', 'Subtotal')}</span>
                  </div>
                  <div className="flex justify-between pr-1">
                    <span>👤 {adultsCount} {tLoc('بالغ ×', 'adulte(s) ×', 'adult(s) ×')} {unitJijelPrice.toLocaleString('fr-FR')} DA :</span>
                    <span className="text-slate-200">{adultsCost.toLocaleString('fr-FR')} DA</span>
                  </div>
                  {kidsWithBed > 0 && (
                    <div className="flex justify-between pr-1">
                      <span>🛏️ {kidsWithBed} {tLoc('طفل مع سرير ×', 'enfant(s) avec lit ×', 'child(ren) with bed ×')} {unitJijelPrice.toLocaleString('fr-FR')} DA :</span>
                      <span className="text-slate-200">{kidsWithBedCost.toLocaleString('fr-FR')} DA</span>
                    </div>
                  )}
                  {kidsNoBedWithSeat > 0 && (
                    <div className="flex justify-between pr-1">
                      <span>💺 {kidsNoBedWithSeat} {tLoc('طفل بمقعد ×', 'enfant(s) avec siège ×', 'child(ren) with seat ×')} 10,000 DA :</span>
                      <span className="text-slate-200">{kidsNoBedWithSeatCost.toLocaleString('fr-FR')} DA</span>
                    </div>
                  )}
                  {kidsNoBedNoSeat > 0 && (
                    <div className="flex justify-between pr-1">
                      <span>🎫 {kidsNoBedNoSeat} {tLoc('طفل دون سرير ومقعد ×', 'enfant(s) sans lit/siège ×', 'child(ren) without bed/seat ×')} 2,000 DA :</span>
                      <span className="text-slate-200">{kidsNoBedNoSeatCost.toLocaleString('fr-FR')} DA</span>
                    </div>
                  )}
                  {infantsCount > 0 && (
                    <div className="flex justify-between pr-1 text-emerald-400">
                      <span>👶 {infantsCount} {tLoc('رضيع (أقل من سنتين) :', 'bébé(s) (moins de 2 ans) :', 'infant(s) (under 2 years) :')}</span>
                      <span>{tLoc('مجانًا', 'Gratuit', 'Free')}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="font-extrabold text-slate-300">{tLoc('💰 إجمالي الحساب التقديري للفوج:', '💰 Total Général Estimé :', '💰 Estimated Group Invoice Total :')}</span>
                    <span className="text-base font-black text-rose-400">
                      {totalJijelCost.toLocaleString('fr-FR')} DA
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Benefits / Included cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* What is included block */}
            <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3 col-reverse-direction">
              <h5 className="font-extrabold text-white text-sm border-r-4 border-emerald-500 pr-2">
                {tLoc('📌 السعر المذكور يشمل:', '📌 Le prix comprend :', '📌 Price Package Includes :')}
              </h5>
              <ul className="text-xs text-slate-300 space-y-2 pr-1 decoration-none list-none">
                <li className="flex items-center gap-1.5">✔ {tLoc('النقل المريح والآمن في حافلة سياحية مجهزة ومنظمة التكييف.', 'Le transport aller-retour en bus de tourisme climatisé ultra confortable.', 'Safe and comfortable tourist bus transfers (fully air-conditioned).')}</li>
                <li className="flex items-center gap-1.5">✔ {tLoc('الإقامة المختارة بعناية (شقة عائلية مكيفة ومريحة أو فندق مميز).', 'L\'hébergement au choix (appartement climatisé équipé ou hôtel à Kotama).', 'Selected accommodation type (premium air-conditioned family flat or beachfront hotel).')}</li>
                <li className="flex items-center gap-1.5">✔ {tLoc('وجبة فطور صباحية تقليدية وصحية في أحضان الوادي وسط الطبيعة.', 'Un petit-déjeuner traditionnel biologique au cœur de paysages d\'Oued.', 'One biological traditional morning breakfast in the wild river valley.')}</li>
                <li className="flex items-center gap-1.5">✔ {tLoc('وجبة فطور الفندق اليومية (في حال اختيار السكن في فندق كتامة).', 'Le buffet de petit-déjeuner quotidien de l\'hôtel (si formule hôtel choisie).', 'Daily hotel breakfast buffet (applicable for Kotama beachfront hotel formulas).')}</li>
                <li className="flex items-center gap-1.5">✔ {tLoc('الجولات والخرجات والرحلات الكاملة المدرجة في الجدول اليومي.', 'Toutes les visites guidées guidées et entrées gratuites mentionnées.', 'All daily guided excursions, beach access, and entry tickets in the program.')}</li>
                <li className="flex items-center gap-1.5">✔ {tLoc('مرشد ومرافق متطوع وودود للغاية من طرف الوكالة طيلة السفر.', 'Un guide professionnel chaleureux de l\'agence tout au long du séjour.', 'Professional local guide companionship by the Aboub Travel board.')}</li>
              </ul>
            </div>

            {/* Booking and registration card */}
            <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3">
              <h5 className="font-extrabold text-white text-sm border-r-4 border-emerald-500 pr-2">
                {tLoc('🏫 طريقة الحجز وموقع الوكالة:', '🏫 Réservation & Siège de l\'agence :', '🏫 Office Location & Support Channels :')}
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed pr-1 font-sans">
                🏢 <b>{tLoc('موقع الوكالة الرسمي بـ (تقرت):', 'Siège officiel à (Touggourt) :', 'Office Hub (Touggourt) :')}</b> {tLoc('حي عياد الشارع رقم 001، وراء بلدية تبسبست، وبالقرب من الباب الكبير لمتوسطة نصرات حشاني.', 'Quartier Ayad, Rue 001 (Derrière l\'assemblée de Tebesbest, près de l\'école Nesrat Hachani).', 'Ayad Lane, Street 001, Behind Tebesbest Municipality assembly, adjacent to Nesrat Hachani School.')}
                <br className="my-1" />
                📲 <b>{tLoc('للتواصل والحجز السريع:', 'Contact & Réservation :', 'Helpline & Rapid Bookings :')}</b> {tLoc('يمكنك الاتصال مباشرة وبسهولة بأحد الأرقام المعتمدة على الهاتف والواتساب للفوج.', 'Appelez-nous ou envoyez un message WhatsApp direct à nos conseillers.', 'Place a phone call or click the quick action WhatsApp button below.')}
                <br className="my-1" />
                📞 <b>{tLoc('أرقام الدعم الرسمية:', 'Numéros de support officiels :', 'Helpline Telephone Numbers :')}</b> 0667910148 — 0696789633
              </p>
            </div>

          </div>

          {/* Direct quick action WhatsApp booking */}
          <div className="pt-2">
            <a 
              href={getWhatsAppLink(getWhatsAppJijelMsg(
                calcJijelOption,
                apartmentType,
                adultsCount,
                kidsWithBed,
                kidsNoBedWithSeat,
                kidsNoBedNoSeat,
                infantsCount,
                totalJijelCost
              ))}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full block text-lg font-black bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl text-center shadow-xl transition-all hover:scale-101 duration-300 cursor-pointer"
            >
              💬 {tLoc('احجز رحلة ساحل جيجل الآن عبر الواتساب (طيلة شهر جويلية)', 'Réserver pour Jijel & Béjaïa via WhatsApp (Juillet)', 'Book Jijel & Bejaia Coast Vacation via WhatsApp (July 2026)')}
            </a>
          </div>

            </div>
          </div>
        )}

          {selectedTrip === 'algiers' && (
            <div className="bg-slate-900/40 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col animate-fade-in">
        
        {/* Image banner with badges */}
        <div className="h-80 md:h-[28rem] w-full relative">
          <img 
            src={algiersMonument} 
            alt="الجزائر العاصمة مقام الشهيد وبومرداس وتيبازة"
            className="w-full h-full object-cover animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"></div>
          
          {/* Float badges */}
          <div className="absolute top-6 right-6 flex flex-wrap gap-2 animate-fade-in">
            <span className="bg-slate-950/80 backdrop-blur text-white font-black py-2 px-4 rounded-full text-xs font-sans border border-white/20 shadow-md">
              {tLoc('🇩🇿 رحلة: الجزائر العاصمة - بومرداس - تيبازة', '🇩🇿 Séjour : Alger - Boumerdès - Tipaza', '🇩🇿 Tour: Algiers - Boumerdes - Tipaza')}
            </span>
            <span className="bg-indigo-600 text-white font-black py-2 px-4 rounded-full text-xs font-sans shadow-md">
              {tLoc('🔥 رحلة ناجحة ومطلوبة بكثرة!', '🔥 Formule Populaire Élite !', '🔥 Highly Demanded Best-Seller!')}
            </span>
          </div>

          <div className="absolute bottom-6 right-6 left-6 text-white text-right space-y-2 text-shadow-custom">
            <span className="bg-indigo-500/20 text-indigo-300 font-extrabold px-3 py-1.5 rounded-full text-xs border border-indigo-500/30 font-sans">
              {tLoc('⛱️ عطلة الصيف والترفيه طيلة شهر جويلية', '⛱️ Vacances de Loisirs & Plages en Juillet', '⛱️ Summer beach & shopping getaway in July')}
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-white mt-1">
              {tLoc('الجزائر العاصمة – بومرداس – تيبازة (6 أيام / 5 ليالٍ)', 'Alger, Boumerdès & Tipaza (6 Jours / 5 Nuits)', 'Algiers, Boumerdes & Tipaza (6 Days / 5 Nights)')}
            </h3>
            <p className="text-sm text-slate-200 font-medium">
              {tLoc('استكشف التاريخ العريق، جمال شواطئ بومرداس، والخرجات العائلية والتسوق بقلب العاصمة', 'Découvrez le riche patrimoine romain, les plages dorées et le shopping d\'Alger.', 'Explore glorious ruins, golden sand beaches, and family shopping hubs in Algiers.')}
            </p>
          </div>
        </div>

        {/* Package detailed body */}
        <div className="p-6 md:p-10 space-y-10 text-right">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Right side: Program & Activities */}
            <div className="lg:col-span-7 space-y-6">
              <h4 className="text-xl font-bold text-indigo-400 pb-2 border-b border-white/10 flex items-center gap-2">
                <span>{tLoc('🗺️ البرنامج الثري والزيارات الاستكشافية اليومية:', '🗺️ Programme Exceptionnel des Visites :', '🗺️ Comprehensive Daily Guided Program :')}</span>
              </h4>
              
              <div className="grid grid-cols-1 gap-3 text-xs md:text-sm font-semibold text-slate-200">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start">
                  <span className="text-indigo-500 text-lg">🌊</span>
                  <div>
                    <b className="block text-white text-sm mb-1 font-bold">
                      {tLoc('شواطئ بومرداس وتيبازة:', 'Plages de Boumerdès & Tipaza :', 'Beautiful Boumerdes & Tipaza Beaches :')}
                    </b>
                    <span>
                      {tLoc('الاستمتاع بالسباحة والاستجمام في شواطئ الساحل الزرقاء الدافئة والنظيفة المصممة خصيصاً لراحة البال.', 'Savourer la baignade dans les eaux bleues propres et animées de la côte méditerranéenne.', 'Incredible warm swim breaks in the blue coastal beaches of Boumerdes and Tipaza.')}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start">
                  <span className="text-indigo-500 text-lg">🏛️</span>
                  <div>
                    <b className="block text-white text-sm mb-1 font-bold">
                      {tLoc('المعالم التاريخية والأثرية:', 'Monuments Historiques et Antiques :', 'Ancient Ruins & Landmarks :')}
                    </b>
                    <span>
                      {tLoc('زيارة الآثار الرومانية العريقة بتيبازة (اختيارية)، ومقام الشهيد العظيم، وساحة الشهداء بقلب العاصمة.', 'Visite des ruines romaines de Tipaza, du mémorial du Martyr d\'Alger et de la Place des Martyrs.', 'Tours of Tipaza Roman ruins (optional), Algiers Martyr Memorial, and martyrs square.')}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start">
                  <span className="text-indigo-500 text-lg">🕌</span>
                  <div>
                    <b className="block text-white text-sm mb-1 font-bold">
                      {tLoc('الصروح الدينية الكبرى:', 'Grandes Mosquées & Héritages :', 'Grand Islamic Architectures :')}
                    </b>
                    <span>
                      {tLoc('زيارة جامع كتشاوة العتيق والجامع الكبير بالجزائر العاصمة لاستبصار منارة العمارة الإسلامية الرائعة.', 'Découverte de l\'historique mosquée de Ketchaoua et de Djamaâ el-Djazaïr.', 'Visits to Ketchaoua historic mosque and Djamaa el-Djazair (Algiers Grand Mosque).')}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start border-r-4 border-r-indigo-500">
                  <span className="text-indigo-400 text-lg">🌳</span>
                  <div>
                    <b className="block text-indigo-300 text-sm mb-1 font-bold">
                      {tLoc('حديقة التجارب الحامة الرائعة:', 'Magnifique Jardin d\'Essai d\'El Hamma :', 'The Lush Botanical Hamma Garden :')}
                    </b>
                    <span>
                      {tLoc('أجمل جولة عائلية في رئة العاصمة وجوهرة الطبيعة الخضراء لالتقاط أروع الذكريات والصور التذكارية.', 'Merveilleuse balade dans le poumon d\'Alger, l\'un des plus beaux jardins historiques tropicaux.', 'A wonderful walk through tropical plants and historical trees inside the iconic El Hamma garden.')}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start">
                  <span className="text-indigo-500 text-lg">🚇</span>
                  <div>
                    <b className="block text-white text-sm mb-1 font-bold">
                      {tLoc('مترو الجزائر ومنتزه الصابلات:', 'Réseau Métro & Promenade des Sablettes :', 'Algiers Metro & Sablettes Corniche :')}
                    </b>
                    <span>
                      {tLoc('تجربة ركوب مترو العاصمة والتمتع بالنزهة البحرية الفاخرة بمنتزه الصابلات مع الأكشاك ومرافق الألعاب والتريض.', 'Voyager en Métro d\'Alger et faire une détente maritime aux Sablettes.', 'Ride the underground Algiers Metro and enjoy the clean ocean shores at Sablettes coastal park.')}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start border-r-4 border-r-indigo-500">
                  <span className="text-indigo-400 text-lg">🛍️</span>
                  <div>
                    <b className="block text-indigo-300 text-sm mb-1 font-bold">
                      {tLoc('جولات مراكز التسوق الكبرى (Ardis & Bab Ezzouar):', 'Shopping aux grands Malls (Ardis & Bab Ezzouar) :', 'Premium Malls Shopping Spree (Ardis & Bab Ezzouar) :')}
                    </b>
                    <span>
                      {tLoc('تسوق متكامل وممتع للغاية في أكبر المراكز التجارية الحديثة (مركز أرديس ومركز باب الزوار) لشراء هدايا تذكارية مميزة.', 'Session de shopping et divertissements dans de prestigieux centres d\'achat et loisirs.', 'Enjoy shopping brand clothes, local gifts, and delicious treats in modern luxury shopping centers.')}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start">
                  <span className="text-indigo-500 text-lg">🏆</span>
                  <div>
                    <b className="block text-white text-sm mb-1 font-bold">
                      {tLoc('سهرات ومسابقات فكرية وثقافية:', 'Soirées & Jeux culturels en famille :', 'Evenings Quizzes & Intellect Competitions :')}
                    </b>
                    <span>
                      {tLoc('تنظيم سهرات ليلية ماتعة ومسابقات ثقافية تفاعلية تتضمن جوائز تشجيعية عائلية رائعة من طرف مرافق الوكالة.', 'Activités interactives, énigmes, et cadeaux de voyage offerts aux familles gagnantes.', 'Fun nighttime gatherings with cultural quizzes, games, and interesting travel gifts.')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Left side: Prices & Interactive Calculator */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Fixed Rate Card */}
              <div className="bg-slate-950/40 p-6 rounded-[2rem] border border-white/10 space-y-4">
                <h4 className="text-base font-black text-white flex items-center justify-between border-b border-white/5 pb-2">
                  <span>{tLoc('🏘️ خيارات الإقامة وأسعار الفرد', '🏘️ Tarifs par personne & Forfaits', '🏘️ Formules & Rates per Person')}</span>
                  <span className="text-xs text-indigo-400 font-bold">{tLoc('رحلات شهر جويلية', 'Départs Juillet 2026', 'July 2026 Tours')}</span>
                </h4>
                
                <div className="space-y-4 text-xs font-bold text-slate-300">
                  
                  {/* Option 1 Detail */}
                  <div className="space-y-2">
                    <span className="text-indigo-400 text-xs block font-bold">{tLoc('🏢 الخيار الأول: الإقامة الأولى (مرقد مجهز ومريح)', '🏢 Formule 1 : Foyer / dortoir équipé et confortable', '🏢 Option 1: Shared hostel facility (comfortable & equipped)')}</span>
                    <div className="grid grid-cols-1 gap-2 text-[11px] text-slate-300">
                      <div className="bg-white/5 p-2.5 rounded-lg border border-white/5 flex justify-between animate-fade-in">
                        <span>{tLoc('👥 غرفة رباعية أو خماسية (4 أو 5 أفراد):', '👥 Chambre Quad/Quintuple :', '👥 Quadruple / Quintuple (4-5 guests) :')}</span>
                        <span className="text-rose-400 font-black">12,500 DA</span>
                      </div>
                      <div className="bg-white/5 p-2.5 rounded-lg border border-white/5 flex justify-between">
                        <span>{tLoc('👥 غرفة ثلاثية (3 أفراد):', '👥 Chambre Triple (3 pers) :', '👥 Triple Room (3 guests) :')}</span>
                        <span className="text-rose-400 font-black">14,500 DA</span>
                      </div>
                      <div className="bg-white/5 p-2.5 rounded-lg border border-white/5 flex justify-between">
                        <span>{tLoc('👥 غرفة ثنائية (شخصين):', '👥 Chambre Double (2 pers) :', '👥 Double Room (2 guests) :')}</span>
                        <span className="text-rose-400 font-black">15,500 DA</span>
                      </div>
                    </div>
                  </div>

                  {/* Option 2 Detail */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-cyan-400 text-xs block font-bold">{tLoc('🏨 الخيار الثاني: إقامة فندقية ممتازة ومريحة جداً', '🏨 Formule 2 : Séjour d\'Hôtel Elite climatisé', '🏨 Option 2: Air-conditioned premium luxury hotel')}</span>
                    <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 flex justify-between text-[11px]">
                      <span>{tLoc('👤 فندق (غرفة ثنائية / ثلاثية / رباعية):', '👤 Hôtel (Chambre Double/Triple/Quad) :', '👤 Hotel Room (Double/Triple/Quad) :')}</span>
                      <span className="text-rose-400 font-black">23,000 DA</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Integrated Dynamic Selector Calculator for Algiers */}
              <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 space-y-4">
                <b className="text-sm font-black text-indigo-400 block mb-1">
                  {tLoc('🧮 احسب سعر رحلتك للجزائر العاصمة:', '🧮 Calculez le prix de votre séjour d\'Alger :', '🧮 Calculate Algiers package price :')}
                </b>
                
                {/* Step 1: Selector for Accommodation Type */}
                <div className="space-y-1">
                  <label className="block text-xs text-slate-400">
                    {tLoc('1. حدد نوع السكن المفضل:', '1. Choisissez le type d\'hébergement :', '1. Select preferred accommodation :')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCalcAlgOption('hostel')}
                      className={`p-2 rounded-xl text-xs font-black text-center transition border cursor-pointer ${
                        calcAlgOption === 'hostel'
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {tLoc('🏨 الإقامة الأولى (مرقد مجهز)', '🏨 Foyer / Dortoir équipé', '🏨 Shared Hostel Facility')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcAlgOption('hotel')}
                      className={`p-2 rounded-xl text-xs font-black text-center transition border cursor-pointer ${
                        calcAlgOption === 'hotel'
                          ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {tLoc('🏨 إقامة فندقية ممتازة', '🏨 Hôtel de luxe', '🏨 Premium Luxury Hotel')}
                    </button>
                  </div>
                </div>

                {/* Step 1.2: Hostel Category (only if hostel is selected) */}
                {calcAlgOption === 'hostel' && (
                  <div className="space-y-1.5 pt-1.5 animate-fade-in border-t border-white/5">
                    <label className="block text-xs text-slate-400">
                      {tLoc('1.2. حدد نمط وفئة الغرفة المفضلة بالإقامة:', '1.2. Choisissez la catégorie de chambre (Dortoir) :', '1.2. Choose hostel bedroom size :')}
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 text-[9px]">
                      <button
                        type="button"
                        onClick={() => setAlgHostelType('quad_penta')}
                        className={`p-2 rounded-xl font-bold text-center transition border cursor-pointer flex flex-col justify-center items-center ${
                          algHostelType === 'quad_penta'
                            ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-sm scale-[1.01]'
                            : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <span className="font-extrabold text-[10px]">
                          {tLoc('👥 غرفة خماسية / رباعية', '👥 Chambre Quintuple / Quad', '👥 Quintuple / Quad Room')}
                        </span>
                        <span className="text-[9px] text-rose-400 font-extrabold mt-0.5">12,500 DA</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAlgHostelType('triple')}
                        className={`p-2 rounded-xl font-bold text-center transition border cursor-pointer flex flex-col justify-center items-center ${
                          algHostelType === 'triple'
                            ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-sm scale-[1.01]'
                            : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <span className="font-extrabold text-[10px]">
                          {tLoc('👥 غرفة ثلاثية', '👥 Chambre Triple', '👥 Triple Room')}
                        </span>
                        <span className="text-[9px] text-rose-400 font-extrabold mt-0.5">14,500 DA</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setAlgHostelType('double')}
                        className={`p-2 rounded-xl font-bold text-center transition border cursor-pointer flex flex-col justify-center items-center ${
                          algHostelType === 'double'
                            ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-sm scale-[1.01]'
                            : 'bg-slate-950/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <span className="font-extrabold text-[10px]">
                          {tLoc('👥 غرفة ثنائية', '👥 Chambre Double', '👥 Double Room')}
                        </span>
                        <span className="text-[9px] text-rose-400 font-extrabold mt-0.5">15,500 DA</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Open Guest Selector (Adults) */}
                <div className="space-y-1.5 pt-1.5 border-t border-white/5">
                  <label className="block text-xs text-slate-400">
                    {tLoc('2. حدد عدد الأفراد البالغين (مفتوح):', '2. Entrez le nombre d\'adultes :', '2. Select number of adult guests :')}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAlgAdultsCount(Math.max(0, algAdultsCount - 1))}
                      className="w-10 h-10 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950/80 rounded-xl border border-black/10 dark:border-white/10 hover:border-indigo-500 hover:dark:border-indigo-500 font-extrabold text-black dark:text-white text-base flex items-center justify-center transition cursor-pointer select-none"
                    >
                      -
                    </button>
                    <input 
                      type="number"
                      min="0"
                      value={algAdultsCount}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setAlgAdultsCount(Math.max(0, val));
                      }}
                      className="w-full bg-slate-100 dark:bg-slate-950/70 text-black dark:text-white p-2.5 rounded-xl border border-black/10 dark:border-white/10 text-center text-xs font-bold focus:border-indigo-400"
                    />
                    <button
                      type="button"
                      onClick={() => setAlgAdultsCount(algAdultsCount + 1)}
                      className="w-10 h-10 bg-slate-950/80 rounded-xl border border-white/10 hover:border-indigo-500 font-extrabold text-white text-base flex items-center justify-center transition cursor-pointer select-none"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Step 3: Detailed Children and Infants Setup */}
                <div className="space-y-3 pt-3 border-t border-white/5">
                  <b className="text-xs text-slate-300 block">
                    {tLoc('👶 تفاصيل الأطفال والرضع (إن وجدوا):', '👶 Détails des enfants & bébés (si applicables) :', '👶 Children & Infants details (if applicable) :')}
                  </b>

                  {/* 1. Child with separate bed (Same as adult price) */}
                  <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">{tLoc('🛏️ أطفال (3-10 سنوات) - مع حجز سرير:', '🛏️ Enfants (3-10 ans) - Avec lit supplémentaire :', '🛏️ Children (3-10 years) - With extra bed :')}</span>
                      <span className="text-indigo-400 font-bold">{unitAlgPrice.toLocaleString('fr-FR')} DA {tLoc('/ للطفل', '/ enfant', '/ child')}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{tLoc('يدفع نفس تكلفة الشخص البالغ لتأمين سرير إضافي.', 'Tarif identique à l\'adulte pour l\'obtention d\'un lit séparé.', 'Same as adult price to secure a dedicated extra bed.')}</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAlgKidsWithBed(Math.max(0, algKidsWithBed - 1))}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-indigo-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        -
                      </button>
                      <input 
                        type="number"
                        min="0"
                        value={algKidsWithBed}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setAlgKidsWithBed(Math.max(0, val));
                        }}
                        className="w-full bg-slate-950/70 text-white p-1.5 rounded-lg border border-white/10 text-center text-xs font-bold focus:border-indigo-400"
                      />
                      <button
                        type="button"
                        onClick={() => setAlgKidsWithBed(algKidsWithBed + 1)}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-indigo-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 2. Child standard - No Bed, with bus seat */}
                  <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">{tLoc('💺 أطفال (3-10 سنوات) - مقعد في الحافلة وبدون سرير:', '💺 Enfants (3-10 ans) - Siège bus uniquement sans lit :', '💺 Children (3-10 years) - Bus seat only, no bed :')}</span>
                      <span className="text-indigo-400 font-bold">10,000 DA {tLoc('/ للطفل', '/ enfant', '/ child')}</span>
                    </div>
                    <p className="text-[10px] text-yellow-400/80 leading-snug">{tLoc('⚠️ السعر الخاص بمقعد الحافلة فقط دون توفير سرير إضافي بالإقامة.', '⚠️ Ce tarif comprend uniquement la place de bus, sans lit d\'hôtel ou de dortoir.', '⚠️ Included bus seat allocation only, with no additional bed.')}</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAlgKidsNoBedWithSeat(Math.max(0, algKidsNoBedWithSeat - 1))}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-indigo-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        -
                      </button>
                      <input 
                        type="number"
                        min="0"
                        value={algKidsNoBedWithSeat}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setAlgKidsNoBedWithSeat(Math.max(0, val));
                        }}
                        className="w-full bg-slate-950/70 text-white p-1.5 rounded-lg border border-white/10 text-center text-xs font-bold focus:border-indigo-400"
                      />
                      <button
                        type="button"
                        onClick={() => setAlgKidsNoBedWithSeat(algKidsNoBedWithSeat + 1)}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-indigo-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 3. Child - No Bed and No Seat */}
                  <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">{tLoc('🎫 أطفال (3-10 سنوات) - بدون سرير وبدون مكان حافلة:', '🎫 Enfants (3-10 ans) - Sans lit ni siège (Assurance uniquement) :', '🎫 Children (3-10 years) - No bed & No seat (Insurance only) :')}</span>
                      <span className="text-indigo-400 font-bold">2,000 DA {tLoc('/ للطفل', '/ enfant', '/ child')}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{tLoc('تغطية مصاريف التأمين والخدمات الرمزية فقط.', 'Couverture d\'assurance de voyage obligatoire obligatoire.', 'Covers mandatory administrative and travel insurance only.')}</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAlgKidsNoBedNoSeat(Math.max(0, algKidsNoBedNoSeat - 1))}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-indigo-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        -
                      </button>
                      <input 
                        type="number"
                        min="0"
                        value={algKidsNoBedNoSeat}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setAlgKidsNoBedNoSeat(Math.max(0, val));
                        }}
                        className="w-full bg-slate-950/70 text-white p-1.5 rounded-lg border border-white/10 text-center text-xs font-bold focus:border-indigo-400"
                      />
                      <button
                        type="button"
                        onClick={() => setAlgKidsNoBedNoSeat(algKidsNoBedNoSeat + 1)}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-indigo-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* 4. Infants under 2 years (Free) */}
                  <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">{tLoc('👶 رضع (أقل من سنتين):', '👶 Bébés (moins de 2 ans) :', '👶 Infants (under 2 years) :')}</span>
                      <span className="text-indigo-400 font-bold">{tLoc('مجانًا', 'Gratuit', 'Free')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAlgInfantsCount(Math.max(0, algInfantsCount - 1))}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-indigo-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        -
                      </button>
                      <input 
                        type="number"
                        min="0"
                        value={algInfantsCount}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setAlgInfantsCount(Math.max(0, val));
                        }}
                        className="w-full bg-slate-950/70 text-white p-1.5 rounded-lg border border-white/10 text-center text-xs font-bold focus:border-indigo-400"
                      />
                      <button
                        type="button"
                        onClick={() => setAlgInfantsCount(algInfantsCount + 1)}
                        className="w-8 h-8 bg-slate-950/80 rounded-lg border border-white/10 hover:border-indigo-500 text-white flex items-center justify-center transition cursor-pointer select-none text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Show detailed bill breakdown for Algiers */}
                <div className="p-3.5 bg-slate-950/70 rounded-xl border border-white/5 space-y-1.5 text-xs font-sans mt-3">
                  <div className="flex justify-between pr-1 text-slate-400 text-[10px] border-b border-white/5 pb-1">
                    <span>{tLoc('الخدمة المطلوبة', 'Prestation demandée', 'Requested Service')}</span>
                    <span>{tLoc('التكلفة الفرعية', 'Sous-total', 'Subtotal')}</span>
                  </div>
                  <div className="flex justify-between pr-1">
                    <span>👤 {algAdultsCount} {tLoc('بالغ ×', 'adulte(s) ×', 'adult(s) ×')} {unitAlgPrice.toLocaleString('fr-FR')} DA :</span>
                    <span className="text-slate-200">{algAdultsCost.toLocaleString('fr-FR')} DA</span>
                  </div>
                  {algKidsWithBed > 0 && (
                    <div className="flex justify-between pr-1">
                      <span>🛏️ {algKidsWithBed} {tLoc('طفل بسرير ×', 'enfant(s) avec lit ×', 'child(ren) with bed ×')} {unitAlgPrice.toLocaleString('fr-FR')} DA :</span>
                      <span className="text-slate-200">{algKidsWithBedCost.toLocaleString('fr-FR')} DA</span>
                    </div>
                  )}
                  {algKidsNoBedWithSeat > 0 && (
                    <div className="flex justify-between pr-1">
                      <span>💺 {algKidsNoBedWithSeat} {tLoc('طفل بمقعد ×', 'enfant(s) avec siège ×', 'child(ren) with seat ×')} 10,000 DA :</span>
                      <span className="text-slate-200">{algKidsNoBedWithSeatCost.toLocaleString('fr-FR')} DA</span>
                    </div>
                  )}
                  {algKidsNoBedNoSeat > 0 && (
                    <div className="flex justify-between pr-1">
                      <span>🎫 {algKidsNoBedNoSeat} {tLoc('طفل بدون سرير وبدون مقعد ×', 'enfant(s) sans lit/siège ×', 'child(ren) without bed/seat ×')} 2,000 DA :</span>
                      <span className="text-slate-200">{algKidsNoBedNoSeatCost.toLocaleString('fr-FR')} DA</span>
                    </div>
                  )}
                  {algInfantsCount > 0 && (
                    <div className="flex justify-between pr-1 text-indigo-400">
                      <span>👶 {algInfantsCount} {tLoc('رضيع (أقل من سنتين) :', 'bébé(s) (moins de 2 ans) :', 'infant(s) (under 2 years) :')}</span>
                      <span>{tLoc('مجانًا', 'Gratuit', 'Free')}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-white/10">
                    <span className="font-extrabold text-slate-300">{tLoc('💰 إجمالي الحساب التقديري للفوج:', '💰 Total Général Estimé :', '💰 Estimated Group Invoice Total :')}</span>
                    <span className="text-base font-black text-rose-400">
                      {totalAlgCost.toLocaleString('fr-FR')} DA
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Benefits / Included cards ALGIERS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* What is included block */}
            <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3">
              <h5 className="font-extrabold text-white text-sm border-r-4 border-indigo-500 pr-2">
                {tLoc('📌 السعر المذكور يشمل:', '📌 Le prix comprend :', '📌 Price Package Includes :')}
              </h5>
              <ul className="text-xs text-slate-300 space-y-2 pr-1 decoration-none list-none">
                <li className="flex items-center gap-1.5">✔ {tLoc('النقل المريح والآمن في حافلة سياحية مجهزة طيلة الرحلة من مقر الوكالة والعودة.', 'Transport en bus de tourisme VIP climatisé tout au long du séjour.', 'Premium air-conditioned VIP round-trip bus transportation from office.')}</li>
                <li className="flex items-center gap-1.5">✔ {tLoc('التنقل اليومي المبرمج والمضمون لجميع المعالم والوجهات السياحية المذكورة.', 'Transferts quotidiens vers l\'ensemble des attractions et plages.', 'Daily programmed tours and ocean beach transfers included of choice.')}</li>
                <li className="flex items-center gap-1.5">✔ {tLoc('الإقامة المريحة والمجهزة بالكامل حسب الخيار المفضل (مرقد مجهز أو فندق سياحي مميز).', 'Hébergement selon l\'offre choisie (foyer équipé ou hôtel de luxe).', 'Selected comfortable high-standard stays (equipped hostel rooms or hotel).')}</li>
                <li className="flex items-center gap-1.5">✔ {tLoc('مرافقة مرشد سياحي فذ وذو خبرة عالية ومتابعة من طرف طاقمنا طيلة السفرية.', 'Assistance et guide professionnel chaleureux de notre agence agréée.', 'Top-class expert tour guide accompaniment throughout the dynamic trips.')}</li>
                <li className="flex items-center gap-1.5">✔ {tLoc('تأمين كامل وشامل للمسافرين طوال فترة السفر العائلية.', 'Assurance de voyage multirisque complète incluse pour le groupe.', 'Comprehensive traveler\'s logistics insurance & medical cover for the group.')}</li>
              </ul>
            </div>

            {/* Booking and registration card */}
            <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3">
              <h5 className="font-extrabold text-white text-sm border-r-4 border-indigo-500 pr-2">
                {tLoc('🏫 طريقة الحجز وموقع الوكالة:', '🏫 Réservation & Siège de l\'agence :', '🏫 Office Location & Support Channels :')}
              </h5>
              <p className="text-xs text-slate-300 leading-relaxed pr-1 font-sans">
                🏢 <b>{tLoc('موقع الوكالة الرسمي بـ (تقرت):', 'Siège officiel à (Touggourt) :', 'Office Hub (Touggourt) :')}</b> {tLoc('حي عياد الشارع رقم 001، وراء بلدية تبسبست، وبالقرب من الباب الكبير لمتوسطة نصرات حشاني.', 'Quartier Ayad, Rue 001 (Derrière l\'assemblée de Tebesbest, près de l\'école Nesrat Hachani).', 'Ayad Lane, Street 001, Behind Tebesbest Municipality assembly, adjacent to Nesrat Hachani School.')}
                <br className="my-1" />
                📲 <b>{tLoc('للتواصل والاتصال السريع للحجز:', 'Contact & Réservation :', 'Helpline & Rapid Bookings :')}</b> {tLoc('يمكنك التواصل مع ممثلينا عبر أحد الأرقام الهاتفية المتاحة مباشرة أو عبر تطبيق الواتساب.', 'Appelez-nous ou envoyez un message WhatsApp direct à nos conseillers.', 'Place a phone call or click the quick action WhatsApp button below.')}
                <br className="my-1" />
                📞 <b>{tLoc('أرقام الدعم لوكالة عبعوب:', 'Numéros de support de l\'agence :', 'Aboub Travel Official Support Lines :')}</b> 0667910148 — 0696789633
              </p>
            </div>

          </div>

          {/* Direct quick action WhatsApp booking */}
          <div className="pt-2">
            <a 
              href={getWhatsAppLink(getWhatsAppAlgMsg(
                calcAlgOption,
                algHostelType,
                algAdultsCount,
                algKidsWithBed,
                algKidsNoBedWithSeat,
                algKidsNoBedNoSeat,
                algInfantsCount,
                totalAlgCost,
                unitAlgPrice
              ))}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full block text-lg font-black bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl text-center shadow-xl transition-all hover:scale-101 duration-300 cursor-pointer"
            >
              💬 {tLoc('احجز رحلة العاصمة وبومرداس وتيبازة الآن عبر الواتساب (شهر جويلية)', 'Réserver Alger, Boumerdès & Tipaza via WhatsApp (Juillet)', 'Book Algiers & Tipaza Vacation via WhatsApp (July 2026)')}
            </a>
          </div>

            </div>
          </div>
        )}

        {/* Custom Dynamic Local Trip Detail View */}
        {!['jijel', 'algiers'].includes(selectedTrip || '') && selectedTrip !== null && (
          (() => {
            const trip = tripsList.find(t => t.id === selectedTrip);
            if (!trip) return <div className="text-center py-20 text-white font-bold">الرحلة غير متوفرة حالياً.</div>;

            const title = language === 'ar' ? trip.titleAr : (language === 'fr' ? trip.titleFr : trip.titleEn);
            const desc = language === 'ar' ? trip.descAr : (language === 'fr' ? trip.descFr : trip.descEn);
            const hotel = language === 'ar' ? trip.hotelAr : (language === 'fr' ? trip.hotelFr : trip.hotelEn);
            const duration = language === 'ar' ? trip.durationAr : (language === 'fr' ? trip.durationFr : trip.durationEn);
            const badge1 = language === 'ar' ? trip.badge1Ar : (language === 'fr' ? trip.badge1Fr : trip.badge1En);
            const badge2 = language === 'ar' ? trip.badge2Ar : (language === 'fr' ? trip.badge2Fr : trip.badge2En);
            const regNotes = language === 'ar' ? trip.regNotesAr : (language === 'fr' ? trip.regNotesFr : trip.regNotesEn) || trip.regNotesAr;
            const included = language === 'ar' ? trip.includedAr : (language === 'fr' ? trip.includedFr : trip.includedEn);

            const customPrices = (trip.prices && trip.prices.length > 0)
              ? trip.prices.map((p: any) => ({
                  label: language === 'ar' ? p.typeAr : (language === 'fr' ? p.typeFr : p.typeEn),
                  price: parseInt(String(p.price_dzd || "").replace(/[^\d]/g, ""), 10) || trip.price
                }))
              : [
                  {
                    label: language === 'ar' ? '👤 شخص في غرفة ثنائية / ثلاثية' : (language === 'fr' ? 'Chambre Double / Triple' : 'Person in Double / Triple Room'),
                    price: trip.price
                  },
                  {
                    label: language === 'ar' ? '👤 شخص في غرفة فردية (Single)' : (language === 'fr' ? 'Chambre Individuelle (Single)' : 'Person in Single Room'),
                    price: Math.round((trip.price * 1.4) / 1000) * 1000
                  },
                  {
                    label: language === 'ar' ? '👶 طفل (2-12 سنة) بدون سرير إضافي' : (language === 'fr' ? 'Enfant (2-12 ans) sans lit' : 'Child (2-12 yrs) no extra bed'),
                    price: Math.round((trip.price * 0.7) / 1000) * 1000
                  },
                  {
                    label: language === 'ar' ? '🍼 رضيع (0-2 سنة) بدون مقعد' : (language === 'fr' ? 'Bébé (0-2 ans) sans siège' : 'Infant (0-2 yrs) no seat'),
                    price: 25000
                  }
                ];

            const hasAnyQuantity = Object.values(dynamicQuantities).some((q: any) => q > 0);
            const activeQuantities: Record<string, number> = { ...dynamicQuantities };
            if (!hasAnyQuantity) {
              activeQuantities[0] = 1;
            }

            let dynamicTotal = 0;
            customPrices.forEach((priceOption: any, optIdx: number) => {
              const qty = activeQuantities[optIdx] || 0;
              dynamicTotal += qty * priceOption.price;
            });

            const handleCustomBook = () => {
              let breakdownParts: string[] = [];
              customPrices.forEach((opt: any, optIdx: number) => {
                const qty = activeQuantities[optIdx] || 0;
                if (qty > 0) {
                  breakdownParts.push(`- ${opt.label} x${qty} (${(opt.price * qty).toLocaleString()} دج)`);
                }
              });

              const breakdownStr = breakdownParts.join("\n");

              const msg = language === 'ar'
                ? `مرحبا وكالة عبعوب للأسفار، أود الاستفسار والحجز في عرض صيف 2026 لرحلة: ${title}.\n\nالخيارات المحددة في الحاسبة:\n${breakdownStr}\n\nالتكلفة الإجمالية المقدرة: ${dynamicTotal.toLocaleString()} دج.`
                : `Bonjour Aboub Travel, je souhaite réserver pour le pack de: ${title}.\n\nOptions sélectionnées :\n${breakdownStr}\n\nCoût total estimé : ${dynamicTotal.toLocaleString()} DA.`;
              window.open(getWhatsAppLink(msg), '_blank', 'noopener,referrer');
            };

            return (
              <div className="bg-slate-900/40 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col text-right animate-fade-in" style={{ direction: dir }}>
                
                {/* Banner */}
                <div className="h-80 md:h-[28rem] w-full relative">
                  <img 
                    src={trip.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"} 
                    alt={title}
                    className="w-full h-full object-cover animate-fade-in"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"></div>
                  <div className={`absolute top-6 ${dir === 'rtl' ? 'right-6' : 'left-6'} flex flex-wrap gap-2`}>
                    {badge1 && (
                      <span className="bg-slate-950/80 backdrop-blur text-white font-black py-2 px-4 rounded-full text-xs border border-white/20 shadow-md">
                        {badge1}
                      </span>
                    )}
                    {badge2 && (
                      <span className="bg-emerald-600 text-white font-black py-2 px-4 rounded-full text-xs shadow-md">
                        {badge2}
                      </span>
                    )}
                  </div>
                  <div className={`absolute bottom-6 left-6 right-6 text-white space-y-2 keep-white ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-3xl md:text-4xl font-black text-white mt-1">{title}</h3>
                    <p className="text-sm text-slate-200 font-medium">{desc}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-10 space-y-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Program list */}
                    <div className="lg:col-span-7 space-y-6">
                      <h4 className="text-xl font-bold text-emerald-400 pb-2 border-b border-white/10 flex items-center gap-2">
                        <Compass className="w-5 h-5 text-emerald-400" />
                        <span>{language === 'ar' ? '🗺️ برنامج المعالم والخرجات السياحية بالكامل:' : '🗺️ Itinéraire Complet :'}</span>
                      </h4>
                      <div className="space-y-4">
                        {trip.program?.map((item: any, idx: number) => {
                          const stepTitle = language === 'ar' ? item.tAr || item.t : (language === 'fr' ? item.tFr || item.t : item.tEn || item.t);
                          const stepDesc = language === 'ar' ? item.dAr || item.d : (language === 'fr' ? item.dFr || item.d : item.dEn || item.d);
                          return (
                            <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start">
                              <span className="text-emerald-600 dark:text-emerald-400 text-lg">✦</span>
                              <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                                <b className="block text-emerald-800 dark:text-emerald-200 text-sm font-black mb-1">{stepTitle}</b>
                                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{stepDesc}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Side details */}
                    <div className="lg:col-span-5 space-y-6">
                      {/* Summary panel */}
                      <div className="p-6 bg-slate-950/40 rounded-[2.5rem] border border-white/10 text-right space-y-4">
                        <h4 className="text-base font-black text-white border-b border-white/5 pb-2">
                          {language === 'ar' ? '💰 معلومات الأسعار والإقامة' : '💰 Tarifs et Hébergement'}
                        </h4>
                        
                        <div className="space-y-3 font-semibold text-slate-300 text-xs">
                          {hotel && (
                            <div className="flex justify-between bg-white/5 p-3 rounded-xl">
                              <span>{language === 'ar' ? '🏨 الإقامة بالفندق / الشقة:' : 'Hébergement :'}</span>
                              <span className="text-white">{hotel}</span>
                            </div>
                          )}
                          {duration && (
                            <div className="flex justify-between bg-white/5 p-3 rounded-xl">
                              <span>{language === 'ar' ? '📅 مدة الإقامة بالكامل:' : 'Durée :'}</span>
                              <span className="text-emerald-400">{duration}</span>
                            </div>
                          )}
                          <div className="flex justify-between bg-white/5 p-3 rounded-xl">
                            <span>{language === 'ar' ? '💵 السعر المعتمد للفرد:' : 'Prix par personne :'}</span>
                            <span className="text-emerald-400 font-extrabold text-sm">{(trip.price || 0).toLocaleString()} {language === 'ar' ? 'دج' : 'DA'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive dynamic calculator */}
                      <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 space-y-4 font-sans text-right">
                        <b className="text-sm font-black text-emerald-400 block pb-2 border-b border-white/5">
                          {language === 'ar' ? '🧮 حاسبة أسعار الرحلة التفاعلية:' : '🧮 Calculateur de prix de séjour :'}
                        </b>
                        
                        <div className="space-y-3">
                          {customPrices.map((priceOption: any, optIdx: number) => {
                            const qty = activeQuantities[optIdx] || 0;
                            return (
                              <div key={optIdx} className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5 text-right">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-slate-300 font-bold">{priceOption.label}</span>
                                  <span className="text-emerald-400 font-extrabold">{priceOption.price.toLocaleString()} {language === 'ar' ? 'دج' : 'DA'}</span>
                                </div>
                                <div className="flex items-center gap-2 justify-end" style={{ direction: 'ltr' }}>
                                  <button 
                                    onClick={() => {
                                      const newQty = Math.max(0, qty - 1);
                                      setDynamicQuantities({ ...activeQuantities, [optIdx]: newQty });
                                    }} 
                                    className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold hover:bg-slate-900 transition select-none cursor-pointer flex items-center justify-center text-sm"
                                  >
                                    -
                                  </button>
                                  <input 
                                    type="number" 
                                    readOnly 
                                    value={qty} 
                                    className="w-12 bg-slate-950/70 text-white p-1 text-center font-bold text-xs rounded" 
                                  />
                                  <button 
                                    onClick={() => {
                                      const newQty = qty + 1;
                                      setDynamicQuantities({ ...activeQuantities, [optIdx]: newQty });
                                    }} 
                                    className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold hover:bg-slate-900 transition select-none cursor-pointer flex items-center justify-center text-sm"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Total */}
                        <div className="p-3 bg-slate-950/60 rounded-xl flex justify-between items-center border border-white/5 mt-3 text-right" style={{ direction: dir }}>
                          <span className="text-xs text-slate-400 font-bold">{language === 'ar' ? 'التكلفة الإجمالية للرحلة:' : 'Coût Total :'}</span>
                          <span className="text-lg font-black text-emerald-400 font-mono">
                            {dynamicTotal.toLocaleString()} {language === 'ar' ? 'دج' : 'DA'}
                          </span>
                        </div>
                      </div>

                      {/* Direct booking list */}
                      <div className="bg-slate-950/40 p-5 rounded-[2rem] border border-white/10 space-y-3 text-right">
                        <span className="block text-xs font-black text-emerald-400 pb-2 border-b border-white/5">{language === 'ar' ? '📝 شروط وتفاصيل الرحلة:' : 'Conditions:'}</span>
                        <p className="text-xs text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: regNotes || '' }}></p>
                      </div>
                    </div>

                  </div>

                  {/* Inclusion & rules */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {included && included.length > 0 && (
                      <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3">
                        <h5 className="font-extrabold text-white text-sm border-l-4 border-emerald-500 pl-2 pr-2">{language === 'ar' ? '📌 السعر المذكور يشمل:' : 'Inclus:'}</h5>
                        <ul className="text-xs text-slate-300 space-y-2">
                          {included.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-1.5">{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3">
                      <h5 className="font-extrabold text-white text-sm border-l-4 border-emerald-500 pl-2 pr-2">{language === 'ar' ? '☎️ الاتصال والتسجيل:' : 'Contact:'}</h5>
                      <div className="text-xs text-slate-300 space-y-2">
                        <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                          <span className="block font-bold text-emerald-300">{language === 'ar' ? 'أرقام المكتب الرسمية للاتصال:' : 'Contact bureau:'}</span>
                          <div className="flex flex-col gap-1.5 text-white text-sm mt-1">
                            <span className="bg-slate-950/30 px-3 py-1 rounded-lg border border-white/5">📞 0696789633</span>
                            <span className="bg-slate-950/30 px-3 py-1 rounded-lg border border-white/5">📞 0667910148</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Book now Button */}
                  <div className="pt-4">
                    <button 
                      onClick={handleCustomBook}
                      className="w-full text-lg font-black bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl text-center shadow-xl transition-all hover:scale-101 duration-300 cursor-pointer"
                    >
                      💬 {language === 'ar' ? `احجز رحلة ${title} الآن عبر الواتساب` : `Réserver ${title} via WhatsApp`}
                    </button>
                  </div>

                </div>
              </div>
            );
          })()
        )}
      </div>
    )}

  </div>
  );
}
