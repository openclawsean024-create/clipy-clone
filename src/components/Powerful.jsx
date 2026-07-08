const B = import.meta.env.BASE_URL;

export default function Powerful() {
  return (
    <section id="powerful" className="py-16 sm:py-24 bg-white">
      <div className="container-clipy">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-eyebrow">強大功能</p>
          <h2 className="section-title">創作者專屬儀表板</h2>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {/* 成效儀表板 */}
          <div className="card-feature overflow-hidden p-0">
            <div className="p-8 pb-0">
              <h3 className="text-2xl font-bold text-text-primary">成效儀表板</h3>
              <p className="mt-2 text-text-tertiary">觀看、收益、表現一目了然</p>
            </div>
            <div className="relative mt-6">
              <img src={`${B}images/dashboard.jpg`} alt="成效儀表板" className="w-full h-56 object-cover opacity-90" loading="eager" decoding="async"/>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-8 right-8 grid grid-cols-3 gap-3">
                <div className="bg-white/95 backdrop-blur rounded-xl p-3 shadow-lg">
                  <p className="text-xs text-text-tertiary">總觀看</p>
                  <p className="text-lg font-extrabold text-text-primary">1.2M</p>
                </div>
                <div className="bg-white/95 backdrop-blur rounded-xl p-3 shadow-lg">
                  <p className="text-xs text-text-tertiary">總收入</p>
                  <p className="text-lg font-extrabold text-brand-600">US$ 487</p>
                </div>
                <div className="bg-white/95 backdrop-blur rounded-xl p-3 shadow-lg">
                  <p className="text-xs text-text-tertiary">成長</p>
                  <p className="text-lg font-extrabold text-emerald-600">+34%</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI 腳本生成器 */}
          <div className="card-feature overflow-hidden p-0">
            <div className="p-8 pb-0">
              <h3 className="text-2xl font-bold text-text-primary">AI 腳本生成器</h3>
              <p className="mt-2 text-text-tertiary">從主題到完整腳本，一鍵產出</p>
            </div>
            <div className="relative mt-6">
              <img src={`${B}images/ai-script.jpg`} alt="AI 腳本生成器" className="w-full h-56 object-cover opacity-90" loading="eager" decoding="async"/>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-8 right-8">
                <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg">
                  <p className="text-xs text-text-tertiary mb-1">Hook</p>
                  <p className="text-sm font-semibold text-text-primary">「這支刷具改變我的底妝…」</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="badge-new">AI 生成</span>
                    <span className="text-xs text-text-tertiary">· 已節省 45 分鐘</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}