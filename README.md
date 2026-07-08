# 🎬 Clipy AI Clone

完整復刻 [clipyai.app](https://clipyai.app) 的 marketing landing page。
**純學習用途** — React + Vite + Tailwind CSS，14 個 sections，16 張 Wikimedia Commons CC 真實照片。

> ⚠️ **聲明**：本專案為教學復刻，所有內容、商標、品牌資訊均屬 [Clipy AI](https://clipyai.app) 所有。

## 🌐 Live Demo

**GitHub Pages**: https://openclawsean024-create.github.io/clipy-clone/

## 🛠️ Tech Stack

| | |
|---|---|
| **Framework** | React 19 + Vite 8 |
| **Styling** | Tailwind CSS 3 + Custom utilities |
| **Font** | Inter + Plus Jakarta Sans (Google Fonts) |
| **Images** | 16 Wikimedia Commons CC 真實照片 |
| **Deploy** | GitHub Pages (gh-pages branch) |

## 📐 Sections (14 個完整區塊)

| # | Section | 內容 |
|---|---|---|
| 01 | **Navbar** | Logo + 4 個導航 + 登入/註冊 + 行動漢堡選單 |
| 02 | **Hero** | 角色切換 + 3 個 slide auto-rotate + 漸層 US$900 + 播放按鈕 + 3000+ 社會證明 |
| 03 | **Platforms Strip** | 9 個平台 + 10 個地區徽章 |
| 04 | **Earnings Slider** | 互動滑桿 + 8 階獎金即時計算 + 下一階提示 |
| 05 | **Stats** | 4 個數字卡 (3000+/9/US$450+/7天) |
| 06 | **Features Tabs** | 5 個 tab + 5 個 panel (UGC 團隊/看板/儲存/AI 腳本/行事曆) |
| 07 | **Steps** | 4 步流程 (瀏覽→創作→獎金→升級) |
| 08 | **Powerful** | 成效儀表板 + AI 腳本生成器 (浮動 stats 疊加) |
| 09 | **Why Us** | 4 個 reasons (多平台/AI/透明/高額) |
| 10 | **Testimonials** | 3 個創作者評價 (5星 + 真實頭像) |
| 11 | **Popular Content** | 4 個熱門短影片卡 |
| 12 | **Tiers Table** | 8 階完整獎金表 + 每萬觀看效率 |
| 13 | **FAQ** | 5 個常見問題 accordion |
| 14 | **CTA + Footer** | 深色 CTA 區 + 4 欄 footer + 社群 icon |
| + | **Cookie Banner** | 1.5s 延遲出現 + LocalStorage 記住 |

## 🎨 Design System

### Colors
| Token | Hex | Tailwind |
|---|---|---|
| **Primary Brand** | `#3b82f6` | `bg-brand-500` |
| Brand 50-900 | blue-50 → blue-900 | Tailwind 完整色階 |
| **Accent Orange** | `#f59e0b` | `text-accent-orange` |
| **Surface Dark** | `#0f172a` | `bg-surface-darker` |
| **Background** | `#f8fafc` | `bg-surface-secondary` |
| **Text Primary** | `#0f172a` | `text-text-primary` |

### Fonts
- **Display**: Plus Jakarta Sans (700/800) — 標題
- **Body**: Inter (400/500/600/700) — 內文

## 📸 Image Sources (Wikimedia Commons)

所有圖片皆為 CC 授權真實照片，**為每個 section 主題精選**：

| 區塊 | 主題 | 圖片 |
|---|---|---|
| Hero slide 1 | vlogger | Sandeep Mahakal Content Creator Landscape |
| Hero slide 2 | 開箱 | Unboxing (8660855980) |
| Hero slide 3 | AI 工作室 | Apple Creator Studio |
| Powerful 1 | 成效儀表板 | Visitor Analytics Dashboard |
| Powerful 2 | AI 腳本 | Young woman with laptop + coffee |
| Why Us 1 | 多平台 | Blackview A60 Smartphone |
| Why Us 2 | AI | Toyota Robot at Toyota Kaikan |
| Why Us 3 | 透明 | Home made sour dough bread |
| Why Us 4 | 高額 | Blue Darter Trophy |
| Thumb 1 | 美食/烹飪 | Cooking food in farm |
| Thumb 2 | 美妝 | Korean cosmetic products |
| Thumb 3 | 旅遊 | Great Smoky Mountains National Park |
| Thumb 4 | 健身 | Fitness Center Equipment |
| Testimonial 1 | 創作者 | Water reflection smiling woman |
| Testimonial 2 | 創作者 | Portrait of a Smiling Man (van Doesburg) |
| Testimonial 3 | 創作者 | Vice-presidents Professional Woman's League |

## 🏗️ Project Structure

```
clipy-clone/
├── public/
│   ├── favicon.svg
│   ├── og-image.svg
│   └── images/ (16 CC photos)
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── data.js               # 所有資料 (platforms, tiers, FAQs...)
│   ├── index.css             # Tailwind + 自訂 utilities
│   └── components/
│       ├── Navbar.jsx
│       ├── Hero.jsx          # 3 slides + 6s auto-rotate
│       ├── PlatformsStrip.jsx
│       ├── EarningsSlider.jsx  # 即時計算
│       ├── Stats.jsx
│       ├── FeaturesTabs.jsx    # 5 tabs + 5 panels (PanelTeam/Kanban/Storage/Script/Calendar)
│       ├── Steps.jsx
│       ├── Powerful.jsx
│       ├── WhyUs.jsx
│       ├── Testimonials.jsx
│       ├── PopularContent.jsx
│       ├── TiersTable.jsx
│       ├── CTA.jsx
│       ├── FAQ.jsx
│       ├── Footer.jsx
│       └── CookieBanner.jsx
├── tailwind.config.js         # 品牌色 + animations
├── vite.config.js             # base: /clipy-clone/
└── package.json
```

## 🚀 Local Development

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # → dist/
npm run preview      # 預覽 build
```

## 📦 Build Output

| Asset | Size | Gzip |
|---|---|---|
| HTML | 2.05 kB | 0.93 kB |
| CSS | 37.40 kB | 6.68 kB |
| JS | 241.78 kB | 72.79 kB |
| 16 圖片總計 | ~3.3 MB | (lazy loaded) |

## 🎯 Key Interactions

1. **Hero Slides** — 3 個 slide，6 秒自動輪播，可手動點圓點切換
2. **Earnings Slider** — 拖動滑桿即時改變觀看數 + 獎金（10K US$8 → 2M US$700）
3. **Tier Buttons** — 點 10K/30K/50K/100K/250K/500K/1M/2M 直接跳到該階
4. **Features Tabs** — 5 個 tab 切換 5 個 panel (Team/Kanban/Storage/AI/Calendar)
5. **FAQ Accordion** — 點題目展開/收合
6. **Cookie Banner** — 1.5s 延遲出現，localStorage 記住選擇
7. **Mobile Menu** — < 768px 漢堡選單

## 🔧 Key Technical Details

- **Tailwind 3** 而非 4 — 更穩定的 PostCSS pipeline
- **`base: '/clipy-clone/'`** in vite.config.js — GH Pages 子路徑部署
- **`loading="lazy"`** on images — 節省初始 bandwidth
- **OG image** 自製 SVG (1200x630) — 社群分享預覽
- **No external image CDN** — 所有圖片隨 repo deploy
- **No Tailwind CDN** — 真實 build pipeline
- **No fonts download** — Google Fonts CDN 載入

## 📜 Commits

| Branch | Commit | Message |
|---|---|---|
| master | d4a3d03 | feat: complete Clipy AI clone |
| gh-pages | dc46e6b | deploy: dist/ for GitHub Pages |

## ⚖️ License

MIT — 純學習復刻，所有商標/品牌/內容權利歸 [Clipy AI](https://clipyai.app) 所有。
本專案無任何商業用途，圖片皆來自 Wikimedia Commons CC 授權。

---

🤖 Built with Hermes Agent · 2026-07-09
