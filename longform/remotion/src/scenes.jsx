/* scenes — the full-screen motion-graphics vocabulary, rebuilt on Remotion.

   WHY REMOTION AND NOT JUST ANOTHER HYPERFRAMES CUT. Hyperframes drives everything from a
   synchronous __seek(t) with hand-rolled easing; that is great for deterministic layout but
   every overshoot has to be faked. Remotion gives real spring physics, so these cuts move
   differently on purpose: nodes settle with mass, type overshoots and comes back, staggers
   are driven by per-item springs rather than by a delay curve. Same reference vocabulary,
   different physics — that is the point of shipping both.

   Same laws as the Hyperframes comp (comps-lib/README.md § BROADCAST GRADE). Law 1 is
   enforced by POSTERIZE below: 30fps render, 12fps graphics. */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile } from 'remotion';

export const C = {
  ACCENT: '#E5372A',
  MINT:   '#7FCBA8',
  BLUE:   '#8FC4E8',
  GROUND: '#0B0C0E',
  DIM:    '#79818C'
};

/* LAW 1 — graphics run at 12fps inside a 30fps render. Smooth 30fps interpolation is the
   single biggest reason a graphics layer reads as "web page" instead of "broadcast". */
export const POSTERIZE = (frame, fps) => {
  const stride = Math.max(1, Math.round(fps / 12));
  return Math.floor(frame / stride) * stride;
};

export const useT = () => {
  const { fps } = useVideoConfig();
  return POSTERIZE(useCurrentFrame(), fps);
};

/* spring helper — one place so every scene shares the same physical feel */
const sp = (frame, fps, delay = 0, cfg) =>
  spring({ frame: frame - delay, fps, config: cfg || { damping: 15, stiffness: 110, mass: 0.9 } });

/* ---------- shared furniture ---------- */
export const Ticks = () => (
  <AbsoluteFill style={{ opacity: 0.55 }}>
    {Array.from({ length: 60 }).map((_, i) => {
      const x = 96 + (i % 10) * 192, y = 120 + Math.floor(i / 10) * 168;
      return (
        <div key={i} style={{ position: 'absolute', left: x, top: y, width: 15, height: 1, background: 'rgba(150,166,184,0.13)' }}>
          <div style={{ position: 'absolute', left: 7, top: -7, width: 1, height: 15, background: 'rgba(150,166,184,0.13)' }} />
        </div>
      );
    })}
  </AbsoluteFill>
);

export const Header = ({ kicker, frame, fps }) => {
  const o = interpolate(frame, [2, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  if (!kicker) return null;
  return (
    <div style={{ position: 'absolute', left: 200, top: 130, opacity: o,
      fontWeight: 800, fontSize: 17, letterSpacing: 7, color: C.ACCENT, textTransform: 'uppercase' }}>
      <span style={{ display: 'inline-block', width: 9, height: 9, background: C.ACCENT, marginRight: 14, verticalAlign: 2 }} />
      {kicker}
    </div>
  );
};

export const Lens = () => (
  <AbsoluteFill style={{ pointerEvents: 'none' }}>
    <AbsoluteFill style={{ background:
      'radial-gradient(ellipse 80% 80% at 50% 48%, rgba(0,0,0,0) 63%, rgba(0,0,0,0.60) 100%)' }} />
  </AbsoluteFill>
);

/* ---------- 1. KINETIC TYPE — the scene Remotion exists for ----------
   Words arrive one at a time, each on its own spring, each overshooting and settling.
   Hyperframes can approximate this; springs make it feel struck rather than tweened. */
export const KineticType = ({ words, kicker, accentFrom }) => {
  const { fps } = useVideoConfig();
  const f = useT();
  return (
    <AbsoluteFill style={{ background: C.GROUND, fontFamily: 'Mont, system-ui, sans-serif' }}>
      <Ticks />
      <Header kicker={kicker} frame={f} fps={fps} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: '0 180px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 28px', justifyContent: 'center' }}>
          {words.map((w, i) => {
            const s = sp(f, fps, 4 + i * 3, { damping: 12, stiffness: 140, mass: 0.8 });
            const isAccent = accentFrom != null && i >= accentFrom;
            return (
              <span key={i} style={{
                fontFamily: 'Anton, sans-serif', fontSize: 124, lineHeight: 1.02,
                letterSpacing: 2, textTransform: 'uppercase',
                color: isAccent ? C.ACCENT : '#FFF',
                opacity: s,
                transform: `translateY(${(1 - s) * 60}px) scale(${0.86 + s * 0.14})`,
                display: 'inline-block'
              }}>{w}</span>
            );
          })}
        </div>
      </AbsoluteFill>
      <Lens />
    </AbsoluteFill>
  );
};

