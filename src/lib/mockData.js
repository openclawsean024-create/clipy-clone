// 5 個 mock UGC 影片 — 模擬新帳號註冊後會有的 dashboard 資料
export function getMockPosts() {
  return [
    {
      id: 'p1',
      title: '開箱美妝刷具組｜3 分鐘評測',
      thumbnail: '/images/thumb-2.jpg',
      platform: 'INSTAGRAM',
      url: 'https://instagram.com/p/example1',
      views: 342000,
      postedAt: '2026-07-08',
      status: 'published',
      duration: 32,
    },
    {
      id: 'p2',
      title: '美食教學｜5 步做出餐廳級義大利麵',
      thumbnail: '/images/thumb-1.jpg',
      platform: 'TIKTOK',
      url: 'https://tiktok.com/@user/video/example2',
      views: 128000,
      postedAt: '2026-07-05',
      status: 'published',
      duration: 58,
    },
    {
      id: 'p3',
      title: '新手健身｜居家 10 分鐘瘦肚子',
      thumbnail: '/images/thumb-4.jpg',
      platform: 'YOUTUBE',
      url: 'https://youtube.com/watch?v=example3',
      views: 89000,
      postedAt: '2026-07-02',
      status: 'published',
      duration: 612,
    },
    {
      id: 'p4',
      title: '小紅書爆款｜夏季穿搭 5 套分享',
      thumbnail: '/images/thumb-2.jpg',
      platform: '小紅書',
      url: 'https://xiaohongshu.com/explore/example4',
      views: 189000,
      postedAt: '2026-06-28',
      status: 'published',
      duration: 45,
    },
    {
      id: 'p5',
      title: '旅遊 Vlog｜台中 3 天 2 夜行程',
      thumbnail: '/images/thumb-3.jpg',
      platform: 'YOUTUBE',
      url: 'https://youtube.com/watch?v=example5',
      views: 47000,
      postedAt: '2026-06-22',
      status: 'published',
      duration: 480,
    },
  ];
}

// 平台分佈 (用於 donut chart)
export function platformDistribution(posts) {
  const map = {};
  for (const p of posts) {
    map[p.platform] = (map[p.platform] || 0) + p.views;
  }
  return Object.entries(map).map(([platform, views]) => ({
    platform,
    views,
    pct: 0, // filled by caller
  })).sort((a, b) => b.views - a.views);
}

// 12 個月觀看數歷史 (mock)
export function monthlyViews() {
  return [
    { month: 'Aug', views: 12000 },
    { month: 'Sep', views: 28000 },
    { month: 'Oct', views: 45000 },
    { month: 'Nov', views: 38000 },
    { month: 'Dec', views: 85000 },
    { month: 'Jan', views: 92000 },
    { month: 'Feb', views: 78000 },
    { month: 'Mar', views: 120000 },
    { month: 'Apr', views: 145000 },
    { month: 'May', views: 178000 },
    { month: 'Jun', views: 195000 },
    { month: 'Jul', views: 235000 },
  ];
}

// 5 個 pending earnings (待結算)
export function pendingEarnings(posts) {
  return posts.filter(p => p.status === 'published').map(p => ({
    postId: p.id,
    title: p.title,
    views: p.views,
    payout: 0, // filled by caller using calcEarnings
    platform: p.platform,
    postedAt: p.postedAt,
  }));
}
