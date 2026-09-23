import React, { useState, useEffect } from 'react';
import { X, Printer, Shield } from 'lucide-react';

const NAME_KEY = 'acarpo:certificate-name';

export default function Certificate({ trackTitle, accent, lessonCount, onClose }) {
  const [name, setName] = useState(() => {
    try { return localStorage.getItem(NAME_KEY) || ''; } catch { return ''; }
  });
  const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    try { localStorage.setItem(NAME_KEY, name); } catch { /* ignore */ }
  }, [name]);

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(24,24,27,0.55)', zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
        <div className="flex justify-end mb-2 print:hidden">
          <button onClick={onClose} aria-label="Close" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-zinc-500">
            <X size={16} />
          </button>
        </div>

        <div className="certificate-print bg-white rounded-2xl p-8 sm:p-10" style={{ border: `3px solid ${accent}` }}>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: accent }}>
              <Shield size={15} color="#fff" strokeWidth={2.5} />
            </div>
            <span className="af-display font-bold text-zinc-900 text-sm">Acarpo</span>
          </div>

          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">Certificate of Completion</p>
          <p className="text-center text-sm text-zinc-500 mb-1">This certifies that</p>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full text-center af-display text-2xl font-bold text-zinc-900 mb-1 border-b-2 border-dashed border-zinc-200 focus:outline-none focus:border-zinc-400 py-1 print:border-none"
          />

          <p className="text-center text-sm text-zinc-500 mt-3 mb-1">has successfully completed the</p>
          <p className="text-center af-display text-lg font-bold mb-6" style={{ color: accent }}>{trackTitle}</p>

          <div className="flex items-center justify-between text-xs text-zinc-400 pt-6 border-t border-zinc-100">
            <span>{lessonCount} lessons completed</span>
            <span>{today}</span>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full mt-3 bg-zinc-900 text-white text-sm font-bold rounded-xl py-2.5 flex items-center justify-center gap-2 print:hidden"
        >
          <Printer size={15} /> Print / Save as PDF
        </button>
      </div>
    </div>
  );
}
