import React, { useState } from 'react';
import { Phone, Menu, X, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import AgencyLogo from './AgencyLogo';
import { useLanguage, LanguageType } from '../LanguageContext';

interface HeaderProps {
  activeTab: string;
  navigateTo: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setQuickBookOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

export default function Header({
  activeTab,
  navigateTo,
  mobileMenuOpen,
  setMobileMenuOpen,
  setQuickBookOpen,
  darkMode,
  setDarkMode,
  isAdmin,
  setIsAdmin,
}: HeaderProps) {
  const { language, setLanguage, t, dir } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
  // Admin trigger states
  const [logoClicks, setLogoClicks] = useState<number[]>([]);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [typedPassword, setTypedPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);

  const languagesList = [
    { code: 'ar' as LanguageType, label: 'العربية', flag: '🇩🇿' },
    { code: 'fr' as LanguageType, label: 'Français', flag: '🇫🇷' },
    { code: 'en' as LanguageType, label: 'English', flag: '🇬🇧' },
  ];

  const currentLangObj = languagesList.find(l => l.code === language) || languagesList[0];

  const handleLogoClick = () => {
    navigateTo('home');
    const now = Date.now();
    const validClicks = logoClicks.filter(timestamp => now - timestamp < 5000);
    const updatedClicks = [...validClicks, now];
    setLogoClicks(updatedClicks);

    if (updatedClicks.length >= 10) {
      setShowPasswordPrompt(true);
      setTypedPassword('');
      setPasswordError(false);
      setShowSuccessCard(false);
      setLogoClicks([]);
    }
  };

  const verifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (typedPassword.trim() === 'ABOUB2026TRAVEL') {
      setPasswordError(false);
      setShowSuccessCard(true);
      setTimeout(() => {
        setIsAdmin(true);
        localStorage.setItem('aboub_admin_mode', 'true');
        setShowPasswordPrompt(false);
        setShowSuccessCard(false);
      }, 1500);
    } else {
      setPasswordError(true);
    }
  };

  return (
    <nav className="sticky top-0 w-full z-50 px-4 md:px-8 py-3 transform transition-all duration-300">
      <div className="max-w-7xl mx-auto glass rounded-3xl px-6 py-3 flex justify-between items-center card-shadow border border-white/10 relative">
        
        {/* Logo & Brand ID */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogoClick} id="nav-brand">
          <div className="flex items-center justify-center p-1 bg-white/5 rounded-2xl border border-white/14 shadow-lg hover:scale-105 hover:rotate-2 transition-all duration-300">
            <AgencyLogo size={52} />
          </div>
          <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
            <div className="text-xl md:text-2xl font-black tracking-wide leading-none select-none transition-all duration-300" style={{ color: 'var(--theme-primary-start, #f43f5e)' }}>
              {t('brand.name')}
            </div>
            <p className="text-[10px] md:text-xs font-bold text-slate-300 tracking-wider">
              {t('brand.subtitle')}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100" id="desktop-nav-menu">
          <button 
            onClick={() => navigateTo('home')} 
            className={`px-4 py-2 rounded-xl transition cursor-pointer ${activeTab === 'home' ? 'red-accent text-white shadow-md' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}
            id="tab-home-btn"
          >
            {t('nav.home')}
          </button>
        </div>

        {/* Controls Option */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Elegant Language Switcher Dropdown */}
          <div className="relative">
            <button 
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="glass px-3 py-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/20 transition-all duration-300 border border-black/15 dark:border-white/20 flex items-center gap-2 cursor-pointer select-none shadow-sm text-xs font-black text-slate-800 dark:text-slate-200"
              title="تغيير اللغة / Changer de langue / Switch Language"
              id="lang-selector-btn"
            >
              <Globe className="w-4 h-4 text-rose-500 animate-spin-slow" />
              <span>{currentLangObj.flag} {currentLangObj.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangMenuOpen(false)}></div>
                <div className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} mt-2 w-44 glass-dark dark:glass rounded-2xl p-2 border border-black/10 dark:border-white/10 card-shadow z-20 animate-fade-in`}>
                  {languagesList.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 dark:hover:bg-white/10 hover:bg-black/5 transition-all duration-200 cursor-pointer ${
                        language === item.code ? 'red-accent text-white dark:text-white shadow-sm' : ''
                      }`}
                    >
                      <span>{item.flag} {item.label}</span>
                      {language === item.code && <span className="text-[10px] font-black">✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* EXACTLY ONE Dark Mode Toggle Button for all screen sizes */}
          <button 
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="glass w-10 h-10 rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition-all duration-300 border border-black/15 dark:border-white/20 flex items-center justify-center cursor-pointer select-none shadow-sm"
            title={darkMode ? "التحويل للوضع المضيء" : "التحويل للوضع المظلم"}
            id="theme-toggle-btn-universal"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400 animate-pulse" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-700" />
            )}
          </button>

          <button 
            onClick={() => setQuickBookOpen(true)}
            className="hidden sm:inline-block red-accent text-white px-5 py-2.5 rounded-full font-black text-sm shadow-lg hover:shadow-red-900/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            id="header-quickbook-btn"
          >
            {t('btn.quickBook')}
          </button>
          
          <a 
            href="tel:+213667910148" 
            className="hidden sm:flex glass p-2.5 rounded-full text-slate-900 hover:bg-black/10 dark:hover:bg-white/20 transition-all duration-300 border border-black/15 dark:border-white/10 items-center justify-center cursor-pointer"
            title="اتصال مباشر بالرقم الرئيسي: 0667910148 (الاحتياطي: 0696789633)"
          >
            <Phone className="w-4 h-4 text-black dark:text-white" />
          </a>

          {/* Mobile Menu Action Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden glass p-2.5 rounded-xl hover:bg-black/10 dark:hover:bg-white/15 cursor-pointer flex items-center justify-center select-none border border-black/15 dark:border-white/10"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-black dark:text-white" /> : <Menu className="w-5 h-5 text-black dark:text-white" />}
          </button>
        </div>

      </div>

      {/* Mobile Slideout Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 mx-2 glass rounded-3xl p-5 border border-white/10 card-shadow animate-fade-in absolute left-4 right-4 z-50">
          <div className={`flex flex-col space-y-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <button 
              onClick={() => navigateTo('home')} 
              className={`py-3 px-4 rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 ${
                dir === 'rtl' ? 'text-right' : 'text-left'
              } ${activeTab === 'home' ? '' : 'text-slate-900 dark:text-slate-100 hover:bg-black/5 dark:hover:bg-white/10'}`}
              style={activeTab === 'home' ? { backgroundColor: 'var(--theme-primary-start, #f43f5e)', color: 'white' } : {}}
            >
              {t('nav.home')}
            </button>
            
            <div className="flex gap-2 pt-2">
              <button 
                onClick={() => { setQuickBookOpen(true); setMobileMenuOpen(false); }}
                className="flex-1 red-accent text-white py-3 rounded-xl font-bold text-center text-sm shadow-md cursor-pointer"
              >
                {t('btn.quickBook')}
              </button>
              <a 
                href="tel:+213667910148" 
                className="glass px-4 flex items-center justify-center rounded-xl text-white border border-white/10 cursor-pointer"
                title="الرئيسي: 0667910148 / الاحتياطي: 0696789633"
              >
                <Phone className="w-4 h-4 text-black dark:text-white" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Secret Password Prompt Overlay */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4 z-[9999] animate-fade-in">
          <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-sm p-8 shadow-2xl relative space-y-6 text-right" style={{ direction: 'rtl' }}>
            
            {/* Close Button */}
            {!showSuccessCard && (
              <button 
                onClick={() => setShowPasswordPrompt(false)}
                className="absolute top-5 left-5 bg-white/5 text-slate-400 hover:text-white p-2.5 rounded-full transition-all duration-300 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Header */}
            <div className="space-y-2 text-center pt-2">
              <div className="mx-auto w-14 h-14 bg-rose-500/10 rounded-2xl border border-rose-500/30 flex items-center justify-center text-2xl animate-pulse">
                🔐
              </div>
              <h3 className="text-xl font-black text-white pt-2">
                الولوج لوضع الإدارة السري
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                لقد قمت بطلب تفعيل لوحة التحكم الذكية لوكالة عبعوب للأسفار. يرجى إدخال كلمة المرور للمتابعة.
              </p>
            </div>

            {/* Body */}
            {showSuccessCard ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-2 animate-bounce">
                <span className="text-3xl">🔓✨</span>
                <h4 className="text-base font-black text-emerald-400">تم تفعيل وضع الإدارة بنجاح!</h4>
                <p className="text-xs text-emerald-500 font-semibold">تجري تهيئة لوحة التحكم الذكية الآن...</p>
              </div>
            ) : (
              <form onSubmit={verifyPassword} className="space-y-4">
                <div className="space-y-1.5 text-right">
                  <label className="block text-xs font-black text-slate-300">كلمة المرور الإدارية المعتمدة:</label>
                  <input 
                    type="password"
                    required
                    value={typedPassword}
                    onChange={(e) => setTypedPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 focus:border-rose-500 rounded-2xl px-4 py-3.5 text-center text-sm font-black text-rose-400 transition-all focus:outline-none placeholder-slate-600 font-mono tracking-widest uppercase"
                    placeholder="•••••••••••••••••"
                    autoFocus
                  />
                  {passwordError && (
                    <span className="block text-[11px] font-bold text-red-500 text-center pt-1 animate-pulse">
                      ❌ كلمة المرور خاطئة! يرجى إعادة المحاولة من جديد.
                    </span>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-black py-4 px-6 rounded-2xl transition shadow-lg active:scale-95 cursor-pointer"
                >
                  تأكيد الهوية وتفعيل اللوحة 🛡️
                </button>
              </form>
            )}

            <div className="text-[10px] text-center text-slate-500 font-bold">
              وكالة عبعوب للأسفار والسياحة • صيف 2026
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
