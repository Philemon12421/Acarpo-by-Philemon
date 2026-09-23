import React, { useState, useEffect } from 'react';
import { FlaskConical, Check, Terminal, Trophy, Award } from 'lucide-react';

// ---------------------------------------------------------------------------
// Acarpo Security Lab
// Every challenge here is a self-contained simulation that runs entirely in
// the visitor's own browser tab. There is no real backend, no real database,
// and no network request involved in "solving" anything — solving a
// challenge means recognizing a pattern (a SQLi bypass string, an XSS payload
// shape, an IDOR parameter, etc.) and submitting the resulting flag. Nothing
// here can be pointed at another system; it only demonstrates the concept
// against itself.
// ---------------------------------------------------------------------------

function FlagSubmit({ solved, onCheck, placeholder = 'ACARPO{...}' }) {
  const [value, setValue] = useState('');
  const [wrong, setWrong] = useState(false);
  if (solved) {
    return (
      <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
        <Check size={15} strokeWidth={3} /> Flag captured
      </div>
    );
  }
  return (
    <div>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => { setValue(e.target.value); setWrong(false); }}
          placeholder={placeholder}
          className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-zinc-400"
        />
        <button
          onClick={() => { const ok = onCheck(value.trim()); if (!ok) setWrong(true); }}
          className="px-3.5 py-2 bg-zinc-900 text-white text-xs font-bold rounded-lg shrink-0"
        >
          Submit
        </button>
      </div>
      {wrong && <p className="text-[11px] text-red-500 mt-1.5">Not quite — keep looking.</p>}
    </div>
  );
}

/* ---- Challenge 1: SQL Injection login bypass ---- */
function SqliChallenge({ solved, onSolve }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState(null);

  const tryLogin = () => {
    const bypass = /'\s*or\s*'?1'?\s*=\s*'?1|--|;--|'\s*or\s*true/i.test(user) || /'\s*or\s*'?1'?\s*=\s*'?1/i.test(pass);
    if (bypass) {
      setMsg({ ok: true, text: 'Query returned a row. Login bypassed without a valid password.' });
      if (!solved) onSolve();
    } else {
      setMsg({ ok: false, text: 'Access denied: no matching user/password pair.' });
    }
  };

  return (
    <div>
      <p className="text-xs text-zinc-500 mb-3">
        This login form builds its query by pasting your input straight into a SQL string
        (simulated). Find an input that makes the query true regardless of the real password.
      </p>
      <div className="bg-zinc-900 rounded-lg p-3 mb-3 font-mono text-[11px] text-emerald-400 overflow-x-auto">
        SELECT * FROM users WHERE username='{user || '...'}' AND password='{pass || '...'}'
      </div>
      <div className="space-y-2 mb-3">
        <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="username" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-zinc-400" />
        <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="password" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-zinc-400" />
      </div>
      <button onClick={tryLogin} className="px-3.5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg mb-2">Attempt login</button>
      {msg && <p className={`text-[11px] mb-2 ${msg.ok ? 'text-emerald-600' : 'text-red-500'}`}>{msg.text}</p>}
    </div>
  );
}

