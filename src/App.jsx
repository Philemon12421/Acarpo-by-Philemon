import React, { useState, useMemo } from 'react';
import {
  Shield, Check, Lock, Play, Trophy, Search, Mail, KeyRound, Eye, EyeOff,
  Sparkles, Palette, Wrench, Brain, ArrowRight, Clock, Menu, X, ShieldCheck,
} from 'lucide-react';

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

// Turns raw node content + a list of completed ids into nodes with a derived
// status. Nothing is "done" until the user actually completes it, and only
// the first not-yet-completed node is unlocked ('current') at any time.
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
  const [selectedId, setSelectedId] = useState(
    nodes.find((n) => n.status === 'current')?.id ?? nodes[0].id
  );
  const ROW_H = 128, TOP_PAD = 60, WIDTH = 400;
  const height = TOP_PAD + nodes.length * ROW_H + 30;

  const points = useMemo(
    () => nodes.map((n, i) => ({ x: WIDTH / 2 + Math.sin(i * 0.85) * 106, y: TOP_PAD + i * ROW_H })),
    [nodes]
  );
  const pathD = pathFromPoints(points);
  const doneCount = nodes.filter((n) => n.status === 'done').length;
  const pct = Math.round((doneCount / nodes.length) * 100);
  const selected = nodes.find((n) => n.id === selectedId) ?? nodes[0];

  return (
    <div className="af-body">
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
            return (
              <g key={node.id}>
                {isCurrent && <circle cx={p.x} cy={p.y} r={r} fill={accent} className="af-pulse" />}
                <foreignObject x={p.x - r} y={p.y - r} width={r * 2} height={r * 2}>
                  <button
                    onClick={() => !isLocked && setSelectedId(node.id)}
                    disabled={isLocked}
                    aria-label={node.title}
                    className="af-node"
                    style={{
                      width: '100%', height: '100%', borderRadius: '9999px', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      border: `2.5px solid ${isLocked ? '#D4D4D8' : accent}`,
                      background: isDone || isCurrent ? accent : '#FFFFFF',
                      cursor: isLocked ? 'not-allowed' : 'pointer',
                      boxShadow: selectedId === node.id && !isLocked ? `0 0 0 4px ${accent}33` : 'none',
                    }}
                  >
                    {isLocked && <Lock size={15} color="#A1A1AA" strokeWidth={2.3} />}
                    {isDone && !node.capstone && <Check size={17} color="#FFFFFF" strokeWidth={3} />}
                    {isCurrent && <Play size={14} color="#FFFFFF" strokeWidth={2.5} fill="#FFFFFF" />}
                    {node.capstone && !isLocked && <Trophy size={16} color="#FFFFFF" strokeWidth={2.3} />}
                  </button>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      {selected && (
        <div className="max-w-sm mx-auto mt-1">
          <div className="bg-white rounded-2xl border border-zinc-200 p-4">
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 className="af-display font-semibold text-zinc-900 text-sm leading-snug">{selected.title}</h3>
              <span
                className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0"
                style={{ background: selected.status === 'locked' ? '#F4F4F5' : `${accent}1A`, color: selected.status === 'locked' ? '#A1A1AA' : accent }}
              >
                {selected.status === 'done' ? 'Completed' : selected.status === 'current' ? 'Not started' : 'Locked'}
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed mb-3">{selected.desc}</p>
            {selected.status === 'current' && (
              <button
                onClick={() => onComplete(selected.id)}
                className="text-xs font-semibold text-white px-3.5 py-2 rounded-lg"
                style={{ background: accent }}
              >
                Mark lesson complete
              </button>
            )}
            {selected.status === 'done' && (
              <p className="text-[11px] font-semibold" style={{ color: accent }}>\u2713 Completed \u2014 next lesson is unlocked below.</p>
            )}
            {selected.status === 'locked' && (
              <p className="text-[11px] text-zinc-400">Complete the lesson above to unlock this.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* --------------------------------- data ---------------------------------- */
// Content only \u2014 no status here. Every user starts at zero; progress is
// tracked separately in App state and derived with deriveNodes().
const ROADMAPS = {
  cybersecurity: {
    title: 'Cybersecurity Fundamentals', subtitle: 'From security basics to hardening a real app', accent: '#4338CA', Icon: Shield,
    nodes: [
      { id: 1, title: 'Security Mindset 101', desc: 'Threat modeling: assets, actors, attack surfaces.' },
      { id: 2, title: 'Password & Auth Hygiene', desc: 'Hashing, salting, MFA \u2014 and why weak reuse fails.' },
      { id: 3, title: 'Network Fundamentals', desc: 'TCP/IP, firewalls, and how traffic actually moves.' },
      { id: 4, title: 'OWASP Top 10 Overview', desc: 'The most common web app vulnerability classes.' },
      { id: 5, title: 'SQL Injection & Input Validation', desc: 'How injection happens, and how parameterized queries stop it.' },
      { id: 6, title: 'Cross-Site Scripting (XSS)', desc: 'Stored vs reflected XSS, and safe output encoding.' },
      { id: 7, title: 'Social Engineering & Phishing', desc: 'Spotting pretexting, spoofed domains, urgency tricks.' },
      { id: 8, title: 'Incident Response Basics', desc: 'Contain, eradicate, recover \u2014 the first-hour checklist.' },
      { id: 9, title: 'Capstone: Harden a Sample App', desc: 'Apply it all to lock down a deliberately vulnerable demo.', capstone: true },
    ],
  },
  ai: {
    title: 'AI & Machine Learning', subtitle: 'From prompting basics to shipping an AI feature', accent: '#7C3AED', Icon: Brain,
    nodes: [
      { id: 1, title: 'What LLMs Actually Do', desc: 'Tokens, context windows, and why models hallucinate.' },
      { id: 2, title: 'Prompting Fundamentals', desc: 'Clear instructions, examples, and structured output.' },
      { id: 3, title: 'Retrieval-Augmented Generation', desc: 'Grounding responses in your own documents.' },
      { id: 4, title: 'Tool Use & Agents', desc: 'Letting a model call functions and take actions.' },
      { id: 5, title: 'Evaluating Model Output', desc: 'Building test sets so quality is measurable.' },
      { id: 6, title: 'Capstone: Ship an AI Feature', desc: 'Wire a model into a real product flow.', capstone: true },
    ],
  },
  design: {
    title: 'Graphic Design Essentials', subtitle: 'From color theory to a portfolio-ready piece', accent: '#D97706', Icon: Palette,
    nodes: [
      { id: 1, title: 'Color Theory Basics', desc: 'Contrast, harmony, and building a palette that works.' },
      { id: 2, title: 'Typography Foundations', desc: 'Pairing typefaces and setting a real type scale.' },
      { id: 3, title: 'Layout & Grid Systems', desc: 'Structuring a page so the eye knows where to go.' },
      { id: 4, title: 'Branding & Identity', desc: 'Logos, marks, and consistent visual voice.' },
      { id: 5, title: 'Capstone: Design a Brand Kit', desc: 'Ship a small, cohesive identity system.', capstone: true },
    ],
  },
  tools: {
    title: 'Tools & Productivity Tips', subtitle: 'The workflow shortcuts that actually save time', accent: '#059669', Icon: Wrench,
    nodes: [
      { id: 1, title: 'Keyboard-First Workflows', desc: 'Cutting mouse trips out of your daily routine.' },
      { id: 2, title: 'Automation Basics', desc: 'When a script beats a repeated manual task.' },
      { id: 3, title: 'Version Control Habits', desc: 'Commits, branches, and not fearing git.' },
      { id: 4, title: 'Capstone: Automate a Chore', desc: 'Build one real automation you\u2019ll keep using.', capstone: true },
    ],
  },
};

const BLOG_POSTS = [
  { id: 1, cat: 'Cybersecurity', accent: '#4338CA', title: 'SQL Injection, Explained Without the Jargon', excerpt: 'What actually happens when input isn\u2019t sanitized, and why parameterized queries fix it for good.', author: 'Philemon', readTime: '5 min read', seed: 'cyber1' },
  { id: 2, cat: 'Cybersecurity', accent: '#4338CA', title: 'Phishing Emails: The Five Tells', excerpt: 'Domain spoofing, urgency language, and other patterns worth training your eye on.', author: 'Philemon', readTime: '4 min read', seed: 'cyber2' },
  { id: 3, cat: 'AI & ML', accent: '#7C3AED', title: 'Prompting Like You Mean It', excerpt: 'Structure, examples, and constraints \u2014 the three levers that actually move output quality.', author: 'Philemon', readTime: '6 min read', seed: 'ai1' },
  { id: 4, cat: 'AI & ML', accent: '#7C3AED', title: 'RAG in Plain English', excerpt: 'How retrieval-augmented generation keeps a model grounded in your own data.', author: 'Philemon', readTime: '5 min read', seed: 'ai2' },
  { id: 5, cat: 'Graphic Design', accent: '#D97706', title: 'Picking a Palette That Isn\u2019t Generic', excerpt: 'A quick framework for choosing 4\u20136 colors that actually say something.', author: 'Philemon', readTime: '4 min read', seed: 'design1' },
  { id: 6, cat: 'Graphic Design', accent: '#D97706', title: 'Type Pairing 101', excerpt: 'How to combine a display face and a body face without it looking accidental.', author: 'Philemon', readTime: '5 min read', seed: 'design2' },
  { id: 7, cat: 'Tools', accent: '#059669', title: 'Automate the Boring 20%', excerpt: 'A simple test for deciding when a repeated task is worth scripting.', author: 'Philemon', readTime: '3 min read', seed: 'tools1' },
  { id: 8, cat: 'Tools', accent: '#059669', title: 'Git Habits That Save Future You', excerpt: 'Small commit discipline that makes debugging six months from now painless.', author: 'Philemon', readTime: '4 min read', seed: 'tools2' },
];

/* --------------------------------- pages ---------------------------------- */
function Header({ page, setPage, menuOpen, setMenuOpen }) {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'blog', label: 'Blog' },
    { id: 'roadmaps', label: 'Roadmaps' },
    { id: 'auth', label: 'Sign In' },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-zinc-200 px-5 py-3.5">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <button onClick={() => setPage('home')} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
            <span className="af-display text-white font-bold text-sm">A</span>
          </div>
          <span className="af-display font-bold text-zinc-900 text-sm">Acarpo</span>
        </button>
        <nav className="hidden sm:flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setPage(t.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${page === t.id ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <button className="sm:hidden text-zinc-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="sm:hidden flex flex-col gap-1 mt-3 pt-3 border-t border-zinc-100">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => { setPage(t.id); setMenuOpen(false); }}
              className={`text-left px-3 py-2 rounded-lg text-sm font-semibold ${page === t.id ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-500'}`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function HomePage({ setPage, setActiveRoadmap, progress }) {
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
          Bite-sized lessons laid out as a path you can actually see yourself moving through, plus a blog to go deeper on anything that catches your eye.
        </p>
        <div className="flex gap-3">
          <button onClick={() => setPage('roadmaps')} className="px-4 py-2.5 bg-zinc-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5">
            Start a roadmap <ArrowRight size={14} />
          </button>
          <button onClick={() => setPage('blog')} className="px-4 py-2.5 bg-white border border-zinc-200 text-zinc-700 text-xs font-bold rounded-xl">
            Browse the blog
          </button>
        </div>
      </section>

      <section>
        <h2 className="af-display text-lg font-bold text-zinc-900 mb-4">Pick a track</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(ROADMAPS).map(([key, r]) => {
            const doneCount = (progress[key] || []).length;
            return (
              <button
                key={key}
                onClick={() => { setActiveRoadmap(key); setPage('roadmaps'); }}
                className="af-card text-left bg-white border border-zinc-200 rounded-2xl p-4"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${r.accent}1A` }}>
                  <r.Icon size={18} style={{ color: r.accent }} strokeWidth={2.3} />
                </div>
                <h3 className="af-display font-semibold text-sm text-zinc-900 mb-1">{r.title}</h3>
                <p className="text-xs text-zinc-500">{doneCount}/{r.nodes.length} lessons \u00b7 {doneCount === 0 ? 'not started' : 'in progress'}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="af-display text-lg font-bold text-zinc-900">Latest from the blog</h2>
          <button onClick={() => setPage('blog')} className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
            View all <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {BLOG_POSTS.slice(0, 3).map((p) => <BlogCard key={p.id} post={p} />)}
        </div>
      </section>
    </div>
  );
}

function BlogCard({ post }) {
  return (
    <article className="af-card bg-white border border-zinc-200 rounded-2xl overflow-hidden">
      <img src={`https://picsum.photos/seed/${post.seed}/480/280`} alt="" className="w-full h-36 object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: post.accent }}>{post.cat}</span>
          <span className="text-[10px] text-zinc-400 flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
        </div>
        <h3 className="af-display font-semibold text-sm text-zinc-900 mb-1.5 leading-snug">{post.title}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed mb-3">{post.excerpt}</p>
        <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-3 border-t border-zinc-100">
          <span>{post.author}</span>
          <span className="font-semibold" style={{ color: post.accent }}>Read \u2192</span>
        </div>
      </div>
    </article>
  );
}

function BlogPage() {
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
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-zinc-400"
        />
      </div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${cat === c ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-500 border-zinc-200'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => <BlogCard key={p.id} post={p} />)}
        {filtered.length === 0 && <p className="text-sm text-zinc-400 col-span-full">No posts match that search.</p>}
      </div>
    </div>
  );
}

function RoadmapsPage({ active, setActive, progress, onComplete }) {
  const track = ROADMAPS[active];
  const nodes = deriveNodes(track.nodes, progress[active] || []);
  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="af-display text-2xl font-bold text-zinc-900 mb-1">Roadmaps</h1>
      <p className="text-sm text-zinc-500 mb-6">Pick a track and work top to bottom. Everything starts locked except the first lesson.</p>
      <div className="flex gap-2 mb-8 flex-wrap">
        {Object.entries(ROADMAPS).map(([key, r]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5"
            style={active === key
              ? { background: r.accent, borderColor: r.accent, color: '#fff' }
              : { background: '#fff', borderColor: '#E4E4E7', color: '#71717A' }}
          >
            <r.Icon size={14} /> {r.title.split(' ')[0]}
          </button>
        ))}
      </div>
      <div className="bg-white border border-zinc-200 rounded-3xl p-6">
        <RoadmapPath
          title={track.title}
          subtitle={track.subtitle}
          accent={track.accent}
          Icon={track.Icon}
          nodes={nodes}
          onComplete={(nodeId) => onComplete(active, nodeId)}
        />
      </div>
    </div>
  );
}

const SECURITY_TIPS = [
  'Use a password manager and unique passwords per site',
  'Turn on multi-factor authentication everywhere it\u2019s offered',
  'Check the sender domain before clicking any link in email',
  'Keep your OS and browser updated \u2014 patches close real holes',
  'Never enter credentials on a page you reached via a link, type the URL',
];

function AuthPage() {
  const [mode, setMode] = useState('signin');
  const [showPw, setShowPw] = useState(false);
  return (
    <div className="max-w-4xl mx-auto px-5 py-10 grid md:grid-cols-2 gap-8 items-start">
      <div className="bg-white border border-zinc-200 rounded-3xl p-7">
        <div className="flex gap-1 bg-zinc-100 p-1 rounded-xl mb-6 w-fit">
          <button onClick={() => setMode('signin')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold ${mode === 'signin' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'}`}>Sign in</button>
          <button onClick={() => setMode('signup')} className={`px-4 py-1.5 rounded-lg text-xs font-semibold ${mode === 'signup' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'}`}>Sign up</button>
        </div>
        <h1 className="af-display text-xl font-bold text-zinc-900 mb-1">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-xs text-zinc-500 mb-6">
          {mode === 'signin' ? 'Pick up your roadmap where you left off.' : 'Start tracking progress across every track.'}
        </p>

        <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
          {mode === 'signup' && (
            <div>
              <label className="text-xs font-semibold text-zinc-700 mb-1 block">Name</label>
              <input type="text" placeholder="Your name" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-zinc-400" />
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-zinc-700 mb-1 block">Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="email" placeholder="you@example.com" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-none focus:border-zinc-400" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-700 mb-1 block">Password</label>
            <div className="relative">
              <KeyRound size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type={showPw ? 'text' : 'password'} placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-zinc-400" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-zinc-900 text-white text-sm font-bold rounded-xl py-2.5 mt-2">
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-7 text-white">
        <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center mb-4">
          <ShieldCheck size={18} strokeWidth={2.3} />
        </div>
        <h2 className="af-display font-bold text-lg mb-1">Good account hygiene</h2>
        <p className="text-xs text-zinc-400 mb-5">A few habits worth having before you sign up anywhere.</p>
        <ul className="space-y-3">
          {SECURITY_TIPS.map((tip, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-200">
              <Sparkles size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* --------------------------------- footer --------------------------------- */
function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white px-5 py-6 mt-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
        <p>\u00A9 2026 Acarpo Web \u2014 built by Drenchack Tech Company</p>
        <div className="flex gap-4">
         <a href="github.com/philemon12421" className="hover:text-zinc-700">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------- app ------------------------------------ */
export default function App() {
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRoadmap, setActiveRoadmap] = useState('cybersecurity');
  // progress[track] = array of completed node ids. Everyone starts at zero.
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
      <Header page={page} setPage={setPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {page === 'home' && <HomePage setPage={setPage} setActiveRoadmap={setActiveRoadmap} progress={progress} />}
      {page === 'blog' && <BlogPage />}
      {page === 'roadmaps' && (
        <RoadmapsPage active={activeRoadmap} setActive={setActiveRoadmap} progress={progress} onComplete={handleComplete} />
      )}
      {page === 'auth' && <AuthPage />}
      <Footer />
    </div>
  );
}
