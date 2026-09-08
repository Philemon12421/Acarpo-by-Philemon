import React, { useState, useMemo, useEffect } from 'react';
import {
  BrowserRouter, Routes, Route, Link, NavLink, useNavigate, useParams, Navigate,
} from 'react-router-dom';
import {
  Shield, Check, Lock, Play, Trophy, Search, Mail, KeyRound, Eye, EyeOff,
  Sparkles, Palette, Wrench, Brain, ArrowRight, ArrowLeft, Clock, Menu, X,
  ExternalLink, Link2, ShieldCheck, Info, FileText,
} from 'lucide-react';
import { ROADMAPS, BLOG_POSTS } from './data.js';
import { TOOLS } from './toolsData.js';
import { LINKS } from './linksData.js';
import LabPage from './LabPage.jsx';
import DocsPage from './DocsPage.jsx';

const ICONS = { Shield, Palette, Wrench, Brain };
const SITE_NAME = 'Acarpo';

/* ----------------------------- shared styles ----------------------------- */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
    .af-display { font-family: 'Space Grotesk', sans-serif; }
    .af-body { font-family: 'Inter', sans-serif; }
    @keyframes af-pulse { 0%,100% { transform: scale(1); opacity: .55; } 50% { transform: scale(1.35); opacity: 0; } }
    .af-pulse { animation: af-pulse 2.2s ease-out infinite; transform-origin: center; }
    @keyframes af-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
    .af-draw { animation: af-draw 1.6s ease-out forwards; }
    @media (prefers-reduced-motion: reduce) { .af-pulse, .af-draw { animation: none; } }
    .af-node:hover { transform: scale(1.06); }
    .af-node { transition: transform .15s ease; }
    .af-card:hover { border-color: #D4D4D8; transform: translateY(-2px); }
    .af-card { transition: all .18s ease; }
  `}</style>
);

/* ------------------------------ page titles ------------------------------- */
function usePageTitle(title) {
  useEffect(() => { document.title = title ? `${title} — ${SITE_NAME}` : SITE_NAME; }, [title]);
}

/* -------------------------------- roadmap -------------------------------- */
function pathFromPoints(points) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i], p1 = points[i + 1];
    const midY = (p0.y + p1.y) / 2;
    d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
  }
  return d;
}

function deriveNodes(nodes, doneIds) {
  let unlockedAssigned = false;
  return nodes.map((n) => {
    const isDone = doneIds.includes(n.id);
    let status = 'locked';
    if (isDone) status = 'done';
    else if (!unlockedAssigned) { status = 'current'; unlockedAssigned = true; }
    return { ...n, status };
  });
}

function RoadmapPath({ title, subtitle, accent, Icon, nodes, onComplete }) {
  const [openId, setOpenId] = useState(null);
  const ROW_H = 128, TOP_PAD = 60, WIDTH = 400;
  const height = TOP_PAD + nodes.length * ROW_H + 30;

  const points = useMemo(
    () => nodes.map((n, i) => ({ x: WIDTH / 2 + Math.sin(i * 0.85) * 106, y: TOP_PAD + i * ROW_H })),
    [nodes]
  );
  const pathD = pathFromPoints(points);
  const doneCount = nodes.filter((n) => n.status === 'done').length;
  const pct = Math.round((doneCount / nodes.length) * 100);
  const open = openId != null ? nodes.find((n) => n.id === openId) : null;

  const handleComplete = (nodeId) => { onComplete(nodeId); setOpenId(null); };

  return (
    <div className="af-body" style={{ position: 'relative' }}>
      <div className="mb-5">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}1A` }}>
            <Icon size={18} style={{ color: accent }} strokeWidth={2.3} />
          </div>
          <h2 className="af-display text-xl font-bold text-zinc-900">{title}</h2>
        </div>
        <p className="text-sm text-zinc-500 mb-4">{subtitle}</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-zinc-200 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: accent }} />
          </div>
          <span className="text-xs font-semibold text-zinc-500 shrink-0">{doneCount}/{nodes.length} done</span>
        </div>
      </div>

      <div className="max-w-sm mx-auto" style={{ aspectRatio: `${WIDTH} / ${height}` }}>
        <svg viewBox={`0 0 ${WIDTH} ${height}`} width="100%" height="100%">
          <path d={pathD} fill="none" stroke="#E4E4E7" strokeWidth="5" strokeLinecap="round" />
          <path
            d={pathD} fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round"
            pathLength="1" className="af-draw"
            style={{ strokeDasharray: `${doneCount / Math.max(nodes.length - 1, 1)} 1` }}
          />
          {points.map((p, i) => {
            const node = nodes[i];
            const isDone = node.status === 'done', isCurrent = node.status === 'current', isLocked = node.status === 'locked';
            const r = isCurrent ? 25 : 22;
            const iconSize = 16;
            let IconEl = null;
            if (isLocked) IconEl = <Lock size={iconSize} color="#A1A1AA" strokeWidth={2.3} x={p.x - iconSize / 2} y={p.y - iconSize / 2} />;
            else if (node.capstone) IconEl = <Trophy size={iconSize} color="#FFFFFF" strokeWidth={2.3} x={p.x - iconSize / 2} y={p.y - iconSize / 2} />;
            else if (isDone) IconEl = <Check size={iconSize + 1} color="#FFFFFF" strokeWidth={3} x={p.x - (iconSize + 1) / 2} y={p.y - (iconSize + 1) / 2} />;
            else if (isCurrent) IconEl = <Play size={iconSize - 2} color="#FFFFFF" strokeWidth={2.5} fill="#FFFFFF" x={p.x - (iconSize - 2) / 2} y={p.y - (iconSize - 2) / 2} />;

            return (
              <g
                key={node.id}
                onClick={() => !isLocked && setOpenId(node.id)}
                role="button"
                tabIndex={isLocked ? -1 : 0}
                aria-label={node.title}
                aria-disabled={isLocked}
                onKeyDown={(e) => { if (!isLocked && (e.key === 'Enter' || e.key === ' ')) setOpenId(node.id); }}
                className="af-node"
                style={{ cursor: isLocked ? 'not-allowed' : 'pointer', outline: 'none' }}
              >
                {isCurrent && <circle cx={p.x} cy={p.y} r={r} fill={accent} className="af-pulse" pointerEvents="none" />}
                <circle cx={p.x} cy={p.y} r={r} fill={isDone || isCurrent ? accent : '#FFFFFF'} stroke={isLocked ? '#D4D4D8' : accent} strokeWidth="2.5" />
                {IconEl}
              </g>
            );
          })}
        </svg>
      </div>

      <p className="text-center text-[11px] text-zinc-400 mt-1">Tap any unlocked node to open its lesson.</p>

      {open && (
        <div onClick={() => setOpenId(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(24,24,27,0.45)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-5 w-full max-w-sm" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: accent }}>{open.status === 'done' ? 'Completed lesson' : 'Lesson'}</span>
                <h3 className="af-display font-bold text-zinc-900 text-lg mt-0.5">{open.title}</h3>
              </div>
              <button onClick={() => setOpenId(null)} aria-label="Close" className="shrink-0 w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500"><X size={14} /></button>
            </div>
            <div className="space-y-3 mb-5">
              {(open.content || [open.desc]).map((p, i) => <p key={i} className="text-sm text-zinc-600 leading-relaxed">{p}</p>)}
            </div>
            {open.status !== 'done' ? (
              <button onClick={() => handleComplete(open.id)} className="text-xs font-semibold text-white px-4 py-2.5 rounded-lg flex items-center gap-1.5" style={{ background: accent }}>
                <Check size={13} strokeWidth={3} /> Mark lesson complete
              </button>
            ) : (
              <p className="text-[11px] font-semibold" style={{ color: accent }}>✓ Already completed — nice work.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* --------------------------------- header ---------------------------------- */
function Header({ menuOpen, setMenuOpen }) {
  const tabs = [
    { to: '/', label: 'Home', end: true },
    { to: '/roadmaps', label: 'Roadmaps' },
    { to: '/tools', label: 'Tools' },
    { to: '/lab', label: 'Lab' },
    { to: '/docs', label: 'Docs' },
    { to: '/blog', label: 'Blog' },
    { to: '/linker', label: 'Linker' },
    { to: '/auth', label: 'Sign In' },
  ];
  const linkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-xs font-semibold transition ${isActive ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`;
  const mobileLinkClass = ({ isActive }) =>
    `text-left px-3 py-2 rounded-lg text-sm font-semibold ${isActive ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500'}`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-zinc-200 px-5 py-3.5">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
            <span className="af-display text-white font-bold text-sm">A</span>
          </div>
          <span className="af-display font-bold text-zinc-900 text-sm">{SITE_NAME}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
          {tabs.map((t) => (
            <NavLink key={t.to} to={t.to} end={t.end} className={linkClass}>{t.label}</NavLink>
          ))}
        </nav>
        <button className="md:hidden text-zinc-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-1 mt-3 pt-3 border-t border-zinc-100">
          {tabs.map((t) => (
            <NavLink key={t.to} to={t.to} end={t.end} className={mobileLinkClass} onClick={() => setMenuOpen(false)}>{t.label}</NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

/* --------------------------------- home ---------------------------------- */
function HomePage({ progress }) {
  usePageTitle(null);
  return (
    <div className="max-w-5xl mx-auto px-5 py-10 space-y-12">
      <section className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 md:p-10">
        <span className="inline-block text-[11px] font-bold px-2.5 py-1 bg-white text-zinc-500 rounded-full border border-zinc-200 uppercase tracking-wider mb-3">
          Learn by doing
        </span>
        <h1 className="af-display text-3xl md:text-4xl font-bold text-zinc-900 mb-3 max-w-xl">
          Guided roadmaps for security, AI, design, and tools.
        </h1>
        <p className="text-sm text-zinc-500 max-w-lg mb-5">
          Bite-sized lessons laid out as a path you can see yourself moving through, a curated tools directory, and a blog to go deeper on anything that catches your eye.
        </p>
        <div className="flex gap-3">
          <Link to="/roadmaps" className="px-4 py-2.5 bg-zinc-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5">
            Start a roadmap <ArrowRight size={14} />
          </Link>
          <Link to="/blog" className="px-4 py-2.5 bg-white border border-zinc-200 text-zinc-700 text-xs font-bold rounded-xl">
            Browse the blog
          </Link>
        </div>
      </section>

      <section>
        <h2 className="af-display text-lg font-bold text-zinc-900 mb-4">Pick a track</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(ROADMAPS).map(([key, r]) => {
            const doneCount = (progress[key] || []).length;
            const Icon = ICONS[r.iconName];
            return (
              <Link key={key} to={`/roadmaps/${key}`} className="af-card text-left bg-white border border-zinc-200 rounded-2xl p-4 block">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${r.accent}1A` }}>
                  <Icon size={18} style={{ color: r.accent }} strokeWidth={2.3} />
                </div>
                <h3 className="af-display font-semibold text-sm text-zinc-900 mb-1">{r.title}</h3>
                <p className="text-xs text-zinc-500">{doneCount}/{r.nodes.length} lessons · {doneCount === 0 ? 'not started' : 'in progress'}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="af-display text-lg font-bold text-zinc-900">Latest from the blog</h2>
          <Link to="/blog" className="text-xs font-semibold text-zinc-500 flex items-center gap-1">View all <ArrowRight size={12} /></Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {BLOG_POSTS.slice(0, 3).map((p) => <BlogCard key={p.id} post={p} />)}
        </div>
      </section>
    </div>
  );
}

/* --------------------------------- blog ---------------------------------- */
function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.id}`} className="af-card bg-white border border-zinc-200 rounded-2xl overflow-hidden block">
      <img src={post.image} alt={post.title} className="w-full h-36 object-cover" loading="lazy" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: post.accent }}>{post.cat}</span>
          <span className="text-[10px] text-zinc-400 flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
        </div>
        <h3 className="af-display font-semibold text-sm text-zinc-900 mb-1.5 leading-snug">{post.title}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed mb-3">{post.excerpt}</p>
        <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-3 border-t border-zinc-100">
          <span>{post.author}</span>
          <span className="font-semibold" style={{ color: post.accent }}>Read more →</span>
        </div>
      </div>
    </Link>
  );
}

function BlogPostPage() {
  const { id } = useParams();
  const post = BLOG_POSTS.find((p) => String(p.id) === id);
  usePageTitle(post ? post.title : 'Blog post not found');
  if (!post) return <Navigate to="/blog" replace />;
  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <Link to="/blog" className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 mb-5 w-fit"><ArrowLeft size={13} /> Back to blog</Link>

      <img src={post.image} alt={post.title} className="w-full h-56 sm:h-72 object-cover rounded-2xl" />
      {post.credit && (
        <p className="text-[11px] text-zinc-400 mt-2 mb-6">
          Photo by <a href={post.credit.profileUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-600">{post.credit.name}</a>
          {' '}on <a href={post.credit.photoUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-600">Unsplash</a>
        </p>
      )}

      <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: post.accent }}>{post.cat}</span>
      <h1 className="af-display text-2xl sm:text-3xl font-bold text-zinc-900 mt-1.5 mb-2 leading-tight">{post.title}</h1>
      <div className="flex items-center gap-3 text-xs text-zinc-400 mb-8">
        <span>{post.author}</span><span>·</span><span>{post.date}</span><span>·</span><span>{post.readTime}</span>
      </div>

      <div className="space-y-4">
        {post.content.map((p, i) => <p key={i} className="text-[15px] text-zinc-600 leading-relaxed">{p}</p>)}
      </div>

      {post.takeaways && (
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 mt-8">
          <p className="af-display text-sm font-bold text-zinc-900 mb-3">Key takeaways</p>
          <ul className="space-y-2">
            {post.takeaways.map((t, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: post.accent }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function BlogPage() {
  usePageTitle('Blog');
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const cats = ['All', ...new Set(BLOG_POSTS.map((p) => p.cat))];
  const filtered = BLOG_POSTS.filter((p) =>
    (cat === 'All' || p.cat === cat) &&
    (p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase()))
  );
  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <h1 className="af-display text-2xl font-bold text-zinc-900 mb-1">Blog</h1>
      <p className="text-sm text-zinc-500 mb-6">Deeper dives to go with each roadmap.</p>
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts..." className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-zinc-400" />
      </div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${cat === c ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-500 border-zinc-200'}`}>{c}</button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => <BlogCard key={p.id} post={p} />)}
        {filtered.length === 0 && <p className="text-sm text-zinc-400 col-span-full">No posts match that search.</p>}
      </div>
    </div>
  );
}

/* --------------------------------- tools ---------------------------------- */
function ToolsPage() {
  usePageTitle('Cybersecurity Tools');
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const cats = ['All', ...new Set(TOOLS.map((t) => t.category))];
  const filtered = TOOLS.filter((t) =>
    (cat === 'All' || t.category === cat) &&
    (t.name.toLowerCase().includes(query.toLowerCase()) || t.desc.toLowerCase().includes(query.toLowerCase()))
  );
  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#4338CA1A' }}>
          <Shield size={18} style={{ color: '#4338CA' }} strokeWidth={2.3} />
        </div>
        <h1 className="af-display text-2xl font-bold text-zinc-900">Cybersecurity Tools</h1>
      </div>
      <p className="text-sm text-zinc-500 mb-6">Industry-standard tools cybersecurity professionals use daily — for authorized testing, defense, and investigation on systems you own or have permission to work on.</p>
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tools..." className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-zinc-400" />
      </div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${cat === c ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-500 border-zinc-200'}`}>{c}</button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <a key={t.id} href={t.url} target="_blank" rel="noopener noreferrer" className="af-card bg-white border border-zinc-200 rounded-2xl p-4 block">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-600">{t.category}</span>
              <ExternalLink size={13} className="text-zinc-300" />
            </div>
            <h3 className="af-display font-semibold text-sm text-zinc-900 mb-1.5">{t.name}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">{t.desc}</p>
          </a>
        ))}
        {filtered.length === 0 && <p className="text-sm text-zinc-400 col-span-full">No tools match that search.</p>}
      </div>
    </div>
  );
}

/* --------------------------------- linker ---------------------------------- */
function LinkerPage() {
  usePageTitle('Linker');
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const cats = ['All', ...new Set(LINKS.map((l) => l.category))];
  const filtered = LINKS.filter((l) =>
    (cat === 'All' || l.category === cat) &&
    (l.name.toLowerCase().includes(query.toLowerCase()) || l.desc.toLowerCase().includes(query.toLowerCase()))
  );
  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-zinc-100">
          <Link2 size={18} className="text-zinc-700" strokeWidth={2.3} />
        </div>
        <h1 className="af-display text-2xl font-bold text-zinc-900">Linker</h1>
      </div>
      <p className="text-sm text-zinc-500 mb-6">Links, websites, and software worth bookmarking. Every entry opens the real destination directly — no redirect in between.</p>
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search links..." className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-zinc-400" />
      </div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${cat === c ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-500 border-zinc-200'}`}>{c}</button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((l) => (
          <a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" className="af-card bg-white border border-zinc-200 rounded-2xl p-4 block">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">{l.category}</span>
              <ExternalLink size={13} className="text-zinc-300" />
            </div>
            <h3 className="af-display font-semibold text-sm text-zinc-900 mb-1.5">{l.name}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">{l.desc}</p>
          </a>
        ))}
        {filtered.length === 0 && <p className="text-sm text-zinc-400 col-span-full">No links match that search.</p>}
      </div>
    </div>
  );
}

/* --------------------------------- roadmaps page ---------------------------------- */
function RoadmapsPage({ progress, onComplete }) {
  const { track: trackKey } = useParams();
  const navigate = useNavigate();
  const track = ROADMAPS[trackKey];
  usePageTitle(track ? track.title : 'Roadmaps');
  if (!track) return <Navigate to="/roadmaps/cybersecurity" replace />;
  const nodes = deriveNodes(track.nodes, progress[trackKey] || []);
  const Icon = ICONS[track.iconName];
  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="af-display text-2xl font-bold text-zinc-900 mb-1">Roadmaps</h1>
      <p className="text-sm text-zinc-500 mb-6">Pick a track and work top to bottom. Everything starts locked except the first lesson.</p>
      <div className="flex gap-2 mb-8 flex-wrap">
        {Object.entries(ROADMAPS).map(([key, r]) => {
          const TabIcon = ICONS[r.iconName];
          const isActive = key === trackKey;
          return (
            <button key={key} onClick={() => navigate(`/roadmaps/${key}`)} className="px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5"
              style={isActive ? { background: r.accent, borderColor: r.accent, color: '#fff' } : { background: '#fff', borderColor: '#E4E4E7', color: '#71717A' }}>
              <TabIcon size={14} /> {r.title.split(' ')[0]}
            </button>
          );
        })}
      </div>
      <div className="bg-white border border-zinc-200 rounded-3xl p-6">
        <RoadmapPath title={track.title} subtitle={track.subtitle} accent={track.accent} Icon={Icon} nodes={nodes} onComplete={(nodeId) => onComplete(trackKey, nodeId)} />
      </div>
    </div>
  );
}

/* --------------------------------- auth ---------------------------------- */
function AuthPage() {
  usePageTitle('Sign In');
  const [mode, setMode] = useState('signin');
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-5 py-10 grid md:grid-cols-2 gap-6 items-stretch">
      <div className="bg-white border border-zinc-200 rounded-3xl p-7 md:p-8">
        <div className="flex gap-1 bg-zinc-100 p-1 rounded-xl mb-7 w-fit">
          <button onClick={() => setMode('signin')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${mode === 'signin' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'}`}>Sign in</button>
          <button onClick={() => setMode('signup')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${mode === 'signup' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'}`}>Sign up</button>
        </div>
        <h1 className="af-display text-2xl font-bold text-zinc-900 mb-1.5">{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="text-sm text-zinc-500 mb-7">{mode === 'signin' ? 'Sign in to pick up your roadmap where you left off.' : 'Free to join — start tracking progress across every track.'}</p>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {mode === 'signup' && (
            <div>
              <label className="text-xs font-semibold text-zinc-700 mb-1.5 block">Full name</label>
              <input type="text" placeholder="Jane Doe" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-zinc-400 focus:bg-white transition" />
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-zinc-700 mb-1.5 block">Email address</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="email" placeholder="you@example.com" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:border-zinc-400 focus:bg-white transition" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-zinc-700 block">Password</label>
              {mode === 'signin' && <button type="button" className="text-[11px] font-semibold text-zinc-400 hover:text-zinc-700">Forgot password?</button>}
            </div>
            <div className="relative">
              <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type={showPw ? 'text' : 'password'} placeholder="••••••••" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-zinc-400 focus:bg-white transition" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">{showPw ? <EyeOff size={15} /> : <Eye size={15} />}</button>
            </div>
          </div>
          {mode === 'signup' && (
            <label className="flex items-start gap-2 text-xs text-zinc-500 pt-1 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 accent-zinc-900" />
              I agree to the Terms of Service and Privacy Policy
            </label>
          )}
          <button type="submit" disabled={mode === 'signup' && !agreed} className="w-full bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl py-2.5 mt-2 transition">
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>
        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-zinc-100 flex-1" /><span className="text-[11px] text-zinc-400">or continue with</span><div className="h-px bg-zinc-100 flex-1" />
        </div>
        <button type="button" className="w-full border border-zinc-200 hover:bg-zinc-50 rounded-xl py-2.5 text-sm font-semibold text-zinc-700 transition flex items-center justify-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.4H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z"/><path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z"/><path fill="#FBBC05" d="M5.4 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.6.4-2.4V6.5H1.4C.5 8.2 0 10.1 0 12s.5 3.8 1.4 5.5l4-3.1z"/><path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.5l4 3.1c.9-2.8 3.5-4.8 6.6-4.8z"/></svg>
          Google
        </button>
      </div>
      <div className="rounded-3xl p-7 md:p-8 text-white flex flex-col justify-between" style={{ background: 'linear-gradient(155deg, #18181B 0%, #27272A 55%, #312E81 100%)' }}>
        <div>
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center mb-6"><span className="af-display font-bold text-sm">A</span></div>
          <h2 className="af-display font-bold text-2xl leading-snug mb-3">One account, every roadmap.</h2>
          <p className="text-sm text-zinc-300 leading-relaxed">Track lessons completed, pick up exactly where you left off, and move between Cybersecurity, AI, Design, and Tools without losing progress.</p>
        </div>
        <div className="space-y-4 mt-8 pt-6 border-t border-white/10">
          {[
            { Icon: Shield, label: '4 guided learning tracks' },
            { Icon: Trophy, label: '24+ hands-on lessons' },
            { Icon: Sparkles, label: 'Free to use, always' },
          ].map(({ Icon, label }, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-zinc-200">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0"><Icon size={13} strokeWidth={2.3} /></div>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- legal / about pages ---------------------------------- */
function LegalHeader({ Icon, title, subtitle }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-zinc-100">
          <Icon size={18} className="text-zinc-700" strokeWidth={2.3} />
        </div>
        <h1 className="af-display text-2xl font-bold text-zinc-900">{title}</h1>
      </div>
      {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
    </div>
  );
}

function LegalSection({ title, children }) {
  return (
    <section className="mb-7">
      <h2 className="af-display text-sm font-bold text-zinc-900 mb-2">{title}</h2>
      <div className="space-y-3 text-sm text-zinc-600 leading-relaxed">{children}</div>
    </section>
  );
}

function AboutPage() {
  usePageTitle('About');
  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <LegalHeader Icon={Info} title="About Acarpo" subtitle="What this site is, and who's behind it." />

      <LegalSection title="What Acarpo is">
        <p>Acarpo is an independent, self-paced learning site built by Philemon. It's organized around four guided roadmaps — Cybersecurity Fundamentals, AI & Machine Learning, Graphic Design Essentials, and Tools & Productivity Tips — plus a blog, a curated tools directory, a hands-on security lab, and a documentation reference for HTML, CSS, and JavaScript.</p>
        <p>The goal is simple: make it obvious what to learn next, explain it without unnecessary jargon, and give you somewhere to actually practice instead of just reading about it.</p>
      </LegalSection>

      <LegalSection title="What you'll find here">
        <ul className="list-disc pl-5 space-y-1.5">
          <li><span className="font-semibold text-zinc-800">Roadmaps</span> — ordered, unlockable lessons across four subjects</li>
          <li><span className="font-semibold text-zinc-800">Blog</span> — longer articles that go deeper on specific topics</li>
          <li><span className="font-semibold text-zinc-800">Tools</span> — a directory of real software used by cybersecurity professionals</li>
          <li><span className="font-semibold text-zinc-800">Security Lab</span> — safe, simulated capture-the-flag challenges</li>
          <li><span className="font-semibold text-zinc-800">Docs</span> — a quick-reference guide to HTML, CSS, and JavaScript</li>
          <li><span className="font-semibold text-zinc-800">Linker</span> — a hand-picked list of useful external links and software</li>
        </ul>
      </LegalSection>

      <LegalSection title="Get in touch">
        <p>Questions, corrections, or ideas for the site are always welcome — see the <Link to="/contact" className="underline hover:text-zinc-800">Contact page</Link> for how to reach out.</p>
      </LegalSection>
    </div>
  );
}

function PrivacyPage() {
  usePageTitle('Privacy Policy');
  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <LegalHeader Icon={ShieldCheck} title="Privacy Policy" subtitle="Last updated: September 2026" />

      <LegalSection title="Information we collect">
        <p>If you create an account, we store the details you provide (such as your name and email) and your roadmap progress, so you can pick up lessons where you left off. We don't require an account to browse the site, read the blog, or use the Security Lab.</p>
        <p>Basic technical information — such as your browser type and pages visited — may be collected automatically through standard web server logs and analytics tools, if enabled.</p>
      </LegalSection>

      <LegalSection title="How we use information">
        <p>Account details are used solely to operate the site: authenticating you, saving progress, and responding to support requests. We do not sell personal data to third parties.</p>
      </LegalSection>

      <LegalSection title="Cookies & third-party services">
        <p>This site may use cookies for essential functionality (like staying signed in) and, if enabled, for analytics or advertising — including services like Google AdSense, which may use cookies to serve relevant ads and measure performance. Any such service operates under its own privacy policy in addition to this one.</p>
      </LegalSection>

      <LegalSection title="Data retention">
        <p>Account and progress data is retained for as long as your account is active. You can request deletion of your data at any time via the Contact page.</p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>Depending on your location, you may have rights to access, correct, or delete your personal data, and to object to certain processing. Reach out via the Contact page to exercise any of these rights.</p>
      </LegalSection>

      <LegalSection title="Children's privacy">
        <p>Acarpo is not directed at children under 13, and we do not knowingly collect personal information from them.</p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>This policy may be updated occasionally to reflect changes to the site or applicable law. Material changes will be reflected by updating the date at the top of this page.</p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>Questions about this policy can be sent via the <Link to="/contact" className="underline hover:text-zinc-800">Contact page</Link>.</p>
      </LegalSection>
    </div>
  );
}

function TermsPage() {
  usePageTitle('Terms of Service');
  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <LegalHeader Icon={FileText} title="Terms of Service" subtitle="Last updated: September 2026" />

      <LegalSection title="Acceptance of terms">
        <p>By using Acarpo, you agree to these terms. If you don't agree, please don't use the site.</p>
      </LegalSection>

      <LegalSection title="Use of the site">
        <p>Acarpo is provided for personal, educational use. You agree not to misuse the site — including attempting to disrupt its operation, scraping content at scale without permission, or using any account other than your own.</p>
      </LegalSection>

      <LegalSection title="Security Lab & educational content">
        <p>The Security Lab, roadmap lessons, and any related content are educational simulations only. Nothing on Acarpo runs against a real backend, database, or third-party system — every "vulnerability" you interact with exists solely within your own browser session for teaching purposes.</p>
        <p>Any technique discussed or practiced on this site should only ever be used against systems you own or are explicitly authorized to test. Acarpo is not responsible for how information learned here is applied elsewhere.</p>
      </LegalSection>

      <LegalSection title="Accounts">
        <p>You're responsible for keeping your account credentials secure and for any activity under your account. Let us know right away via the Contact page if you suspect unauthorized access.</p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>Site content — including written articles, roadmap material, and site design — belongs to Acarpo unless otherwise credited (such as photography, which is attributed to its original photographer). Tool and third-party names referenced on the site belong to their respective owners.</p>
      </LegalSection>

      <LegalSection title="No warranty">
        <p>Acarpo is provided "as is," without warranties of any kind. We work to keep information accurate, but we don't guarantee the site will be error-free, uninterrupted, or suitable for every purpose.</p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>To the fullest extent permitted by law, Acarpo isn't liable for indirect, incidental, or consequential damages arising from your use of the site.</p>
      </LegalSection>

      <LegalSection title="Changes to these terms">
        <p>These terms may be updated from time to time. Continuing to use the site after a change means you accept the updated terms.</p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>Questions about these terms can be sent via the <Link to="/contact" className="underline hover:text-zinc-800">Contact page</Link>.</p>
      </LegalSection>
    </div>
  );
}

function ContactPage() {
  usePageTitle('Contact');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <LegalHeader Icon={Mail} title="Contact" subtitle="Questions, corrections, or ideas — all welcome." />

      {sent ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-sm text-emerald-800">
          Thanks — your message has been noted. There's no live backend wired up to this form yet, so nothing was actually sent; use the GitHub link below in the meantime.
        </div>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="bg-white border border-zinc-200 rounded-2xl p-5 space-y-3.5 mb-6"
        >
          <div>
            <label className="text-xs font-semibold text-zinc-700 mb-1 block">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-zinc-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-700 mb-1 block">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-zinc-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-700 mb-1 block">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="What's on your mind?"
              rows={4}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-zinc-400"
            />
          </div>
          <button type="submit" className="bg-zinc-900 text-white text-sm font-bold rounded-xl py-2.5 px-5">
            Send message
          </button>
        </form>
      )}

      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5">
        <p className="text-sm font-semibold text-zinc-800 mb-1">Prefer GitHub?</p>
        <p className="text-xs text-zinc-500 mb-2">Open an issue directly on the project's repository — this is the fastest way to report a bug or suggest a change.</p>
        <a href="https://github.com/Philemon12421/Acarpo-by-Philemon" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-zinc-900 underline">
          github.com/Philemon12421/Acarpo-by-Philemon
        </a>
      </div>
    </div>
  );
}

function NotFoundPage() {
  usePageTitle('Page not found');
  return (
    <div className="max-w-2xl mx-auto px-5 py-16 text-center">
      <h1 className="af-display text-2xl font-bold text-zinc-900 mb-2">Page not found</h1>
      <p className="text-sm text-zinc-500 mb-5">That page doesn’t exist — it may have moved.</p>
      <Link to="/" className="text-sm font-semibold text-zinc-900 underline">Back to home</Link>
    </div>
  );
}

/* --------------------------------- footer --------------------------------- */
function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white px-5 py-6 mt-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
        <p>© 2026 Acarpo Web — built by Drenchack Tech Company</p>
        <div className="flex gap-4">
          <Link to="/about" className="hover:text-zinc-700">About</Link>
          <Link to="/privacy" className="hover:text-zinc-700">Privacy</Link>
          <Link to="/terms" className="hover:text-zinc-700">Terms</Link>
          <Link to="/contact" className="hover:text-zinc-700">Contact</Link>
          <a href="https://github.com/Philemon12421/Acarpo-by-Philemon" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-700">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------- app ------------------------------------ */
function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState({ cybersecurity: [], ai: [], design: [], tools: [] });

  const handleComplete = (trackKey, nodeId) => {
    setProgress((prev) => ({
      ...prev,
      [trackKey]: prev[trackKey].includes(nodeId) ? prev[trackKey] : [...prev[trackKey], nodeId],
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-50 af-body">
      <GlobalStyle />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Routes>
        <Route path="/" element={<HomePage progress={progress} />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/linker" element={<LinkerPage />} />
        <Route path="/roadmaps" element={<Navigate to="/roadmaps/cybersecurity" replace />} />
        <Route path="/roadmaps/:track" element={<RoadmapsPage progress={progress} onComplete={handleComplete} />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) loader.remove();
  }, []);

  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
