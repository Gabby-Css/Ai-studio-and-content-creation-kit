/* ================= episode 35 additions (Season 7 finale): the FINISH gantry (green board + checkered line, a ground object) and a "PHOTO FINISH!" stamp ================= */
const FIN_HTML=`<g id="finW"><g id="finG">
 <g transform="translate(0,1740) skewX(-35.5) translate(0,-1740)"><rect x="-34" y="1740" width="68" height="840" fill="#fff"/>${Array.from({length:28},(_,r)=>[0,1].map(c=>((r+c)%2?`<rect x="${-34+c*34}" y="${1740+r*30}" width="34" height="30" fill="${OL}"/>`:'')).join('')).join('')}
 <path d="M-34,1740 V2580 M34,1740 V2580" stroke="${OL}" stroke-width="6"/></g>
 <rect x="-14" y="1030" width="28" height="710" rx="8" fill="#B4733A" ${sw(7)}/>
 <rect x="-250" y="800" width="500" height="236" rx="30" fill="#2EBE85" ${sw(9)}/>
 ${Array.from({length:10},(_,i)=>`<rect x="${-236+i*47}" y="814" width="47" height="30" fill="${i%2?'#fff':OL}"/><rect x="${-236+i*47}" y="844" width="47" height="30" fill="${i%2?OL:'#fff'}"/>`).join('')}
 <rect x="-250" y="800" width="500" height="236" rx="30" fill="none" ${sw(9)}/>
 <text x="0" y="990" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="104" fill="#fff" stroke="${OL}" stroke-width="12" paint-order="stroke" stroke-linejoin="round">FINISH</text>
</g></g>`;
const PHO_HTML=`<g id="phoW" opacity="0"><g id="pho">
 <rect x="-380" y="-92" width="760" height="184" rx="26" fill="#fff" ${sw(9)}/><rect x="-356" y="-70" width="712" height="140" rx="14" fill="#FFE14D"/>
 <text x="0" y="30" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="92" fill="${OL}">PHOTO FINISH!</text>
 <path d="M-340,-60 l24,-24 M340,-60 l-24,-24 M-340,60 l24,24 M340,60 l-24,24" stroke="${OL}" stroke-width="8" stroke-linecap="round"/>
</g></g>`;
