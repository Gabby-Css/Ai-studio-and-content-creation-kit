/* ============================================================================
   E6 — VIOLET MESH DECK   (Remotion)   traced to reference 3.mp4

   Its own world:
     GROUND    a LIVING violet mesh gradient #B9A2E8 -> #6B3FD4, slowly drifting (deterministic)
     ACCENT    violet #8B2FE0 · the working surface is a near-black card #101014
     TYPE      Archivo, lowercase, wide-tracked, light — a soft product-deck voice, never shouting
     TEXTURE   a fine dot-grid printed INSIDE the dark card face (regular matrix, not grain)
     DEPTH     a floating 16:9 rounded-rect SLAB with a heavy soft drop shadow — physically
               ABOVE the background, the only system in the set with real elevation
     SIGNATURE a line-chart that draws on with a GLOWING HEAD-DOT leading the stroke; pill
               labels pop as the dot passes each anchor; the finale grows macOS window chrome

   Nothing in the whole set shares its depth model (floating slab), its texture (printed dot
   matrix), or its ground (drifting mesh). It cannot be described with any other edit's sentence.
   ============================================================================ */
import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, delayRender, continueRender } from 'remotion';

const FONT_CSS = `
@font-face{ font-family:'Arch'; src:url('${staticFile('archivo.ttf')}') format('truetype'); font-display:block; }
@font-face{ font-family:'Mono'; src:url('${staticFile('courierprime.ttf')}') format('truetype'); font-display:block; }
`;
if (typeof document !== 'undefined' && !document.getElementById('__e6_fonts')) {
  const st = document.createElement('style'); st.id = '__e6_fonts'; st.textContent = FONT_CSS;
  document.head.appendChild(st);
  const h = delayRender('e6 fonts', { timeoutInMilliseconds: 180000 });
  let done = false; const rel = () => { if (!done){ done = true; continueRender(h); } };
  Promise.all([document.fonts.load('300 100px Arch'), document.fonts.load('400 40px Mono')]).then(rel).catch(rel);
  setTimeout(rel, 150000);
}

const C = { CARD:'#101014', VIOLET:'#8B2FE0', VLT2:'#B98BFF', INK:'#F3EEFB', DIM:'rgba(243,238,251,0.52)',
  GRID:'rgba(179,150,240,0.10)' };
const DISP = 'Arch, system-ui, sans-serif';
const MONO = 'Mono, monospace';

const POSTERIZE = (frame, fps) => { const s = Math.max(1, Math.round(fps / 12)); return Math.floor(frame / s) * s; };
const useT = () => { const { fps } = useVideoConfig(); return POSTERIZE(useCurrentFrame(), fps); };
const sp = (f, fps, d = 0, cfg) => spring({ frame: f - d, fps, config: cfg || { damping: 15, stiffness: 110, mass: 0.9 } });

/* line-chart geometry, computed in JS so no DOM ref is needed (SSR-safe, deterministic).
   returns the partial path drawn up to `prog` and the [x,y] of the leading head-dot. */
function chart(pts, prog) {
  const segLen = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    segLen.push(l); total += l;
  }
  const target = total * prog;
  let acc = 0, d = `M${pts[0][0]},${pts[0][1]}`, head = pts[0];
  for (let i = 1; i < pts.length; i++) {
    if (acc + segLen[i - 1] <= target) {
      d += ` L${pts[i][0]},${pts[i][1]}`; head = pts[i]; acc += segLen[i - 1];
    } else {
      const t = (target - acc) / segLen[i - 1];
      const hx = pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t;
      const hy = pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t;
      d += ` L${hx},${hy}`; head = [hx, hy]; break;
    }
  }
  return { d, head };
}

/* the drifting mesh ground — motion derived from posterized t, never random */
const Mesh = ({ f }) => {
  const a = Math.sin(f / 26) * 8, b = Math.cos(f / 34) * 7, c = Math.sin(f / 44) * 6;
  return (
    <AbsoluteFill style={{ background:
      `radial-gradient(60% 70% at ${30 + a}% ${28 + b}%, #C9B4F5 0%, rgba(201,180,245,0) 55%),
       radial-gradient(55% 65% at ${74 - a}% ${34 + c}%, #7C4BE0 0%, rgba(124,75,224,0) 52%),
       radial-gradient(70% 80% at ${50 + b}% ${82 - a}%, #5A2FB8 0%, rgba(90,47,184,0) 60%),
       linear-gradient(135deg, #B9A2E8 0%, #6B3FD4 100%)` }} />
  );
};

