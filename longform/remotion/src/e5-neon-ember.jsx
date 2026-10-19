/* ============================================================================
   E5 — NEON EMBER   (Remotion)   traced to reference 4.mp4

   Its own world:
     GROUND    near-black #080607, held inside a PAPER-WHITE #F1EFE8 outer frame
     ACCENT    hot LAMP-red #E8202A (sampled from a practical light, not pure #FF)
     TYPE      Anton heavy geometric caps (display) + Playfair serif caps in thin red strokes
     TEXTURE   BLOOM. Everything glows; the halo arrives BEFORE the shape resolves. Paper
               grain lives only on the outer frame. There is NO film grain on the content
     DEPTH     glow-behind — a blurred red aura precedes and sits behind every element
     SIGNATURE neon line-icon tiles lighting one at a time L->R under a header; a frosted-glass
               panel with white bars growing inside it; a full-frame orange light-leak wash-out

   Why it cannot collide with E4 Red Grid (also red): E5 is bloom + glow-behind + serif +
   lamp-#E8202A on a paper frame. E4 is grain + perspective-grid + condensed + pure-#FF2B2B.
   Opposite texture, opposite depth, opposite ground treatment. The matrix split is honoured.
   ============================================================================ */
import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, delayRender, continueRender } from 'remotion';

const FONT_CSS = `
@font-face{ font-family:'Anton'; src:url('${staticFile('anton.ttf')}') format('truetype'); font-display:block; }
@font-face{ font-family:'Play';  src:url('${staticFile('playfair.ttf')}') format('truetype'); font-display:block; }
`;
if (typeof document !== 'undefined' && !document.getElementById('__e5_fonts')) {
  const st = document.createElement('style'); st.id = '__e5_fonts'; st.textContent = FONT_CSS;
  document.head.appendChild(st);
  const h = delayRender('e5 fonts', { timeoutInMilliseconds: 180000 });
  let done = false; const rel = () => { if (!done){ done = true; continueRender(h); } };
  Promise.all([document.fonts.load('400 100px Anton'), document.fonts.load('700 40px Play')]).then(rel).catch(rel);
  setTimeout(rel, 150000);
}

const C = { BLACK:'#080607', PAPER:'#F1EFE8', RED:'#E8202A', GLOW:'rgba(232,32,42,0.62)',
  WHITE:'#F6F2EE', DIM:'rgba(246,242,238,0.46)' };
const DISP = 'Anton, sans-serif';
const SER = 'Play, serif';

const POSTERIZE = (frame, fps) => { const s = Math.max(1, Math.round(fps / 12)); return Math.floor(frame / s) * s; };
const useT = () => { const { fps } = useVideoConfig(); return POSTERIZE(useCurrentFrame(), fps); };
const sp = (f, fps, d = 0, cfg) => spring({ frame: f - d, fps, config: cfg || { damping: 15, stiffness: 110, mass: 0.9 } });

/* the black stage inside the paper frame. full beats only. */
const Stage = ({ f, fps }) => {
  const g = interpolate(f, [0, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: C.PAPER }} />
      <svg width="1920" height="1080" style={{ position: 'absolute', opacity: 0.16, mixBlendMode: 'multiply' }}>
        <filter id="e5p"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="4" />
          <feColorMatrix type="saturate" values="0" /></filter>
        <rect width="1920" height="1080" filter="url(#e5p)" />
      </svg>
      <AbsoluteFill style={{ inset: 34, background:
        `radial-gradient(120% 120% at 50% 46%, #120a0a 0%, ${C.BLACK} 70%)`,
        boxShadow: `inset 0 0 220px rgba(232,32,42,${0.10 * g})` }} />
    </AbsoluteFill>
  );
};

/* an element that blooms in: the red aura leads, the crisp shape follows */
const Bloom = ({ f, fps, delay, children, style }) => {
  const halo = sp(f, fps, delay, { damping: 20, stiffness: 80, mass: 1 });
  const crisp = sp(f, fps, delay + 3, { damping: 14, stiffness: 130, mass: 0.85 });
  return (
    <div style={{ ...style, opacity: crisp,
      textShadow: `0 0 ${34 * halo}px ${C.GLOW}, 0 0 ${12 * halo}px ${C.GLOW}`,
      transform: `${style.transform || ''} scale(${0.94 + crisp * 0.06})` }}>{children}</div>
  );
};

