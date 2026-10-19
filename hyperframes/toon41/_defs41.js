/* ================= Season 9 shared props (defined in #41, accumulate into #42-#45): the three pancake cousins (Blueberry cz1, Choco cz2, Berry cz3 = tinted copies of Flapjack's rig + an accessory each),
   the FAMILY PICNIC board, the picnic blanket and basket, bananas, shadow silhouettes (+ the "who are they?" bubble), Grandma's recipe book and its loose page, the banana tree, sticky footprints,
   the family camera + polaroid, the giant mixing bowl and its ingredients, smell waves ================= */
const CZP={cz1:{side:'#4F6BD8',top:'#A9BEFF',mid:'#7C96F0',syrup:'#2B3C8F',butter:'#E4ECFF'},
           cz2:{side:'#6B3A1E',top:'#B9774A',mid:'#8F5530',syrup:'#3A1C0C',butter:'#F2D3B0'},
           cz3:{side:'#E0516F',top:'#FFA7B8',mid:'#F7788F',syrup:'#A6213F',butter:'#FFE3EA'}};
function cousinSVG(p){const c=CZP[p];let s=panSVG(p);
 s=s.split('#D9902F').join(c.side).split('#F9CE72').join(c.top).split('#EDB04A').join(c.mid).split('#B35A12').join(c.syrup).split('#FFE98A').join(c.butter);
 if(p==='cz3') s=s.split('rx="26" ry="12" fill="#fff"').join('rx="28" ry="13" fill="#E8303A"');
 return s;}
const CZ_ACC={
 cz1:`<g transform="translate(0,-122)">${[-62,-22,26,64].map((x,i)=>`<circle cx="${x}" cy="${(i%2)*10-6}" r="13" fill="#2A3A9C" ${sw(4)}/><circle cx="${x-4}" cy="${(i%2)*10-10}" r="4" fill="#8FA4FF"/>`).join('')}</g>
      <g transform="translate(-100,-142) rotate(-20)"><path d="M0,0 L-34,-22 L-34,22Z M0,0 L34,-22 L34,22Z" fill="#5E7BFF" ${sw(5)}/><circle r="9" fill="#fff" ${sw(4)}/></g>`,
 cz2:`<g transform="translate(0,-122)">${[-62,-22,26,64].map((x,i)=>`<ellipse cx="${x}" cy="${(i%2)*8-4}" rx="14" ry="9" fill="#2A140A" ${sw(3)}/>`).join('')}</g>
      <g transform="translate(0,-146)"><path d="M-62,0 Q-72,-46 -30,-52 Q-10,-82 26,-54 Q70,-48 62,0Z" fill="#fff" ${sw(6)}/><rect x="-66" y="-6" width="132" height="22" rx="8" fill="#fff" ${sw(6)}/></g>`,
 cz3:`<g transform="translate(0,-124)"><path d="M-70,6 Q0,-34 70,6" fill="none" stroke="#E8303A" stroke-width="12" stroke-linecap="round"/>
       <g transform="translate(40,-12)"><path d="M0,-4 Q-26,-8 -22,18 Q0,40 22,18 Q26,-8 0,-4Z" fill="#FF3D5A" ${sw(5)}/><path d="M-10,-6 L0,-22 L10,-6Z" fill="#3FD66A" ${sw(4)}/><circle cx="-8" cy="12" r="3" fill="#FFE98A"/><circle cx="8" cy="8" r="3" fill="#FFE98A"/></g></g>`};
const SIL=(i)=>`<g id="sil${i}W" opacity="0"><g id="sil${i}"><ellipse cx="0" cy="8" rx="70" ry="14" fill="rgba(60,30,10,.2)"/><ellipse cx="0" cy="-8" rx="78" ry="24" fill="#2A1F3A" ${sw(5)}/><ellipse cx="0" cy="-40" rx="72" ry="22" fill="#2A1F3A" ${sw(5)}/><ellipse cx="0" cy="-70" rx="64" ry="20" fill="#2A1F3A" ${sw(5)}/>
 <circle cx="-22" cy="-44" r="12" fill="#fff"/><circle cx="22" cy="-44" r="12" fill="#fff"/><circle cx="-20" cy="-44" r="5" fill="#2A1F3A"/><circle cx="24" cy="-44" r="5" fill="#2A1F3A"/></g></g>`;
