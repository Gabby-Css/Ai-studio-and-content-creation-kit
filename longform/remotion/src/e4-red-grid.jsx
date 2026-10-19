/* ============================================================================
   E4 — RED GRID DIAGNOSTIC   (Remotion)   traced to reference 6.mp4

   Its own world, NOT a subset of scenes.jsx:
     GROUND    saturated crimson field #2E0406 -> #6A0A10, on a charcoal #141414 outer frame
     ACCENT    hot red #FF2B2B + white. Red is the diagnostic colour; white is data
     TYPE      Oswald condensed bold caps (display) + Courier Prime mono (pills/readouts)
     TEXTURE   fixed-seed film grain over the crimson (multiply). NO glow anywhere
     DEPTH     a perspective FLOOR GRID converging to a high vanishing point
     SIGNATURE numbered chips tumble in ROTATED, then settle into an even arc
               (scatter-then-regroup); curved connectors fan from a hub

   Why it cannot collide with E5 Neon Ember (also red): E4 is grain + perspective-grid +
   pure #FF2B2B, zero glow. E5 is bloom + glow-behind + lamp #E8202A on a paper frame. The
   collision matrix split is texture + depth + ground, and it is honoured here by construction.

   Remotion gives the scatter-then-regroup its physics: each chip is a spring from a random
   (index-derived, deterministic) rotation+offset to its arc slot. That overshoot is the shot.
   ============================================================================ */
import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, delayRender, continueRender } from 'remotion';

/* ---- fonts, registered once for this world ---- */
const FONT_CSS = `
@font-face{ font-family:'Oswald'; src:url('${staticFile('oswald.ttf')}') format('truetype'); font-display:block; }
@font-face{ font-family:'Cour';   src:url('${staticFile('courierprime.ttf')}') format('truetype'); font-display:block; }
`;
if (typeof document !== 'undefined' && !document.getElementById('__e4_fonts')) {
  const st = document.createElement('style'); st.id = '__e4_fonts'; st.textContent = FONT_CSS;
  document.head.appendChild(st);
  const h = delayRender('e4 fonts', { timeoutInMilliseconds: 180000 });
  let done = false; const rel = () => { if (!done){ done = true; continueRender(h); } };
  Promise.all([document.fonts.load('700 100px Oswald'), document.fonts.load('400 40px Cour')]).then(rel).catch(rel);
  setTimeout(rel, 150000);
}

const C = { CRIM_A:'#2E0406', CRIM_B:'#6A0A10', RED:'#FF2B2B', INK:'#141414',
  WHITE:'#F4EDED', DIM:'rgba(244,237,237,0.50)' };
const DISP = 'Oswald, sans-serif';
const MONO = 'Cour, monospace';

const POSTERIZE = (frame, fps) => { const s = Math.max(1, Math.round(fps / 12)); return Math.floor(frame / s) * s; };
const useT = () => { const { fps } = useVideoConfig(); return POSTERIZE(useCurrentFrame(), fps); };
const sp = (f, fps, d = 0, cfg) => spring({ frame: f - d, fps, config: cfg || { damping: 15, stiffness: 110, mass: 0.9 } });
/* deterministic pseudo-random from an integer — the scatter must be repeatable, never Math.random */
const rnd = (n) => { const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x); };

/* ---- shared furniture ---- */
const Grain = () => (
  <AbsoluteFill style={{ mixBlendMode: 'multiply', opacity: 0.5, pointerEvents: 'none' }}>
    <svg width="1920" height="1080" style={{ position: 'absolute' }}>
      <filter id="e4g"><feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="3" seed="11" />
        <feColorMatrix type="saturate" values="0" /></filter>
      <rect width="1920" height="1080" filter="url(#e4g)" opacity="0.34" />
    </svg>
  </AbsoluteFill>
);

