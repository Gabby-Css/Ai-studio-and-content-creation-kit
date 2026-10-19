p = "make_thumbs.cjs"; s = open(p, encoding="utf8").read()
s = s.replace('LEARN #5 "Gizmo\'s Counting Machine"', 'LEARN #6 "Sound It Out! Three-Letter Words"').replace('one curiosity hook ("WHAT NEXT?")', 'one curiosity hook ("WHICH WORD?")')
s = s.replace("require('./count_art.js');", "require('./animal_art.js'); require('./word_art.js');")
a = s.index("const OLC = '#2B1B5E';")
b = s.index("const scene = ")
helpers = '''const OLC = '#2B1B5E';
const tiles = (word, x, y, s) => { const col = (i) => ('aeiou'.includes(word[i]) ? '#FF5E7E' : i === 0 ? '#2F9BFF' : '#39C95B');
  const t = [0, 1, 2].map((i) => `<g transform="translate(${(i - 1) * 250},0)"><rect x="-108" y="-108" width="216" height="244" rx="42" fill="${col(i)}" stroke="${OLC}" stroke-width="10"/><rect x="-84" y="-92" width="130" height="20" rx="10" fill="#fff" opacity=".4"/>${STROKE(word[i], 0, 72, 210, '#fff', 0, 'middle', 17)}</g>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-440" y="-190" width="880" height="400" rx="60" fill="#5B60A0" stroke="${OLC}" stroke-width="10"/>${t}</g>`; };
const card = (word, pic, x, y, s, hi) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-170" width="300" height="340" rx="46" fill="${hi ? '#FFF6B0' : '#fff'}" stroke="${OLC}" stroke-width="10"/><g transform="translate(0,-50) scale(.8)">${O.draw(pic)}</g>${STROKE(word, 0, 118, 110, hi ? '#FF5E7E' : '#2F9BFF', 0, 'middle', 14)}</g>`;
const wordcard = (word, x, y, s, hi) => `<g transform="translate(${x},${y}) scale(${s})"><rect x="-156" y="-110" width="312" height="220" rx="46" fill="${hi ? '#FFF6B0' : '#fff'}" stroke="${OLC}" stroke-width="10"/>${STROKE(word, 0, 30, 150, hi ? '#FF5E7E' : '#2F9BFF', 0, 'middle', 16)}</g>`;
'''
s = s[:a] + helpers + s[b:]
a = s.index("  /* A: COUNT TO 20!"); b = s.index("  await b.close();")
thumbs = '''  /* A: READ WORDS! - big title left, the c-a-t letter tiles and the cat right */
  await shot(page(scene(1280, 720, world('hills') + tiles('cat', 1420, 330, .9) + `<g transform="translate(1420,800) scale(1.35)">${O.draw('cat')}</g>`
    + STROKE('READ', 450, 390, 280, '#FFE14D', -3) + STROKE('WORDS!', 490, 690, 270, '#fff', -3)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_A_READ-WORDS.jpg'));
  /* B: SOUND IT OUT! - Gizmo and the d-o-g tiles */
  await shot(page(scene(1280, 720, world('abc') + tiles('dog', 1400, 330, .9) + actor('gizmo', 1450, 1090, 1.3, { cls: 'wow' }) + `<g transform="translate(1000,860) scale(.95)">${O.draw('dog')}</g>`
    + STROKE('SOUND', 450, 360, 250, '#fff', -3) + STROKE('IT OUT!', 480, 670, 250, '#FFE14D', -3)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_B_SOUND-IT-OUT.jpg'));
  /* C: WHICH WORD? - three reading cards and the sun */
  await shot(page(scene(1280, 720, world('numland') + wordcard('bus', 1130, 800, 1.0, false) + wordcard('sun', 1470, 800, 1.0, true) + wordcard('cup', 1810, 800, 1.0, false) + `<g transform="translate(1470,400) scale(1.6)">${O.draw('sun')}</g>`
    + STROKE('WHICH', 440, 360, 270, '#fff', -3) + STROKE('WORD?', 470, 670, 270, '#FFE14D', -3)) + logoSmall, 1280, 720), 1280, 720, path.join(OUT, 'Thumb_C_WHICH-WORD.jpg'));
'''
s = s[:a] + thumbs + s[b:]
open(p, "w", encoding="utf8").write(s); print("ok")
