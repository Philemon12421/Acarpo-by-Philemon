import React, { useState, useEffect } from 'react';
import { Award, Lock, Shield, Brain, Palette, Wrench, FlaskConical, Sparkles } from 'lucide-react';
import { ROADMAPS } from './data.js';

const TRACK_ICONS = { Shield, Palette, Wrench, Brain };
const LAB_KEY = 'acarpo:lab-solved';
const LAB_TOTAL = 5; // keep in sync with CHALLENGES.length in LabPage.jsx

function loadLabSolved() {
  try {
    const raw = localStorage.getItem(LAB_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function Badge({ Icon, title, desc, unlocked, accent }) {
  return (
    <div
      className="rounded-2xl p-4 border flex items-start gap-3"
      style={{
        background: unlocked ? `${accent}0D` : '#FAFAFA',
        borderColor: unlocked ? `${accent}40` : '#E4E4E7',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: unlocked ? accent : '#E4E4E7' }}
      >
        {unlocked ? <Icon size={18} color="#fff" strokeWidth={2.3} /> : <Lock size={16} color="#A1A1AA" />}
      </div>
      <div>
        <p className={`af-display font-semibold text-sm ${unlocked ? 'text-zinc-900' : 'text-zinc-400'}`}>{title}</p>
        <p className="text-xs text-zinc-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function AchievementsPage({ progress }) {
  const [labSolved, setLabSolved] = useState(loadLabSolved);

  useEffect(() => {
    document.title = 'Achievements — Acarpo';
    // Lab progress lives in its own localStorage key (set from LabPage), so
    // re-read it whenever this page is focused in case it changed elsewhere.
    const onFocus = () => setLabSolved(loadLabSolved());
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  const trackBadges = Object.entries(ROADMAPS).map(([key, track]) => {
    const done = (progress[key] || []).length;
    return {
      key,
      Icon: TRACK_ICONS[track.iconName],
      title: `${track.title.split(' ')[0]} Complete`,
      desc: `Finish every lesson in ${track.title}.`,
      unlocked: done === track.nodes.length,
      accent: track.accent,
    };
  });

  const allTracksDone = trackBadges.every((b) => b.unlocked);

  const labBadges = [
    { title: 'First Flag', desc: 'Capture your first flag in the Security Lab.', unlocked: labSolved.length >= 1, accent: '#4338CA', Icon: FlaskConical },
    { title: 'Lab Complete', desc: `Capture all ${LAB_TOTAL} flags in the Security Lab.`, unlocked: labSolved.length >= LAB_TOTAL, accent: '#4338CA', Icon: Award },
  ];

  const totalBadges = trackBadges.length + 1 + labBadges.length;
  const unlockedCount = trackBadges.filter((b) => b.unlocked).length + (allTracksDone ? 1 : 0) + labBadges.filter((b) => b.unlocked).length;

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-100">
          <Award size={18} className="text-amber-600" strokeWidth={2.3} />
        </div>
        <h1 className="af-display text-2xl font-bold text-zinc-900">Achievements</h1>
      </div>
      <p className="text-sm text-zinc-500 mb-2 max-w-xl">
        Badges unlock automatically as you make progress on roadmaps and the Security Lab \u2014
        nothing to claim, they just light up.
      </p>
      <p className="text-xs text-zinc-400 mb-8">{unlockedCount}/{totalBadges} unlocked</p>

      <h2 className="af-display text-sm font-bold text-zinc-900 mb-3">Roadmap tracks</h2>
      <div className="grid gap-3 sm:grid-cols-2 mb-8">
        {trackBadges.map((b) => <Badge key={b.key} {...b} />)}
        <Badge
          Icon={Sparkles}
          title="All Tracks Complete"
          desc="Finish every lesson across all four roadmaps."
          unlocked={allTracksDone}
          accent="#111827"
        />
      </div>

      <h2 className="af-display text-sm font-bold text-zinc-900 mb-3">Security Lab</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {labBadges.map((b, i) => <Badge key={i} {...b} />)}
      </div>
    </div>
  );
}