const Kicker = ({ f, txt }) => {
  const o = interpolate(f, [2, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  if (!txt) return null;
  return (
    <div style={{ position: 'absolute', left: 150, top: 120, opacity: o, fontFamily: SER,
      fontWeight: 700, fontSize: 24, letterSpacing: 8, color: C.RED, textTransform: 'uppercase',
      textShadow: `0 0 18px ${C.GLOW}` }}>{txt}</div>
  );
};

/* a small neon line-icon set — single-weight red strokes that glow */
const ICONS = {
  folder: 'M6,14 L6,42 L46,42 L46,18 L26,18 L22,14 Z',
  edit:   'M10,38 L34,14 L42,22 L18,46 L8,48 Z M30,18 L38,26',
  clip:   'M14,14 L38,38 M38,14 L14,38 M14,14 a5,5 0 1,0 0.1,0 M38,38 a5,5 0 1,0 0.1,0',
  post:   'M26,8 L26,40 M14,20 L26,8 L38,20 M10,44 L42,44',
  grid:   'M10,10 L24,10 L24,24 L10,24 Z M32,10 L46,10 L46,24 L32,24 Z M10,32 L24,32 L24,46 L10,46 Z M32,32 L46,32 L46,46 L32,46 Z'
};
const NeonIcon = ({ name, lit }) => (
  <svg width="56" height="56" viewBox="0 0 56 56" style={{ filter: lit > 0.1 ? `drop-shadow(0 0 ${10 * lit}px ${C.GLOW})` : 'none' }}>
    <path d={ICONS[name]} fill="none" stroke={lit > 0.1 ? C.RED : 'rgba(246,242,238,0.22)'}
      strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconHead = ({ full, kicker, big, unit, icons }) => {   /* giant number + neon icons L->R */
  const { fps } = useVideoConfig(); const f = useT();
  const s = sp(f, fps, 6, { damping: 18, stiffness: 88, mass: 1.1 });
  const v = Math.round(s * big);
  return (
    <AbsoluteFill>
      {full && <Stage f={f} fps={fps} />}
      <Kicker f={f} txt={kicker} />
      <Bloom f={f} fps={fps} delay={6} style={{ position: 'absolute', left: 150, top: 300,
        fontFamily: DISP, fontSize: 340, lineHeight: 0.82, color: C.WHITE, letterSpacing: 2 }}>
        {big >= 1000 ? (v / 1000).toFixed(v >= 1000 ? 1 : 0) + 'K' : v}
      </Bloom>
      <div style={{ position: 'absolute', left: 158, top: 690, fontFamily: SER, fontWeight: 700,
        fontSize: 30, letterSpacing: 3, color: C.RED, opacity: sp(f, fps, 30),
        textShadow: `0 0 16px ${C.GLOW}` }}>{unit}</div>
      {icons && (
        <div style={{ position: 'absolute', right: 170, top: 420, display: 'flex', gap: 34 }}>
          {icons.map((ic, i) => {
            const lit = sp(f, fps, 20 + i * 8, { damping: 16, stiffness: 120, mass: 0.9 });
            return (
              <div key={i} style={{ width: 120, height: 120, border: `2px solid ${lit > 0.1 ? C.RED : 'rgba(246,242,238,0.14)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: lit > 0.1 ? `0 0 ${26 * lit}px ${C.GLOW}, inset 0 0 ${18 * lit}px rgba(232,32,42,0.28)` : 'none' }}>
                <div style={{ transform: `scale(1.6)` }}><NeonIcon name={ic} lit={lit} /></div>
              </div>
            );
          })}
        </div>
      )}
      {full && <LightLeak f={f} fps={fps} off />}
    </AbsoluteFill>
  );
};

const FrostPanel = ({ full, kicker, head, stage, bars }) => { /* frosted-glass panel, bars grow */
  const { fps } = useVideoConfig(); const f = useT();
  const hs = sp(f, fps, 3);
  const px = 300, py = 380, pw = 1320, ph = 460;
  return (
    <AbsoluteFill>
      {full && <Stage f={f} fps={fps} />}
      <Kicker f={f} txt={kicker} />
      <Bloom f={f} fps={fps} delay={3} style={{ position: 'absolute', left: 150, top: 190,
        fontFamily: DISP, fontSize: 100, color: C.WHITE, textTransform: 'uppercase', letterSpacing: 2 }}>{head}</Bloom>
      {/* frosted glass */}
      <div style={{ position: 'absolute', left: px, top: py, width: pw, height: ph, borderRadius: 18,
        background: 'rgba(246,242,238,0.06)', border: '1px solid rgba(246,242,238,0.16)',
        backdropFilter: 'blur(6px)', boxShadow: `0 0 60px rgba(232,32,42,${0.18 * hs})`,
        opacity: sp(f, fps, 6) }} />
      {bars.map((b, i) => {
        const y = py + 70 + i * 96;
        const grow = stage === 2 && i < bars.length - 1
          ? 1
          : interpolate(sp(f, fps, 12 + i * 7, { damping: 24, stiffness: 90, mass: 1 }), [0, 1], [0, 1]);
        const lab = sp(f, fps, 10 + i * 7);
        return (
          <React.Fragment key={i}>
            <div style={{ position: 'absolute', left: px + 50, top: y, fontFamily: SER, fontWeight: 700,
              fontSize: 30, color: C.WHITE, opacity: lab, letterSpacing: 1 }}>{b.l}</div>
            <div style={{ position: 'absolute', left: px + 430, top: y + 8, width: 800, height: 18,
              background: 'rgba(246,242,238,0.08)', borderRadius: 9 }}>
              <div style={{ height: 18, width: 800 * grow * b.v, borderRadius: 9, background: C.RED,
                boxShadow: `0 0 20px ${C.GLOW}` }} />
            </div>
          </React.Fragment>
        );
      })}
      {full && <LightLeak f={f} fps={fps} off />}
    </AbsoluteFill>
  );
};

const IconGrid = ({ full, kicker, core, sats }) => {         /* 4 platform tiles lighting one at a time */
  const { fps } = useVideoConfig(); const f = useT();
  return (
    <AbsoluteFill>
      {full && <Stage f={f} fps={fps} />}
      <Kicker f={f} txt={kicker} />
      <Bloom f={f} fps={fps} delay={4} style={{ position: 'absolute', left: 0, right: 0, top: 250,
        textAlign: 'center', fontFamily: DISP, fontSize: 150, color: C.WHITE, textTransform: 'uppercase',
        letterSpacing: 3 }}>{core}</Bloom>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 560, display: 'flex',
        justifyContent: 'center', gap: 40 }}>
        {sats.map((t, i) => {
          const lit = sp(f, fps, 14 + i * 9, { damping: 16, stiffness: 120, mass: 0.9 });
          return (
            <div key={i} style={{ width: 340, height: 200, border: `2px solid ${lit > 0.1 ? C.RED : 'rgba(246,242,238,0.14)'}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16,
              boxShadow: lit > 0.1 ? `0 0 ${34 * lit}px ${C.GLOW}, inset 0 0 ${22 * lit}px rgba(232,32,42,0.24)` : 'none' }}>
              <div style={{ transform: 'scale(1.8)' }}><NeonIcon name={t.ic} lit={lit} /></div>
              <div style={{ fontFamily: SER, fontWeight: 700, fontSize: 30, letterSpacing: 2,
                color: lit > 0.1 ? C.WHITE : C.DIM, textShadow: lit > 0.1 ? `0 0 14px ${C.GLOW}` : 'none' }}>{t.n}</div>
            </div>
          );
        })}
      </div>
      {full && <LightLeak f={f} fps={fps} off />}
    </AbsoluteFill>
  );
};

const Title = ({ full, kicker, lines, leakOut }) => {
  const { fps } = useVideoConfig(); const f = useT();
  const rule = interpolate(sp(f, fps, 16, { damping: 24, stiffness: 110, mass: 1 }), [0, 1], [0, 1]);
  return (
    <AbsoluteFill>
      {full && <Stage f={f} fps={fps} />}
      <Kicker f={f} txt={kicker} />
      <div style={{ position: 'absolute', left: 150, top: 400 }}>
        {lines.map((ln, i) => {
          const d = 5 + i * 4;
          const crisp = sp(f, fps, d + 3, { damping: 13, stiffness: 130, mass: 0.85 });
          const halo = sp(f, fps, d, { damping: 20, stiffness: 80, mass: 1 });
          return <div key={i} style={{ fontFamily: DISP, fontSize: 150, lineHeight: 0.98,
            color: i === lines.length - 1 ? C.RED : C.WHITE, textTransform: 'uppercase', letterSpacing: 2,
            opacity: crisp, transform: `translateY(${(1 - crisp) * 30}px)`,
            textShadow: `0 0 ${40 * halo}px ${C.GLOW}` }}>{ln}</div>;
        })}
        <div style={{ marginTop: 36, height: 6, width: 560 * rule, background: C.RED,
          boxShadow: `0 0 22px ${C.GLOW}` }} />
      </div>
      {full && <LightLeak f={f} fps={fps} out={leakOut} />}
    </AbsoluteFill>
  );
};

const Plate = ({ l1, l2 }) => {                              /* overlay serif plate in a red stroke */
  const { fps } = useVideoConfig(); const f = useT();
  const halo = sp(f, fps, 3, { damping: 20, stiffness: 80, mass: 1 });
  const crisp = sp(f, fps, 6, { damping: 13, stiffness: 140, mass: 0.8 });
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 150, top: 790, border: `3px solid ${C.RED}`,
        padding: '22px 40px', background: 'rgba(8,6,7,0.72)', opacity: crisp,
        boxShadow: `0 0 ${40 * halo}px ${C.GLOW}`, transform: `translateY(${(1 - crisp) * 20}px)` }}>
        <div style={{ fontFamily: SER, fontWeight: 700, fontSize: 56, color: C.WHITE, textTransform: 'uppercase', letterSpacing: 2 }}>{l1}</div>
        <div style={{ fontFamily: SER, fontWeight: 700, fontSize: 34, color: C.RED, textTransform: 'uppercase', letterSpacing: 3, marginTop: 6 }}>{l2}</div>
      </div>
    </AbsoluteFill>
  );
};

/* the orange light-leak wash — a transition signature. `out` wipes at the end; `off` = idle. */
const LightLeak = ({ f, fps, out, off }) => {
  if (off) return null;
  const p = out ? interpolate(f, [30, 46], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0;
  if (p <= 0) return null;
  return <AbsoluteFill style={{ pointerEvents: 'none', opacity: p, background:
    'radial-gradient(90% 120% at 20% 50%, rgba(255,150,40,0.9) 0%, rgba(232,32,42,0.5) 40%, rgba(0,0,0,0) 78%)',
    mixBlendMode: 'screen' }} />;
};

const TIMELINE = [ // demonstration copy and values — replace before use
  { at:0.30,  dur:5.35, C:Title,     full:1, p:{ kicker:'Demo Project', lines:['MANUAL','WORKFLOW'] } },
  { at:6.20,  dur:1.42, C:Plate,     full:0, p:{ l1:'There Is', l2:'A System' } },
  { at:7.80,  dur:3.95, C:IconHead,  full:1, p:{ kicker:'Demo Value', big:24, unit:'Items Reviewed',
      icons:['folder','edit','clip','post'] } },
  { at:12.30, dur:3.40, C:Plate,     full:0, p:{ l1:'Quality Gate', l2:'Editor Review Required' } },
  { at:16.10, dur:5.40, C:FrostPanel,full:1, p:{ kicker:'The Method', head:'THE MACHINE', stage:1,
      bars:[{l:'Drop the file',v:1.0},{l:'Auto-edit',v:0.82},{l:'Auto-clip',v:0.64}] } },
  { at:22.00, dur:1.25, C:Plate,     full:0, p:{ l1:'Configure', l2:'Test Each Project' } },
  { at:23.50, dur:5.55, C:FrostPanel,full:1, p:{ kicker:'The System', head:'THE MACHINE', stage:2,
      bars:[{l:'Drop the file',v:1.0},{l:'Auto-edit',v:1.0},{l:'Auto-post',v:0.9}] } },
  { at:29.40, dur:5.45, C:IconHead,  full:0, p:{ kicker:'Demo Only', big:36, unit:'Sample Items — Replace' } },
  { at:35.20, dur:2.30, C:Title,     full:1, p:{ kicker:'The Shift', lines:['DRAFT TO','FINAL REVIEW'] } },
  { at:37.80, dur:5.85, C:IconGrid,  full:1, p:{ kicker:'The Pipeline', core:'ONE FOLDER',
      sats:[{ic:'grid',n:'Instagram'},{ic:'clip',n:'TikTok'},{ic:'post',n:'Facebook'},{ic:'folder',n:'Snapchat'}] } },
  { at:44.00, dur:4.55, C:Plate,     full:0, p:{ l1:'Chosen Channels', l2:'Verify Each Export' } },
  { at:49.05, dur:5.15, C:Title,     full:1, p:{ kicker:'The Check', lines:['REVIEW THE','FINAL DRAFT'] } },
  { at:54.60, dur:5.40, C:IconHead,  full:0, p:{ kicker:'Demo Only', big:12, unit:'Sample Outputs — Replace' } },
  { at:60.30, dur:3.35, C:Title,     full:1, p:{ kicker:'The Close', lines:['REVIEW.','THEN PUBLISH.'], leakOut:1 } }
];

export const E5NeonEmber = () => {
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
