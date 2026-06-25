import React, { useState } from 'react';
import { istanbulPrices, getWhatsAppLink, getBackupWhatsAppLink } from '../data';
import { useLanguage } from '../LanguageContext';
// @ts-ignore
import tunisFlagCover from '../assets/images/tunis_flag_cover_1780996862093.png';
// @ts-ignore
import sovivaResortTunis from '../assets/images/soviva_resort_tunis_1780997094423.png';
// @ts-ignore
import sharmEgyptView from '../assets/images/sharm_egypt_view_1781944681512.jpg';

// Lucide Icons
import { 
  ArrowLeft, 
  ArrowRight,
  Plane, 
  MapPin, 
  Calendar, 
  Building, 
  Users, 
  Compass, 
  FileText, 
  Sparkles,
  Info,
  DollarSign,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';

export default function IntlView() {
  const { language, dir } = useLanguage();
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  
  const [tripsList, setTripsList] = useState<any[]>([]);

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

  // —— Calculators States ——
  // Istanbul
  const [calcIstanbulAdults, setCalcIstanbulAdults] = useState<number>(1);
  const [calcIstanbulKids, setCalcIstanbulKids] = useState<number>(0);
  const [calcIstanbulInfants, setCalcIstanbulInfants] = useState<number>(0);
  const [calcIstanbulSingles, setCalcIstanbulSingles] = useState<number>(0);

  // Tunisia Apartment
  const [tunisiaApartmentType, setTunisiaApartmentType] = useState<'double' | 'triple' | 'quad' | 'penta_hexa'>('quad');
  const [tunisiaAdultsCount, setTunisiaAdultsCount] = useState<number>(1);
  const [tunisiaKidsWithBed, setTunisiaKidsWithBed] = useState<number>(0);
  const [tunisiaKidsNoBedWithSeat, setTunisiaKidsNoBedWithSeat] = useState<number>(0);
  const [tunisiaInfantsCount, setTunisiaInfantsCount] = useState<number>(0);

  // Soviva Resort
  const [calcSovivaAdults, setCalcSovivaAdults] = useState<number>(1);
  const [calcSovivaKids, setCalcSovivaKids] = useState<number>(0);

  // Egypt
  const [calcEgyptAdultDoubleTriple, setCalcEgyptAdultDoubleTriple] = useState<number>(1);
  const [calcEgyptAdultSingle, setCalcEgyptAdultSingle] = useState<number>(0);
  const [calcEgyptKids, setCalcEgyptKids] = useState<number>(0);
  const [calcEgyptInfants, setCalcEgyptInfants] = useState<number>(0);
  const [egyptDepartureDate, setEgyptDepartureDate] = useState<string>('24/07/2026');

  // Dynamic Trips Calculator State
  const [dynamicQuantities, setDynamicQuantities] = useState<Record<string, number>>({});

  React.useEffect(() => {
    setDynamicQuantities({});
  }, [selectedTrip]);

  // —— Multi-lingual Dictionary ——
  const dict = {
    ar: {
      headerTitle: "✈️ أقوى الرحلات الدولية الفاخرة",
      headerDesc: "شركة عبعوب للسياحة والأسفار تقف بجانبكم لتقديم برامج ممتعة ومدروسة بأعلى معايير الرفاهية. نسهر مع شركائنا لضمان عطلة عائلية لا تُنسى في تركيا وتونس الخضراء ومصر.",
      backBtn: "↩️ العودة لجميع الرحلات الخارجية",
      tripDetailsTitle: "تفاصيل وحجز رحلة:",
      startsFrom: "للشخص يبدأ من",
      da: "دج",
      exploreBtn: "استكشف البرنامج والسعر ←",
      unitPerson: "للفرد",
      julyBeds: "باقات شهر جويلية",
      pricesIncludeTitle: "📌 السعر المذكور يشمل:",
      regDetailsTitle: "📅 تفاصيل التسجيل والانطلاق:",
      contactTitle: "📞 معلومات الحجز والتسجيل السريع:",
      numbersTitle: "☎️ أرقام المكتب الرسمية للاتصال:",
      apartmentChoiceLabel: "🏘️ اختر نوع الشقة المطلوبة:",
      adultsCountLabel: "👤 عدد الأشخاص البالغين:",
      kidsWithBedLabel: "🛏️ أطفال (3-10 سنوات) - مع حجز سرير:",
      kidsWithBedNotice: "يدفع نفس تكلفة الشخص البالغ لتأمين سرير إضافي.",
      kidsNoBedSeatLabel: "💺 أطفال (3-10 سنوات) - مقعد في الحافلة وبدون سرير:",
      kidsNoBedSeatNotice: "⚠️ السعر الخاص بمقعد الحافلة الدولية المؤمنة فقط دون توفير سرير إضافي.",
      infantLabel: "👶 رضع (أقل من سنتين):",
      free: "مجانًا",
      infantNotice: "دون حجز مقعد بالحافلة أو سرير إضافي.",
      egyDateLabel: "📅 اختر تاريخ الانطلاق المناسب لك لمشاهدة التوافر وطبيعة الفوج:",
      egyRatesTitle: "💰 قائمة الأسعار الرسمية للفرد",
      egyRatesSub: "رحلة 10 أيام / 9 ليالٍ",
      agencyNote: "🏢 شركة عبعوب للسياحة والأسفار تسهر على خدمتكم وراحتكم طوال أشهر صيف 2026.",
      estimatedTotal: "إجمالي التكلفة التقديرية للفوج:",
      calcTitle: "🧮 احسب سعر رحلتك بالتفصيل:",

      // Trips Static Data
      istanbul: {
        badge1: "🇹🇷 تركيا - عطلة الأحلام العائلية",
        badge2: "✈️ طيران تركي فاخر مُباشر",
        title: "برنامج إسطنبول المتكامل الفاخر",
        desc: "سحر الشرق يلاقي الطراز الأوروبي الحديث في إسطنبول. استمتع بجولات البوسفور المائية، جزر الأميرات المعلقة، والمعالم التاريخية الإسلامية البديعة عائلياً.",
        hotel: "My Assos Hotel Istanbul (★4)",
        duration: "8 أيام / 7 ليالٍ",
        progHeader: "🗺️ برنامج المعالم والخرجات السياحية بالكامل:",
        program: [
          { t: "زيارة معالم إسطنبول التاريخية:", d: "التعرف على أهم المعالم التاريخية كمسجد السلطان أحمد (الجامع الأزرق)، آيا صوفيا العظيم، والميدان التاريخي الرائع." },
          { t: "رحلة جزيرة الأميرات البديعة (هدية مجانية 🎁):", d: "جولة بحرية ساحرة واكتشاف جزيرة الأميرات الكبرى واستنشاق هوائها المنعش، مع توفير غداء مميز ولذيذ بالفوج." },
          { t: "سهرة البوسفور البحرية المميزة (هدية مجانية 🎁):", d: "سهرة عشاء فاخرة ومنوعة على متن باخرة في مضيق البوسفور المهيب مع فقرات وعروض فلكلورية وتراثية مذهلة." },
          { t: "تلفريك وتلة بيير لوتي ومدينة الألعاب (اختياري):", d: "الصعود بالتلفريك لمشاهدة القرن الذهبي من قمة تلة بيير لوتي الرائعة، مع خيار الدخول لمدينة الملاهي الكبرى." },
          { t: "التسوق الممتع في أشهر أسواق إسطنبول:", d: "زيارة المولات الفاخرة والأسواق التاريخية الأكثر شعبية (بازار جراند التاريخي، السوق المصري للتوابل، ومحلات الاستقراء)." }
        ],
        calcLabel1: "👤 بالغ في غرفة ثنائية / ثلاثية (129,000 دج):",
        calcLabel2: "🚶‍♂️ بالغ في غرفة فردية Single (169,000 دج):",
        calcLabel3: "🧒 طفل (من 2 إلى 11 سنة) (99,000 دج):",
        calcLabel4: "👶 رضيع (أقل من سنتين) (18,000 دج):",
        included: [
          "✔ السفر ذهاباً وإياباً عبر الخطوط الجوية التركية.",
          "✔ الإقامة المريحة لمدة 7 ليالي في فندق My Assos Hotel Istanbul (4 نجوم).",
          "✔ استقبال وتوصيل مريح ومؤمن من وإلى المطار.",
          "✔ دليل ومرافق سياحي كفء وناطق باللغة العربية.",
          "✔ برنامج للخرجات والجولات اليومية طيلة فترة الإقامة."
        ],
        regNotes: "🛫 <b>تاريخ الانطلاق المحدد:</b> 26 جوان. المقاعد المطلوبة محدودة للغاية للفوج لضمان الجودة العالية للمتابعة.<br/>🏢 <b>مقر التسجيل:</b> التسجيل يكون عبر الاتصال المباشر بدعم الوكالة وتنسيق الأوراق وجوازات السفر.",
        bookBtn: "💬 احجز رحلة إسطنبول الآن عبر الواتساب (26 جوان)"
      },

      tunisia: {
        badge1: "🇹🇳 تونس الخضراء الاستجمامية",
        badge2: "🚌 نقل سياحي داخلي ومريح",
        title: "رحلة تونس الساحرة (سوسة والحمامات)",
        desc: "استمتع بشواطئ سوسة الخلابة والقرطاجية الأثرية ونادي الحمامات الصيفي الترفيهي الممتع بسكن عائلي راقٍ وقريب جداً من المعالم والخدمات.",
        hotel: "شقق عائلية عصرية مجهزة",
        duration: "7 أيام / 6 ليالٍ",
        progHeader: "🗺️ برنامج الخرجات والنشاطات خلال الرحلة بالكامل:",
        program: [
          { t: "زيارة معالم سوسة واستكشاف المدينة:", d: "التعرف على أهم المعالم السياحية بمدينة سوسة (وسط المدينة، المدينة العتيقة الأثرية، وكورنيش بوجعفر الرائع)." },
          { t: "ميناء وسهرات منتزه القنطاوي (هدية مجانية 🎁):", d: "زيارة ميناء القنطاوي البحري 🛥️ والتمتع بالسهرات الليلية الشاعرية والاسترخاء في منتزه القنطاوي بارك لغرس البهجة 🎡🎠." },
          { t: "مغامرة باخرة القراصنة (اختياري):", d: "رحلة بحرية ممتعة للغاية في عرض البحر على متن باخرة القراصنة مع فقرات ترفيهية ووجبة غداء ممتازة." },
          { t: "زيارة المنستير العريقة (هدية مجانية 🎁):", d: "جولة متميزة لرؤية مدينة المنستير التاريخية والتعرف على معالمها الأثرية الفريدة ومينائها القديم." },
          { t: "زيارة تونس العاصمة العتيقة (اختياري):", d: "رحلة استكشاف لقلب العاصمة تونس للتجول في أسواقها العريقة، واقتناء المنتجات اليدوية التونسية." },
          { t: "زيارة مدينة الحمامات الساحلية (هدية مجانية 🎁):", d: "جولة ممتعة لاكتشاف خليج مدينة الحمامات الساحرة، شطوطها وأسوارها الأثرية المطلة مباشرة على البحر." },
          { t: "قرطاج لاند الترفيهية (اختياري):", d: "الدخول وقضاء أمتع الأوقات الحماسية في مدينة الألعاب المائية والترفيهية العائلية قرطاج لاند بالحمامات 🎡." },
          { t: "مدينة القيروان العريقة والحلويات:", d: "زيارة مدينة القيروان التاريخية العظيمة وشراء المقروض التونسي والحلويات التقليدية من أشهر المحلات." }
        ],
        calcHeader: "🏘️ أسعار الفرد في الشقة المجهزة",
        prices: [
          "👤 شقة خماسية أو سداسية (لكل فرد): 24,000 DA",
          "👤 شقة رباعية (لكل فرد في الشقة): 28,000 DA",
          "👤 شقة ثلاثية (لكل فرد في الشقة): 30,000 DA",
          "👤 شقة ثنائية (شخصين فقط بالشقة): 33,500 DA"
        ],
        included: [
          "✔ النقل ذهاباً وإياباً في حافلات سياحية متكاملة التكييف.",
          "✔ التنقل المريح والمرن بين مختلف الولايات التونسية.",
          "✔ السكن في شقق عائلية مجهزة، مكيفة وقريبة من المرافق والشط.",
          "✔ الجولات السياحية والترفيهية المميزة طيلة مدة الرحلة.",
          "✔ مرشد ومرافق سياحي حريص ومتواجد طيلة السفر.",
          "✔ تأمين صحي شامل ومؤمن طيلة السفرية."
        ],
        regNotes: "🏢 <b>لأصحاب ولاية تقرت والحمّام:</b> التسجيل يكون عبر القدوم المباشر لمقر الوكالة بتبسبست (تقرت).<br/>📲 <b>لأصحاب الولايات الأخرى:</b> التسجيل سهل وسريع عن طريق إرسال الأوراق فوراً عبر تطبيق الواتساب.<br/>🚌 <b>نقطة الانطلاق:</b> الانطلاق يكون من مقر وكالة عبعوب خلف بلدية تبسبست بـ (تقرت)، مروراً بوادي سوف المشرق باتجاه تونس 🇹🇳.<br/>📄 <b>الوثائق المطلوبة للتسجيل:</b> نسخة طبق الأصل واضحة من جواز السفر الساري المفعول.",
        bookBtn: "💬 احجز عطلة تونس الخضراء الآن عبر الواتساب (ابتداء من جويلية)"
      },

      soviva: {
        badge1: "🇹🇳 العرض الفاخر ذو النصف إقامة",
        badge2: "🌊 منتجع مائي 4 نجوم فخم",
        title: "رحلة منتجع Soviva Resort بسوسة",
        desc: "بفخر نضع عائلتكم في أفخم منتصف إقامة (بوفيه فطور وعشاء مفتوح يومياً) مع ولوج مجاني ترفيهي لأكبر برك مائية مزودة بزحليقات وألعاب عملاقة بسوسة.",
        hotel: "Soviva Resort (★4)",
        duration: "7 أيام / 6 ليالٍ",
        progHeader: "🌴 ما يميز الرحلة والمنتجع بالتفصيل:",
        program: [
          { t: "الفندق والراحة الفوق ممتازة:", d: "Soviva Resort – سوسة / القنطاوي، فندق عائلي مميز ببرك سباحة عملاقة وأنشطة ترفيهية للأطفال والشباب." },
          { t: "الإقامة الراقية ونظام الوجبات بوفيه مفتوح:", d: "نصف إقامة شاملة (فطور صباح لذيذ ومليء بالخيارات المتنوعة + وجبة عشاء فاخرة يومياً)." },
          { t: "النقل والخصوصية الفائقة للعائلات:", d: "التنقل بسيارة خاصة مريحة ومكيفة طوال الرحلة لضمان الخصوصية والراحة القصوى لعائلتكم." },
          { t: "الموقع الاستراتيجي في قلب الحركة:", d: "قريب جداً من شاطئ البحر، وقريب من مدينة الألعاب الكبرى، متواجد في أنشط منطقة سياحية تتوفر على كل مستلزمات العائلات والشباب." }
        ],
        calcHeader: "💰 تسعيرة العرض المحدود",
        prices: [
          "👤 سعر الشخص البالغ (فرد واحد للفوج): 45,000 DA",
          "👼 طفل (3 إلى 10 سنوات): 30,000 DA",
          "👶 طفل (أقل من 3 سنوات بدون سرير): مجانًا"
        ],
        calcLabel1: "👤 عد الأشخاص البالغين (45,000 دج):",
        calcLabel2: "🧒 عدد الأطفال (3-10 سنوات) (30,000 دج):",
        included: [
          "✔ الإقامة الفندقية الراقية لمدة 6 ليالي / 7 أيام في فندق Soviva Resort.",
          "✔ نظام الوجبات المتنوعة (فطور صباح لذيذ وعشاء يومي).",
          "✔ التنقل بسيارة خاصة مريحة ومكيفة طوال مدة السفر بين المعالم.",
          "✔ الاستمتاع ببرك السباحة العملاقة والألعاب المائية (Mini Aqua Park)."
        ],
        regNotes: "⚠️ <b>عرض حصري ومحدود للغاية:</b> الحجز يكون مسبقاً طيلة فترة الصيف لشهر جويلية لتأكيد توافر الغرف.<br/>📲 <b>الحجز السريع:</b> يمكنك زيارتنا مباشرة في الوكالة خلف بلدية تبسبست أو التسجيل معكم عبر الواتساب مباشرة.",
        bookBtn: "💬 احجز عرض تونس Soviva Resort الآن عبر الواتساب (ابتداء من جويلية)"
      },

      egypt: {
        badge1: "🇪🇬 عطلة شرم الشيخ الأسطورية",
        badge2: "🌴 صيف 2026 – نظام الإقامة الكاملة 🍽️",
        title: "رحلة الأحلام إلى شرم الشيخ – مصر 🇪🇬",
        desc: "انضموا إلينا في رحلة الأحلام لأجمل شواطئ البحر الأحمر مع إقامة مريحة في فندق ذو 4 نجوم مع كامل الوجبات والمشروبات (All Inclusive) وخرجات وجولات ترفيهية ممتازة.",
        hotel: "Parrotel Aqua Park Resort (★4)",
        duration: "10 أيام / 9 ليالٍ",
        progHeader: "📍 برنامج الزيارة والخرجات السياحية المشمولة:",
        program: [
          { t: "زيارة SOHO Square العالمية الشهيرة:", d: "أرقى ساحات شرم الشيخ الترفيهية، المشهورة بالنافورة الراقصة الملونة، الأجواء المبهجة، والمحلات العالمية الفاخرة." },
          { t: "نعمة باي Naama Bay النابض بالحيوية:", d: "قلب شرم الشيخ النابض بالمقاهي والمطاعم، والممشى والأسواق المتنوعة المطلة على ساحل البحر الخلاب." },
          { t: "السوق القديم Old Market الأثري:", d: "رائحة التاريخ المصري والشرقي الأصيل، حيث تجدون أفضل التوابل، التحف التقليدية، والهدايا التذكارية القيمة وجامع الصحابة الباهر." },
          { t: "مسجد الصحابة Mosquée Sahaba البديع:", d: "تحفة معمارية إسلامية تاريخية تم دمج فيها الفنون العثمانية والفاطمية، لتصبح مكاناً مذهلاً لالتقاط أجمل الصور التذكارية." },
          { t: "أوقات حرة ومشاركة رحلات اختيارية:", d: "أوقات حرة مخصصة للاستمتاع بشواطئ البحر الأحمر الدافئة والسباحة ببرك الفندق المائية العائلية، أو المشاركة في رحلات السفاري الصحراوية، الغوص لمشاهدة المرجان، واليخوت البحرية الفاخرة!" }
        ],
        calcLabel1: "👤 بالغ في غرفة ثنائية / ثلاثية (199,000 دج):",
        calcLabel2: "🚶‍♂️ بالغ في غرفة فردية Single (269,000 دج):",
        calcLabel3: "🧒 طفل (من 2 إلى 11 سنة) (145,000 دج):",
        calcLabel4: "👶 رضيع (أقل من سنتين) (34,000 دج):",
        pricesIncludeTitle: "📌 السعر يشمل كل من:",
        included: [
          "✔ الإقامة الفندقية لمدة 10 أيام / 9 ليالٍ في فندق Parrotel Aqua Park Resort 4★.",
          "✔ نظام الإقامة الشاملة All Inclusive (بوفيه فطور وغداء وعشاء ومشروبات).",
          "✔ تذاكر الطائرة ذهاباً وإياباً عبر شركة الطيران المتميزة Ajet Airlines.",
          "✔ استقبال وجميع الاستقبال والتحويلات الداخلية (المطار – الفندق – المطار).",
          "✔ مرافقة مستمرة ودعم من دليل محترف ناطق باللغة العربية طيلة الرحلة.",
          "✔ جولات الزيارة والخرجات السياحية المشمولة."
        ],
        regNotes: "🏢 <b>موقع وتفاصيل التواصل والاتصال بوكالتنا:</b> للتسجيل، يرجى تقديم نسَخ واضحة من جوازات السفر الخاصة بالفوج.",
        bookBtn: "💬 احجز عرض صيف 2026 لشرم الشيخ الآن عبر الواتساب"
      }
    },

    fr: {
      headerTitle: "✈️ Meilleurs Voyages Internationaux d'Élite",
      headerDesc: "Aboub Travel se tient à vos côtés pour proposer des séjours confortables, sécurisés et inoubliables en Turquie, en Égypte et en Tunisie de rêve avec de superbes programmes guidés.",
      backBtn: "↩️ Retour à toutes les offres",
      tripDetailsTitle: "Détails et réservation :",
      startsFrom: "À partir de",
      da: "DA",
      exploreBtn: "Explorer l'offre ←",
      unitPerson: "par pers.",
      julyBeds: "Séjours de Juillet",
      pricesIncludeTitle: "📌 Le tarif comprend :",
      regDetailsTitle: "📅 Détails d'inscription & Départ :",
      contactTitle: "📞 Informations de Réservation Rapide :",
      numbersTitle: "☎️ Lignes téléphoniques officielles d'appel :",
      apartmentChoiceLabel: "������️ Choisissez le type d'appartement requis :",
      adultsCountLabel: "👤 Nombre de personnes adultes :",
      kidsWithBedLabel: "🛏️ Enfant (3-10 ans) - avec lit individuel :",
      kidsWithBedNotice: "Tarif identique à l'adulte pour garantir un lit supplémentaire dans l'appartement.",
      kidsNoBedSeatLabel: "💺 Enfant (3-10 ans) - lit partagé avec siège de bus :",
      kidsNoBedSeatNotice: "⚠️ Tarif incluant uniquement le transport aller-retour en bus touristique climatisé.",
      infantLabel: "👶 Bébé (Moins de 2 ans) :",
      free: "Gratuit",
      infantNotice: "Partage de lit avec les parents, sans siège de bus réservé.",
      egyDateLabel: "📅 Sélectionnez votre date d'envol préférée pour voir la disponibilité :",
      egyRatesTitle: "💰 Grille tarifaire officielle par personne",
      egyRatesSub: "Séjour complet 10 Jours / 9 Nuits",
      agencyNote: "🏢 Aboub Travel s'engage à assurer votre sécurité et votre détente tout au long de votre voyage.",
      estimatedTotal: "Montant total estimé du groupe :",
      calcTitle: "🧮 Calculez le prix estimé de votre séjour :",

      // Trips Static Data
      istanbul: {
        badge1: "🇹🇷 Turquie - Vacances de Rêve",
        badge2: "✈️ Vol Direct Premium",
        title: "Circuit d'Istanbul Complet de Luxe",
        desc: "Découvrez Istanbul : balades sur le majestic Bosphore, visites des splendides Îles des Princes et exploration historique de l'ancienne Constantinople en classe VIP.",
        hotel: "My Assos Hotel Istanbul (★4)",
        duration: "8 Jours / 7 Nuits",
        progHeader: "🗺️ Détails de l'itinéraire et visites guidées :",
        program: [
          { t: "Visite guidée de la ville d'Istanbul :", d: "Découverte des monuments majeurs comme la magnifique Mosquée Bleue, Sainte-Sophie, et les places chargées d'histoire." },
          { t: "Excursion à l'Île des Princes (Offert 🎁) :", d: "Croisière maritime sur la mer de Marmara, exploration de l'île en forêt avec un délicieux repas d'une cuisine traditionnelle." },
          { t: "Soirée Dîner Croisière sur le Bosphore (Offert 🎁) :", d: "Superbe dîner de gala sur le somptueux Bosphore avec spectacles traditionnels derviches tourneurs et folklore." },
          { t: "Téléphérique de Pierre Loti & Parcs (Optionnel) :", d: "Survolez la Corne d'Or en téléphérique et admirez un coucher de soleil sur l'inoubliable terrasse de Pierre Loti." },
          { t: "Shopping de luxe dans les grands Bazars :", d: "Visites phares au vibrant Grand Bazar, Marché aux Épices égyptien, et grands centres commerciaux modernes." }
        ],
        calcLabel1: "👤 Adulte (Chambre double/triple) (129,000 DA):",
        calcLabel2: "🚶‍♂️ Adulte (Chambre Single individuelle) (169,000 DA):",
        calcLabel3: "🧒 Enfant (De 2 à 11 ans) (99,000 DA):",
        calcLabel4: "👶 Bébé (Moins de 2 ans) (18,000 DA):",
        included: [
          "✔ Billet d'avion Aller-Retour opéré par la compagnie nationale turque.",
          "✔ Séjour de 7 nuits à l'hôtel My Assos Hotel Istanbul 4★ avec petits-déjeuners.",
          "✔ Navettes d'accueil et transferts aéroport sécurisés.",
          "✔ Accompagnement permanent par un guide francophone.",
          "✔ Toutes les excursions et circuits guidés prévus dans l'agenda."
        ],
        regNotes: "🛫 <b>Date de départ fixe :</b> 26 Juin. Seuls les dossiers complets seront acceptés à hauteur des places disponibles.<br/>🏢 <b>Réservation :</b> Veuillez fournir votre passeport à l'adresse de nos locaux.",
        bookBtn: "💬 Réserver le séjour d'Istanbul sur WhatsApp (départ 26 Juin)"
      },

      tunisia: {
        badge1: "🇹🇳 Tunisie - Détente Estivale",
        badge2: "🚌 Navette Touristique Climatisée",
        title: "Séjour de Rêve à Sousse & Hammamet",
        desc: "Profitez des plages dorées de Sousse, de la cité historique de Hammamet, avec un hébergement sécurisé de haute qualité à deux pas des rivages.",
        hotel: "Résidences familiales équipées à Sousse",
        duration: "7 Jours / 6 Nuits",
        progHeader: "🗺️ Détails de vos excursions touristiques en Tunisie :",
        program: [
          { t: "Visite côtière de la ville de Sousse :", d: "Exploration des ruelles historiques de la Médina, marchés artisanaux et bord de mer de Boujaafar." },
          { t: "Soirée festive à Port El Kantaoui (Offert 🎁) :", d: "Balade inoubliable sur les marinas accueillantes et accès au parc Kantaoui pour s'amuser en famille." },
          { t: "Bateau Pirate magique sur la Méditerranée (Optionnel) :", d: "Embarquez sur un vrai navire pirate avec spectacles, baignade sécurisée et repas fritures à bord." },
          { t: "Découverte historique de Monastir (Offert 🎁) :", d: "Visite guidée pour immortaliser le Ribat de Monastir et ses magnifiques remparts côtiers." },
          { t: "Excursion libre à Tunis la Capitale (Optionnel) :", d: "Parcourez les souks de la capitale et faites de merveilleuses emplettes cadeaux." },
          { t: "Visite balnéaire de Hammamet (Offert 🎁) :", d: "Visite du Fort de Hammamet surplombant les vagues turquoises de la côte." },
          { t: "Journée de loisirs à Carthage Land (Optionnel) :", d: "Profitez d'un accès privilégié à Carthage Land, l'un des meilleurs parcs aquatiques pour enfants 🎡." },
          { t: "Escale à Kairouan la Spirituelle :", d: "Dernière étape pour visiter son patrimoine mondial de l'UNESCO et goûter ses fameuses pâtisseries Makroudh." }
        ],
        calcHeader: "🏘️ Tarifs par personne en appartement équipé",
        prices: [
          "Appartement pour 5-6 personnes (chacun) : 24,000 DA",
          "Appartement pour 4 personnes (chacun) : 28,000 DA",
          "Appartement pour 3 personnes (chacun) : 30,000 DA",
          "Appartement pour 2 personnes (chacun) : 33,500 DA"
        ],
        included: [
          "✔ Transport routier aller-retour dans nos bus sécurisés de haut standing.",
          "✔ Transferts et circuits guidés réguliers durant le séjour.",
          "✔ Location d'appartements spacieux équipés à proximité de la plage.",
          "✔ Toutes les excursions guidées offertes de notre agence.",
          "✔ Représentant francophone tout au long du voyage.",
          "✔ Assurance maladie internationale."
        ],
        regNotes: "🏢 <b>Dossier d'inscription :</b> Visitez-nous directement à Tebesbest (Touggourt) pour le dépôt de dossier.<br/>📲 <b>Distances :</b> Transmettez vos passeports via WhatsApp pour confirmer sans vous déplacer.<br/>🚌 <b>Départ :</b> Départ programmé de Touggourt en traversant El Oued vers la Tunisie.",
        bookBtn: "💬 Réserver le séjour Tunisie sur WhatsApp (départs en Juillet)"
      },

      soviva: {
        badge1: "🇹🇳 Formule Demi-Pension Spéciale",
        badge2: "🏨 Grand Aquapark & Hôtel 4★",
        title: "Séjour de Rêve au Soviva Resort Sousse",
        desc: "Séjournez en demi-pension buffets (petits déjeuners et dîners quotidiens inclus) avec accès illimité aux piscines géantes et méga-toboggans.",
        hotel: "Hôtel Soviva Resort Sousse (★4)",
        duration: "7 Jours / 6 Nuits",
        progHeader: "🌴 Points forts de l'établissement :",
        program: [
          { t: "Amusement & Aquapark moderne :", d: "Le Soviva Resort est renommé pour ses structures de divertissement aquatiques uniques en Tunisie." },
          { t: "Restauration en formule Demi-Pension :", d: "Délicieux buffets du matin et buffets thématiques du soir servis tous les jours." },
          { t: "Transport en véhicule privatisé :", d: "Profitez d'un trajet climatisé privatisé garantissant flexibilité et sécurité pour votre famille." },
          { t: "Quartier animé et proximité de la Marina :", d: "Situé à El Kantaoui Sousse, à proximité de fantastiques attractions touristiques et de commerces de souvenirs." }
        ],
        calcHeader: "💰 Grille tarifaire de l'offre",
        prices: [
          "👤 Tarif adulte en chambre : 45,000 DA",
          "👼 Enfant de 3 à 10 ans : 30,000 DA",
          "👶 Bébé sous 3 ans : Gratuit"
        ],
        calcLabel1: "👤 Nombre d'adultes (45,000 DA) :",
        calcLabel2: "🧒 Enfants (3 à 10 ans) (30,000 DA) :",
        included: [
          "✔ 6 nuits d'hébergement premium à l'hôtel Soviva Resort Sousse 4★.",
          "✔ Formule Demi-pension complète (Buffets petit-déjeuner et soir).",
          "✔ Service de chauffeur et voiture privatisée pour vos transferts.",
          "✔ Accès inclus pour s'amuser dans les immenses piscines et toboggans."
        ],
        regNotes: "⚠️ <b>Réservations hautement prioritaires :</b> Les réservations d'été en Juillet se terminent vite, veuillez confirmer au standard.<br/>📲 <b>Contact rapide :</b> Inscription immédiate via WhatsApp d'Aboub Travel.",
        bookBtn: "💬 Réserver Soviva Resort Sousse sur WhatsApp (Séjour d'été)"
      },

      egypt: {
        badge1: "🇪🇬 Voyage de Rêve à Charm El-Cheikh",
        badge2: "🏨 Parrotel Aqua Park Resort 4★",
        title: "Séjour de Rêve à Charm El-Cheikh – Égypte 🇪🇬",
        desc: "Aboub Travel vous invite à passer des vacances de luxe sur les magnifiques plages de la Mer Rouge dans un hôtel 4 étoiles d'exception (formule All Inclusive) avec vols et excursions compris.",
        hotel: "Parrotel Aqua Park Resort 4★",
        duration: "10 Jours / 9 Nuits",
        progHeader: "📍 Itinéraire des visites phares comprises :",
        program: [
          { t: "Découverte guidée de SOHO Square :", d: "La place moderne avec ses célèbres fontaines dansantes lumineuses et son ambiance animée." },
          { t: "Balade inoubliable à Naama Bay :", d: "Le cœur de la vie touristique avec ses cafés, restaurants face à la superbe mer Rouge." },
          { t: "Visite du Vieux Marché (Old Market) :", d: "Immersion dans l'histoire orientale avec son bazar d'épices, d'artisanat et l'incroyable mosquée Al-Sahaba." },
          { t: "La splendide Mosquée Al-Sahaba :", d: "Une merveille artistique mêlant de multiples styles de l'histoire islamique." },
          { t: "Détente & Loisirs côtiers :", d: "Quartier libre sur les transats ou possibilité de réserver d'incroyables plongées sous-marines parmi les coraux." }
        ],
        calcLabel1: "👤 Adulte (Chambre double / triple) (199,000 DA):",
        calcLabel2: "🚶‍♂️ Adulte (Chambre individuelle Single) (269,000 DA):",
        calcLabel3: "🧒 Enfant (De 2 à 11 ans) (145,000 DA):",
        calcLabel4: "👶 Bébé (Moins de 2 ans) (34,000 DA):",
        included: [
          "✔ Hébergement supérieur de 9 nuits à Parrotel Aqua Park Resort 4★.",
          "✔ Formule Tout Inclus All Inclusive (Buffets complets et boissons incluses).",
          "✔ Billets d'avion aller-retour réguliers via Ajet Airlines.",
          "✔ Transferts collectifs climatisés Aéroport – Hôtel – Aéroport.",
          "✔ Représentant d'agence francophone durant vos vacances.",
          "✔ Toutes les visites prévues au programme d'excursions."
        ],
        regNotes: "🏢 <b>Dossier d'inscription :</b> Veuillez nous soumettre vos passeports en haute résolution afin de valider vos places.",
        bookBtn: "💬 Réserver le voyage Charm El-Cheikh sur WhatsApp"
      }
    },

    en: {
      headerTitle: "✈️ Premier International Luxury Tours",
      headerDesc: "Aboub Travel stands by your side to provide highly refined, delightful, and relaxing family packages in Turkey, Egypt, and Tunisia with excellent pre-arranged flights and guidance.",
      backBtn: "↩️ Return to packages",
      tripDetailsTitle: "Trip details and booking:",
      startsFrom: "Starts from",
      da: "DA",
      exploreBtn: "Explore Offer ←",
      unitPerson: "per person",
      julyBeds: "July Tour offers",
      pricesIncludeTitle: "📌 Price includes:",
      regDetailsTitle: "📅 Booking & Registration details:",
      contactTitle: "📞 Safe Registration & Fast Booking:",
      numbersTitle: "☎️ Official Direct Calling numbers:",
      apartmentChoiceLabel: "🏘️ Choose required apartment sharing:",
      adultsCountLabel: "👤 Number of adult guests:",
      kidsWithBedLabel: "🛏️ Kids (3-10 years) - with extra bed added:",
      kidsWithBedNotice: "Identical to adult rate to allocate an individual bed within the stay.",
      kidsNoBedSeatLabel: "💺 Kids (3-10 years) - bus seat only, no extra bed:",
      kidsNoBedSeatNotice: "⚠️ Special budget rate for securing standard bus seat with insurance.",
      infantLabel: "👶 Infant (Under 2 years old):",
      free: "Free",
      infantNotice: "Free of charge, sharing bed and bus seat with parents.",
      egyDateLabel: "📅 Choose flight date to review available slots:",
      egyRatesTitle: "💰 Official Per-Person Pricing",
      egyRatesSub: "Full 10-Day / 9-Night Stay",
      agencyNote: "🏢 Aboub Travel remains dedicated to your comfort and leisure across summer 2026.",
      estimatedTotal: "Estimated total cost for your group:",
      calcTitle: "🧮 Compute your trip cost details:",

      // Trips Static Data
      istanbul: {
        badge1: "🇹🇷 Turkey - Family Dream Holiday",
        badge2: "✈️ Premium Direct Turkish Flight",
        title: "Luxury Istanbul Guided Program",
        desc: "Explore gorgeous Istanbul: amazing Bosphorus boat cruises, Princes' Islands historic visits, and splendid Islamic landmarks with family.",
        hotel: "My Assos Hotel Istanbul (★4)",
        duration: "8 Days / 7 Nights",
        progHeader: "🗺️ Full Tour Itinerary & City Excursions included:",
        program: [
          { t: "Guided historical city walk:", d: "Visit ancient marvels including the Blue Mosque, Hagia Sophia museum, and historic Sultanahmet squares." },
          { t: "Princes' Island Ferry Escape (Free Gift 🎁):", d: "Beautiful Bosphorus boat ride to the grand island, with a pleasant group lunch included." },
          { t: "Premium Bosphorus Dinner Cruise (Free Gift 🎁):", d: "Open buffet dinner on the luxurious boat cruise along the Bosphorus, accompanied by folklore dances and live shows." },
          { t: "Pierre Loti Teleferik & Theme Park (Optional):", d: "Cable-car experience to the summit of Pierre Loti hill for panoramic views, with optional access to the theme parks." },
          { t: "Delightful shopping in top bazars:", d: "Visit famous premium malls and historical markets (The Grand Bazar, Spice Bazar, and modern avenues)." }
        ],
        calcLabel1: "👤 Adult (Double / Triple room) (129,000 DA):",
        calcLabel2: "🚶‍♂️ Adult (Single Private room) (169,000 DA):",
        calcLabel3: "🧒 Kid (2 to 11 years) (99,000 DA):",
        calcLabel4: "👶 Infant (Under 2 years) (18,000 DA):",
        included: [
          "✔ Round trip direct flight tickets on Turkish Airlines.",
          "✔ 7 comfortable nights at 4-star My Assos Hotel Istanbul.",
          "✔ Reliable airport transfer shuttles.",
          "✔ Experienced English & Arabic speaking tour guide.",
          "✔ All listed city tours and entrance fees in the agenda."
        ],
        regNotes: "🛫 <b>Departure Date:</b> June 26. Seats are strictly limited to secure quality in group monitoring.<br/>🏢 <b>How to Register:</b> Reach out to Aboub Travel coordinators to submit passports.",
        bookBtn: "💬 Book Istanbul Package Now on WhatsApp (June 26)"
      },

      tunisia: {
        badge1: "🇹🇳 Tunisia - Green Summer Escape",
        badge2: "🚌 Comfortable Air-con Bus",
        title: "Sousse & Hammamet Guided Summer Tour",
        desc: "Delight in guided vacations staying in cozy family apartments right by the warm golden sand beaches.",
        hotel: "Furniture apartments in Sousse",
        duration: "7 Days / 6 Nights",
        progHeader: "🗺️ All Scheduled Sightseeing Tours & Activities:",
        program: [
          { t: "Explore the coastal beauty of Sousse:", d: "See top historical sites in Sousse, the charming Old Medina, and the scenic Boujaafar coastlines." },
          { t: "Port El Kantaoui harbor & park (Free Gift 🎁):", d: "Evening strolls along the luxury yacht harbor 🛥️ and free time at Kantaoui amusement parks 🎡🎠." },
          { t: "Galion Pirate Boat cruise adventure (Optional):", d: "Fun-filled ocean cruise on a wooden pirate ship with live music, dancing, and fish lunch on board." },
          { t: "Monastir city & historic Ribat (Free Gift 🎁):", d: "Guided group tour to the monumental seaside fortress of Monastir and its cozy old harbor." },
          { t: "Discover historical Tunis capital (Optional):", d: "Vibrant shopping walk down Tunis historic alleys and traditional souvenir shopping." },
          { t: "The gulf of scenic Hammamet (Free Gift 🎁):", d: "A lovely afternoon tour visiting historical castle towers and pristine white sand beaches." },
          { t: "Carthage Land Theme Park (Optional):", d: "All-day fun and adrenaline in the huge Carthage Land water and amusement park in Hammamet 🎡." },
          { t: "Ancient city of Kairouan cookies stop:", d: "Stop to explore the magnificent historic mosques and buy authentic traditional Tunisian Makroudh cookies." }
        ],
        calcHeader: "🏘️ Per person rate in furnished apartments",
        prices: [
          "5 or 6 persons apartment sharing: 24,000 DA",
          "4 persons apartment sharing: 28,000 DA",
          "3 persons apartment sharing: 30,000 DA",
          "2 persons apartment sharing: 33,500 DA"
        ],
        included: [
          "✔ Round trip travel in premium air-conditioned tourist buses.",
          "✔ All transit shuttles for city-tours and excursions inside Tunisia.",
          "✔ Warm stay in furnished, air-conditioned family apartments near beaches.",
          "✔ Free entry tickets and excursions mentioned in the program.",
          "✔ Professional accompanying manager available 24/7.",
          "✔ Full transit travel health insurance."
        ],
        regNotes: "🏢 <b>For Touggourt & regional areas:</b> Walk-in registry at Tebesbest (Touggourt) headquarters.<br/>📲 <b>For other cities:</b> Simple online registration via WhatsApp.<br/>🚌 <b>Departure Point:</b> Aboub Travel Tebesbest offices, traveling via El Oued direct to Tunisia 🇹🇳.",
        bookBtn: "💬 Confirm Tunisia Booking via WhatsApp (Departures in July)"
      },

      soviva: {
        badge1: "🇹🇳 Half-Board Buffet Stay",
        badge2: "🏨 Soviva Resort Aqua Park 4★",
        title: "Hotel Soviva Resort | Exclusive Summer Package",
        desc: "Relish delicious open buffets (Breakfast & Dinner daily) paired with free non-stop entries to Sousse's premier giant pools and slides.",
        hotel: "Hôtel Soviva Sousse 4★",
        duration: "7 Days / 6 Nights",
        progHeader: "🌴 Resort Key Features:",
        program: [
          { t: "Hotel & Comfort:", d: "Stay at Soviva Resort Sousse, enjoying huge swimming pools, slides, and fun entertainment for families." },
          { t: "Dine like royalty:", d: "Superior Half-Board formula (grand breakfast buffet and delicious open dinners daily)." },
          { t: "Private Premium transport:", d: "Private, air-conditioned comfortable family car provided for all your transfers and tours." },
          { t: "Central luxury location:", d: "Directly near sandy beaches, grand aquaparks, and Sousse's lively tourism squares." }
        ],
        calcHeader: "💰 Limited time special rates",
        prices: [
          "👤 Adult rate per person: 45,000 DA",
          "👼 Child (3 to 10 years old): 30,000 DA",
          "👶 Infant (Under 3 years old): Free"
        ],
        calcLabel1: "👤 Adult guests (45,000 DA):",
        calcLabel2: "🧒 Child guests (3-10 years) (30,000 DA):",
        included: [
          "✔ 6 nights / 7 days premier lodging at Soviva Resort.",
          "✔ Dynamic Half-Board meal plans (Breakfast & Dinner open buffets).",
          "✔ Comfortable private private vehicle with private driver.",
          "✔ Unlimited free access to resort giant slides and waterparks."
        ],
        regNotes: "⚠️ <b>High demand stay:</b> Book in advance to guarantee hotel rooms availability throughout July.<br/>📲 <b>Fast Booking:</b> Visit Tebesbest HQ or secure places via telephone or WhatsApp chat.",
        bookBtn: "💬 Secure Soviva Resort Offer on WhatsApp (Summer Stay)"
      },

      egypt: {
        badge1: "🇪🇬 Egypt Summer 2026 Specials",
        badge2: "🏨 Parrotel Aqua Park Resort 4★",
        title: "Ultimate Sharm El-Sheikh Tour – Egypt 🇪🇬",
        desc: "Make memories along the beautiful Red Sea stays, premium 4-star beach resort, All-inclusive meal plans and splendid excursions.",
        hotel: "Parrotel Aqua Park Resort 4★",
        duration: "10 Days / 9 Nights",
        progHeader: "📍 Included Sightseeing Tours Agenda:",
        program: [
          { t: "Walk spectacular SOHO Square:", d: "Sharm's absolute best square, famous for musical dancing fountains, shopping, and international bistros." },
          { t: "Stroll vibrant Naama Bay:", d: "Lively coastal boulevard filled with outstanding cafes, restaurants, and shopping alleys." },
          { t: "The historic Old Market walk:", d: "Traditional Egyptian culture, perfect for buying local tea, premium spices, crafts, and viewing the Sahaba Mosque." },
          { t: "Stunning Al-Sahaba Mosque visit:", d: "Magnificent architectural wonder in old town, combining Fatimid and Ottoman styles for incredible photos." },
          { t: "Leisure block & water sports:", d: "Relax by the beautiful coral coast or participate in desert safari rides, quad bike rental, and luxury cruise options." }
        ],
        calcLabel1: "👤 Adult (Double / Triple sharing) (199,000 DA):",
        calcLabel2: "🚶‍♂️ Adult (Single Private room) (269,000 DA):",
        calcLabel3: "🧒 Child (De 2 à 11 years) (145,000 DA):",
        calcLabel4: "👶 Infant (Under 2 years old) (34,000 DA):",
        included: [
          "✔ 9 nights of deluxe comfort at Parrotel Aqua Park Resort 4★.",
          "✔ All-Inclusive dining (morning, midday, evening open buffets + drinks included).",
          "✔ Round trip direct flight tickets on Ajet Airlines.",
          "✔ Guided airport transitions and shuttles (Airport – Hotel – Airport).",
          "✔ Dedicated English/Arabic speaking travel assistant throughout the package.",
          "✔ Free entry fees and group tours in the agenda."
        ],
        regNotes: "🏢 <b>Safe Registration:</b> High-res digital scans of travel passports are required.",
        bookBtn: "💬 Register for Egypt Tour on WhatsApp"
      }
    }
  };

  const t = dict[language] || dict['ar'];

  // Dynamically update dictionary with database values if modified by admin
  const dbIstanbul = tripsList.find(item => item.id === 'istanbul');
  const dbTunisia = tripsList.find(item => item.id === 'tunisia');
  const dbSoviva = tripsList.find(item => item.id === 'soviva');
  const dbEgypt = tripsList.find(item => item.id === 'egypt');

  if (dbIstanbul) {
    t.istanbul.title = language === 'ar' ? dbIstanbul.titleAr : (language === 'fr' ? dbIstanbul.titleFr : dbIstanbul.titleEn);
    t.istanbul.desc = language === 'ar' ? dbIstanbul.descAr : (language === 'fr' ? dbIstanbul.descFr : dbIstanbul.descEn);
    t.istanbul.hotel = language === 'ar' ? dbIstanbul.hotelAr : (language === 'fr' ? dbIstanbul.hotelFr : dbIstanbul.hotelEn);
    t.istanbul.duration = language === 'ar' ? dbIstanbul.durationAr : (language === 'fr' ? dbIstanbul.durationFr : dbIstanbul.durationEn);
    if (dbIstanbul.badge1Ar) {
      t.istanbul.badge1 = language === 'ar' ? dbIstanbul.badge1Ar : (language === 'fr' ? dbIstanbul.badge1Fr : dbIstanbul.badge1En);
    }
    if (dbIstanbul.badge2Ar) {
      t.istanbul.badge2 = language === 'ar' ? dbIstanbul.badge2Ar : (language === 'fr' ? dbIstanbul.badge2Fr : dbIstanbul.badge2En);
    }
  }

  if (dbTunisia) {
    t.tunisia.title = language === 'ar' ? dbTunisia.titleAr : (language === 'fr' ? dbTunisia.titleFr : dbTunisia.titleEn);
    t.tunisia.desc = language === 'ar' ? dbTunisia.descAr : (language === 'fr' ? dbTunisia.descFr : dbTunisia.descEn);
    t.tunisia.hotel = language === 'ar' ? dbTunisia.hotelAr : (language === 'fr' ? dbTunisia.hotelFr : dbTunisia.hotelEn);
    t.tunisia.duration = language === 'ar' ? dbTunisia.durationAr : (language === 'fr' ? dbTunisia.durationFr : dbTunisia.durationEn);
  }

  if (dbSoviva) {
    t.soviva.title = language === 'ar' ? dbSoviva.titleAr : (language === 'fr' ? dbSoviva.titleFr : dbSoviva.titleEn);
    t.soviva.desc = language === 'ar' ? dbSoviva.descAr : (language === 'fr' ? dbSoviva.descFr : dbSoviva.descEn);
    t.soviva.hotel = language === 'ar' ? dbSoviva.hotelAr : (language === 'fr' ? dbSoviva.hotelFr : dbSoviva.hotelEn);
    t.soviva.duration = language === 'ar' ? dbSoviva.durationAr : (language === 'fr' ? dbSoviva.durationFr : dbSoviva.durationEn);
  }

  if (dbEgypt) {
    t.egypt.title = language === 'ar' ? dbEgypt.titleAr : (language === 'fr' ? dbEgypt.titleFr : dbEgypt.titleEn);
    t.egypt.desc = language === 'ar' ? dbEgypt.descAr : (language === 'fr' ? dbEgypt.descFr : dbEgypt.descEn);
    t.egypt.hotel = language === 'ar' ? dbEgypt.hotelAr : (language === 'fr' ? dbEgypt.hotelFr : dbEgypt.hotelEn);
    t.egypt.duration = language === 'ar' ? dbEgypt.durationAr : (language === 'fr' ? dbEgypt.durationFr : dbEgypt.durationEn);
  }

  // —— Calculation Results ——
  const istanbulAdultPrice = dbIstanbul?.price || 129000;
  const istanbulSinglePrice = dbIstanbul ? (dbIstanbul.price + 40000) : 169000;
  const istanbulKidPrice = dbIstanbul ? Math.floor(dbIstanbul.price * 0.76) : 99000;
  const istanbulInfantPrice = 18000;

  const totalIstanbulCost = 
    (calcIstanbulAdults * istanbulAdultPrice) + 
    (calcIstanbulKids * istanbulKidPrice) + 
    (calcIstanbulInfants * istanbulInfantPrice) + 
    (calcIstanbulSingles * istanbulSinglePrice);

  const baseTunPrice = dbTunisia?.price || 28000;
  let unitTunisiaPrice = baseTunPrice;
  if (tunisiaApartmentType === 'double') unitTunisiaPrice = Math.floor(baseTunPrice * 1.196);
  else if (tunisiaApartmentType === 'triple') unitTunisiaPrice = Math.floor(baseTunPrice * 1.071);
  else if (tunisiaApartmentType === 'quad') unitTunisiaPrice = baseTunPrice;
  else if (tunisiaApartmentType === 'penta_hexa') unitTunisiaPrice = Math.floor(baseTunPrice * 0.857);

  const tunisiaAdultsCost = tunisiaAdultsCount * unitTunisiaPrice;
  const tunisiaKidsWithBedCost = tunisiaKidsWithBed * unitTunisiaPrice;
  const tunisiaKidsNoBedWithSeatCost = tunisiaKidsNoBedWithSeat * 17000;
  const totalTunisiaCost = tunisiaAdultsCost + tunisiaKidsWithBedCost + tunisiaKidsNoBedWithSeatCost;

  const sovivaAdultPrice = dbSoviva?.price || 45000;
  const sovivaKidPrice = dbSoviva ? Math.floor(sovivaAdultPrice * 0.66) : 30000;
  const totalSovivaCost = (calcSovivaAdults * sovivaAdultPrice) + (calcSovivaKids * sovivaKidPrice);

  const egyptAdultPrice = dbEgypt?.price || 199000;
  const egyptSinglePrice = dbEgypt ? (dbEgypt.price + 70000) : 269000;
  const egyptKidPrice = dbEgypt ? Math.floor(dbEgypt.price * 0.728) : 145000;
  const egyptInfantPrice = dbEgypt ? Math.floor(dbEgypt.price * 0.17) : 34000;

  const totalEgyptCost = 
    (calcEgyptAdultDoubleTriple * egyptAdultPrice) +
    (calcEgyptAdultSingle * egyptSinglePrice) +
    (calcEgyptKids * egyptKidPrice) +
    (calcEgyptInfants * egyptInfantPrice);

  // —— Dynamic WhatsApp Message Generators ——
  const handleIstanbulBook = () => {
    const msg = language === 'ar' 
      ? `مرحبا وكالة عبعوب، أريد التسجيل والحجز في رحلة إسطنبول (انطلاق 26 جوان) لعدد: ${calcIstanbulAdults} بالغ، و ${calcIstanbulKids} طفل، و ${calcIstanbulInfants} رضيع، و ${calcIstanbulSingles} فردي. الإجمالي المقدر هو: ${totalIstanbulCost.toLocaleString()} دج.`
      : `Bonjour Aboub Travel, je souhaite réserver pour le pack d'Istanbul (Départ 26 Juin) pour: ${calcIstanbulAdults} adulte(s), ${calcIstanbulKids} enfant(s), ${calcIstanbulInfants} bébé(s) et ${calcIstanbulSingles} single. Le total estimé est de ${totalIstanbulCost.toLocaleString()} DA.`;
    window.open(getWhatsAppLink(msg), '_blank', 'noopener,referrer');
  };

  const handleTunisiaBook = () => {
    const msg = language === 'ar'
      ? `مرحبا وكالة عبعوب للأسفار، أود الحجز لرحلة تونس الساحرة (سوسة والحمامات) لإقامة شقة عائلية (${tunisiaApartmentType === 'penta_hexa' ? 'خماسية أو سداسية' : tunisiaApartmentType === 'quad' ? 'رباعية' : tunisiaApartmentType === 'triple' ? 'ثلاثية' : 'ثنائية'}).\nالتشكيلة المطلوبة:\n- عدد البالغين: ${tunisiaAdultsCount}\n- أطفال بسرير: ${tunisiaKidsWithBed}\n- أطفال بمقعد دون سرير: ${tunisiaKidsNoBedWithSeat}\n- رضع: ${tunisiaInfantsCount}\nالإجمالي المقدر هو: ${totalTunisiaCost.toLocaleString()} دج.`
      : `Bonjour Aboub Travel, je souhaite réserver pour le pack Tunisie (Sousse & Hammamet) en appartement (${tunisiaApartmentType}).\nDétails:\n- Adultes: ${tunisiaAdultsCount}\n- Enfants avec lit: ${tunisiaKidsWithBed}\n- Enfants (siège de bus uniquement): ${tunisiaKidsNoBedWithSeat}\n- Bébés: ${tunisiaInfantsCount}\nTotal estimé: ${totalTunisiaCost.toLocaleString()} DA.`;
    window.open(getWhatsAppLink(msg), '_blank', 'noopener,referrer');
  };

  const handleSovivaBook = () => {
    const msg = language === 'ar'
      ? `مرحبا وكالة عبعوب للأسفار، أود الحجز في العرض الخاص لرحلة تونس فندق Soviva Resort (سوسة / القنطاوي).\nالتشكيلة المطلوبة:\n- عدد البالغين: ${calcSovivaAdults}\n- عدد الأطفال: ${calcSovivaKids}\nالإجمالي المقدر هو: ${totalSovivaCost.toLocaleString()} دج.`
      : `Bonjour Aboub Travel, je souhaite réserver pour le pack Soviva Resort Sousse.\nDétails:\n- Adultes: ${calcSovivaAdults}\n- Enfants: ${calcSovivaKids}\nTotal estimé: ${totalSovivaCost.toLocaleString()} DA.`;
    window.open(getWhatsAppLink(msg), '_blank', 'noopener,referrer');
  };

  const handleEgyptBook = () => {
    const msg = language === 'ar'
      ? `مرحبا وكالة عبعوب للأسفار، أريد استفسار وحجز في عرض صيف 2026 لرحلة شرم الشيخ - مصر 🇪🇬.\nالتاريخ المفضل للرحلة: ${egyptDepartureDate}\nالتشكيلة:\n- بالغين في غرفة ثنائية/ثلاثية: ${calcEgyptAdultDoubleTriple}\n- بالغين في غرفة فردية: ${calcEgyptAdultSingle}\n- أطفال (2-11 سنة): ${calcEgyptKids}\n- رضع: ${calcEgyptInfants}\nالإجمالي المقدر هو: ${totalEgyptCost.toLocaleString()} دج.`
      : `Bonjour Aboub Travel, je souhaite réserver pour le pack Égypte Sharm El-Sheikh.\nDate de départ préférée: ${egyptDepartureDate}\nDétails:\n- Adultes en chambre Double/Triple: ${calcEgyptAdultDoubleTriple}\n- Adultes en chambre Single: ${calcEgyptAdultSingle}\n- Enfants (2-11 ans): ${calcEgyptKids}\n- Bébés: ${calcEgyptInfants}\nTotal estimé: ${totalEgyptCost.toLocaleString()} DA.`;
    window.open(getWhatsAppLink(msg), '_blank', 'noopener,referrer');
  };

  return (
    <div className="space-y-16 animate-fade-in" id="intl-view" style={{ direction: dir }}>
      
      {/* Header Title Block */}
      <div className={`border-rose-500 space-y-2 ${dir === 'rtl' ? 'text-right border-r-4 pr-5' : 'text-left border-l-4 pl-5'}`}>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          {t.headerTitle}
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          {t.headerDesc}
        </p>
      </div>

      {selectedTrip === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
          
          {/* Card 1: Istanbul */}
          <div className="bg-slate-900/40 rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col hover:border-rose-500/40 hover:shadow-2xl hover:shadow-rose-950/20 transition-all duration-500 group relative">
            <div className="h-64 w-full overflow-hidden relative font-sans">
              <img 
                src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80" 
                alt="Istanbul Bosphorus" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-red-600/95 backdrop-blur text-white font-black py-1 px-3 rounded-xl text-[10px] tracking-wide shadow-md`}>
                {t.istanbul.badge2}
              </div>
            </div>

            <div className={`p-6 md:p-8 flex flex-col justify-between flex-1 space-y-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-3">
                <span className="inline-block text-[10px] font-black tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full">
                  {t.istanbul.badge1}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-rose-300 transition duration-300">
                  {t.istanbul.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-semibold">
                  {t.istanbul.desc}
                </p>

                <div className={`flex ${dir === 'rtl' ? 'justify-end' : 'justify-start'} gap-3 text-xs text-slate-400 font-bold border-t border-b border-white/5 py-3 mt-2`}>
                  <span>🏨 {t.istanbul.hotel}</span>
                  <span className="text-slate-600">|</span>
                  <span>📅 {t.istanbul.duration}</span>
                </div>
              </div>

              <div className={`flex items-center justify-between pt-2 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`${dir === 'rtl' ? 'text-left' : 'text-right'} font-sans`}>
                  <span className="block text-[9px] text-slate-500 font-bold">{t.startsFrom}</span>
                  <span className="text-xl font-black text-rose-400">129,000 {t.da}</span>
                </div>
                <button 
                  onClick={() => {
                    setSelectedTrip('istanbul');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-black py-3 px-6 rounded-2xl transition shadow-lg cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t.exploreBtn}
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Tunisia */}
          <div className="bg-slate-900/40 rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-950/20 transition-all duration-500 group relative">
            <div className="h-64 w-full overflow-hidden relative">
              <img 
                src={tunisFlagCover} 
                alt="Tunis Hammamet Sousse" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-blue-600/95 backdrop-blur text-white font-black py-1 px-3 rounded-xl text-[10px] tracking-wide shadow-md`}>
                {t.tunisia.badge2}
              </div>
            </div>

            <div className={`p-6 md:p-8 flex flex-col justify-between flex-1 space-y-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-3">
                <span className="inline-block text-[10px] font-black tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                  {t.tunisia.badge1}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-blue-300 transition duration-300">
                  {t.tunisia.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-semibold">
                  {t.tunisia.desc}
                </p>

                <div className={`flex ${dir === 'rtl' ? 'justify-end' : 'justify-start'} gap-3 text-xs text-slate-400 font-bold border-t border-b border-white/5 py-3 mt-2`}>
                  <span>⛱️ {t.tunisia.hotel}</span>
                  <span className="text-slate-600">|</span>
                  <span>📅 {t.tunisia.duration}</span>
                </div>
              </div>

              <div className={`flex items-center justify-between pt-2 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`${dir === 'rtl' ? 'text-left' : 'text-right'} font-sans`}>
                  <span className="block text-[9px] text-slate-500 font-bold">{t.startsFrom}</span>
                  <span className="text-xl font-black text-blue-400">24,000 {t.da}</span>
                </div>
                <button 
                  onClick={() => {
                    setSelectedTrip('tunisia');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-black py-3 px-6 rounded-2xl transition shadow-lg cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t.exploreBtn}
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Soviva Resort */}
          <div className="bg-slate-900/40 rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-500 group relative">
            <div className="h-64 w-full overflow-hidden relative">
              <img 
                src={sovivaResortTunis} 
                alt="Soviva Resort Sousse" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-emerald-600/95 backdrop-blur text-white font-black py-1 px-3 rounded-xl text-[10px] tracking-wide shadow-md`}>
                {t.soviva.badge2}
              </div>
            </div>

            <div className={`p-6 md:p-8 flex flex-col justify-between flex-1 space-y-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-3">
                <span className="inline-block text-[10px] font-black tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                  {t.soviva.badge1}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-emerald-300 transition duration-300">
                  {t.soviva.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-semibold">
                  {t.soviva.desc}
                </p>

                <div className={`flex ${dir === 'rtl' ? 'justify-end' : 'justify-start'} gap-3 text-xs text-slate-400 font-bold border-t border-b border-white/5 py-3 mt-2`}>
                  <span>🍽️ {t.soviva.hotel}</span>
                  <span className="text-slate-600">|</span>
                  <span>📅 {t.soviva.duration}</span>
                </div>
              </div>

              <div className={`flex items-center justify-between pt-2 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`${dir === 'rtl' ? 'text-left' : 'text-right'} font-sans`}>
                  <span className="block text-[9px] text-slate-500 font-bold">{t.startsFrom}</span>
                  <span className="text-xl font-black text-emerald-400">45,000 {t.da}</span>
                </div>
                <button 
                  onClick={() => {
                    setSelectedTrip('soviva');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black py-3 px-6 rounded-2xl transition shadow-lg cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t.exploreBtn}
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Egypt */}
          <div className="bg-slate-900/40 rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-955/20 transition-all duration-500 group relative md:col-span-2 lg:col-span-1">
            <div className="h-64 w-full overflow-hidden relative">
              <img 
                src={sharmEgyptView} 
                alt="Egypt Pyramids and Sharm El Sheikh" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-amber-500/95 backdrop-blur text-slate-950 font-black py-1 px-3 rounded-xl text-[10px] tracking-wide shadow-md`}>
                {t.egypt.badge2}
              </div>
            </div>

            <div className={`p-6 md:p-8 flex flex-col justify-between flex-1 space-y-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="space-y-3">
                <span className="inline-block text-[10px] font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
                  {t.egypt.badge1}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-amber-300 transition duration-300">
                  {t.egypt.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-semibold">
                  {t.egypt.desc}
                </p>

                <div className={`flex ${dir === 'rtl' ? 'justify-end' : 'justify-start'} gap-3 text-xs text-slate-400 font-bold border-t border-b border-white/5 py-3 mt-2`}>
                  <span>🏊 {t.egypt.hotel}</span>
                  <span className="text-slate-600">|</span>
                  <span>📅 {t.egypt.duration}</span>
                </div>
              </div>

              <div className={`flex items-center justify-between pt-2 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`${dir === 'rtl' ? 'text-left' : 'text-right'} font-sans`}>
                  <span className="block text-[9px] text-slate-500 font-bold">{t.startsFrom}</span>
                  <span className="text-xl font-black text-amber-400">199,000 {t.da}</span>
                </div>
                <button 
                  onClick={() => {
                    setSelectedTrip('egypt');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black py-3 px-6 rounded-2xl transition shadow-lg cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t.exploreBtn}
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Trips Added by Admin */}
          {tripsList.filter(t => t.category === 'intl' && !['istanbul', 'tunisia', 'soviva', 'egypt'].includes(t.id)).map((trip) => {
            const title = language === 'ar' ? trip.titleAr : (language === 'fr' ? trip.titleFr : trip.titleEn);
            const desc = language === 'ar' ? trip.descAr : (language === 'fr' ? trip.descFr : trip.descEn);
            const hotel = language === 'ar' ? trip.hotelAr : (language === 'fr' ? trip.hotelFr : trip.hotelEn);
            const duration = language === 'ar' ? trip.durationAr : (language === 'fr' ? trip.durationFr : trip.durationEn);
            const badge1 = language === 'ar' ? trip.badge1Ar : (language === 'fr' ? trip.badge1Fr : trip.badge1En);
            const badge2 = language === 'ar' ? trip.badge2Ar : (language === 'fr' ? trip.badge2Fr : trip.badge2En);

            return (
              <div key={trip.id} className="bg-slate-900/40 rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-950/20 transition-all duration-500 group relative">
                <div className="h-64 w-full overflow-hidden relative font-sans">
                  <img 
                    src={trip.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  
                  {badge2 && (
                    <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-amber-600 text-white font-black py-1 px-3 rounded-xl text-[10px] tracking-wide shadow-md`}>
                      {badge2}
                    </div>
                  )}
                </div>

                <div className={`p-6 md:p-8 flex flex-col justify-between flex-1 space-y-5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <div className="space-y-3">
                    {badge1 && (
                      <span className="inline-block text-[10px] font-black tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
                        {badge1}
                      </span>
                    )}
                    <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-amber-300 transition duration-300">
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
                      <span className="block text-[9px] text-slate-500 font-bold">{t.startsFrom}</span>
                      <span className="text-xl font-black text-amber-400">{(trip.price || 0).toLocaleString()} {t.da}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedTrip(trip.id);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black py-3 px-6 rounded-2xl transition shadow-lg cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {t.exploreBtn}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      ) : (
        // —— TRIP DETAILED VIEW PAGE ——
        <div className="space-y-8 animate-fade-in">
          
          {/* Navigation & Title rail */}
          <div className="flex flex-wrap justify-between items-center bg-slate-950/40 p-4 rounded-2xl border border-white/5 gap-3">
            <button 
              onClick={() => {
                setSelectedTrip(null);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold transition text-xs cursor-pointer select-none border border-white/10"
            >
              {dir === 'rtl' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{t.backBtn}</span>
            </button>
            <span className="text-slate-300 text-xs font-semibold">
              {t.tripDetailsTitle} {
                selectedTrip === 'istanbul' ? t.istanbulTitle : 
                selectedTrip === 'tunisia' ? t.tunisiaTitle : 
                selectedTrip === 'soviva' ? t.sovivaTitle : t.egyptTitle
              }
            </span>
          </div>

          {/* Render individual trip detail content */}
          {selectedTrip === 'istanbul' && (
            <div className="bg-slate-900/40 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col">
              
              {/* Banner */}
              <div className="h-80 md:h-[28rem] w-full relative">
                <img 
                  src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80" 
                  alt="Istanbul"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"></div>
                <div className="absolute top-6 right-6 flex flex-wrap gap-2">
                  <span className="bg-slate-950/80 backdrop-blur text-white font-black py-2 px-4 rounded-full text-xs border border-white/20 shadow-md">
                    {t.istanbul.badge1}
                  </span>
                  <span className="bg-red-600 text-white font-black py-2 px-4 rounded-full text-xs shadow-md">
                    {t.istanbul.badge2}
                  </span>
                </div>
                <div className={`absolute bottom-6 left-6 right-6 text-white space-y-2 keep-white ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <span className="bg-amber-500/20 text-amber-300 font-extrabold px-3 py-1.5 rounded-full text-xs border border-amber-500/30">
                    {t.istanbul.badge2}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-white mt-1">{t.istanbul.title}</h3>
                  <p className="text-sm text-slate-200 font-medium">{t.istanbul.desc}</p>
                </div>
              </div>

              {/* Body */}
              <div className={`p-6 md:p-10 space-y-10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Program list */}
                  <div className="lg:col-span-7 space-y-6">
                    <h4 className="text-xl font-bold text-rose-400 pb-2 border-b border-white/10 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-rose-400" />
                      <span>{t.istanbul.progHeader}</span>
                    </h4>
                    <div className="space-y-4">
                      {t.istanbul.program.map((item, idx) => (
                        <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start">
                          <span className="text-rose-600 dark:text-rose-400 text-lg">✦</span>
                          <div>
                            <b className="block text-rose-700 dark:text-rose-200 text-sm font-black mb-1">{item.t}</b>
                            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{item.d}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calculator and Rate Card */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-slate-950/40 p-6 rounded-[2rem] border border-white/10 space-y-4">
                      <h4 className="text-base font-black text-white border-b border-white/5 pb-2">
                        {t.egyptRatesTitle}
                      </h4>
                      <div className="space-y-2.5 text-xs font-bold text-slate-300">
                        <div className="flex justify-between bg-white/5 p-3 rounded-xl">
                          <span>{t.istanbul.calcLabel1}</span>
                          <span className="text-rose-400">129,000 DA</span>
                        </div>
                        <div className="flex justify-between bg-white/5 p-3 rounded-xl">
                          <span>{t.istanbul.calcLabel2}</span>
                          <span className="text-rose-400">169,000 DA</span>
                        </div>
                        <div className="flex justify-between bg-white/5 p-3 rounded-xl">
                          <span>{t.istanbul.calcLabel3}</span>
                          <span className="text-rose-400">99,000 DA</span>
                        </div>
                        <div className="flex justify-between bg-white/5 p-3 rounded-xl">
                          <span>{t.istanbul.calcLabel4}</span>
                          <span className="text-rose-400">18,000 DA</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Calculator */}
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 space-y-4">
                      <b className="text-sm font-black text-rose-400 block pb-2 border-b border-white/5">{t.calcTitle}</b>
                      
                      {/* Adults Dual/Triple */}
                      <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-xs text-slate-300 block">{t.istanbul.calcLabel1}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setCalcIstanbulAdults(Math.max(0, calcIstanbulAdults - 1))} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">-</button>
                          <input type="number" readOnly value={calcIstanbulAdults} className="w-full bg-slate-950/70 text-white p-1 text-center font-bold text-xs" />
                          <button onClick={() => setCalcIstanbulAdults(calcIstanbulAdults + 1)} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Single room Adults */}
                      <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-xs text-slate-300 block">{t.istanbul.calcLabel2}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setCalcIstanbulSingles(Math.max(0, calcIstanbulSingles - 1))} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">-</button>
                          <input type="number" readOnly value={calcIstanbulSingles} className="w-full bg-slate-950/70 text-white p-1 text-center font-bold text-xs" />
                          <button onClick={() => setCalcIstanbulSingles(calcIstanbulSingles + 1)} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Kids */}
                      <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-xs text-slate-300 block">{t.istanbul.calcLabel3}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setCalcIstanbulKids(Math.max(0, calcIstanbulKids - 1))} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">-</button>
                          <input type="number" readOnly value={calcIstanbulKids} className="w-full bg-slate-950/70 text-white p-1 text-center font-bold text-xs" />
                          <button onClick={() => setCalcIstanbulKids(calcIstanbulKids + 1)} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-xs text-slate-300 block">{t.istanbul.calcLabel4}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setCalcIstanbulInfants(Math.max(0, calcIstanbulInfants - 1))} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">-</button>
                          <input type="number" readOnly value={calcIstanbulInfants} className="w-full bg-slate-950/70 text-white p-1 text-center font-bold text-xs" />
                          <button onClick={() => setCalcIstanbulInfants(calcIstanbulInfants + 1)} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="p-3 bg-slate-950/60 rounded-xl flex justify-between items-center border border-white/5">
                        <span className="text-xs text-slate-400 font-bold">{t.estimatedTotal}</span>
                        <span className="text-lg font-black text-rose-400 font-mono">
                          {totalIstanbulCost.toLocaleString()} {t.da}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom summaries */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3">
                    <h5 className="font-extrabold text-white text-sm border-r-4 border-rose-500 pr-2">{t.pricesIncludeTitle}</h5>
                    <ul className="text-xs text-slate-300 space-y-2">
                      {t.istanbul.included.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3">
                    <h5 className="font-extrabold text-white text-sm border-r-4 border-rose-500 pr-2">{t.regDetailsTitle}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed pr-1" dangerouslySetInnerHTML={{ __html: t.istanbul.regNotes }}></p>
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-2">
                  <button 
                    onClick={handleIstanbulBook}
                    className="w-full text-lg font-black bg-rose-600 hover:bg-rose-500 text-white py-4 rounded-2xl text-center shadow-xl transition-all hover:scale-101 duration-300 cursor-pointer"
                  >
                    {t.istanbul.bookBtn}
                  </button>
                </div>

              </div>
            </div>
          )}

          {selectedTrip === 'tunisia' && (
            <div className="bg-slate-900/40 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col">
              
              {/* Banner */}
              <div className="h-80 md:h-[28rem] w-full relative">
                <img 
                  src={tunisFlagCover} 
                  alt="Tunisia Holiday"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"></div>
                <div className="absolute top-6 right-6 flex flex-wrap gap-2">
                  <span className="bg-slate-950/80 backdrop-blur text-white font-black py-2 px-4 rounded-full text-xs border border-white/20 shadow-md">
                    {t.tunisia.badge1}
                  </span>
                  <span className="bg-blue-600 text-white font-black py-2 px-4 rounded-full text-xs shadow-md">
                    {t.tunisia.badge2}
                  </span>
                </div>
                <div className={`absolute bottom-6 left-6 right-6 text-white space-y-2 keep-white ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <span className="bg-amber-500/20 text-amber-300 font-extrabold px-3 py-1.5 rounded-full text-xs border border-amber-500/30">
                    {t.tunisia.badge1}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-white mt-1">{t.tunisia.title}</h3>
                  <p className="text-sm text-slate-200 font-medium">{t.tunisia.desc}</p>
                </div>
              </div>

              {/* Body */}
              <div className={`p-6 md:p-10 space-y-10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Program list */}
                  <div className="lg:col-span-7 space-y-6">
                    <h4 className="text-xl font-bold text-blue-400 pb-2 border-b border-white/10 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-blue-400" />
                      <span>{t.tunisia.progHeader}</span>
                    </h4>
                    <div className="space-y-3">
                      {t.tunisia.program.map((item, idx) => (
                        <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start">
                          <span className="text-blue-600 dark:text-blue-400 text-lg">✦</span>
                          <div>
                            <b className="block text-blue-700 dark:text-blue-200 text-sm font-black mb-1">{item.t}</b>
                            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{item.d}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Calculator */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-slate-950/40 p-6 rounded-[2rem] border border-white/10 space-y-4">
                      <h4 className="text-base font-black text-white border-b border-white/5 pb-2">
                        {t.tunisia.calcHeader}
                      </h4>
                      <div className="space-y-2.5 text-xs font-bold text-slate-300">
                        {t.tunisia.prices.map((item, idx) => (
                          <div key={idx} className="flex justify-between bg-white/5 p-3 rounded-xl">
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Calculator */}
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 space-y-4">
                      <b className="text-sm font-black text-cyan-400 block pb-2 border-b border-white/5">{t.tunisia.calcTitle}</b>
                      
                      {/* Apartment Select */}
                      <div className="space-y-1">
                        <label className="block text-xs text-slate-300 font-bold mb-1">{t.apartmentChoiceLabel}</label>
                        <select 
                          value={tunisiaApartmentType}
                          onChange={(e) => setTunisiaApartmentType(e.target.value as any)}
                          className={`w-full bg-slate-950/70 text-white p-2 text-xs rounded-xl border border-white/10 font-bold ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                        >
                          <option value="penta_hexa">{t.tunisia.prices[0]}</option>
                          <option value="quad">{t.tunisia.prices[1]}</option>
                          <option value="triple">{t.tunisia.prices[2]}</option>
                          <option value="double">{t.tunisia.prices[3]}</option>
                        </select>
                      </div>

                      {/* Adults */}
                      <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-xs text-slate-300 block">{t.adultsCountLabel} ({unitTunisiaPrice.toLocaleString()} {t.da})</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setTunisiaAdultsCount(Math.max(0, tunisiaAdultsCount - 1))} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">-</button>
                          <input type="number" readOnly value={tunisiaAdultsCount} className="w-full bg-slate-950/70 text-white p-1 text-center font-bold text-xs" />
                          <button onClick={() => setTunisiaAdultsCount(tunisiaAdultsCount + 1)} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Child with extra bed */}
                      <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-xs text-slate-300 block">{t.kidsWithBedLabel}</span>
                        <p className="text-[10px] text-slate-400 leading-none">{t.kidsWithBedNotice}</p>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setTunisiaKidsWithBed(Math.max(0, tunisiaKidsWithBed - 1))} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">-</button>
                          <input type="number" readOnly value={tunisiaKidsWithBed} className="w-full bg-slate-950/70 text-white p-1 text-center font-bold text-xs" />
                          <button onClick={() => setTunisiaKidsWithBed(tunisiaKidsWithBed + 1)} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Child bus seat only */}
                      <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-xs text-slate-300 block">{t.kidsNoBedSeatLabel}</span>
                        <p className="text-[10px] text-yellow-400/80 leading-snug">{t.kidsNoBedSeatNotice}</p>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setTunisiaKidsNoBedWithSeat(Math.max(0, tunisiaKidsNoBedWithSeat - 1))} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">-</button>
                          <input type="number" readOnly value={tunisiaKidsNoBedWithSeat} className="w-full bg-slate-950/70 text-white p-1 text-center font-bold text-xs" />
                          <button onClick={() => setTunisiaKidsNoBedWithSeat(tunisiaKidsNoBedWithSeat + 1)} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-xs text-slate-300 block">{t.infantLabel}</span>
                        <p className="text-[10px] text-slate-400 leading-none">{t.infantNotice}</p>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setTunisiaInfantsCount(Math.max(0, tunisiaInfantsCount - 1))} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">-</button>
                          <input type="number" readOnly value={tunisiaInfantsCount} className="w-full bg-slate-950/70 text-white p-1 text-center font-bold text-xs" />
                          <button onClick={() => setTunisiaInfantsCount(tunisiaInfantsCount + 1)} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="p-3 bg-slate-950/60 rounded-xl flex justify-between items-center border border-white/5 mt-3">
                        <span className="text-xs text-slate-400 font-bold">{t.estimatedTotal}</span>
                        <span className="text-lg font-black text-rose-400 font-mono">
                          {totalTunisiaCost.toLocaleString()} {t.da}
                        </span>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Bottom Summaries */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3">
                    <h5 className="font-extrabold text-white text-sm border-l-4 border-blue-500 pl-2 pr-2">{t.pricesIncludeTitle}</h5>
                    <ul className="text-xs text-slate-300 space-y-2">
                      {t.tunisia.included.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3">
                    <h5 className="font-extrabold text-white text-sm border-l-4 border-blue-500 pl-2 pr-2">{t.tunisia.bookingInfoTitle}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.tunisia.regNotes }}></p>
                  </div>
                </div>

                {/* Book Action */}
                <div className="pt-2 font-sans">
                  <button 
                    onClick={handleTunisiaBook}
                    className="w-full text-lg font-black bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl text-center shadow-xl transition-all hover:scale-101 duration-300 cursor-pointer"
                  >
                    {t.tunisia.bookBtn}
                  </button>
                </div>

              </div>
            </div>
          )}

          {selectedTrip === 'soviva' && (
            <div className="bg-slate-900/40 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col">
              
              {/* Banner */}
              <div className="h-80 md:h-[28rem] w-full relative">
                <img 
                  src={sovivaResortTunis} 
                  alt="Soviva Resort"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"></div>
                <div className="absolute top-6 right-6 flex flex-wrap gap-2">
                  <span className="bg-slate-950/80 backdrop-blur text-white font-black py-2 px-4 rounded-full text-xs border border-white/20 shadow-md">
                    {t.soviva.badge1}
                  </span>
                  <span className="bg-emerald-600 text-white font-black py-2 px-4 rounded-full text-xs shadow-md">
                    {t.soviva.badge2}
                  </span>
                </div>
                <div className={`absolute bottom-6 left-6 right-6 text-white space-y-2 keep-white ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <span className="bg-amber-500/20 text-amber-300 font-extrabold px-3 py-1.5 rounded-full text-xs border border-amber-500/30">
                    {t.soviva.badge1}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-white mt-1">{t.soviva.title}</h3>
                  <p className="text-sm text-slate-200 font-medium">{t.soviva.desc}</p>
                </div>
              </div>

              {/* Body */}
              <div className={`p-6 md:p-10 space-y-10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Program Features */}
                  <div className="lg:col-span-7 space-y-6">
                    <h4 className="text-xl font-bold text-emerald-400 pb-2 border-b border-white/10 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-emerald-400" />
                      <span>{t.soviva.progHeader}</span>
                    </h4>
                    <div className="space-y-3">
                      {t.soviva.program.map((item, idx) => (
                        <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start">
                          <span className="text-emerald-600 dark:text-emerald-400 text-lg">✦</span>
                          <div>
                            <b className="block text-emerald-700 dark:text-emerald-200 text-sm font-black mb-1">{item.t}</b>
                            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{item.d}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calculator and Pricing */}
                  <div className="lg:col-span-5 space-y-6 max-w-full">
                    <div className="bg-slate-950/40 p-6 rounded-[2rem] border border-white/10 space-y-4">
                      <h4 className="text-base font-black text-white border-b border-white/5 pb-2">
                        {t.soviva.calcHeader}
                      </h4>
                      <div className="space-y-2.5 text-xs font-bold text-slate-300">
                        {t.soviva.prices.map((item, idx) => (
                          <div key={idx} className="flex justify-between bg-white/5 p-3 rounded-xl">
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Soviva Calc */}
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 space-y-4">
                      <b className="text-sm font-black text-cyan-400 block pb-2 border-b border-white/5">{t.soviva.calcTitle}</b>
                      
                      {/* Adults */}
                      <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-xs text-slate-300 block">{t.soviva.calcLabel1}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setCalcSovivaAdults(Math.max(0, calcSovivaAdults - 1))} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">-</button>
                          <input type="number" readOnly value={calcSovivaAdults} className="w-full bg-slate-950/70 text-white p-1 text-center font-bold text-xs" />
                          <button onClick={() => setCalcSovivaAdults(calcSovivaAdults + 1)} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Kids */}
                      <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-xs text-slate-300 block">{t.soviva.calcLabel2}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setCalcSovivaKids(Math.max(0, calcSovivaKids - 1))} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">-</button>
                          <input type="number" readOnly value={calcSovivaKids} className="w-full bg-slate-950/70 text-white p-1 text-center font-bold text-xs" />
                          <button onClick={() => setCalcSovivaKids(calcSovivaKids + 1)} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="p-3 bg-slate-950/60 rounded-xl flex justify-between items-center border border-white/5 mt-3">
                        <span className="text-xs text-slate-400 font-bold">{t.soviva.calcTotalLabel}</span>
                        <span className="text-lg font-black text-rose-400 font-mono">
                          {totalSovivaCost.toLocaleString()} {t.da}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom summaries */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3">
                    <h5 className="font-extrabold text-white text-sm border-l-4 border-emerald-500 pl-2 pr-2">{t.pricesIncludeTitle}</h5>
                    <ul className="text-xs text-slate-300 space-y-2">
                      {t.soviva.included.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3">
                    <h5 className="font-extrabold text-white text-sm border-l-4 border-emerald-500 pl-2 pr-2">{t.soviva.termsTitle}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed pr-1" dangerouslySetInnerHTML={{ __html: t.soviva.regNotes }}></p>
                  </div>
                </div>

                {/* Book Action */}
                <div className="pt-2">
                  <button 
                    onClick={handleSovivaBook}
                    className="w-full text-lg font-black bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl text-center shadow-xl transition-all hover:scale-101 duration-300 cursor-pointer"
                  >
                    {t.soviva.bookBtn}
                  </button>
                </div>

              </div>
            </div>
          )}

          {selectedTrip === 'egypt' && (
            <div className="bg-slate-900/40 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col">
              
              {/* Banner */}
              <div className="h-80 md:h-[28rem] w-full relative">
                <img 
                  src={sharmEgyptView} 
                  alt="Egypt Sharm"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"></div>
                <div className="absolute top-6 right-6 flex flex-wrap gap-2">
                  <span className="bg-slate-950/80 backdrop-blur text-white font-black py-2 px-4 rounded-full text-xs border border-white/20 shadow-md">
                    {t.egypt.badge1}
                  </span>
                  <span className="bg-amber-500 text-slate-950 font-black py-2 px-4 rounded-full text-xs shadow-md">
                    {t.egypt.badge2}
                  </span>
                </div>
                <div className={`absolute bottom-6 left-6 right-6 text-white space-y-2 keep-white ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <span className="bg-amber-500/20 text-amber-300 font-extrabold px-3 py-1.5 rounded-full text-xs border border-amber-500/30">
                    {t.egypt.badge1}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-white mt-1">{t.egypt.title}</h3>
                  <p className="text-sm text-slate-200 font-medium">{t.egypt.desc}</p>
                </div>
              </div>

              {/* Body */}
              <div className={`p-6 md:p-10 space-y-10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Select Flight Date & Program */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Departure Dates Selector */}
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3">
                      <label className="block text-sm font-bold text-amber-400">{t.egyDateLabel}</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {['24/07/2026', '31/07/2026', '05/08/2026', '14/08/2026', '21/08/2026'].map((date) => (
                          <button
                            key={date}
                            type="button"
                            onClick={() => setEgyptDepartureDate(date)}
                            className={`py-2 px-3 rounded-xl font-bold font-sans text-xs transition-all border text-center ${
                              egyptDepartureDate === date
                                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-lg shadow-amber-500/20 scale-[1.03]'
                                : 'bg-slate-950/40 text-slate-300 border-white/5 hover:border-white/20'
                            }`}
                          >
                            {date}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Program List */}
                    <h4 className="text-xl font-bold text-amber-400 pb-2 border-b border-white/10 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-amber-400" />
                      <span>{t.egypt.progHeader}</span>
                    </h4>
                    <div className="space-y-3 font-sans">
                      {t.egypt.program.map((item, idx) => (
                        <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start">
                          <span className="text-amber-600 dark:text-amber-400 text-lg">✦</span>
                          <div>
                            <b className="block text-amber-800 dark:text-amber-200 text-sm font-black mb-1 font-sans">{item.t}</b>
                            <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{item.d}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calculator and rates */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-slate-950/40 p-6 rounded-[2rem] border border-white/10 space-y-4">
                      <h4 className="text-base font-black text-white border-b border-white/5 pb-2">
                        {t.egyptRatesTitle}
                      </h4>
                      <div className="space-y-2.5 text-xs font-bold text-slate-300">
                        <div className="flex justify-between bg-white/5 p-3 rounded-xl">
                          <span>{t.egypt.calcLabel1}</span>
                          <span className="text-amber-400">199,000 DA</span>
                        </div>
                        <div className="flex justify-between bg-white/5 p-3 rounded-xl">
                          <span>{t.egypt.calcLabel2}</span>
                          <span className="text-amber-400">269,000 DA</span>
                        </div>
                        <div className="flex justify-between bg-white/5 p-3 rounded-xl">
                          <span>{t.egypt.calcLabel3}</span>
                          <span className="text-amber-400">145,000 DA</span>
                        </div>
                        <div className="flex justify-between bg-white/5 p-3 rounded-xl">
                          <span>{t.egypt.calcLabel4}</span>
                          <span className="text-amber-400">34,000 DA</span>
                        </div>
                      </div>
                    </div>

                    {/* Egypt Interactive Calculator */}
                    <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 space-y-4 font-sans">
                      <b className="text-sm font-black text-amber-400 block pb-2 border-b border-white/5">{t.calcTitle}</b>
                      
                      {/* Double/Triple */}
                      <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-xs text-slate-300 block">{t.egypt.calcLabel1}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setCalcEgyptAdultDoubleTriple(Math.max(0, calcEgyptAdultDoubleTriple - 1))} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">-</button>
                          <input type="number" readOnly value={calcEgyptAdultDoubleTriple} className="w-full bg-slate-950/70 text-white p-1 text-center font-bold text-xs" />
                          <button onClick={() => setCalcEgyptAdultDoubleTriple(calcEgyptAdultDoubleTriple + 1)} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Single room */}
                      <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-xs text-slate-300 block">{t.egypt.calcLabel2}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setCalcEgyptAdultSingle(Math.max(0, calcEgyptAdultSingle - 1))} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">-</button>
                          <input type="number" readOnly value={calcEgyptAdultSingle} className="w-full bg-slate-950/70 text-white p-1 text-center font-bold text-xs" />
                          <button onClick={() => setCalcEgyptAdultSingle(calcEgyptAdultSingle + 1)} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Kids */}
                      <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-xs text-slate-300 block">{t.egypt.calcLabel3}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setCalcEgyptKids(Math.max(0, calcEgyptKids - 1))} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">-</button>
                          <input type="number" readOnly value={calcEgyptKids} className="w-full bg-slate-950/70 text-white p-1 text-center font-bold text-xs" />
                          <button onClick={() => setCalcEgyptKids(calcEgyptKids + 1)} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Infants */}
                      <div className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-xs text-slate-300 block">{t.egypt.calcLabel4}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setCalcEgyptInfants(Math.max(0, calcEgyptInfants - 1))} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">-</button>
                          <input type="number" readOnly value={calcEgyptInfants} className="w-full bg-slate-950/70 text-white p-1 text-center font-bold text-xs" />
                          <button onClick={() => setCalcEgyptInfants(calcEgyptInfants + 1)} className="w-8 h-8 bg-slate-950/80 rounded-lg text-white font-bold select-none cursor-pointer">+</button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="p-3 bg-slate-950/60 rounded-xl flex justify-between items-center border border-white/5 mt-3">
                        <span className="text-xs text-slate-400 font-bold">{t.egyptCalcTotalLabel}</span>
                        <span className="text-lg font-black text-amber-400 font-mono">
                          {totalEgyptCost.toLocaleString()} {t.da}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom summaries */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3">
                    <h5 className="font-extrabold text-white text-sm border-l-4 border-amber-500 pl-2 pr-2">{t.pricesIncludeTitle}</h5>
                    <ul className="text-xs text-slate-300 space-y-2">
                      {t.egypt.included.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3">
                    <h5 className="font-extrabold text-white text-sm border-l-4 border-amber-500 pl-2 pr-2">{t.contactTitle}</h5>
                    <div className="text-xs text-slate-300 space-y-2">
                      <p dangerouslySetInnerHTML={{ __html: t.egypt.regNotes }}></p>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                        <span className="block font-bold text-amber-300">{t.numbersTitle}</span>
                        <div className="flex flex-col gap-1.5 text-white text-sm mt-1">
                          <span className="bg-slate-950/30 px-3 py-1 rounded-lg border border-white/5">📞 0696789633</span>
                          <span className="bg-slate-950/30 px-3 py-1 rounded-lg border border-white/5">📞 0667910148</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400">{t.agencyNote}</p>
                    </div>
                  </div>
                </div>

                {/* Book Action */}
                <div className="pt-2">
                  <button 
                    onClick={handleEgyptBook}
                    className="w-full text-lg font-black bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 rounded-2xl text-center shadow-xl transition-all hover:scale-101 duration-300 cursor-pointer"
                  >
                    {language === 'ar' 
                      ? '💬 احجز عرض صيف 2026 لشرم الشيخ الآن عبر الواتساب'
                      : '💬 Book Egypt Sharm El-Sheikh on WhatsApp'}
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Custom Dynamic Trip Detail View */}
          {!['istanbul', 'tunisia', 'soviva', 'egypt'].includes(selectedTrip || '') && selectedTrip !== null && (
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
                <div className="bg-slate-900/40 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col animate-fade-in text-right" style={{ direction: dir }}>
                  
                  {/* Banner */}
                  <div className="h-80 md:h-[28rem] w-full relative">
                    <img 
                      src={trip.image || "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=80"} 
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"></div>
                    <div className={`absolute top-6 ${dir === 'rtl' ? 'right-6' : 'left-6'} flex flex-wrap gap-2`}>
                      {badge1 && (
                        <span className="bg-slate-950/80 backdrop-blur text-white font-black py-2 px-4 rounded-full text-xs border border-white/20 shadow-md">
                          {badge1}
                        </span>
                      )}
                      {badge2 && (
                        <span className="bg-amber-600 text-white font-black py-2 px-4 rounded-full text-xs shadow-md">
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
                        <h4 className="text-xl font-bold text-amber-400 pb-2 border-b border-white/10 flex items-center gap-2">
                          <Compass className="w-5 h-5 text-amber-400" />
                          <span>{language === 'ar' ? '🗺️ برنامج المعالم والخرجات السياحية بالكامل:' : '🗺️ Itinéraire Complet :'}</span>
                        </h4>
                        <div className="space-y-4">
                          {trip.program?.map((item: any, idx: number) => {
                            const stepTitle = language === 'ar' ? item.tAr || item.t : (language === 'fr' ? item.tFr || item.t : item.tEn || item.t);
                            const stepDesc = language === 'ar' ? item.dAr || item.d : (language === 'fr' ? item.dFr || item.d : item.dEn || item.d);
                            return (
                              <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-3 items-start">
                                <span className="text-amber-600 dark:text-amber-400 text-lg">✦</span>
                                <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                                  <b className="block text-amber-800 dark:text-amber-200 text-sm font-black mb-1">{stepTitle}</b>
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
                                <span>{language === 'ar' ? '🏨 الفندق المعتمد:' : 'Hôtel :'}</span>
                                <span className="text-white">{hotel}</span>
                              </div>
                            )}
                            {duration && (
                              <div className="flex justify-between bg-white/5 p-3 rounded-xl">
                                <span>{language === 'ar' ? '📅 مدة الإقامة بالكامل:' : 'Durée :'}</span>
                                <span className="text-amber-400">{duration}</span>
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
                          <b className="text-sm font-black text-amber-400 block pb-2 border-b border-white/5">
                            {language === 'ar' ? '🧮 حاسبة أسعار الرحلة التفاعلية:' : '🧮 Calculateur de prix de séjour :'}
                          </b>
                          
                          <div className="space-y-3">
                            {customPrices.map((priceOption: any, optIdx: number) => {
                              const qty = activeQuantities[optIdx] || 0;
                              return (
                                <div key={optIdx} className="bg-slate-950/25 p-3 rounded-xl border border-white/5 space-y-1.5 text-right">
                                  <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-300 font-bold">{priceOption.label}</span>
                                    <span className="text-amber-500 font-extrabold">{priceOption.price.toLocaleString()} {language === 'ar' ? 'دج' : 'DA'}</span>
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
                            <span className="text-xs text-slate-400 font-bold">{language === 'ar' ? 'التكلفة الإجمالية للرحلة:' : 'Coût Total estimé :'}</span>
                            <span className="text-lg font-black text-amber-400 font-mono">
                              {dynamicTotal.toLocaleString()} {language === 'ar' ? 'دج' : 'DA'}
                            </span>
                          </div>
                        </div>

                        {/* Direct booking list */}
                        <div className="bg-slate-950/40 p-5 rounded-[2rem] border border-white/10 space-y-3 text-right">
                          <span className="block text-xs font-black text-amber-400 pb-2 border-b border-white/5">{language === 'ar' ? '📝 شروط وتفاصيل الرحلة:' : 'Conditions:'}</span>
                          <p className="text-xs text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: regNotes || '' }}></p>
                        </div>
                      </div>

                    </div>

                    {/* Inclusion & rules */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      {included && included.length > 0 && (
                        <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3">
                          <h5 className="font-extrabold text-white text-sm border-l-4 border-amber-500 pl-2 pr-2">{language === 'ar' ? '📌 السعر المذكور يشمل:' : 'Inclus:'}</h5>
                          <ul className="text-xs text-slate-300 space-y-2">
                            {included.map((item: string, idx: number) => (
                              <li key={idx} className="flex items-center gap-1.5">{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="bg-slate-950/30 p-6 rounded-[2rem] border border-white/5 space-y-3">
                        <h5 className="font-extrabold text-white text-sm border-l-4 border-amber-500 pl-2 pr-2">{language === 'ar' ? '☎️ الاتصال والتسجيل:' : 'Contact:'}</h5>
                        <div className="text-xs text-slate-300 space-y-2">
                          <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                            <span className="block font-bold text-amber-300">{language === 'ar' ? 'أرقام المكتب الرسمية للاتصال:' : 'Contact bureau:'}</span>
                            <div className="flex flex-col gap-1.5 text-white text-sm mt-1">
                              <span className="bg-slate-950/30 px-3 py-1 rounded-lg border border-white/5">📞 0696789633</span>
                              <span className="bg-slate-950/30 px-3 py-1 rounded-lg border border-white/5">📞 0667910148</span>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-400">{language === 'ar' ? '🏢 شركة عبعوب للسياحة والأسفار تسهر على خدمتكم وراحتكم طوال أشهر صيف 2026.' : 'Aboub Travel à votre service.'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Book Action Button */}
                    <div className="pt-2">
                      <button 
                        onClick={handleCustomBook}
                        className="w-full text-lg font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-4 rounded-2xl text-center shadow-xl transition-all hover:scale-101 duration-300 cursor-pointer"
                      >
                        {language === 'ar' 
                          ? `💬 احجز رحلة ${title} الآن مباشرة عبر الواتساب`
                          : `💬 Réserver la formule de ${title} sur WhatsApp`}
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
