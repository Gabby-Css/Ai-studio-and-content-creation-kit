PAIRS = [
    # the checkered strip leans (perspective): 100 world px per lane
    (""" <rect x="-34" y="1740" width="68" height="840" fill="#fff"/>${Array.from({length:28},(_,r)=>[0,1].map(c=>((r+c)%2?`<rect x="${-34+c*34}" y="${1740+r*30}" width="34" height="30" fill="${OL}"/>`:'')).join('')).join('')}
 <path d="M-34,1740 V2580 M34,1740 V2580" stroke="${OL}" stroke-width="6"/>""",
     """ <g transform="translate(0,1740) skewX(-35.5) translate(0,-1740)"><rect x="-34" y="1740" width="68" height="840" fill="#fff"/>${Array.from({length:28},(_,r)=>[0,1].map(c=>((r+c)%2?`<rect x="${-34+c*34}" y="${1740+r*30}" width="34" height="30" fill="${OL}"/>`:'')).join('')).join('')}
 <path d="M-34,1740 V2580 M34,1740 V2580" stroke="${OL}" stroke-width="6"/></g>"""),
]
