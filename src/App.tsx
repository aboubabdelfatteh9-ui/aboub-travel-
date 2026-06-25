import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import IntlView from './components/IntlView';
import LocalView from './components/LocalView';
import ServicesView from './components/ServicesView';
import UmrahView from './components/UmrahView';
import FlightsView from './components/FlightsView';
import HotelsView from './components/HotelsView';
import VisaView from './components/VisaView';
import Footer from './components/Footer';
import QuickBookModal from './components/QuickBookModal';
import AiChatBubble from './components/AiChatBubble';
import AdminControlPanel from './components/AdminControlPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [quickBookOpen, setQuickBookOpen] = useState<boolean>(false);
  
  // Admin identity session flags
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aboub_admin_mode') === 'true';
    }
    return false;
  });
  
  // Custom states for sharing service inquiries
  const [quickTrip, setQuickTrip] = useState<string>('تركيا - اسطنبول');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  // Handle initial tab load from URL parameters to keep SPA URLs indexable by Google
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam && ['home', 'intl', 'local', 'services', 'flights', 'hotels', 'visa', 'umrah'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, []);

  // Update dynamic SEO configurations whenever the active view changes
  useEffect(() => {
    // 1) Replace all page titles with: Aboub Travel | Agence de Voyage et Tourisme
    document.title = "Aboub Travel | Agence de Voyage et Tourisme";

    // 2) Define rich bilingue meta descriptions for SEO
    const descriptions: Record<string, string> = {
      home: "وكالة عبعوب للسياحة والأسفار بالجزائر (تقرت) - رائدتكم في تنظيم أفضل المزارات والرحلات السياحية الدولية والمحلية، عروض العمرة الفاخرة لعام 2026، حجز فوري للفنادق وتذاكر الطيران بأفضل الأسعار المتاحة.",
      intl: "خطط لرحلتك الدولية القادمة مع وكالة عبعوب. برامج سياحية متكاملة إلى تركيا (إسطنبول)، تونس (سوسة)، ومصر (شرم الشيخ صيف 2026) شاملة الإقامة والطيران والخدمات الترفيهية.",
      local: "السياحة الداخلية بالجزائر مع وكالة عبعوب. رحلات عائلية استجمامية ممتعة ومريحة إلى شواطئ جيجل وبجاية الخلابة على متن حافلات سياحية حديثة ومكيفة مع أفضل تأطير.",
      services: "تصفح خدمات وكالة عبعوب لضمان راحة تامة طوال رحلتكم: حجز طيران رسمي، حجز فنادق معتمدة عالمياً، معالجة وتجهيز ملفات الفيزا والتأشيرات لجميع الدول.",
      flights: "احجز تذاكر الطيران للرحلات الداخلية والدولية بأسعار تنافسية ممتازة وتأكيد فوري لدى جميع شركات الطيران المعتمدة عالمياً بالتعاون مع وكالتنا المتميزة.",
      hotels: "تأمين وحجز أفضل الفنادق والشقق العائلية العصرية المكيفة بتونس والجزائر ومختلف الوجهات السياحية العالمية لتوفير قمة الخصوصية والراحة لأفراد العائلة.",
      visa: "تجهيز وتعبئة استمارات طلبات الفيزا (تأشيرات تركيا وتونس وغيرها) مع مراجعة دقيقة للملفات وتأشيرات مضمونة لزيادة نسبة القبول ومنع الرفض.",
      umrah: "سجل اهتمامك الأولي لرحلة العمرة لعام 2026 مع عبعوب. برامج مميزة مصممة بحرص ومرافقة مرشدين ذوي كفاءة لضمان أداء المناسك في راحة تامة وطمأنينة."
    };

    const currentDesc = descriptions[activeTab] || descriptions.home;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', currentDesc);

    // Update Open Graph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', currentDesc);
    }

    // Update Twitter Description
    let twitterDesc = document.querySelector('meta[property="twitter:description"]');
    if (twitterDesc) {
      twitterDesc.setAttribute('content', currentDesc);
    }

    // Synchronize current state inside the browser URL, allowing crawlers to discover all pages
    const url = new URL(window.location.href);
    if (url.searchParams.get('tab') !== activeTab) {
      url.searchParams.set('tab', activeTab);
      window.history.pushState({}, '', url.toString());
    }
  }, [activeTab]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="app-root" className="min-h-screen flex flex-col relative pb-10">
      {/* Premium ambient reactive mesh background */}
      <div className="mesh-bg"></div>

      {/* Global Header */}
      <Header 
        activeTab={activeTab}
        navigateTo={navigateTo}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setQuickBookOpen={setQuickBookOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />

      {/* Main content body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 mt-4 md:mt-8">
        
        {activeTab === 'home' && (
          <HomeView 
            navigateTo={navigateTo}
            openFaq={openFaq}
            setOpenFaq={setOpenFaq}
            setQuickBookOpen={setQuickBookOpen}
          />
        )}

        {activeTab === 'intl' && (
          <IntlView />
        )}

        {activeTab === 'local' && (
          <LocalView />
        )}

        {activeTab === 'services' && (
          <ServicesView 
            setQuickTrip={setQuickTrip}
            setQuickBookOpen={setQuickBookOpen}
          />
        )}

        {activeTab === 'flights' && (
          <FlightsView navigateTo={navigateTo} />
        )}

        {activeTab === 'hotels' && (
          <HotelsView navigateTo={navigateTo} />
        )}

        {activeTab === 'visa' && (
          <VisaView navigateTo={navigateTo} />
        )}

        {activeTab === 'umrah' && (
          <UmrahView />
        )}

      </main>

      {/* Global Footer */}
      <Footer navigateTo={navigateTo} />

      {/* Quick Booking Modal */}
      <QuickBookModal 
        quickBookOpen={quickBookOpen}
        setQuickBookOpen={setQuickBookOpen}
        initialTrip={quickTrip}
      />

      {/* Floating Messenger-style AI Chatbot */}
      <AiChatBubble />

      {/* Secret Floating Smart Control Panel */}
      <AdminControlPanel isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

    </div>
  );
}
