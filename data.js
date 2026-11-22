/* ============================================================
   data.js — بيانات اللوحة (المحطات والسلالم وألوان اللاعبين)
   الإحداثيات (x,y) بالبكسل على صورة اللوحة الأصلية (921 × 966)
   لتعديل مكان محطة: غيّري x و y فقط.
   ============================================================ */
window.NIG = window.NIG || {};

NIG.BOARD = { w: 921, h: 966, image: 'assets/board/board-original.jpg' };

/* أنواع المحطات */
NIG.TYPES = {
  info:      { label: 'معلومات',          card: true },
  challenge: { label: 'تحدي',             card: true },
  situation: { label: 'موقف',             card: true },
  history:   { label: 'تاريخ مصر',        card: true },
  geography: { label: 'جغرافيا مصر',      card: true },
  figures:   { label: 'شخصيات وطنية',     card: true },
  culture:   { label: 'الثقافة والفنون',  card: true },
  battles:   { label: 'معارك',            card: true },
  flag:      { label: 'علم مصر',          card: true },
  quiz:      { label: 'كارت من اختيارك',  card: true },
  question:  { label: 'سؤال',             card: true },
  swap:      { label: 'تبديل',            card: false },
  forward:   { label: 'تقدم',             card: false },
  back:      { label: 'ارجع',             card: false },
  start:     { label: 'البداية',          card: false },
  finish:    { label: 'النهاية',          card: false }
};

/* المحطات: رقم، نوع، x، y، (اختياري) خطوات */
NIG.STATIONS = [
  { n: 1,  t: 'info',      x: 657, y: 837 },
  { n: 2,  t: 'situation', x: 607, y: 837 },
  { n: 3,  t: 'situation', x: 537, y: 837 },
  { n: 4,  t: 'figures',   x: 475, y: 837 },
  { n: 5,  t: 'info',      x: 415, y: 837 },
  { n: 6,  t: 'situation', x: 355, y: 837 },
  { n: 7,  t: 'flag',      x: 300, y: 837 },
  { n: 8,  t: 'challenge', x: 250, y: 837 },
  { n: 9,  t: 'situation', x: 197, y: 837 },
  { n: 10, t: 'history',   x: 137, y: 837 },
  { n: 11, t: 'swap',      x: 57,  y: 805 },
  { n: 12, t: 'forward',   x: 95,  y: 670, steps: 2 },
  { n: 13, t: 'geography', x: 182, y: 690 },
  { n: 14, t: 'figures',   x: 257, y: 690 },
  { n: 15, t: 'culture',   x: 335, y: 690 },
  { n: 16, t: 'situation', x: 407, y: 690 },
  { n: 17, t: 'geography', x: 485, y: 690 },
  { n: 18, t: 'swap',      x: 555, y: 690 },
  { n: 19, t: 'history',   x: 620, y: 690 },
  { n: 20, t: 'battles',   x: 680, y: 690 },
  { n: 21, t: 'challenge', x: 735, y: 640 },
  { n: 22, t: 'culture',   x: 695, y: 555 },
  { n: 23, t: 'back',      x: 600, y: 550, steps: 2 },
  { n: 24, t: 'history',   x: 535, y: 550 },
  { n: 25, t: 'quiz',      x: 447, y: 550 },
  { n: 26, t: 'figures',   x: 370, y: 550 },
  { n: 27, t: 'situation', x: 287, y: 550 },
  { n: 28, t: 'culture',   x: 210, y: 550 },
  { n: 29, t: 'challenge', x: 137, y: 550 },
  { n: 30, t: 'geography', x: 55,  y: 530 },
  { n: 31, t: 'swap',      x: 70,  y: 405 },
  { n: 32, t: 'situation', x: 145, y: 415 },
  { n: 33, t: 'history',   x: 220, y: 415 },
  { n: 34, t: 'geography', x: 292, y: 415 },
  { n: 35, t: 'challenge', x: 367, y: 415 },
  { n: 36, t: 'question',  x: 415, y: 415 },
  { n: 37, t: 'history',   x: 472, y: 415 },
  { n: 38, t: 'situation', x: 545, y: 415 },
  { n: 39, t: 'culture',   x: 612, y: 415 },
  { n: 40, t: 'challenge', x: 695, y: 415 },
  { n: 41, t: 'forward',   x: 740, y: 410, steps: 1 },
  { n: 42, t: 'situation', x: 720, y: 280 },
  { n: 43, t: 'culture',   x: 625, y: 265 },
  { n: 44, t: 'situation', x: 537, y: 265 },
  { n: 45, t: 'figures',   x: 465, y: 265 },
  { n: 46, t: 'geography', x: 390, y: 265 },
  { n: 47, t: 'challenge', x: 310, y: 265 },
  { n: 48, t: 'situation', x: 232, y: 265 },
  { n: 49, t: 'history',   x: 152, y: 265 },
  { n: 50, t: 'finish',    x: 70,  y: 245 }   /* النهاية */
];

/* السلالم (من ← إلى).
   confirmed:true  = مكتوب بوضوح على اللوحة (اطلع السلم / أنزل السلم)
   confirmed:false = قرأتُها من رسم السلم فقط، تحتاج تأكيدك */
NIG.LADDERS = [
  { from: 3,  to: 19, confirmed: true  },  // اطلع السلم (حافظت على الكهرباء)
  { from: 6,  to: 15, confirmed: false },  // اطلع السلم (حافظوا على المياه)
  { from: 13, to: 28, confirmed: false },  // سلم بدون كتابة
  { from: 37, to: 44, confirmed: true  },  // اطلع السلم (سهم أخضر)
  { from: 38, to: 17, confirmed: false },  // أنزل السلم (نشرت إشاعة)
  { from: 42, to: 40, confirmed: false },  // أنزل السلم (رميت زبالة)
  { from: 48, to: 29, confirmed: false }   // أنزل السلم (انتقدت زميلك)
];

/* قواعد قابلة للتعديل */
NIG.RULES = {
  useLadders: true,        // تفعيل السلالم
  exactFinish: false,      // false = يفوز بمجرد الوصول أو تجاوز النهاية
  pointsCorrect: 10,       // نقاط الإجابة الصحيحة في كروت المعلومات
  stepOnCorrect: 1,        // الإجابة الصحيحة: تقدّم خطوة (حسب اللوحة)
  stepOnWrong: 1,          // الإجابة الخاطئة: ارجع خطوة (حسب اللوحة)
  cardChoices: 6           // عدد الكروت المقلوبة المعروضة للاختيار
};

/* ألوان وقطع اللاعبين */
NIG.COLORS = [
  { id: 'red',    name: 'أحمر',    hex: '#d62828' },
  { id: 'blue',   name: 'أزرق',    hex: '#1d4ed8' },
  { id: 'green',  name: 'أخضر',    hex: '#15803d' },
  { id: 'gold',   name: 'ذهبي',    hex: '#d99a06' },
  { id: 'purple', name: 'بنفسجي',  hex: '#7e22ce' },
  { id: 'black',  name: 'أسود',    hex: '#1f2937' }
];
