import React, { useState } from 'react';
import { FileText, ArrowRight, Shield, Award, CheckCircle, CheckSquare, Square, Globe, HelpCircle, Briefcase, Search, Printer } from 'lucide-react';
import { getWhatsAppLink } from '../data';
import { useLanguage } from '../LanguageContext';
import { translateDocText } from './visaTranslations';
// @ts-ignore
import visaAndFlags from '../assets/images/visa_and_flags_1781112021994.png';

interface VisaViewProps {
  navigateTo: (tab: string) => void;
}

interface CategorizedDocs {
  baseDocs: string[];
  profDocs: string[];
  purposeDocs: string[];
}

interface VisaCountryDetails {
  name: string;
  flag: string;
  generalInfo: string;
  baseDocs: string[];
  professionalDocs: {
    employee: string[];
    trader: string[];
    freelancer: string[];
    retiree: string[];
  };
}

const VISA_COUNTRIES: Record<string, VisaCountryDetails> = {
  turkey: {
    name: 'تأشيرة تركيا السياحية 🇹🇷',
    flag: '🇹🇷',
    generalInfo: 'تأشيرة الدخول المسبق لتركيا (سواء الإلكترونية B1 لمن هم دون 15 سنة أو فوق 35 سنة، أو التأشيرة الكلاسيكية للملف العادي مع حجز موعد Gateway). تتم معالجتها بالكامل لدى وكالتنا لضمان القبول.',
    baseDocs: [
      'جواز السفر الأصلي صالح لمدة لا تقل عن 6 أشهر 📖',
      'نسخة مصورة واضحة من الصفحة الأولى لجواز السفر 📄',
      'صورتين خلفية بيضاء حديثة ومطابقة للمعايير 📸',
      'تأمين السفر الدولي يغطي مدة الإقامة (نوفرها لك بالوكالة) 🛡️',
      'نسخة من حجز موعد البصمة Gateway (نتكفل بالتسجيل لك) 📅'
    ],
    professionalDocs: {
      employee: [
        'شهادة عمل مفصلة وموقعة من صاحب العمل 💼',
        'كشف الراتب لآخر 3 أشهر أخيرة (Fiches de paie) 💵',
        'كشف انتساب لصندوق الضمان الاجتماعي (CNAS) 📊'
      ],
      trader: [
        'نسخة مصورة من السجل التجاري (Registre du commerce) 📑',
        'شهادة الرمز الضابط للمكلف بالضريبة (NIF) 📊',
        'كشف حساب الضريبة الأخير (C20) 💳'
      ],
      freelancer: [
        'نسخة من بطاقة ممارسة المهنة الحرة أو الاعتماد 📁',
        'كشف حساب بنكي تجاري رسمي لآخر 3 أشهر 🏦',
        'شهادة ممارسة النشاط من الهيئة المنظمة 💼'
      ],
      retiree: [
        'شهادة تقاعد أصلية مع جدول قيمة المعاش (Attestation de retraite) 👴',
        'كشف حساب بنكي عادي أو كشف بريدي للضمان 💳'
      ]
    }
  },
  schengen: {
    name: 'تأشيرة شنغن الأوروبية 🇪🇺 (فرنسا 🇫🇷 / إسبانيا 🇪🇸)',
    flag: '🇪🇺',
    generalInfo: 'تأشيرة شنغن لزيارة الدول الأوروبية. تحتاج إلى ملف دقيق لتأكيد النية السياحية والغطاء المالي وحجز حقيقي وموعد بصمات مؤكد عبر مراكز TLScontact أو VFS Global.',
    baseDocs: [
      'جواز السفر الأصلي وتصوير الصفحات المليئة بالتأشيرات السابقة 📖',
      'صورتين بيومتريتين حديثتين متطابقتين مع معايير إيكاو 📸',
      'استمارة طلب تأشيرة شنغن معبأة وموقعة بدقة (نتكفل بها بالكامل) ✍️',
      'تأمين طبي دولي يغطي 30,000 يورو كحد أدنى 🏥',
      'حجز مبدئي مؤكد للطيران والفندق الداعم للملف (نوفره لك) 🏨',
      'كشف الحساب البنكي بالعملة الصعبة (يحتوي على الأقل 1000 يورو) 💳'
    ],
    professionalDocs: {
      employee: [
        'شهادة عمل حديثة باللغة الفرنسية 💼',
        'قرار إجازة سنوية أو رخصة غياب للمدة المحددة 📅',
        'كشوف الرواتب لآخر 3 أشهر مصادق عليها 💵',
        'شهادة الانتساب للضمان الاجتماعي CNAS بالفرنسية 📊'
      ],
      trader: [
        'السجل التجاري وقيد المستخرج المعرب والحديث 📑',
        'شهادة الرمز الضريبي NIF وشهادة الحساب الضريبي النظيف 📊',
        'كشف الحس�',
        'كشف الحساب البنكي التجاري بالدينار لآخر 3 أشهر 🏦'
      ],
      freelancer: [
        'بطاقة الحرفي أو المهني المعتمد مع توضيح الدخل 📁',
        'شهادة دفع الضرائب الخاصة بالمهن الحرة 📊',
        'كشف الحساب البنكي الأساسي لآخر 3 أشهر 💳'
      ],
      retiree: [
        'شهادة معاش تقاعدي بالفرنسية 👴',
        'كشف الحساب للبنك أو الحساب البريدي الجاري لآخر 3 أشهر 🏦'
      ]
    }
  },
  saudi: {
    name: 'تأشيرات المملكة العربية السعودية 🇸🇦',
    flag: '🇸🇦',
    generalInfo: 'تأشيرات الزيارة الشخصية والعائلية والسياحية للمملكة العربية السعودية، بالإضافة إلى خدمات حجز المواعيد وتوفير التأمين الإلكتروني وعروض العمرة طيلة عام 2026.',
    baseDocs: [
      'جواز سفر صالح لمدة لا تقل عن 6 أشهر 📖',
      'صورة شمسية ملونة ذات خلفية بيضاء نقية واضحة 📸',
      'صورة جواز السفر واضحة وكاملة الصفحات الأولى 📄',
      'توفير تأمين طبي حكومي سعودي معتمد (نصدره لك متضمناً مع الفيزا) 🏥'
    ],
    professionalDocs: {
      employee: [
        'لا تتطلب وثائق مهنية صعبة للتأشيرة الشخصية أو السياحية الإلكترونية! 🌟'
      ],
      trader: [
        'لا تحتاج لوثائق سجل تجاري للتأشيرة السياحية السعودية الإلكترونية! 💼'
      ],
      freelancer: [
        'تأشيرة سهلة جداً تصدر دون الحاجة لملف إداري معقد 📁'
      ],
      retiree: [
        'لا تتطلب وثائق خاصة للمباشرة بالتأشيرة السعودية الإلكترونية 👴'
      ]
    }
  }
};

