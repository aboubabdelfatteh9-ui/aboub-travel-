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
    'كشف حساب بنكي تجاري رسمي لآخر 3 أشهر 🏦': 'Relevé de compte de banque commercial officiel des 3 derniers mois 🏦',
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
    'كشف حساب بنكي أساسي دوري لآخر 3 أشهر 🏦': 'Relevé de compte bancaire principal (3 mois) 🏦',

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
    // New 2026 Professional and specific destination document translations (French):
    'نسخة من حجز موعد البصمة الإلكتروني لدى مركز التقديم Visa Mosaic المعتمد (نتولى الحجز بالكامل) 📅': 'Copie de la réservation de rendez-vous d\'empreintes électronique auprès du centre Visa Mosaic agréé (nous nous chargeons de la réservation) 📅',
    'كشف حساب بنكي لآخر 6 أشهر مختوم (شرط إجباري 2026 لجميع مقدمي التأشيرات لتركيا) 🏦': 'Relevé de compte de banque des 6 derniers mois tamponné (condition obligatoire 2026 pour la Turquie) 🏦',
    'نسخة من عقد العمل الساري المفعول (Contrat de travail) 📄': 'Copie du contrat de travail en cours de validité (Contrat de travail) 📄',
    'شهادة عمل حديثة تزيد استمرار الموعد 💼': 'Attestation de travail récente confirmant la continuité d\'emploi 💼',
    'كشوف الراتب أو مستحقات القبض لآخر 3 أشهر الأخيرة 💵': 'Bulletins de paie ou justificatifs de revenus des 3 derniers mois 💵',
    'كشف حساب بنكي شخصي لآخر 3 أشهر يوضح دخول الرواتب دورياً 🏦': 'Relevé de compte bancaire personnel des 3 derniers mois montrant le versement régulier des salaires 🏦',
    'نسخة طبق الأصل من السجل التجاري (Registre du Commerce) 📑': 'Copie conforme du registre du commerce (RC) 📑',
    'الشهادة الضريبية لعام 2026 (C20 أو جدول الضرائب المصفى الحديث) 📊': 'Attestation fiscale 2026 (C20 ou extrait de rôle mis à jour) 📊',
    'شهادة الانتساب للضمان الاجتماعي لغير الأجراء (CASNOS) مع وصل تسديد السنة الجارية 💳': 'Attestation d\'affiliation à la CASNOS avec reçu de paiement de l\'année en cours 💳',
    'كشف حساب بنكي لآخر 6 أشهر (الحساب التجاري للشركة + الحساب الشخصي) 🏦': 'Relevé de compte bancaire des 6 derniers mois (compte commercial + compte personnel) 🏦',
    'نسخة من الاعتماد الرسمي أو رخصة ممارسة المهنة الحرة الصادرة عن الجهات المختصة 📁': 'Copie de l\'agrément officiel ou autorisation d\'exercice de la profession libérale 📁',
    'شهادة التسجيل في المنظمة أو النقابة الوطنية الخاصة بالمهنة لعام 2026 📜': 'Attestation d\'inscription à l\'ordre ou au syndicat national de la profession pour 2026 📜',
    'آخر تحديث للوضعية الجبائية من مصلحة الضرائب لعام 2026 📊': 'Dernière mise à jour de la situation fiscale de l\'année 2026 📊',
    'شهادة CASNOS حديثة ومرفقة بوصل التسديد الجاري 💳': 'Attestation CASNOS récente accompagnée du reçu de paiement en cours 💳',
    'كشف حساب بنكي شخصي ومهني لآخر 6 أشهر 🏦': 'Relevé de compte de banque personnel et professionnel des 6 derniers mois 🏦',
    'نسخة من عقد تأسيس الشركة (Statut) يثبت الشراكة ونسبة الأسهم الممتلكة 📑': 'Copie des statuts de l\'entreprise prouvant l\'association et les actions détenues 📑',
    'نسخة من السجل التجاري الخاص بالشركة ساري الصلاحية 📄': 'Copie du registre du commerce de l\'entreprise en cours de validité 📄',
    'الميزانية العمومية الأخيرة أو محضر اجتماع الجمعية العامة لتوزيع الأرباح (Bilan/PV) 📊': 'Dernier bilan financier ou procès-verbal de l\'assemblée générale de distribution des bénéfices (Bilan/PV) 📊',
    'كشف الحساب البنكي للشركة + الحساب الشخصي لآخر 6 أشهر 🏦': 'Relevé bancaire de l\'entreprise + compte personnel des 6 derniers mois 🏦',
    'نسخة من بطاقة المقاول الذاتي البيومترية سارية المفعول لعام 2026 💳': 'Copie de la carte biométrique d\'auto-entrepreneur en cours de validité pour 2026 💳',
    'شهادة التسجيل الإلكترونية في الوصلة الوطنية للمقاول الذاتي 🌐': 'Attestation d\'inscription électronique sur le portail national des auto-entrepreneurs 🌐',
    'كشف حساب بنكي لآخر 6 أشهر يوضح حركة المداخيل ومستوى المعاملات 🏦': 'Relevé bancaire des 6 derniers mois montrant les mouvements de revenus 🏦',
    'نسخة من بطاقة الفلاح سارية المفعول ومنتسبة للغرفة الفلاحية 🌾': 'Copie de la carte d\'agriculteur en cours de validité affiliée à la chambre d\'agriculture 🌾',
    'شهادة ملكية الأرض الفلاحية أو عقد الامتياز الفلاحي الموثق من الموثق الرسمي 📜': 'Titre de propriété foncière agricole ou contrat de concession agricole notarié 📜',
    'شهادة الانتساب لصندوق الضمان الاجتماعي للفلاحين (CASNOS/Fellah) 💳': 'Attestation d\'affiliation à la CASNOS pour agriculteurs (CASNOS/Fellah) 💳',
    'كشف حساب بنكي لآخر 6 أشهر (يفضل حساب بنك الفلاحة والتنمية الريفية BADR) 🏦': 'Relevé de banque des 6 derniers mois (compte BADR recommandé) 🏦',
    'شهادة التقاعد الرسمية (Attestation de retraite) الصادرة عن الصندوق الوطني للتقاعد 📜': 'Attestation de retraite officielle délivrée par la Caisse Nationale des Retraites (CNR) 📜',
    'كشف مدخول أو بيان استلام معاش التقاعد لآخر 3 أشهر 💵': 'Bulletins de retraite ou justificatif de pension des 3 derniers mois 💵',
    'كشف حساب بنكي أو حساب البريد الجاري CCP لآخر 3 أشهر تظهر حركة معاش المعني دورياً 🏦': 'Relevé de compte bancaire ou CCP des 3 derniers mois montrant les virements réguliers de pension 🏦',
    'نسخة من بطاقة الحرفي (CAM) سارية المفعول، أو بطاقة الفنان الصادرة عن المجلس الوطني للفنون لعام 2026 🎨': 'Copie de la carte d\'artisan (CAM) ou de la carte d\'artiste émise par le Conseil National des Arts pour 2026 🎨',
    'شهادة دفع الضرائب الخاصة بنشاطه الحرفي 📊': 'Attestation de paiement des impôts spécifique à l\'activité artisanale 📊',
    'كشف حساب بنكي لآخر 6 أشهر يوضح حركة المداخيل 🏦': 'Relevé de compte bancaire des 6 derniers mois montrant le mouvement des revenus 🏦',
    'شهادة مدرسية حديثة من المؤسسة التربوية (الطور الابتدائي/المتوسط/الثانوي) 🏫': 'Certificat de scolarité récent de l\'établissement scolaire (Primaire/Moyen/Secondaire) 🏫',
    '⚙️ [الملف المالي والمهني الكامل للولي الشرعي والأب/الأم (الموظف)]:': '⚙️ [Dossier Financier & Pro Complet du Tuteur Légal / Parent (Salarié)] :',
    '⚙️ [الملف المالي والمهني الكامل للولي الشرعي والأب/الأم (التاجر)]:': '⚙️ [Dossier Financier & Pro Complet du Tuteur Légal / Parent (Commerçant)] :',
    '⚙️ [ملف الكفيل المالي الملحق]: رسالة تعهد بكفالة مالية مصادق عليها في البلدية من الوالد/الوالدة ✍️': '⚙️ [Dossier Garant Financier Joint] : Prise en charge financière légalisée à la mairie par le parent ✍️',
    '⚙️ [ملف الكفالة من الزوج - الموظف]: رسالة كفالة مالية من البلدية يلتزم بها الزوج ✍️': '⚙️ [Dossier Caution par Époux - Salarié] : Engagement de prise en charge financière légalisé à la mairie par le conjoint ✍️',
    '⚙️ [ملف الكفالة من الزوج - التاجر]: رسالة كفالة مالية من البلدية يلتزم بها الزوج ✍️': '⚙️ [Dossier Caution par Époux - Commerçant] : Engagement de prise en charge financière légalisé à la mairie par le conjoint ✍️',
    '⚙️ [ملف كفيل مالي قريبي من الدرجة الأولى - الموظف]: رسالة كفالة مصادق عليها في البلدية للكفيل ✍️': '⚙️ [Dossier Garant Financier Parent 1er Degré - Salarié] : Engagement de prise en charge légalisé à la mairie par le garant ✍️',
    '⚙️ [ملف كفيل مالي قريبي من الدرجة الأولى - التاجر]: رسالة كفالة مصادق عليها في البلدية للكفيل ✍️': '⚙️ [Dossier Garant Financier Parent 1er Degré - Commerçant] : Engagement de prise en charge légalisé à la mairie par le garant ✍️',
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
    'قرار إجازة سنوية أو رخصة غياب للمدة المحددة 📅': 'Annual leave decision or authorization of absence for the period 📅',
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
    'شهادة إيواء رسمية (Attestation d\'accueil) أصلية صادرة عن بلدية المضيف بالخارج في أوروبا 🏠': 'Official accommodation certificate (Attestation d\'accueil) issued by host townhall in Europe 🏠',
    'إثبات صلة القرابة الموثقة بالقرابة كدفتر عائلي أو شهادة عائلية مترجمة 👥': 'Proof of family relationship as family record book or translated family certificate 👥',
    'دعوة إيواء رسمية (Attestation d\'accueil) أصلية مستخرجة من بلدية ومصالح الشخص المستضيف بالخارج 🏠': 'Original official accommodation certificate (Attestation d\'accueil) issued by overseas host\'s townhall 🏠',
    'إثبات صلة القرابة بربط الملف (دفتر عائلي عاصمي أو بلدي) 👥': 'Proof of relationship for file linkage (family registry book) 👥',
    'خطاب القبول النهائي والأكاديمي الرسمي الصادر من الجامعة السعودية المانحة للمقعد 🎓': 'Official final academic acceptance letter issued by the scholarship-granting Saudi university 🎓',
    'إشعار التأشيرة الدراسية الصادر والموجه من وزارة الخارجية السعودية 🇸🇦': 'Study visa notification issued and directed by Saudi Ministry of Foreign Affairs 🇸🇦',
    'الشهادات الأكاديمية والمدرسية الجزائرية مصدقة ومصادق عليها بالكامل من وزارة الخارجية 📜': 'Algerian academic diplomas/certificates fully legalized by Ministry of Foreign Affairs 📜',
    'صحيفة السوابق العدلية (الصحيفة رقم 03) حديثة العهد ⚖️': 'Recent criminal record clearance certificate (Bulletin No. 3) ⚖️',
    'تقرير طبي رسمي مفصل ومصادق عليه يوضح الخلو من الأمراض المعدية والسارية 🩺': 'Detailed and authenticated official medical report certifying freedom from infectious/contagious diseases 🩺',
    'شهادة القبول والتسجيل النهائي الصادر عبر منصة Campus France الجزائر لعام 2026 🎓': 'Final acceptance and registration certificate issued via Campus France Algeria for 2026 🎓',
    'الحساب البنكي المغلق (Compte Bloqué) بمبلغ لا يقل عن 738 يورو شهرياً لتأمين مصاريف الدراسة بفرنسا 💶': 'Blocked bank account (Compte Bloqué) with a minimum of €738/month to secure study costs in France 💶',
    'إثبات السكن في بلد المقصد في فرنسا (عقد إيجار رسمي، شهادة إيواء، أو سكن جامعي CROUS) 🏠': 'Proof of accommodation in destination (Lease agreement, host certificate or CROUS student housing) 🏠',
    'خطاب القبول الجامعي المعتمد من الجامعة التركية مع إثبات رسمي لدفع القسط الدراسي الأول 🎓': 'Official university acceptance letter from Turkey with receipt of the first tuition installment 🎓',
    'تأمين صحي تركي دراسي مخصص ومعتمد طيلة فترات التعلم والتعليم 🩺': 'Approved Turkish study health insurance for the entire study period 🩺',
    'شهادة قبول جامعي أو تسجيل نهائي (Attestation d\'inscription) معترف بها من المعهد أو الجامعة المستضيفة بالخارج 🎓': 'University acceptance or registration certificate recognized abroad 🎓',
    'الحساب البنكي المغلق (Compte Bloqué) بمبلغ يثبت تجميد قدرة متمكنة لمصاريف سنة تعليمية 🏦': 'Blocked bank account (Compte Bloqué) with sufficient funds for an academic year expenses 🏦',
    'آخر الشهادات العلمية والمؤهلات المحصل عليها بالجزائر مترجمة باللغات الرسمية للبلد 📜': 'Latest diplomas and academic qualifications obtained in Algeria translated into target country official languages 📜',
    'تقرير طبي مفصل ومختوم من طبيب مختص بالجزائر يؤكد الحاجة الماسة للعلاج أو المتابعة الطبية بالخارج 🩺': 'Detailed and stamped medical report from a specialist in Algeria confirming urgent medical care abroad 🩺',
    'موافقة رسمية وتحديد موعد استقبال طبي من الهيئة الاستشفائية المستقبلة بالخارج 🏥': 'Official acceptance and scheduled appointment from the hosting hospital abroad 🏥',
    'الفاتورة التقديرية لكافة العلاجات المقررة (Devis) مع تقديم إثبات التغطية المالية الملائمة 💰': 'Estimated bill for scheduled medical care (Devis) with proof of appropriate financial coverage 💰',

    'شهادة عمل حديثة ومفصلة موقعة من صاحب العمل 💼': 'Recent and detailed employment certificate signed by employer 💼',
    'كشف حساب بنكي تجاري نشق لآخر 3 أشهر 🏦': 'Active commercial bank account statement for the last 3 months 🏦',
    'نسخة من بطاقة ممارسة المهنة الحرة أو الاعتماد المهني 📁': 'Copy of professional license or work accreditation 📁',
    'كشف حساب بنكي شخصي أو تجاري لآخر 3 أشهر 💳': 'Personal or commercial bank statement for the last 3 months 💳',
    // New 2026 Professional and specific destination document translations (English):
    'نسخة من حجز موعد البصمة الإلكتروني لدى مركز التقديم Visa Mosaic المعتمد (نتولى الحجز بالكامل) 📅': 'Copy of electronic fingerprint appointment reservation at the authorized Visa Mosaic center (we handle the booking fully) 📅',
    'كشف حساب بنكي لآخر 6 أشهر مختوم (شرط إجباري 2026 لجميع مقدمي التأشيرات لتركيا) 🏦': 'Stamped bank account statement for the last 6 months (compulsory requirement 2026 for Turkey) 🏦',
    'نسخة من عقد العمل الساري المفعول (Contrat de travail) 📄': 'Copy of valid employment contract (Contrat de travail) 📄',
    'شهادة عمل حديثة تزيد استمرار الموعد 💼': 'Recent employment certificate confirming employment continuity 💼',
    'كشوف الراتب أو مستحقات القبض لآخر 3 أشهر الأخيرة 💵': 'Salary slips or payment vouchers for the last 3 months 💵',
    'كشف حساب بنكي شخصي لآخر 3 أشهر يوضح دخول الرواتب دورياً 🏦': 'Personal bank statement for the last 3 months showing regular salary deposits 🏦',
    'نسخة طبق الأصل من السجل التجاري (Registre du Commerce) 📑': 'Certified copy of the commercial register (RC) 📑',
    'الشهادة الضريبية لعام 2026 (C20 أو جدول الضرائب المصفى الحديث) 📊': 'Tax certificate for 2026 (C20 or updated tax clearance) 📊',
    'شهادة الانتساب للضمان الاجتماعي لغير الأجراء (CASNOS) مع وصل تسديد السنة الجارية 💳': 'CASNOS affiliation certificate with payment receipt of the current year 💳',
    'كشف حساب بنكي لآخر 6 أشهر (الحساب التجاري للشركة + الحساب الشخصي) 🏦': 'Bank statement for the last 6 months (company commercial account + personal account) 🏦',
    'نسخة من الاعتماد الرسمي أو رخصة ممارسة المهنة الحرة الصادرة عن الجهات المختصة 📁': 'Copy of official accreditation or license to practice liberal profession 📁',
    'شهادة التسجيل في المنظمة أو النقابة الوطنية الخاصة بالمهنة لعام 2026 📜': 'Certificate of registration with the national guild or professional order for 2026 📜',
    'آخر تحديث للوضعية الجبائية من مصلحة الضرائب لعام 2026 📊': 'Latest update of tax status from the tax office for 2026 📊',
    'شهادة CASNOS حديثة ومرفقة بوصل التسديد الجاري 💳': 'Recent CASNOS certificate attached with current payment receipt 💳',
    'كشف حساب بنكي شخصي ومهني لآخر 6 أشهر 🏦': 'Personal and professional bank statement for the last 6 months 🏦',
    'نسخة من عقد تأسيس الشركة (Statut) يثبت الشراكة ونسبة الأسهم الممتلكة 📑': 'Copy of company articles of association (Statut) proving partnership and shares percentage 📑',
    'نسخة من السجل التجاري الخاص بالشركة ساري الصلاحية 📄': 'Copy of the valid commercial register of the company 📄',
    'الميزانية العمومية الأخيرة أو محضر اجتماع الجمعية العامة لتوزيع الأرباح (Bilan/PV) 📊': 'Latest balance sheet or minutes of general assembly for dividend distribution (Bilan/PV) 📊',
    'كشف الحساب البنكي للشركة + الحساب الشخصي لآخر 6 أشهر 🏦': 'Corporate bank statement + personal account for the last 6 months 🏦',
    'نسخة من بطاقة المقاول الذاتي البيومترية سارية المفعول لعام 2026 💳': 'Copy of biometric auto-entrepreneur card valid for 2026 💳',
    'شهادة التسجيل الإلكترونية في الوصلة الوطنية للمقاول الذاتي 🌐': 'Electronic registration certificate of national auto-entrepreneur network 🌐',
    'كشف حساب بنكي لآخر 6 أشهر يوضح حركة المداخيل ومستوى المعاملات 🏦': 'Bank statement for the last 6 months showing income movements and transactions 🏦',
    'نسخة من بطاقة الفلاح سارية المفعول ومنتسبة للغرفة الفلاحية 🌾': 'Copy of valid farmer card affiliated with the agricultural chamber 🌾',
    'شهادة ملكية الأرض الفلاحية أو عقد الامتياز الفلاحي الموثق من الموثق الرسمي 📜': 'Agricultural land ownership certificate or official notarized concession contract 📜',
    'شهادة الانتساب لصندوق الضمان الاجتماعي للفلاحين (CASNOS/Fellah) 💳': 'CASNOS social security affiliation certificate for farmers (CASNOS/Fellah) 💳',
    'كشف حساب بنكي لآخر 6 أشهر (يفضل حساب بنك الفلاحة والتنمية الريفية BADR) 🏦': 'Bank statement for the last 6 months (BADR bank preferred) 🏦',
    'شهادة التقاعد الرسمية (Attestation de retraite) الصادرة عن الصندوق الوطني للتقاعد 📜': 'Official retirement certificate (Attestation de retraite) issued by Caisse Nationale des Retraites 📜',
    'كشف مدخول أو بيان استلام معاش التقاعد لآخر 3 أشهر 💵': 'Pension statement or retirement payout receipt for the last 3 months 💵',
    'كشف حساب بنكي أو حساب البريد الجاري CCP لآخر 3 أشهر تظهر حركة معاش المعني دورياً 🏦': 'Bank or CCP statement for the last 3 months showing regular pension transfers 🏦',
    'نسخة من بطاقة الحرفي (CAM) سارية المفعول، أو بطاقة الفنان الصادرة عن المجلس الوطني للفنون لعام 2026 🎨': 'Copy of valid artisan card (CAM) or artist card issued by National Arts Council for 2026 🎨',
    'شهادة دفع الضرائب الخاصة بنشاطه الحرفي 📊': 'Tax payment certificate specific to the artisanal activity 📊',
    'كشف حساب بنكي لآخر 6 أشهر يوضح حركة المداخيل 🏦': 'Bank statement for the last 6 months showing income turnover 🏦',
    'شهادة مدرسية حديثة من المؤسسة التربوية (الطور الابتدائي/المتوسط/الثانوي) 🏫': 'Recent school certificate from the educational institution (Primary/Middle/High School) 🏫',
    '⚙️ [الملف المالي والمهني الكامل للولي الشرعي والأب/الأم (الموظف)]:': '⚙️ [Full Financial & Professional Dossier of Legal Guardian / Parent (Salaried)]:',
    '⚙️ [الملف المالي والمهني الكامل للولي الشرعي والأب/الأم (التاجر)]:': '⚙️ [Full Financial & Professional Dossier of Legal Guardian / Parent (Trader)]:',
    '⚙️ [ملف الكفيل المالي الملحق]: رسالة تعهد بكفالة مالية مصادق عليها في البلدية من الوالد/الوالدة ✍️': '⚙️ [Supporting Sponsor Financial Dossier]: Financial support commitment letter legalized at municipal hall by parent ✍️',
    '⚙️ [ملف الكفالة من الزوج - الموظف]: رسالة كفالة مالية من البلدية يلتزم بها الزوج ✍️': '⚙️ [Guarantee Dossier by Spouse - Salaried]: Support commitment letter legalized at municipal hall by spouse ✍️',
    '⚙️ [ملف الكفالة من الزوج - التاجر]: رسالة كفالة مالية من البلدية يلتزم بها الزوج ✍️': '⚙️ [Guarantee Dossier by Spouse - Trader]: Support commitment letter legalized at municipal hall by spouse ✍️',
    '⚙️ [ملف كفيل مالي قريبي من الدرجة الأولى - الموظف]: رسالة كفالة مصادق عليها في البلدية للكفيل ✍️': '⚙️ [1st Degree Relative Financial Sponsor Dossier - Salaried]: Support letter legalized at municipal hall for the sponsor ✍️',
    '⚙️ [ملف كفيل مالي قريبي من الدرجة الأولى - التاجر]: رسالة كفالة مصادق عليها في البلدية للكفيل ✍️': '⚙️ [1st Degree Relative Financial Sponsor Dossier - Trader]: Support letter legalized at municipal hall for the sponsor ✍️',
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
      .replace(/6 أشهر \(شرط إجباري لعام 2026 لتأشيرة تركيا\) 🏦/g, '6 mois (condition de 6 mois obligatoire pour 2026 pour la Turquie) 🏦')
      .replace(/صورتين شخصيتين حديثتين بخلفية بيضاء \(تخضع للمقاسات المحدد لبلد السفر: (.*?)\) 📸/g, "Deux photos d'identité récentes sur fond blanc (selon les dimensions requises pour le pays de voyage : $1) 📸")
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
      .replace(/المنصب، الراتب، وتاريخ التوظيف/g, "le poste, le salaire et la date d'embauche")
      .replace(/للكفيل الموظف/g, 'du garant salarié')
      .replace(/كشوف الراتب \(Fiches de paie\) لآخر ٣ أشهر الأخيرة للكفيل/g, 'Bulletins de salaire des 3 derniers mois du garant')
      .replace(/كشوف الراتب لآخر ٣ أشهر الأخيرة لكفيلك/g, 'Bulletins de salaire des 3 derniers mois de votre garant')
      .replace(/شهادة الانتساب لصندوق الضمان الاجتماعي \(CNAS\) حديثة ومختومة للكفيل/g, "Attestation d'affiliation CNAS récente et tamponnée du garant")
      .replace(/نسخة طبق الأصل من السجل التجاري \(Registre du Commerce\) للكفيل التاجر/g, 'Copie conforme du registre du commerce du garant commerçant')
      .replace(/الشهادة الضريبية لعام ٢٠٢٦ \(C20 أو جدول الضرائب المصفى الحديث\) للكفيل/g, 'Attestation fiscale 2026 (C20 ou extrait de rôle) du garant')
      .replace(/شهادة الانتساب للضمان الاجتماعي لغير الأجراء \(CASNOS\) مع وصل تسديد السنة الجارية للكفيل/g, "Attestation d'affiliation CASNOS avec reçu de paiement du garant")
      .replace(/رسالة تعهد بكفالة مالية مصادق عليها في البلدية من الوالد\/الوالدة/g, 'Prise en charge financière légalisée à la mairie par le parent')
      .replace(/شهادة مدرسية حديثة للعام الجاري أو بطاقة طالب جامعة/g, "Certificat de scolarité de l'année en cours ou carte d'étudiant")
      .replace(/شهادة عائلية لإثبات صلة القرابة والنسب والولاية/g, "Fiche familiale prouvant la garde légale et le lien de parenté")
      .replace(/تصريح أبوي بالسفر مصادق عليه في البلدية من الوالد/g, "Autorisation parentale de voyager légalisée à la mairie par le père")
      .replace(/كشف حساب بنكي للولي الشرعي لآخر ٦ أشهر/g, "Relevé bancaire du tuteur légal pour les 6 derniers mois")
      .replace(/شهادة عدم العمل من البلدية/g, "Attestation de non-travail délivrée par la mairie")
      .replace(/عقد الزواج \+ الشهادة العائلية/g, "acte de mariage + fiche familiale d'état civil")
      .replace(/رسالة كفالة مالية من البلدية يلتزم بها الزوج/g, "Engagement de prise en charge financière légalisé à la mairie par le conjoint")
      .replace(/كشف الحساب البنكي للزوج لآخر ٦ أشهر/g, "Relevé bancaire du conjoint pour les 6 derniers mois")
      .replace(/رسالة كفالة مصادق عليها في البلدية للكفيل/g, "Engagement de prise en charge légalisé à la mairie par le garant")
      .replace(/كشف حساب بنكي للكفيل لآخر ٦ أشهر/g, "Relevé de compte du garant pour les 6 derniers mois")
      .replace(/شهادة الانتساب لصندوق الضمان الاجتماعي \(CNAS\) حديثة ومختومة/g, "Attestation d'affiliation CNAS récente et tamponnée")
      .replace(/كشوف الراتب لآخر ٣ أشهر الأخيرة لك/g, "Vos bulletins de salaire des 3 derniers mois")
      .replace(/كشف حساب بنكي لآخر ٣ أشهر يوضح وتيرة صب الرواتب/g, "Relevé de compte des 3 derniers mois (salaires)")
      .replace(/نسخة مصورة من السجل التجاري الأصلي والحديث/g, "Copie du registre du commerce original")
      .replace(/شهادة الرمز الجبائي NIF ورمز النشاط الضريبي/g, "Attestation NIF et code d'activité")
      .replace(/شهادة دفع الضرائب السنوية وتصفية الديون الضريبية/g, "Attestation d'apurement fiscal (C20 / extrait de rôle)")
      .replace(/شهادة الانتساب لصندوق CASNOS/g, "Attestation d'affiliation CASNOS")
      .replace(/كشف الحساب التجاري للشركة أو الحساب البنكي/g, "Relevé bancaire commercial de l'entreprise")
      .replace(/بطاقة الحسم أو بطاقة ممارسة المهنة الخاصة/g, "Carte d'activité professionnelle libérale")
      .replace(/قرار الترخيص أو شهادة الاعتماد الرسمية/g, "Décision d'autorisation ou agrément officiel")
      .replace(/شهادة دفع الضرائب الخاصة بالمهن غير التجارية والمهن الحرة/g, "Attestation de impôt pour professions libérales")
      .replace(/كشف حساب بنكي أساسي دوري لآخر ٣ أشهر/g, "Relevé de compte bancaire principal (3 mois)")
      .replace(/شهادة التقاعد الأصلية ببيان التصفية/g, "Attestation de retraite avec état de liquidation")
      .replace(/كشف حساب بنكي للـ ٣ أشهر الأخيرة/g, "Relevé bancaire des 3 derniers mois")
      .replace(/دفتر صب المعاش البريدي/g, "carnet de pension postale")
      .replace(/جواز سفر أصلي صالح لأكثر من ٦ أشهر/g, "Passeport original valide de 6 mois")
      .replace(/حجز فندقي مؤكد يغطي كامل فترة الإقامة ومبلغ مالي كاش/g, "Réservation d'hôtel valide et argent liquide de poche")
      .replace(/تذكرة طائرة مؤكدة/g, "Billet d'avion confirmé")
      .replace(/تأشيرة/g, "Visa")
      .replace(/ملف الكفيل/g, "Dossier Garant")
      .replace(/ملف الكفالة/g, "Dossier Caution")
      .replace(/البلد/g, "Pays");
  } else if (lang === 'en') {
    translated = translated
      .replace(/6 أشهر \(شرط إجباري لعام 2026 لتأشيرة تركيا\) 🏦/g, '6 months (compulsory requirement 2026 for Turkey) 🏦')
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
};