/* the floating dark card. `mode`: 'full' centred hero, 'mini' floated to a corner for overlay beats */
const Card = ({ f, fps, mode, children }) => {
  const s = sp(f, fps, 2, { damping: 16, stiffness: 100, mass: 1 });
  const full = mode !== 'mini';
  const W = full ? 1560 : 620, H = full ? 720 : 300;
  const x = full ? (1920 - W) / 2 : 130, y = full ? 200 : 700;
  const float = Math.sin(f / 22) * 6;
  return (
    <div style={{ position: 'absolute', left: x, top: y + float, width: W, height: H, borderRadius: 26,
      background: C.CARD, overflow: 'hidden', opacity: s,
      transform: `translateY(${(1 - s) * 30}px) scale(${0.96 + s * 0.04})`,
      boxShadow: '0 60px 120px rgba(20,8,44,0.55), 0 12px 40px rgba(20,8,44,0.4)' }}>
      {/* printed dot-grid inside the card face */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${C.GRID} 1.4px, transparent 1.4px)`,
        backgroundSize: '26px 26px' }} />
      {children}
    </div>
  );
};

const Kicker = ({ f, txt, dark }) => {
  const o = interpolate(f, [2, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  if (!txt) return null;
  return <div style={{ position: 'absolute', left: 60, top: 48, opacity: o, fontFamily: MONO,
    fontSize: 20, letterSpacing: 6, color: C.VLT2, textTransform: 'lowercase' }}>{txt}</div>;
};

/* ---- full-beat scene bodies live INSIDE the card ---- */
const ChartCard = ({ full, kicker, head, big, unit, pts, rising, pills }) => {
  const { fps } = useVideoConfig(); const f = useT();
  const prog = interpolate(sp(f, fps, 12, { damping: 26, stiffness: 70, mass: 1 }), [0, 1], [0, 1]);
  const { d, head: hd } = chart(pts, prog);
  const hs = sp(f, fps, 4);
  const s = big ? sp(f, fps, 8, { damping: 18, stiffness: 88, mass: 1.1 }) : 1;
  return (
    <AbsoluteFill>
      <Mesh f={f} />
      <Card f={f} fps={fps} mode="full">
        <Kicker f={f} txt={kicker} />
        <div style={{ position: 'absolute', left: 60, top: 110, fontFamily: DISP, fontWeight: 300,
          fontSize: 76, color: C.INK, letterSpacing: -1, textTransform: 'lowercase', opacity: hs,
          transform: `translateY(${(1 - hs) * 16}px)` }}>{head}</div>
        {big && (
          <div style={{ position: 'absolute', left: 60, top: 300, fontFamily: DISP, fontWeight: 300,
            fontSize: 260, lineHeight: 0.8, color: C.INK, letterSpacing: -6 }}>
            {big >= 1000 ? (big / 1000).toFixed(1) + 'k' : Math.round(s * big)}</div>
        )}
        {unit && <div style={{ position: 'absolute', left: 66, top: 590, fontFamily: MONO, fontSize: 22,
          letterSpacing: 3, color: C.VLT2, opacity: sp(f, fps, 26), textTransform: 'lowercase' }}>{unit}</div>}
        {/* the line-chart with a glowing head-dot leading the stroke */}
        <svg width="1560" height="720" style={{ position: 'absolute', left: 0, top: 0 }}>
          <defs><filter id="e6glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter></defs>
          <path d={d} fill="none" stroke={C.VLT2} strokeWidth={4} strokeLinecap="round"
            strokeLinejoin="round" filter="url(#e6glow)" />
          {prog > 0.02 && <circle cx={hd[0]} cy={hd[1]} r={11} fill="#FFFFFF" filter="url(#e6glow)" />}
          {prog > 0.02 && <circle cx={hd[0]} cy={hd[1]} r={22} fill="none" stroke={C.VLT2} strokeWidth={2} opacity={0.5} />}
        </svg>
        {/* pills pop as the head-dot passes their anchor x */}
        {pills && pills.map((pl, i) => {
          const passed = hd[0] >= pl.x - 4;
          const pop = passed ? sp(f, fps, 12 + 1, { damping: 12, stiffness: 150, mass: 0.7 }) : 0;
          return <div key={i} style={{ position: 'absolute', left: pl.x - 70, top: pl.y - 78,
            fontFamily: MONO, fontSize: 20, letterSpacing: 2, color: C.INK, background: 'rgba(139,47,224,0.22)',
            border: `1px solid ${C.VIOLET}`, borderRadius: 20, padding: '8px 18px', textTransform: 'lowercase',
            opacity: pop, transform: `translateY(${(1 - pop) * 12}px) scale(${0.8 + pop * 0.2})` }}>{pl.t}</div>;
        })}
      </Card>
    </AbsoluteFill>
  );
};

const FlowCard = ({ full, kicker, head, stage, steps, adds }) => {
  const { fps } = useVideoConfig(); const f = useT();
  const hs = sp(f, fps, 4);
  return (
    <AbsoluteFill>
      <Mesh f={f} />
      <Card f={f} fps={fps} mode="full">
        <Kicker f={f} txt={kicker} />
        <div style={{ position: 'absolute', left: 60, top: 110, fontFamily: DISP, fontWeight: 300,
          fontSize: 76, color: C.INK, letterSpacing: -1, textTransform: 'lowercase', opacity: hs }}>{head}</div>
        {steps.map((st, i) => {
          const x = 90 + i * 490, y = 320;
          const s = stage === 2 ? 1 : sp(f, fps, 12 + i * 6, { damping: 13, stiffness: 130, mass: 0.85 });
          return (
            <React.Fragment key={i}>
              {i < steps.length - 1 && (
                <div style={{ position: 'absolute', left: x + 430, top: y + 60, width:
                  (stage === 2 ? 1 : interpolate(sp(f, fps, 16 + i * 6, { damping: 24, stiffness: 100, mass: 1 }), [0, 1], [0, 1])) * 60,
                  height: 2, background: C.VIOLET }} />
              )}
              <div style={{ position: 'absolute', left: x, top: y, width: 430, height: 120, borderRadius: 16,
                background: 'rgba(139,47,224,0.14)', border: `1.5px solid ${C.VIOLET}`, display: 'flex',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                opacity: s, transform: `translateY(${(1 - s) * 16}px)` }}>
                <div style={{ fontFamily: DISP, fontWeight: 300, fontSize: 34, color: C.INK, textTransform: 'lowercase' }}>{st.l}</div>
                <div style={{ fontFamily: MONO, fontSize: 16, color: C.VLT2, marginTop: 6, letterSpacing: 2 }}>{st.s}</div>
              </div>
            </React.Fragment>
          );
        })}
        {adds && adds.map((a, i) => {
          const x = 260 + i * 640;
          const s = sp(f, fps, 18 + i * 6);
          return <div key={'a' + i} style={{ position: 'absolute', left: x, top: 520, width: 420, height: 96,
            borderRadius: 14, background: 'rgba(185,139,255,0.16)', border: `1.5px solid ${C.VLT2}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISP, fontWeight: 300,
            fontSize: 30, color: C.INK, textTransform: 'lowercase', opacity: s,
            transform: `translateY(${(1 - s) * 14}px)` }}>{a}</div>;
        })}
      </Card>
    </AbsoluteFill>
  );
};