const SIL_HTML=[0,1,2].map(SIL).join('');
const COUSB_HTML=`<g id="cbW" opacity="0"><g id="cb">
 <circle cx="-26" cy="58" r="10" fill="#fff" ${sw(4)}/><circle cx="-6" cy="28" r="16" fill="#fff" ${sw(4)}/>
 <ellipse cx="90" cy="-70" rx="230" ry="120" fill="#fff" ${sw(6)}/>
 ${[0,1,2].map(i=>`<g id="cbs${i}" opacity="0" transform="translate(${i*130-30},-52) scale(.62)"><ellipse cx="0" cy="-8" rx="78" ry="24" fill="#2A1F3A" ${sw(6)}/><ellipse cx="0" cy="-40" rx="72" ry="22" fill="#2A1F3A" ${sw(6)}/><ellipse cx="0" cy="-70" rx="64" ry="20" fill="#2A1F3A" ${sw(6)}/><text x="0" y="-26" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="76" fill="#FFE14D">?</text></g>`).join('')}
</g></g>`;
const PICBAN_HTML=`<g id="banW" opacity="0"><g id="ban">
 <path d="M-520,-70 Q0,40 520,-70" fill="none" stroke="${OL}" stroke-width="10"/>
 ${Array.from({length:13},(_,i)=>{const x=-480+i*80,y=-62+Math.sin(i/12*Math.PI)*92;return `<path d="M${x-26},${y} L${x+26},${y} L${x},${y+54}Z" fill="${SPC[i%6]}" ${sw(5)}/>`;}).join('')}
 <rect x="-330" y="20" width="660" height="150" rx="34" fill="#FFF0C4" ${sw(10)}/><rect x="-306" y="44" width="612" height="102" rx="22" fill="none" stroke="#C99A4A" stroke-width="6" stroke-dasharray="20 12"/>
 <text x="0" y="116" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="74" fill="#E8483F" stroke="#6A3A12" stroke-width="3">FAMILY PICNIC!</text>
</g></g>`;
const PICNIC_HTML=`<g id="pkW" opacity="0"><g id="pk">
 <path d="M-520,0 L520,0 L640,210 L-640,210Z" fill="url(#pGing)" ${sw(8)}/><path d="M-520,0 L520,0 L640,210 L-640,210Z" fill="rgba(255,255,255,.12)"/>
 <path d="M-640,210 q0,26 60,26 H580 q60,0 60,-26" fill="#C93C3C" ${sw(6)}/>
</g></g>`;
const BASKET_HTML=`<g id="bskW" opacity="0"><g id="bsk">
 <ellipse cx="0" cy="12" rx="170" ry="24" fill="rgba(60,30,10,.25)"/>
 <g id="bskCup0" opacity="0"><rect x="-96" y="-212" width="46" height="62" rx="9" fill="#8ED8FF" ${sw(5)}/></g><g id="bskCup1" opacity="0"><rect x="52" y="-208" width="46" height="62" rx="9" fill="#FF9AA8" ${sw(5)}/></g>
 <g id="bskPc" opacity="0" transform="translate(0,-150)"><ellipse cx="0" cy="26" rx="80" ry="20" fill="#D9902F" ${sw(6)}/><ellipse cx="0" cy="8" rx="76" ry="19" fill="#F6C777" ${sw(6)}/><ellipse cx="0" cy="-10" rx="72" ry="18" fill="#D9902F" ${sw(6)}/><ellipse cx="0" cy="-26" rx="66" ry="16" fill="#F6C777" ${sw(6)}/><rect x="-22" y="-48" width="44" height="26" rx="8" fill="#FFE98A" ${sw(5)}/></g>
 <path d="M-150,-130 H150 L124,0 H-124Z" fill="#D9A15A" ${sw(8)}/><path d="M-140,-96 H140 M-132,-60 H132 M-126,-26 H126" stroke="#A56D35" stroke-width="7" opacity=".8"/>
 <path d="M-120,-132 Q0,-290 120,-132" fill="none" stroke="${OL}" stroke-width="22" stroke-linecap="round"/><path d="M-120,-132 Q0,-290 120,-132" fill="none" stroke="#C98A4B" stroke-width="11" stroke-linecap="round"/>
 <g id="bskLid"><path d="M-160,-136 Q0,-190 160,-136 L150,-120 H-150Z" fill="#E0B070" ${sw(7)}/></g>
</g></g>`;
const BANANAS_HTML=`<g id="bnsW" opacity="0"><g id="bns">${[-46,-16,16,46].map((x,i)=>`<path d="M${x},-96 Q${x+34},-40 ${x+10},20 Q${x-14},-6 ${x-18},-60Z" fill="#FFE14D" ${sw(6)} transform="rotate(${(i-1.5)*9} 0 -100)"/>`).join('')}<path d="M-30,-100 Q0,-124 30,-100" fill="none" stroke="#7A3E1D" stroke-width="12" stroke-linecap="round"/></g></g>`;
const BOOK_HTML=`<g id="bookW" opacity="0"><g id="book">
 <ellipse cx="0" cy="96" rx="190" ry="20" fill="rgba(60,30,10,.2)"/>
 <path d="M-190,-100 Q-100,-130 0,-96 Q100,-130 190,-100 L190,90 Q100,60 0,92 Q-100,60 -190,90Z" fill="#B4733A" ${sw(8)}/>
 <path d="M-176,-90 Q-96,-116 -6,-88 L-6,82 Q-96,54 -176,80Z" fill="#FFF6DC" ${sw(5)}/><path d="M6,-88 Q96,-116 176,-90 L176,80 Q96,54 6,82Z" fill="#FFF6DC" ${sw(5)}/>
 <path d="M-150,-60 H-30 M-150,-30 H-30 M-150,0 H-30 M-150,30 H-50" stroke="#C99A4A" stroke-width="7" stroke-linecap="round"/><path d="M30,-60 H150 M30,-30 H150 M30,0 H110" stroke="#C99A4A" stroke-width="7" stroke-linecap="round"/>
 <path d="M6,-88 L6,82" stroke="${OL}" stroke-width="6"/><path d="M26,56 L60,38 L84,64 L112,40 L150,70 L150,82 L26,82Z" fill="#FFF6DC" ${sw(4)}/>
</g></g>`;
const PAGE_HTML=`<g id="pgW" opacity="0"><g id="pg">
 <path d="M-90,-120 L90,-122 L96,118 L-84,124Z" fill="#FFF6DC" ${sw(7)}/><path d="M-90,-120 L-60,-108 L-30,-122 L0,-110 L40,-124 L90,-122" fill="none" stroke="#E7D3A4" stroke-width="6"/>
 <path d="M-62,-70 H62 M-62,-40 H62 M-62,-10 H40 M-62,20 H62" stroke="#C99A4A" stroke-width="7" stroke-linecap="round"/>
 <g id="pgHeart" transform="translate(0,72)"><path d="M0,22 C-46,-8 -26,-40 0,-18 C26,-40 46,-8 0,22Z" fill="#FF5F7F" ${sw(6)}/></g>
</g></g>`;
const BTREE_HTML=`<g id="btrW" opacity="0"><g id="btr">
 <ellipse cx="0" cy="10" rx="150" ry="22" fill="rgba(30,60,30,.3)"/>
 <path d="M-34,0 Q-26,-300 -18,-640 L22,-640 Q34,-300 40,0Z" fill="#8A5A2B" ${sw(9)}/><path d="M-6,-30 Q0,-300 6,-620" fill="none" stroke="#A8743A" stroke-width="10" stroke-linecap="round" opacity=".7"/>
 <g id="btrCrown" transform="translate(2,-650)">
  ${[-150,-80,0,80,150].map((a,i)=>`<path d="M0,0 Q${a*.7},${-90-(i%2)*30} ${a*1.5},${30+Math.abs(a)*.15}" fill="none" stroke="${OL}" stroke-width="46" stroke-linecap="round"/><path d="M0,0 Q${a*.7},${-90-(i%2)*30} ${a*1.5},${30+Math.abs(a)*.15}" fill="none" stroke="#2EBE85" stroke-width="30" stroke-linecap="round"/>`).join('')}
  <g transform="translate(-36,20)">${[-20,0,20].map((x,i)=>`<path d="M${x},0 Q${x+22},34 ${x+8},70 Q${x-10},48 ${x-14},8Z" fill="#FFE14D" ${sw(5)}/>`).join('')}</g>
 </g>
</g></g>`;
const FOOT_HTML=`<g id="footW" opacity="0">${Array.from({length:12},(_,i)=>`<g id="ft${i}" opacity="0"><ellipse cx="0" cy="0" rx="22" ry="34" fill="#C97A2A" ${sw(5)} transform="rotate(${i%2?14:-14})"/><circle cx="-12" cy="-40" r="6" fill="#C97A2A"/><circle cx="2" cy="-44" r="6" fill="#C97A2A"/><circle cx="16" cy="-40" r="6" fill="#C97A2A"/></g>`).join('')}</g>`;
const CMR_HTML=`<g id="cmrW" opacity="0"><g id="cmr">
 <ellipse cx="0" cy="14" rx="220" ry="24" fill="rgba(60,30,10,.25)"/>
 <path d="M-8,-130 L-150,0 M8,-130 L150,0 M0,-130 L0,10" stroke="${OL}" stroke-width="18" stroke-linecap="round"/><path d="M-8,-130 L-150,0 M8,-130 L150,0 M0,-130 L0,10" stroke="#8A8FA3" stroke-width="9" stroke-linecap="round"/>
 <rect x="-170" y="-340" width="340" height="220" rx="34" fill="#3B4466" ${sw(9)}/><rect x="-150" y="-318" width="300" height="60" rx="18" fill="#59648F"/>
 <circle cx="0" cy="-210" r="78" fill="#1B2038" ${sw(8)}/><circle cx="0" cy="-210" r="54" fill="#33437A"/><circle cx="-18" cy="-228" r="16" fill="#9DB4FF" opacity=".8"/>
 <circle id="cmrLed" cx="118" cy="-292" r="14" fill="#5a2a2a" ${sw(4)}/><rect x="-124" y="-304" width="120" height="30" rx="8" fill="#101322"/>
 <text id="cmrTxt" x="-64" y="-280" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="30" fill="#7CFF9B">10</text>
</g></g>`;
const POL_HTML=`<g id="polW" opacity="0"><g id="pol">
 <rect x="-210" y="-250" width="420" height="500" rx="18" fill="#fff" ${sw(9)}/><rect x="-180" y="-220" width="360" height="340" rx="8" fill="#9ED8FF" ${sw(6)}/>
 <rect x="-180" y="-60" width="360" height="180" fill="#8BE08B"/><circle cx="130" cy="-160" r="30" fill="#FFE14D"/>
 ${[[-120,10,1,'#FF8A2B'],[-60,30,.9,'#FFD36B'],[0,20,1.1,'#B9AEFF'],[60,34,.9,'#A9BEFF'],[120,14,1,'#FFA7B8'],[-90,-20,.8,'#C98A4B'],[40,-14,.8,'#7C96F0']].map(([x,y,s,c])=>`<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="40" ry="44" fill="${c}" ${sw(5)}/><circle cx="-14" cy="-6" r="7" fill="#fff"/><circle cx="14" cy="-6" r="7" fill="#fff"/><circle cx="-12" cy="-5" r="3" fill="${OL}"/><circle cx="16" cy="-5" r="3" fill="${OL}"/><path d="M-12,12 Q0,24 12,12" fill="none" stroke="${OL}" stroke-width="4" stroke-linecap="round"/></g>`).join('')}
 <path d="M0,-96 C-34,-130 -62,-96 0,-52 C62,-96 34,-130 0,-96Z" fill="#FF5F7F" ${sw(5)} transform="translate(0,-60) scale(.7)"/>
 <text x="0" y="214" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="62" fill="#6A3A12">FAMILY</text>
</g></g>`;
const GBOWL_HTML=`<g id="gbwW" opacity="0"><g id="gbw">
 <ellipse cx="0" cy="20" rx="420" ry="44" fill="rgba(60,30,10,.25)"/>
 <path d="M-340,-120 L340,-120 Q320,180 0,210 Q-320,180 -340,-120Z" fill="#fff" ${sw(10)}/><path d="M-300,10 Q0,86 300,10" fill="none" stroke="#6FB7E9" stroke-width="24" stroke-linecap="round"/><path d="M-250,90 Q0,150 250,90" fill="none" stroke="#6FB7E9" stroke-width="16" stroke-linecap="round" opacity=".7"/>
 <ellipse cx="0" cy="-120" rx="340" ry="74" fill="#fff" ${sw(10)}/><ellipse id="gbwBatter" cx="0" cy="-116" rx="296" ry="56" fill="#FFE3A0"/>
 <g id="gbwSwirl" fill="none" stroke="#E7A33A" stroke-width="14" stroke-linecap="round"><path d="M-200,-120 Q-100,-160 0,-120 T200,-120"/><path d="M-150,-100 Q-60,-70 40,-104 T180,-96"/></g>
</g></g>`;
const SPOON_HTML=`<g id="gspW" opacity="0"><g id="gsp"><path d="M0,0 L-130,-330" stroke="${OL}" stroke-width="30" stroke-linecap="round"/><path d="M0,0 L-130,-330" stroke="#C9CED6" stroke-width="16" stroke-linecap="round"/><ellipse cx="6" cy="14" rx="62" ry="38" transform="rotate(-24 6 14)" fill="#E5E9F0" ${sw(8)}/></g></g>`;
const ING_HTML=`<g id="igEgW" opacity="0"><g id="igEg"><ellipse cx="0" cy="0" rx="30" ry="38" fill="#fff" ${sw(6)}/><path d="M-22,-4 L-10,6 L0,-6 L10,6 L22,-4" fill="none" stroke="#C99A4A" stroke-width="5"/></g></g>
<g id="igChW" opacity="0"><g id="igCh">${[-24,0,24].map((x,i)=>`<path d="M${x},${i%2*14-10} L${x+14},${i%2*14+10} L${x-14},${i%2*14+10}Z" fill="#4A2A14" ${sw(4)}/>`).join('')}</g></g>
<g id="igStW" opacity="0"><g id="igSt">${[-26,26].map(x=>`<g transform="translate(${x},0)"><path d="M0,-4 Q-26,-8 -22,18 Q0,40 22,18 Q26,-8 0,-4Z" fill="#FF3D5A" ${sw(5)}/><path d="M-10,-6 L0,-24 L10,-6Z" fill="#3FD66A" ${sw(4)}/></g>`).join('')}</g></g>`;
const SMELL_HTML=`<g id="smlW" opacity="0">${[0,1,2].map(i=>`<path id="sml${i}" d="M${i*70-70},0 q-26,-40 0,-80 q26,-40 0,-80 q-26,-40 0,-80" fill="none" stroke="#FFD27A" stroke-width="16" stroke-linecap="round" opacity="0"/>`).join('')}</g>`;
