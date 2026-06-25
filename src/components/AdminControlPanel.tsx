import React, { useState, useEffect } from 'react';
import { 
  Settings, Plus, Trash2, Edit, Sparkles, X, Check, 
  ArrowLeftRight, FileText, Image, DollarSign, Calendar, 
  MapPin, RefreshCw, Eye, AlertTriangle 
} from 'lucide-react';

interface TripPriceOption {
  typeAr: string;
  typeFr: string;
  typeEn: string;
  price_dzd: string;
}

interface Trip {
  id: string;
  category: 'intl' | 'local' | 'special';
  titleAr: string;
  titleFr: string;
  titleEn: string;
  descAr: string;
  descFr: string;
  descEn: string;
  price: number;
  durationAr: string;
  durationFr: string;
  durationEn: string;
  hotelAr: string;
  hotelFr: string;
  hotelEn: string;
  image: string;
  badge1Ar: string;
  badge1Fr: string;
  badge1En: string;
  badge2Ar: string;
  badge2Fr: string;
  badge2En: string;
  includedAr: string[];
  includedFr: string[];
  includedEn: string[];
  program: {
    tAr: string;
    dAr: string;
    tFr: string;
    dFr: string;
    tEn: string;
    dEn: string;
  }[];
  regNotesAr: string;
  regNotesFr?: string;
  regNotesEn?: string;
  prices?: TripPriceOption[];
}

function mapExtractedToTrip(ext: any, category: 'intl' | 'local'): Trip {
  const destinationQuery = encodeURIComponent(ext.titleAr || ext.titleEn || "travel");
  const randomId = Math.floor(Math.random() * 1000);
  const imageUrl = `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80&sig=${randomId}&q=${destinationQuery}`;

  const mappedProgram = Array.isArray(ext.program)
    ? ext.program.map((item: any) => ({
        tAr: item.tAr || item.t || "",
        dAr: item.dAr || item.d || "",
        tFr: item.tFr || item.t || "",
        dFr: item.dFr || item.d || "",
        tEn: item.tEn || item.t || "",
        dEn: item.dEn || item.d || ""
      }))
    : [];

  return {
    id: "trip-" + Date.now() + "-" + Math.floor(Math.random() * 100),
    category: category,
    titleAr: ext.titleAr || "رحلة جديدة",
    titleFr: ext.titleFr || ext.titleAr || "Nouveau Voyage",
    titleEn: ext.titleEn || ext.titleAr || "New Trip",
    descAr: ext.descAr || "",
    descFr: ext.descFr || ext.descAr || "",
    descEn: ext.descEn || ext.descAr || "",
    price: ext.price || 45000,
    durationAr: ext.durationAr || "7 أيام",
    durationFr: ext.durationFr || ext.durationAr || "7 Jours",
    durationEn: ext.durationEn || ext.durationAr || "7 Days",
    hotelAr: ext.hotelAr || "فندق مريح",
    hotelFr: ext.hotelFr || ext.hotelAr || "Hôtel confortable",
    hotelEn: ext.hotelEn || ext.hotelAr || "Comfortable Hotel",
    image: imageUrl,
    badge1Ar: ext.badge1Ar || "✨ عطلة مميزة",
    badge1Fr: ext.badge1Fr || "Voyage Spécial",
    badge1En: ext.badge1En || "Special Offer",
    badge2Ar: ext.badge2Ar || "🔥 سعر تنافسي",
    badge2Fr: ext.badge2Fr || "Tarif compétitif",
    badge2En: ext.badge2En || "Best Price",
    includedAr: Array.isArray(ext.includedAr) ? ext.includedAr.map(String) : [],
    includedFr: Array.isArray(ext.includedFr) ? ext.includedFr.map(String) : [],
    includedEn: Array.isArray(ext.includedEn) ? ext.includedEn.map(String) : [],
    program: mappedProgram,
    regNotesAr: ext.regNotesAr || "للاستفسار والحجز يرجى الاتصال بنا.",
    regNotesFr: ext.regNotesFr || ext.regNotesAr || "Contactez-nous pour réserver.",
    regNotesEn: ext.regNotesEn || ext.regNotesAr || "Please contact us for booking.",
    prices: Array.isArray(ext.prices) ? ext.prices : []
  };
}

