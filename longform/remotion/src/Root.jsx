/* Root — three Remotion cuts of the same video.

   Like the Hyperframes side, a VARIANT IS A SCENE SUBSET, not a hand-authored composition.
   TIMELINE below is the single source of truth; each variant filters it by scene kind.

   Renders as a TRANSPARENT overlay (ProRes 4444 + yuva444p10le) so it drops straight into
   the same lf-assemble pipeline the Hyperframes cuts use. Nothing here composites footage. */
import React from 'react';
import { Composition, AbsoluteFill, Sequence, useVideoConfig, staticFile, continueRender, delayRender } from 'remotion';
import { KineticType, SpringGrid, SpringFlow, SpringStat, SpringFanout, SpringTitle } from './scenes.jsx';
/* E4–E6 are SELF-CONTAINED WORLDS, not TIMELINE subsets — each its own module, ground,
   type system and depth model, so no two of the nine edits can be described with one sentence. */
import { E4RedGrid }    from './e4-red-grid.jsx';
import { E5NeonEmber }  from './e5-neon-ember.jsx';
import { E6VioletMesh } from './e6-violet-mesh.jsx';

/* Anton/Mont ship in public/ — a bare fontFamily string would silently fall back to a system
   face and every headline would render in the wrong type. Register them once, globally, and
   hold the render until they are actually loaded. */
const FONT_CSS = `
@font-face{ font-family:'Anton'; src:url('${staticFile('anton.ttf')}') format('truetype'); font-display:block; }
@font-face{ font-family:'Mont';  src:url('${staticFile('mont.ttf')}')  format('truetype'); font-display:block; }
`;
if (typeof document !== 'undefined' && !document.getElementById('__fs_fonts')) {
  const st = document.createElement('style');
  st.id = '__fs_fonts';
  st.textContent = FONT_CSS;
  document.head.appendChild(st);
  /* Allow concurrent tabs time to load fonts, with a fallback timer so a failed font load does
     not block the render indefinitely. Validate this timeout on the recipient's hardware. */
  const handle = delayRender('loading Anton/Mont', { timeoutInMilliseconds: 180000 });
  let done = false;
  const release = () => { if (!done) { done = true; continueRender(handle); } };
  Promise.all([
    document.fonts.load('400 100px Anton'),
    document.fonts.load('700 40px Mont')
  ]).then(release).catch(release);
  setTimeout(release, 150000);
}

const FPS = 30;
const DUR = 63.9;

/* Demonstration timeline. Replace all copy, values, and timing with project-verified material. */
export const TIMELINE = [
  { kind:'grid',    at:0.30, dur:5.35, props:{ kicker:'DEMO DATA', head:'MANUAL WORKFLOW',
      total:120, lift:12, liftLabel:'12 ITEMS', fieldLabel:'SAMPLE VALUES · REPLACE' } },
  { kind:'title',   at:6.20, dur:1.42, props:{ kicker:'THE PLAN', lines:['MAP THE','WORKFLOW'] } },
  { kind:'stat',    at:7.80, dur:3.95, props:{ kicker:'DEMO VALUE', target:24, unit:'ITEMS REVIEWED',
      foot:'ILLUSTRATIVE · NOT A RESULT CLAIM' } },
  { kind:'kinetic', at:12.30, dur:3.40, props:{ kicker:'THE CHECK',
      words:['REVIEW','EACH','OUTPUT'], accentFrom:1 } },
  { kind:'flow',    at:16.10, dur:5.40, props:{ kicker:'SAMPLE FLOW', stage:1 } },
  { kind:'title',   at:22.00, dur:1.25, props:{ kicker:'', lines:['CONFIGURE.','TEST. REVIEW.'] } },
  { kind:'flow',    at:23.50, dur:5.55, props:{ kicker:'SAMPLE FLOW', stage:2 } },
  { kind:'kinetic', at:29.40, dur:5.45, props:{ kicker:'THE OUTPUT',
      words:['VERIFY','BEFORE','PUBLISHING'], accentFrom:1 } },
  { kind:'title',   at:35.20, dur:2.30, props:{ kicker:'THE SHIFT', lines:['FROM DRAFT','TO REVIEW'] } },
  { kind:'fanout',  at:37.80, dur:5.85, props:{ kicker:'SAMPLE ROUTE', head:'ONE INPUT' } },
  /* accentFrom:0 painted the WHOLE line red — red is one word everywhere else in the system */
  { kind:'kinetic', at:44.00, dur:4.55, props:{ kicker:'THE OUTPUT',
      words:['EVERY','PLATFORM','YOU','HAVE'], accentFrom:1 } },
  { kind:'title',   at:49.05, dur:5.15, props:{ kicker:'THE CHECK', lines:['REVIEW THE','FINAL DRAFT'] } },
  { kind:'grid',    at:54.60, dur:5.40, props:{ kicker:'DEMO DATA', head:'1 SOURCE',
      total:120, lift:12, liftLabel:'', fieldLabel:'SAMPLE OUTPUT · REPLACE' } },
  { kind:'title',   at:60.30, dur:3.35, props:{ kicker:'THE CLOSE', lines:['REVIEW.','THEN PUBLISH.'] } }
];

const RENDER = {
  grid:    SpringGrid,
  flow:    SpringFlow,
  stat:    SpringStat,
  fanout:  SpringFanout,
  title:   SpringTitle,
  kinetic: KineticType
};

const VARIANTS = {
  'remotion-kinetic': ['kinetic', 'title', 'stat'],
  'remotion-system':  ['flow', 'fanout', 'title'],
  'remotion-data':    ['grid', 'stat', 'kinetic', 'title']
};

const Cut = ({ only }) => {
  const { fps } = useVideoConfig();
  const scenes = TIMELINE.filter(s => !only || only.includes(s.kind));
  return (
    /* transparent between scenes — the talking head shows through the gaps */
    <AbsoluteFill style={{ backgroundColor: 'transparent' }}>
      {scenes.map((s, i) => {
        const Comp = RENDER[s.kind];
        if (!Comp) return null;
        return (
          <Sequence key={i} from={Math.round(s.at * fps)} durationInFrames={Math.round(s.dur * fps)}>
            <Comp {...s.props} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

/* the three distinct-world edits — each is one whole composition, no subset filtering */
const WORLDS = {
  'e4-red-grid':    E4RedGrid,
  'e5-neon-ember':  E5NeonEmber,
  'e6-violet-mesh': E6VioletMesh
};

export const RemotionRoot = () => (
  <>
    {Object.entries(VARIANTS).map(([id, only]) => (
      <Composition
        key={id}
        id={id}
        component={Cut}
        durationInFrames={Math.round(DUR * FPS)}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ only }}
      />
    ))}
    {Object.entries(WORLDS).map(([id, Comp]) => (
      <Composition
        key={id}
        id={id}
        component={Comp}
        durationInFrames={Math.round(DUR * FPS)}
        fps={FPS}
        width={1920}
        height={1080}
      />
    ))}
  </>
);
