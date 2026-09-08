import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, Search, Code2 } from 'lucide-react';
import { DOCS } from './docsData.js';

const LANGS = [
  { key: 'html', ...DOCS.html },
  { key: 'css', ...DOCS.css },
  { key: 'js', ...DOCS.js },
];

function CodeBlock({ code }) {
  return (
    <pre className="bg-zinc-900 rounded-lg p-3 mt-2 overflow-x-auto">
      <code className="text-[11px] font-mono text-emerald-300 whitespace-pre">{code}</code>
    </pre>
  );
}

function DocItem({ item, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white">
      <button onClick={() => setOpen(!open)} className="w-full text-left px-4 py-3 flex items-center justify-between gap-3">
        <code className="text-xs font-mono font-semibold text-zinc-900">{item.name}</code>
        <span className="text-[10px] text-zinc-400 shrink-0">{open ? 'Hide' : 'Show'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>
          <CodeBlock code={item.code} />
        </div>
      )}
    </div>
  );
}

export default function DocsPage() {
  const [active, setActive] = useState('html');
  const [query, setQuery] = useState('');
  const lang = LANGS.find((l) => l.key === active);

  useEffect(() => {
    document.title = `${lang.label} Docs — Acarpo`;
  }, [lang]);

  const filteredSections = useMemo(() => {
    if (!query.trim()) return lang.sections;
    const q = query.toLowerCase();
    return lang.sections
      .map((s) => ({ ...s, items: s.items.filter((i) => i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)) }))
      .filter((s) => s.items.length > 0);
  }, [lang, query]);

  const totalItems = lang.sections.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${lang.color}1A` }}>
          <BookOpen size={18} style={{ color: lang.color }} strokeWidth={2.3} />
        </div>
        <h1 className="af-display text-2xl font-bold text-zinc-900">Docs</h1>
      </div>
      <p className="text-sm text-zinc-500 mb-6 max-w-xl">
        A clean, practical reference for HTML, CSS, and JavaScript fundamentals — the core
        elements, properties, and patterns worth actually knowing, each with a short example.
      </p>

      <div className="flex gap-2 mb-5">
        {LANGS.map((l) => (
          <button
            key={l.key}
            onClick={() => { setActive(l.key); setQuery(''); }}
            className="px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5"
            style={active === l.key
              ? { background: l.color, borderColor: l.color, color: '#fff' }
              : { background: '#fff', borderColor: '#E4E4E7', color: '#71717A' }}
          >
            <Code2 size={13} /> {l.label}
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${lang.label} reference...`}
          className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-zinc-400"
        />
      </div>

      <p className="text-[11px] text-zinc-400 mb-4">
        {filteredSections.reduce((sum, s) => sum + s.items.length, 0)} of {totalItems} entries
      </p>

      <div className="space-y-8">
        {filteredSections.map((section) => (
          <div key={section.title}>
            <h2 className="af-display text-sm font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: lang.color }} />
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <DocItem key={item.name} item={item} accent={lang.color} />
              ))}
            </div>
          </div>
        ))}
        {filteredSections.length === 0 && (
          <p className="text-sm text-zinc-400">No entries match that search.</p>
        )}
      </div>
    </div>
  );
}
