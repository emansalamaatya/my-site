/* cards-data.js — بيانات البطاقات والأسئلة. الإجابة الصحيحة هي الاختيار الأول في o (تُخلط أثناء اللعب).
   يمكن تعديل أي سؤال هنا؛ وفي المرحلة 7 ستتولى لوحة المعلمة ذلك. */
window.NIG=window.NIG||{};
NIG.BACKS={
 "info": "assets/cards/final/backs/info.jpg",
 "flag": "assets/cards/final/backs/flag.jpg",
 "culture": "assets/cards/final/backs/culture.jpg",
 "history": "assets/cards/final/backs/history.jpg",
 "geography": "assets/cards/final/backs/geography.jpg",
 "figures": "assets/cards/final/backs/figures.jpg",
 "battles": "assets/cards/final/backs/battles.jpg",
 "values": "assets/cards/final/backs/values.jpg",
 "challenge": "assets/cards/final/backs/challenge.jpg"
};
NIG.CARDS=[
{
"id": "battles-01",
"cat": "battles",
"img": "assets/cards/final/battles/battles-001.jpg",
"num": 1,
"q": "ما نتيجة معركة مجدو في العصر الفرعوني؟",
"o": [
"انتصار مصر وتوسيع نفوذها في الشام",
"هزيمة مصر",
"احتلال مصر",
"خروج مصر من الشام"
]
},
{
"id": "battles-02",
"cat": "battles",
"img": "assets/cards/final/battles/battles-002.jpg",
"num": 2,
"q": "ماذا نتج عن معركة قادش؟",
"o": [
"انتصار استراتيجي وتوقيع أول معاهدة سلام",
"احتلال مصر",
"اختفاء الجيش المصري",
"قيام الدولة الأيوبية"
]
},
{
"id": "battles-03",
"cat": "battles",
"img": "assets/cards/final/battles/battles-003.jpg",
"num": 3,
"q": "من كان عدو مصر في معركة عين جالوت (1260م)؟",
"o": [
"المغول",
"الهكسوس",
"الإنجليز",
"الفرنسيون"
]
},
{
"id": "battles-04",
"cat": "battles",
"img": "assets/cards/final/battles/battles-004.jpg",
"num": 4,
"q": "ماذا حققت مصر في حرب أكتوبر 1973؟",
"o": [
"عبور قناة السويس وتحقيق نصر عظيم",
"احتلال سيناء",
"هزيمة كبرى",
"التنازل عن قناة السويس"
]
},
{
"id": "battles-05",
"cat": "battles",
"img": "assets/cards/final/battles/battles-005.jpg",
"num": 5,
"q": "من الملك الذي انتصر على الهكسوس وطردهم من مصر؟",
"o": [
"الملك أحمس",
"الملك مينا",
"الملك زوسر",
"الملك أخناتون"
]
},
{
"id": "battles-06",
"cat": "battles",
"img": "assets/cards/final/battles/battles-006.jpg",
"num": 6,
"q": "من قاد جيش الفتح الإسلامي لمصر؟",
"o": [
"عمرو بن العاص",
"محمد علي",
"أحمس",
"صلاح الدين"
]
},
{
"id": "battles-07",
"cat": "battles",
"img": "assets/cards/final/battles/battles-007.jpg",
"num": 7,
"q": "ماذا حدث بعد خروج الحملة الفرنسية من مصر؟",
"o": [
"بداية نهضة محمد علي",
"بداية الاحتلال البريطاني",
"قيام الدولة الفاطمية",
"ثورة 1952"
]
},
{
"id": "battles-08",
"cat": "battles",
"img": "assets/cards/final/battles/battles-008.jpg",
"num": 8,
"q": "ما سبب العدوان الثلاثي على مصر؟",
"o": [
"تأميم قناة السويس",
"ثورة 1919",
"بناء السد العالي",
"فتح مصر"
]
},
{
"id": "battles-09",
"cat": "battles",
"img": "assets/cards/final/battles/battles-009.jpg",
"num": 9,
"q": "ماذا نتج عن معركة التل الكبير عام 1882م؟",
"o": [
"الاحتلال البريطاني لمصر",
"انتصار مصر",
"خروج الإنجليز",
"نهاية الحملة الفرنسية"
]
},
{
"id": "battles-10",
"cat": "battles",
"img": "assets/cards/final/battles/battles-010.jpg",
"num": 10,
"q": "من الملك الذي وحّد القطرين (مصر العليا والسفلى)؟",
"o": [
"الملك مينا",
"الملك رمسيس الثاني",
"الملك توت عنخ آمون",
"الملك تحتمس الثالث"
]
},
{
"id": "battles-11",
"cat": "battles",
"img": "assets/cards/final/battles/battles-011.jpg",
"num": 11,
"q": "ما سبب قيام ثورة 1919؟",
"o": [
"المطالبة بالاستقلال والحرية",
"بناء السد العالي",
"تأميم القناة",
"حرب الهكسوس"
]
},
{
"id": "battles-12",
"cat": "battles",
"img": "assets/cards/final/battles/battles-012.jpg",
"num": 12,
"q": "ما سبب حرب أكتوبر المجيدة؟",
"o": [
"استرداد الأرض والكرامة",
"اكتشاف النفط",
"بناء الأهرامات",
"تأميم قناة السويس"
]
},
{
"id": "culture-01",
"cat": "culture",
"img": "assets/cards/final/culture/culture-001.jpg",
"num": 1,
"q": "أي مما يلي من العادات الاجتماعية المصرية؟",
"o": [
"إكرام الضيف",
"إهمال الجار",
"قطع صلة الرحم",
"عدم احترام الكبير"
]
},
{
"id": "culture-02",
"cat": "culture",
"img": "assets/cards/final/culture/culture-002.jpg",
"num": 2,
"q": "أي مما يلي من تقاليد المصريين في الأعياد؟",
"o": [
"توزيع الحلويات وزيارة الأقارب",
"البقاء وحدنا في البيت",
"تجاهل الأقارب",
"إلغاء الاحتفال"
]
},
{
"id": "culture-03",
"cat": "culture",
"img": "assets/cards/final/culture/culture-003.jpg",
"num": 3,
"q": "أي فن شعبي يُمارس في الصعيد؟",
"o": [
"التحطيب",
"الباليه",
"الأوبرا",
"الجاز"
]
},
{
"id": "culture-05",
"cat": "culture",
"img": "assets/cards/final/culture/culture-005.jpg",
"num": 5,
"q": "أي مما يلي من التراث غير المادي؟",
"o": [
"الحكايات الشعبية والأمثال والأغاني التراثية",
"الأهرامات",
"المتحف المصري",
"القلعة"
]
},
{
"id": "culture-06",
"cat": "culture",
"img": "assets/cards/final/culture/culture-006.jpg",
"num": 6,
"q": "ما اللغة التي توحّد الشعب المصري وتُستخدم في التعليم والإعلام والأدب؟",
"o": [
"اللغة العربية",
"الهيروغليفية",
"الفرنسية",
"القبطية القديمة فقط"
]
},
{
"id": "culture-07",
"cat": "culture",
"img": "assets/cards/final/culture/culture-007.jpg",
"num": 7,
"q": "أي مما يلي من الأكلات الشعبية المصرية؟",
"o": [
"الكشري",
"السوشي",
"البيتزا",
"الهامبورجر"
]
},
{
"id": "culture-09",
"cat": "culture",
"img": "assets/cards/final/culture/culture-009.jpg",
"num": 9,
"q": "أكمل المثل: «الصبر مفتاح ...»",
"o": [
"الفرج",
"الغنى",
"السفر",
"الحرب"
]
},
{
"id": "culture-10",
"cat": "culture",
"img": "assets/cards/final/culture/culture-010.jpg",
"num": 10,
"q": "ماذا تعبّر الموسيقى والغناء عنه؟",
"o": [
"مشاعر الناس وتاريخهم",
"الأرقام الحسابية فقط",
"حالة الطقس",
"أسعار السلع"
]
},
{
"id": "culture-11",
"cat": "culture",
"img": "assets/cards/final/culture/culture-011.jpg",
"num": 11,
"q": "ماذا يعرض المسرح؟",
"o": [
"قصص المجتمع ومشكلاته بطريقة فنية",
"نتائج الامتحانات",
"أخبار الطقس",
"أسعار السوق"
]
},
{
"id": "figures-01",
"cat": "figures",
"img": "assets/cards/final/figures/figures-001.jpg",
"num": 1,
"q": "من هو أول رئيس لجمهورية مصر؟",
"o": [
"محمد نجيب",
"جمال عبد الناصر",
"أنور السادات",
"سعد زغلول"
]
},
{
"id": "figures-02",
"cat": "figures",
"img": "assets/cards/final/figures/figures-002.jpg",
"num": 2,
"q": "من قائد ثورة يوليو الذي أمّم قناة السويس وبنى السد العالي؟",
"o": [
"جمال عبد الناصر",
"أنور السادات",
"محمد نجيب",
"أحمد عرابي"
]
},
{
"id": "figures-03",
"cat": "figures",
"img": "assets/cards/final/figures/figures-003.jpg",
"num": 3,
"q": "من الرئيس الذي قاد حرب أكتوبر واستعاد أرض سيناء؟",
"o": [
"أنور السادات",
"جمال عبد الناصر",
"محمد فريد",
"طلعت حرب"
]
},
{
"id": "figures-05",
"cat": "figures",
"img": "assets/cards/final/figures/figures-005.jpg",
"num": 5,
"q": "من قائد ثورة 1919 الذي قاد الشعب للمطالبة بالاستقلال؟",
"o": [
"سعد زغلول",
"أحمد عرابي",
"محمد نجيب",
"طلعت حرب"
]
},
{
"id": "figures-06",
"cat": "figures",
"img": "assets/cards/final/figures/figures-006.jpg",
"num": 6,
"q": "من مؤسس بنك مصر والاقتصادي الذي دعم الاقتصاد الوطني؟",
"o": [
"طلعت حرب",
"أحمد زويل",
"مجدي يعقوب",
"محمد فريد"
]
},
{
"id": "figures-07",
"cat": "figures",
"img": "assets/cards/final/figures/figures-007.jpg",
"num": 7,
"q": "من العالم المصري الحاصل على جائزة نوبل لاكتشافه الفيمتوثانية؟",
"o": [
"أحمد زويل",
"مجدي يعقوب",
"طلعت حرب",
"سعد زغلول"
]
},
{
"id": "figures-08",
"cat": "figures",
"img": "assets/cards/final/figures/figures-008.jpg",
"num": 8,
"q": "من جراح القلب العالمي الذي أنشأ مركزًا لعلاج المرضى مجانًا؟",
"o": [
"مجدي يعقوب",
"أحمد زويل",
"عبد المنعم رياض",
"محمد نجيب"
]
},
{
"id": "figures-11",
"cat": "figures",
"img": "assets/cards/final/figures/figures-011.jpg",
"num": 11,
"q": "من الزعيم الذي استكمل مسيرة مصطفى كامل؟",
"o": [
"محمد فريد",
"سعد زغلول",
"أنور السادات",
"جمال عبد الناصر"
]
},
{
"id": "figures-12",
"cat": "figures",
"img": "assets/cards/final/figures/figures-012.jpg",
"num": 12,
"q": "من القائد العسكري الذي استشهد أثناء حرب الاستنزاف؟",
"o": [
"عبد المنعم رياض",
"أحمد عرابي",
"محمد نجيب",
"طلعت حرب"
]
},
{
"id": "figures-13",
"cat": "figures",
"img": "assets/cards/final/figures/figures-013.jpg",
"num": 13,
"q": "من قائد الثورة العرابية المطالِبة بالعدل والمساواة؟",
"o": [
"أحمد عرابي",
"سعد زغلول",
"محمد فريد",
"محمد نجيب"
]
},
{
"id": "flag-01",
"cat": "flag",
"img": "assets/cards/final/flag/flag-001.jpg",
"num": 1,
"q": "ماذا يرمز اللون الأبيض في علم مصر؟",
"o": [
"السلام",
"التضحيات",
"نهاية الظلم",
"الخير"
]
},
{
"id": "flag-02",
"cat": "flag",
"img": "assets/cards/final/flag/flag-002.jpg",
"num": 2,
"q": "أي سلوك يعبّر عن احترام علم مصر؟",
"o": [
"الوقوف باحترام أثناء النشيد الوطني",
"رمي العلم على الأرض",
"استخدام العلم بطريقة مسيئة",
"تجاهل العلم عند رفعه"
]
},
{
"id": "geography-01",
"cat": "geography",
"img": "assets/cards/final/geography/geography-001.jpg",
"num": 1,
"q": "كيف يؤثر موقع مصر الاستراتيجي على علاقتها بالعالم؟",
"o": [
"جعلها على تواصل دائم مع حضارات مختلفة",
"عزلها عن العالم",
"جعلها بعيدة عن القارات الأخرى",
"منع التجارة معها"
]
},
{
"id": "geography-02",
"cat": "geography",
"img": "assets/cards/final/geography/geography-002.jpg",
"num": 2,
"q": "لماذا ارتبطت حياة المصريين بنهر النيل منذ القدم؟",
"o": [
"لأنه المصدر الأساسي للمياه والزراعة",
"لأنه يقع في الصحراء",
"لأنه لا يصلح للزراعة",
"لأنه مجرد بحيرة صغيرة"
]
},
{
"id": "geography-03",
"cat": "geography",
"img": "assets/cards/final/geography/geography-003.jpg",
"num": 3,
"q": "لماذا يتركز السكان في وادي النيل والدلتا؟",
"o": [
"لتوفر المياه والأراضي الزراعية",
"لأنها صحراء جافة",
"لعدم وجود مدن بها",
"لبعدها عن المياه"
]
},
{
"id": "geography-06",
"cat": "geography",
"img": "assets/cards/final/geography/geography-006.jpg",
"num": 6,
"q": "ما أهمية البحر المتوسط لمصر؟",
"o": [
"يربطها بدول أوروبا ويجعلها منفتحة تجاريًا وثقافيًا",
"يفصلها عن أوروبا",
"يقع جنوب مصر",
"لا أهمية له"
]
},
{
"id": "geography-08",
"cat": "geography",
"img": "assets/cards/final/geography/geography-008.jpg",
"num": 8,
"q": "لماذا تعتبر قناة السويس مهمة للعالم؟",
"o": [
"لأنها ممر مائي يربط البحرين الأحمر والمتوسط",
"لأنها تربط النيل بالبحر الأحمر",
"لأنها بحيرة للسياحة فقط",
"لأنها تقع في الصحراء الغربية"
]
},
{
"id": "geography-09",
"cat": "geography",
"img": "assets/cards/final/geography/geography-009.jpg",
"num": 9,
"q": "لماذا يُعتبر البحر الأحمر مهمًا للسياحة؟",
"o": [
"لشعابه المرجانية وثرواته البحرية",
"لأنه لا يوجد به أسماك",
"لأنه بعيد عن مصر",
"لأنه نهر عذب"
]
},
{
"id": "history-01",
"cat": "history",
"img": "assets/cards/final/history/history-001.jpg",
"num": 1,
"q": "ما الكتابة التي ظهرت في الحضارة المصرية القديمة؟",
"o": [
"الهيروغليفية",
"المسمارية",
"اللاتينية",
"الصينية"
]
},
{
"id": "history-02",
"cat": "history",
"img": "assets/cards/final/history/history-002.jpg",
"num": 2,
"q": "لماذا يُعد نهر النيل شريان الحياة في مصر؟",
"o": [
"لأن الزراعة والحياة قامت على مياهه",
"لأنه يحيط بمصر من كل الجهات",
"لأنه بحر مالح",
"لأنه يقع في الصحراء الغربية"
]
},
{
"id": "history-03",
"cat": "history",
"img": "assets/cards/final/history/history-003.jpg",
"num": 3,
"q": "تحت حكم من دخلت مصر في العصور المتأخرة؟",
"o": [
"الإسكندر الأكبر والرومان",
"الهكسوس والحيثيين",
"المغول والتتار",
"الفرس فقط"
]
},
{
"id": "history-04",
"cat": "history",
"img": "assets/cards/final/history/history-004.jpg",
"num": 4,
"q": "ماذا انتشر في العصر القبطي؟",
"o": [
"الفن القبطي وبناء الكنائس واللغة القبطية",
"بناء الأهرام",
"بناء القلعة",
"بناء الأزهر"
]
},
{
"id": "history-05",
"cat": "history",
"img": "assets/cards/final/history/history-005.jpg",
"num": 5,
"q": "في أي عام دخل الإسلام مصر؟",
"o": [
"641م",
"1952م",
"1973م",
"332 ق.م"
]
},
{
"id": "history-06",
"cat": "history",
"img": "assets/cards/final/history/history-006.jpg",
"num": 6,
"q": "أي من هذه المعالم شاهد على عمران العصر الفاطمي والأيوبي والمملوكي؟",
"o": [
"الأزهر والقلعة",
"أبو سمبل",
"الهرم الأكبر",
"السد العالي"
]
},
{
"id": "history-07",
"cat": "history",
"img": "assets/cards/final/history/history-007.jpg",
"num": 7,
"q": "من الذي أسّس مصر الحديثة وبنى جيشًا قويًا ومصانع ومدارس؟",
"o": [
"محمد علي باشا",
"أحمس الأول",
"سعد زغلول",
"محمد نجيب"
]
},
{
"id": "history-08",
"cat": "history",
"img": "assets/cards/final/history/history-008.jpg",
"num": 8,
"q": "ضد من قامت ثورة 1919؟",
"o": [
"الاحتلال البريطاني",
"الحيثيين",
"المغول",
"الفرنسيين"
]
},
{
"id": "history-09",
"cat": "history",
"img": "assets/cards/final/history/history-009.jpg",
"num": 9,
"q": "ماذا أعلنت ثورة 1952؟",
"o": [
"إنهاء الملكية وإعلان الجمهورية",
"بناء الهرم الأكبر",
"حفر قناة السويس",
"إنشاء بنك مصر"
]
},
{
"id": "history-10",
"cat": "history",
"img": "assets/cards/final/history/history-010.jpg",
"num": 10,
"q": "ماذا استعادت مصر في حرب أكتوبر 1973؟",
"o": [
"أرضها في سيناء",
"قناة السويس من الفرنسيين",
"الإسكندرية",
"النوبة"
]
},
{
"id": "history-11",
"cat": "history",
"img": "assets/cards/final/history/history-011.jpg",
"num": 11,
"q": "بين أي قارات كانت مصر مركزًا للتجارة؟",
"o": [
"أفريقيا وآسيا وأوروبا",
"أمريكا وأستراليا",
"أنتاركتيكا وآسيا",
"أمريكا وأوروبا فقط"
]
},
{
"id": "history-12",
"cat": "history",
"img": "assets/cards/final/history/history-012.jpg",
"num": 12,
"q": "أي مما يلي من مشروعات مصر في عهد التطوير الحديث؟",
"o": [
"الطرق الجديدة والمدن الحديثة",
"بناء الأهرامات",
"بناء القلعة",
"حفر قناة السويس القديمة"
]
},
{
"id": "info-01",
"cat": "info",
"img": "assets/cards/final/info/info-001.jpg",
"num": 1,
"q": "أي مما يلي يُعد من عناصر الهوية الوطنية؟",
"o": [
"التاريخ المشترك والثقافة واللغة والقيم",
"الملابس الأجنبية فقط",
"الألعاب الإلكترونية",
"الموضة المنتشرة بين الناس"
]
},
{
"id": "info-02",
"cat": "info",
"img": "assets/cards/final/info/info-002.jpg",
"num": 2,
"q": "أي مما يلي من أضرار فقدان الهوية الوطنية؟",
"o": [
"ضعف الانتماء للوطن وتشتت المجتمع",
"زيادة حب الوطن",
"قوة الترابط بين الناس",
"الحفاظ على التراث"
]
},
{
"id": "info-03",
"cat": "info",
"img": "assets/cards/final/info/info-003.jpg",
"num": 3,
"q": "أي مما يلي من فوائد الهوية الوطنية؟",
"o": [
"تقوّي الانتماء وحب الوطن وتوحّد الشعب على قيم واحدة",
"تجعلنا ننسى تاريخنا",
"تقلل الاهتمام بالتراث",
"تفرّق الناس بعضهم عن بعض"
]
},
{
"id": "pharaohs-01",
"cat": "pharaohs",
"img": "assets/cards/final/figures/figures-101.jpg",
"num": 1,
"q": "من الملك الذي قاد معركة قادش وبنى معبد أبو سمبل؟",
"o": [
"رمسيس الثاني",
"أحمس الأول",
"زوسر",
"توت عنخ آمون"
]
},
{
"id": "pharaohs-02",
"cat": "pharaohs",
"img": "assets/cards/final/figures/figures-102.jpg",
"num": 2,
"q": "من الملك مؤسس الدولة الحديثة الذي طرد الهكسوس؟",
"o": [
"أحمس الأول",
"رمسيس الثاني",
"آخناتون",
"زوسر"
]
},
{
"id": "pharaohs-03",
"cat": "pharaohs",
"img": "assets/cards/final/figures/figures-103.jpg",
"num": 3,
"q": "من أحد أعظم القادة العسكريين الذي وسّع حدود مصر؟",
"o": [
"تحتمس الثالث",
"توت عنخ آمون",
"نفرتيتي",
"زوسر"
]
},
{
"id": "pharaohs-06",
"cat": "pharaohs",
"img": "assets/cards/final/figures/figures-106.jpg",
"num": 6,
"q": "من الملك الشاب الذي اشتهر بمقبرته؟",
"o": [
"توت عنخ آمون",
"رمسيس الثاني",
"تحتمس الثالث",
"أحمس الأول"
]
},
{
"id": "pharaohs-07",
"cat": "pharaohs",
"img": "assets/cards/final/figures/figures-107.jpg",
"num": 7,
"q": "من الملك العظيم الذي ازدهر الفن والعمارة في عهد السلام الذي حكمه؟",
"o": [
"إمنحتب الثالث",
"أحمس الأول",
"زوسر",
"توت عنخ آمون"
]
},
{
"id": "pharaohs-08",
"cat": "pharaohs",
"img": "assets/cards/final/figures/figures-108.jpg",
"num": 8,
"q": "من الملك الذي بنى أول هرم مدرّج في سقارة؟",
"o": [
"زوسر",
"رمسيس الثاني",
"إمنحتب الثالث",
"آخناتون"
]
},
{
"id": "pharaohs-09",
"cat": "pharaohs",
"img": "assets/cards/final/figures/figures-109.jpg",
"num": 9,
"q": "من الملك الذي دعا إلى عبادة إله واحد؟",
"o": [
"آخناتون",
"رمسيس الثاني",
"تحتمس الثالث",
"زوسر"
]
},
{
"id": "pharaohs-10",
"cat": "pharaohs",
"img": "assets/cards/final/figures/figures-110.jpg",
"num": 10,
"q": "من زوجة الملك آخناتون؟",
"o": [
"نفرتيتي",
"أحمس",
"سعد زغلول",
"تحتمس"
]
},
{
"id": "values-01",
"cat": "values",
"img": "assets/cards/final/values/values-001.jpg",
"num": 1,
"q": "تشاهد شخصًا يرمي القمامة في الشارع أمام المدرسة. ماذا ستفعل؟",
"o": [
"أنصحه بلطف بوضعها في سلة المهملات",
"أتجاهله وأمشي",
"أرمي معه القمامة",
"أسخر منه"
]
},
{
"id": "values-02",
"cat": "values",
"img": "assets/cards/final/values/values-002.jpg",
"num": 2,
"q": "زميلك لا يستطيع حل واجب الرياضيات. كيف تتصرف؟",
"o": [
"أساعده على فهم الحل",
"أتركه وأذهب",
"أسخر منه",
"أعطيه الحل ليكتبه دون فهم"
]
},
{
"id": "values-03",
"cat": "values",
"img": "assets/cards/final/values/values-003.jpg",
"num": 3,
"q": "طالب يختلف معك في الرأي داخل الفصل. ماذا تفعل؟",
"o": [
"أحترم رأيه وأناقشه بهدوء",
"أتشاجر معه",
"أسخر من رأيه",
"أتجاهله دائمًا"
]
},
{
"id": "values-04",
"cat": "values",
"img": "assets/cards/final/values/values-004.jpg",
"num": 4,
"q": "درس صعب وتشعر بالملل من المذاكرة. كيف تتصرف؟",
"o": [
"أستمر وأطلب المساعدة وأقسّم المذاكرة",
"أترك الدراسة",
"أغش في الامتحان",
"أنام وأتجاهل الدرس"
]
},
{
"id": "values-05",
"cat": "values",
"img": "assets/cards/final/values/values-005.jpg",
"num": 5,
"q": "وجدت نقودًا في فناء المدرسة. ماذا ستفعل؟",
"o": [
"أسلّمها للمعلم أو إدارة المدرسة",
"آخذها لنفسي",
"أخفيها عن الجميع",
"أنفقها مع أصدقائي"
]
},
{
"id": "values-06",
"cat": "values",
"img": "assets/cards/final/values/values-006.jpg",
"num": 6,
"q": "وجدت مقعدًا مكسورًا في المدرسة. كيف تتصرف؟",
"o": [
"أبلّغ المعلم أو الإدارة ليتم إصلاحه",
"أكسره أكثر",
"أتجاهله",
"أكتب عليه"
]
},
{
"id": "values-07",
"cat": "values",
"img": "assets/cards/final/values/values-007.jpg",
"num": 7,
"q": "لديك امتحان قريب. ماذا ستفعل للاستعداد؟",
"o": [
"أنظّم وقتي وأذاكر كل يوم",
"أنتظر آخر ليلة",
"أعتمد على الغش",
"لا أذاكر"
]
},
{
"id": "values-08",
"cat": "values",
"img": "assets/cards/final/values/values-008.jpg",
"num": 8,
"q": "طفل يلمس الآثار في المتحف. كيف تتصرف؟",
"o": [
"أنصحه بلطف بعدم لمسها للحفاظ عليها",
"ألمسها معه",
"أتجاهله",
"أضحك عليه"
]
},
{
"id": "values-09",
"cat": "values",
"img": "assets/cards/final/values/values-009.jpg",
"num": 9,
"q": "ترى زميلًا يتعرض للظلم. ماذا تفعل؟",
"o": [
"أدافع عنه وأبلّغ المعلم",
"أتجاهل الموقف",
"أشارك في إيذائه",
"أضحك مع الآخرين"
]
},
{
"id": "values-10",
"cat": "values",
"img": "assets/cards/final/values/values-010.jpg",
"num": 10,
"q": "انتهيت من تناول الطعام في الفصل. ماذا تفعل بعد ذلك؟",
"o": [
"أضع المخلفات في سلة المهملات",
"أتركها على الأرض",
"أرميها من النافذة",
"أترك الأمر لغيري"
]
},
{
"id": "values-11",
"cat": "values",
"img": "assets/cards/final/values/values-011.jpg",
"num": 11,
"q": "في مشروع مدرسي، كل واحد يريد العمل وحده. كيف تتعامل مع الموقف؟",
"o": [
"أقترح تقسيم المهام والعمل معًا كفريق",
"أعمل وحدي وأتجاهلهم",
"أترك المشروع",
"أنتقد الجميع"
]
},
{
"id": "values-12",
"cat": "values",
"img": "assets/cards/final/values/values-012.jpg",
"num": 12,
"q": "المعلم يشرح الدرس. كيف تتصرف أثناء الشرح؟",
"o": [
"أنصت وأرفع يدي إن أردت السؤال",
"أتكلم مع زميلي",
"ألعب بالهاتف",
"أقاطع المعلم"
]
},
{
"id": "values-13",
"cat": "values",
"img": "assets/cards/final/values/values-013.jpg",
"num": 13,
"q": "نسيت حل سؤال في الامتحان وطلب منك زميلك أن تنقل منه. ماذا ستفعل؟",
"o": [
"أرفض الغش وأجيب بما أعرفه بصدق",
"أنقل منه",
"أطلب منه الإجابة كلها",
"أمزق الورقة"
]
},
{
"id": "values-14",
"cat": "values",
"img": "assets/cards/final/values/values-014.jpg",
"num": 14,
"q": "ترى شخصًا يعبر الطريق من مكان غير مخصص للمشاة. كيف تتصرف؟",
"o": [
"أنصحه بلطف باستخدام مكان عبور المشاة",
"أعبر معه",
"أتجاهل الأمر",
"أضحك عليه"
]
},
{
"id": "values-15",
"cat": "values",
"img": "assets/cards/final/values/values-015.jpg",
"num": 15,
"q": "تجد أشخاصًا يلقون القمامة في نهر النيل. ماذا تفعل؟",
"o": [
"أنصحهم بعدم تلويث النيل وأبلّغ المسؤولين عند الحاجة",
"أرمي معهم",
"أتجاهلهم",
"أصوّرهم وأضحك"
]
},
{
"id": "values-16",
"cat": "values",
"img": "assets/cards/final/values/values-016.jpg",
"num": 16,
"q": "كبير في السن يحتاج المساعدة في حمل أشياء ثقيلة. ماذا ستفعل؟",
"o": [
"أساعده بأدب",
"أتجاهله",
"أضحك عليه",
"أنتظر أحدًا آخر"
]
},
{
"id": "values-17",
"cat": "values",
"img": "assets/cards/final/values/values-017.jpg",
"num": 17,
"q": "زميلك أزعجك في الفصل عمدًا. كيف تتصرف؟",
"o": [
"أحافظ على هدوئي وأخبر المعلم عند الحاجة",
"أضربه",
"أصرخ عليه",
"أنتقم منه"
]
},
{
"id": "values-18",
"cat": "values",
"img": "assets/cards/final/values/values-018.jpg",
"num": 18,
"q": "عندك موعد مدرسي مهم لكنك متأخر. ماذا ستفعل؟",
"o": [
"أتوجه فورًا وأعتذر بأدب وأنظّم وقتي لأتجنب التأخر",
"أتجاهل الموعد",
"أختلق عذرًا كاذبًا",
"أعود إلى البيت"
]
},
{
"id": "values-19",
"cat": "values",
"img": "assets/cards/final/values/values-019.jpg",
"num": 19,
"q": "هناك حملة لتنظيف المدرسة. هل ستشارك؟ وكيف؟",
"o": [
"أشارك بحماس وأتعاون مع زملائي",
"أبتعد عنها",
"أنتظر حتى ينتهي الآخرون",
"أسخر من الحملة"
]
},
{
"id": "values-20",
"cat": "values",
"img": "assets/cards/final/values/values-020.jpg",
"num": 20,
"q": "عندك مشروع مدرسي وتريد فكرة جديدة. ماذا ستفعل؟",
"o": [
"أفكر في فكرة مبتكرة وأطبقها بجهدي",
"أنسخ فكرة زميلي",
"أترك المشروع",
"أطلب من غيري عمله"
]
},
{
"id": "values-21",
"cat": "values",
"img": "assets/cards/final/values/values-021.jpg",
"num": 21,
"q": "زميلك نسي أدواته المدرسية. كيف تتعامل مع الموقف؟",
"o": [
"أشاركه أدواتي",
"أرفض مساعدته",
"أضحك عليه",
"أخفي أدواته"
]
},
{
"id": "values-22",
"cat": "values",
"img": "assets/cards/final/values/values-022.jpg",
"num": 22,
"q": "لديك وقت فراغ بعد المدرسة. ماذا ستفعل بهذا الوقت؟",
"o": [
"أقرأ كتابًا مفيدًا",
"أضيّعه كله في اللعب",
"أنام طوال اليوم",
"أتجاهل كل شيء"
]
},
{
"id": "values-23",
"cat": "values",
"img": "assets/cards/final/values/values-023.jpg",
"num": 23,
"q": "ترى عامل نظافة في الشارع. كيف ستتعامل معه؟",
"o": [
"أحييه وأشكره وأحترم عمله",
"أتجاهله",
"أسخر من عمله",
"أرمي القمامة أمامه"
]
},
{
"id": "values-24",
"cat": "values",
"img": "assets/cards/final/values/values-024.jpg",
"num": 24,
"q": "تجد أحد الأطفال يخرّب مقعدًا في الحديقة. ماذا تفعل؟",
"o": [
"أنصحه بأن المقاعد ملك للجميع ويجب الحفاظ عليها",
"أخرّب معه",
"أتجاهله",
"أصوّره وأضحك"
]
},
{
"id": "challenge-belong-2",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1012.jpg",
"kind": "open",
"title": "قوة الانتماء",
"task": "لو كنت سفيرًا لمصر، ماذا ستقول للعالم عنها في جملة واحدة؟ (في 30 ثانية)",
"pts": 20,
"back": 5,
"sec": 30,
"num": "belong-2"
},
{
"id": "challenge-create-1",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1003.jpg",
"kind": "open",
"title": "تحدي الإبداع",
"task": "ارسم علم مصر في 30 ثانية",
"pts": 20,
"back": 1,
"sec": 30,
"draw": true,
"num": "create-1"
},
{
"id": "challenge-create-2",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1006.jpg",
"kind": "open",
"title": "تحدي الإبداع",
"task": "اكتب رسالة قصيرة لعلم مصر",
"pts": 20,
"back": 1,
"sec": 60,
"num": "create-2"
},
{
"id": "challenge-create-3",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1007.jpg",
"kind": "open",
"title": "تحدي الإبداع",
"task": "مثّل مشهدًا يوضح احترام العلم",
"pts": 20,
"back": 1,
"sec": 60,
"num": "create-3"
},
{
"id": "challenge-create-4",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1008.jpg",
"kind": "open",
"title": "تحدي الإبداع",
"task": "ابتكر شعارًا يعبّر عن حب الوطن",
"pts": 20,
"back": 1,
"sec": 60,
"num": "create-4"
},
{
"id": "challenge-fill-1",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1001.jpg",
"kind": "mcq",
"title": "تحدي أكمل الجملة",
"task": "علم مصر يتكون من ... ألوان",
"pts": 10,
"back": 1,
"sec": 0,
"o": [
"ثلاثة",
"اثنين",
"أربعة",
"خمسة"
],
"num": "fill-1"
},
{
"id": "challenge-fill-2",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1009.jpg",
"kind": "mcq",
"title": "تحدي أكمل الجملة",
"task": "اللون الأحمر يرمز إلى ...",
"pts": 10,
"back": 1,
"sec": 0,
"o": [
"التضحيات",
"السلام",
"العلم",
"الشجاعة فقط"
],
"num": "fill-2"
},
{
"id": "challenge-fill-5",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1002.jpg",
"kind": "mcq",
"title": "تحدي أكمل الجملة",
"task": "في وسط العلم يوجد ...",
"pts": 10,
"back": 1,
"sec": 0,
"o": [
"النسر",
"الهرم",
"الهلال",
"النجمة"
],
"num": "fill-5"
},
{
"id": "challenge-hero-5",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1015.jpg",
"kind": "open",
"title": "خطر الاختفاء",
"task": "سؤال تفكير: كيف تحمي نفسك من تقليد الثقافات بشكل خاطئ؟ (في 30 ثانية)",
"pts": 20,
"back": 1,
"sec": 30,
"swap": true,
"num": "hero-5"
},
{
"id": "challenge-hero-7",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1017.jpg",
"kind": "mcq",
"title": "تحدي البطل",
"task": "إذا واجهت شخصًا يقلل من تاريخ بلدك... ماذا تفعل؟",
"pts": 20,
"back": 2,
"sec": 0,
"o": [
"أرد بمعلومة صحيحة",
"أسكت",
"أقلّد الآخرين",
"أتجاهله وأسخر منه"
],
"num": "hero-7"
},
{
"id": "challenge-know-2",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1026.jpg",
"kind": "mcq",
"title": "تحدي المعرفة",
"task": "ماذا يرمز اللون الأحمر في العلم؟",
"pts": 10,
"back": 1,
"sec": 0,
"o": [
"التضحيات",
"السلام",
"نهاية الظلم",
"الخير"
],
"num": "know-2"
},
{
"id": "challenge-know-3",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1027.jpg",
"kind": "mcq",
"title": "تحدي المعرفة",
"task": "ماذا يرمز اللون الأبيض في العلم؟",
"pts": 10,
"back": 1,
"sec": 0,
"o": [
"السلام",
"التضحيات",
"نهاية الظلم",
"القوة"
],
"num": "know-3"
},
{
"id": "challenge-know-4",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1023.jpg",
"kind": "mcq",
"title": "تحدي المعرفة",
"task": "ماذا يرمز اللون الأسود في العلم؟",
"pts": 10,
"back": 1,
"sec": 0,
"o": [
"نهاية الظلم",
"السلام",
"التضحيات",
"الخير"
],
"num": "know-4"
},
{
"id": "challenge-know-6",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1024.jpg",
"kind": "mcq",
"title": "تحدي المعرفة",
"task": "ما اسم النسر الموجود في العلم؟",
"pts": 10,
"back": 1,
"sec": 0,
"o": [
"نسر صلاح الدين",
"نسر الأهرام",
"نسر النيل",
"نسر الجيزة"
],
"num": "know-6"
},
{
"id": "challenge-know-7",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1025.jpg",
"kind": "mcq",
"title": "تحدي المعرفة",
"task": "النسر يرتبط بأي قائد تاريخي؟",
"pts": 10,
"back": 1,
"sec": 0,
"o": [
"صلاح الدين الأيوبي",
"رمسيس الثاني",
"محمد علي",
"سعد زغلول"
],
"num": "know-7"
},
{
"id": "challenge-life-4",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1014.jpg",
"kind": "open",
"title": "الهوية في حياتك",
"task": "تحدٍّ جماعي: في 30 ثانية اذكروا 3 كلمات مصرية شعبية تستخدمونها في حياتكم اليومية",
"pts": 20,
"back": 1,
"sec": 30,
"num": "life-4"
},
{
"id": "challenge-message-8",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1018.jpg",
"kind": "open",
"title": "رسالة البطل الحقيقي",
"task": "اكتب شعارك الخاص في 30 ثانية",
"pts": 20,
"back": 3,
"sec": 30,
"num": "message-8"
},
{
"id": "challenge-speed-1",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1020.jpg",
"kind": "open",
"title": "تحدي السرعة",
"task": "اذكر 3 أشياء تعبّر عن احترام العلم",
"pts": 10,
"back": 1,
"sec": 30,
"num": "speed-1"
},
{
"id": "challenge-speed-2",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1028.jpg",
"kind": "open",
"title": "تحدي السرعة",
"task": "قل جملة تعبّر عن حبك لمصر",
"pts": 10,
"back": 1,
"sec": 15,
"num": "speed-2"
},
{
"id": "challenge-speed-3",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1021.jpg",
"kind": "open",
"title": "تحدي السرعة",
"task": "اذكر موقفًا نحترم فيه العلم",
"pts": 10,
"back": 1,
"sec": 20,
"num": "speed-3"
},
{
"id": "challenge-speed-4",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1022.jpg",
"kind": "open",
"title": "تحدي السرعة",
"task": "ماذا تفعل إذا رأيت شخصًا يهين العلم؟",
"pts": 10,
"back": 1,
"sec": 20,
"num": "speed-4"
},
{
"id": "challenge-tech-6",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1016.jpg",
"kind": "open",
"title": "التكنولوجيا: بطل أم خطر؟",
"task": "مهمة: اقترح فكرة فيديو قصير تعرّف فيه الناس على مصر",
"pts": 20,
"back": 1,
"sec": 60,
"num": "tech-6"
},
{
"id": "challenge-think-1",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1004.jpg",
"kind": "open",
"title": "تحدي التفكير",
"task": "لماذا يجب علينا احترام العلم؟",
"pts": 15,
"back": 1,
"sec": 45,
"num": "think-1"
},
{
"id": "challenge-think-3",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1005.jpg",
"kind": "open",
"title": "تحدي التفكير",
"task": "كيف تعبّر عن حبك لمصر بدون كلام؟",
"pts": 15,
"back": 1,
"sec": 45,
"num": "think-3"
},
{
"id": "challenge-treasure-3",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1013.jpg",
"kind": "mcq",
"title": "كنوز لا تختفي (لغز)",
"task": "ما الشيء الذي لا يستطيع أحد بناءه مثل المصري القديم؟",
"pts": 20,
"back": 1,
"sec": 0,
"o": [
"الأهرامات",
"ناطحات السحاب",
"السفن الحديثة",
"القطارات"
],
"swap": true,
"num": "treasure-3"
},
{
"id": "challenge-who-1",
"cat": "challenge",
"img": "assets/cards/final/challenge/challenge-1011.jpg",
"kind": "open",
"title": "من أنت؟ (اكتشف هويتك)",
"task": "اكتب في 5 ثوانٍ: كلمة واحدة تعبّر عن مصر بالنسبة لك!",
"pts": 20,
"back": 1,
"sec": 5,
"swap": true,
"num": "who-1"
}
];
