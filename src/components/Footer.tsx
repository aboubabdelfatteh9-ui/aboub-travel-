import React from 'react';
import AgencyLogo from './AgencyLogo';
import { useLanguage } from '../LanguageContext';

interface FooterProps {
  navigateTo: (tab: string) => void;
}

export default function Footer({ navigateTo }: FooterProps) {
  const { t, dir } = useLanguage();

  return (
    <footer className="mt-16 mx-4 md:mx-8 relative z-10">
      <div className={`max-w-7xl mx-auto glass rounded-[2.5rem] p-6 md:p-10 border border-white/10 card-shadow ${dir === 'rtl' ? 'text-right' : 'text-left'} space-y-8`}>
        
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6`}>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center p-1 bg-white/5 rounded-2xl border border-white/10 shadow-md">
              <AgencyLogo size={44} />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-lg md:text-xl font-black text-rose-500">{t('brand.name')}</h4>
              <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
                {t('brand.about')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigateTo('home')} className="text-xs text-slate-400 hover:text-white font-bold cursor-pointer">{t('nav.home')}</button>
            <span className="text-slate-600">•</span>
            <button onClick={() => navigateTo('intl')} className="text-xs text-slate-400 hover:text-white font-bold cursor-pointer">{t('nav.intl')}</button>
            <span className="text-slate-600">•</span>
            <button onClick={() => navigateTo('local')} className="text-xs text-slate-400 hover:text-white font-bold cursor-pointer">{t('nav.local')}</button>
            <span className="text-slate-600">•</span>
            <button onClick={() => navigateTo('flights')} className="text-xs text-slate-400 hover:text-white font-bold cursor-pointer">{t('nav.flights')} ✈️</button>
            <span className="text-slate-600">•</span>
            <button onClick={() => navigateTo('hotels')} className="text-xs text-slate-400 hover:text-white font-bold cursor-pointer">{t('nav.hotels')} 🏨</button>
            <span className="text-slate-600">•</span>
            <button onClick={() => navigateTo('visa')} className="text-xs text-slate-400 hover:text-white font-bold cursor-pointer">{t('nav.visa')} 📑</button>
            <span className="text-slate-600">•</span>
            <button onClick={() => navigateTo('umrah')} className="text-xs text-slate-400 hover:text-white font-bold cursor-pointer">{t('nav.umrah')}</button>
          </div>

          <div className={`flex flex-col ${dir === 'rtl' ? 'items-end' : 'items-start'} gap-2`}>
            <span className="text-[10px] text-slate-400">{t('footer.contact')}:</span>
            <div className="flex items-center gap-3">
              <a 
                href="https://wa.me/213667910148" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 flex items-center justify-center transition"
                title="WhatsApp: 0667910148"
              >
                📱
              </a>
              <a 
                href="https://wa.me/213696789633"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-500/10 hover:bg-slate-500/20 text-slate-400 border border-slate-500/20 flex items-center justify-center transition"
                title="WhatsApp Backup: 0696789633"
              >
                🚨
              </a>
              <a 
                href="tel:+213667910148" 
                className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10 flex items-center justify-center transition"
                title="Call Center: 0667910148"
              >
                📞
              </a>
            </div>
            <span className="text-[9px] text-slate-500">{dir === 'rtl' ? 'الرئيسي: 0667910148 | الاحتياطي: 0696789633' : 'Main: +213667910148 | Backup: +213696789633'}</span>
          </div>

        </div>

        <div className="h-px bg-white/10"></div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-400 font-sans tracking-wide">
          <p>{t('footer.rights')}</p>
          <div className="flex items-center gap-4">
            <span>📍 {t('footer.address')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
