// 用 BASE_URL 前綴路徑 — GH Pages /clipy-clone/ 自動處理
const B = import.meta.env.BASE_URL;

export const img = (name) => `${B}images/${name}`;

export const PLATFORMS = [
  { code: 'YT', label: 'YOUTUBE' },
  { code: 'TT', label: 'TIKTOK' },
  { code: 'IG', label: 'INSTAGRAM' },
  { code: 'XH', label: '小紅書' },
  { code: 'FB', label: 'FACEBOOK' },
  { code: 'X',  label: 'TWITTER/X' },
  { code: 'TH', label: 'THREADS' },
  { code: 'SH', label: 'SHORTS' },
  { code: 'RE', label: 'REELS' },
];

export const REGIONS = [
  '香港', '台灣', '中國內地', '新加坡', '馬來西亞',
  '泰國', '菲律賓', '韓國', '日本', '全球',
];

export const SLIDES = [
  {
    key: 'creator',
    eyebrow: 'UGC 接案平台 · 創意換收入',
    titleLines: ['單支最高', { gold: 'US$900' }, '不問粉絲數'],
    subtitle: '不問粉絲數、訂閱數。只要你的影片有真實觀看，就有機會拿到平台級獎金。',
    img: img('hero-1.jpg'),
    imgAlt: '創作者自拍影片',
    role: 'creator',
  },
  {
    key: 'brand',
    eyebrow: '品牌方專區 · 高效 UGC 行銷',
    titleLines: ['海量真實創作者', { gold: '按效果付費' }],
    subtitle: '3000+ 中文創作者覆蓋 9 大平台。每支影片以真實觀看數結算，告別一次性買斷。',
    img: img('hero-3.jpg'),
    imgAlt: '品牌合作開箱',
    role: 'brand',
  },
  {
    key: 'studio',
    eyebrow: 'AI 輔助創作',
    titleLines: ['AI 腳本生成器', { gold: '一鍵產出 Hook' }],
    subtitle: '從 Hook 到 CTA，AI 為你寫好腳本框架。專注拍攝，剩下交給 Clipy。',
    img: img('hero-2.png'),
    imgAlt: 'AI 創作工作室',
    role: 'creator',
  },
];

export const TIERS = [
  { views: 10000,  label: '10K',   payout: 8  },
  { views: 30000,  label: '30K',   payout: 18 },
  { views: 50000,  label: '50K',   payout: 25 },
  { views: 100000, label: '100K',  payout: 40 },
  { views: 250000, label: '250K',  payout: 90 },
  { views: 500000, label: '500K',  payout: 200 },
  { views: 1000000, label: '1M',   payout: 350 },
  { views: 2000000, label: '2M',   payout: 700 },
];

export const STATS = [
  { num: '3000+',  label: '創作者',     sub: '每週持續增長' },
  { num: '9',      label: '個平台',     sub: '覆蓋所有主流平台' },
  { num: 'US$450+', label: '最高獎金',   sub: '每支影片' },
  { num: '7 天',    label: '結算天數',   sub: '保證到帳' },
];

export const FEATURE_TABS = [
  { id: 'team',     label: 'UGC 團隊管理', desc: '建立創作者團隊、管理邀請碼，協同執行 UGC 專案', panel: 'team' },
  { id: 'kanban',   label: '任務管理看板', desc: '一目了然所有進行中任務，狀態、獎金、截止日全部整合', panel: 'kanban' },
  { id: 'storage',  label: '多平台影片儲存', desc: 'YT/TT/IG/XH/FB/X 影片統一管理，再也不會找不到素材', panel: 'storage' },
  { id: 'script',   label: 'AI 腳本生成', desc: '輸入主題，AI 立刻給你 Hook + Body + CTA 完整腳本', panel: 'script' },
  { id: 'calendar', label: '內容行事曆', desc: '排程發布、自動提醒，團隊協作不再漏發', panel: 'calendar' },
];

export const STEPS = [
  { num: '01', title: '瀏覽任務',  desc: '在任務看板挑選符合你風格的品牌任務，每個任務都標明獎金、平台與要求。' },
  { num: '02', title: '創作內容',  desc: '運用 AI 腳本輔助，拍攝符合品牌規範的短影片並上傳。' },
  { num: '03', title: '獲得獎金',  desc: '影片達到觀看數門檻，獎金自動累計到你的帳戶。' },
  { num: '04', title: '升級解鎖',  desc: '累積聲量與表現，升級解鎖更高階任務與團隊管理功能。' },
];

