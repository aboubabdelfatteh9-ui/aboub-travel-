import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs/promises";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment variables");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Built-in expert travel knowledge bank for high-stability response safety
function getOfflineSpecialistResponse(message: string): string {
  const text = (message || "").toLowerCase().trim();
  const has = (keywords: string[]) => keywords.some(k => text.includes(k));

  const prefix = "*(مستشار عبعوب الذكي الاحتياطي المستقر)* 🤖✨\n\n";

  if (has(["سلام", "مرحبا", "مرحباً", "أهلاً", "اهلا", "صباح", "مساء", "كيف حال", "شكون"])) {
    return prefix + `أهلاً وسهلاً بك يا المسافر الكريم في المساعد السياحي لوكالة عبعوب للأسفار! 👋✈️

أنا مستشارك الخاص هنا لمساعدتك في تخطيط عطلتيك القادمة وسفرتك بكل أمان وراحة. كيف يمكنني إرشادك اليوم؟
بإمكانك سؤالي عن:
• ✈️ **تذاكر الطيران والأوزان المسموحة**.
• 🏨 **أفضل الفنادق والإقامات الترشيحية**.
• 📝 **ملفات الفيزا وشروط السفر للجزائريين**.
• 🏜️ **باقات الرحلات التنافسية وأسعارها حالياً**.
• 🗺️ **برامج جدول الرحلات السياحية اليومية**.`;
  }

  if (has(["طيران", "تذكرة", "تيكيت", "طائرة", "طيارة", "خطوط", "الأمتعة", "الوزن", "ticket", "flight", "airlines"])) {
    return prefix + `### ✈️ الاستشارة والتحقق بخصوص حجوزات الطيران والأمتعة:

1. **الخطوط الجوية الجزائرية (Air Algérie)**:
   - الخيار المفضل للرحلات المباشرة نحو فرنسا، إسبانيا، لندن، كندا، تركيا وتونس.
   - **الوزن المسموح**: عادة حقيبة واحدة 23 كغ (أو حقيبتان بمجموع 46 كغ لبعض العروض والدرجات)، مع 10 كغ حقيبة يد داخل المقصورة.

2. **الخطوط التركية (Turkish Airlines)**:
   - تقدم أفضل مستويات الراحة المباشرة نحو إسطنبول مع وجبات متكاملة وترفيه متميز.
   - **الوزن المسموح**: حقيبة تزن 23 كغ وحقيبة يد بوزن 8 كغ.

3. **حجز الرحلات الترانزيت**:
   - الخطوط القطرية، الإماراتية، والمملكة الأردنية تتيح السفر بأمان نحو وجهات آسيا وأمريكا بمسار توقف واحد مريح وبورقة حجز واحدة.

💡 *نصيحة الحجز المبكر*: احجز تذكرتك قبل سفرك بمدة **6 أسابيع** للحصول على أرخص الأسعار، وتأكد من صلاحية جواز سفرك لمدة لا تقل عن **6 أشهر**.

📞 **لحساب السعر الفوري للرحلة وتأكيد الحجز برقم تذكرة مضمون**: تواصل معنا مباشرة على الواتساب: **0667910148** 🟢`;
  }

  if (has(["فندق", "فنادق", "إقامة", "اقامة", "سكن", "شقة", "شقق", "hotel", "hotels", "accommodation"])) {
    return prefix + `### 🏨 دليل ترشيحات أرقى الفنادق الاقتصادية والفاخرة لرحلتك:

1. **إسطنبول (تركيا) 🇹🇷**:
   - **منطقة تقسيم (Taksim)**: قلب التسوق وإسطنبول المليئة بالحياة والمطاعم والمترو. مثالية للشباب ومحبي الحركة والتسوق.
   - **منطقة السلطان أحمد (Sultanahmet)**: هادئة وعريقة، محاطة بآيا صوفيا والمعالم التاريخية. ممتازة للعائلات والأطفال وكبار السن.
   - **منطقة أكسراي ولاليلي**: تجارية بامتياز لقربها من الترام والتسوق الجملة ومناسبة لتوفير الميزانية.

2. **دبي (الإمارات) 🇦🇪**:
   - **منطقة البرشاء (Al Barsha)**: ممتازة وعائلية واقتصادية وقريبة جداً من مول الإمارات ومحطات المترو.
   - **دبي مارينا و JBR**: لمحبي الفخامة والإطلالات البحرية المباشرة والمقاهي والأبراج المتلألئة.

3. **تونس (الحمامات وسوسة) 🇹🇳**:
   - منتجعات سياحية عائلية ممتازة بأنظمة شاملة للوجبات والألعاب المائية (All Inclusive) ومناسبة للاستجمام الصيفي المريح.

💡 *نصيحة ذكية*: احرص على اختيار فنادق بتقييم لا يقل عن **8.0/10** على المواقع العالمية لضمان المعاملة الطيبة والنظافة.

📞 **للحجوزات الفورية بأقل من أسعار الإنترنت**: تواصل معنا بالتواريخ المطلوبة: **0667910148**!`;
  }

  if (has(["فيزا", "تأشيرة", "تاشيرة", "ملف", "شينغن", "gateway", "globe", "visa"])) {
    return prefix + `### 📝 ملفات ومتطلبات تأشيرات الفيزا للجزائريين بالتفصيل:

1. **تأشيرة تركيا 🇹🇷**:
   - **التأشيرة الإلكترونية (B1 eVisa)**: متاحة للجزائريين الأقل من 15 سنة أو الأكبر من 35 سنة فورياً، وتتطلب امتلاك فيزا شينغن أو أمريكا أو بريطانيا صالحة ومستعملة مرة واحدة. نصدرها لك في غضون 5 دقائق فقط بالوكالة!
   - **التأشيرة العادية الملصقة (C1)**: تتطلب حجز موعد عبر Gateway Globe.
   - **الملف المطلوب**: جواز سفر صالح + صورتين بيومتريتين بخلفية بيضاء + شهادة عمل (أو كشف رواتب 3 أشهر الأخيرة/السجل التجاري) + كشف حساب بنكي بالدينار والأورو يحتوي على رصيد كافٍ (لا يقل عن 1500 أورو) لإثبات غرض السياحة + حجز طيران وفندق مؤكد وتأمين سفر دولي.

2. **تأشيرة دبي (الإمارات) 🇦🇪**:
   - إلكترونية بنسبة قبول ممتازة وتصدر في 48 ساعة فقط. الملف المطلوب: نسخة ملونة لجواز سفرك وصورتك الشخصية فقط!

3. **تأشيرة شينغن الأوروبية 🇪🇺**:
   - حجز المواعيد على مراكز التقديم (VFS, TLS)، وتجهيز غطاء تأمين صحي دولي متكامل وحجوزات حقيقية لتفادي أخطاء وتأخير الرفض.

🟢 **استشارة دقيقة بملفك**: أرسل وظيفتك وعمرك لطلب استشارة فيزا مخصصة: **0667910148**`;
  }

  if (has(["وجهة", "وجهات", "أماكن", "بلاصة", "أين أذهب", "سياحية", "سياحه", "destination", "travel", "places"])) {
    return prefix + `### 🏜️ أفضل الوجهات السياحية العالمية والمحلية المقترحة:

1. **إسطنبول (تركيا) 🇹🇷**: سحر التاريخ والمناظر البحرية الرائعة للبوسفور والتسوق العائلي الهائل ذو الأسعار التنافسية. تناسب كل الأوقات لسهولة النقل بالترام والمترو.
2. **شبه جزيرة دبي 🇦🇪**: وجهة الرفاهية والأبراج والتنقل المتطور في الشتاء والربيع. ميزات ترفيهية استثنائية للعائلة وألعاب مائية فريدة والتسوق الفاخر.
3. **تونس الحمامات 🇹🇳**: قريبة برياً وجوياً وبأسعار باقات عائلية في المتناول وبدون فيزا مسبقة. منتجعات الألعاب المائية والاسترخاء الصيفي الشاطئي المميز.
4. **جيجل وبجاية بالجزائر العميقة 🏖️🇩🇿**: سحر شواطئ الكورنيش بجانب غابات الأطلس والصنوبر، المغارات العجيبة بجيجل، وشلالات بجاية والوديان الباردة المنعشة للعائلات والشباب للاستجمام الطبيعي النظيف.

🗺️ دعنا نصمم لك باقة تفصيلية حسب بلد سفرك وميزانيتك الخاصة. اتصل بنا عبر الواتساب واكتشف عروضنا الحصرية!`;
  }

  if (has(["برنامج", "برامج", "مخطط", "جدول", "رحلة", "itinerary", "itineraries", "program"])) {
    return prefix + `### 🗺️ مخطط وبرنامج سياحي مقترح متكامل لزيارة إسطنبول لمدة 5 أيام:

• **اليوم 1**: الاستقبال المريح والراقي في المطار من طرف سائق وكالة عبعوب، والتوصيل المباشر للفندق بوسط المدينة للاستلام والاستراحة، ثم جولة مشي ترفيهية خفيفة في شارع الاستقلال الرائع وميدان تقسيم.

• **اليوم 2**: الانطلاق لقلب التاريخ العثماني بزيارة مسجد **آيا صوفيا** التاريخي المهيب والجامع الأزرق، تليها جولة تذوق للحلويات والتوابل في **السوق المصري الكبير**.

• **اليوم 3**: رحلة العبارة البحرية الخلابة الشهيرة نحو **جزيرة الأميرات** الهادئة للاستمتاع بالطبيعة الخضراء، وفي المساء رحلة عشاء في **مضيق البوسفور** الفاصل بين آسيا وأوروبا لمشاهدة غروب الشمس الرائع.

• **اليوم 4**: الصعود لـ **تلة العرائس (تشامليجا)** بالشق الآسيوي لمشاهدة كامل إسطنبول وجسر البوسفور المتلألئ، ثم زيارة مول وأكواريوم فلوريا المائي الفخم للتسوق الإبداعي.

• **اليوم 5**: جولة حرة لشراء المشغولات التذكارية في لاليلي أو جواهر إسطنبول، تليها مرافقتنا لكم بالسيارة الخاصة للمتجهين لمطار الإقلاع والعودة بألف سلامة لوطننا الحبيب الجزائر.

💡 **هل تريد برامج مخصصة لوجهتك المفضلة؟** ما عليك إلا إخطارنا بعدد الأيام المتاحة، وسيقوم فريق المبيعات بتنظيم الجدول لك مجاناً: **0667910148**!`;
  }

  if (has(["نصيحة", "نصائح", "صرف", "عملة", "نقود", "أمان", "امان", "شريحة", "اتصال", "tips", "advice"])) {
    return prefix + `### 💡 خمسة إرشادات ونصائح هامة وذهبية للسياحة الآمنة:

1. **الصرف الذكي لأموالك 💵**: لا تقم بتصريف مبالغ كبيرة في المطارات لأن الفارق كبير ويسبب لك الخسارة. من الأفضل تصريف الأورو في الجزائر بالأسواق الموازية (سعر مميز) ثم استخدام مكاتب الصرف الرسمية بالمدينة تدريجياً وبمبالغ صغيرة عند الحاجة.
2. **شرائح الاتصال والشبكة 📱**: بادر باقتناء شريحة اتصال سيم محلي عند الوصول (مثل Turkcell بتركيا، أو du/Etisalat بالإمارات) لتفعيل انترنت الخرائط ومعرفة الاتجاهات والتمتع برحلتك بمرونة تامة.
3. **الأمان ووثائقك الرسمية 🔒**: استخدم صندوق الأمانات الرقمي (Safe Box) لغرفتك بالفندق للاحتفاظ بجواز السفر الأصلي ومبالغك النقدية الكبيرة، واكتفِ بحفظ نسخة مصورة بجوالك للمشي اليومي والتنقل.
4. **تجنب التلاعب بسعر الأجرة 🚕**: استعمل دائماً خرائط Google وتطبيقات طلب الأجرة الموثوقة (مثل Uber أو Yandex) لمنع تلاعب سائقي التاكسي التقليديين وتحديد تسعيرة عادلة لرحلاتك.`;
  }

  if (has(["سعر", "أسعار", "اسعار", "ثمن", "شحال", "تكلفة", "بكم", "العمرة", "عمرة", "العمره", "باقة", "عرض", "عروض", "price", "prices", "rates"])) {
    return prefix + `### 💰 أسعار عروض باقات وكالة عبعوب للأسفار الحالية:

1. **باقة إسطنبول (تركيا) الاقتصادية 🇹🇷**:
   - السعر الشامل: **129,000 دج** (12 مليون و900 ألف سنتيم) تشمل تذاكر الطيران ذهاب وعودة، مبيت في فندق 4 نجوم فاخر مع فطور الصباح، مع مرشد مرافق ونزهات سياحية رائعة وجولات استكشافية!

2. **عروض العمرة المباركة للبقاع الطاهرة 🕋**:
   - تبدأ من **199,000 دج** وتختلف الباقات باختلاف القرب من الحرم المكي وتوقيتات السكن (غرف ثنائية، ثلاثية، رباعية). شامل كامل الرخص للتأشيرة، التذكرة المباشرة، وحقيبة السفر المجانية مع المرافق الديني المتمرس.

3. **رحلات جيجل وبجاية العائلية الداخلية 🏖️**:
   - أسعار عائلية مخفضة تبدأ من **45,000 دج** لعشرة أيام كاملة في شقق مريحة ومكيفة بمحاذاة الشواطئ الساحلية الخلابة.

📞 **اضمن حجزك بسعر حصري آمن ومضمون**: راسل مبيعات الوكالة لمعرفة الفترات المفتوحة بالتسجيل الفوري: **0667910148** 🟢`;
  }

  return prefix + `مرحباً بك يا مسافرنا العزيز في رحاب وكالة عبعوب للسياحة والأسفار! ✈️🗺️

يسعدني أن أكون رفيقك ومستشارك الخاص في رحلتك القادمة. يسعدني إرشادك حول كافة خدماتنا:
1. ✈️ **تذاكر الطيران**: أسعار تنافسية مرنة مريحة لجميع البلدان على كافة الخطوط الدولية.
2. 🏨 **حجوزات الفنادق والمنتجعات**: إقامة عائلية مضمونة القرب والنظافة في تونس، دبي، وإسطنبول بسعر رائع.
3. 📝 **تأشيرات الفيزا للجزائريين**: تأمين حجز مواعيد الفيزا الصعبة وإصدار تأشيرات دبي وتركيا الإلكترونية فوراً.
4. 🏜️ **السياحة الشاطئية الداخلية**: أرقى الرحلات الصيفية لجيجل وبجاية الكورنيش بأقل الأسعار.

هل تود الاستفسار عن الشروط، الأوراق المطلوبة للفيزا، الأمتعة، البرامج، أو عروض الباقات المخصصة؟ اكتب لي وسأجيبك فوراً!
أو اتصل بنا وسنسعد بخدمتك: **0667910148** 🟢`;
}