const TitleCard = ({ full, kicker, lines, chrome }) => {
  const { fps } = useVideoConfig(); const f = useT();
  const rule = interpolate(sp(f, fps, 16, { damping: 24, stiffness: 110, mass: 1 }), [0, 1], [0, 1]);
  const grow = chrome ? sp(f, fps, 40, { damping: 18, stiffness: 90, mass: 1 }) : 0;
  return (
    <AbsoluteFill>
      <Mesh f={f} />
      <Card f={f} fps={fps} mode="full">
        <Kicker f={f} txt={kicker} />
        {/* the finale grows macOS window chrome — three dots + a title bar sliding in */}
        {chrome && (
          <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: 54 * grow, overflow: 'hidden',
            background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ position: 'absolute', left: 26, top: 20, display: 'flex', gap: 12 }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => <div key={i} style={{ width: 15, height: 15, borderRadius: '50%', background: c }} />)}
            </div>
          </div>
        )}
        <div style={{ position: 'absolute', left: 60, top: 220 }}>
          {lines.map((ln, i) => {
            const s = sp(f, fps, 6 + i * 4, { damping: 13, stiffness: 130, mass: 0.85 });
            return <div key={i} style={{ fontFamily: DISP, fontWeight: 300, fontSize: 132, lineHeight: 1.0,
              color: i === lines.length - 1 ? C.VLT2 : C.INK, letterSpacing: -2, textTransform: 'lowercase',
              opacity: s, transform: `translateY(${(1 - s) * 26}px)` }}>{ln}</div>;
          })}
          <div style={{ marginTop: 30, height: 4, width: 460 * rule, background: C.VIOLET, borderRadius: 2 }} />
        </div>
      </Card>
    </AbsoluteFill>
  );
};