/* ---------- 2. SPRING GRID — dot field where every mark has its own spring ---------- */
export const SpringGrid = ({ kicker, head, total = 260, cols = 26, lift = 8, liftLabel, fieldLabel }) => {
  const { fps } = useVideoConfig();
  const f = useT();
  const pitch = 46, dot = 36;
  const rows = Math.ceil(total / cols);
  const fx = (1920 - cols * pitch) / 2, fy = 430;
  const liftStart = Math.floor((cols - lift) / 2);
  const hs = sp(f, fps, 3, { damping: 14, stiffness: 120, mass: 1 });
  return (
    <AbsoluteFill style={{ background: C.GROUND, fontFamily: 'Mont, system-ui, sans-serif' }}>
      <Ticks />
      <Header kicker={kicker} frame={f} fps={fps} />
      <div style={{ position: 'absolute', left: 200, top: 176, fontFamily: 'Anton, sans-serif',
        fontSize: 78, color: '#FFF', textTransform: 'uppercase', letterSpacing: 2,
        opacity: hs, transform: `translateY(${(1 - hs) * 22}px)` }}>{head}</div>
      {Array.from({ length: total }).map((_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const isLift = r === 0 && c >= liftStart && c < liftStart + lift;
        const fill = sp(f, fps, 6 + (r * cols + c) * 0.10, { damping: 20, stiffness: 90, mass: 1 });
        /* the lifted subset rises out of the field and leaves a hole (ref10 @336s) */
        const ls = isLift ? sp(f, fps, 44 + (c - liftStart) * 2.4, { damping: 13, stiffness: 130, mass: 0.9 }) : 0;
        return (
          <div key={i} style={{
            position: 'absolute', left: fx + c * pitch, top: fy + r * pitch,
            width: dot, height: dot, borderRadius: '50%',
            background: ls > 0.15 ? '#FFFFFF' : '#63696F',
            opacity: fill,
            transform: `translateY(${-ls * 112}px)`
          }} />
        );
      })}
      <div style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', top: fy - 108,
        fontWeight: 700, fontSize: 14, letterSpacing: 4.5, color: '#FFF', textTransform: 'uppercase',
        opacity: sp(f, fps, 60) }}>{liftLabel}</div>
      <div style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', top: fy + rows * pitch + 34,
        fontWeight: 700, fontSize: 14, letterSpacing: 4.5, color: C.DIM, textTransform: 'uppercase',
        opacity: sp(f, fps, 30) }}>{fieldLabel}</div>
      <Lens />
    </AbsoluteFill>
  );
};

/* ---------- 3. SPRING FLOW — the Vox org chart with mass ----------
   ref10 @462s one-for-one: red circle node, row of white dots, white core box, mint box
   right, blue organ boxes bottom, white hard-90-degree elbow connectors. Colour is SEMANTIC. */