// Resilient central routing engine for robust model selection, timeouts and retry-backoff
async function generateResilientChatResponse(message: string, history: any[]): Promise<string> {
  const modelsToTry = ["gemini-2.5-flash", "gemini-3.5-flash", "gemini-3.1-flash-lite"];
  let lastError: any = null;

  // Adaptive model configurations
  let temperature = 0.7;
  const processedMessage = (message || "").toLowerCase();

  if (processedMessage.includes("برنامج") || processedMessage.includes("مخطط") || processedMessage.includes("رحلة")) {
    temperature = 0.85; // more creative and scenic descriptions
  } else if (processedMessage.includes("سعر") || processedMessage.includes("أسعار") || processedMessage.includes("فيزا") || processedMessage.includes("تأشيرة")) {
    temperature = 0.35; // focused and exact response logic
  }

  const systemInstruction = `أنت "المساعد السياحي الذكي المعتمد والفريد لوكالة عبعوب للسياحة والأسفار" في الجزائر.
وظيفتك الأساسية تزويد المسافرين الكرام بمعلومات دقيقة واحترافية باللغة العربية حول:
1. أسعار باقات السفر، تذاكر الطيران بكل أوزان الأمتعة ومواعيدها المناسبة.
2. الفنادق والإقامات الترشيحية الممتازة والقريبة من المواصلات في تركيا (إسطنبول)، دبي، تونس، وجيجل وبجاية بالجزائر.
3. أوراق وتسهيل تأشيرات الفيزا للجزائريين (مثل تأشيرة دبي، شينغن، وتأشيرة تركيا الإلكترونية والعادية والملصقة والمواعيد).
4. برامج جداول سياحية يومية متكاملة لزيارة تلك المدن بذكاء واختصار للجهد العائلي.
5. نصائح عامة للسفر الآمن (تبديل العملات، الأمان، شرائح الاتصال).

أجب بقيم عائلية متفائلة محترمة وبلهجة ترحيبية مهذبة. نسّق ردك بالفقرات والنقاط المنسقة والرموز التعبيرية المعبرة بوضوح.
وجه العميل دائماً للاتصال المباشر بمكتب المبيعات للحجز الفوري والتأكيد النهائي: 0667910148 (واتساب واتصال مباشر).`;

  for (const model of modelsToTry) {
    // Retry up to 3 times per model
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`[Resilient Backend Server] Trying Gemini API. Model: ${model}, Attempt: ${attempt}/3`);
        const ai = getGenAI();

        const formattedContents: any[] = [];
        if (Array.isArray(history)) {
          history.forEach((h: any) => {
            if (h.role && h.content) {
              formattedContents.push({
                role: h.role === "assistant" ? "model" : "user",
                parts: [{ text: h.content }]
              });
            }
          });
        }

        formattedContents.push({
          role: "user",
          parts: [{ text: message }]
        });

        // Set timeout to prevent indefinitely hanging requests
        const generatePromise = ai.models.generateContent({
          model,
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature,
          }
        });

        // Timeout wrapper for standard safety
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Request Timeout")), 12000)
        );

        const response: any = await Promise.race([generatePromise, timeoutPromise]);

        if (response && response.text) {
          console.log(`[Resilient Backend Server] Succeeded with model ${model} on attempt ${attempt}`);
          return response.text;
        }

        throw new Error("Empty response output received");
      } catch (err: any) {
        lastError = err;
        console.warn(`[Resilient Backend Server] Error with ${model} on attempt ${attempt}/3:`, err.message || err);
        if (attempt < 3) {
          // Exponential backoff
          await new Promise((resolve) => setTimeout(resolve, attempt * 500));
        }
      }
    }
  }

  // Absolute fallback: Settle to the expert built-in static rule engine so we never crash
  console.error("[Resilient Backend Server] All Gemini models & retry channels failed. Falling back to the offline specialist expert agent:", lastError);
  return getOfflineSpecialistResponse(message);
}