/* the crimson stage with a perspective floor grid. full beats only. */
const Stage = ({ f, fps }) => {
  const VX = 960, VY = -260;                 /* vanishing point above frame */
  const draw = interpolate(sp(f, fps, 2, { damping: 26, stiffness: 90, mass: 1 }), [0, 1], [0, 1]);
  const rows = 9, cols = 14;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: C.INK }} />
      <AbsoluteFill style={{ inset: 28, background:
        `radial-gradient(120% 90% at 50% 8%, ${C.CRIM_B} 0%, ${C.CRIM_A} 62%, #1B0203 100%)` }} />
      <svg width="1920" height="1080" style={{ position: 'absolute', left: 0, top: 0 }}>
        {/* horizon-converging verticals */}
        {Array.from({ length: cols + 1 }).map((_, i) => {
          const bx = 40 + (i / cols) * 1840;
          return <line key={'v' + i} x1={bx} y1={1052} x2={VX + (bx - VX) * 0.12} y2={VY + 640}
            stroke="rgba(255,43,43,0.16)" strokeWidth={1.5} strokeDasharray={2000}
            strokeDashoffset={2000 * (1 - draw)} />;
        })}
        {/* depth rows — spacing tightens toward the horizon */}
        {Array.from({ length: rows }).map((_, i) => {
          const p = i / rows, y = 640 + Math.pow(p, 1.7) * 412;
          return <line key={'h' + i} x1={40} y1={y} x2={1880} y2={y}
            stroke="rgba(255,43,43,0.14)" strokeWidth={1.5} strokeDasharray={1900}
            strokeDashoffset={1900 * (1 - draw)} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

const Kicker = ({ f, txt }) => {
  const o = interpolate(f, [2, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  if (!txt) return null;
  return (
    <div style={{ position: 'absolute', left: 130, top: 118, opacity: o, fontFamily: MONO,
      fontSize: 20, letterSpacing: 8, color: C.RED, textTransform: 'uppercase' }}>
      <span style={{ display: 'inline-block', width: 10, height: 10, background: C.RED, marginRight: 14 }} />{txt}
    </div>
  );
};

/* ---- scene kinds ---- */
const Readout = ({ full, kicker, head, rows }) => {           /* full: crimson diagnostic panel */
  const { fps } = useVideoConfig(); const f = useT();
  const hs = sp(f, fps, 4);
  return (
    <AbsoluteFill>
      {full && <Stage f={f} fps={fps} />}
      <Kicker f={f} txt={kicker} />
      <div style={{ position: 'absolute', left: 130, top: 188, fontFamily: DISP, fontWeight: 700,
        fontSize: 118, lineHeight: 0.98, color: C.WHITE, textTransform: 'uppercase', letterSpacing: 1,
        opacity: hs, transform: `translateY(${(1 - hs) * 20}px)` }}>{head}</div>
      <div style={{ position: 'absolute', left: 134, top: 420, width: 1150 }}>
        {rows.map((r, i) => {
          const s = sp(f, fps, 16 + i * 6);
          const bar = interpolate(sp(f, fps, 20 + i * 6, { damping: 24, stiffness: 90, mass: 1 }), [0, 1], [0, 1]);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', height: 78, opacity: s,
              transform: `translateX(${(1 - s) * -20}px)` }}>
              <div style={{ fontFamily: MONO, fontSize: 26, color: C.DIM, width: 470, letterSpacing: 2 }}>{r.k}</div>
              <div style={{ position: 'relative', width: 480, height: 10, background: 'rgba(255,255,255,0.08)' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: 10, width: 480 * bar * r.v,
                  background: r.hot ? C.RED : C.WHITE }} />
              </div>
              <div style={{ fontFamily: MONO, fontSize: 26, color: C.WHITE, marginLeft: 26, letterSpacing: 1 }}>{r.n}</div>
            </div>
          );
        })}
      </div>
      {full && <Grain />}
    </AbsoluteFill>
  );
};

const ArcCount = ({ full, kicker, big, unit, chips }) => {    /* giant number + chips scatter->arc */
  const { fps } = useVideoConfig(); const f = useT();
  const s = sp(f, fps, 6, { damping: 18, stiffness: 88, mass: 1.1 });
  const v = Math.round(s * big);
  const cx = 560, cy = 560, R = 250;
  return (
    <AbsoluteFill>
      {full && <Stage f={f} fps={fps} />}
      <Kicker f={f} txt={kicker} />
      <div style={{ position: 'absolute', left: 130, top: 320, fontFamily: DISP, fontWeight: 700,
        fontSize: 360, lineHeight: 0.82, color: C.WHITE, letterSpacing: -4 }}>{v}</div>
      <div style={{ position: 'absolute', left: 150, top: 700, fontFamily: MONO, fontSize: 26,
        letterSpacing: 4, color: C.RED, opacity: sp(f, fps, 30) }}>{unit}</div>
      {/* chips tumble in rotated from scattered offsets, then settle onto an even right-side arc */}
      {Array.from({ length: chips }).map((_, i) => {
        const a = (-60 + (i / (chips - 1)) * 120) * Math.PI / 180;
        const tx = 1360 + Math.cos(a) * R, ty = cy + Math.sin(a) * R;
        const st = sp(f, fps, 14 + i * 2.4, { damping: 12, stiffness: 130, mass: 0.9 });
        const sx = (rnd(i + 1) - 0.5) * 900, sy = (rnd(i + 9) - 0.5) * 700, sr = (rnd(i + 3) - 0.5) * 220;
        const x = tx + (1 - st) * sx, y = ty + (1 - st) * sy, rot = (1 - st) * sr;
        return (
          <div key={i} style={{ position: 'absolute', left: x - 42, top: y - 42, width: 84, height: 84,
            border: `3px solid ${C.RED}`, background: 'rgba(20,4,5,0.72)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 30,
            color: C.WHITE, opacity: st, transform: `rotate(${rot}deg)` }}>
            {String(i + 1).padStart(2, '0')}
          </div>
        );
      })}
      {full && <Grain />}
    </AbsoluteFill>
  );
};

const Flow = ({ full, kicker, head, stage, boxes, outs }) => {  /* chain that continues on stage 2 */
  const { fps } = useVideoConfig(); const f = useT();
  const hs = sp(f, fps, 3);
  const NW = 360, NH = 128, y = 456, gap = (1660 - NW * boxes.length) / (boxes.length - 1);
  return (
    <AbsoluteFill>
      {full && <Stage f={f} fps={fps} />}
      <Kicker f={f} txt={kicker} />
      <div style={{ position: 'absolute', left: 130, top: 196, fontFamily: DISP, fontWeight: 700,
        fontSize: 104, color: C.WHITE, textTransform: 'uppercase', letterSpacing: 1,
        opacity: hs, transform: `translateY(${(1 - hs) * 18}px)` }}>{head}</div>
      {boxes.map((b, i) => {
        const x = 130 + i * (NW + gap);
        const s = stage === 2 ? 1 : sp(f, fps, 10 + i * 5, { damping: 13, stiffness: 130, mass: 0.85 });
        return (
          <React.Fragment key={i}>
            {i < boxes.length - 1 && (
              <div style={{ position: 'absolute', left: x + NW, top: y + NH / 2 - 1, height: 3,
                width: (stage === 2 ? 1 : interpolate(sp(f, fps, 16 + i * 5, { damping: 24, stiffness: 100, mass: 1 }), [0, 1], [0, 1])) * gap,
                background: C.RED }} />
            )}
            <div style={{ position: 'absolute', left: x, top: y, width: NW, height: NH,
              border: `3px solid ${C.RED}`, background: 'rgba(20,4,5,0.66)', display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              opacity: s, transform: `translateY(${(1 - s) * 16}px)` }}>
              <div style={{ fontFamily: DISP, fontWeight: 700, fontSize: 34, color: C.WHITE, textTransform: 'uppercase', letterSpacing: 1 }}>{b.l}</div>
              <div style={{ fontFamily: MONO, fontSize: 17, color: C.DIM, marginTop: 6, letterSpacing: 2 }}>{b.s}</div>
            </div>
          </React.Fragment>
        );
      })}
      {/* stage 2 fans curved connectors down to the automated outputs */}
      {outs && outs.map((o, i) => {
        const ox = 430 + i * 640, oy = 760;
        const s = sp(f, fps, 20 + i * 6);
        const grow = interpolate(sp(f, fps, 14 + i * 6, { damping: 24, stiffness: 100, mass: 1 }), [0, 1], [0, 1]);
        return (
          <React.Fragment key={'o' + i}>
            <svg width="1920" height="1080" style={{ position: 'absolute', left: 0, top: 0 }}>
              <path d={`M${ox + 220},${y + NH} C${ox + 220},${y + NH + 80} ${ox + 220},${oy - 80} ${ox + 220},${oy}`}
                fill="none" stroke={C.RED} strokeWidth={3} strokeDasharray={220}
                strokeDashoffset={220 * (1 - grow)} />
            </svg>
            <div style={{ position: 'absolute', left: ox, top: oy, width: 440, height: 92,
              border: `2px solid ${C.WHITE}`, background: 'rgba(255,43,43,0.10)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontFamily: DISP, fontWeight: 700,
              fontSize: 30, color: C.WHITE, textTransform: 'uppercase', letterSpacing: 1,
              opacity: s, transform: `translateY(${(1 - s) * 14}px)` }}>{o}</div>
          </React.Fragment>
        );
      })}
      {full && <Grain />}
    </AbsoluteFill>
  );
};

const Radial = ({ full, kicker, core, coreSub, sats }) => {   /* ONE hub, platform chips regroup around it */
  const { fps } = useVideoConfig(); const f = useT();
  const cx = 960, cy = 580, R = 340;
  const cs = sp(f, fps, 6, { damping: 14, stiffness: 120, mass: 1 });
  return (
    <AbsoluteFill>
      {full && <Stage f={f} fps={fps} />}
      <Kicker f={f} txt={kicker} />
      <div style={{ position: 'absolute', left: cx - 150, top: cy - 150, width: 300, height: 300,
        borderRadius: '50%', border: `4px solid ${C.RED}`, background: 'rgba(20,4,5,0.8)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: cs, transform: `scale(${0.8 + cs * 0.2})` }}>
        <div style={{ fontFamily: DISP, fontWeight: 700, fontSize: 96, color: C.WHITE }}>{core}</div>
        <div style={{ fontFamily: MONO, fontSize: 20, color: C.RED, letterSpacing: 4, marginTop: 4 }}>{coreSub}</div>
      </div>
      {sats.map((t, i) => {
        const a = -Math.PI / 2 + i * (Math.PI * 2 / sats.length);
        const tx = cx + Math.cos(a) * R, ty = cy + Math.sin(a) * R;
        const st = sp(f, fps, 16 + i * 4, { damping: 12, stiffness: 130, mass: 0.9 });
        const sx = (rnd(i + 2) - 0.5) * 700, sy = (rnd(i + 7) - 0.5) * 500, sr = (rnd(i + 5) - 0.5) * 180;
        const x = tx + (1 - st) * sx, y = ty + (1 - st) * sy;
        const grow = interpolate(sp(f, fps, 22 + i * 4, { damping: 24, stiffness: 100, mass: 1 }), [0, 1], [0, 1]);
        return (
          <React.Fragment key={i}>
            <svg width="1920" height="1080" style={{ position: 'absolute', left: 0, top: 0 }}>
              <line x1={cx + Math.cos(a) * 150} y1={cy + Math.sin(a) * 150}
                x2={cx + Math.cos(a) * (150 + (R - 210) * grow)} y2={cy + Math.sin(a) * (150 + (R - 210) * grow)}
                stroke={C.RED} strokeWidth={2.5} />
            </svg>
            <div style={{ position: 'absolute', left: x - 150, top: y - 44, width: 300, height: 88,
              border: `3px solid ${C.RED}`, background: 'rgba(20,4,5,0.78)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontFamily: DISP, fontWeight: 700,
              fontSize: 30, color: C.WHITE, textTransform: 'uppercase', letterSpacing: 1,
              opacity: st, transform: `translateY(${(1 - st) * 0}px) rotate(${(1 - st) * sr}deg)` }}>{t}</div>
          </React.Fragment>
        );
      })}
      {full && <Grain />}
    </AbsoluteFill>
  );
};

const Title = ({ full, kicker, lines }) => {
  const { fps } = useVideoConfig(); const f = useT();
  const rule = interpolate(sp(f, fps, 16, { damping: 24, stiffness: 110, mass: 1 }), [0, 1], [0, 1]);
  return (
    <AbsoluteFill>
      {full && <Stage f={f} fps={fps} />}
      <Kicker f={f} txt={kicker} />
      <div style={{ position: 'absolute', left: 130, top: 400 }}>
        {lines.map((ln, i) => {
          const s = sp(f, fps, 5 + i * 4, { damping: 13, stiffness: 130, mass: 0.85 });
          return <div key={i} style={{ fontFamily: DISP, fontWeight: 700, fontSize: 150, lineHeight: 0.98,
            color: i === lines.length - 1 ? C.RED : C.WHITE, textTransform: 'uppercase', letterSpacing: 1,
            opacity: s, transform: `translateY(${(1 - s) * 30}px)` }}>{ln}</div>;
        })}
        <div style={{ marginTop: 36, height: 6, width: 560 * rule, background: C.RED }} />
      </div>
      {full && <Grain />}
    </AbsoluteFill>
  );
};

const Pill = ({ l1, l2 }) => {                                /* overlay lower-third pill */
  const { fps } = useVideoConfig(); const f = useT();
  const s = sp(f, fps, 4, { damping: 13, stiffness: 140, mass: 0.8 });
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 130, top: 812, display: 'inline-flex', alignItems: 'stretch',
        opacity: s, transform: `translateX(${(1 - s) * -24}px)` }}>
        <div style={{ background: C.RED, padding: '18px 26px', fontFamily: DISP, fontWeight: 700,
          fontSize: 52, color: C.INK, textTransform: 'uppercase', letterSpacing: 1 }}>{l1}</div>
        <div style={{ background: 'rgba(20,4,5,0.86)', border: `2px solid ${C.RED}`, borderLeft: 'none',
          padding: '18px 26px', fontFamily: MONO, fontSize: 24, color: C.WHITE, letterSpacing: 3,
          display: 'flex', alignItems: 'center' }}>{l2}</div>
      </div>
    </AbsoluteFill>
  );
};

const TIMELINE = [ // demonstration copy and values — replace before use
  { at:0.30,  dur:5.35, C:Readout,  full:1, p:{ kicker:'DEMO DATA 01', head:'MANUAL WORKFLOW',
      rows:[{k:'ITEMS / BATCH',v:0.42,n:'12',hot:1},{k:'REVIEW STAGES',v:0.9,n:'3'},
            {k:'CHECKS PASSED',v:0.18,n:'2'},{k:'ISSUES OPEN',v:0.04,n:'1'}] } },
  { at:6.20,  dur:1.42, C:Pill,     full:0, p:{ l1:'THERE IS', l2:'A SYSTEM' } },
  { at:7.80,  dur:3.95, C:ArcCount, full:1, p:{ kicker:'DEMO DATA 02', big:24, unit:'ITEMS REVIEWED', chips:6 } },
  { at:12.30, dur:3.40, C:Pill,     full:0, p:{ l1:'QUALITY GATE', l2:'EDITOR REVIEW REQUIRED' } },
  { at:16.10, dur:5.40, C:Flow,     full:1, p:{ kicker:'DIAGNOSTIC 03', head:'THE MACHINE', stage:1,
      boxes:[{l:'DROP FILE',s:'ONE FOLDER'},{l:'AUTO-EDIT',s:'RUNNING'},{l:'AUTO-CLIP',s:'RUNNING'}] } },
  { at:22.00, dur:1.25, C:Pill,     full:0, p:{ l1:'CONFIGURE', l2:'TEST EACH PROJECT' } },
  { at:23.50, dur:5.55, C:Flow,     full:1, p:{ kicker:'DIAGNOSTIC 04', head:'THE MACHINE', stage:2,
      boxes:[{l:'DROP FILE',s:'ONE FOLDER'},{l:'AUTO-EDIT',s:'RUNNING'},{l:'AUTO-CLIP',s:'RUNNING'}],
      outs:['AUTO POST','AUTO CAROUSEL'] } },
  { at:29.40, dur:5.45, C:ArcCount, full:0, p:{ kicker:'DEMO ONLY', big:36, unit:'SAMPLE ITEMS · REPLACE', chips:0 } },
  { at:35.20, dur:2.30, C:Title,    full:1, p:{ kicker:'DIAGNOSTIC 05', lines:['DRAFT TO','FINAL REVIEW'] } },
  { at:37.80, dur:5.85, C:Radial,   full:1, p:{ kicker:'DIAGNOSTIC 06', core:'ONE', coreSub:'FOLDER',
      sats:['INSTAGRAM','TIKTOK','FACEBOOK','SNAPCHAT'] } },
  { at:44.00, dur:4.55, C:Pill,     full:0, p:{ l1:'CHOSEN CHANNELS', l2:'VERIFY EACH EXPORT' } },
  { at:49.05, dur:5.15, C:Title,    full:1, p:{ kicker:'DIAGNOSTIC 07', lines:['REVIEW THE','FINAL DRAFT'] } },
  { at:54.60, dur:5.40, C:ArcCount, full:0, p:{ kicker:'DEMO ONLY', big:12, unit:'SAMPLE OUTPUTS · REPLACE', chips:0 } },
  { at:60.30, dur:3.35, C:Title,    full:1, p:{ kicker:'DIAGNOSTIC 08', lines:['REVIEW.','THEN PUBLISH.'] } }
];

export const E4RedGrid = () => {
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