export const SpringFlow = ({ kicker, stage = 2 }) => {
  const { fps } = useVideoConfig();
  const f = useT();
  const CORE = { x: 760, y: 470, w: 400, h: 150 };
  const organs = stage === 1 ? ['AUTO\nPOST'] : ['AUTO\nPOST', 'AUTO\nCAROUSEL', 'AUTO\nCLIP'];
  const Box = ({ x, y, w, h, bg, txt, fs, delay }) => {
    const s = sp(f, fps, delay);
    return (
      <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        fontFamily: 'Anton, sans-serif', fontSize: fs, color: '#0B0C0E', letterSpacing: 1.4,
        textTransform: 'uppercase', padding: 10, whiteSpace: 'pre-line',
        opacity: s, transform: `translateY(${(1 - s) * 18}px) scale(${0.94 + s * 0.06})` }}>{txt}</div>
    );
  };
  const Edge = ({ x, y, w, h, delay, vertical }) => {
    const s = interpolate(sp(f, fps, delay, { damping: 26, stiffness: 120, mass: 1 }), [0, 1], [0, 1]);
    return <div style={{ position: 'absolute', left: x, top: y, width: vertical ? 2 : w * s,
      height: vertical ? h * s : 2, background: '#FFF' }} />;
  };
  return (
    <AbsoluteFill style={{ background: C.GROUND, fontFamily: 'Mont, system-ui, sans-serif' }}>
      <Ticks />
      <Header kicker={kicker} frame={f} fps={fps} />
      {/* supreme node */}
      <div style={{ position: 'absolute', left: 842, top: 210, width: 150, height: 150,
        borderRadius: '50%', background: C.ACCENT, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontFamily: 'Anton, sans-serif', fontSize: 34, color: '#0B0C0E',
        opacity: sp(f, fps, 4), transform: `scale(${0.8 + sp(f, fps, 4) * 0.2})` }}>YOU</div>
      <Edge x={917} y={360} h={52} vertical delay={10} />
      {Array.from({ length: 6 }).map((_, i) => {
        const s = sp(f, fps, 14 + i * 2);
        return <div key={i} style={{ position: 'absolute', left: 818 + i * 57, top: 412,
          width: 36, height: 36, borderRadius: '50%', background: '#FFF',
          opacity: s, transform: `scale(${s})` }} />;
      })}
      <Edge x={917} y={452} h={18} vertical delay={26} />
      <Box x={CORE.x} y={CORE.y} w={CORE.w} h={CORE.h} bg="#FFFFFF" fs={34} delay={28}
           txt={'AUTOMATED\nCONTENT MACHINE'} />
      <Edge x={CORE.x + CORE.w} y={545} w={170} delay={36} />
      <Box x={1330} y={500} w={380} h={120} bg={C.MINT} fs={32} delay={40} txt={'AUTO-EDIT\n+ CLIP'} />
      {organs.map((txt, i) => {
        const bx = 210 + i * 196;
        return (
          <React.Fragment key={i}>
            <Edge x={bx + 88} y={640 + i * 24} w={CORE.x - (bx + 88)} delay={46 + i * 5} />
            <Edge x={bx + 88} y={640 + i * 24} h={80 - i * 24} vertical delay={50 + i * 5} />
            <Box x={bx} y={720} w={176} h={132} bg={C.BLUE} fs={22} delay={54 + i * 5} txt={txt} />
          </React.Fragment>
        );
      })}
      <Lens />
    </AbsoluteFill>
  );
};

/* ---------- 4. SPRING COUNTER — a stat that arrives with weight ---------- */
export const SpringStat = ({ kicker, target = 300, unit, foot }) => {
  const { fps } = useVideoConfig();
  const f = useT();
  const s = sp(f, fps, 6, { damping: 18, stiffness: 90, mass: 1.1 });
  const v = Math.round(s * target);
  return (
    <AbsoluteFill style={{ background: C.GROUND, fontFamily: 'Mont, system-ui, sans-serif' }}>
      <Ticks />
      <Header kicker={kicker} frame={f} fps={fps} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ border: '2px solid rgba(190,204,218,0.42)', padding: '34px 70px',
          opacity: interpolate(f, [4, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          transform: `scale(${0.92 + s * 0.08})` }}>
          <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 210, lineHeight: 0.9,
            color: '#FFF', letterSpacing: 4 }}>{v}</div>
        </div>
        <div style={{ marginTop: 42, fontWeight: 700, fontSize: 14, letterSpacing: 4.5,
          color: '#FFF', textTransform: 'uppercase', opacity: sp(f, fps, 34) }}>{unit}</div>
        <div style={{ marginTop: 18, fontWeight: 700, fontSize: 14, letterSpacing: 4.5,
          color: C.DIM, textTransform: 'uppercase', opacity: sp(f, fps, 44) }}>{foot}</div>
      </AbsoluteFill>
      <Lens />
    </AbsoluteFill>
  );
};

