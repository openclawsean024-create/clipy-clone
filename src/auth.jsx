import { createContext, useContext, useState, useEffect } from 'react';
import { getMockPosts } from './lib/mockData';

const AuthCtx = createContext(null);
const AUTH_KEY = 'clipy-auth';
const DB_KEY = (uid) => `clipy-db-${uid}`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [db, setDb] = useState(null);

  // 啟動時從 localStorage 復原
  useEffect(() => {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      try {
        const u = JSON.parse(raw);
        setUser(u);
        const dbRaw = localStorage.getItem(DB_KEY(u.id));
        if (dbRaw) {
          setDb(JSON.parse(dbRaw));
        }
      } catch {
        localStorage.removeItem(AUTH_KEY);
      }
    }
  }, []);

  // 同步 db 到 localStorage 每次變動
  useEffect(() => {
    if (!user || !db) return;
    localStorage.setItem(DB_KEY(user.id), JSON.stringify(db));
  }, [db, user]);

  const register = ({ email, name }) => {
    const id = `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    const u = { id, email, name: name || email.split('@')[0], createdAt: new Date().toISOString() };
    localStorage.setItem(AUTH_KEY, JSON.stringify(u));
    setUser(u);

    // 用 mock data 初始化 db
    const posts = getMockPosts();
    const initialDb = { posts, withdrawHistory: [], settings: { notifyEmail: true } };
    setDb(initialDb);
    localStorage.setItem(DB_KEY(id), JSON.stringify(initialDb));
    return u;
  };

  const login = ({ email }) => {
    // 模擬: 任何 email 都允許登入 — 如果用戶不存在就建一個
    let raw = localStorage.getItem(AUTH_KEY);
    let u;
    if (raw) {
      try {
        u = JSON.parse(raw);
        if (u.email !== email) {
          // 不同 email → 切換到該 email "已有帳號"
          u = { ...u, email };
        }
      } catch { /* fall through */ }
    }
    if (!u) {
      u = register({ email });
      return u;
    }
    setUser(u);
    const dbRaw = localStorage.getItem(DB_KEY(u.id));
    if (dbRaw) {
      setDb(JSON.parse(dbRaw));
    } else {
      const posts = getMockPosts();
      const initialDb = { posts, withdrawHistory: [], settings: { notifyEmail: true } };
      setDb(initialDb);
      localStorage.setItem(DB_KEY(u.id), JSON.stringify(initialDb));
    }
    return u;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
    setDb(null);
  };

  // CRUD posts
  const addPost = (post) => {
    setDb(prev => ({
      ...prev,
      posts: [{ ...post, id: `p_${Date.now()}` }, ...prev.posts],
    }));
  };
  const updatePost = (id, patch) => {
    setDb(prev => ({
      ...prev,
      posts: prev.posts.map(p => p.id === id ? { ...p, ...patch } : p),
    }));
  };
  const removePost = (id) => {
    setDb(prev => ({
      ...prev,
      posts: prev.posts.filter(p => p.id !== id),
    }));
  };

  const addWithdraw = (entry) => {
    setDb(prev => ({
      ...prev,
      withdrawHistory: [entry, ...(prev.withdrawHistory || [])],
    }));
  };

  const updateSettings = (patch) => {
    setDb(prev => ({
      ...prev,
      settings: { ...prev.settings, ...patch },
    }));
  };

  return (
    <AuthCtx.Provider value={{ user, db, register, login, logout, addPost, updatePost, removePost, addWithdraw, updateSettings }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be inside <AuthProvider>');
  return ctx;
};