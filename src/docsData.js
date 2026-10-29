import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BookOpen, Search, Code2, Copy, Check, ExternalLink, ChevronDown,
  Lightbulb, AlertTriangle, Link2, ChevronsUpDown, ListTree,
} from 'lucide-react';
import { DOCS } from './docsData.js';

const LANGS = Object.entries(DOCS).map(([key, value]) => ({ key, ...value }));
const TOTAL_ENTRIES = LANGS.reduce(
  (n, l) => n + l.sections.reduce((m, s) => m + s.items.length, 0),
  0
);

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function itemMatches(item, q) {
  const hay = [
    item.name, item.desc, item.syntax, item.code,
    ...(item.params || []).flat(),
    ...(item.tips || []),
    ...(item.pitfalls || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return hay.includes(q);
}

/* ---------- small building blocks ---------- */

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      /* clipboard unavailable (e.g. insecure context) - fail silently */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied' : 'Copy code'}
      className="absolute top-2 right-2 p-1.5 rounded-md bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition"
    >
      {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
    </button>
  );
}

function CodeBlock({ code, label }) {
  return (
    <div className="relative mt-2">
      {label && (
        <div className="text-[10px] uppercase tracking-wider text-zinc-400 mb-1 font-semibold">{label}</div>
      )}
      <div className="relative">
        <pre className="bg-zinc-900 rounded-lg p-3 pr-10 overflow-x-auto">
          <code className="text-[11px] leading-relaxed font-mono text-emerald-300 whitespace-pre">{code}</code>
        </pre>
        <CopyButton text={code} />
      </div>
    </div>
  );
}

function Bullets({ icon: Icon, title, items, tone }) {
  if (!items || items.length === 0) return null;
  const tones = {
    tip: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    warn: 'bg-amber-50 border-amber-200 text-amber-900',
  };
  return (
    <div className={`mt-3 rounded-lg border px-3 py-2.5 ${tones[tone]}`}>
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide mb-1">
        <Icon size={12} /> {title}
      </div>
      <ul className="list-disc pl-4 space-y-0.5">
        {items.map((t, i) => (
          <li key={i} className="text-xs leading-relaxed">{t}</li>
        ))}
      </ul>
    </div>
  );
}

function DocItem({ item, color, autoOpen, forceOpen }) {
  const [open, setOpen] = useState(!!autoOpen);

  useEffect(() => {
    if (forceOpen) setOpen(forceOpen.value);
  }, [forceOpen]);

  const panelId = `panel-${slug(item.name)}`;

  return (
    <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 hover:bg-zinc-50 transition"
      >
        <span className="min-w-0">
          <code className="text-xs font-mono font-semibold text-zinc-900 break-words">{item.name}</code>
          {!open && (
            <span className="block text-[11px] text-zinc-500 mt-0.5 line-clamp-1">{item.desc}</span>
          )}
        </span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-zinc-400 transition-transform ${open ? 'rotate-180' : ''}`}
          style={open ? { color } : undefined}
        />
      </button>

      {open && (
        <div id={panelId} className="px-4 pb-4">
          <p className="text-xs text-zinc-600 leading-relaxed">{item.desc}</p>

          {item.syntax && <CodeBlock code={item.syntax} label="Syntax" />}

          {item.params && item.params.length > 0 && (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-xs border border-zinc-200 rounded-lg overflow-hidden">
                <thead className="bg-zinc-50 text-zinc-500">
                  <tr>
                    <th className="px-3 py-1.5 font-semibold w-1/3">Name</th>
                    <th className="px-3 py-1.5 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {item.params.map(([n, d]) => (
                    <tr key={n} className="border-t border-zinc-100 align-top">
                      <td className="px-3 py-1.5"><code className="font-mono text-[11px] text-zinc-900">{n}</code></td>
                      <td className="px-3 py-1.5 text-zinc-600">{d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {item.code && <CodeBlock code={item.code} label="Example" />}

          <Bullets icon={Lightbulb} title="Best practices" items={item.tips} tone="tip" />
          <Bullets icon={AlertTriangle} title="Common pitfalls" items={item.pitfalls} tone="warn" />

          {item.see && item.see.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-500">
              <Link2 size={12} /> See also:
              {item.see.map((s) => (
                <span key={s} className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 font-mono">{s}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- page ---------- */

export default function DocsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialLang = LANGS.some((l) => l.key === searchParams.get('lang')) ? searchParams.get('lang') : 'html';
  const [active, setActive] = useState(initialLang);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [scope, setScope] = useState('current'); // 'current' | 'all'
  const [forceOpen, setForceOpen] = useState(null);
  const lang = LANGS.find((l) => l.key === active) || LANGS[0];
  const exactQ = searchParams.get('q');

  useEffect(() => {
    document.title = `${lang.label} Docs — Acarpo`;
  }, [lang]);

  useEffect(() => {
    const next = { lang: active };
    if (query.trim()) next.q = query.trim();
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, query]);

  const q = query.trim().toLowerCase();

  const filteredSections = useMemo(() => {
    if (!q) return lang.sections;
    return lang.sections
      .map((s) => ({ ...s, items: s.items.filter((i) => itemMatches(i, q)) }))
      .filter((s) => s.items.length > 0);
  }, [lang, q]);

  const globalResults = useMemo(() => {
    if (!q || scope !== 'all') return [];
    return LANGS.map((l) => ({
      lang: l,
      items: l.sections.flatMap((s) => s.items.filter((i) => itemMatches(i, q)).map((i) => ({ ...i, section: s.title }))),
    })).filter((r) => r.items.length > 0);
  }, [q, scope]);

  const totalItems = lang.sections.reduce((sum, s) => sum + s.items.length, 0);
  const shownItems = filteredSections.reduce((sum, s) => sum + s.items.length, 0);

  const setAll = useCallback((value) => setForceOpen({ value, n: Date.now() }), []);

  const scrollToSection = (title) => {
    const el = document.getElementById(`sec-${slug(title)}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openFromGlobal = (langKey, name) => {
    setActive(langKey);
    setScope('current');
    setQuery(name);
  };

  const showingGlobal = scope === 'all' && q;

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 flex flex-col md:flex-row gap-8">
      {/* ---------- left rail ---------- */}
      <aside className="w-full md:w-72 shrink-0 space-y-6 md:sticky md:top-6 md:self-start md:max-h-[calc(100vh-3rem)] md:overflow-y-auto pr-1">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${lang.color}1A` }}>
              <BookOpen size={18} style={{ color: lang.color }} strokeWidth={2.3} />
            </div>
            <h1 className="af-display text-2xl font-bold text-zinc-900">Docs</h1>
          </div>
          <p className="text-sm text-zinc-500 max-w-xl">
            A practical developer reference covering {LANGS.length} languages and tools — {TOTAL_ENTRIES}+ entries,
            each with syntax, examples, best practices and common pitfalls.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Languages and tools">
          {LANGS.map((l) => (
            <button
              key={l.key}
              type="button"
              role="tab"
              aria-selected={active === l.key}
              onClick={() => { setActive(l.key); setQuery(''); setScope('current'); }}
              className="px-3 py-1.5 rounded-lg text-[11px] font-bold border flex items-center gap-1"
              style={active === l.key
                ? { background: l.color, borderColor: l.color, color: l.textOnColor || '#fff' }
                : { background: '#fff', borderColor: '#E4E4E7', color: '#71717A' }}
            >
              <Code2 size={12} /> {l.label}
            </button>
          ))}
        </div>

        <div>
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={scope === 'all' ? 'Search all docs...' : `Search ${lang.label} reference...`}
              aria-label="Search documentation"
              className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-zinc-400"
            />
          </div>
          <label className="flex items-center gap-2 mt-2 text-xs text-zinc-500 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={scope === 'all'}
              onChange={(e) => setScope(e.target.checked ? 'all' : 'current')}
            />
            Search across all languages
          </label>
        </div>

        {!showingGlobal && (
          <nav aria-label={`${lang.label} sections`}>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-zinc-400 mb-2">
              <ListTree size={12} /> On this page
            </div>
            <ul className="space-y-0.5">
              {filteredSections.map((s) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(s.title)}
                    className="w-full text-left text-xs text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md px-2 py-1.5 flex justify-between gap-2"
                  >
                    <span className="truncate">{s.title}</span>
                    <span className="text-zinc-400 shrink-0">{s.items.length}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </aside>

      {/* ---------- content ---------- */}
      <main className="flex-1 min-w-0 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
        {showingGlobal ? (
          <>
            <p className="text-[11px] text-zinc-400 mb-4">
              {globalResults.reduce((n, r) => n + r.items.length, 0)} results for &ldquo;{query}&rdquo; across {globalResults.length} languages
            </p>
            <div className="space-y-6">
              {globalResults.map((r) => (
                <div key={r.lang.key}>
                  <h2 className="af-display text-sm font-bold text-zinc-900 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: r.lang.color }} />
                    {r.lang.label}
                  </h2>
                  <div className="space-y-2">
                    {r.items.slice(0, 8).map((i) => (
                      <button
                        key={`${r.lang.key}-${i.section}-${i.name}`}
                        type="button"
                        onClick={() => openFromGlobal(r.lang.key, i.name)}
                        className="w-full text-left border border-zinc-200 rounded-xl px-4 py-3 hover:bg-zinc-50"
                      >
                        <code className="text-xs font-mono font-semibold text-zinc-900">{i.name}</code>
                        <span className="block text-[11px] text-zinc-500 mt-0.5 line-clamp-2">{i.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {globalResults.length === 0 && <p className="text-sm text-zinc-400">No entries match that search.</p>}
            </div>
          </>
        ) : (
          <>
            {/* language overview */}
            <header className="mb-6 pb-6 border-b border-zinc-100">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="af-display text-xl font-bold text-zinc-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: lang.color }} />
                  {lang.label}
                </h2>
                {lang.docsUrl && (
                  <a
                    href={lang.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold flex items-center gap-1 hover:underline"
                    style={{ color: lang.color === '#F7DF1E' ? '#A16207' : lang.color === '#000000' ? '#18181B' : lang.color }}
                  >
                    Official documentation <ExternalLink size={12} />
                  </a>
                )}
              </div>
              {lang.tagline && <p className="text-sm font-medium text-zinc-700 mt-1">{lang.tagline}</p>}
              {lang.about && <p className="text-xs text-zinc-600 leading-relaxed mt-2">{lang.about}</p>}
              {lang.facts && (
                <dl className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {lang.facts.map(([k, v]) => (
                    <div key={k} className="bg-zinc-50 rounded-lg px-3 py-2">
                      <dt className="text-[10px] uppercase tracking-wide text-zinc-400 font-semibold">{k}</dt>
                      <dd className="text-xs text-zinc-800 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {lang.getStarted && <CodeBlock code={lang.getStarted} label="Getting started" />}
            </header>

            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <p className="text-[11px] text-zinc-400">{shownItems} of {totalItems} entries</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAll(true)}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 flex items-center gap-1"
                >
                  <ChevronsUpDown size={12} /> Expand all
                </button>
                <button
                  type="button"
                  onClick={() => setAll(false)}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                >
                  Collapse all
                </button>
              </div>
            </div>

            <div className="space-y-8">
              {filteredSections.map((section) => (
                <section key={section.title} id={`sec-${slug(section.title)}`} className="scroll-mt-6">
                  <h3 className="af-display text-sm font-bold text-zinc-900 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: lang.color }} />
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <DocItem
                        key={`${lang.key}-${item.name}`}
                        item={item}
                        color={lang.color}
                        autoOpen={item.name === exactQ}
                        forceOpen={forceOpen}
                      />
                    ))}
                  </div>
                </section>
              ))}
              {filteredSections.length === 0 && (
                <p className="text-sm text-zinc-400">
                  No entries match that search. Try the &ldquo;Search across all languages&rdquo; option.
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