/*
export const translateDocText = (text: string, lang: string): string => {
  if (lang !== 'fr' && lang !== 'en') return text;
  
  const cleanText = text.trim();
  
  const dictFr: Record<string, string> = {
    'جواز السفر الأصلي صالح لمدة لا تقل عن 6 أشهر 📖': 'Passeport original valide pour au moins 6 mois 📖',
    'نسخة مصورة واضحة من الصفحة الأولى لجواز السفر 📄': 'Copie claire de la première page du passeport 📄',
    'صورتين خلفية بيضاء حديثة ومطابقة للمعايير 📸': 'Deux photos récentes sur fond blanc conformes aux normes 📸',
    'صورتين خلفية بيضاء حديثة ومطابقة للمعايير القنصلية 📸': 'Deux photos d\'identité récentes sur fond blanc conformes aux normes consulaires 📸',
    'تأمين السفر الدولي يغطي مدة الإقامة (نوفرها لك بالوكالة) 🛡️': "Assurance voyage internationale couvrant le séjour (fournie par nous) 🛡️",
    'نسخة من حجز موعد البصمة Gateway (نتكفل بالتسجيل لك) 📅': 'Copie de la réservation de rendez-vous d\'empreintes Gateway (nous nous en chargeons) 📅',
    'شهادة عمل مفصلة وموقعة من صاحب العمل 💼': 'Attestation de travail détaillée et signée par l\'employeur 💼',
    'كشف الراتب لآخر 3 أشهر أخيرة (Fiches de paie) 💵': 'Fiches de paie des 3 derniers mois 💵',
    'كشف انتساب لصندوق الضمان الاجتماعي (CNAS) 📊': 'Attestation d\'affiliation à la CNAS 📊',
    'نسخة مصورة من السجل التجاري (Registre du commerce) 📑': 'Copie certifiée du registre du commerce (RC) 📑',
    'شهادة الرمز الضابط للمكلف بالضريبة (NIF) 📊': 'Certificat d\'identifiant fiscal (NIF) 📊',
    'كشف حساب الضريبة الأخير (C20) 💳': 'Dernier avertissement fiscal (C20) 💳',
    'نسخة من بطاقة ممارسة المهنة الحرة أو الاعتماد 📁': 'Copie de la carte professionnelle ou de l\'agrément 📁',
    'كشف حساب بنكي تجاري رسمي لآخر 3 أشهر 🏦': 'Relevé bancaire commercial officiel des 3 derniers mois 🏦',
    'شهادة ممارسة النشاط من الهيئة المنظمة 💼': 'Attestation d\'exercice d\'activité délivrée par l\'organisme régulateur 💼',
    'شهادة تقاعد أصلية مع جدول قيمة المعاش (Attestation de retraite) 👴': 'Attestation de retraite originale avec relevé des pensions 👴',
    'كشف حساب بنكي عادي أو كشف بريدي للضمان 💳': 'Relevé bancaire standard ou relevé CCP de garantie 💳',

    'جواز السفر الأصلي وتصوير الصفحات المليئة بالتأشيرات السابقة 📖': 'Passeport original et copie des pages contenant les visas précédents 📖',
    'صورتين بيومتريتين حديثتين متطابقتين مع معايير إيكاو 📸': 'Deux photos biométriques récentes conformes aux normes OACI 📸',
    'استمارة طلب تأشيرةشنغن معبأة وموقعة بدقة (نتكفل بها بالكامل) ✍️': 'Formulaire de demande de visa Schengen rempli et signé (nous nous en chargeons) ✍️',
    'تأمين طبي دولي يغطي 30,000 يورو كحد أدنى 🏥': 'Assurance médicale internationale couvrant au moins 30 000 € 🏥',
    'تأمين طبي دولي يغطي كلياً مدة الإقامة المقترحة (نوفرها لك بالوكالة) 🏥': 'Assurance médicale internationale couvrant la période de séjour proposée (fournie par nous) 🏥',
    'تأمين طبي دولي يغطي كامل مدة الإقامة المقترحة (نوفرها لك بالوكالة) 🏥': 'Assurance médicale internationale couvrant la période de séjour proposée (fournie par nous) 🏥',
    'حجز مبدئي مؤكد للطيران والفندق الداعم للملف (نوفره لك) 🏨': 'Réservation de vol et d\'hôtel confirmée pour le dossier (nous la fournissons) 🏨',
    'حجز طيران مبدئي وفندق مرن ملائم لتواريخ السفر المحددة (نضمنه للملف) 🏨': 'Réservation de vol provisoire et hôtel flexible adaptés aux dates définies (fournis par nous) 🏨',
    'كشف الحساب البنكي بالعملة الصعبة (يحتوي على الأقل 1000 يورو) 💳': 'Relevé de compte de devises (contenant au moins 1000 €) 💳',
    'شهادة عمل حديثة باللغة الفرنسية 💼': 'Attestation de travail récente en français 💼',
    'قرار إجازة سنوية أو رخصة غياب للمدة المحددة 📅': 'Titre de congé annuel ou autorisation d\'absence pour la période définie 📅',
    'كشوف الرواتب لآخر 3 أشهر مصادق عليها 💵': 'Fiches de paie certifiées des 3 derniers mois 💵',
    'شهادة الانتساب للضمان الاجتماعي CNAS بالفرنسية 📊': 'Attestation d\'affiliation CNAS en français 📊',
    'السجل التجاري وقيد المستخرج المعرب والحديث 📑': 'Registre du commerce et extrait mis à jour 📑',
    'شهادة الرمز الضريبي NIF وشهادة الحساب الضريبي النظيف 📊': 'Certificat NIF et attestation de régularité fiscale (extrait de rôle) 📊',
    'كشف الحساب البنكي التجاري بالدينار لآخر 3 أشهر 🏦': 'Relevé de compte de banque commercial en DA des 3 derniers mois 🏦',
    'بطاقة الحرفي أو المهني المعتمد مع توضيح الدخل 📁': 'Carte d\'artisan ou de professionnel agréé avec justificatif de revenu 📁',
    'شهادة دفع الضرائب الخاصة بالمهن الحرة 📊': 'Attestation de paiement de l\'impôt pour professions libérales 📊',
    'كشف الحساب البنكي الأساسي لآخر 3 أشهر 💳': 'Relevé de compte bancaire principal des 3 derniers mois 💳',
    'شهادة معاش تقاعدي بالفرنسية 👴': 'Attestation de pension de retraite en français 👴',
    'كشف الحساب للبنك أو الحساب البريدي الجاري لآخر 3 أشهر 🏦': 'Relevé bancaire ou relevé de compte postal (CCP) des 3 derniers mois 🏦',

    'جواز سفر صالح لمدة لا تقل عن 6 أشهر 📖': 'Passeport valide pour au moins 6 mois 📖',
    'صورة شمسية ملونة ذات خلفية بيضاء نقية واضحة 📸': 'Photo d\'identité en couleur sur fond blanc net 📸',
    'صورة جواز السفر واضحة وكاملة الصفحات الأولى 📄': 'Copie claire et complète de la première page du passeport 📄',
    'توفير تأمين طبي حكومي سعودي معتمد (نصدره لك متضمناً مع الفيزا) 🏥': 'Assurance médicale gouvernementale saoudienne agréée (émise avec le visa) 🏥',
    'لا تتطلب وثائق مهنية صعبة للتأشيرة الشخصية أو السياحية الإلكترونية! 🌟': 'Aucun document professionnel requis pour le visa touristique électronique ! 🌟',
    'لا تحتاج لوثائق سجل تجاري للتأشيرة السياحية السعودية الإلكترونية! 💼': 'Aucun registre du commerce requis pour le visa saoudien électronique ! 💼',
    'تأشيرة سهلة جداً تصدر دون الحاجة لملف إداري معقد 📁': 'Visa très simple délivré sans dossier administratif complexe 📁',
    'لا تتطلب وثائق خاصة للمباشرة بالتأشيرة السعودية الإلكترونية 👴': 'Aucun document particulier requis pour le visa saoudien électronique 👴',

    'جواز السفر الأصلي (صالح لأكثر من 6 أشهر) + نسخة واضحة من الصفحة الأولى 📖': 'Passeport original (valide plus de 6 mois) + copie claire de la première page 📖',
    'تأمين سفر دولي يغطي كامل فترة الرحلة (توفرها الوكالة) 🛡️': "Assurance voyage internationale couvrant tout le séjour (fournie par l'agence) 🛡️",
    'شهادة ميلاد حديثة + نسخة من بطاقة التعريف الوطنية البيومترية 📄': 'Acte de naissance récent + copie de la carte d\'identité nationale biométrique 📄',
    'نسخة سكانر ملونة وعالية الدقة للجواز (صالح لأكثر من 6 أشهر) 📖': 'Scan couleur haute résolution du passeport (valide plus de 6 mois) 📖',
    'صورة شخصية رقمية بخلفية بيضاء (صيغة JPG) 📸': 'Photo d\'identité numérique sur fond blanc (format JPG) 📸',
    'حجز تذكرة طيران مؤكدة (ذهاب وإياب) ✈️': 'Réservation de billet d\'avion confirmée (aller-retour) ✈️',
    'حجز طيران مؤكد ذهاب وإياب ✈️': 'Réservation de vol aller-retour confirmée ✈️',
    'تذكرة طائرة مؤكدة (ذهاب وإياب) ✈️': 'Billet d\'avion aller-retour confirmé ✈️',
    'حجز فندقي مؤكد يغطي كامل فترة الإقامة ومبلغ مالي كاش (مصروف جيب) 💵': 'Réservation d\'hôtel confirmée pour tout le séjour et argent de poche liquide 💵',
    'نسخة من الفيزا السابقة المستعملة (شنغن أو أمريكا الصالحة والمستعملة من قبل) 💳': 'Copie de l\'ancien visa utilisé (Schengen ou USA valide et déjà utilisé) 💳',
    'جواز سفر أصلي صالح لأكثر من 6 أشهر 📖': 'Passeport original valide pour plus de 6 mois 📖',

    'شهادة مدرسية حديثة للعام الجاري أو بطاقة طالب جامعية 🎓': 'Certificat de scolarité récent ou carte d\'étudiant universitaire 🎓',
    'شهادة عائلية لإثبات صلة القرابة مع الكفيل 👥': 'Fiche familiale d\'état civil pour prouver la parenté avec le garant 👥',
    'شهادة عائلية لإثبات صلة القرابة والولاية الشرعية 👥': 'Fiche familiale d\'état civil prouvant la parenté et la garde légale 👥',
    'شهادة عدم العمل من البلدية + عقد الزواج + الشهادة العائلية 📄': 'Attestation de non-travail de la mairie + contrat de mariage + fiche familiale 📄',
    'شهادة عدم العمل من البلدية + إثبات صلة القرابة (شهادة عائلية) 👥': 'Attestation de non-travail de la mairie + preuve de parenté (fiche familiale) 👥',
    'تصريح أبوي بالسفر مصادق عليه في البلدية من الوالد (أو الوالدين معاً) ✍️': 'Autorisation parentale de voyager signée et légalisée à la mairie ✍️',
    'كشف الحساب البنكي للكفيل لآخر 6 أشهر يوضح حركة مالية كافية 🏦': 'Relevé bancaire du garant pour les 6 derniers mois avec transactions suffisantes 🏦',
    'كشف حساب بنكي للولي الشرعي لآخر 6 أشهر 🏦': 'Relevé de compte de banque du tuteur pour les 6 derniers mois 🏦',
    'كشف الحساب البنكي للزوج لآخر 6 أشهر لتأمين تكاليف الزيارة والسفر 🏦': 'Relevé de banque du conjoint pour les 6 derniers mois pour couvrir les frais de voyage 🏦',
    'كشف حساب بنكي للكفيل لآخر 6 أشهر يثبت القدرة التامة على الإنفاق والدعم 🏦': 'Relevé de banque du garant des 6 derniers mois prouvant sa capacité financière 🏦',
    
    'شهادة عمل حديثة ومختومة وموقعة توضح (المنصب، الراتب، وتاريخ التوظيف) للكفيل الموظف 💼': 'Attestation de travail récente signée et tamponnée (poste, salaire, date d\'embauche) du garant salarié 💼',
    'كشوف الراتب (Fiches de paie) لآخر 3 أشهر الأخيرة للكفيل 💵': 'Bulletins de salaire des 3 derniers mois du garant 💵',
    'شهادة الانتساب لصندوق الضمان الاجتماعي (CNAS) حديثة ومختومة للكفيل 📊': 'Attestation d\'affiliation CNAS récente et tamponnée du garant 📊',
    
    'نسخة طبق الأصل من السجل التجاري (Registre du Commerce) للكفيل التاجر 📑': 'Copie conforme du registre du commerce du garant commerçant 📑',
    'الشهادة الضريبية لعام 2026 (C20 أو جدول الضرائب المصفى الحديث) للكفيل 📊': 'Attestation fiscale 2026 (C20 ou extrait de rôle récent) du garant 📊',
    'شهادة الانتساب للضمان الاجتماعي لغير الأجراء (CASNOS) مع وصل تسديد السنة الجارية للكفيل 💳': 'Attestation d\'affiliation CASNOS avec reçu de paiement de l\'année en cours du garant 💳',
    
    'شهادة عمل حديثة ومختومة وموقعة توضح (المنصب، الراتب، وتاريخ التوظيف) 💼': 'Attestation de travail récente tamponnée et signée (poste, salaire et embauche) 💼',
    'كشوف الراتب (Fiches de paie) لآخر 3 أشهر الأخيرة 💵': 'Bulletins de salaire des 3 derniers mois 💵',
    'شهادة الانتساب لصندوق الضمان الاجتماعي (CNAS) حديثة ومختومة 📊': 'Attestation d\'affiliation CNAS récente et tamponnée 📊',
    'كشف حساب بنكي لآخر 3 أشهر يوضح وتيرة صب الرواتب دورياً 🏦': 'Relevé bancaire des 3 derniers mois montrant les virements réguliers de salaire 🏦',

    'نسخة مصورة من السجل التجاري الأصلي والحديث بالفرنسية 📑': 'Copie du registre du commerce (RC) original traduit ou récent 📑',
    'شهادة الرمز الجبائي NIF ورمز النشاط الضريبي 📊': 'Attestation d\'identifiant fiscal (NIF) et code d\'activité 📊',
    'شهادة دفع الضرائب السنوية وتصفية الديون الضريبية (C20 / Extrait de rôle clean) 💳': 'Extrait de rôle propre ou attestation d\'apurement fiscal (C20 / extrait de rôle) 💳',
    'شهارة الانتساب لصندوق CASNOS موضحاً تسوية الاشتراكات 📊': 'Attestation d\'affiliation CASNOS montrant le règlement des cotisations 📊',
    'كشف الحساب التجاري للشركة أو الحساب البنكي النشط لآخر 3 أشهر 🏦': 'Relevé bancaire commercial de l\'entreprise ou relevé actif de 3 mois 🏦',

    'بطاقة الحسم أو بطاقة ممارسة المهنة الخاصة الحالية 📁': 'Carte professionnelle ou carte d\'exercice libéral en cours de validité 📁',
    'قرار الترخيص أو شهادة الاعتماد الرسمية المعتمدة للنشاط 💼': 'Décision d\'agrément ou attestation d\'autorisation officielle d\'activité 💼',
    'شهادة دفع الضرائب الخاصة بالمهن غير التجارية والمهن الحرة 📊': 'Attestation de paiement des impôts pour professions libérales et non commerciales 📊',
    'كشف حساب بنكي أساسي دوري لآخر 3 أشهر 🏦': 'Relevé bancaire principal périodique des 3 derniers mois 🏦',

    'شهادة تقاعد أصلية مع جدول قيمة المعاش السنوي 👴': 'Attestation de retraite originale avec relevé de pension annuelle 👴',
    'شهادة التقاعد الأصلية ببيان التصفية (Attestation de retraite) 👴': 'Attestation de retraite originale avec relevé de pension 👴',
    'كشف حساب بنكي للـ 3 أشهر الأخيرة أو دفتر صب المعاش البريدي 💳': 'Relevé bancaire des 3 derniers mois ou carnet de pension postale 💳',
    'كشف حساب بنكي أو كشف بريدي لآخر 3 أشهر 💳': 'Relevé de compte de banque ou CCP pour les 3 derniers mois 💳',

    '⚠️ (شرط خاص بماليزيا لعام 2026): ملء استمارة الدخول الرقمية (MDAC) عبر الإنترنت قبل السفر بـ 3 أيام 🌐': '⚠️ (Condition spéciale Malaisie 2026) : Remplir le formulaire d\'entrée numérique (MDAC) en ligne 3 jours avant le départ 🌐',
    '⚠️ (شرط للأقل من 25 سنة): إضافة تنبيه باحتمالية طلب حجز فندق مؤكد وضمان مالي من طرف السلطات الإماراتية.': '⚠️ (Moins de 25 ans) : Attention, les autorités peuvent exiger une réservation d\'hôtel confirmée et une garantie financière.',
    '⚠️ (تنبيه للملفات): الوكالة تساعد بمهنية في الترجمة وتقديم الملف وتأمين الموعد لكن منح أو رفض التأشيرة يبقى سلطة سيادية مطلقة للقنصلية المعنية.': '⚠️ (Note) : L\'agence aide pour la traduction, le dossier et le rendez-vous, mais l\'octroi ou le refus du visa reste de la souveraineté de la console.',

    '⚠️ تنبيه إجباري ثابت لشنغن: جميع الوثائق الإدارية الصادرة بالعربية يجب ترجمتها رسمياً إلى الفرنسية أو الإنجليزية 🌐': '⚠️ Note obligatoire Schengen : Tous les documents administratifs délivrés en arabe doivent être traduits officiellement en français ou en anglais 🌐',
    'كشف حساب العملة الصعبة Euro يثبت رصيداً كافياً لآخر 3 أشهر (يدعم نية السفر لشنغن) 💶': 'Relevé de compte en devises (Euro) justifiant d\'un solde suffisant pour les 3 derniers mois (appui pour Schengen) 💶',
    'كشف الدينار لآخر 3 أشهر لربط المعاملات وتوضيح الكفاءة المالية للعيش المؤقت 💳': 'Relevé de compte Dinar des 3 derniers mois pour l\'appui financier 💳',
    'حجز فندقي مبدئي وحجز طائرة متطابقين تماماً وموثقين في التواريخ المقررة لرحلتك 🏨': 'Réservation d\'hôtel et réservation de vol concordantes et confirmées aux dates prévues de votre voyage 🏨',
    'حجز فندق مؤكد وتذكرة طائرة ذهاب وإياب متطابقة 🏨': 'Réservation d\'hôtel confirmée et billet d\'avion aller-retour concordant 🏨',
    'تنبيه التسجيل والإيداع: يتم إرسال وحجز الموعد والإيداع لدى مركز التسهيل القنصلي المعتمد VFS Tasheel 🏛️': 'Note de réservation : Le rendez-vous et le dépôt se font auprès du centre consulaire agréé VFS Tasheel 🏛️',
    'حجز تذكرة طائرة مبدئي وحجز فندقي مؤقت يغطي كامل الفترات ومطابق للتواريخ المقررة 🏨': 'Réservation de vol provisoire et hébergement temporaire conforme aux dates prévues 🏨',
    'رسالة دعوة رسمية (Lettre d\'invitation) من الشركة المستضيفة في أوروبا تثبت سبب السفر التجاري ✉️': 'Lettre d\'invitation officielle de la société d\'accueil en Europe prouvant le motif de voyage d\'affaires ✉️',
    'أمر بمهمة (Ordre de mission) من الشركة الجزائرية التي يتبع لها المسافر 💼': 'Ordre de mission délivré par l\'entreprise algérienne dont dépend le voyageur 💼',
    'السجل التجاري للشركتين (الجزائرية المُوفدة والأوروبية المستضيفة) لضمان الصرامة والاعتماد القنصلي 🏢': 'Registre de commerce des deux entreprises d\'envoi et d\'accueil 🏢',
    'رسالة دعوة رسمية (Lettre d\'invitation) من الشركة المستضيفة بالخارج مختومة وموثقة ✉️': 'Lettre d\'invitation officielle signée de l\'entreprise d\'accueil à l\'étranger ✉️',
    'أمر بمهمة (Ordre de mission) يوضح غرض وطبيعة سفرك العملي من الشركة بالمصالح الجزائرية 💼': 'Ordre de mission de l\'entreprise algérienne 💼',
    'السجل التجاري لكلا السجلين والمؤسستين الداعمتين للمهمة والموظف 🏢': 'Registre de commerce des deux entités de mission 🏢',
    'شهادة إيواء رسمية (Attestation d\'accueil) أصلية صادرة عن بلدية المضيف بالخارج في أوروبا 🏠': 'Attestation d\'accueil officielle délivrée par la mairie de l\'hébergeant en Europe 🏠',
    'إثبات صلة القرابة الموثقة بالقرابة كدفتر عائلي أو شهادة عائلية مترجمة 👥': 'Preuve du lien de parenté par livret de famille traduit 👥',
    'دعوة إيواء رسمية (Attestation d\'accueil) أصلية مستخرجة من بلدية ومصالح الشخص المستضيف بالخارج 🏠': 'Attestation d\'accueil officielle de la mairie de l\'hôte à l\'étranger 🏠',
    'إثبات صلة القرابة بربط الملف (دفتر عائلي عاصمي أو بلدي) 👥': 'Preuve d\'un lien de parenté direct par livret de famille 👥',
    'خطاب القبول النهائي والأكاديمي الرسمي الصادر من الجامعة السعودية المانحة للمقعد 🎓': 'Lettre d\'acceptation académique de l\'université saoudienne d\'accueil 🎓',
    'إشعار التأشيرة الدراسية الصادر والموجه من وزارة الخارجية السعودية 🇸🇦': 'Notification de visa d\'études du ministère saoudien des affaires étrangères 🇸🇦',
    'الشهادات الأكاديمية والمدرسية الجزائرية مصدقة ومصادق عليها بالكامل من وزارة الخارجية 📜': 'Diplômes algériens certifiés par le ministère des affaires étrangères 📜',
    'صحيفة السوابق العدلية (الصحيفة رقم 03) حديثة العهد ⚖️': 'Extrait de casier judiciaire (Bulletin N° 3) récent ⚖️',
    'تقرير طبي رسمي مفصل ومصادق عليه يوضح الخلو من الأمراض المعدية والسارية 🩺': 'Rapport médical officiel certifiant l\'absence de maladies infectieuses 🩺',
    'شهادة القبول والتسجيل النهائي الصادر عبر منصة Campus France الجزائر لعام 2026 🎓': 'Attestation d\'inscription émise via Campus France Algérie pour 2026 🎓',
    'الحساب البنكي المغلق (Compte Bloqué) بمبلغ لا يقل عن 738 يورو شهرياً لتأمين مصاريف الدراسة بفرنسا 💶': 'Compte bloqué avec un montant minimum de 738 € par mois pour études en France 💶',
    'إثبات السكن في بلد المقصد في فرنسا (عقد إيجار رسمي، شهادة إيواء، أو سكن جامعي CROUS) 🏠': 'Justificatif de logement en France (Contrat de bail ou CROUS) 🏠',
    'خطاب القبول الجامعي المعتمد من الجامعة التركية مع إثبات رسمي لدفع القسط الدراسي الأول 🎓': 'Lettre d\'admission de l\'université turque et paiement du premier semestre 🎓',
    'تأمين صحي تركي دراسي مخصص ومعتمد طيلة فترات التعلم والتعليم 🩺': 'Assurance maladie étudiante turque agréée pour les études 🩺',
    'شهادة قبول جامعي أو تسجيل نهائي (Attestation d\'inscription) معترف بها من المعهد أو الجامعة المستضيفة بالخارج 🎓': 'Attestation d\'inscription reconnue de l\'établissement d\'accueil 🎓',
    'الحساب البنكي المغلق (Compte Bloqué) بمبلغ يثبت تجميد قدرة متمكنة لمصاريف سنة تعليمية 🏦': 'Compte bancaire bloqué pour couvrir l\'année scolaire 🏦',
    'آخر الشهادات العلمية والمؤهلات المحصل عليها بالجزائر مترجمة باللغات الرسمية للبلد 📜': 'Derniers diplômes obtenus traduits en langue officielle de destination 📜',
    'تقرير طبي مفصل ومختوم من طبيب مختص بالجزائر يؤكد الحاجة الماسة للعلاج أو المتابعة الطبية بالخارج 🩺': 'Rapport médical attestant du besoin de soins à l\'étranger 🩺',
    'موافقة رسمية وتحديد موعد استقبال طبي من الهيئة الاستشفائية المستقبلة بالخارج 🏥': 'Accord officiel de l\'établissement de santé d\'accueil à l\'étranger 🏥',
    'الفاتورة التقديرية لكافة العلاجات المقررة (Devis) مع تقديم إثبات التغطية المالية الملائمة 💰': 'Facture estimative des soins prévus et couverture adéquate 💰',

    'شهادة عمل حديثة ومفصلة موقعة من صاحب العمل 💼': 'Attestation de travail récente et détaillée signée par l\'employeur 💼',
    'كشف حساب بنكي تجاري نشط لآخر 3 أشهر 🏦': 'Relevé de compte de banque commercial actif pour les 3 derniers mois 🏦',
    'نسخة من بطاقة ممارسة المهنة الحرة أو الاعتماد المهني 📁': 'Copie de la carte professionnelle ou de l\'agrément professionnel 📁',
    'كشف حساب بنكي شخصي أو تجاري لآخر 3 أشهر 💳': 'Relevé de compte de banque personnel ou commercial des 3 derniers mois 💳',
  };

  const dictEn: Record<string, string> = {
    'جواز السفر الأصلي صالح لمدة لا تقل عن 6 أشهر 📖': 'Original passport valid for at least 6 months 📖',
    'نسخة مصورة واضحة من الصفحة الأولى لجواز السفر 📄': 'Clear photocopy of the first page of the passport 📄',
    'صورتين خلفية بيضاء حديثة ومطابقة للمعايير 📸': 'Two recent photos on white background conforming to standards 📸',
    'صورتين خلفية بيضاء حديثة ومطابقة للمعايير القنصلية 📸': 'Two recent photos on white background conforming to consular standards 📸',
    'تأمين السفر الدولي يغطي مدة الإقامة (نوفرها لك بالوكالة) 🛡️': "International travel insurance covering the stay (provided by the agency) 🛡️",
    'نسخة من حجز موعد البصمة Gateway (نتكفل بالتسجيل لك) 📅': 'Copy of the Gateway fingerprint appointment confirmation (we take care of registration) 📅',
    'شهادة عمل مفصلة وموقعة من صاحب العمل 💼': 'Detailed job certificate signed by the employer 💼',
    'كشف الراتب لآخر 3 أشهر أخيرة (Fiches de paie) 💵': 'Salary slips for the last 3 months 💵',
    'كشف انتساب لصندوق الضمان الاجتماعي (CNAS) 📊': 'Social security affiliation certificate (CNAS) 📊',
    'نسخة مصورة من السجل التجاري (Registre du commerce) 📑': 'Photocopy of the commercial register (RC) 📑',
    'شهادة الرمز الضابط للمكلف بالضريبة (NIF) 📊': 'Taxpayer registration certificate (NIF) 📊',
    'كشف حساب الضريبة الأخير (C20) 💳': 'Last tax statement (C20) 💳',
    'نسخة من بطاقة ممارسة المهنة الحرة أو الاعتماد 📁': 'Copy of professional license or accreditation 📁',
    'كشف حساب بنكي تجاري رسمي لآخر 3 أشهر 🏦': 'Official commercial bank statement for the last 3 months 🏦',
    'شهادة ممارسة النشاط من الهيئة المنظمة 💼': 'Certificate of active practice from the regulating authority 💼',
    'شهادة تقاعد أصلية مع جدول قيمة المعاش (Attestation de retraite) 👴': 'Original retirement certificate with pension schedule 👴',
    'كشف حساب بنكي عادي أو كشف بريدي للضمان 💳': 'Standard bank or postal account statement for warranty 💳',

    'جواز السفر الأصلي وتصوير الصفحات المليئة بالتأشيرات السابقة 📖': 'Original passport and copies of pages with previous visas 📖',
    'صورتين بيومتريتين حديثتين متطابقتين مع معايير إيكاو 📸': 'Two recent biometric photos matching ICAO standards 📸',
    'استمارة طلب تأشيرةشنغن معبأة وموقعة بدقة (نتكفل بها بالكامل) ✍️': 'Schengen visa application form accurately filled out and signed (we handle it entirely) ✍️',
    'تأمين طبي دولي يغطي 30,000 يورو كحد أدنى 🏥': 'International medical insurance covering at least €30,000 🏥',
    'تأمين طبي دولي يغطي كلياً مدة الإقامة المقترحة (نوفرها لك بالوكالة) 🏥': 'International medical insurance covering the proposed stay period (provided by the agency) 🏥',
    'تأمين طبي دولي يغطي كامل مدة الإقامة المقترحة (نوفرها لك بالوكالة) 🏥': 'International medical insurance covering the proposed stay period (provided by the agency) 🏥',
    'حجز مبدئي مؤكد للطيران والفندق الداعم للملف (نوفره لك) 🏨': 'Confirmed tentative flight & hotel bookings for the file (we provide it) 🏨',
    'حجز طيران مبدئي وفندق مرن ملائم لتواريخ السفر المحددة (نضمنه للملف) 🏨': 'Tentative flight booking and flexible hotel booking matching travel dates (provided for file support) 🏨',
    'كشف الحساب البنكي بالعملة الصعبة (يحتوي على الأقل 1000 يورو) 💳': 'Foreign currency bank statement (minimum balance of €1,000) 💳',
    'شهادة عمل حديثة باللغة الفرنسية 💼': 'Recent employment certificate in French 💼',
    'قرار إجازة سنوية أو رخصة غياب للمدة المحددة 📅': 'Annual leave decision or absence authorization for the duration 📅',
    'كشوف الرواتب لآخر 3 أشهر مصادق عليها 💵': 'Certified salary slips for the last 3 months 💵',
    'شهادة الانتساب للضمان الاجتماعي CNAS بالفرنسية 📊': 'CNAS social security affiliation certificate in French 📊',
    'السجل التجاري وقيد المستخرج المعرب والحديث 📑': 'Commercial register and updated summary extract 📑',
    'شهادة الرمز الضريبي NIF وشهادة الحساب الضريبي النظيف 📊': 'NIF tax certificate and clean tax clearance certificate 📊',
    'كشف الحساب البنكي التجاري بالدينار لآخر 3 أشهر 🏦': 'Commercial bank statement in Dinar (DA) for the last 3 months 🏦',
    'بطاقة الحرفي أو المهني المعتمد مع توضيح الدخل 📁': 'Certified artisan or professional card with income details 📁',
    'شهادة دفع الضرائب الخاصة بالمهن الحرة 📊': 'Tax payment proof for liberal professions 📊',
    'كشف الحساب البنكي الأساسي لآخر 3 أشهر 💳': 'Primary bank statement for the last 3 months 💳',
    'شهادة معاش تقاعدي بالفرنسية 👴': 'Retirement pension certificate in French 👴',
    'كشف الحساب للبنك أو الحساب البريدي الجاري لآخر 3 أشهر 🏦': 'Bank or postal account (CCP) statement for the last 3 months 🏦',

    'جواز سفر صالح لمدة لا تقل عن 6 أشهر 📖': 'Passport valid for at least 6 months 📖',
    'صورة شمسية ملونة ذات خلفية بيضاء نقية واضحة 📸': 'Clear color portrait photo on pure white background 📸',
    'صورة جواز السفر واضحة وكاملة الصفحات الأولى 📄': 'Clear and complete photocopy of the passport\'s front pages 📄',
    'توفير تأمين طبي حكومي سعودي معتمد (نصدره لك متضمناً مع الفيزا) 🏥': 'Approved Saudi government medical insurance (issued with your visa) 🏥',
    'لا تتطلب وثائق مهنية صعبة للتأشيرة الشخصية أو السياحية الإلكترونية! 🌟': 'No complex professional documents required for personal or tourist electronic visa! 🌟',
    'لا تحتاج لوثائق سجل تجاري للتأشيرة السياحية السعودية الإلكترونية! 💼': 'No commercial register documents needed for Saudi electronic tourist visa! 💼',
    'تأشيرة سهلة جداً تصدر دون الحاجة لملف إداري معقد 📁': 'Extremely easy visa issued without complex administrative files 📁',
    'لا تتطلب وثائق خاصة للمباشرة بالتأشيرة السعودية الإلكترونية 👴': 'No special documents required to proceed with Saudi electronic visa 👴',

    'جواز السفر الأصلي (صالح لأكثر من 6 أشهر) + نسخة واضحة من الصفحة الأولى 📖': 'Original passport (valid for over 6 months) + clear copy of the first page 📖',
    'تأمين سفر دولي يغطي كامل فترة الرحلة (توفرها الوكالة) 🛡️': 'International travel insurance covering the entire trip (provided by the agency) 🛡️',
    'شهادة ميلاد حديثة + نسخة من بطاقة التعريف الوطنية البيومترية 📄': 'Recent birth certificate + copy of bio national ID card 📄',
    'نسخة سكانر ملونة وعالية الدقة للجواز (صالح لأكثر من 6 أشهر) 📖': 'High-resolution color scanned copy of passport (valid for over 6 months) 📖',
    'صورة شخصية رقمية بخلفية بيضاء (صيغة JPG) 📸': 'Digital portrait photo with a white background (JPG format) 📸',
    'حجز تذكرة طيران مؤكدة (ذهاب وإياب) ✈️': 'Confirmed roundtrip flight ticket booking ✈️',
    'حجز طيران مؤكد ذهاب وإياب ✈️': 'Confirmed roundtrip flight booking ✈️',
    'تذكرة طائرة مؤكدة (ذهاب وإياب) ✈️': 'Confirmed roundtrip flight ticket ✈️',
    'حجز فندقي مؤكد يغطي كامل فترة الإقامة ومبلغ مالي كاش (مصروف جيب) 💵': 'Confirmed hotel reservation covering the entire stay and pocket cash 💵',
    'نسخة من الفيزا السابقة المستعملة (شنغن أو أمريكا الصالحة والمستعملة من قبل) 💳': 'Copy of previous used visa (valid and previously utilized Schengen or USA visa) 💳',
    'جواز سفر أصلي صالح لأكثر من 6 أشهر 📖': 'Original passport valid for more than 6 months 📖',

    'شهادة مدرسية حديثة للعام الجاري أو بطاقة طالب جامعية 🎓': 'Recent school certificate for the current year or university student card 🎓',
    'شهادة عائلية لإثبات صلة القرابة مع الكفيل 👥': 'Family state registry certificate proving relationship with sponsor 👥',
    'شهادة عائلية لإثبات صلة القرابة والولاية الشرعية 👥': 'Family registry certificate proving relationship and legal guardianship 👥',
    'شهادة عدم العمل من البلدية + عقد الزواج + الشهادة العائلية 📄': 'Unemployment certificate from municipal hall + marriage contract + family certificate 📄',
    'شهادة عدم العمل من البلدية + إثبات صلة القرابة (شهادة عائلية) 👥': 'Unemployment certificate from municipal hall + proof of relationship (family registry) 👥',
    'تصريح أبوي بالسفر مصادق عليه في البلدية من الوالد (أو الوالدين معاً) ✍️': 'Parental travel authorization legalized at municipal hall by the father (or both) ✍️',
    'كشف الحساب البنكي للكفيل لآخر 6 أشهر يوضح حركة مالية كافية 🏦': 'Sponsor bank statements for the last 6 months with sufficient turnover 🏦',
    'كشف حساب بنكي للولي الشرعي لآخر 6 أشهر 🏦': 'Legal guardian bank statements for the last 6 months 🏦',
    'كشف الحساب البنكي للزوج لآخر 6 أشهر لتأمين تكاليف الزيارة والسفر 🏦': 'Spouse bank statements for the last 6 months to secure travel & visit expenses 🏦',
    'كشف حساب بنكي للكفيل لآخر 6 أشهر يثبت القدرة التامة على الإنفاق والدعم 🏦': 'Sponsor bank statements for the last 6 months proving full financial capability 🏦',

    'شهادة عمل حديثة ومختومة وموقعة توضح (المنصب، الراتب، وتاريخ التوظيف) للكفيل الموظف 💼': 'Recent stamped and signed employment certificate indicating (work title, salary, hire date) of employee sponsor 💼',
    'كشوف الراتب (Fiches de paie) لآخر 3 أشهر الأخيرة للكفيل 💵': 'Sponsor salary slips (Fiches de paie) for the last 3 months 💵',
    'شهادة الانتساب لصندوق الضمان الاجتماعي (CNAS) حديثة ومختومة للكفيل 📊': 'Recent stamped social security affiliation certificate (CNAS) of sponsor 📊',

    'نسخة طبق الأصل من السجل التجاري (Registre du Commerce) للكفيل التاجر 📑': 'Certified copy of merchant registry (RC) of merchant sponsor 📑',
    'الشهادة الضريبية لعام 2026 (C20 أو جدول الضرائب المصفى الحديث) للكفيل 📊': 'Tax clearance certificate for 2026 (C20/recent clean roll) of sponsor 📊',
    'شهادة الانتساب للضمان الاجتماعي لغير الأجراء (CASNOS) مع وصل تسديد السنة الجارية للكفيل 💳': 'Social security affiliation for self-employed (CASNOS) with receipt for sponsor 💳',

    'شهادة عمل حديثة ومختومة وموقعة توضح (المنصب، الراتب، وتاريخ التوظيف) 💼': 'Recent stamped and signed job certificate indicating (title, salary, and date of hire) 💼',
    'كشوف الراتب (Fiches de paie) لآخر 3 أشهر الأخيرة 💵': 'Salary slips for the last 3 months 💵',
    'شهادة الانتساب لصندوق الضمان الاجتماعي (CNAS) حديثة ومختومة 📊': 'Recent stamped social security affiliation certificate (CNAS) 📊',
    'كشف حساب بنكي لآخر 3 أشهر يوضح وتيرة صب الرواتب دورياً 🏦': 'Bank statements for the last 3 months showing periodic payroll deposits 🏦',

    'نسخة مصورة من السجل التجاري الأصلي والحديث بالفرنسية 📑': 'Copy of original and recent commercial register in French 📑',
    'شهادة الرمز الجبائي NIF ورمز النشاط الضريبي 📊': 'Tax identifier certificate NIF and tax code 📊',
    'شهادة دفع الضرائب السنوية وتصفية الديون الضريبية (C20 / Extrait de rôle clean) 💳': 'Annual tax clearance and clean tax sheet (C20 / clean roll) 💳',
    'شهارة الانتساب لصندوق CASNOS موضحاً تسوية الاشتراكات 📊': 'CASNOS affiliation certificate showing settled contributions 📊',
    'كشف الحساب التجاري للشركة أو الحساب البنكي النشط لآخر 3 أشهر 🏦': 'Corporate commercial account or active bank statement for the last 3 months 🏦',

    'بطاقة الحسم أو بطاقة ممارسة المهنة الخاصة الحالية 📁': 'Current professional card or active practice license 📁',
    'قرار الترخيص أو شهادة الاعتماد الرسمية المعتمدة للنشاط 💼': 'Official license decision or accredited certificate for the activity 💼',
    'شهادة دفع الضرائب الخاصة بالمهن غير التجارية والمهن الحرة 📊': 'Tax payment proof for non-commercial and liberal activities 📊',
    'كشف حساب بنكي أساسي دوري لآخر 3 أشهر 🏦': 'Periodic primary bank statement for the last 3 months 🏦',

    'شهادة تقاعد أصلية مع جدول قيمة المعاش السنوي 👴': 'Original retirement certificate with annual pension statement 👴',
    'شهادة التقاعد الأصلية ببيان التصفية (Attestation de retraite) 👴': 'Original retirement certificate with liquidation statement 👴',
    'كشف حساب بنكي للـ 3 أشهر الأخيرة أو دفتر صب المعاش البريدي 💳': 'Bank statement for the last 3 months or postal pension deposit book 💳',
    'كشف حساب بنكي أو كشف بريدي لآخر 3 أشهر 💳': 'Bank statement or postal account statement for the last 3 months 💳',

    '⚠️ (شرط خاص بماليزيا لعام 2026): ملء استمارة الدخول الرقمية (MDAC) عبر الإنترنت قبل السفر بـ 3 أيام 🌐': '⚠️ (Malaysia 2026 rule): Fill in the Malaysia Digital Arrival Card (MDAC) online 3 days prior to arrival 🌐',
    '⚠️ (شرط للأقل من 25 سنة): إضافة تنبيه باحتمالية طلب حجز فندق مؤكد وضمان مالي من طرف السلطات الإماراتية.': '⚠️ (Under 25 restriction): Attention! UAE authorities might request confirmed hotel booking & financial deposit.',
    '⚠️ (تنبيه للملفات): الوكالة تساعد بمهنية في الترجمة وتقديم الملف وتأمين الموعد لكن منح أو رفض التأشيرة يبقى سلطة سيادية مطلقة للقنصلية المعنية.': '⚠️ (Dossier Note): The agency professionally assists with translation, filing, and appointments, but visa approval/refusal remains the absolute sovereignty of the consulate.',

    '⚠️ تنبيه إجباري ثابت لشنغن: جميع الوثائق الإدارية الصادرة بالعربية يجب ترجمتها رسمياً إلى الفرنسية أو الإنجليزية 🌐': '⚠️ Compulsory Schengen Note: All administrative documents issued in Arabic must be officially translated into French or English 🌐',
    'كشف حساب العملة الصعبة Euro يثبت رصيداً كافياً لآخر 3 أشهر (يدعم نية السفر لشنغن) 💶': 'Foreign currency account statement (Euro) showing a sufficient balance for the last 3 months (supporting Schengen) 💶',
    'كشف الدينار لآخر 3 أشهر لربط المعاملات وتوضيح الكفاءة المالية للعيش المؤقت 💳': 'Dinar account statement (DA) for the last 3 months to link transactions and prove temporary financial capability 💳',
    'حجز فندقي مبدئي وحجز طائرة متطابقين تماماً وموثقين في التواريخ المقررة لرحلتك 🏨': 'Tentative hotel and flight reservations matching exactly with your planned travel dates 🏨',
    'حجز فندق مؤكد وتذكرة طائرة ذهاب وإياب متطابقة 🏨': 'Confirmed hotel booking and matching round-trip flight ticket 🏨',
    'تنبيه التسجيل والإيداع: يتم إرسال وحجز الموعد والإيداع لدى مركز التسهيل القنصلي المعتمد VFS Tasheel 🏛️': 'Registration Alert: Appointments and physical filing are managed at the approved VFS Tasheel center 🏛️',
    'حجز تذكرة طائرة مبدئي وحجز فندقي مؤقت يغطي كامل الفترات ومطابق للتواريخ المقررة 🏨': 'Tentative flight booking and temporary hotel reservation covering all dates of the planned stay 🏨',
    'رسالة دعوة رسمية (Lettre d\'invitation) من الشركة المستضيفة في أوروبا تثبت سبب السفر التجاري ✉️': 'Official invitation letter from the host company in Europe proving the business travel purpose ✉️',
    'أمر بمهمة (Ordre de mission) من الشركة الجزائرية التي يتبع لها المسافر 💼': 'Mission order (Ordre de mission) issued by the Algerian employer of the traveler 💼',
    'السجل التجاري للشركتين (الجزائرية المُوفدة والأوروبية المستضيفة) لضمان الصرامة والاعتماد القنصلي 🏢': 'Commercial register of both companies (Algerian sender and European host) for consular accreditation 🏢',
    'رسالة دعوة رسمية (Lettre d\'invitation) من الشركة المستضيفة بالخارج مختومة وموثقة ✉️': 'Official invitation letter from the hosting company overseas, stamped and authenticated ✉️',
    'أمر بمهمة (Ordre de mission) يوضح غرض وطبيعة سفرك العملي من الشركة بالمصالح الجزائرية 💼': 'Mission order detailing the purpose and nature of your business trip from the Algerian employer 💼',
    'السجل التجاري لكلا السجلين والمؤسستين الداعمتين للمهمة والموظف 🏢': 'Commercial register of both entities supporting the mission and the employee 🏢',
    'شهادة إيواء رسمية (Attestation d\'accueil) أصلية صادرة عن بلدية المضيف بالخارج في أوروبا 🏠': 'Original official accommodation certificate (Attestation d\'accueil) issued by host\'s city hall in Europe 🏠',
    'إثبات صلة القرابة الموثقة بالقرابة كدفتر عائلي أو شهادة عائلية مترجمة 👥': 'Proof of family relationship such as a family record book or translated family certificate 👥',
    'دعوة إيواء رسمية (Attestation d\'accueil) أصلية مستخرجة من بلدية ومصالح الشخص المستضيف بالخارج 🏠': 'Original official accommodation certificate (Attestation d\'accueil) issued by overseas host\'s city hall 🏠',
    'إثبات صلة القرابة بربط الملف (دفتر عائلي عاصمي أو بلدي) 👥': 'Proof of relationship for file linkage (family record book) 👥',
    'خطاب القبول النهائي والأكاديمي الرسمي الصادر من الجامعة السعودية المانحة للمقعد 🎓': 'Official final academic acceptance letter issued by the scholarship-granting Saudi university 🎓',
    'إشعار التأشيرة الدراسية الصادر والموجه من وزارة الخارجية السعودية 🇸🇦': 'Study visa notification issued and directed by the Saudi Ministry of Foreign Affairs 🇸🇦',
    'الشهادات الأكاديمية والمدرسية الجزائرية مصدقة ومصادق عليها بالكامل من وزارة الخارجية 📜': 'Algerian academic certificates and diplomas fully legalized by the Ministry of Foreign Affairs 📜',
    'صحيفة السوابق العدلية (الصحيفة رقم 03) حديثة العهد ⚖️': 'Recent criminal record clearance certificate (Bulletin No. 3) ⚖️',
    'تقرير طبي رسمي مفصل ومصادق عليه يوضح الخلو من الأمراض المعدية والسارية 🩺': 'Detailed and authenticated official medical report certifying freedom from infectious diseases 🩺',
    'شهادة القبول والتسجيل النهائي الصادر عبر منصة Campus France الجزائر لعام 2026 🎓': 'Final acceptance and registration certificate issued via Campus France Algeria for 2026 🎓',
    'الحساب البنكي المغلق (Compte Bloqué) بمبلغ لا يقل عن 738 يورو شهرياً لتأمين مصاريف الدراسة بفرنسا 💶': 'Blocked bank account (Compte Bloqué) with a minimum of €738/month to secure study costs in France 💶',
    'إثبات السكن في بلد المقصد في فرنسا (عقد إيجار رسمي، شهادة إيواء، أو سكن جامعي CROUS) 🏠': 'Proof of accommodation in destination country (Lease agreement, host certificate or CROUS student housing) 🏠',
    'خطاب القبول الجامعي المعتمد من الجامعة التركية مع إثبات رسمي لدفع القسط الدراسي الأول 🎓': 'Official university acceptance letter from Turkey with receipt of the first tuition installment 🎓',
    'تأمين صحي تركي دراسي مخصص ومعتمد طيلة فترات التعلم والتعليم 🩺': 'Approved Turkish study health insurance for the entire tuition period 🩺',
    'شهادة قبول جامعي أو تسجيل نهائي (Attestation d\'inscription) معترف بها من المعهد أو الجامعة المستضيفة بالخارج 🎓': 'University acceptance or official registration certificate recognized by host university abroad 🎓',
    'الحساب البنكي المغلق (Compte Bloqué) بمبلغ يثبت تجميد قدرة متمكنة لمصاريف سنة تعليمية 🏦': 'Blocked bank account (Compte Bloqué) with sufficient funds to cover one academic year expenses 🏦',
    'آخر الشهادات العلمية والمؤهلات المحصل عليها بالجزائر مترجمة باللغات الرسمية للبلد 📜': 'Latest diplomas and academic qualifications obtained in Algeria translated into target country official languages 📜',
    'تقرير طبي مفصل ومختوم من طبيب مختص بالجزائر يؤكد الحاجة الماسة للعلاج أو المتابعة الطبية بالخارج 🩺': 'Detailed and stamped medical report from a specialist in Algeria confirming urgent medical care abroad 🩺',
    'موافقة رسمية وتحديد موعد استقبال طبي من الهيئة الاستشفائية المستقبلة بالخارج 🏥': 'Official acceptance and scheduled appointment from the hosting hospital abroad 🏥',
    'الفاتورة التقديرية لكافة العلاجات المقررة (Devis) مع تقديم إثبات التغطية المالية الملائمة 💰': 'Estimated bill for scheduled care or quote (Devis) with proof of appropriate financial coverage 💰',

    'شهادة عمل حديثة ومفصلة موقعة من صاحب العمل 💼': 'Recent and detailed employment certificate signed by the employer 💼',
    'كشف حساب بنكي تجاري نشط لآخر 3 أشهر 🏦': 'Active commercial bank account statement for the last 3 months 🏦',
    'نسخة من بطاقة ممارسة المهنة الحرة أو الاعتماد المهني 📁': 'Copy of professional card or work accreditation 📁',
    'كشف حساب بنكي شخصي أو تجاري لآخر 3 أشهر 💳': 'Personal or commercial bank statement for the last 3 months 💳',
  };

  if (lang === 'fr' && dictFr[cleanText]) {
    return dictFr[cleanText];
  }
  if (lang === 'en' && dictEn[cleanText]) {
    return dictEn[cleanText];
  }

  let translated = cleanText;

  if (lang === 'fr') {
    translated = translated
      .replace(/صورتين شخصيتين حديثتين بخلفية بيضاء \(تخضع للمقاسات المحدد لبلد السفر: (.*?)\) 📸/g, 'Deux photos d\'identité récentes sur fond blanc (selon les dimensions requises pour le pays de voyage : $1) 📸')
      .replace(/مقاس ٣.٥×٤.٥ سم لشنغن حصرياً/g, 'taille 3.5x4.5 cm pour Schengen exclusivement')
      .replace(/مقاس ٥×٦ سم حصرياً/g, 'taille 5x6 cm exclusivement')
      .replace(/مقاس ٤×٦ سم حصرياً/g, 'taille 4x6 cm exclusivement')
      .replace(/مقاس ٣.٥×٤.٥ سم/g, 'taille 3.5x4.5 cm')
      .replace(/مقاس 3.5×4.5 سم لشنغن حصرياً/g, 'taille 3.5x4.5 cm pour Schengen exclusivement')
      .replace(/مقاس 5×6 سم حصرياً/g, 'taille 5x6 cm exclusivement')
      .replace(/مقاس 4×6 سم/g, 'taille 4x6 cm')
      .replace(/مقاس 3.5×4.5 سم/g, 'taille 3.5x4.5 cm')
      .replace(/⚙️ \[ملف الكفيل المالي الملحق\]:/g, '⚙️ [Dossier Garant Financier Joint] :')
      .replace(/⚙️ \[الملف المالي والمهني الكامل للولي الشرعي والأب\/الأم \((.*?)\)\]:/g, '⚙️ [Dossier Financier & Pro Complet du Tuteur Légal / Parent ($1)] :')
      .replace(/⚙️ \[ملف الكفالة من الزوج - (.*?)\]:/g, '⚙️ [Dossier Caution par Époux - $1] :')
      .replace(/⚙️ \[ملف كفيل مالي قريبي من الدرجة الأولى - (.*?)\]:/g, '⚙️ [Dossier Garant Financier Parent 1er Degré - $1] :')
      .replace(/الموظف/g, 'Salarié')
      .replace(/التاجر/g, 'Commerçant')
      .replace(/شهادة عمل حديثة ومختومة وموقعة توضح/g, 'Attestation de travail récente signée et tamponnée indiquant')
      .replace(/المنصب، الراتب، وتاريخ التوظيف/g, 'le poste, le salaire et la date d\'embauche')
      .replace(/للكفيل الموظف/g, 'du garant salarié')
      .replace(/كشوف الراتب \(Fiches de paie\) لآخر ٣ أشهر الأخيرة للكفيل/g, 'Bulletins de salaire des 3 derniers mois du garant')
      .replace(/كشوف الراتب لآخر ٣ أشهر الأخيرة لكفيلك/g, 'Bulletins de salaire des 3 derniers mois de votre garant')
      .replace(/شهادة الانتساب لصندوق الضمان الاجتماعي \(CNAS\) حديثة ومختومة للكفيل/g, 'Attestation d\'affiliation CNAS récente et tamponnée du garant')
      .replace(/نسخة طبق الأصل من السجل التجاري \(Registre du Commerce\) للكفيل التاجر/g, 'Copie conforme du registre du commerce du garant commerçant')
      .replace(/الشهادة الضريبية لعام ٢٠٢٦ \(C20 أو جدول الضرائب المصفى الحديث\) للكفيل/g, 'Attestation fiscale 2026 (C20 ou extrait de rôle) du garant')
      .replace(/شهادة الانتساب للضمان الاجتماعي لغير الأجراء \(CASNOS\) مع وصل تسديد السنة الجارية للكفيل/g, 'Attestation d\'affiliation CASNOS avec reçu de paiement du garant')
      .replace(/رسالة تعهد بكفالة مالية مصادق عليها في البلدية من الوالد\/الوالدة/g, 'Prise en charge financière légalisée à la mairie par le parent')
      .replace(/شهادة مدرسية حديثة للعام الجاري أو بطاقة طالب جامعة/g, 'Certificat de scolarité de l\'année en cours ou carte d\'étudiant')
      .replace(/شهادة عائلية لإثبات صلة القرابة والنسب والولاية/g, 'Fiche familiale prouvant la garde légale et le lien de parenté')
      .replace(/تصريح أبوي بالسفر مصادق عليه في البلدية من الوالد/g, 'Autorisation parentale de voyager légalisée à la mairie par le père')
      .replace(/كشف حساب بنكي للولي الشرعي لآخر ٦ أشهر/g, 'Relevé bancaire du tuteur légal pour les 6 derniers mois')
      .replace(/شهادة عدم العمل من البلدية/g, 'Attestation de non-travail délivrée par la mairie')
      .replace(/عقد الزواج \+ الشهادة العائلية/g, 'acte de mariage + fiche familiale d\'état civil')
      .replace(/رسالة كفالة مالية من البلدية يلتزم بها الزوج/g, 'Engagement de prise en charge financière légalisé à la mairie par le conjoint')
      .replace(/كشف الحساب البنكي للزوج لآخر ٦ أشهر/g, 'Relevé bancaire du conjoint pour les 6 derniers mois')
      .replace(/رسالة كفالة مصادق عليها في البلدية للكفيل/g, 'Engagement de prise en charge légalisé à la mairie par le garant')
      .replace(/كشف حساب بنكي للكفيل لآخر ٦ أشهر/g, 'Relevé de compte du garant pour les 6 derniers mois')
      .replace(/شهادة الانتساب لصندوق الضمان الاجتماعي \(CNAS\) حديثة ومختومة/g, 'Attestation d\'affiliation CNAS récente et tamponnée')
      .replace(/كشوف الراتب لآخر ٣ أشهر الأخيرة لك/g, 'Vos bulletins de salaire des 3 derniers mois')
      .replace(/كشف حساب بنكي لآخر ٣ أشهر يوضح وتيرة صب الرواتب/g, 'Relevé de compte des 3 derniers mois (salaires)')
      .replace(/نسخة مصورة من السجل التجاري الأصلي والحديث/g, 'Copie du registre du commerce original')
      .replace(/شهادة الرمز الجبائي NIF ورمز النشاط الضريبي/g, 'Attestation NIF et code d\'activité')
      .replace(/شهادة دفع الضرائب السنوية وتصفية الديون الضريبية/g, 'Attestation d\'apurement fiscal (C20 / extrait de rôle)')
      .replace(/شهادة الانتساب لصندوق CASNOS/g, 'Attestation d\'affiliation CASNOS')
      .replace(/كشف الحساب التجاري للشركة أو الحساب البنكي/g, 'Relevé bancaire commercial de l\'entreprise')
      .replace(/بطاقة الحسم أو بطاقة ممارسة المهنة الخاصة/g, 'Carte d\'activité professionnelle libérale')
      .replace(/قرار الترخيص أو شهادة الاعتماد الرسمية/g, 'Décision d\'autorisation ou agrément officiel')
      .replace(/شهادة دفع الضرائب الخاصة بالمهن غير التجارية والمهن الحرة/g, 'Attestation de impôt pour professions libérales')
      .replace(/كشف حساب بنكي أساسي دوري لآخر ٣ أشهر/g, 'Relevé de compte bancaire principal (3 mois)')
      .replace(/شهادة التقاعد الأصلية ببيان التصفية/g, 'Attestation de retraite avec état de liquidation')
      .replace(/كشف حساب بنكي للـ ٣ أشهر الأخيرة/g, 'Relevé bancaire des 3 derniers mois')
      .replace(/دفتر صب المعاش البريدي/g, 'carnet de pension postale')
      .replace(/جواز سفر أصلي صالح لأكثر من ٦ أشهر/g, 'Passeport original valide de 6 mois')
      .replace(/حجز فندقي مؤكد يغطي كامل فترة الإقامة ومبلغ مالي كاش/g, 'Réservation d\'hôtel valide et argent liquide de poche')
      .replace(/تذكرة طائرة مؤكدة/g, 'Billet d\'avion confirmé')
      .replace(/تأشيرة/g, 'Visa')
      .replace(/ملف الكفيل/g, 'Dossier Garant')
      .replace(/ملف الكفالة/g, 'Dossier Caution')
      .replace(/البلد/g, 'Pays');
  } else if (lang === 'en') {
    translated = translated
      .replace(/صورتين شخصيتين حديثتين بخلفية بيضاء \(تخضع للمقاسات المحدد لبلد السفر: (.*?)\) 📸/g, 'Two recent identification photos on a white background (subject to specified dimensions for your destination country: $1) 📸')
      .replace(/مقاس ٣.٥×٤.٥ سم لشنغن حصرياً/g, 'size 3.5x4.5 cm for Schengen exclusively')
      .replace(/مقاس ٥×٦ سم حصرياً/g, 'size 5x6 cm exclusively')
      .replace(/مقاس ٤×٦ سم حصرياً/g, 'size 4x6 cm exclusively')
      .replace(/مقاس ٣.٥×٤.٥ سم/g, 'size 3.5x4.5 cm')
      .replace(/مقاس 3.5×4.5 سم لشنغن حصرياً/g, 'size 3.5x4.5 cm for Schengen exclusively')
      .replace(/مقاس 5×6 سم حصرياً/g, 'size 5x6 cm exclusively')
      .replace(/مقاس 4×6 سم/g, 'size 4x6 cm')
      .replace(/مقاس 3.5×4.5 سم/g, 'size 3.5x4.5 cm')
      .replace(/⚙️ \[ملف الكفيل المالي الملحق\]:/g, '⚙️ [Supporting Sponsor Financial Dossier]:')
      .replace(/⚙️ \[الملف المالي والمهني الكامل للولي الشرعي والأب\/الأم \((.*?)\)\]:/g, '⚙️ [Full Financial & Pro Dossier of Legal Guardian / Parent ($1)]:')
      .replace(/⚙️ \[ملف الكفالة من الزوج - (.*?)\]:/g, '⚙️ [Guarantee Dossier by Spouse - $1]:')
      .replace(/⚙️ \[ملف كفيل مالي قريبي من الدرجة الأولى - (.*?)\]:/g, '⚙️ [1st Degree Relative Financial Sponsor Dossier - $1]:')
      .replace(/الموظف/g, 'Salaried')
      .replace(/التاجر/g, 'Trader')
      .replace(/شهادة عمل حديثة ومختومة وموقعة توضح/g, 'Recent stamped and signed job certificate indicating')
      .replace(/المنصب، الراتب، وتاريخ التوظيف/g, 'the job title, salary, and date of hire')
      .replace(/للكفيل الموظف/g, 'of the employed sponsor')
      .replace(/كشوف الراتب \(Fiches de paie\) لآخر ٣ أشهر الأخيرة للكفيل/g, 'Salary slips of the sponsor for the last 3 months')
      .replace(/كشوف الراتب لآخر ٣ أشهر الأخيرة لكفيلك/g, 'Salary slips of your sponsor for the last 3 months')
      .replace(/شهادة الانتساب لصندوق الضمان الاجتماعي \(CNAS\) حديثة ومختومة للكفيل/g, 'Social security affiliation certificate (CNAS) recent and stamped of the sponsor')
      .replace(/نسخة طبق الأصل من السجل التجاري \(Registre du Commerce\) للكفيل التاجر/g, 'Certified copy of commercial register of the merchant sponsor')
      .replace(/الشهادة الضريبية لعام ٢٠٢٦ \(C20 أو جدول الضرائب المصفى الحديث\) للكفيل/g, 'Tax certificate for 2026 (C20 or recent clean tax roll) of the sponsor')
      .replace(/شهادة الانتساب للضمان الاجتماعي لغير الأجراء \(CASNOS\) مع وصل تسديد السنة الجارية للكفيل/g, 'Affiliation certificate CASNOS with payment receipt of the sponsor')
      .replace(/رسالة تعهد بكفالة مالية مصادق عليها في البلدية من الوالد\/الوالدة/g, 'Financial support commitment letter legalized at municipal hall by parent')
      .replace(/شهادة مدرسية حديثة للعام الجاري أو بطاقة طالب جامعة/g, 'Recent school certificate for current year or student card')
      .replace(/شهادة عائلية لإثبات صلة القرابة والنسب والولاية/g, 'Family state registry certificate proving relation and custody')
      .replace(/تصريح أبوي بالسفر مصادق عليه في البلدية من الوالد/g, 'Parental travel authorization legalized at municipal hall by the father')
      .replace(/كشف حساب بنكي للولي الشرعي لآخر ٦ أشهر/g, 'Guardian bank statements for the last 6 months')
      .replace(/شهادة عدم العمل من البلدية/g, 'Unemployment certificate from the municipality')
      .replace(/عقد الزواج \+ الشهادة العائلية/g, 'marriage certificate + family state registry card')
      .replace(/رسالة كفالة مالية من البلدية يلتزم بها الزوج/g, 'Support commitment letter legalized at municipal hall by spouse')
      .replace(/كشف الحساب البنكي للزوج لآخر ٦ أشهر/g, 'Spouse bank statements for the last 6 months')
      .replace(/رسالة كفالة مصادق عليها في البلدية للكفيل/g, 'Support letter legalized at municipal hall for the sponsor')
      .replace(/كشف حساب بنكي للكفيل لآخر ٦ أشهر/g, 'Sponsor bank statements for the last 6 months')
      .replace(/شهادة الانتساب لصندوق الضمان الاجتماعي \(CNAS\) حديثة ومختومة/g, 'Recent and stamped social security affiliation certificate (CNAS)')
      .replace(/كشوف الراتب لآخر ٣ أشهر الأخيرة لك/g, 'Your salary slips for the last 3 months')
      .replace(/كشف حساب بنكي لآخر ٣ أشهر يوضح وتيرة صب الرواتب/g, 'Bank statements for the last 3 months showing periodic payroll deposits')
      .replace(/نسخة مصورة من السجل التجاري الأصلي والحديث/g, 'Copy of original and recent commercial register')
      .replace(/شهادة الرمز الجبائي NIF ورمز النشاط الضريبي/g, 'Tax identifier NIF and tax activity code')
      .replace(/شهادة دفع الضرائب السنوية وتصفية الديون الضريبية/g, 'Annual tax clearance and clean roll certificate')
      .replace(/شهادة الانتساب لصندوق CASNOS/g, 'CASNOS affiliation certificate')
      .replace(/كشف الحساب التجاري للشركة أو الحساب البنكي/g, 'Corporate commercial account or bank statement')
      .replace(/بطاقة الحسم أو بطاقة ممارسة المهنة الخاصة/g, 'Professional card or active practice license')
      .replace(/قرار الترخيص أو شهادة الاعتماد الرسمية/g, 'Official license decision or accredited certificate')
      .replace(/شهادة دفع الضرائب الخاصة بالمهن غير التجارية والمهن الحرة/g, 'Tax payment proof for non-commercial and liberal activities')
      .replace(/كشف حساب بنكي أساسي دوري لآخر ٣ أشهر/g, 'Periodic primary bank statement for the last 3 months')
      .replace(/شهادة التقاعد الأصلية ببيان التصفية/g, 'Original retirement certificate with liquidation statement')
      .replace(/كشف حساب بنكي للـ ٣ أشهر الأخيرة/g, 'Bank statement for the last 3 months')
      .replace(/دفتر صب المعاش البريدي/g, 'postal pension deposit book')
      .replace(/جواز سفر أصلي صالح لأكثر من ٦ أشهر/g, 'Original passport valid for more than 6 months')
      .replace(/حجز فندقي مؤكد يغطي كامل فترة الإقامة ومبلغ مالي كاش/g, 'Confirmed hotel booking for entire stay and pocket cash')
      .replace(/تذكرة طائرة مؤكدة/g, 'Confirmed flight ticket')
      .replace(/تأشيرة/g, 'Visa')
      .replace(/ملف الكفيل/g, 'Sponsor Dossier')
      .replace(/ملف الكفالة/g, 'Guarantee Dossier')
      .replace(/البلد/g, 'Country');
  }

  return translated;
};ر التجارية والمهن الحرة 📊': 'Attestation de paiement des impôts pour professions libérales et non commerciales 📊',
    'كشف حساب بنكي أساسي دوري لآخر 3 أشهر 🏦': 'Relevé bancaire principal périodique des 3 derniers mois 🏦',

    'شهادة التقاعد الأصلية ببيان التصفية (Attestation de retraite) 👴': 'Attestation de retraite originale avec relevé de pension 👴',
    'كشف حساب بنكي للـ 3 أشهر الأخيرة أو دفتر صب المعاش البريدي 💳': 'Relevé bancaire des 3 derniers mois ou carnet de pension postale 💳',

    '⚠️ (شرط خاص بماليزيا لعام 2026): ملء استمارة الدخول الرقمية (MDAC) عبر الإنترنت قبل السفر بـ 3 أيام 🌐': '⚠️ (Condition spéciale Malaisie 2026) : Remplir le formulaire d\'entrée numérique (MDAC) en ligne 3 jours avant le départ 🌐',
    '⚠️ (شرط للأقل من 25 سنة): إضافة تنبيه باحتمالية طلب حجز فندق مؤكد وضمان مالي من طرف السلطات الإماراتية.': '⚠️ (Moins de 25 ans) : Attention, les autorités peuvent exiger une réservation d\'hôtel confirmée et une garantie financière.',
    '⚠️ (تنبيه للملفات): الوكالة تساعد بمهنية في الترجمة وتقديم الملف وتأمين الموعد لكن منح أو رفض التأشيرة يبقى سلطة سيادية مطلقة للقنصلية المعنية.': '⚠️ (Note) : L\'agence aide pour la traduction, le dossier et le rendez-vous, mais l\'octroi ou le refus du visa reste de la souveraineté de la console.',
  };

  let translated = cleanText;
  
  if (dictFr[cleanText]) {
    return dictFr[cleanText];
  }

  // Regex and substring conversions for dynamic sponsor-matching elements
  translated = translated
    .replace(/شهادة عمل حديثة ومختومة وموقعة توضح/g, 'Attestation de travail récente signée et tamponnée indiquant')
    .replace(/المنصب، الراتب، وتاريخ التوظيف/g, 'le poste, le salaire et la date d\'embauche')
    .replace(/للكفيل الموظف/g, 'du garant salarié')
    .replace(/كشوف الراتب \(Fiches de paie\) لآخر ٣ أشهر الأخيرة للكفيل/g, 'Bulletins de salaire des 3 derniers mois du garant')
    .replace(/كشوف الراتب لآخر ٣ أشهر الأخيرة لكفيلك/g, 'Bulletins de salaire des 3 derniers mois de votre garant')
    .replace(/شهادة الانتساب لصندوق الضمان الاجتماعي \(CNAS\) حديثة ومختومة للكفيل/g, 'Attestation d\'affiliation CNAS récente et tamponnée du garant')
    .replace(/نسخة طبق الأصل من السجل التجاري \(Registre du Commerce\) للكفيل التاجر/g, 'Copie conforme du registre du commerce du garant commerçant')
    .replace(/الشهادة الضريبية لعام ٢٠٢٦ \(C20 أو جدول الضرائب المصفى الحديث\) للكفيل/g, 'Attestation fiscale 2026 (C20 ou extrait de rôle) du garant')
    .replace(/شهادة الانتساب للضمان الاجتماعي لغير الأجراء \(CASNOS\) مع وصل تسديد السنة الجارية للكفيل/g, 'Attestation d\'affiliation CASNOS avec reçu de paiement du garant')
    .replace(/رسالة تعهد بكفالة مالية مصادق عليها في البلدية من الوالد\/الوالدة/g, 'Prise en charge financière légalisée à la mairie par le parent')
    .replace(/شهادة مدرسية حديثة للعام الجاري أو بطاقة طالب جامعة/g, 'Certificat de scolarité de l\'année en cours ou carte d\'étudiant')
    .replace(/شهادة عائلية لإثبات صلة القرابة والنسب والولاية/g, 'Fiche familiale prouvant la garde légale et le lien de parenté')
    .replace(/تصريح أبوي بالسفر مصادق عليه في البلدية من الوالد/g, 'Autorisation parentale de voyager légalisée à la mairie par le père')
    .replace(/كشف حساب بنكي للولي الشرعي لآخر ٦ أشهر/g, 'Relevé bancaire du tuteur légal pour les 6 derniers mois')
    .replace(/شهادة عدم العمل من البلدية/g, 'Attestation de non-travail délivrée par la mairie')
    .replace(/عقد الزواج \+ الشهادة العائلية/g, 'acte de mariage + fiche familiale d\'état civil')
    .replace(/رسالة كفالة مالية من البلدية يلتزم بها الزوج/g, 'Engagement de prise en charge financière légalisé à la mairie par le conjoint')
    .replace(/كشف الحساب البنكي للزوج لآخر ٦ أشهر/g, 'Relevé bancaire du conjoint pour les 6 derniers mois')
    .replace(/رسالة كفالة مصادق عليها في البلدية للكفيل/g, 'Engagement de prise en charge légalisé à la mairie par le garant')
    .replace(/كشف حساب بنكي للكفيل لآخر ٦ أشهر/g, 'Relevé de compte du garant pour les 6 derniers mois')
    .replace(/شهادة الانتساب لصندوق الضمان الاجتماعي \(CNAS\) حديثة ومختومة/g, 'Attestation d\'affiliation CNAS récente et tamponnée')
    .replace(/كشوف الراتب لآخر ٣ أشهر الأخيرة لك/g, 'Vos bulletins de salaire des 3 derniers mois')
    .replace(/كشف حساب بنكي لآخر ٣ أشهر يوضح وتيرة صب الرواتب/g, 'Relevé de compte des 3 derniers mois (salaires)')
    .replace(/نسخة مصورة من السجل التجاري الأصلي والحديث/g, 'Copie du registre du commerce original')
    .replace(/شهادة الرمز الجبائي NIF ورمز النشاط الضريبي/g, 'Attestation NIF et code d\'activité')
    .replace(/شهادة دفع الضرائب السنوية وتصفية الديون الضريبية/g, 'Attestation d\'apurement fiscal (C20 / extrait de rôle)')
    .replace(/شهادة الانتساب لصندوق CASNOS/g, 'Attestation d\'affiliation CASNOS')
    .replace(/كشف الحساب التجاري للشركة أو الحساب البنكي/g, 'Relevé bancaire commercial de l\'entreprise')
    .replace(/بطاقة الحسم أو بطاقة ممارسة المهنة الخاصة/g, 'Carte d\'activité professionnelle libérale')
    .replace(/قرار الترخيص أو شهادة الاعتماد الرسمية/g, 'Décision d\'autorisation ou agrément officiel')
    .replace(/شهادة دفع الضرائب الخاصة بالمهن غير التجارية والمهن الحرة/g, 'Attestation de impôt pour professions libérales')
    .replace(/كشف حساب بنكي أساسي دوري لآخر ٣ أشهر/g, 'Relevé de compte bancaire principal (3 mois)')
    .replace(/شهادة التقاعد الأصلية ببيان التصفية/g, 'Attestation de retraite avec état de liquidation')
    .replace(/كشف حساب بنكي للـ ٣ أشهر الأخيرة/g, 'Relevé bancaire des 3 derniers mois')
    .replace(/دفتر صب المعاش البريدي/g, 'carnet de pension postale')
    .replace(/جواز سفر أصلي صالح لأكثر من ٦ أشهر/g, 'Passeport original valide de 6 mois')
    .replace(/حجز فندقي مؤكد يغطي كامل فترة الإقامة ومبلغ مالي كاش/g, 'Réservation d\'hôtel valide et argent liquide de poche')
    .replace(/تذكرة طائرة مؤكدة/g, 'Billet d\'avion confirmé')
    .replace(/تأشيرة/g, 'Visa')
    .replace(/ملف الكفيل/g, 'Dossier Garant')
    .replace(/ملف الكفالة/g, 'Dossier Caution')
    .replace(/البلد/g, 'Pays');

  return translated;
};
*/

