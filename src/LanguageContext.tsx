import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageType = 'ar' | 'fr' | 'en';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Rich multilingual translation dictionaries
const translations: Record<LanguageType, Record<string, string>> = {
  ar: {
    // Brand & General
    "brand.name": "عبعوب للسياحة",
    "brand.subtitle": "Aboub Travel & Tourism",
    "brand.about": "وكالة عبعوب للسياحة والأسفار بتقرت - تقديم أرقى عروض العمرة، السياحة الدولية (تركيا وتونس ومصر)، السياحة المحلية بالجزائر (جيجل وبجاية)، حجوزات تذاكر الطيران المعتمدة عالمياً واستمارات الفيزا.",
    "footer.rights": "جميع الحقوق محفوظة لصيف 2026 © وكالة عبعوب للأسفار.",
    "footer.quickLinks": "روابط سريعة",
    "footer.contact": "اتصل بنا",
    "footer.address": "حي عياد الشارع رقم 001، وراء بلدية تبسبست، تقرت، الجزائر",

    // Navigation and Tabs
    "nav.home": "الرئيسية",
    "nav.intl": "رحلات دولية",
    "nav.local": "رحلات داخلية",
    "nav.services": "خدماتنا",
    "nav.flights": "حجز الطيران",
    "nav.hotels": "حجز الفنادق",
    "nav.visa": "ملفات التأشيرة",
    "nav.umrah": "العمرة 2026",
    
    // Core Buttons
    "btn.quickBook": "حجز سريع",
    "btn.phone": "اتصال مباشر",
    "btn.allInclusive": "نظام شامل كلياً",
    "btn.exploreProgram": "استكشف البرنامج والسعر ←",
    "btn.backHome": "العودة للرئيسية ←",
    "btn.whatsappBook": "احجز العرض الآن عبر الواتساب",
    "btn.bookingSteps": "عرض خطوات التسجيل والتأكيد",
    "btn.submit": "إرسال الطلب الآن",
    "btn.chatWithAi": "تحدث مع المساعد الذكي لهاتف الوكالة",
    "btn.faq": "الأسئلة الشائعة",

    // Banner & Main Hero
    "hero.welcome": "مرحباً بكم في وكالة عبعوب للأسفار والسياحة",
    "hero.badge": "عروض صيف 2026 الحصرية ✈️",
    "hero.title": "بوابتك لاستكشاف العالم بأسعار تنافسية",
    "hero.subtitle": "نأخذكم في رحلات من العمر إلى أجمل الشواطئ، عروض العمرة المريحة، رحلات داخلية رائعة، وحجز مباشر للطيران والفنادق.",
    
    // Categories Home headings
    "home.services.title": "خدماتنا المتميزة وعروضنا الحالية ⚜️",
    "home.services.subtitle": "نوفر لكم تجارب سفر متكاملة ومصممة بأعلى مستويات الجودة والاحترافية",
    "home.testimonials.title": "آراء وتجارب مسافرينا الأوفياء 💬",
    "home.testimonials.subtitle": "نفخر بخدمة عائلاتنا الكريمة ومسافرينا طيلة مواسم السفر والاصطياف",
    "home.faq.title": "الأسئلة الشائعة والاستفسارات المكررة ❓",
    "home.faq.subtitle": "كل الإجابات التي تحتاج لمعرفتها حول حجز رحلتك وتجهيز ملفاتك",
    "home.info.title": "تعريف وكالة عبعوب للسياحة والأسفار ⚜️",
    "home.info.desc": "إن وكالة عبعوب للسياحة والأسفار هي الاسم الأسرع تألقاً والأكثر ثقة في تقديم الخدمات السياحية وخطوط الطيران بولاية تقرت (بلدية تبسبست الحبيبة). نسهر بكامل جهدنا على توفير البرامج المنظمة الممتعة والمريحة للعائلات والأصدقاء في تونس، تركيا، والجزائر الساحلية والوديان الخلابة بأسعار تنافسية ممتازة جداً.",

    // Tab Cards Info
    "card.intl.tag": "برامج سياحية دولية",
    "card.intl.title": "الرحلات والأسفار الدولية",
    "card.intl.desc": "استمتع بعطل صيفية استثنائية في أرقى المنتجعات السياحية في تركيا، تونس، ومصر مع وجبات كاملة وجولات ترفيهية مميزة.",
    
    // Domestic Cards
    "card.local.tag": "رحلات عائلية محلية",
    "card.local.title": "السياحة الداخلية بالجزائر",
    "card.local.desc": "رحلات ممتعة في حافلات سياحية مكيفة وفخمة إلى لؤلؤة الشرق جيجل وعروس الساحل بجاية مع أحسن المنشطين للمرح والمتعة.",
    
    // Umrah Cards
    "card.umrah.tag": "العمرة والزيارة",
    "card.umrah.title": "موسم العمرة لعام 2026",
    "card.umrah.desc": "برامج عمرة فاخرة واقتصادية مع مرافقة دينية مستمرة، فنادق قريبة من الحرمين الشريفين، ورحلات مباشرة لراحة المعتمرين.",
    
    // Flights Cards
    "card.flights.tag": "حجوزات طيران فورية",
    "card.flights.title": "تذاكر الطيران للرحلات",
    "card.flights.desc": "تأكيد فوري لحجوزات الطيران لجميع شركات الطيران المعتمدة محلياً ودولياً وبأسعار مميزة تلائم رغباتكم تماماً لأي وجهة.",
    
    // Hotels Cards
    "card.hotels.tag": "حجوزات فندقية مضمونة",
    "card.hotels.title": "الفنادق والشقق السياحية",
    "card.hotels.desc": "نوفر لكم غرفاً فندقية راقية وشققاً عائلية عصرية مكيفة تضمن لكم أعلى مستويات الخصوصية والراحة طيلة فترة عطلتكم المميزة.",

    // Visa Cards
    "card.visa.tag": "تأشيرات وملفات معتمدة",
    "card.visa.title": "معالجة وتجهيز ملفات الفيزا",
    "card.visa.desc": "تجهيز وتعبئة الاستمارات ومراجعة دقيقية لملفات التأشيرة لجميع الدول لضمان قبول مضمون لطلباتكم بنسبة نجاح قياسية.",

    // Quick Book Modal Form
    "modal.title": "الاستفسار والحجز السريع والمريح ⚡",
    "modal.desc": "أدخل معلومات الاتصال ونوع الطلب، وسيقوم فريق وكالة عبعوب بالتواصل معك فوراً لتأكيد الحجز وتجهيز الأوراق المطلوبة.",
    "modal.name": "الاسم الكامل للفوج / الشخص الرئيسي:",
    "modal.phone": "رقم الهاتف الشخصي المتاح والنشط:",
    "modal.type": "حدد نوع العرض أو الخدمة المطلوبة:",
    "modal.date": "تاريخ الانطلاق / السفر المفضل:",
    "modal.notes": "أي ملاحظات إضافية أو تفاصيل الفوج (عدد الأطفال، الغرف):",
    "modal.success": "🎉 تم إرسال طلب حجزك بنجاح! سيقوم مستشار وكالة عبعوب بالاتصال بك خلال دقائق لتأكيد المعطيات وسعر الرحلة.",
    "modal.required": "يرجى تعبئة الحقول الأساسية (الاسم والهاتف)",

    // Flights View
    "flight.search.title": "محرك الاستعلام وحجز تذاكر الطيران الفوري ✈️",
    "flight.search.subtitle": "وكالة عبعوب معتمدة في حجز التذاكر عبر أحدث أنظمة الحجز العالمية لجميع الخطوط الجوية الدولية والمحلية بأسعار تنافسية.",
    "flight.from": "مطار المغادرة (الذهاب من):",
    "flight.to": "مطار الوصول (الوجهة إلى):",
    "flight.date.out": "تاريخ الذهاب:",
    "flight.date.ret": "تاريخ الإياب (اختياري):",
    "flight.class": "درجة السفر:",
    "flight.passengers": "عدد المسافرين:",
    "flight.class.eco": "الدرجة الاقتصادية (Economy)",
    "flight.class.biz": "درجة رجال الأعمال (Business)",
    "flight.class.first": "الدرجة الأولى (First Class)",
    "flight.whatsappLink": "استفسر عن الأسعار المتوفرة لرحلتك المحددة فوراً عبر واتساب",

    // Hotels View
    "hotel.search.title": "حجز الفنادق الفاخرة والشقق العائلية الممتازة 🏨",
    "hotel.search.subtitle": "وكالة عبعوب تضمن لكم إقامة مريحة وآمنة في أفضل الفنادق بتونس، تركيا، مصر والجزائر بأسعار مدروسة تناسب ميزانيتكم.",
    "hotel.dest": "حدد المدينة أو الوجهة الفندقية:",
    "hotel.rooms": "عدد الغرف والشقق المطلوبة:",
    "hotel.nights": "عدد الليالي المتوقعة:",
    "hotel.checkin": "تاريخ الدخول:",
    "hotel.guests": "عدد النزلاء البالغين والأطفال:",

    // Visa View
    "visa.title": "خدمة معالجة وتعبئة ملفات الفيزا والتأشيرات المضمونة 📑",
    "visa.subtitle": "نتولى عنك عناء تجهيز ومراجعة ملفات الفيزا، وتأمين موعد البصمة لطلب تأشيرة السفر لمختلف الدول.",
    "visa.country": "اختر بلد السفر المطلوب للحصول على التأشيرة:",
    "visa.turkey": "تأشيرة تركيا (العادية والإلكترونية) 🇹🇷",
    "visa.tunisia": "وثائق السفر لتونس الشقيقة 🇹🇳",
    "visa.schengen": "تأشيرة شينغن الأوروبية 🇪🇺",
    "visa.saudi": "تأشيرات المملكة العربية السعودية 🇸🇦",
    "visa.file.req": "المستندات المطلوبة والملف النموذجي:",

    // AI Chat Bubble
    "ai.chat.title": "مساعد عبعوب الذكي للأسفار 🤖",
    "ai.chat.subtitle": "متصل ومستعد للإجابة عن مواعيد الرحلات والأسعار والخدمات",
    "ai.chat.placeholder": "اكتب سؤالك هنا عن عروض تونس أو مصر أو العمرة...",
    "ai.chat.welcome": "مرحباً بك مع مساعد وكالة عبعوب الذكي! كيف يمكنني مساعدتك في تخطيط عطلة صيف 2026 أو حجز رحلة العمرة اليوم؟"
  },
  fr: {
    // Brand & General
    "brand.name": "Aboub Travel",
    "brand.subtitle": "Aboub Travel & Tourisme",
    "brand.about": "Aboub Travel à Touggourt - Votre agence de confiance pour organiser les meilleurs voyages nationaux et internationaux, offres Omra confortables 2026, réservations de vols et hôtels aux meilleurs tarifs.",
    "footer.rights": "Tous droits réservés été 2026 © Agence Aboub Travel.",
    "footer.quickLinks": "Liens Rapides",
    "footer.contact": "Contactez-nous",
    "footer.address": "Quartier Ayad Rue N° 001, derrière la mairie de Tebesbest, Touggourt, Algérie",

    // Navigation and Tabs
    "nav.home": "Accueil",
    "nav.intl": "Vols Internationaux",
    "nav.local": "Voyages Nationaux",
    "nav.services": "Nos Services",
    "nav.flights": "Billets d'Avion",
    "nav.hotels": "Réservation d'Hôtels",
    "nav.visa": "Dossiers de Visa",
    "nav.umrah": "Omra 2026",

    // Core Buttons
    "btn.quickBook": "Réservation Rapide",
    "btn.phone": "Appelez Directement",
    "btn.allInclusive": "Formule All-Inclusive",
    "btn.exploreProgram": "Explorer le Programme & Prix ←",
    "btn.backHome": "Retour à l'Accueil ←",
    "btn.whatsappBook": "Réserver via WhatsApp Maintenant",
    "btn.bookingSteps": "Voir les Étapes d'Inscription",
    "btn.submit": "Envoyer la Demande",
    "btn.chatWithAi": "Parler avec l'Assistant Intelligent de l'Agence",
    "btn.faq": "FAQ",

    // Banner & Main Hero
    "hero.welcome": "Bienvenue chez Aboub Travel & Tourisme",
    "hero.badge": "Offres Exclusives été 2026 ✈️",
    "hero.title": "Votre Passerelle vers le Monde aux Meilleurs Prix",
    "hero.subtitle": "Nous vous emmenons dans des voyages de rêve vers de magnifiques plages, des offres de Omra confortables, des voyages nationaux, et des réservations de vols et hôtels.",

    // Categories Home headings
    "home.services.title": "Nos Services & Offres Actuelles ⚜️",
    "home.services.subtitle": "Expériences de voyage complètes, de qualité et gérées professionnellement",
    "home.testimonials.title": "Avis de nos fidèles voyageurs 💬",
    "home.testimonials.subtitle": "Fiers d'accompagner nos chères familles durant toutes les saisons d'été et de vacances",
    "home.faq.title": "Questions Fréquentes ❓",
    "home.faq.subtitle": "Toutes les réponses pour préparer au mieux vos vacances et vos dossiers",
    "home.info.title": "Qui est Aboub Travel ? ⚜️",
    "home.info.desc": "Aboub Travel est l'agence de voyage la plus fiable et la plus appréciée à Touggourt (Tebesbest). Nous faisons de notre mieux pour concevoir des circuits de voyage organisés, amusants et reposants pour familles et amis vers la Tunisie, la Turquie, l'Égypte ainsi que la côte algérienne, le tout au meilleur rapport qualité-prix du marché.",

    // Tab Cards Info
    "card.intl.tag": "Programmes Internationaux",
    "card.intl.title": "Voyages Internationaux de Rêve",
    "card.intl.desc": "Profitez d'un été inoubliable dans les stations balnéaires de Turquie, de Tunisie, et en Égypte avec formule All Inclusive.",
    
    // Domestic Cards
    "card.local.tag": "Excursions Nationales",
    "card.local.title": "Tourisme Interne en Algérie",
    "card.local.desc": "Magnifiques voyages en bus ultra-confortables et climatisés vers les belles plages de Jijel et Béjaïa avec d'excellents guides.",
    
    // Umrah Cards
    "card.umrah.tag": "Pélerinage & Visites",
    "card.umrah.title": "Saison de la Omra 2026",
    "card.umrah.desc": "Programmes de Omra de luxe et économiques avec vols directs et hôtels très proches du Haram pour votre totale sérénité spirituelle.",
    
    // Flights Cards
    "card.flights.tag": "Réservations de Vols Immédiates",
    "card.flights.title": "Billets d'Avion & Compagnies",
    "card.flights.desc": "Confirmation instantanée de billets sur toutes les compagnies aériennes nationales et internationales au meilleur tarif existant.",
    
    // Hotels Cards
    "card.hotels.tag": "Hôtels et Résidences de Confiance",
    "card.hotels.title": "Hôtels et Logements de Vacances",
    "card.hotels.desc": "Nous assurons des chambres d'hôtels prestigieuses et des appartements familiaux meublés et climatisés de grande qualité.",

    // Visa Cards
    "card.visa.tag": "Dossiers de Visa Validés",
    "card.visa.title": "Traitement de Dossiers et Rendez-vous",
    "card.visa.desc": "Remplissage professionnel des formulaires et révision rigoureuse de vos dossiers de visa pour maximiser le taux d'acceptation.",

    // Quick Book Modal Form
    "modal.title": "Réservation Rapide et Facile ⚡",
    "modal.desc": "Saisissez vos coordonnées de contact et de vol, notre équipe Aboub Travel vous contactera au plus vite pour finaliser.",
    "modal.name": "Nom complet du voyageur principal :",
    "modal.phone": "Numéro de téléphone fonctionnel :",
    "modal.type": "Type d'offre ou de service demandé :",
    "modal.date": "Date de départ souhaitée :",
    "modal.notes": "Notes supplémentaires (Enfants, types de chambres...) :",
    "modal.success": "🎉 Demande envoyée avec succès ! Un conseiller de l'agence Aboub Travel vous contactera bientôt.",
    "modal.required": "Veuillez remplir les informations obligatoires (Nom et Téléphone)",

    // Flights View
    "flight.search.title": "Recherche Intelligente de Billets d'Avion ✈️",
    "flight.search.subtitle": "Aboub Travel utilise les systèmes mondiaux les plus modernes pour réserver vos sièges sur toutes les compagnies aériennes au tarif optimal.",
    "flight.from": "Aéroport de départ :",
    "flight.to": "Aéroport d'arrivée :",
    "flight.date.out": "Date de départ :",
    "flight.date.ret": "Date de retour (Optionnel) :",
    "flight.class": "Classe de voyage :",
    "flight.passengers": "Nombre de passagers :",
    "flight.class.eco": "Classe Économique (Economy)",
    "flight.class.biz": "Classe Affaires (Business)",
    "flight.class.first": "Première Classe (First Class)",
    "flight.whatsappLink": "Consulter les tarifs disponibles pour vos vols via WhatsApp",

    // Hotels View
    "hotel.search.title": "Réservation Hôtelière et Appartements de Rêve 🏨",
    "hotel.search.subtitle": "Aboub Travel vous garantit un séjour sécurisé, accueillant et reposant au meilleur prix.",
    "hotel.dest": "Destination ou Nom de l'Hôtel :",
    "hotel.rooms": "Nombre de chambres / appartements :",
    "hotel.nights": "Nombre de nuits :",
    "hotel.checkin": "Date d'arrivée :",
    "hotel.guests": "Nombre de personnes installées (Adultes, enfants) :",

    // Visa View
    "visa.title": "Service Professionnel de Dossiers de Visas 📑",
    "visa.subtitle": "Nous gérons les démarches complexes, le remplissage des formulaires et la prise de rendez-vous pour de nombreux pays.",
    "visa.country": "Choisissez le pays de voyage souhaité :",
    "visa.turkey": "Visa Turquie (E-Visa ou Classique) 🇹🇷",
    "visa.tunisia": "Documents de voyage pour la Tunisie 🇹🇳",
    "visa.schengen": "Visa Schengen Européen 🇪🇺",
    "visa.saudi": "Visas pour l'Arabie Saoudite 🇸🇦",
    "visa.file.req": "Documents de dossier requis :",

    // AI Chat Bubble
    "ai.chat.title": "Assistant IA Aboub Travel 🤖",
    "ai.chat.subtitle": "Toujours disponible pour répondre à vos questions de tarifs et de voyages",
    "ai.chat.placeholder": "Posez vos questions sur la Tunisie, Égypte ou la Omra...",
    "ai.chat.welcome": "Bienvenue chez Aboub Travel ! Comment puis-je vous aider à planifier votre prochain voyage de rêve pour cet été 2026 ?"
  },
  en: {
    // Brand & General
    "brand.name": "Aboub Travel",
    "brand.subtitle": "Aboub Travel & Tourism",
    "brand.about": "Aboub Travel in Touggourt - Your premium gateway for organizing the best international and domestic vacation packages, 2026 comfortable Umrah trips, flights and hotel bookings at unbeatable costs.",
    "footer.rights": "All rights reserved summer 2026 © Aboub Travel Agency.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact Us",
    "footer.address": "Ayad Neighborhood, Street N° 001, behind Tebesbest Townhall, Touggourt, Algeria",

    // Navigation and Tabs
    "nav.home": "Home",
    "nav.intl": "International Travel",
    "nav.local": "National Trips",
    "nav.services": "Our Services",
    "nav.flights": "Flight Booking",
    "nav.hotels": "Hotel Reservation",
    "nav.visa": "Visa Applications",
    "nav.umrah": "Umrah 2026",

    // Core Buttons
    "btn.quickBook": "Quick Booking",
    "btn.phone": "Call Direct",
    "btn.allInclusive": "All Inclusive Plan",
    "btn.exploreProgram": "Explore Schedule & Price ←",
    "btn.backHome": "Back to Home ←",
    "btn.whatsappBook": "Book on WhatsApp Now",
    "btn.bookingSteps": "Show Registration Steps",
    "btn.submit": "Submit Booking Request",
    "btn.chatWithAi": "Chat with our smart Travel Assistant",
    "btn.faq": "FAQ",

    // Banner & Main Hero
    "hero.welcome": "Welcome to Aboub Travel & Tourism",
    "hero.badge": "Exclusive Summer 2026 Flight Packages ✈️",
    "hero.title": "Your Gateway to the World at Competitive Prices",
    "hero.subtitle": "We take you on gorgeous journeys to pristine beaches, customized cozy Umrah spiritual trips, domestic beach breaks, flight reservations and hotel bookings.",

    // Categories Home headings
    "home.services.title": "Our Premier Services & Active Offers ⚜️",
    "home.services.subtitle": "We bring you tailored travel experiences designed with the highest standards of quality",
    "home.testimonials.title": "Client Reviews & Travel Stories 💬",
    "home.testimonials.subtitle": "Proudly assisting our beautiful families and tourists through travel seasons",
    "home.faq.title": "Frequently Asked Questions ❓",
    "home.faq.subtitle": "Everything you need to know about preparing tickets, applications, and bookings",
    "home.info.title": "About Aboub Travel ⚜️",
    "home.info.desc": "Aboub Travel & Tourism is the leading and most trusted name for tour operators and flights in Touggourt (Tebesbest region). We work around the clock to bring you safe, guided and entertaining family tours to Tunisia, Turkey, Egypt, as well as Algerian coastlines at top market rates.",

    // Tab Cards Info
    "card.intl.tag": "International Programs",
    "card.intl.title": "International Flights & Packages",
    "card.intl.desc": "Unwind in the top-tier luxury beach resorts of Turkey, Tunisia, and Egypt with comprehensive meal plans and active guided schedule.",
    
    // Domestic Cards
    "card.local.tag": "Guided Domestic Tours",
    "card.local.title": "Algerian Local Tourism",
    "card.local.desc": "Relaxing and delightful travel in premium modern air-conditioned buses to beautiful pristine coasts of Jijel and Bejaia with great guides.",
    
    // Umrah Cards
    "card.umrah.tag": "Umrah & Spiritual Travel",
    "card.umrah.title": "Holy Umrah Season 2026",
    "card.umrah.desc": "Premium & economical Umrah directories. Close hotels near Haram, active transfers, and direct flights for absolute comfort.",
    
    // Flights Cards
    "card.flights.tag": "Instant Flight Ticket Issuing",
    "card.flights.title": "Airline Flight Tickets",
    "card.flights.desc": "Immediate ticket booking confirmation for domestic and international carriers at the best rates in Touggourt.",
    
    // Hotels Cards
    "card.hotels.tag": "Secured Hotel Deals",
    "card.hotels.title": "Cozy Hotels & Apartments",
    "card.hotels.desc": "Exceptional private rooms and fully furnished cozy air-conditioned family apartments overlooking beautiful sites.",

    // Visa Cards
    "card.visa.tag": "Handled Visa Files",
    "card.visa.title": "Visa Review and Forms Filling",
    "card.visa.desc": "Stress-free form filling, document list audit, and secure biometrics schedules for all travels worldwide.",

    // Quick Book Modal Form
    "modal.title": "Quick & Easy Travel Inquiry ⚡",
    "modal.desc": "Put your contact info and travel dates below, and Aboub Travel representatives will call you right back with details and booking.",
    "modal.name": "Full passenger / Group name:",
    "modal.phone": "Active phone number:",
    "modal.type": "Select travel package / service:",
    "modal.date": "Preferred flight departure date:",
    "modal.notes": "Any extra notes (Kids count, room configurations...):",
    "modal.success": "🎉 Inquiry submitted successfully! Aboub Travel specialists will call you within a few minutes to finalize.",
    "modal.required": "Please type the required fields first (Name & Phone)",

    // Flights View
    "flight.search.title": "Instant Airline Booking Engine ✈️",
    "flight.search.subtitle": "Aboub Travel utilizes advanced flight search tools to find and secure seats on local and international airlines at unbeatable prices.",
    "flight.from": "Departure Airport:",
    "flight.to": "Arrival Airport (Destination):",
    "flight.date.out": "Outgoing Travel Date:",
    "flight.date.ret": "Return Date (Optional):",
    "flight.class": "Cabin Class:",
    "flight.passengers": "Passengers:",
    "flight.class.eco": "Economy Class",
    "flight.class.biz": "Business Class",
    "flight.class.first": "First Class",
    "flight.whatsappLink": "Ask for instant flight pricing estimation on WhatsApp",

    // Hotels View
    "hotel.search.title": "Global Luxury Hotels & Apartments 🏨",
    "hotel.search.subtitle": "Aboub Travel guarantees absolute privacy, comfort and best prices in Tunisia, Turkey, Egypt and Algeria.",
    "hotel.dest": "Destination / Hotel Name:",
    "hotel.rooms": "Rooms / Apartments count:",
    "hotel.nights": "Nights duration:",
    "hotel.checkin": "Check-in Date:",
    "hotel.guests": "Guests count (Adults, children):",

    // Visa View
    "visa.title": "Expert Visa Application Assistance 📑",
    "visa.subtitle": "We handle the complicated document checks, online form-filling, appointments, and guides for stress-free approvals.",
    "visa.country": "Select your travel destination country for visa instruction:",
    "visa.turkey": "Turkey Travel Visa (E-Visa / Regular) 🇹🇷",
    "visa.tunisia": "Tunisia Travel Document Guides 🇹🇳",
    "visa.schengen": "European Schengen Visa 🇪🇺",
    "visa.saudi": "Kingdom of Saudi Arabia Visas 🇸🇦",
    "visa.file.req": "Required application documents:",

    // AI Chat Bubble
    "ai.chat.title": "Aboub Travel AI Assistant 🤖",
    "ai.chat.subtitle": "Online & ready to guide your dates, flights and holiday plans",
    "ai.chat.placeholder": "Type your query about Turkey, flights, or Umrah...",
    "ai.chat.welcome": "Hello! Welcome to Aboub Travel Smart Assistant. How can I help you plan your Summer 2026 holiday or Umrah packages today?"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aboub_lang') as LanguageType;
      if (saved && ['ar', 'fr', 'en'].includes(saved)) {
        return saved;
      }
    }
    return 'ar'; // Default language is Arabic
  });

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aboub_lang', lang);
    }
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = dir;
      document.documentElement.lang = language;
    }
  }, [language, dir]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['ar']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      <div dir={dir} className={language === 'ar' ? 'font-sans' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
