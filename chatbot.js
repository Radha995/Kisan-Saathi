/* AgriScan - AI Agriculture Chatbot (Bilingual: English + Hindi) */

let chatbotLang = localStorage.getItem('agriscan_chat_lang') || 'en';

const CHATBOT_RESPONSES = [
  {
    keywords: ['hello', 'hi', 'hey', 'namaste', 'नमस्ते', 'good morning', 'good evening', 'हाय'],
    en: 'Namaste! 🌾 I am AgriScan, your AI farming assistant. I can help you with:\n\n🌱 Disease detection\n🌤️ Weather updates\n🧪 Fertilizer advice\n🐛 Pest control\n💧 Irrigation tips\n🌿 Organic farming\n\nWhat would you like to know about your crops today?',
    hi: 'नमस्ते! 🌾 मैं एग्रीस्कैन हूं, आपका कृत्रिम बुद्धिमत्ता आधारित कृषि सहायक। मैं आपकी मदद कर सकता हूं:\n\n🌱 रोग पहचान\n🌤️ मौसम जानकारी\n🧪 उर्वरक सलाह\n🐛 कीट नियंत्रण\n💧 सिंचाई टिप्स\n🌿 जैविक खेती\n\nआज अपनी फसल के बारे में क्या जानना चाहेंगे?'
  },
  {
    keywords: ['rice', 'paddy', 'धान', 'चावल'],
    en: '🌾 **Rice/Paddy Farming Tips:**\n\n• **Sowing:** June-July for Kharif season\n• **Water:** Maintain 5cm standing water during growth\n• **Fertilizer:** N: 120 kg/ha, P: 60 kg/ha, K: 40 kg/ha\n• **Common diseases:** Rice blast, Brown spot, Sheath blight\n• **Pests:** Stem borer, Leaf folder, Brown plant hopper\n• **Harvest:** When 80% grains turn golden\n• **Yield:** 4-6 tons/ha with good management\n\n💡 Use resistant varieties like Pusa Basmati, CR Dhan.',
    hi: '🌾 **धान/चावल की खेती के टिप्स:**\n\n• **बुवाई:** जून-जुलाई (खरीफ सीजन)\n• **पानी:** बढ़ते समय 5 सेमी पानी रखें\n• **खाद:** N: 120 किग्रा/हे, P: 60 किग्रा/हे, K: 40 किग्रा/हे\n• **रोग:** ब्लास्ट, ब्राउन स्पॉट, शीथ ब्लाइट\n• **कीट:** तना छेदक, पत्ती लपेटक, भूरा फुदका\n• **कटाई:** जब 80% दाने सुनहरे हो जाएं\n• **उपज:** 4-6 टन/हेक्टेयर\n\n💡 पूसा बासमती, सीआर धान जैसी प्रतिरोधी किस्में चुनें।'
  },
  {
    keywords: ['wheat', 'गेहूं'],
    en: '🌾 **Wheat Farming Tips:**\n\n• **Sowing:** October-November (Rabi season)\n• **Seed rate:** 100-125 kg/ha\n• **Water:** 4-5 irrigations at critical stages\n• **Fertilizer:** N: 120-150 kg/ha, P: 60 kg/ha, K: 40 kg/ha\n• **Common diseases:** Rust (yellow/brown), Powdery mildew\n• **Pests:** Aphids, Termites\n• **Harvest:** March-April when grains are hard\n• **Varieties:** HD 2967, PBW 550, DBW 17\n\n💡 Apply first irrigation 21 days after sowing.',
    hi: '🌾 **गेहूं की खेती के टिप्स:**\n\n• **बुवाई:** अक्टूबर-नवंबर (रबी सीजन)\n• **बीज दर:** 100-125 किग्रा/हेक्टेयर\n• **पानी:** 4-5 सिंचाई महत्वपूर्ण अवस्था पर\n• **खाद:** N: 120-150, P: 60, K: 40 किग्रा/हे\n• **रोग:** रस्ट (पीला/भूरा), पाउडरी मिल्ड्यू\n• **कीट:** एफिड, दीमक\n• **कटाई:** मार्च-अप्रैल जब दाने सख्त हों\n• **किस्में:** HD 2967, PBW 550, DBW 17\n\n💡 बुवाई के 21 दिन बाद पहली सिंचाई करें।'
  },
  {
    keywords: ['tomato', 'टमाटर'],
    en: '🍅 **Tomato Farming Tips:**\n\n• **Planting:** July-September and December-February\n• **Spacing:** 60 cm x 45 cm\n• **Water:** Drip irrigation preferred, keep soil moist\n• **Fertilizer:** NPK 100:50:50 kg/ha + FYM 25 tons/ha\n• **Common diseases:** Late blight, Early blight, Leaf curl virus\n• **Pests:** Fruit borer, Whitefly, Aphids\n• **Harvest:** 60-70 days after planting, fruits turn red\n• **Yield:** 25-30 tons/ha\n\n💡 Use staking for better yield and quality.',
    hi: '🍅 **टमाटर की खेती के टिप्स:**\n\n• **रोपाई:** जुलाई-सितंबर और दिसंबर-फरवरी\n• **दूरी:** 60 सेमी x 45 सेमी\n• **पानी:** ड्रिप सिंचाई बेहतर, नमी बनाए रखें\n• **खाद:** NPK 100:50:50 किग्रा/हे + गोबर 25 टन/हे\n• **रोग:** अगेती/पछेती झुलसा, पत्ती मुड़कर रोग\n• **कीट:** फल छेदक, सफेद मक्खी, एफिड\n• **तुड़ाई:** 60-70 दिन में फल लाल होने पर\n• **उपज:** 25-30 टन/हेक्टेयर\n\n💡 सहारा (स्टेकिंग) देकर उपज और गुणवत्ता बढ़ाएं।'
  },
  {
    keywords: ['potato', 'आलू'],
    en: '🥔 **Potato Farming Tips:**\n\n• **Planting:** October-December (North), November-January (South)\n• **Seed rate:** 1500-2000 kg tubers/ha\n• **Spacing:** 60 cm x 20 cm\n• **Water:** Light but frequent irrigation\n• **Fertilizer:** NPK 120:80:120 kg/ha\n• **Common diseases:** Late blight, Early blight, Scab\n• **Pests:** Tuber moth, Aphids\n• **Harvest:** 80-100 days, when foliage yellows\n• **Varieties:** Kufri Jyoti, Kufri Bahar\n\n💡 Store potatoes in cool, dark, ventilated place.',
    hi: '🥔 **आलू की खेती के टिप्स:**\n\n• **रोपाई:** अक्टूबर-दिसंबर (उत्तर), नवंबर-जनवरी (दक्षिण)\n• **बीज दर:** 1500-2000 किग्रा कंद/हे\n• **दूरी:** 60 सेमी x 20 सेमी\n• **पानी:** हल्की बार-बार सिंचाई\n• **खाद:** NPK 120:80:120 किग्रा/हे\n• **रोग:** पछेती/अगेती झुलसा, स्कैब\n• **कीट:** कंद कीट, एफिड\n• **कटाई:** 80-100 दिन, पत्ते पीले होने पर\n• **किस्में:** कुफरी ज्योति, कुफरी बहार\n\n💡 आलू को ठंडी, अंधेरी, हवादार जगह रखें।'
  },
  {
    keywords: ['fertilizer', 'उर्वरक', 'खाद', 'urea', 'यूरिया', 'dap', 'npk', 'manure', 'compost'],
    en: '🧪 **Fertilizer Guide:**\n\n**Chemical Fertilizers:**\n• **Urea (46% N):** 2-3 bags/acre for most crops\n• **DAP (18:46:0):** 1-2 bags/acre at sowing\n• **MOP (60% K):** 0.5-1 bag/acre\n• **NPK Complex (10:26:26):** 2 bags/acre\n\n**Organic Options:**\n• **Vermicompost:** 5 tons/ha\n• **FYM:** 10-15 tons/ha\n• **Neem Cake:** 500 kg/ha\n• **Green Manure:** Sunhemp/Dhaincha\n\n💡 **Always do a soil test before applying fertilizer!**',
    hi: '🧪 **उर्वरक गाइड:**\n\n**रासायनिक उर्वरक:**\n• **यूरिया (46% N):** 2-3 बोरी/एकड़ अधिकांश फसलों के लिए\n• **डीएपी (18:46:0):** 1-2 बोरी/एकड़ बुवाई पर\n• **एमओपी (60% K):** 0.5-1 बोरी/एकड़\n\n**जैविक विकल्प:**\n• **वर्मीकम्पोस्ट:** 5 टन/हेक्टेयर\n• **गोबर की खाद:** 10-15 टन/हेक्टेयर\n• **नीम की खली:** 500 किग्रा/हेक्टेयर\n• **हरी खाद:** ढैंचा/सनई\n\n💡 **खाद डालने से पहले मिट्टी की जांच जरूर कराएं!**'
  },
  {
    keywords: ['pest', 'कीट', 'insect', 'aphid', 'एफिड', 'whitefly', 'सफेद मक्खी', 'caterpillar', 'इल्ली', 'thrips', 'mite'],
    en: '🐛 **Pest Management:**\n\n**Common Pests & Control:**\n\n• **Aphids:** Neem oil (30ml/L) + soap spray\n• **Whitefly:** Yellow sticky traps + Neem oil\n• **Caterpillar/Fruit borer:** Bt spray (Bacillus thuringiensis)\n• **Thrips:** Spinosad or neem oil\n• **Mites:** Sulfur spray or neem oil\n\n**Integrated Pest Management:**\n• Monitor fields weekly\n• Use pheromone traps (4-5/acre)\n• Encourage beneficial insects\n\n🌿 **Start with organic/biological control first!**',
    hi: '🐛 **कीट प्रबंधन:**\n\n**सामान्य कीट एवं नियंत्रण:**\n\n• **एफिड (माहू):** नीम तेल (30 मिली/ली) + साबुन स्प्रे\n• **सफेद मक्खी:** पीला चिपचिपा जाल + नीम तेल\n• **इल्ली/फल छेदक:** बीटी स्प्रे\n• **थ्रिप्स:** स्पिनोसेड या नीम तेल\n• **माइट:** गंधक स्प्रे या नीम तेल\n\n**एकीकृत कीट प्रबंधन:**\n• हर हफ्ते खेत का निरीक्षण करें\n• फेरोमोन जाल लगाएं (4-5/एकड़)\n• लाभकारी कीटों को प्रोत्साहित करें\n\n🌿 **पहले जैविक नियंत्रण का उपयोग करें!**'
  },
  {
    keywords: ['organic', 'जैविक', 'natural farming', 'प्राकृतिक खेती', 'chemical free'],
    en: '🌿 **Organic Farming Guide:**\n\n**Soil Health:**\n• Add vermicompost (5 tons/ha)\n• Use green manure crops\n• Apply Jeevamrut (fermented cow dung solution)\n\n**Pest Control:**\n• Neem oil (30ml/L water)\n• Garlic-chili-ginger extract\n• Dashaparni (10-leaf extract)\n• Trichoderma biofungicide\n\n**Weed Management:**\n• Mulching with straw/leaves\n• Hand weeding at right time\n\n💡 Start with a small area, then expand gradually!',
    hi: '🌿 **जैविक खेती गाइड:**\n\n**मिट्टी का स्वास्थ्य:**\n• वर्मीकम्पोस्ट (5 टन/हे) डालें\n• हरी खाद वाली फसलें उगाएं\n• जीवामृत (गोबर का किण्वित घोल) का उपयोग\n\n**कीट नियंत्रण:**\n• नीम तेल (30 मिली/ली पानी)\n• लहसुन-मिर्च-अदरक का अर्क\n• दशपर्णी (10 पत्तियों का अर्क)\n• ट्राइकोडर्मा जैव कवकनाशी\n\n**खरपतवार प्रबंधन:**\n• पुआल/पत्तियों से मल्चिंग\n• सही समय पर हाथ से निराई\n\n💡 छोटे क्षेत्र से शुरू करें, फिर धीरे-धीरे बढ़ाएं!'
  },
  {
    keywords: ['irrigation', 'सिंचाई', 'water', 'पानी', 'drip', 'ड्रिप', 'sprinkler'],
    en: '💧 **Irrigation Guide:**\n\n**Methods:**\n• **Drip Irrigation:** Best for vegetables (saves 40-50% water)\n• **Sprinkler:** Good for wheat, pulses, groundnut\n• **Flood:** Traditional, for rice and sugarcane\n\n**When to Irrigate:**\n• Check soil moisture by feel method\n• Irrigate early morning or evening\n• Critical stages: flowering, grain filling\n\n**Water-Saving Tips:**\n• Use drip irrigation + plastic mulch\n• Collect rainwater in farm ponds\n• Laser land leveling\n\n💡 Government subsidy available for drip/sprinkler sets!',
    hi: '💧 **सिंचाई गाइड:**\n\n**विधियां:**\n• **ड्रिप सिंचाई:** सब्जियों के लिए सर्वोत्तम (40-50% पानी बचत)\n• **स्प्रिंकलर:** गेहूं, दालें, मूंगफली के लिए अच्छा\n• **बाढ़:** पारंपरिक, धान और गन्ने के लिए\n\n**कब सिंचाई करें:**\n• मिट्टी की नमी हाथ से जांचें\n• सुबह या शाम को सिंचाई करें\n• फूल आने और दाना भरने की अवस्था पर जरूरी\n\n💡 ड्रिप/स्प्रिंकलर सेट पर सरकारी सब्सिडी उपलब्ध!'
  },
  {
    keywords: ['disease', 'बीमारी', 'रोग', 'blight', 'mildew', 'rust', 'fungus', 'fungal', 'viral', 'bacterial'],
    en: '🔬 **Crop Disease Management:**\n\n• **Powdery Mildew:** White powder → Sulfur dust or milk spray (30%)\n• **Late Blight:** Water-soaked lesions → Copper fungicide\n• **Rust:** Orange/brown pustules → Propiconazole\n• **Leaf Curl:** Curled leaves → Control whiteflies\n• **Bacterial Wilt:** Sudden wilting → Streptomycin + Copper\n\n🌱 **Prevention:** Use disease-free seeds, resistant varieties, crop rotation.\n\n📸 **Upload a leaf photo** in Disease Detection for AI analysis!',
    hi: '🔬 **फसल रोग प्रबंधन:**\n\n• **चूर्णिल आसिता:** सफेद पाउडर → गंधक या दूध स्प्रे (30%)\n• **पछेती झुलसा:** पानी जैसे धब्बे → तांबा फफूंदनाशी\n• **रस्ट:** नारंगी/भूरे फुंसी → प्रोपिकोनाजोल\n• **पत्ती मुड़कर:** मुड़ी पत्तियां → सफेद मक्खी नियंत्रण\n• **जीवाणु विल्ट:** अचानक मुरझाना → स्ट्रेप्टोमाइसिन + कॉपर\n\n🌱 **बचाव:** रोग मुक्त बीज, प्रतिरोधी किस्में, फसल चक्र अपनाएं।\n\n📸 रोग पहचान में पत्ती की फोटो अपलोड करें!'
  },
  {
    keywords: ['weather', 'मौसम', 'rain', 'बारिश', 'temperature', 'तापमान'],
    en: '🌤️ **Weather-Based Farming Advice:**\n\n• **Before Rain:** Apply fertilizer before forecasted rain\n• **After Rain:** Check for waterlogging, pest outbreak\n• **Hot Weather:** Irrigate more, provide shade\n• **Cold Weather:** Protect from frost\n\n📅 Check the **Weather** section for current conditions!\n\n💡 Plan farming activities based on weather forecast.',
    hi: '🌤️ **मौसम आधारित कृषि सलाह:**\n\n• **बारिश से पहले:** खाद डालें\n• **बारिश के बाद:** जलभराव, कीट प्रकोप की जांच करें\n• **गर्म मौसम:** अधिक सिंचाई, छाया प्रदान करें\n• **ठंडा मौसम:** पाले से बचाव करें\n\n📅 मौसम अनुभाग में आज का मौसम देखें!\n\n💡 मौसम पूर्वानुमान के अनुसार खेती की योजना बनाएं।'
  },
  {
    keywords: ['soil', 'मिट्टी', 'soil test', 'मिट्टी परीक्षण', 'ph', 'fertility'],
    en: '🧪 **Soil Health Guide:**\n\n**Soil Testing:**\n• Test soil every 2-3 years\n• Collect samples from 5-6 spots per field\n• Test for: pH, N, P, K, Organic Carbon\n\n**Ideal pH:** 6.0-7.5 for most crops\n• Rice: 5.5-7.0 • Potato: 5.0-6.5\n\n**Deficiency Signs:**\n• Yellow lower leaves → Nitrogen\n• Purple leaves → Phosphorus\n• Leaf edge burn → Potassium\n\n💡 Soil testing is FREE at government labs!',
    hi: '🧪 **मिट्टी स्वास्थ्य गाइड:**\n\n**मिट्टी परीक्षण:**\n• हर 2-3 साल में मिट्टी जांच कराएं\n• 5-6 स्थानों से नमूना लें\n• जांचें: pH, N, P, K, जैविक कार्बन\n\n**आदर्श pH:** अधिकांश फसलों के लिए 6.0-7.5\n• धान: 5.5-7.0 • आलू: 5.0-6.5\n\n**कमी के लक्षण:**\n• पीली निचली पत्तियां → नाइट्रोजन\n• बैंगनी पत्तियां → फास्फोरस\n• पत्ती किनारा जलना → पोटाश\n\n💡 सरकारी प्रयोगशालाओं में मिट्टी जांच मुफ्त है!'
  },
  {
    keywords: ['government', 'सरकारी', 'scheme', 'योजना', 'subsidy', 'सब्सिडी', 'kisan', 'किसान', 'pm kisan', 'insurance', 'बीमा'],
    en: '🏛️ **Government Schemes for Farmers:**\n\n**1. PM Kisan Samman Nidhi**\n• ₹6,000/year in 3 installments\n• Direct bank transfer\n\n**2. PM Fasal Bima Yojana**\n• Low premium (2% Kharif, 1.5% Rabi)\n\n**3. Kisan Credit Card**\n• Rs. 3 lakh loan at 7% interest\n\n**4. Soil Health Card**\n• Free soil testing every 3 years\n\n📞 **Helpline:** Kisan Call Center - 1800-180-1551',
    hi: '🏛️ **किसानों के लिए सरकारी योजनाएं:**\n\n**1. प्रधानमंत्री किसान सम्मान निधि**\n• ₹6,000/साल 3 किस्तों में\n• सीधा बैंक खाते में\n\n**2. प्रधानमंत्री फसल बीमा योजना**\n• कम प्रीमियम (खरीफ 2%, रबी 1.5%)\n\n**3. किसान क्रेडिट कार्ड**\n• 3 लाख रुपए कर्ज 7% ब्याज पर\n\n**4. मृदा स्वास्थ्य कार्ड**\n• हर 3 साल में मुफ्त मिट्टी जांच\n\n📞 **हेल्पलाइन:** किसान कॉल सेंटर - 1800-180-1551'
  },
  {
    keywords: ['thank', 'धन्यवाद', 'शुक्रिया', 'thanks'],
    en: 'You\'re very welcome! 😊\n\nKeep using AgriScan for:\n✅ Disease detection with AI\n✅ Weather updates & advisories\n✅ Voice assistant in your language\n✅ Farming tips & crop recommendations\n\nHappy Farming! 🌾🌿🙏',
    hi: 'आपका स्वागत है! 😊\n\nएग्रीस्कैन का उपयोग करते रहें:\n✅ AI से रोग पहचान\n✅ मौसम अपडेट और सलाह\n✅ आपकी भाषा में वॉयस सहायक\n✅ खेती टिप्स और फसल सिफारिशें\n\nखेती करते रहें! 🌾🌿🙏'
  }
];

function getChatbotResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim();

  for (const entry of CHATBOT_RESPONSES) {
    if (entry.keywords.some(kw => msg.includes(kw))) {
      return chatbotLang === 'hi' && entry.hi ? entry.hi : entry.en;
    }
  }

  return generateGeneralChatResponse(msg, userMessage);
}

function generateGeneralChatResponse(msg, originalMsg) {
  if (msg.includes('how') && (msg.includes('are') || msg.includes('you'))) {
    return chatbotLang === 'hi'
      ? 'मैं बिल्कुल ठीक हूं, धन्यवाद! आपकी खेती में मदद करने के लिए तैयार हूं। 🌾 क्या जानना चाहेंगे?'
      : 'I am doing great, thank you! 🌾 What can I assist you with today?';
  }

  if ((msg.includes('what') && (msg.includes('agriscan') || msg.includes('you') || msg.includes('this'))) || msg.includes('क्या हो')) {
    return chatbotLang === 'hi'
      ? '🌱 **एग्रीस्कैन के बारे में:**\n\nमैं भारतीय किसानों की मदद के लिए बनाया गया AI कृषि सहायक हूं। मैं:\n\n📸 पत्ती की फोटो से **रोग पहचान** कर सकता हूं\n🌤️ **मौसम** पूर्वानुमान और सलाह दे सकता हूं\n🎤 **हिंदी, अंग्रेजी और क्षेत्रीय भाषाओं** में बात कर सकता हूं\n🧪 **उर्वरक और कीट नियंत्रण** सलाह दे सकता हूं\n\nखेती के बारे में कुछ भी पूछें!'
      : '🌱 **About AgriScan:**\n\nI am an AI-powered farming assistant designed to help Indian farmers. I can:\n\n📸 Detect crop diseases from leaf photos\n🌤️ Show weather forecasts & farming advisories\n🎤 Talk in Hindi, English & regional languages\n🧪 Give fertilizer & pest control advice\n🌿 Suggest organic farming methods\n\nJust ask me anything about farming!';
  }

  if (msg.includes('help') || msg.includes('सहायता') || msg.includes('can you') || msg.includes('कर सकते')) {
    return chatbotLang === 'hi'
      ? '🤔 **मैं इन चीजों में मदद कर सकता हूं:**\n\n• 🌾 "गेहूं/चावल/टमाटर कैसे उगाएं?"\n• 🔬 "पत्ती पर धब्बे - कौन सा रोग?"\n• 💊 "गेहूं के लिए सबसे अच्छा उर्वरक?"\n• 🐛 "एफिड का नियंत्रण"\n• 🌿 "जैविक खेती के तरीके"\n• 💧 "गर्मी में सिंचाई टिप्स"\n• 🏛️ "सरकारी योजनाएं"\n\nया खेती के बारे में कुछ भी पूछें!'
      : '🤔 **I can help you with:**\n\n• 🌾 "How to grow rice/wheat/tomato?"\n• 🔬 "Leaf has spots - what disease?"\n• 💊 "Best fertilizer for wheat?"\n• 🐛 "Pest control for aphids"\n• 🌿 "Organic farming methods"\n• 💧 "Irrigation tips for summer"\n• 🏛️ "Government schemes"\n\nOr just ask anything about agriculture!';
  }

  if (msg.length < 5) {
    return chatbotLang === 'hi'
      ? 'नमस्ते! 👋 मैं आपकी खेती के सवालों में मदद करने के लिए हूं। पूछें:\n\n• फसल कैसे उगाएं\n• रोग/कीट समस्या\n• उर्वरक सिफारिश\n• जैविक खेती\n• मौसम और सिंचाई\n\nक्या जानना चाहेंगे? 🌾'
      : 'Hello! 👋 Ask me about:\n\n• How to grow specific crops\n• Disease/pest problems\n• Fertilizer recommendations\n• Organic farming\n• Weather & irrigation\n\nWhat would you like to know? 🌾';
  }

  if (chatbotLang === 'hi') {
    return `आपके सवाल का जवाब: "${originalMsg}"
    
मैं आपकी मदद करना चाहता हूं। कृपया इन विषयों पर पूछें:
• 🌾 **फसल गाइड** - "गेहूं/चावल/टमाटर कैसे उगाएं?"
• 🔬 **रोग** - "पत्ती के धब्बे/झुलसा का इलाज"
• 🐛 **कीट** - "एफिड/सफेद मक्खी का नियंत्रण"
• 🧪 **उर्वरक** - "कितना यूरिया/डीएपी डालें?"
• 🌿 **जैविक खेती** - "प्राकृतिक कीट नियंत्रण"

या **रोग पहचान** में पत्ती की फोटो अपलोड करें! 📸`;
  }

  return `Thank you for your question! 🤔

I want to help you with: "${originalMsg}"

Try asking about:
• 🌾 **Crop guides** - "How to grow rice/wheat/tomato/potato?"
• 🔬 **Diseases** - "Treatment for leaf spots/blight"
• 🐛 **Pests** - "Control of aphids/whiteflies/caterpillar"
• 🧪 **Fertilizer** - "How much urea/DAP to use?"
• 🌿 **Organic farming** - "Natural pest control methods"
• 🏛️ **Government schemes** - "PM Kisan/Bima Yojana"

Or **upload a leaf photo** in Disease Detection for AI analysis! 📸`;
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;
  addChatMessage(message, 'user');
  input.value = '';
  setTimeout(() => {
    const response = getChatbotResponse(message);
    addChatMessage(response, 'bot');
  }, 500 + Math.random() * 600);
}

function addChatMessage(text, type) {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = `chat-message ${type}`;
  if (type === 'bot') {
    div.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  } else {
    div.textContent = text;
  }
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function handleChatKeyPress(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendChatMessage();
  }
}

function setChatbotLang(lang) {
  chatbotLang = lang;
  localStorage.setItem('agriscan_chat_lang', lang);
  const enBtn = document.getElementById('chatLangEn');
  const hiBtn = document.getElementById('chatLangHi');
  if (!enBtn || !hiBtn) return;
  if (lang === 'en') {
    enBtn.style.background = 'rgba(255,255,255,0.25)';
    hiBtn.style.background = 'transparent';
  } else {
    hiBtn.style.background = 'rgba(255,255,255,0.25)';
    enBtn.style.background = 'transparent';
  }
  const welcome = lang === 'hi'
    ? 'नमस्ते! 🌾 अब मैं हिंदी में जवाब दूंगा। अपनी फसल के बारे में पूछें - धान, गेहूं, टमाटर, कीट नियंत्रण, उर्वरक, या सरकारी योजनाएं।'
    : 'Hello! 🌾 Now I will reply in English. Ask me about crops, diseases, fertilizers, pests, or government schemes.';
  addChatMessage(welcome, 'bot');
}