export const WORLD_COUNTRIES = [
  { key: 'turkey', name: 'تركيا', flag: '🇹🇷', nameFr: 'Turquie', nameEn: 'Turkey', searchKeys: 'تركيا turkey turquie istanbul gateways gateway' },
  { key: 'schengen', name: 'فرنسا', flag: '🇫🇷', nameFr: 'France', nameEn: 'France', searchKeys: 'فرنسا france paris tls tlscontact' },
  { key: 'spain_single', name: 'إسبانيا', flag: '🇪🇸', nameFr: 'Espagne', nameEn: 'Spain', searchKeys: 'اسبانيا spain espagne madrid barcelona vfs' },
  { key: 'italy_single', name: 'إيطاليا', flag: '🇮🇹', nameFr: 'Italie', nameEn: 'Italy', searchKeys: 'ايطاليا italy italie rome milan vfs' },
  { key: 'saudi', name: 'المملكة العربية السعودية', flag: '🇸🇦', nameFr: 'Arabie Saoudite', nameEn: 'Saudi Arabia', searchKeys: 'السعودية saudi arabia ksa makkah madinah umrah عمرة حج' },
  { key: 'dubai', name: 'الإمارات العربية المتحدة (دبي)', flag: '🇦🇪', nameFr: 'Émirats Arabes Unis (Dubaï)', nameEn: 'United Arab Emirates (Dubai)', searchKeys: 'دبي dubai uae emirat امارات ابوظبي sharjah' },
  { key: 'malaysia', name: 'ماليزيا (بدون فيزا)', flag: '🇲🇾', nameFr: 'Malaisie (Sans Visa)', nameEn: 'Malaysia (No Visa)', searchKeys: 'ماليزيا malaysia kuala lumpur بدون تأشيرة' },
  { key: 'united_kingdom', name: 'المملكة المتحدة (بريطانيا)', flag: '🇬🇧', nameFr: 'Royaume-Uni (UK)', nameEn: 'United Kingdom (UK)', searchKeys: 'بريطانيا uk united kingdom england london' },
  { key: 'germany_single', name: 'ألمانيا', flag: '🇩🇪', nameFr: 'Allemagne', nameEn: 'Germany', searchKeys: 'المانيا germany allemagne berlin visa' },
  { key: 'canada', name: 'كندا', flag: '🇨🇦', nameFr: 'Canada', nameEn: 'Canada', searchKeys: 'كندا canada montreal toronto' },
  { key: 'america', name: 'الولايات المتحدة الأمريكية', flag: '🇺🇸', nameFr: 'États-Unis (USA)', nameEn: 'United States (USA)', searchKeys: 'امريكا usa united states washington' },
  { key: 'china', name: 'الصين', flag: '🇨🇳', nameFr: 'Chine', nameEn: 'China', searchKeys: 'الصين china beijing guangzhou' },
  { key: 'greece_single', name: 'اليونان', flag: '🇬🇷', nameFr: 'Grèce', nameEn: 'Greece', searchKeys: 'اليونان greece grece' },
  { key: 'portugal_single', name: 'البرتغال', flag: '🇵🇹', nameFr: 'Portugal', nameEn: 'Portugal', searchKeys: 'البرتغال portugal' },
  { key: 'belgium_single', name: 'بلجيكا', flag: '🇧🇪', nameFr: 'Belgique', nameEn: 'Belgium', searchKeys: 'بلجيكا belgium belgique' },
  { key: 'switzerland_single', name: 'سويسرا', flag: '🇨🇭', nameFr: 'Suisse', nameEn: 'Switzerland', searchKeys: 'سويسرا switzerland suisse' },
  { key: 'qatar', name: 'قطر', flag: '🇶🇦', nameFr: 'Qatar', nameEn: 'Qatar', searchKeys: 'قطر qatar doha' },
  { key: 'egypt', name: 'مصر', flag: '🇪🇬', nameFr: 'Égypte', nameEn: 'Egypt', searchKeys: 'مصر egypt cairo' },
  { key: 'tunisia', name: 'تونس', flag: '🇹🇳', nameFr: 'Tunisie', nameEn: 'Tunisia', searchKeys: 'تونس tunis tunisia' }
];