// Resilient parsing engine that handles model fallback and transient 503 errors gracefully
async function generateResilientParseResponse(prompt: string, schema: any): Promise<string> {
  const modelsToTry = ["gemini-2.5-flash", "gemini-3.1-flash-lite", "gemini-3.5-flash"];
  let lastError: any = null;

  for (const model of modelsToTry) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`[Trips AI Analyzer] Trying model: ${model}, Attempt: ${attempt}/3`);
        const ai = getGenAI();

        const generatePromise = ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: schema,
            temperature: 0.1, // low temperature for precise extraction
          }
        });

        // Set timeout to prevent indefinitely hanging requests (15 seconds)
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Request Timeout")), 15000)
        );

        const response: any = await Promise.race([generatePromise, timeoutPromise]);

        if (response && response.text) {
          console.log(`[Trips AI Analyzer] Succeeded with model ${model} on attempt ${attempt}`);
          return response.text;
        }

        throw new Error("Empty response output received");
      } catch (err: any) {
        lastError = err;
        console.warn(`[Trips AI Analyzer] Error with ${model} on attempt ${attempt}/3:`, err.message || err);
        if (attempt < 3) {
          // Exponential backoff
          await new Promise((resolve) => setTimeout(resolve, attempt * 500));
        }
      }
    }
  }

  throw lastError || new Error("All parsing models failed");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "20mb" }));
  app.use(express.urlencoded({ limit: "20mb", extended: true }));

  // Serve uploads directory statically in both development and production
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  app.use("/uploads", express.static(uploadsDir));

  // Image Upload Endpoint (handles base64 files and saves them to /public/uploads)
  app.post("/api/upload", async (req, res) => {
    try {
      const { fileData } = req.body;
      if (!fileData) {
        return res.status(400).json({ error: "No file data received." });
      }

      // Check if fileData is a base64 string
      const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ error: "Invalid base64 format." });
      }

      const mimeType = matches[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');

      // Create uploads directory in public if it doesn't exist
      await fs.mkdir(uploadsDir, { recursive: true });

      // Generate a clean filename to prevent directory traversal or collision
      const fileExt = mimeType.split('/')[1] || 'png';
      const cleanFileName = `upload-${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = path.join(uploadsDir, cleanFileName);

      await fs.writeFile(filePath, buffer);

      // Return the public URL
      const relativeUrl = `/uploads/${cleanFileName}`;
      console.log(`[Upload API] Image saved: ${filePath} -> URL: ${relativeUrl}`);
      res.json({ url: relativeUrl });
    } catch (error: any) {
      console.error("[Upload API] Error saving file:", error);
      res.status(500).json({ error: "Failed to upload image: " + error.message });
    }
  });

  // Simple Health status endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy" });
  });

  // Dynamic Trips Database Endpoints (GET, POST, PUT, DELETE, ANALYZE)
  const tripsDbPath = path.join(process.cwd(), "src", "data", "trips-db.json");

  // Read all trips
  app.get("/api/trips", async (req, res) => {
    try {
      const data = await fs.readFile(tripsDbPath, "utf-8");
      res.json(JSON.parse(data));
    } catch (error: any) {
      console.error("[Trips DB API] Error reading database:", error);
      res.status(500).json({ error: "Failed to load trips." });
    }
  });

  // Create new manual or parsed trip
  app.post("/api/trips", async (req, res) => {
    try {
      const newTrip = req.body;
      if (!newTrip.id) {
        newTrip.id = "trip-" + Date.now();
      }
      
      const fileContent = await fs.readFile(tripsDbPath, "utf-8");
      const list = JSON.parse(fileContent);
      
      // Prevent duplicates
      const index = list.findIndex((t: any) => t.id === newTrip.id);
      if (index !== -1) {
        list[index] = { ...list[index], ...newTrip };
      } else {
        list.push(newTrip);
      }
      
      await fs.writeFile(tripsDbPath, JSON.stringify(list, null, 2), "utf-8");
      console.log(`[Trips DB API] Trip added/updated: ${newTrip.id}`);
      res.status(201).json(newTrip);
    } catch (error: any) {
      console.error("[Trips DB API] Error writing database:", error);
      res.status(500).json({ error: "Failed to add trip." });
    }
  });

  // Update a trip by id
  app.put("/api/trips/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      
      const fileContent = await fs.readFile(tripsDbPath, "utf-8");
      const list = JSON.parse(fileContent);
      
      const index = list.findIndex((t: any) => t.id === id);
      if (index === -1) {
        return res.status(404).json({ error: "Trip not found." });
      }
      
      list[index] = { ...list[index], ...updatedData, id }; // retain original id
      
      await fs.writeFile(tripsDbPath, JSON.stringify(list, null, 2), "utf-8");
      console.log(`[Trips DB API] Trip updated: ${id}`);
      res.json(list[index]);
    } catch (error: any) {
      console.error("[Trips DB API] Error updating trip:", error);
      res.status(500).json({ error: "Failed to update trip." });
    }
  });

  // Delete a trip by id
  app.delete("/api/trips/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      const fileContent = await fs.readFile(tripsDbPath, "utf-8");
      let list = JSON.parse(fileContent);
      
      const exists = list.some((t: any) => t.id === id);
      if (!exists) {
        return res.status(404).json({ error: "Trip not found." });
      }
      
      list = list.filter((t: any) => t.id !== id);
      
      await fs.writeFile(tripsDbPath, JSON.stringify(list, null, 2), "utf-8");
      console.log(`[Trips DB API] Trip deleted: ${id}`);
      res.json({ success: true, message: `Trip ${id} deleted successfully.` });
    } catch (error: any) {
      console.error("[Trips DB API] Error deleting trip:", error);
      res.status(500).json({ error: "Failed to delete trip." });
    }
  });

  // AI unstructured text helper using Gemini API
  app.post("/api/trips/analyze", async (req, res) => {
    try {
      const { text, category } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Text is required for analysis." });
      }

      console.log(`[Trips AI Analyzer] Analyzing raw text for category: ${category}`);
      const ai = getGenAI();
      const prompt = `
Analyze the following raw, unorganized tourist/trip offer text. 

Input raw text description:
"""
${text}
"""

Selected Category by Admin: "${category || 'intl'}"

You must analyze this text and construct a fully complete, professional, premium tourist trip package.
To make it indistinguishable from manually created high-end offers, you MUST do the following:
1. Extract and format all fields. Ignore or strip messy hashtags and redundant emoji characters.
2. Translate all text fields into Arabic (Ar), French (Fr), and English (En). Ensure the translations are natural, highly engaging, and grammatically perfect.
3. Automatically generate a beautiful, day-by-day complete itinerary (program) for the trip (e.g., if the duration is 8 days, generate 5 to 8 detailed sequential days of sightseeing, adventures, and relaxing activities matching the destination's famous landmarks!). Each day must have a title and description in Arabic, French, and English.
4. Extract all price categories listed (e.g. Double/Triple room, Single room, children's package) into the "prices" list, and provide the room/package type translated in Arabic, French, and English, along with the price in DZD (e.g. "129000").
5. Synthesize "regNotes" (registration/booking notes), "badge1" (e.g. transport type like "✈️ Direct Flight" / "✈️ طيران مباشر"), and "badge2" (e.g. duration info like "📅 8 Days / 7 Nights" / "📅 8 أيام / 7 ليال").
6. If any critical info is missing, use your expert travel knowledge to generate logical, attractive placeholders (e.g., recommend real 4-star hotels for the destination, standard 7-8 day duration, realistic market pricing, standard inclusions like buffet breakfast, transfers, tour guide).

Your response MUST be ONLY the JSON object conforming to the schema, with no markdown code blocks, no explanations, and no text before or after.
`;

      const schema = {
        type: Type.OBJECT,
        properties: {
          titleAr: { type: Type.STRING },
          titleFr: { type: Type.STRING },
          titleEn: { type: Type.STRING },
          descAr: { type: Type.STRING },
          descFr: { type: Type.STRING },
          descEn: { type: Type.STRING },
          durationAr: { type: Type.STRING },
          durationFr: { type: Type.STRING },
          durationEn: { type: Type.STRING },
          hotelAr: { type: Type.STRING },
          hotelFr: { type: Type.STRING },
          hotelEn: { type: Type.STRING },
          price: { type: Type.INTEGER },
          prices: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                typeAr: { type: Type.STRING },
                typeFr: { type: Type.STRING },
                typeEn: { type: Type.STRING },
                price_dzd: { type: Type.STRING }
              },
              required: ["typeAr", "typeFr", "typeEn", "price_dzd"]
            }
          },
          includedAr: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          includedFr: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          includedEn: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          program: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                tAr: { type: Type.STRING },
                dAr: { type: Type.STRING },
                tFr: { type: Type.STRING },
                dFr: { type: Type.STRING },
                tEn: { type: Type.STRING },
                dEn: { type: Type.STRING }
              },
              required: ["tAr", "dAr", "tFr", "dFr", "tEn", "dEn"]
            }
          },
          regNotesAr: { type: Type.STRING },
          regNotesFr: { type: Type.STRING },
          regNotesEn: { type: Type.STRING },
          badge1Ar: { type: Type.STRING },
          badge1Fr: { type: Type.STRING },
          badge1En: { type: Type.STRING },
          badge2Ar: { type: Type.STRING },
          badge2Fr: { type: Type.STRING },
          badge2En: { type: Type.STRING }
        },
        required: [
          "titleAr", "titleFr", "titleEn",
          "descAr", "descFr", "descEn",
          "durationAr", "durationFr", "durationEn",
          "hotelAr", "hotelFr", "hotelEn",
          "price", "prices",
          "includedAr", "includedFr", "includedEn",
          "program",
          "regNotesAr", "regNotesFr", "regNotesEn",
          "badge1Ar", "badge1Fr", "badge1En",
          "badge2Ar", "badge2Fr", "badge2En"
        ]
      };

      const resultText = await generateResilientParseResponse(prompt, schema);
      const cleanText = resultText.trim();
      const parsedJson = JSON.parse(cleanText);
      res.json(parsedJson);
    } catch (error: any) {
      console.error("[Trips AI Analyzer] Failed to parse unstructured text:", error);
      res.status(500).json({ error: "Failed to analyze unstructured text. Details: " + error.message });
    }
  });

  // UNIFIED RESILIENT /chat API ENDPOINT (And api/chat + api/gemini/chat aliases for absolute routing prevention)
  const unifiedChatHandler = async (req: express.Request, res: express.Response) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message parameter is required." });
      }

      const botReply = await generateResilientChatResponse(message, history || []);
      res.json({ reply: botReply });
    } catch (error: any) {
      console.error("[Resilient Backend Server] Uncaught Error in Unified Chat:", error);
      // Even in uncaught errors, we return a beautiful localized response instead of 500/503
      try {
        const fallbackAnswer = getOfflineSpecialistResponse(req.body.message || "");
        res.json({ reply: fallbackAnswer });
      } catch (innerErr) {
        res.status(500).json({ error: "Failed to generate chat response safely." });
      }
    }
  };

  app.post("/chat", unifiedChatHandler);
  app.post("/api/chat", unifiedChatHandler);
  app.post("/api/gemini/chat", unifiedChatHandler);

  // Serve static assets or use Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