export const REASONS = [
  { img: img('reason-multi.jpg'), title: '多平台支持', desc: '覆蓋 9 大主流社群平台，從 YouTube 到小紅書，台前幕後一站搞定。' },
  { img: img('reason-ai.jpg'),    title: 'AI 輔助創作', desc: 'AI 腳本生成器 + AI 標題優化，讓你把時間花在拍片而不是寫腳本。' },
  { img: img('reason-trans.jpg'), title: '透明獎金制度', desc: '所有階梯、規則、結算天數公開透明，沒有隱藏條款。' },
  { img: img('reason-high.jpg'),  title: '高額單支獎金', desc: '單支最高 US$900，是同類平台的 3-5 倍。讓好內容拿到對的報酬。' },
];

export const TESTIMONIALS = [
  {
    name: 'Sarah Lin',
    handle: '@sarahl_creates',
    avatar: img('avatar-sarah.jpg'),
    text: '以前接案只能等品牌私訊，現在 Clipy 直接派任務。3 個月累積 US$2,400，重點是完全不用自己談價。',
    rating: 5,
    role: '美妝 / 開箱',
  },
  {
    name: 'Mike Chen',
    handle: '@mikec_vlogs',
    avatar: img('avatar-mike.jpg'),
    text: 'AI 腳本超好用！我只要給主題方向，AI 就生出 Hook + 段落 + CTA，拍片速度直接翻倍。',
    rating: 5,
    role: '旅遊 / 日常',
  },
  {
    name: 'Emma Wang',
    handle: '@emmaw_studio',
    avatar: img('avatar-emma.jpg'),
    text: '最愛「按觀看付費」這點。影片表現好就多拿，表現差也沒損失，比一次性買斷公平太多。',
    rating: 5,
    role: '3C / 評測',
  },
];

export const CONTENT_THUMBS = [
  { img: img('thumb-1.jpg'), tag: '美食',  views: '128K', payout: 'US$ 52', creator: '@cook_with_ava',   platform: 'TIKTOK' },
  { img: img('thumb-2.jpg'), tag: '美妝',  views: '342K', payout: 'US$ 138', creator: '@beauty_lab',       platform: 'INSTAGRAM' },
  { img: img('thumb-3.jpg'), tag: '旅遊',  views: '256K', payout: 'US$ 92',  creator: '@wanderlust_mike',  platform: 'YOUTUBE' },
  { img: img('thumb-4.jpg'), tag: '健身',  views: '189K', payout: 'US$ 76',  creator: '@fit_emma',         platform: 'YOUTUBE' },
];

export const FAQS = [
  { q: 'Clipy 是什麼？', a: 'Clipy AI 是一個專為中文 UGC 創作者打造的接案平台。我們連接品牌方與創作者，創作者依影片真實觀看數獲得獎金，品牌方依效果付費。目前已有 3000+ 創作者加入。' },
  { q: '需要多少粉絲數才能加入？', a: '不需要。我們不看粉絲數，只看影片的真實觀看表現。即使是 0 粉絲的新帳號，只要影片達到觀看門檻就能拿到獎金。' },
  { q: '獎金怎麼計算？何時入帳？', a: '獎金依階梯計算：10K 觀看 US$8，50K US$25，100K US$40，500K US$200，2M US$700。影片達標後 7 天內保證到帳，支援 PayPal 與銀行轉帳。' },
  { q: '哪些平台可以使用？', a: '支援 YouTube、TikTok、Instagram、小紅書、Facebook、X (Twitter)、Threads、Shorts、Reels 等 9 大平台。' },
  { q: '我可以接哪些類型的任務？', a: '目前開放美妝開箱、3C 評測、旅遊 vlog、美食教學、健身教學、生活風格等。每週新增任務類型，請關注任務看板。' },
];

export const TEAM_MEMBERS = [
  { name: 'Sarah L.', role: 'Creator', online: true,  avatar: img('avatar-sarah.jpg') },
  { name: 'Mike C.',  role: 'Creator', online: true,  avatar: img('avatar-mike.jpg') },
  { name: 'Emma W.',  role: 'Creator', online: false, avatar: img('avatar-emma.jpg') },
  { name: 'David K.', role: 'Manager', online: true,  avatar: img('avatar-david.jpg') },
];

export const TASKS = [
  { title: '品牌開箱短影片', price: 75,  status: '待接受', platform: 'YT' },
  { title: '護膚產品評測',   price: 120, status: '已接受', platform: 'IG' },
  { title: '旅行 Vlog 拍攝', price: 280, status: '待接受', platform: 'XH' },
  { title: '美食料理教學',   price: 40,  status: '已接受', platform: 'TT' },
];