const getDynamicDocs = (
  countryKey: string,
  visaType: string,
  profStatus: string,
  sponsorType: string = 'employee',
  hasSchengenUSVisa: string = 'no'
): CategorizedDocs => {
  const normKey = countryKey.toLowerCase();
  
  const isTurkey = normKey === 'turkey' || normKey.includes('turk') || normKey.includes('تركيا');
  const isSchengen = normKey === 'schengen' || 
                    normKey.includes('france') || 
                    normKey.includes('spain') || 
                    normKey.includes('italy') || 
                    normKey.includes('germany') || 
                    normKey.includes('greece') || 
                    normKey.includes('portugal') || 
                    normKey.includes('belgium') || 
                    normKey.includes('switzerland') || 
                    normKey.includes('schengen') ||
                    normKey.includes('single') ||
                    normKey.includes('extra');
                    
  const isUAE = normKey === 'dubai' || normKey === 'uae' || normKey.includes('إمارات') || normKey.includes('امارات');
  const isSaudi = normKey === 'saudi' || normKey.includes('سعودية') || normKey.includes('السعودية');
  const isNoVisa = normKey === 'malaysia' || normKey.includes('malay') || normKey === 'hongkong' || normKey.includes('hong') || normKey.includes('بدون تأشيرة') || normKey.includes('hkg') || normKey.includes('indonesia_single') || normKey.includes('indonesia') || normKey.includes('malaysia');

  let photoSpecs = 'مقاس 3.5×4.5 سم';
  if (isSaudi) {
    photoSpecs = 'مقاس 4×6 سم حصرياً';
  } else if (isTurkey) {
    photoSpecs = 'مقاس 5×6 سم حصرياً';
  } else if (isSchengen) {
    photoSpecs = 'مقاس 3.5×4.5 سم لشنغن حصرياً';
  }

  const globalCoreDocs = [
    'جواز السفر الأصلي (صالح لأكثر من 6 أشهر) + نسخة واضحة من الصفحة الأولى 📖',
    `صورتين شخصيتين حديثتين بخلفية بيضاء (تخضع للمقاسات المحدد لبلد السفر: ${photoSpecs}) 📸`,
    'تأمين سفر دولي يغطي كامل فترة الرحلة (توفرها الوكالة) 🛡️',
    'شهادة ميلاد حديثة + نسخة من بطاقة التعريف الوطنية البيومترية 📄'
  ];

  if (isUAE) {
    return {
      baseDocs: [
        'نسخة سكانر ملونة وعالية الدقة للجواز (صالح لأكثر من 6 أشهر) 📖',
        'صورة شخصية رقمية بخلفية بيضاء (صيغة JPG) 📸',
        'حجز تذكرة طيران مؤكدة (ذهاب وإياب) ✈️'
      ],
      purposeDocs: [
        '⚠️ (شرط للأقل من 25 سنة): إضافة تنبيه باحتمالية طلب حجز فندق مؤكد وضمان مالي من طرف السلطات الإماراتية.'
      ],
      profDocs: []
    };
  }

  if (isNoVisa) {
    const directDocs = [
      'جواز سفر أصلي صالح لأكثر من 6 أشهر 📖',
      'تذكرة طائرة مؤكدة (ذهاب وإياب) ✈️',
      'حجز فندقي مؤكد يغطي كامل فترة الإقامة ومبلغ مالي كاش (مصروف جيب) 💵'
    ];
    if (normKey.includes('malaysia') || normKey.includes('ماليزيا')) {
      directDocs.push('⚠️ (شرط خاص بماليزيا لعام 2026): ملء استمارة الدخول الرقمية (MDAC) عبر الإنترنت قبل السفر بـ 3 أيام 🌐');
    }
    return {
      baseDocs: directDocs,
      purposeDocs: [],
      profDocs: []
    };
  }

  if (isSaudi && visaType === 'tourist' && hasSchengenUSVisa === 'yes') {
    return {
      baseDocs: [
        ...globalCoreDocs,
        'نسخة من الفيزا السابقة المستعملة (شنغن أو أمريكا الصالحة والمستعملة من قبل) 💳'
      ],
      purposeDocs: [
        'حجز طيران مؤكد ذهاب وإياب ✈️'
      ],
      profDocs: []
    };
  }

  const isSponsorReliant = ['student', 'pupil', 'housewife', 'unemployed'].includes(profStatus);
  let profDocs: string[] = [];
  let sponsorDocs: string[] = [];

  if (isSponsorReliant) {
    const sponsorRoleArabic = sponsorType === 'employee' ? 'الموظف' : 'التاجر';
    let sponsorSpecificDocs: string[] = [];
    if (sponsorType === 'employee') {
      sponsorSpecificDocs = [
        'شهادة عمل حديثة ومختومة وموقعة توضح (المنصب، الراتب، وتاريخ التوظيف) للكفيل الموظف 💼',
        'كشوف الراتب (Fiches de paie) لآخر 3 أشهر الأخيرة للكفيل 💵',
        'شهادة الانتساب لصندوق الضمان الاجتماعي (CNAS) حديثة ومختومة للكفيل 📊'
      ];
    } else {
      sponsorSpecificDocs = [
        'نسخة طبق الأصل من السجل التجاري (Registre du Commerce) للكفيل التاجر 📑',
        'الشهادة الضريبية لعام 2026 (C20 أو جدول الضرائب المصفى الحديث) للكفيل 📊',
        'شهادة الانتساب للضمان الاجتماعي لغير الأجراء (CASNOS) مع وصل تسديد السنة الجارية للكفيل 💳'
      ];
    }

    if (profStatus === 'student') {
      sponsorDocs = [
        'شهادة مدرسية حديثة للعام الجاري أو بطاقة طالب جامعية 🎓',
        'شهادة عائلية لإثبات صلة القرابة مع الكفيل 👥',
        `⚙️ [ملف الكفيل المالي الملحق]: رسالة تعهد بكفالة مالية مصادق عليها في البلدية من الوالد/الوالدة ✍️`,
        ...sponsorSpecificDocs,
        'كشف الحساب البنكي للكفيل لآخر 6 أشهر يوضح حركة مالية كافية 🏦'
      ];
    } else if (profStatus === 'pupil') {
      sponsorDocs = [
        'شهادة مدرسية حديثة من المؤسسة التربوية (الطور الابتدائي/المتوسط/الثانوي) 🏫',
        'تصريح أبوي بالسفر مصادق عليه في البلدية من الوالد (أو الوالدين معاً) ✍️',
        'شهادة عائلية لإثبات صلة القرابة والولاية الشرعية 👥',
        `⚙️ [الملف المالي والمهني الكامل للولي الشرعي والأب/الأم (${sponsorRoleArabic})]:`,
        ...sponsorSpecificDocs,
        'كشف حساب بنكي للولي الشرعي لآخر 6 أشهر 🏦'
      ];
    } else if (profStatus === 'housewife') {
      sponsorDocs = [
        'شهادة عدم العمل من البلدية + عقد الزواج + الشهادة العائلية 📄',
        `⚙️ [ملف الكفالة من الزوج - ${sponsorRoleArabic}]: رسالة كفالة مالية من البلدية يلتزم بها الزوج ✍️`,
        ...sponsorSpecificDocs,
        'كشف الحساب البنكي للزوج لآخر 6 أشهر لتأمين تكاليف الزيارة والسفر 🏦'
      ];
    } else if (profStatus === 'unemployed') {
      sponsorDocs = [
        'شهادة عدم العمل من البلدية + إثبات صلة القرابة (شهادة عائلية) 👥',
        `⚙️ [ملف كفيل مالي قريبي من الدرجة الأولى - ${sponsorRoleArabic}]: رسالة كفالة مصادق عليها في البلدية للكفيل ✍️`,
        ...sponsorSpecificDocs,
        'كشف حساب بنكي للكفيل لآخر 6 أشهر يثبت القدرة التامة على الإنفاق والدعم 🏦'
      ];
    }
  }

  if (isSponsorReliant) {
    profDocs = sponsorDocs;
  } else {
    switch (profStatus) {
      case 'employee':
        profDocs = [
          'شهادة عمل حديثة ومختومة وموقعة توضح (المنصب، الراتب، وتاريخ التوظيف) 💼',
          'كشوف الراتب (Fiches de paie) لآخر 3 أشهر الأخيرة 💵',
          'شهادة الانتساب لصندوق الضمان الاجتماعي (CNAS) حديثة ومختومة 📊',
          'كشف حساب بنكي لآخر 3 أشهر يوضح وتيرة صب الرواتب دورياً 🏦'
        ];
        break;
      case 'contractor':
        profDocs = [
          'نسخة من عقد العمل الساري المفعول (Contrat de travail) 📄',
          'شهادة عمل حديثة تزيد استمرار الموعد 💼',
          'كشوف الراتب أو مستحقات القبض لآخر 3 أشهر الأخيرة 💵',
          'كشف حساب بنكي شخصي لآخر 3 أشهر يوضح دخول الرواتب دورياً 🏦'
        ];
        break;
      case 'trader':
        profDocs = [
          'نسخة طبق الأصل من السجل التجاري (Registre du Commerce) 📑',
          'الشهادة الضريبية لعام 2026 (C20 أو جدول الضرائب المصفى الحديث) 📊',
          'شهادة الانتساب للضمان الاجتماعي لغير الأجراء (CASNOS) مع وصل تسديد السنة الجارية 💳',
          'كشف حساب بنكي لآخر 6 أشهر (الحساب التجاري للشركة + الحساب الشخصي) 🏦'
        ];
        break;
      case 'freelancer':
        profDocs = [
          'نسخة من الاعتماد الرسمي أو رخصة ممارسة المهنة الحرة الصادرة عن الجهات المختصة 📁',
          'شهادة التسجيل في المنظمة أو النقابة الوطنية الخاصة بالمهنة لعام 2026 📜',
          'آخر تحديث للوضعية الجبائية من مصلحة الضرائب لعام 2026 📊',
          'شهادة CASNOS حديثة ومرفقة بوصل التسديد الجاري 💳',
          'كشف حساب بنكي شخصي ومهني لآخر 6 أشهر 🏦'
        ];
        break;
      case 'investor':
        profDocs = [
          'نسخة من عقد تأسيس الشركة (Statut) يثبت الشراكة ونسبة الأسهم الممتلكة 📑',
          'نسخة من السجل التجاري الخاص بالشركة ساري الصلاحية 📄',
          'الميزانية العمومية الأخيرة أو محضر اجتماع الجمعية العامة لتوزيع الأرباح (Bilan/PV) 📊',
          'كشف الحساب البنكي للشركة + الحساب الشخصي لآخر 6 أشهر 🏦'
        ];
        break;
      case 'autopreneur':
        profDocs = [
          'نسخة من بطاقة المقاول الذاتي البيومترية سارية المفعول لعام 2026 💳',
          'شهادة التسجيل الإلكترونية في الوصلة الوطنية للمقاول الذاتي 🌐',
          'كشف حساب بنكي لآخر 6 أشهر يوضح حركة المداخيل ومستوى المعاملات 🏦'
        ];
        break;
      case 'farmer':
        profDocs = [
          'نسخة من بطاقة الفلاح سارية المفعول ومنتسبة للغرفة الفلاحية 🌾',
          'شهادة ملكية الأرض الفلاحية أو عقد الامتياز الفلاحي الموثق من الموثق الرسمي 📜',
          'شهادة الانتساب لصندوق الضمان الاجتماعي للفلاحين (CASNOS/Fellah) 💳',
          'كشف حساب بنكي لآخر 6 أشهر (يفضل حساب بنك الفلاحة والتنمية الريفية BADR) 🏦'
        ];
        break;
      case 'retiree':
        profDocs = [
          'شهادة التقاعد الرسمية (Attestation de retraite) الصادرة عن الصندوق الوطني للتقاعد 📜',
          'كشف مدخول أو بيان استلام معاش التقاعد لآخر 3 أشهر 💵',
          'كشف حساب بنكي أو حساب البريد الجاري CCP لآخر 3 أشهر تظهر حركة معاش المعني دورياً 🏦'
        ];
        break;
      case 'artisan':
        profDocs = [
          'نسخة من بطاقة الحرفي (CAM) سارية المفعول، أو بطاقة الفنان الصادرة عن المجلس الوطني للفنون لعام 2026 🎨',
          'شهادة دفع الضرائب الخاصة بنشاطه الحرفي 📊',
          'كشف حساب بنكي لآخر 6 أشهر يوضح حركة المداخيل 🏦'
        ];
        break;
      default:
        profDocs = [];
    }
  }

  let baseDocs = [...globalCoreDocs];
  let purposeDocs: string[] = [];

  if (isTurkey) {
    baseDocs.push('نسخة من حجز موعد البصمة الإلكتروني لدى مركز التقديم Visa Mosaic المعتمد (نتولى الحجز بالكامل) 📅');
    profDocs = profDocs.map(doc => {
      if (doc.includes('3 أشهر') && (doc.includes('بنكي') || doc.includes('الراتب') || doc.includes('CCP') || doc.includes('المداخيل') || doc.includes('النشاط'))) {
        return doc.replace('3 أشهر', '6 أشهر (شرط إجباري لعام 2026 لتأشيرة تركيا) 🏦');
      }
      return doc;
    });

    const hasBank = profDocs.some(doc => doc.includes('بنكي') || doc.includes('الحساب') || doc.includes('الراتب') || doc.includes('CCP'));
    if (!hasBank) {
      profDocs.push('كشف حساب بنكي لآخر 6 أشهر مختوم (شرط إجباري 2026 لجميع مقدمي التأشيرات لتركيا) 🏦');
    }
  }

  if (isSchengen) {
    baseDocs.push('⚠️ تنبيه إجباري ثابت لشنغن: جميع الوثائق الإدارية الصادرة بالعربية يجب ترجمتها رسمياً إلى الفرنسية أو الإنجليزية 🌐');
  }

  if (visaType === 'tourist') {
    if (isSchengen) {
      purposeDocs.push(
        'كشف حساب العملة الصعبة Euro يثبت رصيداً كافياً لآخر 3 أشهر (يدعم نية السفر لشنغن) 💶',
        'كشف الدينار لآخر 3 أشهر لربط المعاملات وتوضيح الكفاءة المالية للعيش المؤقت 💳',
        'حجز فندقي مبدئي وحجز طائرة متطابقين تماماً وموثقين في التواريخ المقررة لرحلتك 🏨'
      );
    } else if (isSaudi) {
      purposeDocs.push(
        'حجز فندق مؤكد وتذكرة طائرة ذهاب وإياب متطابقة 🏨',
        'تنبيه التسجيل والإيداع: يتم إرسال وحجز الموعد والإيداع لدى مركز التسهيل القنصلي المعتمد VFS Tasheel 🏛️'
      );
    } else {
      purposeDocs.push('حجز تذكرة طائرة مبدئي وحجز فندقي مؤقت يغطي كامل الفترات ومطابق للتواريخ المقررة 🏨');
    }
  }

  if (visaType === 'work') {
    if (isSchengen) {
      purposeDocs.push(
        "رسالة دعوة رسمية (Lettre d'invitation) من الشركة المستضيفة في أوروبا تثبت سبب السفر التجاري ✉️",
        "أمر بمهمة (Ordre de mission) من الشركة الجزائرية التي يتبع لها المسافر 💼",
        "السجل التجاري للشركتين (الجزائرية المُوفدة والأوروبية المستضيفة) لضمان الصرامة والاعتماد القنصلي 🏢"
      );
    } else {
      purposeDocs.push(
        "رسالة دعوة رسمية (Lettre d'invitation) من الشركة المستضيفة بالخارج مختومة وموثقة ✉️",
        "أمر بمهمة (Ordre de mission) يوضح غرض وطبيعة سفرك العملي من الشركة بالمصالح الجزائرية 💼",
        "السجل التجاري لكلا السجلين والمؤسستين الداعمتين للمهمة والموظف 🏢"
      );
    }
  }

  if (visaType === 'family') {
    if (isSchengen) {
      purposeDocs.push(
        "شهادة إيواء رسمية (Attestation d'accueil) أصلية صادرة عن بلدية المضيف بالخارج في أوروبا 🏠",
        "إثبات صلة القرابة الموثقة بالقرابة كدفتر عائلي أو شهادة عائلية مترجمة 👥"
      );
    } else {
      purposeDocs.push(
        "دعوة إيواء رسمية (Attestation d'accueil) أصلية مستخرجة من بلدية ومصالح الشخص المستضيف بالخارج 🏠",
        "إثبات صلة القرابة بربط الملف (دفتر عائلي عاصمي أو بلدي) 👥"
      );
    }
  }

  if (visaType === 'study') {
    if (isSaudi) {
      purposeDocs.push(
        'خطاب القبول النهائي والأكاديمي الرسمي الصادر من الجامعة السعودية المانحة للمقعد 🎓',
        'إشعار التأشيرة الدراسية الصادر والموجه من وزارة الخارجية السعودية 🇸🇦',
        'الشهادات الأكاديمية والمدرسية الجزائرية مصدقة ومصادق عليها بالكامل من وزارة الخارجية 📜',
        'صحيفة السوابق العدلية (الصحيفة رقم 03) حديثة العهد ⚖️',
        'تقرير طبي رسمي مفصل ومصادق عليه يوضح الخلو من الأمراض المعدية والسارية 🩺'
      );
    } else if (isSchengen) {
      profDocs = profDocs.filter(doc => !doc.includes('كشوف الراتب') && !doc.includes('شهادة عمل') && !doc.includes('صندوق الضمان') && !doc.includes('كشف حساب بنكي'));
      purposeDocs.push(
        'شهادة القبول والتسجيل النهائي الصادر عبر منصة Campus France الجزائر لعام 2026 🎓',
        'الحساب البنكي المغلق (Compte Bloqué) بمبلغ لا يقل عن 738 يورو شهرياً لتأمين مصاريف الدراسة بفرنسا 💶',
        'إثبات السكن في بلد المقصد في فرنسا (عقد إيجار رسمي، شهادة إيواء، أو سكن جامعي CROUS) 🏠'
      );
    } else if (isTurkey) {
      purposeDocs.push(
        'خطاب القبول الجامعي المعتمد من الجامعة التركية مع إثبات رسمي لدفع القسط الدراسي الأول 🎓',
        'تأمين صحي تركي دراسي مخصص ومعتمد طيلة فترات التعلم والتعليم 🩺'
      );
    } else {
      purposeDocs.push(
        'شهادة قبول جامعي أو تسجيل نهائي (Attestation d\'inscription) معترف بها من المعهد أو الجامعة المستضيفة بالخارج 🎓',
        'الحساب البنكي المغلق (Compte Bloqué) بمبلغ يثبت تجميد قدرة متمكنة لمصاريف سنة تعليمية 🏦',
        'آخر الشهادات العلمية والمؤهلات المحصل عليها بالجزائر مترجمة باللغات الرسمية للبلد 📜'
      );
    }
  }

  if (visaType === 'medical') {
    purposeDocs.push(
      'تقرير طبي مفصل ومختوم من طبيب مختص بالجزائر يؤكد الحاجة الماسة للعلاج أو المتابعة الطبية بالخارج 🩺',
      'موافقة رسمية وتحديد موعد استقبال طبي من الهيئة الاستشفائية المستقبلة بالخارج 🏥',
      'الفاتورة التقديرية لكافة العلاجات المقررة (Devis) مع تقديم إثبات التغطية المالية الملائمة 💰'
    );
  }

  return {
    baseDocs,
    profDocs,
    purposeDocs
  };
};

