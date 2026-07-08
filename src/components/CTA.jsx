export default function CTA() {
  return (
    <section id="cta" className="py-16 sm:py-24 bg-gradient-to-br from-surface-darker via-slate-900 to-surface-dark text-white relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-brand-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-orange/15 blur-3xl"></div>
      </div>
      {/* 裝飾圓點 */}
      <div className="absolute top-10 left-10 h-2.5 w-2.5 rounded-full bg-accent-orange/60"></div>
      <div className="absolute top-20 right-32 h-2 w-2 rounded-full bg-brand-400/40"></div>
      <div className="absolute bottom-32 left-32 h-3 w-3 rounded-full bg-accent-orange/40"></div>
      <div className="absolute bottom-16 right-20 h-2 w-2 rounded-full bg-brand-300/50"></div>

      <div className="container-clipy text-center relative z-10">
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
          準備好創作換收入了嗎？
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
          加入 Clipy AI，與 3000+ 創作者一起，把影片變成穩定收入。
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="btn-primary-lg w-full sm:w-auto">註冊</button>
          <button className="btn-secondary bg-transparent border-slate-600 text-white hover:bg-slate-800 w-full sm:w-auto">聯絡業務</button>
        </div>
      </div>
    </section>
  );
}