interface AdminControlPanelProps {
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

export default function AdminControlPanel({ isAdmin, setIsAdmin }: AdminControlPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'add' | 'manage'>('add');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form states for unstructured manual entry (AI Extraction)
  const [rawText, setRawText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'intl' | 'local'>('intl');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  
  // AI Progress Loader Steps (Simulates active, advanced steps back-end during AI requests)
  const [aiStep, setAiStep] = useState<string>('');
  const [aiPercent, setAiPercent] = useState<number>(0);

  // Helper to upload images as base64 to server
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    setSuccessMsg('');
    setIsUploadingImage(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result as string;
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fileData: base64Data }),
          });

          if (res.ok) {
            const data = await res.json();
            setUploadedImageUrl(data.url);
            setSuccessMsg('✨ تم رفع غلاف الرحلة بنجاح!');
          } else {
            const errData = await res.json();
            setErrorMsg('فشل رفع الصورة: ' + (errData.error || 'خطأ غير معروف'));
          }
        } catch (err: any) {
          setErrorMsg('خطأ اتصال أثناء رفع الصورة: ' + err.message);
        } finally {
          setIsUploadingImage(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setErrorMsg('تعذر قراءة ملف الصورة: ' + err.message);
      setIsUploadingImage(false);
    }
  };

  // Editing state
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  
  // Delete Confirmation state to bypass window.confirm box constraints
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Fetch all trips on mount
  const fetchTrips = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/trips');
      if (res.ok) {
        const data = await res.json();
        setTrips(data);
      } else {
        setErrorMsg('فشل في تحميل الرحلات من قاعدة البيانات.');
      }
    } catch {
      setErrorMsg('خطأ في الاتصال بالخادم لقراءة الرحلات.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchTrips();
    }
  }, [isAdmin]);

  if (!isAdmin) return null;

  // AI Unstructured Text Analyzer
  const handleAiExtract = async () => {
    if (!rawText.trim()) {
      setErrorMsg('يرجى إدخال معلومات نصية مبعثرة ليقوم المستشار الذكي بمناولتها.');
      return;
    }

    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);
    setAiPercent(10);
    setAiStep('الاتصال بخادم عبعوب للأسفار...');

    try {
      const stepTimer1 = setTimeout(() => { setAiStep('تحليل النص واستخلاص التواريخ والأسعار...'); setAiPercent(35); }, 800);
      const stepTimer2 = setTimeout(() => { setAiStep('ترجمة العناوين وصياغة البرامج السياحية باللغتين الفرنسية والإنجليزية...'); setAiPercent(70); }, 2200);
      const stepTimer3 = setTimeout(() => { setAiStep('استفسار صورة عالية الجودة مطابقة للوجهة من مستودع الصور...'); setAiPercent(90); }, 4000);

      const res = await fetch('/api/trips/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: rawText, category: selectedCategory }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);

      setAiPercent(95);

      if (res.ok) {
        const extractedTrip = await res.json();
        setAiStep('اكتمل التحليل بنجاح! جاري عرض النتائج للمراجعة...');
        setAiPercent(100);
        
        // Auto show in editing state for review/approval
        const mappedTrip = mapExtractedToTrip(extractedTrip, selectedCategory);
        if (uploadedImageUrl) {
          mappedTrip.image = uploadedImageUrl;
        }
        setEditingTrip(mappedTrip);
        setRawText(''); // clear inputs
        setUploadedImageUrl(''); // clear uploaded image state for next run
        setSuccessMsg('✨ نجح الذكاء الاصطناعي في تحليل العرض! يرجى مراجعة الحقول وتأكيد الحفظ.');
      } else {
        const errData = await res.json();
        setErrorMsg('تعذر تحليل النص بالذكاء الاصطناعي: ' + (errData.error || 'خطأ غير معروف'));
      }
    } catch (e: any) {
      setErrorMsg('خطأ اتصال بالذكاء الاصطناعي: ' + e.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => { setAiPercent(0); setAiStep(''); }, 3000);
    }
  };

  // Add / Save trip after revision
  const handleSaveTrip = async (tripToSave: Trip) => {
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tripToSave),
      });

      if (res.ok) {
        setSuccessMsg('🎉 تم حفظ ونشر وتحديث معلومات الرحلة بنجاح! تظهر للزوار فوراً.');
        setEditingTrip(null);
        fetchTrips();
        // Also save list to local storage to trigger instant view on standard pages
        const updatedListResult = await fetch('/api/trips');
        if (updatedListResult.ok) {
          const updatedList = await updatedListResult.json();
          localStorage.setItem('aboub_cached_trips', JSON.stringify(updatedList));
          // Dispatch a custom event to notify other dynamic components to reload immediately!
          window.dispatchEvent(new Event('aboub_trips_updated'));
        }
      } else {
        setErrorMsg('تعذر حفظ الرحلة في قاعدة البيانات.');
      }
    } catch {
      setErrorMsg('خطأ بالشبكة أثناء حفظ الرحلة.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update trip category / move
  const handleMoveCategory = async (trip: Trip, newCat: 'intl' | 'local' | 'special') => {
    const updated = { ...trip, category: newCat };
    try {
      setIsLoading(true);
      const res = await fetch(`/api/trips/${trip.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setSuccessMsg(`🚀 تم نقل الرحلة إلى قسم (${newCat === 'intl' ? 'رحلات دولية' : 'رحلات داخلية' }) بنجاح!`);
        fetchTrips();
        // Fire updates event
        setTimeout(async () => {
          const fresh = await fetch('/api/trips');
          if (fresh.ok) {
            localStorage.setItem('aboub_cached_trips', await fresh.text());
            window.dispatchEvent(new Event('aboub_trips_updated'));
          }
        }, 500);
      }
    } catch {
      setErrorMsg('تعذر تعديل فئة الرحلة.');
    } finally {
      setIsLoading(false);
    }
  };

  // Delete trip permanently
  const handleDeleteTrip = async (id: string) => {
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      const res = await fetch(`/api/trips/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSuccessMsg('🗑️ تم حذف الرحلة نهائياً من العروض.');
        fetchTrips();
        // Fire updates event
        setTimeout(async () => {
          const fresh = await fetch('/api/trips');
          if (fresh.ok) {
            localStorage.setItem('aboub_cached_trips', await fresh.text());
            window.dispatchEvent(new Event('aboub_trips_updated'));
          }
        }, 500);
      } else {
        setErrorMsg('تعذر حذف الرحلة من النظام.');
      }
    } catch {
      setErrorMsg('خطأ بالشبكة عند محاولة الحذف.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 1. Floating admin button */}
      <div className="fixed bottom-6 left-6 z-[9990] font-sans">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-black px-5 py-4 rounded-full shadow-2xl flex items-center gap-2 transform transition hover:scale-105 active:scale-95 cursor-pointer border border-white/20 select-none animate-bounce"
        >
          <Settings className="w-5 h-5 animate-spin-slow text-slate-950" />
          <span className="text-sm font-black whitespace-nowrap">Smart Control • الإدارة</span>
        </button>
      </div>

      {/* 2. Admin Dashboard Backdrop Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl z-[9991] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-[95vw] lg:max-w-7xl h-[90vh] flex flex-col shadow-2xl relative text-right font-sans overflow-hidden" style={{ direction: 'rtl' }}>
            
            {/* Header Area */}
            <div className="p-6 md:p-8 bg-slate-950/30 border-b border-white/5 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-amber-500/20 to-rose-500/20 rounded-2xl border border-rose-500/30 text-amber-400">
                  <Settings className="w-6 h-6 animate-spin-slow" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-white">لوحة التحكم الذكية لعبعوب للأسفار</h2>
                  <p className="text-xs text-slate-400 font-semibold mt-1">تعديل الرحلات، إضافة برامج بالذكاء الاصطناعي، وتبديل الأقسام فورياً</p>
                </div>
              </div>
              
              {/* Close Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    localStorage.removeItem('aboub_admin_mode');
                    setIsAdmin(false);
                    setIsOpen(false);
                  }}
                  className="bg-red-950/40 text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-xs font-black hover:bg-red-900/40 transition select-none cursor-pointer"
                >
                  🚪 تسجيل الخروج من الإدارة
                </button>
                <button 
                  onClick={() => { setIsOpen(false); setEditingTrip(null); }}
                  className="bg-white/5 p-2.5 rounded-full text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Sub Navigation */}
            <div className="px-8 py-3 bg-slate-950/20 border-b border-white/5 flex gap-4">
              <button
                onClick={() => { setActiveSubTab('add'); setEditingTrip(null); }}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition cursor-pointer ${activeSubTab === 'add' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                📥 إضافة برنامج بنقرة واحدة (الذكاء الاصطناعي)
              </button>
              <button
                onClick={() => { setActiveSubTab('manage'); setEditingTrip(null); }}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition cursor-pointer ${activeSubTab === 'manage' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                ⚙️ إدارة وتعديل الرحلات القائمة ({trips.length})
              </button>
            </div>

            {/* Error and Success Notices */}
            {(errorMsg || successMsg) && (
              <div className="mx-8 mt-4">
                {errorMsg && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs font-bold leading-relaxed animate-pulse">
                    ⚠️ {errorMsg}
                  </div>
                )}
                {successMsg && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-xs font-bold leading-relaxed">
                    ✅ {successMsg}
                  </div>
                )}
              </div>
            )}

            {/* Main scrollable body */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">

              {/* Loader Overlay for database actions */}
              {isLoading && aiPercent === 0 && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <RefreshCw className="w-10 h-10 animate-spin text-rose-500" />
                  <span className="text-xs font-black text-slate-400">جاري معالجة بيانات الرحلات وحفظ التعديلات...</span>
                </div>
              )}

              {/* AI EXTRACT TAB */}
              {activeSubTab === 'add' && !editingTrip && !isLoading && (
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div className="bg-slate-950/40 rounded-3xl p-6 border border-white/5 space-y-4">
                    <div className="flex items-center gap-2 text-rose-400">
                      <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                      <h3 className="text-base font-black">التحليل الذكي للنصوص والمنشورات</h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      الصق هنا أي نص عشوائي مبعثر عن الرحلة (على سبيل المثال رسالة شركاء من فيسبوك أو واتساب تشتمل على وجهة السفر، اسم الفندق، الأنشطة، التواريخ، والخدمات المشمولة). سيقوم الذكاء الاصطناعي باستخراجها وتعبئتها في اللغات الثلاث تمهيداً لنشرها!
                    </p>

                    <div className="space-y-2">
                      <label className="block text-xs font-black text-slate-300">النص الأصلي العشوائي للرحلة:</label>
                      <textarea
                        rows={8}
                        value={rawText}
                        onChange={(e) => setRawText(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-xs font-semibold leading-relaxed focus:border-rose-500 outline-none text-right text-slate-200"
                        placeholder="مثال: عرض تونس لصيف 2026. الرحلة بـ 3 ملايين سنتيم (30000 دج) تشمل الحافلة المريحة ومثالية للعائلات. المبيت في شقق سيبوسة القنطاوي  لمدة 7 أيام 6 ليالي مع زيارة ميناء قرصان وسوسة وقرطاج لاند والمبيت بشقق عصرية مجهزة. الانطلاق يوم 10 جويلية من تقرت..."
                      />
                    </div>

                    {/* Image Upload for Cover */}
                    <div className="space-y-2 border-t border-white/5 pt-4">
                      <label className="block text-xs font-black text-slate-300 mb-1">صورة غلاف الرحلة (اختياري - سيتم استخدامها غلافاً أساسياً للرحلة):</label>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-8">
                          <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-5 transition-all duration-300 cursor-pointer text-center group ${
                            uploadedImageUrl 
                              ? 'border-emerald-500/50 bg-emerald-950/10 hover:bg-emerald-950/20' 
                              : 'border-white/10 bg-slate-950/60 hover:border-rose-500/50 hover:bg-slate-950'
                          }`}>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleImageUpload} 
                              className="hidden" 
                            />
                            {isUploadingImage ? (
                              <div className="flex flex-col items-center space-y-2">
                                <RefreshCw className="w-6 h-6 text-rose-500 animate-spin" />
                                <span className="text-[10px] font-bold text-slate-400">جاري رفع وحفظ الصورة في الخادم...</span>
                              </div>
                            ) : uploadedImageUrl ? (
                              <div className="flex flex-col items-center space-y-1">
                                <Check className="w-6 h-6 text-emerald-400" />
                                <span className="text-xs font-black text-emerald-300">تم رفع الغلاف بنجاح! 🎉</span>
                                <span className="text-[9px] text-slate-400 font-mono break-all line-clamp-1">{uploadedImageUrl}</span>
                                <span className="text-[10px] text-rose-400 hover:underline mt-1 cursor-pointer font-bold select-none" onClick={(e) => {
                                  e.preventDefault();
                                  setUploadedImageUrl('');
                                }}>
                                  إزالة الصورة والاعتماد على الذكاء الاصطناعي
                                </span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center space-y-2">
                                <Image className="w-8 h-8 text-slate-500 group-hover:text-rose-400 transition" />
                                <span className="text-xs font-black text-slate-300">اسحب وأسقط صورة الغلاف هنا، أو اضغط للتصفح 🖼️</span>
                                <span className="text-[10px] text-slate-500 font-bold">يدعم جميع صيغ الصور (حجم أقصى 20 ميجابايت)</span>
                              </div>
                            )}
                          </label>
                        </div>
                        
                        <div className="md:col-span-4 flex justify-center">
                          {uploadedImageUrl ? (
                            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 group w-full h-28 max-w-[200px]">
                              <img 
                                src={uploadedImageUrl} 
                                alt="Cover preview" 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button 
                                  onClick={(e) => { e.preventDefault(); setUploadedImageUrl(''); }}
                                  className="bg-red-600 hover:bg-red-500 text-white rounded-lg p-1.5 transition text-xs font-bold cursor-pointer"
                                >
                                  إلغاء الغلاف
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-28 max-w-[200px] bg-slate-950/20 border border-white/5 rounded-2xl flex flex-col items-center justify-center text-slate-600 text-center p-3">
                              <span className="text-xl">🏜️</span>
                              <span className="text-[10px] font-bold mt-1">سيتم تعيين غلاف ذكي افتراضي للوجهة</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-black text-slate-300">تصنيف القسم المعتمد:</label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value as any)}
                          className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 text-xs font-black text-slate-300 outline-none cursor-pointer"
                        >
                          <option value="intl">رحلات دولية (International Packages)</option>
                          <option value="local">رحلات داخلية (Domestic Packages)</option>
                        </select>
                      </div>

                      <div className="flex items-end">
                        <button
                          onClick={handleAiExtract}
                          className="w-full bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-slate-950 text-xs font-black py-3.5 rounded-2xl shadow-lg transition transform hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2 select-none"
                        >
                          <Sparkles className="w-4 h-4 text-slate-950" />
                          <span>تحليل النص وصناعة العرض تلقائياً ⚡</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Progress Steps for AI Generation */}
              {aiPercent > 0 && (
                <div className="max-w-xl mx-auto py-12 px-6 bg-slate-950/40 rounded-3xl border border-white/5 space-y-6 text-center animate-pulse">
                  <div className="mx-auto w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-500">
                    <Sparkles className="w-6 h-6 animate-spin text-amber-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-black text-white">المحلل الذكي يغزل بيانات السفر...</h3>
                    <p className="text-[11px] text-slate-400 font-bold tracking-wide">{aiStep}</p>
                  </div>
                  
                  {/* Visual Progress Bar */}
                  <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-white/5 relative">
                    <div 
                      className="bg-gradient-to-r from-rose-500 to-amber-400 h-full transition-all duration-300"
                      style={{ width: `${aiPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-600 font-extrabold tracking-widest">{aiPercent}% COMPLETE</span>
                </div>
              )}

              {/* REVIEW / MANUAL FORM COMPONENT FOR BOTH ADD & EDIT */}
              {editingTrip && (
                <div className="bg-slate-950/40 rounded-3xl p-6 border-2 border-rose-500/30 space-y-6 max-w-none w-full animate-fade-in">
                  <div className="flex justify-between items-center pb-3 border-b border-white/5">
                    <h3 className="text-base font-black text-rose-400 flex items-center gap-2">
                      <span>✏️ المراجعة اليدوية وتخصيص الحقول لعرض السفر</span>
                    </h3>
                    <button 
                      onClick={() => setEditingTrip(null)}
                      className="text-slate-400 hover:text-white font-black text-xs px-3 py-1 bg-white/5 rounded-lg"
                    >
                      إلغاء التعديل ✕
                    </button>
                  </div>

                  {/* Multi-grid Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Arabic Fields */}
                    <div className="space-y-4 p-4 bg-slate-900/40 rounded-2xl border border-white/5">
                      <span className="block text-xs font-black text-amber-400 border-b border-amber-400/20 pb-1.5">🇸🇦 الحقول باللغة العربية</span>
                      
                      <div className="space-y-1">
                        <label className="block text-[10px] font-black text-slate-400">العنوان بالعربية:</label>
                        <input 
                          type="text" 
                          value={editingTrip.titleAr}
                          onChange={(e) => setEditingTrip({ ...editingTrip, titleAr: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-black text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-black text-slate-400">الوصف بالعربية:</label>
                        <textarea 
                          rows={3}
                          value={editingTrip.descAr}
                          onChange={(e) => setEditingTrip({ ...editingTrip, descAr: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs font-semibold text-slate-300 leading-normal"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-black text-slate-400">الفندق والتقييم بالعربية:</label>
                        <input 
                          type="text" 
                          value={editingTrip.hotelAr}
                          onChange={(e) => setEditingTrip({ ...editingTrip, hotelAr: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-black text-slate-400">ملاحظات وقواعد الحجزAr:</label>
                        <textarea 
                          rows={4}
                          value={editingTrip.regNotesAr}
                          onChange={(e) => setEditingTrip({ ...editingTrip, regNotesAr: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-slate-300 font-medium"
                        />
                      </div>
                    </div>

                    {/* French Fields */}
                    <div className="space-y-4 p-4 bg-slate-900/40 rounded-2xl border border-white/5">
                      <span className="block text-xs font-black text-blue-400 border-b border-blue-400/20 pb-1.5">🇫🇷 Champs en Français</span>
                      
                      <div className="space-y-1">
                        <label className="block text-[10px] font-black text-slate-400">Titre (FR):</label>
                        <input 
                          type="text" 
                          value={editingTrip.titleFr}
                          onChange={(e) => setEditingTrip({ ...editingTrip, titleFr: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-black text-slate-400">Description (FR):</label>
                        <textarea 
                          rows={3}
                          value={editingTrip.descFr}
                          onChange={(e) => setEditingTrip({ ...editingTrip, descFr: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-slate-300 leading-normal"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-black text-slate-400">Hôtel (FR):</label>
                        <input 
                          type="text" 
                          value={editingTrip.hotelFr}
                          onChange={(e) => setEditingTrip({ ...editingTrip, hotelFr: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* English Fields */}
                    <div className="space-y-4 p-4 bg-slate-900/40 rounded-2xl border border-white/5">
                      <span className="block text-xs font-black text-rose-400 border-b border-rose-400/20 pb-1.5">🇬🇧 Fields in English</span>
                      
                      <div className="space-y-1">
                        <label className="block text-[10px] font-black text-slate-400">Title (EN):</label>
                        <input 
                          type="text" 
                          value={editingTrip.titleEn}
                          onChange={(e) => setEditingTrip({ ...editingTrip, titleEn: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-black text-slate-400">Description (EN):</label>
                        <textarea 
                          rows={3}
                          value={editingTrip.descEn}
                          onChange={(e) => setEditingTrip({ ...editingTrip, descEn: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-slate-300 leading-normal"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-black text-slate-400">Hotel (EN):</label>
                        <input 
                          type="text" 
                          value={editingTrip.hotelEn}
                          onChange={(e) => setEditingTrip({ ...editingTrip, hotelEn: e.target.value })}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Core Numeric & Configuration Values */}
                  <div className="bg-slate-955/60 p-5 rounded-2xl border border-white/5 space-y-4">
                    <span className="block text-xs font-black text-white">💰 الإعدادات المالية والأساسية والمدة</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400">السعر الأساسي الرقمي بالدينار (دج):</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            value={editingTrip.price}
                            onChange={(e) => setEditingTrip({ ...editingTrip, price: parseInt(e.target.value, 10) || 0 })}
                            className="w-full bg-slate-955 border border-white/10 rounded-xl px-3 py-2 text-xs text-rose-400 font-bold"
                          />
                          <span className="absolute left-3 top-2.5 text-[9px] text-slate-500 font-black">دج</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400">سياق فئة الرحلة:</label>
                        <select
                          value={editingTrip.category}
                          onChange={(e) => setEditingTrip({ ...editingTrip, category: e.target.value as any })}
                          className="w-full bg-slate-955 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-bold"
                        >
                          <option value="intl">رحلات دولية (International)</option>
                          <option value="local">رحلات داخلية (Domestic)</option>
                          <option value="special">عروض خاصة فائقة (Special)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400">المدة الزمنية (عربي):</label>
                        <input 
                          type="text" 
                          value={editingTrip.durationAr}
                          onChange={(e) => setEditingTrip({ ...editingTrip, durationAr: e.target.value })}
                          className="w-full bg-slate-955 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400">صورة العرض (رابط Unsplash):</label>
                        <input 
                          type="text" 
                          value={editingTrip.image}
                          onChange={(e) => setEditingTrip({ ...editingTrip, image: e.target.value })}
                          className="w-full bg-slate-955 border border-white/10 rounded-xl px-3 py-2 text-[10px] text-slate-300 font-mono"
                        />
                      </div>

                    </div>

                    {/* Image Checker View */}
                    <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-white/5">
                      <img 
                        src={editingTrip.image} 
                        alt="Preview" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80';
                        }}
                        className="w-20 h-12 object-cover rounded-lg border border-white/10"
                      />
                      <div className="text-right">
                        <span className="block text-[10px] font-black text-slate-400">معاينة صورة العرض:</span>
                        <span className="text-[9px] text-slate-500 font-sans break-all">{editingTrip.image}</span>
                      </div>
                    </div>
                  </div>

                  {/* Program and Inclusion list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 space-y-3">
                      <span className="block text-xs font-black text-amber-300 border-b border-white/5 pb-1.5">📋 الميزات والخدمات المشمولة بالعرض (عربي)</span>
                      
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {editingTrip.includedAr?.map((inc, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <input 
                              type="text" 
                              value={inc}
                              onChange={(e) => {
                                const copy = [...(editingTrip.includedAr || [])];
                                copy[index] = e.target.value;
                                setEditingTrip({ ...editingTrip, includedAr: copy });
                              }}
                              className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                            />
                            <button 
                              type="button"
                              onClick={() => {
                                const copy = editingTrip.includedAr.filter((_, i) => i !== index);
                                setEditingTrip({ ...editingTrip, includedAr: copy });
                              }}
                              className="text-red-500 hover:text-red-400 text-xs font-bold"
                            >
                              حذف
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const copy = [...(editingTrip.includedAr || []), '✔ ميزة جديدة مشمولة بالبرنامج'];
                          setEditingTrip({ ...editingTrip, includedAr: copy });
                        }}
                        className="text-[10px] font-bold text-amber-400 hover:underline flex items-center gap-1"
                      >
                        + إضافة خدمة مشمولة جديدة
                      </button>
                    </div>

                    {/* Custom pricing packages editor */}
                    <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 space-y-3">
                      <span className="block text-xs font-black text-emerald-400 border-b border-white/5 pb-1.5">💵 باقات وخيارات الأسعار التفصيلية المتقدمة (لحاسبة الرحلة)</span>
                      
                      <div className="space-y-2 max-h-36 overflow-y-auto">
                        {(editingTrip.prices || []).map((prOpt, prIdx) => (
                          <div key={prIdx} className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-slate-950 p-2.5 rounded-xl border border-white/10 items-center">
                            <input 
                              type="text"
                              value={prOpt.typeAr || ""}
                              onChange={(e) => {
                                const copy = [...(editingTrip.prices || [])];
                                copy[prIdx] = { ...copy[prIdx], typeAr: e.target.value };
                                setEditingTrip({ ...editingTrip, prices: copy });
                              }}
                              className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white"
                              placeholder="النوع بالعربية (مثال: غرفة ثنائية)"
                            />
                            <input 
                              type="text"
                              value={prOpt.typeFr || ""}
                              onChange={(e) => {
                                const copy = [...(editingTrip.prices || [])];
                                copy[prIdx] = { ...copy[prIdx], typeFr: e.target.value };
                                setEditingTrip({ ...editingTrip, prices: copy });
                              }}
                              className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white"
                              placeholder="Type en Français"
                            />
                            <input 
                              type="text"
                              value={prOpt.typeEn || ""}
                              onChange={(e) => {
                                const copy = [...(editingTrip.prices || [])];
                                copy[prIdx] = { ...copy[prIdx], typeEn: e.target.value };
                                setEditingTrip({ ...editingTrip, prices: copy });
                              }}
                              className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white"
                              placeholder="Type in English"
                            />
                            <div className="flex gap-2 items-center">
                              <input 
                                type="text"
                                value={prOpt.price_dzd || ""}
                                onChange={(e) => {
                                  const copy = [...(editingTrip.prices || [])];
                                  copy[prIdx] = { ...copy[prIdx], price_dzd: e.target.value };
                                  setEditingTrip({ ...editingTrip, prices: copy });
                                }}
                                className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-rose-400 font-mono w-full"
                                placeholder="السعر بالدينار دج"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const copy = (editingTrip.prices || []).filter((_, i) => i !== prIdx);
                                  setEditingTrip({ ...editingTrip, prices: copy });
                                }}
                                className="text-red-500 hover:text-red-400 font-black text-xs"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          const copy = [...(editingTrip.prices || []), { typeAr: 'غرفة ثنائية / ثلاثية', typeFr: 'Chambre Double / Triple', typeEn: 'Double / Triple Room', price_dzd: '129000' }];
                          setEditingTrip({ ...editingTrip, prices: copy });
                        }}
                        className="text-[10px] font-bold text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        + إضافة خيار تسعير جديد
                      </button>
                    </div>

                    <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 space-y-3">
                      <span className="block text-xs font-black text-blue-300 border-b border-white/5 pb-1.5">🗺️ محطات وجولات البرنامج السياحي المنسق</span>
                      
                      <div className="space-y-4 max-h-64 overflow-y-auto">
                        {editingTrip.program?.map((prog, index) => (
                          <div key={index} className="p-3 bg-slate-950 border border-white/10 rounded-xl space-y-3">
                            <div className="flex gap-2 justify-between items-center pb-2 border-b border-white/5">
                              <span className="text-[11px] font-black text-blue-300">اليوم {index + 1} من البرنامج السياحي:</span>
                              <button 
                                type="button"
                                onClick={() => {
                                  const copy = editingTrip.program.filter((_, i) => i !== index);
                                  setEditingTrip({ ...editingTrip, program: copy });
                                }}
                                className="text-red-500 hover:text-red-400 text-[10px] font-bold"
                              >
                                حذف اليوم ✕
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {/* Arabic */}
                              <div className="space-y-1">
                                <span className="text-[9px] text-amber-500 font-bold">🇸🇦 العربية:</span>
                                <input 
                                  type="text" 
                                  value={prog.tAr || ""}
                                  onChange={(e) => {
                                    const copy = [...(editingTrip.program || [])];
                                    copy[index] = { ...copy[index], tAr: e.target.value };
                                    setEditingTrip({ ...editingTrip, program: copy });
                                  }}
                                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white font-bold"
                                  placeholder="عنوان المحطة"
                                />
                                <textarea 
                                  rows={2}
                                  value={prog.dAr || ""}
                                  onChange={(e) => {
                                    const copy = [...(editingTrip.program || [])];
                                    copy[index] = { ...copy[index], dAr: e.target.value };
                                    setEditingTrip({ ...editingTrip, program: copy });
                                  }}
                                  className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-[11px] text-slate-300 leading-normal"
                                  placeholder="التفاصيل"
                                />
                              </div>

                              {/* French */}
                              <div className="space-y-1">
                                <span className="text-[9px] text-cyan-400 font-bold">🇫🇷 الفرنسية:</span>
                                <input 
                                  type="text" 
                                  value={prog.tFr || ""}
                                  onChange={(e) => {
                                    const copy = [...(editingTrip.program || [])];
                                    copy[index] = { ...copy[index], tFr: e.target.value };
                                    setEditingTrip({ ...editingTrip, program: copy });
                                  }}
                                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white font-bold"
                                  placeholder="Titre de l'étape"
                                />
                                <textarea 
                                  rows={2}
                                  value={prog.dFr || ""}
                                  onChange={(e) => {
                                    const copy = [...(editingTrip.program || [])];
                                    copy[index] = { ...copy[index], dFr: e.target.value };
                                    setEditingTrip({ ...editingTrip, program: copy });
                                  }}
                                  className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-[11px] text-slate-300 leading-normal"
                                  placeholder="Détails de la journée"
                                />
                              </div>

                              {/* English */}
                              <div className="space-y-1">
                                <span className="text-[9px] text-rose-400 font-bold">🇬🇧 الإنجليزية:</span>
                                <input 
                                  type="text" 
                                  value={prog.tEn || ""}
                                  onChange={(e) => {
                                    const copy = [...(editingTrip.program || [])];
                                    copy[index] = { ...copy[index], tEn: e.target.value };
                                    setEditingTrip({ ...editingTrip, program: copy });
                                  }}
                                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white font-bold"
                                  placeholder="Day title"
                                />
                                <textarea 
                                  rows={2}
                                  value={prog.dEn || ""}
                                  onChange={(e) => {
                                    const copy = [...(editingTrip.program || [])];
                                    copy[index] = { ...copy[index], dEn: e.target.value };
                                    setEditingTrip({ ...editingTrip, program: copy });
                                  }}
                                  className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-[11px] text-slate-300 leading-normal"
                                  placeholder="Details of the day"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const copy = [...(editingTrip.program || []), { tAr: 'محطة استكشافية جديدة', dAr: 'تفاصيل وجدول المغامرة اليومية هنا للعميل.', tFr: 'Nouvelle étape', dFr: 'Détails de l\'aventure.', tEn: 'New Sightseeing Step', dEn: 'Details of the sightseeing.' }];
                          setEditingTrip({ ...editingTrip, program: copy });
                        }}
                        className="text-[10px] font-bold text-blue-400 hover:underline flex items-center gap-1 block"
                      >
                        + إضافة محطة برنامج جديدة
                      </button>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setEditingTrip(null)}
                      className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-black py-3 px-6 rounded-xl transition cursor-pointer select-none"
                    >
                      إلغاء التعديلات
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveTrip(editingTrip)}
                      className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 text-xs font-black py-3.5 px-8 rounded-xl shadow-lg transition transform hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center gap-1.5 select-none"
                    >
                      <Check className="w-4 h-4 text-slate-950" />
                      <span>اعتماد، حفظ ونشر العرض مباشرة 🚀</span>
                    </button>
                  </div>
                </div>
              )}

              {/* MANAGE PREVIOUS TRIPS LISTING */}
              {activeSubTab === 'manage' && !editingTrip && !isLoading && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400 font-extrabold">إجمالي الرحلات المسجلة في الخادم: {trips.length} رحلة</span>
                    <button
                      onClick={fetchTrips}
                      className="flex items-center gap-1 text-[10px] text-slate-300 hover:text-white bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> إعادة تحميل القائمة
                    </button>
                  </div>

                  {trips.length === 0 ? (
                    <div className="text-center py-12 text-xs text-slate-500 font-bold border border-white/5 rounded-3xl bg-slate-950/20">
                      لم يتم فرز أي رحلات بالمسار حالياً.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {trips.map((trip) => (
                        <div 
                          key={trip.id} 
                          className="bg-slate-950/40 p-5 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 gap-4"
                        >
                          <div className="space-y-3">
                            <div className="flex gap-2 justify-between items-start">
                              <div className="flex items-center gap-2">
                                <span className={`text-[9px] font-black tracking-wider px-2 py-1 rounded-md ${
                                  trip.category === 'intl' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                }`}>
                                  {trip.category === 'intl' ? '🗺️ رحلة دولية' : '🇩🇿 رحلة داخلية'}
                                </span>
                                <span className="text-[10px] font-mono text-slate-600 font-black">{trip.id}</span>
                              </div>
                              <span className="text-[11px] font-mono font-black text-rose-400">{(trip.price || 0).toLocaleString()} دج</span>
                            </div>

                            <h4 className="text-sm font-black text-white">{trip.titleAr}</h4>
                            <p className="text-xs text-slate-400 leading-normal max-w-lg">{trip.descAr}</p>

                            <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 font-bold">
                              <span>🏨 {trip.hotelAr}</span>
                              <span>•</span>
                              <span>📅 {trip.durationAr}</span>
                            </div>
                          </div>

                          {/* Controls Footer */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
                            
                            {/* Toggle category switch */}
                            <button
                              onClick={() => handleMoveCategory(trip, trip.category === 'intl' ? 'local' : 'intl')}
                              className="text-[9px] font-black text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 py-1 px-2.5 rounded-lg border border-white/5 cursor-pointer"
                              title="نقل الرحلة للقسم الآخر"
                            >
                              <ArrowLeftRight className="w-3 h-3 text-amber-500" />
                              <span>تحويل إلى {trip.category === 'intl' ? 'داخلية' : 'دولية'}</span>
                            </button>

                            {/* Direct edit & delete */}
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingTrip(trip)}
                                className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/10 transition cursor-pointer flex items-center gap-1 select-none"
                              >
                                <Edit className="w-3 h-3" />
                                <span>تعديل التفاصيل</span>
                              </button>

                              {deleteConfirmId === trip.id ? (
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => {
                                      handleDeleteTrip(trip.id);
                                      setDeleteConfirmId(null);
                                    }}
                                    className="bg-red-600 hover:bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg transition cursor-pointer select-none"
                                  >
                                    تأكيد الحذف 🗑️
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="bg-white/10 hover:bg-white/20 text-slate-300 text-[10px] font-bold px-2 py-1 rounded-lg transition cursor-pointer select-none"
                                  >
                                    تراجع
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirmId(trip.id)}
                                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[11px] font-bold px-3 py-1.5 rounded-xl border border-red-500/15 transition cursor-pointer flex items-center gap-1 select-none"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>حذف</span>
                                </button>
                              )}
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Bottom Credits */}
            <div className="p-4 bg-slate-950 border-t border-white/5 text-center text-[10px] text-slate-600 font-bold select-none">
              نظام إدارة المنشورات الذكي لوكالة عبعوب للأسفار والملاحة • صيف 2026 التنافسي المباشر
            </div>

          </div>
        </div>
      )}
    </>
  );
}