export default function VisaView({ navigateTo }: VisaViewProps) {
  const { language, dir } = useLanguage();
  
  const [selectedCountryName, setSelectedCountryName] = useState<string>(language === 'ar' ? 'تركيا' : (language === 'fr' ? 'Turquie' : 'Turkey'));
  const [selectedCountryFlag, setSelectedCountryFlag] = useState<string>('🇹🇷');
  const [selectedCountryKey, setSelectedCountryKey] = useState<string>('turkey');
  const [countrySearch, setCountrySearch] = useState<string>('');
  const [countrySearchOpen, setCountrySearchOpen] = useState<boolean>(false);

  const [profStatus, setProfStatus] = useState<string>('employee');
  const [visaType, setVisaType] = useState<string>('tourist');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [hasSchengenUSVisa, setHasSchengenUSVisa] = useState<string>('no');
  const [sponsorType, setSponsorType] = useState<string>('employee');

  const getCountryDetails = (countryName: string, flag: string, key: string): VisaCountryDetails => {
    const lower = countryName.toLowerCase();
    if (key === 'turkey' || lower.includes('تركيا') || lower.includes('turk')) return VISA_COUNTRIES.turkey;
    if (key === 'schengen' || lower.includes('فرنسا') || lower.includes('إسبانيا') || lower.includes('شنغن') || lower.includes('france') || lower.includes('espagne')) return VISA_COUNTRIES.schengen;
    if (key === 'saudi' || lower.includes('سعودية') || lower.includes('السعودية') || lower.includes('saudi')) return VISA_COUNTRIES.saudi;
    
    return {
      name: language === 'ar' ? `تأشيرة ${countryName} ${flag}` : `Visa ${countryName} ${flag}`,
      flag: flag,
      generalInfo: language === 'ar' 
        ? `طلب تأشيرة السفر إلى ${countryName}. نوفر لك بالوكالة الاستشارة القانونية المتكاملة، حجز الموعد القنصلي، تأمين السفر الدولي الملائم، وصياغة حجز الطيران وتأكيد الفندق لدعم ملف التقديم بأعلى الموثوقيات.`
        : `Demande de visa pour ${countryName}. Nous fournissons l'assistance complète pour la constitution du dossier, assurance de voyage, formulaires officiels, réservations de vols et hôtels.`,
      baseDocs: [
        'جواز السفر الأصلي صالح لمدة لا تقل عن 6 أشهر 📖',
        'نسخة مصورة واضحة من الصفحة الأولى لجواز السفر 📄',
        'صورتين خلفية بيضاء حديثة ومطابقة للمعايير القنصلية 📸',
        'تأمين طبي دولي يغطي كامل مدة الإقامة المقترحة (نوفرها لك بالوكالة) 🏥',
        'حجز طيران مبدئي وفندق مرن ملائم لتواريخ السفر المحددة (نضمنه للملف) 🏨'
      ],
      professionalDocs: {
        employee: [
          'شهادة عمل حديثة ومفصلة موقعة من صاحب العمل 💼',
          'كشف الراتب لآخر 3 أشهر أخيرة (Fiches de paie) 💵',
          'كشف الانتساب لصندوق الضمان الاجتماعي (CNAS) 📊'
        ],
        trader: [
          'نسخة مصورة من السجل التجاري (Registre du commerce) 📑',
          'شهادة الرمز الضابط للمكلف بالضريبة (NIF) 📊',
          'كشف حساب بنكي تجاري نشط لآخر 3 أشهر 🏦'
        ],
        freelancer: [
          'نسخة من بطاقة ممارسة المهنة الحرة أو الاعتماد المهني 📁',
          'كشف حساب بنكي شخصي أو تجاري لآخر 3 أشهر 💳',
          'شهادة ممارسة النشاط من الهيئة المنظمة 💼'
        ],
        retiree: [
          'شهادة تقاعد أصلية مع جدول قيمة المعاش السنوي 👴',
          'كشف حساب بنكي أو كشف بريدي لآخر 3 أشهر 💳'
        ]
      }
    };
  };

  const getVisaTypeLabelText = () => {
    switch (visaType) {
      case 'tourist': return language === 'ar' ? 'تأشيرة سياحية (Tourism)' : language === 'fr' ? 'Visa Touristique' : 'Tourist Visa';
      case 'work': return language === 'ar' ? 'تأشيرة عمل (Work)' : language === 'fr' ? 'Visa de Travail / Affaires' : 'Work / Business Visa';
      case 'study': return language === 'ar' ? 'تأشيرة دراسة / تعليمية (Study)' : language === 'fr' ? 'Visa d\'Études' : 'Student / Study Visa';
      case 'medical': return language === 'ar' ? 'تأشيرة علاجية / استشفائية (Medical)' : language === 'fr' ? 'Visa Médical / Soins' : 'Medical Visa';
      case 'family': return language === 'ar' ? 'تأشيرة زيارة عائلية (Family/Personal Visit)' : language === 'fr' ? 'Visa de Visite Familiale / Privée' : 'Family / Private Visit Visa';
      default: return visaType;
    }
  };

  const getStatusLabelText = () => {
    switch (profStatus) {
      case 'employee': return language === 'ar' ? 'موظف (Salarié)' : language === 'fr' ? 'Salarié (Secteur Public / Privé)' : 'Salaried Employee';
      case 'contractor': return language === 'ar' ? 'متعاقد (Contractuel)' : language === 'fr' ? 'Contractuel / Vacataire' : 'Contractor / Temporary Staff';
      case 'trader': return language === 'ar' ? 'تاجر (Commerçant)' : language === 'fr' ? 'Commerçant / Registre de Commerce' : 'Business Owner / Trader';
      case 'freelancer': return language === 'ar' ? 'مهنة حرة (Libérale)' : language === 'fr' ? 'Profession Libérale' : 'Freelancer / Self-Employed';
      case 'investor': return language === 'ar' ? 'مستثمر (Actionnaire)' : language === 'fr' ? 'Actionnaire / Investisseur' : 'Investor / Shareholder';
      case 'autopreneur': return language === 'ar' ? 'مقاول ذاتي (Auto-entrepreneur)' : language === 'fr' ? 'Auto-entrepreneur' : 'Sole Proprietor / Autopreneur';
      case 'farmer': return language === 'ar' ? 'فلاح (Agriculteur)' : language === 'fr' ? 'Agriculteur' : 'Farmer';
      case 'student': return language === 'ar' ? 'طالب (Étudiant)' : language === 'fr' ? 'Étudiant' : 'Student';
      case 'pupil': return language === 'ar' ? 'تلميذ قاصر (Élève)' : language === 'fr' ? 'Élève / Mineur' : 'Pupil / Minor';
      case 'retiree': return language === 'ar' ? 'متقاعد (Retraité)' : language === 'fr' ? 'Retraité' : 'Retiree';
      case 'housewife': return language === 'ar' ? 'ربة بيت (Femme au foyer)' : language === 'fr' ? 'Femme au foyer' : 'Housewife';
      case 'unemployed': return language === 'ar' ? 'بطال (Sans profession)' : language === 'fr' ? 'Sans Profession / Sans Emploi' : 'Unemployed';
      case 'artisan': return language === 'ar' ? 'حرفي/فنان (Artisan)' : language === 'fr' ? 'Artisan / Artiste' : 'Artisan / Crafter';
      default: return profStatus;
    }
  };

  const normKey = selectedCountryKey.toLowerCase();
  const isTurkey = normKey === 'turkey' || normKey.includes('turk') || normKey.includes('تركيا');
  const isSchengen = normKey === 'schengen' || 
                    normKey.includes('france') || 
                    normKey.includes('spain') || 
                    normKey.includes('italy') || 
                    normKey.includes('germany') || 
                    normKey.includes('greece') || 
                    normKey.includes('portugal') || 
                    normKey.includes('belgium') || 
                    normKey.includes('switzerland') || 
                    normKey.includes('schengen') ||
                    normKey.includes('single') ||
                    normKey.includes('extra');
  const isUAE = normKey === 'dubai' || normKey === 'uae' || normKey.includes('إمارات') || normKey.includes('امارات');
  const isSaudi = normKey === 'saudi' || normKey.includes('سعودية') || normKey.includes('السعودية');
  const isNoVisa = normKey === 'malaysia' || normKey.includes('malay') || normKey === 'hongkong' || normKey.includes('hong') || normKey.includes('بدون تأشيرة') || normKey.includes('hkg') || normKey.includes('indonesia_single') || normKey.includes('indonesia') || normKey.includes('malaysia');
  
  const shouldHideProfStatus = isUAE || isNoVisa || (isSaudi && visaType === 'tourist' && hasSchengenUSVisa === 'yes');

  const currentCountry = getCountryDetails(selectedCountryName, selectedCountryFlag, selectedCountryKey);
  const docsList = getDynamicDocs(selectedCountryKey, visaType, profStatus, sponsorType, hasSchengenUSVisa);

  const isSponsorReliant = ['student', 'pupil', 'housewife', 'unemployed'].includes(profStatus);

  const totalItems = docsList.baseDocs.length + docsList.profDocs.length + docsList.purposeDocs.length;
  const allDocsFlat = [...docsList.baseDocs, ...docsList.profDocs, ...docsList.purposeDocs];
  const checkedCount = allDocsFlat.filter(doc => checkedItems[`${selectedCountryKey}-${profStatus}-${doc}`]).length;
  const readinessPercentage = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  const toggleCheck = (doc: string) => {
    const key = `${selectedCountryKey}-${profStatus}-${doc}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getFilteredCountries = (searchVal: string) => {
    const q = searchVal.toLowerCase().trim();
    if (!q) {
      return []; 
    }
    return WORLD_COUNTRIES.filter(c => {
      if (c.name.includes('تونس') || c.key.includes('tunis') || c.searchKeys.includes('تونس') || c.searchKeys.includes('tunisia')) {
        return false;
      }
      return (
        c.name.toLowerCase().includes(q) ||
        c.searchKeys.toLowerCase().includes(q) ||
        c.nameFr.toLowerCase().includes(q) ||
        c.nameEn.toLowerCase().includes(q)
      );
    }).slice(0, 15);
  };

  const handlesubmitWhatsApp = () => {
    const isAr = language === 'ar';
    let sponsorDetail = '';
    if (isSponsorReliant) {
      sponsorDetail = isAr 
        ? `\n- الكفيل المالي الحالي: ${sponsorType === 'employee' ? 'موظف (أو له معاش/راتب ثابت)' : 'تاجر / ذو سجل تجاري نشط'}`
        : `\n- Garant Financier: ${sponsorType === 'employee' ? 'Salarié (Retraité/Fixe)' : 'Commerçant / Registre de Commerce'}`;
    }
    
    const message = isAr ? `مرحباً وكالة عبعوب للأسفار،
أهتم بطلب معالجة ملف وتأشيرة سفر لدولة: ${currentCountry.name}
- نوع التأشيرة المطلوبة: ${getVisaTypeLabelText()}
- صفتي المهنية الحالية: ${getStatusLabelText()}${sponsorDetail}
- نسبة جاهزية وثائق الملف لدي: ${readinessPercentage}% (${checkedCount} من إجمالي ${totalItems} وثيقة)

أرغب في حجز موعد تأشيرة، استكمال تعبئة الملف، والحصول على حجز طيران وفندق وتأمين وتقديم الاستشارة القانونية من قبل مكتبكم.`
: `Bonjour Aboub Travel,
Je souhaite demander l'assistance d'un conseiller pour un dossier de visa :
- Destination: ${selectedCountryName} ${selectedCountryFlag}
- Type de visa: ${getVisaTypeLabelText()}
- Statut Professionnel: ${getStatusLabelText()}${sponsorDetail}
- Niveau de préparation des documents: ${readinessPercentage}% (${checkedCount} sur ${totalItems} documents)

Je souhaite fixer un rendez-vous et préparer mon dossier.`;

    const link = getWhatsAppLink(message);
    window.open(link, '_blank');
  };

  const handlePrintPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const todayDate = new Date().toLocaleDateString(language === 'ar' ? 'ar-DZ-u-nu-latn' : 'fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const isSponsorActive = !shouldHideProfStatus && isSponsorReliant;
    
    let htmlContent = `
      <!DOCTYPE html>
      <html lang="${language === 'ar' ? 'ar' : 'fr'}" dir="${dir}">
      <head>
        <meta charset="UTF-8">
        <title>Visa Checklist - ${selectedCountryName}</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            margin: 40px;
            color: #1e293b;
            background-color: #ffffff;
            direction: ${dir};
            text-align: ${dir === 'rtl' ? 'right' : 'left'};
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 3px double #06b6d4;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo-text {
            font-size: 20px;
            font-weight: 900;
            color: #0891b2;
          }
          .subtitle {
            font-size: 11px;
            color: #64748b;
            margin-top: 4px;
            font-weight: bold;
          }
          .meta-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 30px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            font-size: 13px;
          }
          .meta-item {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px dashed #e2e8f0;
            padding-bottom: 6px;
          }
          .meta-item:last-child {
            border-bottom: none;
          }
          .meta-label {
            font-weight: bold;
            color: #475569;
          }
          .meta-val {
            color: #0f172a;
            font-weight: 850;
          }
          .section-title {
            background-color: #0891b2;
            color: #ffffff;
            font-size: 13px;
            font-weight: bold;
            padding: 8px 12px;
            border-radius: 6px;
            margin-top: 25px;
            margin-bottom: 12px;
          }
          .doc-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 12px;
            border-bottom: 1px solid #f1f5f9;
            font-size: 12px;
            page-break-inside: avoid;
          }
          .doc-text {
            color: #334155;
            font-weight: 500;
            flex: 1;
            text-align: ${dir === 'rtl' ? 'right' : 'left'};
          }
          .doc-status {
            font-size: 12px;
            font-weight: bold;
            margin-left: 15px;
            margin-right: 15px;
          }
          .status-ready {
            color: #10b981;
          }
          .status-missing {
            color: #94a3b8;
          }
          .footer-note {
            margin-top: 40px;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
            font-size: 10px;
            color: #64748b;
            text-align: center;
            line-height: 1.6;
          }
          .stamp-area {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
            font-size: 12px;
            font-weight: bold;
          }
          .stamp-box {
            border: 1px dashed #cbd5e1;
            width: 180px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            color: #94a3b8;
          }
          @media print {
            body { margin: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo-text">🚀 Aboub Travel & Tourism Agency - تقرت</div>
            <div class="subtitle">International Visa & Logistics Evaluation Center • 2026</div>
          </div>
          <div>
            <div style="font-size: 12px; font-weight: bold; color: #475569;">Date: ${todayDate}</div>
            <div style="font-size: 10px; color: #94a3b8; margin-top: 4px;">ID: ${selectedCountryKey.toUpperCase()}-PLAN</div>
          </div>
        </div>

        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="margin: 0; color: #0f172a; font-size: 16px;">
            ${language === 'ar' ? 'مخطط معالجة تأشيرة السفر المعتمد والمحدث لعام 2026' : 'Plan d\'accompagnement et de préparation pour Visa 2026'}
          </h2>
          <p style="margin: 5px 0 0 0; font-size: 11px; color: #0891b2; font-weight: bold;">
            ${selectedCountryFlag} ${selectedCountryName}
          </p>
        </div>

        <div class="meta-box">
          <div class="meta-item">
            <span class="meta-label">${language === 'ar' ? 'البلد المقصود:' : 'Destination:'}</span>
            <span class="meta-val">${selectedCountryFlag} ${selectedCountryName}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${language === 'ar' ? 'نوع التأشيرة:' : 'Type de Visa:'}</span>
            <span class="meta-val">${getVisaTypeLabelText()}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${language === 'ar' ? 'الصفة المهنية للمسافر:' : 'Statut Professionnel:'}</span>
            <span class="meta-val">${shouldHideProfStatus ? 'Dossier Simplifié' : getStatusLabelText()}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">${language === 'ar' ? 'نسبة الجاهزية الحالية:' : 'Taux d\'achèvement:'}</span>
            <span class="meta-val font-mono" style="color: #0891b2;">${readinessPercentage}% (${checkedCount} / ${totalItems})</span>
          </div>
        </div>

        <div class="section-title">1. ${language === 'ar' ? 'وثائق جواز السفر والهوية والطلب العام' : 'Documents d\'Identité & Formulaires Généraux'}</div>
        ${docsList.baseDocs.map(doc => {
          const itemKey = `${selectedCountryKey}-${profStatus}-${doc}`;
          const isChecked = !!checkedItems[itemKey];
          return `
            <div class="doc-item">
              <span class="doc-text">${translateDocText(doc, language)}</span>
              <span class="doc-status ${isChecked ? 'status-ready' : 'status-missing'}">
                ${isChecked ? '✓ PRÊT / OK' : '⬜ MANQUANT'}
              </span>
            </div>
          `;
        }).join('')}

        ${docsList.purposeDocs.length > 0 ? `
          <div class="section-title">2. ${language === 'ar' ? 'وثائق إثبات الغرض من السفر والإقامة' : 'Justificatifs de Voyage & Hébergement'}</div>
          ${docsList.purposeDocs.map(doc => {
            const itemKey = `${selectedCountryKey}-${profStatus}-${doc}`;
            const isChecked = !!checkedItems[itemKey];
            return `
              <div class="doc-item">
                <span class="doc-text">${translateDocText(doc, language)}</span>
                <span class="doc-status ${isChecked ? 'status-ready' : 'status-missing'}">
                  ${isChecked ? '✓ PRÊT / OK' : '⬜ MANQUANT'}
                </span>
              </div>
            `;
          }).join('')}
        ` : ''}

        ${docsList.profDocs.length > 0 ? `
          <div class="section-title">3. ${language === 'ar' ? 'وثائق الوضعية المهنية والتعليمية والقدرات المالية' : 'Documents Professionnels & Capacité Financière'}</div>
          ${docsList.profDocs.map(doc => {
            const itemKey = `${selectedCountryKey}-${profStatus}-${doc}`;
            const isChecked = !!checkedItems[itemKey];
            return `
              <div class="doc-item">
                <span class="doc-text">${translateDocText(doc, language)}</span>
                <span class="doc-status ${isChecked ? 'status-ready' : 'status-missing'}">
                  ${isChecked ? '✓ PRÊT / OK' : '⬜ MANQUANT'}
                </span>
              </div>
            `;
          }).join('')}
        ` : ''}

        <div class="stamp-area">
          <div>
            <div>${language === 'ar' ? 'توقيع الزبون المعني:' : 'Signature du Client:'}</div>
            <div style="height: 35px;"></div>
          </div>
          <div>
            <div>${language === 'ar' ? 'ختم ومصادقة مستشار وكالة عبعوب:' : 'Cachet Aboub Travel:'}</div>
            <div class="stamp-box">Aboub Travel Cachet</div>
          </div>
        </div>

        <div class="footer-note">
          Aboub Travel & Tourism Agency - Touggourt, Algérie. <br>
          Mob/WhatsApp: +213667910148 | +213696789633
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const labels = {
    back: language === 'ar' ? 'الرجوع للرئيسية' : language === 'fr' ? "Retour à l'accueil" : "Back to Home",
    portalTitle: language === 'ar' ? 'بوابة معالجة الملفات والفيزا الدولية 📑' : language === 'fr' ? "Traitement des Visa & Dossiers 📑" : "Visa & Document Processing Desk 📑",
    badge: language === 'ar' ? '📑 مستشارو السفارات والقنصليات' : language === 'fr' ? "📑 Experts Consultaires" : "📑 Embassy Advisory Desk",
    title: language === 'ar' ? 'معالجة التأشيرات (Visa Assistance)' : language === 'fr' ? "Traitement des Visas (Visa Assistance)" : "Visa Processing & Logistics Assistance",
    desc: language === 'ar' 
      ? 'ندرس ملفك بدقة، نترجم الوثائق للغة الفرنسية أو لغة المقصد، نؤمن المواعيد الصعبة، ونقدم ملفًا سليمًا للحد من احتمالات الرفض.' 
      : language === 'fr' 
        ? "Examen rigoureux de dossier, traduction, prise de rendez-vous consulaire et hébergements conformes pour limiter les risques de rejet." 
        : "Critical dossier audit, professional translation, secure appointments, and compliant hotel/flight bookings to reduce embassy rejection rate.",
    searchLabel: language === 'ar' ? 'مكان طلب التأشيرة (الدولة المقصودة)' : language === 'fr' ? "Destination Consulaire (Pays de visa)" : "Consular Destination (Target Country)",
    searchPlaceholder: language === 'ar' 
      ? 'ابحث عن البلد المقصود (مثال: تركيا، فرنسا، كندا...)' 
      : language === 'fr' 
        ? "Sélectionnez le pays (Ex: Turquie, France, Canada...)" 
        : "Select destination (e.g., Turkey, France, Canada...)",
    suggestionHeader: language === 'ar' ? 'مقترحات الدول المتاحة' : language === 'fr' ? "Pays de visa disponibles" : "Visa Target Countries",
    suggestionSub: language === 'ar' ? 'اضغط لتحديد وجهة ملف الفيزا' : language === 'fr' ? "Cliquez pour confirmer" : "Click to select country",
    searchEmpty: language === 'ar' ? 'لا توجد نتائج مطابقة لبحثك في ملفات التأشيرات.' : language === 'fr' ? "Aucun pays trouvé" : "No matching countries found.",
    visaTypeLabel: language === 'ar' ? 'اختر نوع التأشيرة المطلوبة' : language === 'fr' ? "Type de visa d'entrée" : "Select Required Visa Type",
    profStatusLabel: language === 'ar' ? 'اختر صفتك المهنية أو الحرفية الحالية' : language === 'fr' ? "Votre statut professionnel / d'études" : "Your Current Professional Status",
    schengenSponsorHeader: language === 'ar' ? '⚙️ الملف المهني والمالي للكفيل المالي الملتزم بالدعم (Prise en charge):' : language === 'fr' ? "⚙️ Dossier de prise en charge financière par le garant :" : "⚙️ Financial Sponsor Supporting Documents (Prise en charge):",
    schengenSponsorDesc: language === 'ar' ? 'بما أن صفتك الحالية (طالب، تلميذ، ربة بيت، أو بطال) تتطلب كفيلاً رسمياً، يرجى تلميح صفتة المهنية لفرز وثائق كفالته الملحقة:' : language === 'fr' ? "Votre statut requiert un garant financier, veuillez spécifier son statut pour ajuster les justificatifs :" : "Your status requires a financial sponsor, please choose sponsor's status to load proper records:",
    sponsorEmployee: language === 'ar' ? '💼 الكفيل موظف (أو له معاش/راتب ثابت)' : "💼 Garant Salarié (ou retraité)",
    sponsorTrader: language === 'ar' ? '📑 الكفيل تاجر (أو صاحب سجل تجاري)' : "📑 Garant Commerçant (Registre C.)",
    expertTitle: language === 'ar' ? 'دليل سياحي من خبراء عبعوب لعام 2026' : language === 'fr' ? "Aperçu de l'assistance Aboub Travel 2026" : "Embassy Submission Guide 2026",
    expertDisclaimer: language === 'ar' 
      ? 'ℹ️ تنويه الوكالة الرئيسي: جميع الاستفسارات، المستندات، والوثائق الإدارية المذكورة أدناه تم مراجعتها وتعديلها بالكامل لتتوافق تماماً مع المتطلبات القنصلية الجديدة والصادرة مطلع عام 2026 لضمان أعلى نسبة قبول.'
      : language === 'fr' 
        ? "ℹ️ Note Importante : Toutes les pièces et conditions administratives mentionnées ont été entièrement ajustées pour s'accorder avec les règles des consulats applicables en 2026." 
        : "ℹ️ Key Advisory Note: All lists and requirements have been thoroughly updated to map directly with current embassy standards applicable in 2026.",
    readinessTitle: language === 'ar' ? 'جاهزية ملف التأشيرة:' : language === 'fr' ? "Jauges de préparation :" : "Visa Dossier Readiness:",
    readinessSub: (ready: number, total: number) => {
      if (language !== 'ar') return `(${ready} / ${total}) documents ready`;
      return `(${ready} / ${total}) وثيقة جاهزة`;
    },
    categoryBaseTitle: language === 'ar' ? 'قسم جواز السفر والهوية والسفر المتبوع' : language === 'fr' ? "Passeport & Documents d'Identité requis" : "Passport & Core Personal Records",
    categoryPurposeTitle: language === 'ar' ? 'قسم الغرض من السفر والإقامة والدعوات' : language === 'fr' ? "Hébergements, Vols & Justificatifs de voyage" : "Purpose of Travel & Support Vouchers",
    categoryProfTitle: language === 'ar' ? 'قسم الوضعية المهنية والقدرات المالية للمسافر' : language === 'fr' ? "Justificatifs Professionnels & Financiers" : "Professional Status & Financial Backings",
    advisorTitle: language === 'ar' ? '✓ تتبع الكتروني واستشارة من قبل محامي الوكالة' : language === 'fr' ? "✓ Audit de relevés bancaires & Contrôle juridique" : "✓ Dossier Audits & Professional Legal Review",
    advisorDesc: language === 'ar' 
      ? 'يقوم مستشارو التأشيرات بدراسة تفاصيل عملك أو كشوفاتك المصرفية وتقديم التوصيات الضرورية قبل إيداع الملف لضمان نسبة قبول تفوق 95% بإذن الله. نسهر على صياغة الحجوزات الرسمية بالكامل.' 
      : language === 'fr'
        ? "Nos experts étudient vos fiches de paie et relevés bancaires pour donner les recommandations clés améliorant votre taux de visa. Nous prenons en charge toutes les réservations requises."
        : "Our consular advisers audit your bank records, salary slips, and professional background to provide critical enhancements. We issue full confirmed travel plans.",
    btnPrint: language === 'ar' ? 'طباعة الملف وتحميل مخطط PDF 🖨️' : language === 'fr' ? "Imprimer la liste PDF 🖨️" : "Print PDF Checklist 🖨️",
    btnSubmit: language === 'ar' ? '🚀 مناقشة الملف والتوثيق فوراً' : language === 'fr' ? "🚀 Discuter avec mon Conseiller" : "🚀 Submit Code & Connect with Expert",
    trust1Title: language === 'ar' ? 'السرية التامة وحفظ الأوراق' : language === 'fr' ? "Confidentialité Absolue" : "Strict Document Privacy",
    trust1Desc: language === 'ar' ? 'تخفيضات ومميزات خاصة بالوكالة لا تتوفر على بوابات الحجز العامة عبر الإنترنت.' : language === 'fr' ? "Vos passeports et relevés bancaires sont sécurisés au plus haut niveau de discrétion." : "Your personal passports and bank files are kept in high-integrity, offline vaults.",
    trust2Title: language === 'ar' ? 'خبرة معالجة القنصليات' : language === 'fr' ? "Savoir-faire Consulaire" : "Deep Consular Expertise",
    trust2Desc: language === 'ar' ? 'بفهم عميق لشروط السفارات التركية والأوروبية، يتم تجهيز الملف وحل مشاكل الرفض السابقة بدبلوماسية.' : language === 'fr' ? "Maîtrise approfondie des critères spécifiques aux visas Schengen et Gateway Turquie." : "Specialized understanding of Turkey, European Schengen, and Gulf states criteria.",
    trust3Title: language === 'ar' ? 'حجوزات حقيقية مؤكدة' : language === 'fr' ? "Réservations Réelles" : "Legit & Live Bookings",
    trust3Desc: language === 'ar' ? 'توفير وحجز تذاكر الطيران المبدئية وحجوزات الفنادق المؤکدة الصالحة للتحقق المباشر من قبل مصالح التدقيق بالسفارة.' : language === 'fr' ? "Vols et hôtels réservés sur les systèmes GDS officiels pour vérification immédiate." : "Confirmed flights and real active hotel bookings that comply with direct embassy verification requests."
  };

  return (
    <div className="space-y-12 animate-fade-in text-slate-100" id="visa-booking-view" style={{ direction: dir }}>
      
      {/* Return to Home Section */}
      <div className="flex justify-between items-center bg-slate-950/20 p-3.5 rounded-3xl border border-white/5">
        <button 
          onClick={() => navigateTo('home')} 
          className="glass py-2 px-5 rounded-2xl border border-white/10 font-bold text-slate-300 hover:text-white flex items-center gap-2 cursor-pointer transition text-sm"
        >
          <ArrowRight className={`w-4 h-4 text-cyan-500 ${dir === 'rtl' ? '' : 'rotate-180'}`} />
          <span>{labels.back}</span>
        </button>
        <span className="text-xs text-slate-400 font-bold">{labels.portalTitle}</span>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto glass rounded-[3.5rem] border border-white/10 card-shadow overflow-hidden relative">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        {/* Banner header image */}
        <div className="w-full h-72 relative overflow-hidden border-b border-white/5">
          <img 
            src={visaAndFlags} 
            alt="visa and flags" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
          
          <div className={`absolute bottom-6 right-6 left-6 z-10 text-white space-y-2 select-none keep-white ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <span className="inline-block text-[10px] font-black tracking-widest text-cyan-300 bg-cyan-600/30 border border-cyan-400/40 px-3.5 py-1 rounded-full mb-1">
              {labels.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">{labels.title}</h2>
            <p className="text-xs sm:text-sm text-slate-100 max-w-xl leading-relaxed font-bold drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.95)]">
              {labels.desc}
            </p>
          </div>
        </div>

        {/* Dynamic Visa Selector Form */}
        <div className={`p-6 md:p-10 space-y-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>

          {/* Core Selectors */}
          <div className={`grid grid-cols-1 ${isNoVisa || isUAE ? 'md:grid-cols-1' : (shouldHideProfStatus ? 'md:grid-cols-2' : 'md:grid-cols-3')} gap-6 pb-2`}>
            
            {/* Country Dropdown -> Search Box */}
            <div className="space-y-2 relative" id="visa-country-search-container">
              <label className={`text-xs font-black text-slate-300 flex items-center gap-1.5 select-none ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>{labels.searchLabel}</span>
              </label>
              <div className="relative">
                <input 
                  type="text"
                  required
                  placeholder={labels.searchPlaceholder}
                  value={countrySearch}
                  onFocus={() => { setCountrySearch(''); setCountrySearchOpen(true); }}
                  onBlur={() => setTimeout(() => setCountrySearchOpen(false), 250)}
                  onChange={(e) => {
                    setCountrySearch(e.target.value);
                    setCountrySearchOpen(true);
                  }}
                  className={`w-full bg-slate-950 border border-white/10 rounded-2xl py-3 px-10 text-xs font-bold text-white outline-none focus:border-cyan-500 transition ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Search className="w-4 h-4 text-cyan-500" />
                </div>

                {/* Autocomplete Dropdown suggestions list */}
                {countrySearchOpen && (
                  <div className={`absolute left-0 right-0 mt-2 bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-y-auto max-h-72 z-50 divide-y divide-white/5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <div className="p-2.5 text-[10px] font-black text-slate-400 bg-slate-900/60 select-none flex justify-between items-center px-4 sticky top-0 backdrop-blur-md border-b border-white/5">
                      <span>{labels.suggestionSub}</span>
                      <span>{labels.suggestionHeader} ({getFilteredCountries(countrySearch).length})</span>
                    </div>
                    {getFilteredCountries(countrySearch).map((c) => (
                      <div 
                        key={c.key}
                        onMouseDown={() => {
                          setSelectedCountryName(language === 'ar' ? c.name : (language === 'fr' ? c.nameFr : c.nameEn));
                          setSelectedCountryFlag(c.flag);
                          setSelectedCountryKey(c.key);
                          setCountrySearch(`${c.flag} ${language === 'ar' ? c.name : (language === 'fr' ? c.nameFr : c.nameEn)}`);
                          setCountrySearchOpen(false);
                          setCheckedItems({});
                        }}
                        className="p-3 hover:bg-white/5 transition flex items-center justify-between gap-3 text-xs font-bold text-white cursor-pointer group"
                      >
                        <span className="text-slate-500 group-hover:text-cyan-400 font-black text-left font-mono">← {language === 'ar' ? 'تحديد' : 'Sélectionner'}</span>
                        <span className="flex items-center gap-2">
                          <span className="text-slate-300 font-bold">{language === 'ar' ? c.name : (language === 'fr' ? c.nameFr : c.nameEn)}</span>
                          <span className="text-base">{c.flag}</span>
                        </span>
                      </div>
                    ))}
                    {getFilteredCountries(countrySearch).length === 0 && (
                      <div className="p-4 text-center text-[11px] text-slate-500 font-bold select-none">
                        {labels.searchEmpty}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Visa Type Selection */}
            {!isNoVisa && !isUAE && (
              <div className="space-y-2">
                <label className={`text-xs font-black text-slate-300 flex items-center gap-1.5 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>{labels.visaTypeLabel}</span>
                </label>
                <select 
                  value={visaType}
                  onChange={(e) => setVisaType(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl py-3 px-4 text-xs font-bold text-white outline-none cursor-pointer focus:border-cyan-500 transition"
                >
                  <option value="tourist">✈️ {language === 'ar' ? 'تأشيرة سياحية (Tourism)' : 'Visa Touristique'}</option>
                  <option value="work">💼 {language === 'ar' ? 'تأشيرة عمل (Work)' : 'Visa de Travail'}</option>
                  <option value="study">🎓 {language === 'ar' ? 'تأشيرة دراسة / تعليمية (Study)' : 'Visa d\'Études'}</option>
                  <option value="medical">🏥 {language === 'ar' ? 'تأشيرة علاجية / استشفائية (Medical)' : 'Visa Médical'}</option>
                  <option value="family">👥 {language === 'ar' ? 'زيارة شخصية أو عائلية (Family/Personal Visit)' : 'Visite Personnelle / Familiale'}</option>
                </select>
              </div>
            )}

            {/* Professional Status */}
            {!shouldHideProfStatus && (
              <div className="space-y-2">
                <label className={`text-xs font-black text-slate-300 flex items-center gap-1.5 ${dir === 'rtl' ? 'justify-end' : 'justify-start'}`}>
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  <span>{labels.profStatusLabel}</span>
                </label>
                <select 
                  value={profStatus}
                  onChange={(e) => {
                    setProfStatus(e.target.value);
                    setCheckedItems({});
                  }}
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl py-3 px-4 text-xs font-bold text-white outline-none cursor-pointer focus:border-cyan-500 transition"
                >
                  <option value="employee">💼 {language === 'ar' ? '1. موظف في القطاع العام أو الخاص (Salarié)' : '1. Salarié'}</option>
                  <option value="contractor">📝 {language === 'ar' ? '2. متعاقد أو عامل مؤقت (Contractuel)' : '2. Contractuel / Vacataire'}</option>
                  <option value="trader">📑 {language === 'ar' ? '3. تاجر أو صاحب شركة (Commerçant)' : '3. Commerçant (Registre)'}</option>
                  <option value="freelancer">⚖️ {language === 'ar' ? '4. صاحب مهنة حرة (طبيب، محامي...) (Libérale)' : '4. Profession Libérale'}</option>
                  <option value="investor">📈 {language === 'ar' ? '5. مستثمر أو شريك في شركة (Actionnaire)' : '5. Actionnaire / Investisseur'}</option>
                  <option value="autopreneur">📱 {language === 'ar' ? '6. حاملو بطاقة المقاول الذاتي (Auto-entrepreneur)' : '6. Auto-entrepreneur'}</option>
                  <option value="farmer">🚜 {language === 'ar' ? '7. فلاح أو مستثمر فلاحي (Agriculteur)' : '7. Agriculteur'}</option>
                  <option value="student">🎓 {language === 'ar' ? '8. طالب جامعي أو في معهد (Étudiant)' : '8. Étudiant'}</option>
                  <option value="pupil">🏫 {language === 'ar' ? '9. تلميذ في الطور الابتدائي/المتوسط... (Élève)' : '9. Élève / Mineur'}</option>
                  <option value="retiree">👴 {language === 'ar' ? '10. متقاعد (Retraité)' : '10. Retraité'}</option>
                  <option value="housewife">🏠 {language === 'ar' ? '11. ربة بيت (Femme au foyer)' : '11. Femme au foyer'}</option>
                  <option value="unemployed">🛑 {language === 'ar' ? '12. بدون عمل / بطال (Sans profession)' : '12. Sans profession / Emploi'}</option>
                  <option value="artisan">🎨 {language === 'ar' ? '13. حرفي أو فنان (Artisan)' : '13. Artisan / Artiste'}</option>
                </select>
              </div>
            )}

          </div>

          {/* Saudi Arabia Schengen/US Switch */}
          {isSaudi && visaType === 'tourist' && (
            <div className="bg-white/5 p-5 rounded-3xl border border-white/10 space-y-3 animate-fade-in">
              <span className="text-xs font-black text-cyan-400 block">
                {language === 'ar' ? '🇸🇦 ميزة التأشيرة الإلكترونية الخاصة بالمملكة العربية السعودية لعام 2026:' : '🇸🇦 E-Visa Arabie Saoudite Facilitée :'}
              </span>
              <p className="text-[11px] text-slate-300">
                {language === 'ar' 
                  ? 'هل تملك تأشيرة شنغن (Schengen) أو تأشيرة الولايات المتحدة الأمريكية (USA) صالحة ومستعملة على جواز سفرك لمرة واحدة على الأقل؟' 
                  : 'Possédez-vous un visa Schengen ou USA valide et utilisé au moins une fois ?'}
              </p>
              <div className="flex gap-3 justify-start">
                <button
                  type="button"
                  onClick={() => {
                    setHasSchengenUSVisa('yes');
                    setCheckedItems({});
                  }}
                  className={`py-2 px-5 rounded-xl text-xs font-bold border transition duration-250 ${hasSchengenUSVisa === 'yes' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-slate-950/40 text-slate-400 border-white/5 hover:border-white/10 hover:text-white'}`}
                >
                  {language === 'ar' ? 'نعم (أملك تأشيرة مستعملة)' : 'Oui, j\'ai un de ces visas'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHasSchengenUSVisa('no');
                    setCheckedItems({});
                  }}
                  className={`py-2 px-5 rounded-xl text-xs font-bold border transition duration-250 ${hasSchengenUSVisa === 'no' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-slate-950/40 text-slate-400 border-white/5 hover:border-white/10 hover:text-white'}`}
                >
                  {language === 'ar' ? 'لا أملكها (التقديم كلاسيكي)' : 'Non'}
                </button>
              </div>
            </div>
          )}

          {/* UAE Alert Box */}
          {isUAE && (
            <div className="bg-emerald-500/5 p-5 rounded-3xl border border-emerald-500/20 space-y-2 animate-fade-in leading-relaxed select-none">
              <span className="text-xs font-black text-emerald-400 block">🇦🇪 {language === 'ar' ? 'تأشيرة سياحية إلكترونية مسبقة (E-Visa):' : 'E-Visa Émirats (Dubaï) :'}</span>
              <p className="text-[11px] text-slate-300">
                {language === 'ar' 
                  ? 'لقد اخترت وجهة الإمارات العربية المتحدة. معالجة هذا الملف إلكترونية بالكامل ومبسطة، معفاة من كافة السجلات المهنية، كشوف الرواتب، وكشوفات الحسابات البنكية الكلاسيكية.'
                  : 'Vous avez sélectionné Dubaï. Dossier électronique ultra-simplifié sans bulletins de paie ni relevés de compte complexes.'}
              </p>
            </div>
          )}

          {/* No Visa Required Alert Box */}
          {isNoVisa && (
            <div className="bg-emerald-500/5 p-5 rounded-3xl border border-emerald-500/20 space-y-2 animate-fade-in leading-relaxed select-none">
              <span className="text-xs font-black text-emerald-400 block">✈️ {language === 'ar' ? 'دخول بدون تأشيرة مسبقة للمواطنين الجزائريين:' : 'Accès Sans Visa Préalable :'}</span>
              <p className="text-[11px] text-slate-300">
                {language === 'ar' 
                  ? 'لقد اخترت وجهة معفاة تماماً من تأشيرة الدخول المسبقة لقاصديها من حاملي جواز السفر الجزائري لعام 2026. يقتصر ملفك على إثبات الهوية وتذكرة طائرة وحجز فندق.'
                  : 'Cette destination est exempte de visa préalable pour les citoyens algériens. Seuls le passeport, le vol A/R et l\'hôtel sont demandés.'}
              </p>
            </div>
          )}

          {/* Conditional Sponsor Details */}
          {!shouldHideProfStatus && isSponsorReliant && (
            <div className="bg-cyan-500/5 p-5 rounded-3xl border border-cyan-500/20 space-y-3 animate-fade-in">
              <span className="text-xs font-black text-cyan-300 block">{labels.schengenSponsorHeader}</span>
              <p className="text-[11px] text-slate-400">
                {labels.schengenSponsorDesc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSponsorType('employee')}
                  className={`py-2 p-4 rounded-xl text-xs font-bold border transition duration-250 flex items-center justify-between ${sponsorType === 'employee' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-slate-950/40 text-slate-400 border-white/5 hover:border-white/10'}`}
                >
                  <span className="font-mono">({sponsorType === 'employee' ? '✓' : '?'})</span>
                  <span>{labels.sponsorEmployee}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSponsorType('trader')}
                  className={`py-2 p-4 rounded-xl text-xs font-bold border transition duration-250 flex items-center justify-between ${sponsorType === 'trader' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-slate-950/40 text-slate-400 border-white/5 hover:border-white/10'}`}
                >
                  <span className="font-mono">({sponsorType === 'trader' ? '✓' : '?'})</span>
                  <span>{labels.sponsorTrader}</span>
                </button>
              </div>
            </div>
          )}

          {/* General guide info */}
          <div className="glass p-6 rounded-3xl space-y-4">
            <div className={`flex items-center justify-between gap-2 border-b border-white/10 pb-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <span className="text-[10px] font-black text-white bg-gradient-to-r from-cyan-600 to-cyan-500 px-3 py-1 rounded-full shadow-md select-none">
                {language === 'ar' ? '✓ تحديثات 2026 معتمدة' : '✓ Mis à jour 2026'}
              </span>
              <h3 className="text-sm font-black flex items-center gap-1.5">
                <span className="text-xs">{currentCountry.flag}</span>
                <span>{labels.expertTitle}</span>
              </h3>
            </div>
            <p className="text-xs leading-relaxed font-semibold">
              {currentCountry.generalInfo}
            </p>
            <div className="text-[10px] bg-cyan-500/10 border border-cyan-500/25 p-3 rounded-xl leading-relaxed select-none">
              <span className="text-cyan-400 font-extrabold block">
                {labels.expertDisclaimer}
              </span>
            </div>
          </div>

          {/* Interactive File Checklist & Readiness Indicator */}
          <div className="space-y-6">
            
            <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 select-none ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className="flex items-center gap-2 justify-start w-full sm:w-auto">
                <span className="text-xs text-slate-400 font-bold">{labels.readinessTitle}</span>
                <span className={`text-sm font-black text-white px-3 py-1 rounded-full ${readinessPercentage === 100 ? 'bg-emerald-500/30 text-emerald-300' : 'bg-cyan-500/20 text-cyan-400'}`}>
                  {readinessPercentage}%
                </span>
              </div>
              
              <div className="flex-1 max-w-md h-2 bg-slate-950 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${readinessPercentage}%` }}
                ></div>
              </div>

              <span className="text-[10px] text-slate-400 font-mono">
                {labels.readinessSub(checkedCount, totalItems)}
              </span>
            </div>

            <div className="space-y-8">
              
              {/* Category 1 */}
              <div className="space-y-3">
                <div className={`flex items-center justify-between border-b border-white/5 pb-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[10px] text-slate-500 font-mono font-bold">({docsList.baseDocs.length})</span>
                  <span className="text-xs font-black text-cyan-400 flex items-center gap-1.5">
                    <span className="p-1 rounded-lg bg-cyan-500/10 text-cyan-400">🛡️</span>
                    <span>{labels.categoryBaseTitle}</span>
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {docsList.baseDocs.map((doc, index) => {
                    const itemKey = `${selectedCountryKey}-${profStatus}-${doc}`;
                    const isChecked = !!checkedItems[itemKey];
                    return (
                      <div 
                        key={index}
                        onClick={() => toggleCheck(doc)}
                        className={`border p-4 rounded-2xl flex items-center justify-between gap-4 cursor-pointer select-none transition duration-200 ${isChecked ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-white/10 hover:border-white/20 bg-slate-900/30'}`}
                      >
                        <span className="text-xs font-bold text-slate-200 leading-relaxed flex-1">
                          {translateDocText(doc, language)}
                        </span>
                        <div className="shrink-0 flex items-center justify-center p-0.5">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-cyan-400" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-500 hover:text-white" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category 2 */}
              {docsList.purposeDocs.length > 0 && (
                <div className="space-y-3">
                  <div className={`flex items-center justify-between border-b border-white/5 pb-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10px] text-slate-500 font-mono font-bold">({docsList.purposeDocs.length})</span>
                    <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                      <span className="p-1 rounded-lg bg-emerald-500/10 text-emerald-400">✈️</span>
                      <span>{labels.categoryPurposeTitle}</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {docsList.purposeDocs.map((doc, index) => {
                      const itemKey = `${selectedCountryKey}-${profStatus}-${doc}`;
                      const isChecked = !!checkedItems[itemKey];
                      return (
                        <div 
                          key={index}
                          onClick={() => toggleCheck(doc)}
                          className={`border p-4 rounded-2xl flex items-center justify-between gap-4 cursor-pointer select-none transition duration-200 ${isChecked ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/10 hover:border-white/20 bg-slate-900/30'}`}
                        >
                          <span className="text-xs font-bold text-slate-200 leading-relaxed flex-1">
                            {translateDocText(doc, language)}
                          </span>
                          <div className="shrink-0 flex items-center justify-center p-0.5">
                            {isChecked ? (
                              <CheckSquare className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-500 hover:text-white" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Category 3 */}
              {docsList.profDocs.length > 0 && (
                <div className="space-y-3">
                  <div className={`flex items-center justify-between border-b border-white/5 pb-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10px] text-slate-500 font-mono font-bold">({docsList.profDocs.length})</span>
                    <span className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                      <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400">💼</span>
                      <span>{labels.categoryProfTitle}</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {docsList.profDocs.map((doc, index) => {
                      const itemKey = `${selectedCountryKey}-${profStatus}-${doc}`;
                      const isChecked = !!checkedItems[itemKey];
                      return (
                        <div 
                          key={index}
                          onClick={() => toggleCheck(doc)}
                          className={`border p-4 rounded-2xl flex items-center justify-between gap-4 cursor-pointer select-none transition duration-200 ${isChecked ? 'border-amber-500/50 bg-amber-500/5' : 'border-white/10 hover:border-white/20 bg-slate-900/30'}`}
                        >
                          <span className="text-xs font-bold text-slate-200 leading-relaxed flex-1">
                            {translateDocText(doc, language)}
                          </span>
                          <div className="shrink-0 flex items-center justify-center p-0.5">
                            {isChecked ? (
                              <CheckSquare className="w-5 h-5 text-amber-400" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-500 hover:text-white" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

          </div>

          <div className="h-px bg-white/10 my-6"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-slate-950/40 p-5 rounded-3xl border border-white/5">
            <div className={`space-y-1 flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <span className="text-[10px] font-black text-emerald-400 block">{labels.advisorTitle}</span>
              <p className="text-xs text-slate-400 leading-relaxed font-bold">
                {labels.advisorDesc}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <button 
                type="button"
                onClick={handlePrintPDF}
                className="w-full sm:w-auto h-12 bg-white/10 hover:bg-white/15 text-white font-bold px-6 rounded-2xl transition cursor-pointer flex items-center justify-center gap-2 border border-white/10 text-xs select-none"
              >
                <Printer className="w-5 h-5 text-cyan-400" />
                <span>{labels.btnPrint}</span>
              </button>

              <button 
                type="button"
                onClick={handlesubmitWhatsApp}
                className="w-full sm:w-auto h-12 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black px-8 rounded-2xl hover:scale-103 transition cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/10 text-xs"
              >
                {labels.btnSubmit}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Trust Elements */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
        <div className="glass p-5 rounded-3xl border border-white/5 flex flex-col items-center gap-2">
          <Shield className="w-8 h-8 text-cyan-500" />
          <h4 className="text-sm font-black text-white">{labels.trust1Title}</h4>
          <p className="text-[10px] text-slate-400 leading-relaxed">{labels.trust1Desc}</p>
        </div>
        <div className="glass p-5 rounded-3xl border border-white/5 flex flex-col items-center gap-2">
          <Award className="w-8 h-8 text-blue-500" />
          <h4 className="text-sm font-black text-white">{labels.trust2Title}</h4>
          <p className="text-[10px] text-slate-400 leading-relaxed">{labels.trust2Desc}</p>
        </div>
        <div className="glass p-5 rounded-3xl border border-white/5 flex flex-col items-center gap-2">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
          <h4 className="text-sm font-black text-white">{labels.trust3Title}</h4>
          <p className="text-[10px] text-slate-400 leading-relaxed">{labels.trust3Desc}</p>
        </div>
      </div>

    </div>
  );
}