/* ---------- 5. SPRING FANOUT — one source, four real platform marks ---------- */
export const SpringFanout = ({ kicker, head }) => {
  const { fps } = useVideoConfig();
  const f = useT();
  const marks = [
    { img: 'ig-w.png', name: 'INSTAGRAM' },
    { img: 'tt-w.png', name: 'TIKTOK' },
    { img: 'fb-w.png', name: 'FACEBOOK' },
    { img: 'sc-w.png', name: 'SNAPCHAT' }
  ];
  const src = sp(f, fps, 5);
  const trunk = sp(f, fps, 14, { damping: 26, stiffness: 120, mass: 1 });
  const hs = sp(f, fps, 3);
  return (
    <AbsoluteFill style={{ background: C.GROUND, fontFamily: 'Mont, system-ui, sans-serif' }}>
      <Ticks />
      <Header kicker={kicker} frame={f} fps={fps} />
      <div style={{ position: 'absolute', left: 200, top: 176, fontFamily: 'Anton, sans-serif',
        fontSize: 78, color: '#FFF', textTransform: 'uppercase', letterSpacing: 2,
        opacity: hs, transform: `translateY(${(1 - hs) * 22}px)` }}>{head}</div>
      <div style={{ position: 'absolute', left: 960 - 131, top: 380, width: 262, height: 186,
        background: C.ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Anton, sans-serif', fontSize: 34, color: '#0B0C0E', letterSpacing: 2,
        opacity: src, transform: `scale(${0.9 + src * 0.1})` }}>DROP IT HERE</div>
      <div style={{ position: 'absolute', left: 960, top: 566, width: 2, height: 114 * trunk, background: '#FFF' }} />
      {marks.map((m, i) => {
        const bx = 232 + i * 396, vx = bx + 140;
        const run = sp(f, fps, 22 + i * 4, { damping: 26, stiffness: 120, mass: 1 });
        const drop = sp(f, fps, 30 + i * 4, { damping: 26, stiffness: 120, mass: 1 });
        const land = sp(f, fps, 38 + i * 4, { damping: 12, stiffness: 140, mass: 0.8 });
        const span = Math.abs(vx - 960);
        return (
          <React.Fragment key={i}>
            <div style={{ position: 'absolute', top: 680, height: 2, background: '#FFF',
              left: vx > 960 ? 960 : vx + (1 - run) * span, width: span * run }} />
            <div style={{ position: 'absolute', left: vx, top: 680, width: 2, height: 120 * drop, background: '#FFF' }} />
            <div style={{ position: 'absolute', left: bx, top: 800, width: 280, textAlign: 'center',
              opacity: land, transform: `translateY(${(1 - land) * 24}px)` }}>
              <Img src={staticFile(m.img)} style={{ width: 112, height: 112, objectFit: 'contain' }} />
              <div style={{ marginTop: 18, fontWeight: 700, fontSize: 14, letterSpacing: 4.5,
                color: '#FFF', textTransform: 'uppercase' }}>{m.name}</div>
            </div>
          </React.Fragment>
        );
      })}
      <Lens />
    </AbsoluteFill>
  );
};

/* ---------- 6. TITLE — spring-struck card ---------- */
export const SpringTitle = ({ kicker, lines }) => {
  const { fps } = useVideoConfig();
  const f = useT();
  const rule = sp(f, fps, 16, { damping: 24, stiffness: 110, mass: 1 });
  return (
    <AbsoluteFill style={{ background: C.GROUND, fontFamily: 'Mont, system-ui, sans-serif' }}>
      <Ticks />
      <Header kicker={kicker} frame={f} fps={fps} />
      <div style={{ position: 'absolute', left: 200, top: 420 }}>
        {lines.map((ln, i) => {
          const s = sp(f, fps, 5 + i * 4, { damping: 13, stiffness: 130, mass: 0.85 });
          return (
            <div key={i} style={{ fontFamily: 'Anton, sans-serif', fontSize: 132, lineHeight: 1.0,
              color: '#FFF', textTransform: 'uppercase', letterSpacing: 2,
              opacity: s, transform: `translateY(${(1 - s) * 34}px)` }}>{ln}</div>
          );
        })}
        <div style={{ marginTop: 40, height: 4, width: 560 * rule, background: C.ACCENT }} />
      </div>
      <Lens />
    </AbsoluteFill>
  );
};
