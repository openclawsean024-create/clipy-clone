import { useState } from 'react';
import { useAuth } from '../auth';
import { calcEarnings, nextTier, fmtViews, tierLabel } from '../lib/earnings';
import { img as imgPath } from '../data';

const PLATFORM_OPTIONS = ['YOUTUBE', 'TIKTOK', 'INSTAGRAM', '小紅書', 'FACEBOOK', 'TWITTER/X', 'THREADS'];
const THUMB_OPTIONS = [
  ['thumb-1.jpg', '美食'],
  ['thumb-2.jpg', '美妝'],
  ['thumb-3.jpg', '旅遊'],
  ['thumb-4.jpg', '健身'],
  ['hero-1.jpg', 'Vlogger'],
  ['hero-3.jpg', '開箱'],
];

export default function Posts() {
  const { db, addPost, updatePost, removePost } = useAuth();
  const posts = db?.posts || [];
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortKey, setSortKey] = useState('views');

  const platforms = ['all', ...Array.from(new Set(posts.map(p => p.platform)))];
  const filteredPosts = posts
    .filter(p => filter === 'all' || p.platform === filter)
    .sort((a, b) => {
      if (sortKey === 'payout') return calcEarnings(b.views) - calcEarnings(a.views);
      if (sortKey === 'postedAt') return new Date(b.postedAt) - new Date(a.postedAt);
      return b.views - a.views;
    });

  const totalViews = posts.reduce((s, p) => s + p.views, 0);
  const totalEarnings = posts.reduce((s, p) => s + calcEarnings(p.views), 0);

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">PO 文管理</h1>
          <p className="text-text-tertiary mt-1 text-sm">{posts.length} 部影片 · {fmtViews(totalViews)} 觀看 · US$ {totalEarnings} 收益</p>
        </div>
        <button onClick={() => setAdding(true)} className="btn-primary">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          新增 PO 文
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {platforms.map(p => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                filter === p
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-100 text-text-secondary hover:bg-slate-200'
              }`}
            >
              {p === 'all' ? '全部' : p}
            </button>
          ))}
        </div>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
        >
          <option value="views">依觀看數</option>
          <option value="payout">依收益</option>
          <option value="postedAt">依發布時間</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-text-tertiary mb-4">這個分類還沒有 PO 文</p>
            <button onClick={() => setAdding(true)} className="btn-primary">新增你的第一個</button>
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-text-tertiary">影片</th>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-text-tertiary">平台</th>
                    <th className="text-right px-5 py-3 text-xs font-bold uppercase tracking-wider text-text-tertiary">觀看</th>
                    <th className="text-right px-5 py-3 text-xs font-bold uppercase tracking-wider text-text-tertiary">階梯</th>
                    <th className="text-right px-5 py-3 text-xs font-bold uppercase tracking-wider text-text-tertiary">收益</th>
                    <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-text-tertiary">發布</th>
                    <th className="text-right px-5 py-3 text-xs font-bold uppercase tracking-wider text-text-tertiary">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPosts.map(p => {
                    const earn = calcEarnings(p.views);
                    const next = nextTier(p.views);
                    return (
                      <tr key={p.id} className="hover:bg-slate-50 transition">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <img src={imgPath(p.thumbnail.replace('/images/', ''))} alt="" className="h-12 w-12 rounded-lg object-cover flex-shrink-0"/>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-text-primary line-clamp-1">{p.title}</p>
                              <a href={p.url} target="_blank" rel="noreferrer" className="text-xs text-brand-600 hover:underline line-clamp-1">查看連結 →</a>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className="badge-platform">{p.platform}</span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span className="text-sm font-bold text-text-primary tabular-nums">{fmtViews(p.views)}</span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span className="badge-platform">{tierLabel(p.views)}</span>
                          {next.nextTier && (
                            <p className="text-[10px] text-text-tertiary mt-1">↑{fmtViews(next.viewsToNext)} → {next.nextTier.label}</p>
                          )}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span className="text-base font-extrabold text-gradient-blue tabular-nums">US$ {earn}</span>
                        </td>
                        <td className="px-5 py-3 text-sm text-text-tertiary">{p.postedAt}</td>
                        <td className="px-5 py-3 text-right">
                          <button onClick={() => setEditing(p)} className="text-xs font-semibold text-brand-600 hover:text-brand-700 mr-3">編輯</button>
                          <button
                            onClick={() => { if (confirm(`確定刪除「${p.title}」？`)) removePost(p.id); }}
                            className="text-xs font-semibold text-red-600 hover:text-red-700"
                          >刪除</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-slate-100">
              {filteredPosts.map(p => {
                const earn = calcEarnings(p.views);
                return (
                  <div key={p.id} className="p-4">
                    <div className="flex gap-3">
                      <img src={imgPath(p.thumbnail.replace('/images/', ''))} alt="" className="h-16 w-16 rounded-lg object-cover flex-shrink-0"/>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-text-primary line-clamp-2">{p.title}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="badge-platform text-[10px] px-2 py-0.5">{p.platform}</span>
                          <span className="text-xs text-text-tertiary">{p.postedAt}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <div>
                            <p className="text-[10px] text-text-tertiary">觀看</p>
                            <p className="text-sm font-bold text-text-primary tabular-nums">{fmtViews(p.views)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-text-tertiary">收益</p>
                            <p className="text-sm font-extrabold text-brand-600 tabular-nums">US$ {earn}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end gap-2">
                      <button onClick={() => setEditing(p)} className="btn-ghost text-xs">編輯</button>
                      <button
                        onClick={() => { if (confirm('確定刪除？')) removePost(p.id); }}
                        className="btn-ghost text-xs text-red-600"
                      >刪除</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {(adding || editing) && (
        <PostEditor
          post={editing}
          onSave={(data) => {
            if (editing) updatePost(editing.id, data);
            else addPost(data);
            setAdding(false);
            setEditing(null);
          }}
          onClose={() => { setAdding(false); setEditing(null); }}
        />
      )}
    </div>
  );
}

function PostEditor({ post, onSave, onClose }) {
  const [title, setTitle] = useState(post?.title || '');
  const [platform, setPlatform] = useState(post?.platform || 'YOUTUBE');
  const [url, setUrl] = useState(post?.url || '');
  const [views, setViews] = useState(post?.views || 0);
  const [thumbnail, setThumbnail] = useState(post?.thumbnail || '/images/thumb-1.jpg');
  const [postedAt, setPostedAt] = useState(post?.postedAt || new Date().toISOString().slice(0, 10));
  const [duration, setDuration] = useState(post?.duration || 30);
  const previewEarn = calcEarnings(Number(views) || 0);

  const save = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('請輸入標題');
    onSave({ title: title.trim(), platform, url: url.trim(), views: Number(views), thumbnail, postedAt, duration: Number(duration), status: 'published' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-br from-brand-500 to-brand-700 text-white p-6 flex items-center justify-between sticky top-0 z-10">
          <h2 className="font-display text-xl font-extrabold">{post ? '編輯 PO 文' : '新增 PO 文'}</h2>
          <button onClick={onClose} className="h-8 w-8 rounded-full hover:bg-white/20 flex items-center justify-center" aria-label="關閉">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6"/></svg>
          </button>
        </div>
        <form onSubmit={save} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">標題</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例：開箱美妝刷具 3 分鐘評測" className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none" autoFocus/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">平台</label>
              <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white">
                {PLATFORM_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">觀看數</label>
              <input type="number" value={views} onChange={(e) => setViews(e.target.value)} min="0" className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-500 outline-none tabular-nums"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">影片連結</label>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-500 outline-none"/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">發布日期</label>
              <input type="date" value={postedAt} onChange={(e) => setPostedAt(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-500 outline-none"/>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">長度（秒）</label>
              <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} min="0" className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-500 outline-none tabular-nums"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">封面圖</label>
            <div className="grid grid-cols-6 gap-2">
              {THUMB_OPTIONS.map(([file, label]) => (
                <button
                  type="button"
                  key={file}
                  onClick={() => setThumbnail(`/images/${file}`)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition ${thumbnail === `/images/${file}` ? 'border-brand-500 ring-2 ring-brand-500/30' : 'border-transparent hover:border-slate-300'}`}
                  title={label}
                >
                  <img src={imgPath(file)} alt={label} className="w-full h-full object-cover"/>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-brand-50 border border-brand-200 p-3 flex items-center justify-between">
            <span className="text-sm text-text-secondary">即時預估收益</span>
            <span className="font-display text-2xl font-extrabold text-gradient-blue tabular-nums">US$ {previewEarn}</span>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">取消</button>
            <button type="submit" className="btn-primary flex-1">{post ? '更新' : '新增'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}