/* ---- Challenge 2: Reflected XSS payload recognition ---- */
function XssChallenge({ onSolve, solved }) {
  const [q, setQ] = useState('');
  const looksLikePayload = /<script/i.test(q) || /onerror\s*=/i.test(q) || /onload\s*=/i.test(q) || /javascript:/i.test(q);

  React.useEffect(() => {
    if (looksLikePayload && !solved) onSolve();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [looksLikePayload]);

  return (
    <div>
      <p className="text-xs text-zinc-500 mb-3">
        This mock "search" reflects whatever you type back onto the page (simulated, not actually
        rendered as live HTML here). Craft an input that would execute as script in a real
        unescaped reflection — recognizing the shape of the payload is what matters.
      </p>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search this site..."
        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono mb-2 focus:outline-none focus:border-zinc-400"
      />
      <div className="bg-zinc-100 rounded-lg p-3 text-xs text-zinc-600 mb-2">
        Results for: <span className="font-mono">{q || '(nothing yet)'}</span>
      </div>
    </div>
  );
}

/* ---- Challenge 3: Broken access control / IDOR ---- */
function IdorChallenge({ onSolve, solved }) {
  const [id, setId] = useState(2);
  const accounts = {
    1: { name: 'admin', role: 'Administrator', secret: 'root access enabled' },
    2: { name: 'you', role: 'Standard user', secret: 'nothing interesting here' },
  };
  const acct = accounts[id] || { name: `user${id}`, role: 'Unknown', secret: 'no data' };
  const isAdmin = id === 1;

  React.useEffect(() => {
    if (isAdmin && !solved) onSolve();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  return (
    <div>
      <p className="text-xs text-zinc-500 mb-3">
        You're logged in as account <code className="font-mono bg-zinc-100 px-1 rounded">2</code>.
        The "view account" endpoint takes an id directly from the URL/param with no ownership
        check (simulated). Try a different id.
      </p>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-zinc-500">?account_id=</span>
        <input type="number" value={id} onChange={(e) => setId(Number(e.target.value))} className="w-20 bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-1.5 text-xs font-mono focus:outline-none focus:border-zinc-400" />
      </div>
      <div className="bg-zinc-100 rounded-lg p-3 text-xs text-zinc-700 space-y-0.5">
        <p><span className="text-zinc-400">name:</span> {acct.name}</p>
        <p><span className="text-zinc-400">role:</span> {acct.role}</p>
        <p><span className="text-zinc-400">secret:</span> {acct.secret}</p>
      </div>
    </div>
  );
}

/* ---- Challenge 4: DOM recon ---- */
function ReconChallenge({ onSolve, solved }) {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <p className="text-xs text-zinc-500 mb-3">
        A flag is hidden in this page's DOM in an element that isn't visually shown. Open your
        browser's DevTools (F12 or right-click → Inspect) and look through the elements inside
        this card.
      </p>
      <div style={{ display: 'none' }} data-flag="ACARPO{d0m_1nsp3ct10n_101}">
        hidden-flag-marker
      </div>
      <button
        onClick={() => setChecked(true)}
        className="px-3.5 py-2 border border-zinc-200 text-zinc-700 text-xs font-bold rounded-lg mb-2"
      >
        I don't see it in the DOM
      </button>
      {checked && <p className="text-[11px] text-zinc-400 mb-2">Hint: look for a <code className="font-mono">data-flag</code> attribute.</p>}
    </div>
  );
}

/* ---- Challenge 5: Decode the secret ---- */
function DecodeChallenge({ onSolve, solved }) {
  const encoded = btoa('ACARPO{b4s3_64_1s_n0t_3ncrypt10n}');
  return (
    <div>
      <p className="text-xs text-zinc-500 mb-3">
        A "secure" system stored this flag encoded, not encrypted. Decode it and submit the
        plaintext.
      </p>
      <div className="bg-zinc-900 rounded-lg p-3 font-mono text-[11px] text-amber-300 break-all mb-2">{encoded}</div>
    </div>
  );
}

const HINT_PENALTY = 20;

const CHALLENGES = [
  { id: 'sqli', title: 'SQL Injection: Login Bypass', category: 'Web – Injection', diff: 'Easy',
    vulnerability: 'SQL Injection',
    objective: 'Log in as a user without knowing a valid password, by making the underlying query always evaluate as true.',
    hint: 'Think about what makes a WHERE clause always true. Try closing the string early with a quote, then adding a condition like OR \'1\'=\'1\'.',
    flag: 'ACARPO{sql_1nj3ct10n_byp4ss}', Comp: SqliChallenge, points: 100 },
  { id: 'xss', title: 'Reflected XSS Payload', category: 'Web – Client-Side', diff: 'Easy',
    vulnerability: 'Cross-Site Scripting (XSS)',
    objective: 'Enter a value in the search box shaped like a real XSS payload — something that would execute as script if this page reflected it unescaped.',
    hint: 'A classic payload that doesn\u2019t even need a real <script> tag: an <img> tag with a broken src and an onerror handler.',
    flag: 'ACARPO{xss_r3fl3ct3d}', Comp: XssChallenge, points: 100 },
  { id: 'idor', title: 'Broken Access Control (IDOR)', category: 'Web – Access Control', diff: 'Medium',
    vulnerability: 'Insecure Direct Object Reference (IDOR)',
    objective: "You're account #2. View the data belonging to account #1 by changing the id parameter, with no other authorization check in place.",
    hint: 'There\u2019s nothing clever needed here — just change the number in the id field and see what account it loads.',
    flag: 'ACARPO{1d0r_broken_acc3ss}', Comp: IdorChallenge, points: 150 },
  { id: 'recon', title: 'DOM Reconnaissance', category: 'Recon', diff: 'Easy',
    vulnerability: 'Information Disclosure',
    objective: 'Use your browser\u2019s DevTools to inspect this page\u2019s DOM and find a flag sitting in an element that isn\u2019t visually displayed.',
    hint: 'Right-click anywhere on this card and choose "Inspect". Look for a `display: none` element with a data-flag attribute.',
    flag: 'ACARPO{d0m_1nsp3ct10n_101}', Comp: ReconChallenge, points: 75 },
  { id: 'decode', title: 'Decode the Secret', category: 'Cryptography', diff: 'Easy',
    vulnerability: 'Weak Encoding (mistaken for encryption)',
    objective: 'Decode a Base64 string to recover the plaintext flag hidden inside it.',
    hint: 'Base64 isn\u2019t encryption \u2014 any online "Base64 decode" tool, or your browser console\u2019s atob() function, will reverse it instantly.',
    flag: 'ACARPO{b4s3_64_1s_n0t_3ncrypt10n}', Comp: DecodeChallenge, points: 75 },
];

function ChallengeCard({ challenge, solved, onSolve, hintUsed, onHintUsed }) {
  const [open, setOpen] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const { Comp } = challenge;
  const [autoSolved, setAutoSolved] = useState(solved);

  const markSolved = () => { if (!autoSolved) { setAutoSolved(true); onSolve(challenge.id); } };
  const checkFlag = (value) => {
    if (value === challenge.flag) { markSolved(); return true; }
    return false;
  };
  const revealHint = () => {
    setHintOpen(true);
    if (!hintUsed) onHintUsed(challenge.id);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full text-left p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${solved ? 'bg-emerald-100' : 'bg-zinc-100'}`}>
            {solved ? <Check size={16} className="text-emerald-600" strokeWidth={3} /> : <Terminal size={16} className="text-zinc-500" />}
          </div>
          <div>
            <h3 className="af-display font-semibold text-sm text-zinc-900">{challenge.title}</h3>
            <p className="text-[11px] text-zinc-400">
              {challenge.category} · {challenge.diff} · {solved && hintUsed ? `${challenge.points - HINT_PENALTY}/${challenge.points} pts (hint used)` : `${challenge.points} pts`}
            </p>
          </div>
        </div>
        <span className="text-xs text-zinc-400">{open ? 'Hide' : 'Open'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-zinc-100 pt-4">
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3 mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-600 mb-1">
              Testing: {challenge.vulnerability}
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              <span className="font-semibold text-zinc-800">Objective — </span>{challenge.objective}
            </p>
          </div>
          <Comp onSolve={markSolved} solved={solved} />
          <div className="mt-3 pt-3 border-t border-zinc-100">
            <FlagSubmit solved={solved} onCheck={checkFlag} />
          </div>
          {!solved && (
            <div className="mt-3">
              {!hintOpen ? (
                <button onClick={revealHint} className="text-[11px] font-semibold text-amber-600 hover:text-amber-700">
                  Show hint (\u2212{HINT_PENALTY} pts if used)
                </button>
              ) : (
                <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-100 rounded-lg p-2.5">{challenge.hint}</p>
              )}
            </div>
          )}
          {solved && hintUsed && (
            <p className="text-[11px] text-zinc-400 mt-3">Hint was used on this challenge \u2014 scored at {challenge.points - HINT_PENALTY} pts.</p>
          )}
        </div>
      )}
    </div>
  );
}

const LAB_KEY = 'acarpo:lab-solved';
const HINTS_KEY = 'acarpo:lab-hints';
const LEADERBOARD_KEY = 'acarpo:lab-leaderboard';

function loadSolved() {
  try {
    const raw = localStorage.getItem(LAB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadHints() {
  try {
    const raw = localStorage.getItem(HINTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadLeaderboard() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function Leaderboard({ earnedPoints, solvedCount, total }) {
  const [entries, setEntries] = useState(loadLeaderboard);
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  const save = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const next = [...entries, { name: trimmed, points: earnedPoints, flags: solvedCount, date: new Date().toISOString().slice(0, 10) }]
      .sort((a, b) => b.points - a.points)
      .slice(0, 10);
    setEntries(next);
    try { localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    setSaved(true);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 mt-8">
      <div className="flex items-center gap-2 mb-1">
        <Award size={16} className="text-amber-500" />
        <p className="af-display text-sm font-bold text-zinc-900">Leaderboard</p>
      </div>
      <p className="text-[11px] text-zinc-400 mb-4">
        Saved on this device only \u2014 there's no shared backend, so this isn't a global ranking, just your own past runs on this browser.
      </p>

      {!saved && solvedCount > 0 && (
        <div className="flex gap-2 mb-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-zinc-400"
          />
          <button onClick={save} className="px-3.5 py-2 bg-zinc-900 text-white text-xs font-bold rounded-lg shrink-0">
            Save score ({earnedPoints} pts)
          </button>
        </div>
      )}
      {saved && <p className="text-xs text-emerald-600 font-semibold mb-4">Score saved below.</p>}

      {entries.length === 0 ? (
        <p className="text-xs text-zinc-400">No scores saved yet on this device.</p>
      ) : (
        <div className="space-y-1.5">
          {entries.map((e, i) => (
            <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-zinc-50 last:border-0">
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-500">{i + 1}</span>
                <span className="font-medium text-zinc-800">{e.name}</span>
              </span>
              <span className="text-zinc-400">{e.flags}/{total} flags · <span className="font-semibold text-zinc-700">{e.points} pts</span></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LabPage() {
  const [solvedIds, setSolvedIds] = useState(loadSolved);
  const [hintsUsed, setHintsUsed] = useState(loadHints);

  useEffect(() => {
    try { localStorage.setItem(LAB_KEY, JSON.stringify(solvedIds)); } catch { /* ignore */ }
  }, [solvedIds]);

  useEffect(() => {
    try { localStorage.setItem(HINTS_KEY, JSON.stringify(hintsUsed)); } catch { /* ignore */ }
  }, [hintsUsed]);

  const handleSolve = (id) => setSolvedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const handleHintUsed = (id) => setHintsUsed((prev) => (prev.includes(id) ? prev : [...prev, id]));

  const totalPoints = CHALLENGES.reduce((sum, c) => sum + c.points, 0);
  const earnedPoints = CHALLENGES
    .filter((c) => solvedIds.includes(c.id))
    .reduce((sum, c) => sum + (hintsUsed.includes(c.id) ? c.points - HINT_PENALTY : c.points), 0);
  const pct = Math.round((solvedIds.length / CHALLENGES.length) * 100);
  const allSolved = solvedIds.length === CHALLENGES.length;

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#4338CA1A' }}>
          <FlaskConical size={18} style={{ color: '#4338CA' }} strokeWidth={2.3} />
        </div>
        <h1 className="af-display text-2xl font-bold text-zinc-900">Security Lab</h1>
      </div>
      <p className="text-sm text-zinc-500 mb-2 max-w-xl">
        A hands-on, capture-the-flag style lab. Every challenge below is a simulation that runs
        only in your browser — there's no real server or database behind any of it, so nothing
        you do here touches a live system. That also means the techniques you practice should
        only ever be used against systems you own or are explicitly authorized to test.
      </p>
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-6 mt-4">
        <p className="text-xs font-semibold text-indigo-900 mb-1">How this works</p>
        <p className="text-xs text-indigo-800 leading-relaxed">
          Open a challenge below to see exactly what vulnerability it's testing and what you need
          to do — each one states its goal up front, so you're never guessing what "solving" it
          means. Find the flag (it looks like <code className="font-mono">ACARPO&#123;...&#125;</code>) and paste it into that
          challenge's submit box to mark it complete. Stuck? Each challenge has an optional hint,
          at a small points cost.
        </p>
      </div>

      <div className="flex items-center gap-3 mt-6 mb-8">
        <div className="flex-1 h-2 rounded-full bg-zinc-200 overflow-hidden">
          <div className="h-full rounded-full bg-indigo-600 transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs font-semibold text-zinc-500 shrink-0">
          {solvedIds.length}/{CHALLENGES.length} flags · {earnedPoints}/{totalPoints} pts
        </span>
      </div>

      {allSolved && (
        <div className="bg-zinc-900 text-white rounded-2xl p-5 mb-6 flex items-center gap-3">
          <Trophy size={20} className="text-amber-400 shrink-0" />
          <div>
            <p className="af-display font-bold text-sm">All flags captured</p>
            <p className="text-xs text-zinc-400">You've cleared every challenge in this lab. Nice work.</p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {CHALLENGES.map((c) => (
          <ChallengeCard
            key={c.id}
            challenge={c}
            solved={solvedIds.includes(c.id)}
            onSolve={handleSolve}
            hintUsed={hintsUsed.includes(c.id)}
            onHintUsed={handleHintUsed}
          />
        ))}
      </div>

      <Leaderboard earnedPoints={earnedPoints} solvedCount={solvedIds.length} total={CHALLENGES.length} />
    </div>
  );
}