/* overlay beat — a floating pill directly on the footage (no card, no ground) */
const FloatPill = ({ l1, l2 }) => {
  const { fps } = useVideoConfig(); const f = useT();
  const s = sp(f, fps, 4, { damping: 13, stiffness: 140, mass: 0.8 });
  const float = Math.sin(f / 20) * 5;
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 130, top: 780 + float, borderRadius: 22,
        background: 'rgba(16,16,20,0.82)', border: `1.5px solid ${C.VIOLET}`, padding: '20px 34px',
        boxShadow: '0 30px 70px rgba(20,8,44,0.5)', opacity: s,
        transform: `translateY(${(1 - s) * 20}px)` }}>
        <div style={{ fontFamily: DISP, fontWeight: 300, fontSize: 54, color: C.INK, textTransform: 'lowercase', letterSpacing: -1 }}>{l1}</div>
        <div style={{ fontFamily: MONO, fontSize: 22, color: C.VLT2, letterSpacing: 3, marginTop: 6, textTransform: 'lowercase' }}>{l2}</div>
      </div>
    </AbsoluteFill>
  );
};

const DECLINE = [[70, 300], [360, 340], [640, 400], [960, 470], [1260, 540], [1500, 600]];
const RISE = [[70, 600], [340, 560], [620, 470], [900, 380], [1180, 300], [1490, 220]];

const TIMELINE = [ // demonstration copy and values — replace before use
  { at:0.30,  dur:5.35, C:ChartCard, full:1, p:{ kicker:'demo project', head:'manual workflow', pts:DECLINE,
      unit:'illustrative values · replace' } },
  { at:6.20,  dur:1.42, C:FloatPill, full:0, p:{ l1:'there is a system', l2:'it already exists' } },
  { at:7.80,  dur:3.95, C:ChartCard, full:1, p:{ kicker:'demo value', head:'', big:24, unit:'items reviewed',
      pts:RISE } },
  { at:12.30, dur:3.40, C:FloatPill, full:0, p:{ l1:'quality gate', l2:'editor review required' } },
  { at:16.10, dur:5.40, C:FlowCard,  full:1, p:{ kicker:'the method', head:'the machine', stage:1,
      steps:[{l:'drop file',s:'one folder'},{l:'auto-edit',s:'running'},{l:'auto-clip',s:'running'}] } },
  { at:22.00, dur:1.25, C:FloatPill, full:0, p:{ l1:'configure', l2:'test each project' } },
  { at:23.50, dur:5.55, C:FlowCard,  full:1, p:{ kicker:'the system', head:'the machine', stage:2,
      steps:[{l:'drop file',s:'one folder'},{l:'auto-edit',s:'running'},{l:'auto-clip',s:'running'}],
      adds:['auto post','auto carousel'] } },
  { at:29.40, dur:5.45, C:FloatPill, full:0, p:{ l1:'sample data', l2:'replace before use' } },
  { at:35.20, dur:2.30, C:TitleCard, full:1, p:{ kicker:'the shift', lines:['draft to','final review'] } },
  { at:37.80, dur:5.85, C:ChartCard, full:1, p:{ kicker:'the pipeline', head:'one folder in', pts:RISE,
      pills:[{x:340,y:560,t:'instagram'},{x:620,y:470,t:'tiktok'},{x:900,y:380,t:'facebook'},{x:1180,y:300,t:'snapchat'}] } },
  { at:44.00, dur:4.55, C:FloatPill, full:0, p:{ l1:'chosen channels', l2:'verify each export' } },
  { at:49.05, dur:5.15, C:TitleCard, full:1, p:{ kicker:'the check', lines:['review the','final draft'] } },
  { at:54.60, dur:5.40, C:FloatPill, full:0, p:{ l1:'sample output', l2:'replace before use' } },
  { at:60.30, dur:3.35, C:TitleCard, full:1, p:{ kicker:'the close', lines:['review','then publish'], chrome:1 } }
];

export const E6VioletMesh = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      {TIMELINE.map((s, i) => (
        <Sequence key={i} from={Math.round(s.at * fps)} durationInFrames={Math.round(s.dur * fps)}>
          <s.C full={s.full} {...s.p} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
