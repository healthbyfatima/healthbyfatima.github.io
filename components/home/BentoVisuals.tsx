'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { Camera, Film, Mic, Plus } from 'lucide-react';
import { InstagramIcon, StoriesIcon, YoutubeIcon } from '@/components/icons/Social';
import { useLiveMotion, useLoop } from '@/lib/useLoop';
import { LOGO } from '@/lib/site';
import { cn } from '@/lib/cn';

/* 1 · Orbit — inner ring 60s, outer ring 80s reversed; labels stay upright. */

type OrbitLabel = { angle: number; icon: ReactNode; label: string };

function OrbitRing({ radius, labels, spin }: { radius: number; labels: OrbitLabel[]; spin: MotionValue<number> }) {
  const upright = useTransform(spin, (v) => -v);
  return (
    <motion.div className="o-spin" style={{ rotate: spin }}>
      {labels.map((l) => (
        <div key={l.label} className="o-pos" style={{ transform: `rotate(${l.angle}deg) translateX(${radius}px) rotate(${-l.angle}deg)` }}>
          <motion.div className="o-spin" style={{ rotate: upright }}>
            <div className="o-label">
              <span className="icon-circle sm">{l.icon}</span>
              {l.label}
            </div>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

export function Orbit({ youtube, reels, stories, collab, backstage }: Record<'youtube' | 'reels' | 'stories' | 'collab' | 'backstage', string>) {
  const { ref, active } = useLiveMotion();
  const inner = useLoop(active, 60);
  const outer = useLoop(active, 80);
  const innerDeg = useTransform(inner, (p) => p * 360);
  const outerDeg = useTransform(outer, (p) => -p * 360);
  return (
    <div ref={ref} className="vis orbit" aria-hidden>
      <div className="orbit-c">
        <div className="o-ring r4" />
        <div className="o-ring r3" />
        <div className="o-ring r2" />
        <div className="o-ring r1" />
        <OrbitRing
          radius={140}
          spin={innerDeg}
          labels={[
            { angle: 205, icon: <YoutubeIcon />, label: youtube },
            { angle: 325, icon: <Film className="ic sm" />, label: reels },
            { angle: 85, icon: <StoriesIcon />, label: stories }
          ]}
        />
        <OrbitRing
          radius={205}
          spin={outerDeg}
          labels={[
            { angle: 250, icon: <InstagramIcon />, label: collab },
            { angle: 10, icon: <Camera className="ic sm" />, label: backstage }
          ]}
        />
        <div className="orbit-core">
          <Image src={LOGO.src} alt="" width={LOGO.width} height={LOGO.height} />
        </div>
      </div>
    </div>
  );
}

/* 2 · Marquee — 3 rows, 38s / 44s (reversed) / 52s, fade-mask at the edges. */

const MQ_ROWS = [
  { seconds: 38, reverse: false },
  { seconds: 44, reverse: true },
  { seconds: 52, reverse: false }
];

function MarqueeRow({ chips, seconds, reverse, active }: { chips: string[]; seconds: number; reverse: boolean; active: boolean }) {
  const p = useLoop(active, seconds);
  const x = useTransform(p, (v) => `${(reverse ? v - 1 : -v) * 100}%`);
  const track = (
    <>
      {chips.map((c) => (
        <span key={c} className="chip chip-static">
          <Plus className="ic sm" />
          {c}
        </span>
      ))}
    </>
  );
  return (
    <div className="mq-row">
      <motion.div className="mq-track" style={{ x }}>
        {track}
      </motion.div>
      <motion.div className="mq-track" style={{ x }}>
        {track}
      </motion.div>
    </div>
  );
}

export function Marquee({ rows }: { rows: string[][] }) {
  const { ref, active } = useLiveMotion();
  return (
    <div ref={ref} className="marquee" aria-hidden>
      {rows.map((chips, i) => (
        <MarqueeRow key={i} chips={chips} active={active} {...MQ_ROWS[i % MQ_ROWS.length]} />
      ))}
    </div>
  );
}

/* 3 · Vertical carousel — one step up every 2.2s; the centre item is enlarged and lit. */

const VC_POS: Record<string, string> = { '0': 'p0', '-1': 'pm1', '1': 'pp1', '-2': 'pm2', '2': 'pp2' };

export function VerticalCarousel({ topics }: { topics: string[] }) {
  const { ref, active } = useLiveMotion();
  const items = [...topics, ...topics];
  const n = items.length;
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % n), 2200);
    return () => clearInterval(id);
  }, [active, n]);
  return (
    <div ref={ref} className="vis vc" aria-hidden>
      {items.map((label, i) => {
        let d = (i - idx + n) % n;
        if (d > n / 2) d -= n;
        return (
          <div key={i} className={cn('vc-item', VC_POS[String(d)] ?? (d < 0 ? 'pm3' : 'pp3'))}>
            {label}
          </div>
        );
      })}
    </div>
  );
}

/* 4 · Tree — light flows down four curves (stroke-dashoffset, 2.6s, staggered 0.4s). */

const TREE_PATHS = ['M260 0 C260 60 65 50 65 110', 'M260 0 C260 60 195 50 195 110', 'M260 0 C260 60 325 50 325 110', 'M260 0 C260 60 455 50 455 110'];
const FLOW_SECONDS = 2.6;
const DASH = 178;

function FlowPath({ d, delay, progress }: { d: string; delay: number; progress: MotionValue<number> }) {
  const offset = useTransform(progress, (p) => {
    const local = (((p - delay / FLOW_SECONDS) % 1) + 1) % 1;
    return DASH * (1 - local);
  });
  return <motion.path className="flow" d={d} style={{ strokeDashoffset: offset }} />;
}

export function Tree({ top, leaves }: { top: string; leaves: string[] }) {
  const { ref, active } = useLiveMotion();
  const p = useLoop(active, FLOW_SECONDS);
  const icons = [<YoutubeIcon key="y" />, <InstagramIcon key="i" />, <Film key="r" className="ic sm" aria-hidden />, <StoriesIcon key="s" />];
  return (
    <div ref={ref} className="vis tree">
      <div className="tree-top">
        <span className="icon-circle primary">
          <Mic className="ic lg" aria-hidden />
        </span>
        <span style={{ fontSize: 14, fontWeight: 700 }}>{top}</span>
      </div>
      <svg className="lines" viewBox="0 0 520 110" preserveAspectRatio="none" aria-hidden>
        {TREE_PATHS.map((d) => (
          <path key={d} className="base" vectorEffect="non-scaling-stroke" d={d} />
        ))}
        {TREE_PATHS.map((d, i) => (
          <FlowPath key={d} d={d} delay={i * 0.4} progress={p} />
        ))}
      </svg>
      <ul className="tree-leaves" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {leaves.map((l, i) => (
          <li key={l} className="leaf">
            <span className="icon-circle sm">{icons[i]}</span>
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 5 · Shield — the glow behind it "breathes" every 4s. */

export function Shield() {
  const { ref, active } = useLiveMotion();
  const p = useLoop(active, 4);
  // 0.88 → 1.08 → 0.88 and 0.65 → 1 → 0.65, eased like ease-in-out.
  const wave = useTransform(p, (v) => (1 - Math.cos(v * 2 * Math.PI)) / 2);
  const scale = useTransform(wave, (w) => 0.88 + 0.2 * w);
  const opacity = useTransform(wave, (w) => 0.65 + 0.35 * w);
  return (
    <div ref={ref} className="shield-wrap" style={{ background: 'var(--grad-card)' }} aria-hidden>
      <motion.div className="breath" style={{ scale, opacity }} />
      <svg viewBox="0 0 200 230">
        <defs>
          <linearGradient id="shield-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3D6BFF" />
            <stop offset="1" stopColor="#1B3BD6" />
          </linearGradient>
        </defs>
        <path
          d="M100 10 L180 40 V110 C180 160 145 195 100 218 C55 195 20 160 20 110 V40 Z"
          fill="url(#shield-grad)"
          stroke="rgba(120,150,255,0.6)"
          strokeWidth="2"
        />
        <path d="M62 114 L90 142 L142 88" stroke="#FFFFFF" strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
