import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  RefreshCw, 
  ArrowLeft, 
  Phone, 
  Volume2, 
  FileText, 
  Plane, 
  Hotel, 
  Compass, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AiChatBubble() {
  const { t, language, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcoming tourism guidance message matching the language
  useEffect(() => {
    if (messages.length === 0 || messages[0].id === 'welcome') {
      const getWelcomeMessage = () => {
        if (language === 'fr') {
          return 'Bienvenue chez Aboub Travel Assistant ! ✈️🗺️\n\nJe suis là pour vous aider instantanément :\n• ✈️ **Billets d\'avion & Franchises bagages**\n• 🏨 **Meilleures recommandations d\'hôtels**\n• 📝 **Dossiers de visa & Prises de rdv**\n• 💰 **Tarifs des séjours Turquie, Tunisie et Omra**\n\nPosez votre question ci-dessous !';
        }
        if (language === 'en') {
          return 'Welcome to Aboub Travel Smart Assistant! ✈️🗺️\n\nI am here to guide you instantly with:\n• ✈️ **Flight booking & luggage allowances**\n• 🏨 **Premium cozy hotel recommendations**\n• 📝 **Visa checklist and forms preparation**\n• 💰 **Latest Umrah, Turkey & Tunisia tour pricing**\n\nType your query below!';
        }
        return 'مرحباً بك في المساعد السياحي الذكي لوكالة عبعوب! ✈️🗺️\n\nأنا هنا لخدمتك ومرافقتك فورياً في:\n• ✈️ **حجوزات الطيران والأوزان المقبولة**\n• 🏨 **أفضل ترشيحات الفنادق المتكاملة**\n• 📝 **ملفات التأشيرات (الفيزا) وتسهيل المواعيد**\n• 💰 **أسعار الباقات الحالية للعمرة وتركيا وتونس**\n\nاكتب استفسارك بالأسفل لبدء الحديث!';
      };

      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: getWelcomeMessage(),
          timestamp: new Date()
        }
      ]);
    }
  }, [language]);

  // Handle tooltip auto-hide after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isOpen]);

  // Specialized built-in offline travel intelligence fallback in 3 languages
  const getOfflineResponseByKeyword = (userInput: string): string => {
    const text = (userInput || "").toLowerCase().trim();
    const has = (keywords: string[]) => keywords.some(k => text.includes(k));

    if (language === 'fr') {
      if (has(["salut", "bonjour", "hello", "coucou", "hi"])) {
        return `Bonjour et bienvenue chez Aboub Travel ! 👋✨\nJe suis votre assistant de voyage virtuel. Comment puis-je vous aider aujourd'hui ?`;
      }
      if (has(["vol", "avion", "ticket", "billet", "bagage", "poids", "flight"])) {
        return `### ✈️ Informations sur les vols :\n• **Air Algérie** : Bagage en soute de 23 kg (ou plus selon la classe) + 10 kg en bagage à main.\n• **Turkish Airlines** : Bagage en soute de 23 kg + 8 kg de cabine avec service repas à bord.\n• **Conseil** : Réservez 6 à 8 semaines à l'avance pour obtenir les meilleurs tarifs d'été.\n\n🚨 WhatsApp Service : **+213667910148** 🟢`;
      }
      if (has(["hotel", "chambre", "sejour", "appartement", "residence"])) {
        return `### 🏨 Recommandations d'hôtels :\n• **Istanbul** : Zone de *Taksim* pour le shopping, ou *Sultanahmet* pour le calme culturel en famille.\n• **Tunisie** : Complexes hôteliers All Inclusive à Hammamet ou Sousse pour des vacances relaxantes.\n\n📞 Réservation Directe : Contactez notre équipe au **+213667910148** !`;
      }
      if (has(["prix", "tarif", "combien", "offre", "package", "omra", "umrah"])) {
        return `### 💰 Nos tarifs phares Actuels :\n1. **Istanbul (Turquie)** : À partir de **129 000 DZD** (Vol + Hôtel 4* + Transferts + Tours).\n2. **Omra 2026** : À partir de **199 000 DZD** selon le standing des hôtels à La Mecque.\n3. **Tourisme National (Jijel/Béjaïa)** : À partir de **45 000 DZD** pour un hébergement confortable d'été.\n\n📱 Devis gratuit immédiat sur WhatsApp : **+213667910148**`;
      }
      return `Merci pour votre question ! Nos agents Aboub Travel de Touggourt sont disponibles pour vous répondre au mieux en appelant directement ou via WhatsApp au **+213667910148** 🟢`;
    }

    if (language === 'en') {
      if (has(["hello", "hi", "hey", "morning", "howdy"])) {
        return `Hello! Welcome to Aboub Travel & Tourism. How can I assist you with your holiday plans today? 👋✨`;
      }
      if (has(["flight", "ticket", "plane", "baggage", "weight", "airport"])) {
        return `### ✈️ Flight Details & Allowances:\n• **Air Algérie**: 23kg checked bag + 10kg hand baggage.\n• **Turkish Airlines**: 23kg checked bag + 8kg cabin bag with full catering.\n• **Tip**: Book 6-8 weeks prior to travel for top budget rates.\n\n🚨 Contact Booking Desk: **+213667910148** 🟢`;
      }
      if (has(["hotel", "room", "apartment", "stay", "accommodation"])) {
        return `### 🏨 Hotel Stays & Recommendations:\n• **Istanbul**: Recommend *Taksim Square* for shopping & city life, or *Sultanahmet* for historical sites.\n• **Tunisia**: All-Inclusive beach resorts at Hammamet or Sousse for ultimate family relaxation.\n\n📞 Secure Best Rates: Call or text us. **+213667910148**!`;
      }
      if (has(["price", "cost", "how much", "rate", "deal", "umrah", "omra"])) {
        return `### 💰 Current Premium Package Rates:\n1. **Istanbul (Turkey)**: From **129,000 DZD** (Flight + 4-star Hotel + Transfers + Guided Excursions).\n2. **Holy Umrah 2026**: Rates from **199,000 DZD** depending on hotel distance.\n3. **Domestic Tours (Jijel & Bejaia)**: From **45,000 DZD** for summer accommodation.\n\n🟢 Get a custom price estimation on WhatsApp: **+213667910148**`;
      }
      return `Thank you for your inquiry! Our agents at Aboub Travel (Touggourt) are happy to assist you. Call or WhatsApp us at **+213667910148** 🟢`;
    }

    // Default Arabic fallback responses
    if (has(["سلام", "مرحبا", "مرحباً", "أهلاً", "اهلا", "صباح", "مساء", "كيف حال", "شكون"])) {
      return `أهلاً وسهلاً بك في الدردشة الذكية لوكالة عبعوب للأسفار! 👋✨\nأنا مستشارك الخاص، جاهز للرد على كافة أسئلتك حول السفر والأسعار والحجوزات والمواعيد. كيف أستطيع خدمتك اليوم؟`;
    }

    if (has(["طيران", "تذكرة", "تيكيت", "طائرة", "طيارة", "خطوط", "الأمتعة", "الوزن", "ticket", "flight", "airlines"])) {
      return `### ✈️ معلومات الطيران والأوزان للجزائريين:\n• **الخطوط الجزائرية**: حقيبة 23 كغ للمخزن (أو حقيبتان حسب الدرجة) + 10 كغ للحقيبة اليدوية في المقصورة.\n• **الخطوط التركية**: حقيبة 23 كغ + حقيبة يد 8 كغ مع الوجبات الفخمة والرحلات المباشرة.\n• **نصيحة**: يرجى الحجز قبل السفر بـ 6 إلى 8 أسابيع لضمان باقة أسعار مخفضة وتوفير التكاليف.\n\n🚨 **لحساب سعر تذكرة مؤكد لرحلتك وتأكيد الحجز ومواعيد الرحلات**: تواصل معنا مباشرة على الواتساب: **0667910148** 🟢`;
    }

    if (has(["فندق", "فنادق", "إقامة", "اقامة", "سكن", "شقة", "شقق", "hotel", "hotels", "accommodation"])) {
      return `### 🏨 ترشيحات الفنادق الأنسب لميزانيتكم:\n• **إسطنبول**: ننصح بـ **منطقة تقسيم** للتسوق والحركة والشباب، أو **منطقة السلطان أحمد** للمعالم التاريخية والهدوء العائلي.\n• **تونس**: نوصي بالمنتجعات البحرية العائلية الشاملة (All Inclusive) في تونس الحمامات لراحة واستجمام متميز.\n\n📞 **للحصول على خصومات حصرية تفوق أسعار بوكينغ للفنادق**: اتصل أو راسلنا بالتواريخ المطلوبة: **0667910148**!`;
    }

    if (has(["فيزا", "تأشيرة", "تاشيرة", "ملف", "شينغن", "gateway", "globe", "visa"])) {
      return `### 📝 متطلبات وشروط ملفات الفيزا للجزائريين:\n1. **تأشيرة تركيا 🇹🇷**:\n   - **الفيزا الإلكترونية (eVisa)**: متاحة فورياً لمن أعمارهم تحت 15 سنة أو تزيد عن 35 سنة بشرط توفر فيزا شينغن أو أمريكية صالحة ومستعملة.\n   - **الفيزا العادية (C1 الملصقة)**: تتطلب حجز موعد عبر Gateway Globe. الملف: جواز سفر + الكشف البنكي بالدينار والأورو + شهادة عمل أو سجل تجاري.\n2. **تأشيرة دبي 🇦🇪**: إلكترونية وتصدر في 24 إلى 48 ساعة فقط بضمان قبول فوري. الملف: نسخة لجواز سفرك وصورة شخصية.\n\n🟢 **استشارتك فوراً**: راسل خبير التأشيرات بالواتساب لتوجيه ملفك: **0667910148**`;
    }

    if (has(["سعر", "أسعار", "اسعار", "ثمن", "شحال", "تكلفة", "بكم", "العمرة", "عمرة", "العمره", "باقة", "عرض", "عروض", "price", "prices", "rates"])) {
      return `### 💰 أسعار باقات السفر الحالية لدى وكالة عبعوب:\n1. **باقة إسطنبول (تركيا) 🇹🇷**: **129,000 دج** شاملة تذكرة الطائرة، فندق 4 نجوم فطور، 5 جولات ومرشد سياحي مرافق!\n2. **عروض العمرة المباشرة 🕋**: بأسعار تبدأ من **199,000 دج** حسب البعد وفندق مكة والمدينة، تشتمل على رخص التأشيرة والتذاكر المباشرة.\n3. **رحلات جيجل وبجاية الداخلية 🏖️**: شقق عائلية فخمة ومكيفة تطل مباشرة على البحر بسعر يبدأ من **45,000 دج**.\n\n📞 **احصل على تسعيرة دقيقة وعرض تفصيلي فوراً**: أرسل عدد المسافرين والموعد المفضل لفريقنا على الواتساب: **0667910148** وسيوافوك بالتفاصيل فورا!`;
    }

    return `مرحباً بك مع مستشار عبعوب للسياحة والأسفار! ✈️\nنحن هنا للإجابة على كامل استفساراتكم بخصوص تذاكر الطيران، الأوراق والمستندات الخاصة بالتأشيرات، وحجوزات الفنادق العائلية والرحلات السياحية المنظمة لتركيا وتونس والجزائر.\n\nيرجى إرسال سؤالك مباشرة هنا أو يمكنك مكاملة مبيعات المساعد السريع عبر هاتف الوكالة: **0667910148** 🟢`;
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsLoading(true);

    let streamResult = "";
    let success = false;

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages.concat(userMsg).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.reply) {
          streamResult = data.reply;
          success = true;
        }
      }
    } catch (err: any) {
      console.warn('[AiChatBubble Client] Server request failed:', err);
    }

    if (success && streamResult) {
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        role: 'assistant',
        content: streamResult,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
    } else {
      const fallbackPrefix = language === 'ar' 
        ? "*(مستشار عبعوب الذكي الاحتياطي)* 🤖✨\n\n" 
        : `*(Aboub Travel Bot Alternate)* 🤖✨\n\n`;
      const offlineAnswer = getOfflineResponseByKeyword(textToSend);
      
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        role: 'assistant',
        content: fallbackPrefix + offlineAnswer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
    }

    setIsLoading(false);
  };

  const handleQuickQuestion = (text: string) => {
    handleSendMessage(text);
  };

  const quickQuestions = [
    { 
      label: language === 'ar' ? '💰 أسعار الباقات والعمرة' : language === 'fr' ? '💰 Tarifs Voyages' : '💰 Tour Tariffs', 
      query: language === 'ar' ? 'ما هي أسعار الباقات الحالية للعمرة وتركيا؟' : 'Quels sont les tarifs des offres Turquie et Omra ?'
    },
    { 
      label: language === 'ar' ? '📝 متطلبات تأشيرة تركيا' : language === 'fr' ? '📝 Visa Turquie' : '📝 Turkey Visa docs', 
      query: language === 'ar' ? 'ما هي الأوراق المطلوبة لفيزا تركيا للجزائريين؟' : 'Quels sont les documents requis pour le visa de la Turquie ?'
    },
    { 
      label: language === 'ar' ? '✈️ أوزان وحجوزات الطيران' : language === 'fr' ? '✈️ Bagages & Vols' : '✈️ Plane baggage info', 
      query: language === 'ar' ? 'كم الوزن المسموح به في الخطوط الجزائرية؟' : 'Quel est le poids autorisé pour les bagages Air Algérie ?'
    },
  ];

  return (
    <div className={`fixed bottom-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} z-50 flex flex-col items-end`} id="floating-ai-assistant">
      <AnimatePresence>
        
        {/* Invitation Glow Tooltip Indicator */}
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.9 }}
            className={`mb-3 mr-1 bg-gradient-to-tr from-rose-500 to-orange-500 text-white text-xs font-black px-4 py-2.5 rounded-2xl shadow-xl border border-white/20 select-none flex items-center gap-2 max-w-xs cursor-pointer`}
            onClick={() => setIsOpen(true)}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{t('ai.chat.title')} 🤖✈️</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }} 
              className="p-0.5 hover:bg-white/10 rounded-md transition cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}

        {/* Chat Mini Window Drawer Panel */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-[92vw] sm:w-[410px] h-[550px] max-h-[85vh] bg-slate-950/95 dark:bg-slate-950/98 border border-white/15 dark:border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden mb-4 relative"
          >
            {/* Soft Ambient Background Blur lights */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/15 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-16 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Chat header panel */}
            <div className="px-5 py-4 bg-gradient-to-tr from-rose-500 to-orange-500 text-white flex justify-between items-center relative z-10 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center relative shadow-inner">
                  <Bot className="w-5 h-5 text-white animate-pulse" />
                  <span className="absolute -bottom-0.5 -left-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-rose-500 rounded-full"></span>
                </div>
                <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <h4 className="font-black text-sm">{t('ai.chat.title')}</h4>
                  <p className="text-[10px] opacity-85 font-semibold">{t('ai.chat.subtitle')} ⚡</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/15 rounded-xl transition cursor-pointer"
                title="Exit"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat messages viewer body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-white/10 select-text relative z-10">
              
              {messages.map((msg) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div key={msg.id} className={`flex gap-2.5 max-w-[85%] ${isAssistant ? 'self-start' : 'self-end flex-row-reverse'}`}>
                    
                    {/* Avatar icon */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border text-[9px] uppercase font-black ${
                      isAssistant 
                        ? 'bg-slate-900 border-white/10 text-rose-400' 
                        : 'bg-rose-500 border-rose-400/20 text-white'
                    }`}>
                      {isAssistant ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    </div>

                    {/* Balloon body message */}
                    <div className={`p-3 md:p-3.5 rounded-2xl leading-relaxed text-xs md:text-[13px] whitespace-pre-wrap ${dir === 'rtl' ? 'text-right' : 'text-left'} ${
                      isAssistant
                        ? 'bg-slate-900/80 text-slate-200 border border-white/5 rounded-tr-none'
                        : 'bg-rose-500 text-white rounded-tl-none font-bold'
                    }`}>
                      {msg.content.includes("مستشار") && isAssistant && (
                        <div className="mb-1.5 text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-amber-400" />
                          <span>Aboub AI Local Backup</span>
                        </div>
                      )}

                      {/* Pretty format lines */}
                      {msg.content.split('\n').map((line, lIdx) => {
                        const cleanLine = line.trim();
                        if (cleanLine.startsWith("•") || cleanLine.startsWith("-") || cleanLine.startsWith("*")) {
                          return (
                            <div key={lIdx} className="flex gap-1.5 mt-1 first:mt-0 pr-1">
                              <span className="text-rose-400 shrink-0 select-none">•</span>
                              <p className="flex-1 text-[11px] md:text-xs text-slate-300">{cleanLine.replace(/^[•\-\*]\s*/, "")}</p>
                            </div>
                          );
                        }

                        if (cleanLine.startsWith("###")) {
                          return (
                            <h5 key={lIdx} className="font-extrabold text-rose-400 text-xs mt-2.5 mb-1 first:mt-0">
                              {cleanLine.replace(/^###\s*/, "")}
                            </h5>
                          );
                        }

                        return (
                          <p key={lIdx} className="mt-0.5 first:mt-0 font-medium">
                            {cleanLine}
                          </p>
                        );
                      })}
                      
                      <span className={`block text-[8px] mt-1.5 text-left ${isAssistant ? 'text-slate-500' : 'text-rose-200'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                  </div>
                );
              })}

              {/* Loader */}
              {isLoading && (
                <div className="flex gap-2.5 self-start max-w-[85%]">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 animate-spin text-rose-400 animate-spin-slow">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900/60 text-slate-300 rounded-tr-none border border-white/5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick proposal chips */}
            <div className="px-4 pb-2 pt-1 border-t border-white/5 bg-slate-950/40 relative z-10">
              <p className={`text-[10px] text-slate-400 ${dir === 'rtl' ? 'text-right' : 'text-left'} mb-1.5 font-bold`}>
                {language === 'ar' ? 'مواضيع سريعة:' : 'Sujets rapides / Quick topics:'}
              </p>
              <div className="flex flex-wrap gap-1.5 justify-start">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(q.query)}
                    className="text-[10px] font-bold px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-slate-200 hover:text-white transition-all cursor-pointer whitespace-nowrap active:scale-95"
                    disabled={isLoading}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat footer text area and submit button */}
            <div className="p-3 border-t border-white/10 bg-slate-900/90 relative z-10">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder={t('ai.chat.placeholder')}
                  className={`flex-1 px-3 py-2 bg-slate-950/80 border border-white/5 focus:border-rose-500/30 outline-none rounded-xl text-xs text-white placeholder-slate-400/80 transition ${
                    dir === 'rtl' ? 'text-right' : 'text-left'
                  }`}
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage()}
                  className={`p-2.5 rounded-xl bg-gradient-to-tr from-rose-500 to-orange-500 text-white shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading || !inputMessage.trim()}
                  title="Send"
                >
                  <Send className={`w-3.5 h-3.5 transform ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Direct WhatsApp assist option */}
              <div className={`mt-2 flex items-center justify-between text-[9px] text-slate-500 border-t border-white/5 pt-1.5 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
                <span>Touggourt Center: **0667910148**</span>
                <a 
                  href="https://wa.me/213667910148"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-bold hover:underline flex items-center gap-0.5"
                >
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* Main floating bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-full bg-gradient-to-tr from-rose-500 via-rose-600 to-orange-500 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-rose-500/30 relative z-50 cursor-pointer select-none border border-white/20"
        title="Aboub AI Assistant"
        id="floating-messenger-bubble"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border border-rose-500 animate-ping opacity-40"></span>
        )}
        
        {isOpen ? (
          <X className="w-6 h-6 text-white animate-fade-in" />
        ) : (
          <Bot className="w-6 h-6 text-white animate-bounce-slow" />
        )}
      </button>

    </div>
  );
}
