import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, Wrench, Link2, Map, BookOpen } from 'lucide-react';
import { ROADMAPS, BLOG_POSTS } from './data.js';
import { TOOLS } from './toolsData.js';
import { LINKS } from './linksData.js';
import { DOCS } from './docsData.js';

// Opened either by clicking the header search button (dispatches this event)
// or by pressing Cmd/Ctrl+K anywhere on the site.
export const OPEN_SEARCH_EVENT = 'acarpo:open-search';

const TYPE_META = {
  Blog: { Icon: FileText, color: '#4338CA' },
  Roadmap: { Icon: Map, color: '#7C3AED' },
  Tool: { Icon: Wrench, color: '#059669' },
  Link: { Icon: Link2, color: '#71717A' },
  Docs: { Icon: BookOpen, color: '#CA8A04' },
};

function buildIndex() {
  const index = [];

  BLOG_POSTS.forEach((p) => {
    index.push({ type: 'Blog', label: p.title, sublabel: p.excerpt, to: `/blog/${p.id}` });
  });

  Object.entries(ROADMAPS).forEach(([key, track]) => {
    track.nodes.forEach((n) => {
      index.push({ type: 'Roadmap', label: n.title, sublabel: track.title, to: `/roadmaps/${key}` });
    });
  });

  TOOLS.forEach((t) => {
    index.push({ type: 'Tool', label: t.name, sublabel: t.desc, to: '/tools', state: { presetQuery: t.name } });
  });

  LINKS.forEach((l) => {
    index.push({ type: 'Link', label: l.name, sublabel: l.desc, to: '/linker', state: { presetQuery: l.name } });
  });

  Object.entries(DOCS).forEach(([langKey, lang]) => {
    lang.sections.forEach((section) => {
      section.items.forEach((item) => {
        index.push({ type: 'Docs', label: item.name, sublabel: `${lang.label} \u2014 ${section.title}`, to: `/docs?lang=${langKey}&q=${encodeURIComponent(item.name)}` });
      });
    });
  });

  return index;
}

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const index = useMemo(buildIndex, []);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    const keyHandler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener(OPEN_SEARCH_EVENT, openHandler);
    window.addEventListener('keydown', keyHandler);
    return () => {
      window.removeEventListener(OPEN_SEARCH_EVENT, openHandler);
      window.removeEventListener('keydown', keyHandler);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter((r) => r.label.toLowerCase().includes(q) || r.sublabel.toLowerCase().includes(q) || r.type.toLowerCase().includes(q))
      .slice(0, 30);
  }, [query, index]);

  const grouped = useMemo(() => {
    const map = {};
    results.forEach((r) => { (map[r.type] = map[r.type] || []).push(r); });
    return map;
  }, [results]);

  const go = (r) => {
    navigate(r.to.split('?')[0] + (r.to.includes('?') ? '?' + r.to.split('?')[1] : ''), r.state ? { state: r.state } : undefined);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{ position: 'fixed', inset: 0, background: 'rgba(24,24,27,0.45)', zIndex: 60, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '10vh 16px 16px' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-lg overflow-hidden"
        style={{ maxHeight: '70vh', display: 'flex', flexDirection: 'column' }}
      >
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-zinc-100">
          <Search size={16} className="text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, blog posts, tools, links, docs..."
            className="flex-1 text-sm focus:outline-none"
          />
          <button onClick={() => setOpen(false)} aria-label="Close search" className="text-zinc-400 shrink-0">
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto px-2 py-2">
          {!query.trim() && (
            <p className="text-xs text-zinc-400 px-2 py-3">Start typing to search across the whole site. Press <kbd className="px-1 py-0.5 bg-zinc-100 rounded text-[10px]">Esc</kbd> to close.</p>
          )}
          {query.trim() && results.length === 0 && (
            <p className="text-xs text-zinc-400 px-2 py-3">No matches for "{query}".</p>
          )}
          {Object.entries(grouped).map(([type, items]) => {
            const { Icon, color } = TYPE_META[type];
            return (
              <div key={type} className="mb-2">
                <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-400 px-2 py-1.5">{type}</p>
                {items.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => go(r)}
                    className="w-full text-left flex items-start gap-2.5 px-2 py-2 rounded-lg hover:bg-zinc-50"
                  >
                    <Icon size={14} style={{ color }} className="mt-0.5 shrink-0" />
                    <span>
                      <span className="block text-sm font-medium text-zinc-800 leading-snug">{r.label}</span>
                      <span className="block text-xs text-zinc-400 leading-snug line-clamp-1">{r.sublabel}</span>
                    </span>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
