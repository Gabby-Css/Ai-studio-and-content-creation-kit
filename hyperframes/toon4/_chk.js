
const OL='#2b1a14', OR='#F58A2B', CR='#FFEBCB', GR='#2EBE85', BR='#7A3E1D', MW='#7B1E2C';
const sw=(w)=>`stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const PLAN={"words":{"1":[{"w":"NIBBLES","s":0,"e":0.38},{"w":"GOBBLED","s":0.38,"e":0.84},{"w":"HIS","s":0.84,"e":0.96},{"w":"LAST","s":0.96,"e":1.26},{"w":"BITE","s":1.26,"e":1.48},{"w":"OF","s":1.48,"e":1.62},{"w":"CHEESE,","s":1.62,"e":1.92},{"w":"AND","s":2.38,"e":2.52},{"w":"HE","s":2.52,"e":2.64},{"w":"WANTED","s":2.64,"e":2.88},{"w":"MORE!","s":2.88,"e":3.24}],"2":[{"w":"BUT","s":0,"e":0.14},{"w":"MOCHI","s":0.14,"e":0.56},{"w":"THE","s":0.88,"e":1},{"w":"CAT","s":1,"e":1.2},{"w":"WAS","s":1.2,"e":1.34},{"w":"NAPPING","s":1.34,"e":1.72},{"w":"RIGHT","s":1.72,"e":2.04},{"w":"ON","s":2.04,"e":2.26},{"w":"THE","s":2.26,"e":2.36},{"w":"BIG","s":2.36,"e":2.54},{"w":"CHEESE!","s":2.54,"e":2.8}],"3":[{"w":"OPERATION","s":0,"e":0.38},{"w":"CHEESE","s":0.38,"e":0.7},{"w":"IS","s":0.7,"e":0.88},{"w":"A","s":0.88,"e":0.98},{"w":"GO!","s":0.98,"e":1.16}],"4":[{"w":"CATCH","s":0,"e":0.26},{"w":"ME","s":0.26,"e":0.48},{"w":"IF","s":0.48,"e":0.6},{"w":"YOU","s":0.6,"e":0.7},{"w":"CAN!","s":0.7,"e":1.04}],"5":[{"w":"HMPH.","s":0,"e":1},{"w":"OBVIOUSLY.","s":1.16,"e":1.56}],"6":[{"w":"MOCHI","s":0,"e":0.42},{"w":"CHASED","s":0.42,"e":0.72},{"w":"THE","s":0.72,"e":0.88},{"w":"PANCAKE","s":0.88,"e":1.28},{"w":"ROUND","s":1.28,"e":1.56},{"w":"AND","s":1.56,"e":1.74},{"w":"ROUND!","s":1.74,"e":2.02}],"7":[{"w":"AND","s":0,"e":0.16},{"w":"NIBBLES","s":0.16,"e":0.52},{"w":"TIPTOED","s":0.52,"e":1.06},{"w":"RIGHT","s":1.06,"e":1.26},{"w":"TO","s":1.26,"e":1.46},{"w":"THE","s":1.46,"e":1.54},{"w":"CHEESE!","s":1.54,"e":1.8}],"8":[{"w":"SQUEAK!","s":0,"e":0.38},{"w":"CHEESE!","s":0.38,"e":0.62}],"9":[{"w":"CHEESE","s":0,"e":0.28},{"w":"FOR","s":0.28,"e":0.52},{"w":"EVERYONE!","s":0.52,"e":0.92}],"10":[{"w":"BUT","s":0,"e":0.18},{"w":"THEN...","s":0.18,"e":0.46},{"w":"SNIFF,","s":0.8,"e":0.9},{"w":"SNIFF...","s":1.04,"e":1.2}],"11":[{"w":"NEEDS","s":0,"e":0.32},{"w":"A","s":0.32,"e":0.5},{"w":"PINCH","s":0.5,"e":0.78},{"w":"MORE","s":0.78,"e":1.34},{"w":"LOVE!","s":1.34,"e":1.7}]},"chunks":{"1":["NIBBLES GOBBLED","HIS LAST BITE","OF CHEESE, AND","HE WANTED MORE!"],"2":["BUT MOCHI THE CAT","WAS NAPPING RIGHT","ON THE BIG CHEESE!"],"3":["OPERATION CHEESE","IS A GO!"],"4":["CATCH ME IF YOU CAN!"],"5":["HMPH. OBVIOUSLY."],"6":["MOCHI CHASED THE","PANCAKE ROUND","AND ROUND!"],"7":["AND NIBBLES","TIPTOED RIGHT","TO THE CHEESE!"],"8":["SQUEAK! CHEESE!"],"9":["CHEESE FOR","EVERYONE!"],"10":["BUT THEN...","SNIFF, SNIFF..."],"11":["NEEDS A PINCH","MORE LOVE!"]},"tags":{"1":"","2":"","3":"BO","4":"FLAPJACK","5":"MOCHI","6":"","7":"","8":"NIBBLES","9":"","10":"","11":"TRUFFLE"},"dur":{"1":3.435,"2":3.072,"3":1.536,"4":1.6,"5":2.027,"6":2.261,"7":2.069,"8":0.903,"9":1.259,"10":1.515,"11":2.069},"LINE_T":{"1":0.2,"2":3.9,"3":7.4,"4":9.4,"5":11.4,"6":13.95,"7":16.65,"8":19.45,"9":20.7,"10":22.95,"11":24.95}};
const WD=PLAN.words, L=PLAN.LINE_T, DU=PLAN.dur;

/* ---------------- BO THE FOX (same rig as video 1) ---------------- */
const earPaths=`<path d="M-60,8 Q-100,-100 -42,-150 Q22,-104 46,2 Z" fill="${OR}" ${sw(7)}/><path d="M-38,-4 Q-62,-78 -40,-108 Q-2,-80 12,-6 Z" fill="#FFC8A2"/><path d="M-74,-100 Q-60,-132 -42,-150 Q-20,-130 -8,-104 Q-38,-122 -74,-100Z" fill="${BR}"/>`;
const eye=(x)=>`<g transform="translate(${x},-112)"><g class="boEyeW"><g class="boEye"><ellipse rx="38" ry="46" fill="#fff" ${sw(6)}/><g class="boPupil"><circle r="22" fill="${OL}"/><circle cx="-7" cy="-9" r="8" fill="#fff"/></g></g></g></g>`;
const heart=(x)=>`<g transform="translate(${x},-108) scale(1.7)"><path d="M0,14 C-34,-8 -26,-34 -10,-30 C-4,-28 0,-22 0,-18 C0,-22 4,-28 10,-30 C26,-34 34,-8 0,14Z" fill="#FF3D6E" ${sw(3.5)}/></g>`;
document.getElementById('boMount').innerHTML=`
<g id="bo"><g id="boSq"><g id="boLean">
 <ellipse cx="0" cy="6" rx="175" ry="26" fill="rgba(60,30,10,.22)"/>
 <g transform="translate(-100,-120)"><g id="boTail">
  <path d="M0,20 C-60,50 -150,10 -170,-70 C-185,-130 -140,-200 -85,-215 C-100,-160 -80,-110 -30,-80 C0,-62 20,-30 0,20Z" fill="${OR}" ${sw(7)}/>
  <path d="M-170,-70 C-185,-130 -140,-200 -85,-215 C-95,-185 -118,-165 -140,-150 C-160,-130 -172,-100 -170,-70Z" fill="${CR}" ${sw(7)}/>
 </g></g>
 <g transform="translate(-62,-62)"><g id="boLegL"><ellipse cx="0" cy="24" rx="34" ry="30" fill="${OR}" ${sw(7)}/><ellipse cx="4" cy="46" rx="52" ry="23" fill="${BR}" ${sw(7)}/></g></g>
 <g transform="translate(62,-62)"><g id="boLegR"><ellipse cx="0" cy="24" rx="34" ry="30" fill="${OR}" ${sw(7)}/><ellipse cx="4" cy="46" rx="52" ry="23" fill="${BR}" ${sw(7)}/></g></g>
 <g id="boBody">
  <ellipse cx="0" cy="-185" rx="140" ry="150" fill="${OR}" ${sw(7)}/>
  <ellipse cx="0" cy="-170" rx="86" ry="104" fill="${CR}"/>
  <g transform="translate(-122,-250)"><g id="boArmL"><ellipse cx="-4" cy="55" rx="30" ry="60" fill="${OR}" ${sw(7)}/><ellipse cx="-4" cy="112" rx="28" ry="24" fill="${BR}" ${sw(7)}/></g></g>
  <g transform="translate(122,-250)"><g id="boArmR"><ellipse cx="4" cy="55" rx="30" ry="60" fill="${OR}" ${sw(7)}/><ellipse cx="4" cy="112" rx="28" ry="24" fill="${BR}" ${sw(7)}/></g></g>
  <g transform="translate(0,-356)"><g id="boHead">
   <g transform="translate(-96,-200)"><g id="boEarL">${earPaths}</g></g>
   <g transform="translate(96,-200) scale(-1,1)"><g id="boEarR">${earPaths}</g></g>
   <ellipse cx="0" cy="-100" rx="172" ry="130" fill="${OR}" ${sw(7)}/>
   <ellipse cx="-84" cy="-50" rx="70" ry="52" fill="${CR}"/><ellipse cx="84" cy="-50" rx="70" ry="52" fill="${CR}"/><ellipse cx="0" cy="-38" rx="84" ry="56" fill="${CR}"/>
   <g id="boEyes">${eye(-64)}${eye(64)}</g>
   <g id="boHeartEyes" opacity="0">${heart(-64)}${heart(64)}</g>
   <g transform="translate(-64,-176)"><path class="boBrow" id="boBrowL" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <g transform="translate(64,-176)"><path class="boBrow" id="boBrowR" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <ellipse cx="0" cy="-62" rx="24" ry="16" fill="${OL}"/><circle cx="-8" cy="-67" r="5" fill="#fff"/>
   <ellipse cx="-102" cy="-72" rx="22" ry="12" fill="#FF7A7A" opacity=".45"/><ellipse cx="102" cy="-72" rx="22" ry="12" fill="#FF7A7A" opacity=".45"/>
   <g transform="translate(0,-46)" id="boMouth">
    <g id="mSmile"><path d="M0,-14 L0,6" fill="none" ${sw(6)}/><path d="M-38,0 Q0,30 38,0" fill="none" ${sw(7)}/></g>
    <g id="mOpen" opacity="0"><path d="M-34,-2 Q0,-6 34,-2 Q34,38 0,42 Q-34,38 -34,-2Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="30" rx="20" ry="11" fill="#FF8FA0"/></g>
    <g id="mBig" opacity="0"><path d="M-54,-4 Q0,-10 54,-4 Q58,56 0,62 Q-58,56 -54,-4Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="46" rx="30" ry="15" fill="#FF8FA0"/></g>
    <g id="mFrown" opacity="0"><path d="M-30,18 Q0,-8 30,18" fill="none" ${sw(7)}/></g>
    <g id="mO" opacity="0"><ellipse cx="0" cy="14" rx="15" ry="19" fill="${MW}" ${sw(5)}/></g>
   </g>
   <g transform="translate(0,-232)">${panSVG('bh')}</g>
   <g id="boSweat" opacity="0" transform="translate(138,-196)"><path d="M0,-26 C14,-6 20,6 0,16 C-20,6 -14,-6 0,-26Z" fill="#8AD7FF" ${sw(4)}/></g>
  </g></g>
  <ellipse cx="0" cy="-312" rx="134" ry="32" fill="${GR}" ${sw(7)}/>
  <g fill="${CR}" opacity=".9"><ellipse cx="-80" cy="-300" rx="9" ry="14"/><ellipse cx="-30" cy="-288" rx="9" ry="14"/><ellipse cx="30" cy="-288" rx="9" ry="14"/><ellipse cx="80" cy="-300" rx="9" ry="14"/></g>
  <g transform="translate(78,-300)"><g id="boScarfTail"><path d="M-24,0 L36,4 Q62,60 48,128 L-14,132 Q-2,60 -24,0Z" fill="${GR}" ${sw(7)}/><path d="M-10,60 L50,64 M-14,98 L48,100" fill="none" stroke="${CR}" stroke-width="9" stroke-linecap="round"/></g></g>
 </g>
</g></g></g>`;

/* ---------------- FLAPJACK THE PANCAKE (one markup, two instances: 'pan' in the world, 'ph' riding Rocky's head) ---------------- */
function panSVG(p){
 const leg=(x,s)=>`<g transform="translate(${x},-8)"><g id="${p}${s}"><path d="M0,0 L${x<0?-6:6},50" fill="none" ${sw(10)}/><ellipse cx="${x<0?-14:14}" cy="56" rx="26" ry="12" fill="#fff" ${sw(5)}/></g></g>`;
 const arm=(x,s,d)=>`<g transform="translate(${x},-62)"><g id="${p}${s}"><path d="M0,0 Q${d*40},0 ${d*52},-34" fill="none" ${sw(9)}/><circle cx="${d*52}" cy="-34" r="11" fill="#FFE3B8" ${sw(5)}/></g></g>`;
 const pe=(x)=>`<g transform="translate(${x},-62)"><g class="${p}EyeW"><g class="${p}Eye"><circle r="21" fill="#fff" ${sw(5)}/><g class="${p}Pupil"><circle r="10" fill="${OL}"/><circle cx="-3" cy="-4" r="4" fill="#fff"/></g></g></g></g>`;
 return `<g id="${p}"><g id="${p}Shake"><g id="${p}Sq">
 <g id="${p}Legs">${leg(-52,'LegL')}${leg(52,'LegR')}</g>
 <path d="M-130,-118 L-130,-48 Q-130,-6 -86,-6 L86,-6 Q130,-6 130,-48 L130,-118Z" fill="#D9902F" ${sw(7)}/>
 <ellipse cx="0" cy="-118" rx="130" ry="38" fill="#F9CE72" ${sw(7)}/>
 <ellipse cx="0" cy="-118" rx="98" ry="25" fill="#EDB04A" opacity=".8"/>
 <ellipse cx="-60" cy="-122" rx="14" ry="6" fill="#D9902F" opacity=".7"/><ellipse cx="70" cy="-112" rx="12" ry="5" fill="#D9902F" opacity=".7"/>
 <ellipse cx="10" cy="-124" rx="74" ry="20" fill="#B35A12" opacity=".95"/>
 <path d="M-40,-120 L-40,-92 Q-30,-84 -20,-92 L-20,-116Z M36,-118 L36,-84 Q46,-76 56,-84 L56,-114Z" fill="#B35A12"/>
 <rect x="-34" y="-158" width="68" height="40" rx="9" fill="#FFE98A" ${sw(5)}/><path d="M-22,-146 L8,-146" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/>
 <g id="${p}Glaze" opacity="0"><ellipse cx="0" cy="-122" rx="124" ry="31" fill="#F6B21E" opacity=".72"/><path d="M-122,-116 q-8,42 8,54 q16,-12 10,-54z M-38,-92 q-5,46 10,60 q15,-14 9,-60z M64,-96 q-4,38 9,48 q12,-10 8,-48z M116,-110 q10,34 0,46 q-13,-10 -9,-46z" fill="#F6B21E" ${sw(4)}/></g>
 <ellipse cx="-80" cy="-40" rx="14" ry="9" fill="#FF8A8A" opacity=".5"/><ellipse cx="80" cy="-40" rx="14" ry="9" fill="#FF8A8A" opacity=".5"/>
 <g id="${p}EyesClosed" opacity="0"><path d="M-62,-62 Q-42,-80 -22,-62" fill="none" ${sw(6)}/><path d="M22,-62 Q42,-80 62,-62" fill="none" ${sw(6)}/></g>
 <g id="${p}Eyes">${pe(-42)}${pe(42)}</g>
 <g transform="translate(-42,-100)"><path id="${p}BrowL" d="M-24,0 L24,0" fill="none" ${sw(8)} opacity="0"/></g>
 <g transform="translate(42,-100)"><path id="${p}BrowR" d="M-24,0 L24,0" fill="none" ${sw(8)} opacity="0"/></g>
 <g transform="translate(0,-30)">
  <g id="${p}Sm"><path d="M-24,0 Q0,22 24,0" fill="none" ${sw(6)}/></g>
  <g id="${p}Gr" opacity="0"><path d="M-28,-2 Q0,-6 28,-2 Q26,30 0,32 Q-26,30 -28,-2Z" fill="${MW}" ${sw(5)}/><ellipse cx="0" cy="22" rx="13" ry="8" fill="#FF8FA0"/></g>
  <g id="${p}Wo" opacity="0"><path d="M-22,10 Q0,-10 22,10" fill="none" ${sw(6)}/></g>
  <g id="${p}Oh" opacity="0"><ellipse cx="0" cy="6" rx="13" ry="15" fill="${MW}" ${sw(5)}/></g>
 </g>
 <g id="${p}Arms">${arm(-128,'ArmL',-1)}${arm(128,'ArmR',1)}</g>
</g></g></g>`;}

/* ---------------- ROCKY THE RACCOON (cast #17: grey fur, dark mask, black flat cap, ringed tail) ---------------- */
const GRY='#A3A9B5', DGR='#4B5160', BEL='#E4E7EC', MUZ='#F4F5F8', CAP='#2b2b33';
function rockySVG(p,hat){
 const eyeR=(x)=>`<g transform="translate(${x},-108)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="36" ry="43" fill="#fff" ${sw(6)}/><g class="${p}Pupil"><circle r="21" fill="${OL}"/><circle cx="-6" cy="-8" r="7" fill="#fff"/></g></g></g></g>`;
 const ring=[0,1,2,3,4].map(i=>`<g transform="translate(${i*17},${-i*22}) rotate(-35)"><ellipse rx="36" ry="27" fill="${i%2?DGR:GRY}" ${sw(6)}/></g>`).join('');
 const legG=(s,x)=>`<g transform="translate(${x},-52)"><g id="${p}${s}"><ellipse cx="0" cy="22" rx="30" ry="26" fill="${GRY}" ${sw(7)}/><ellipse cx="2" cy="40" rx="52" ry="23" fill="${DGR}" ${sw(7)}/></g></g>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean">
 <ellipse cx="0" cy="6" rx="150" ry="24" fill="rgba(60,30,10,.22)"/>
 <g transform="translate(136,-76)"><g id="${p}Tail">${ring}</g></g>
 ${legG('LegL',-58)}${legG('LegR',58)}
 <g id="${p}Body">
  <ellipse cx="0" cy="-170" rx="128" ry="135" fill="${GRY}" ${sw(7)}/>
  <g id="${p}Belly"><ellipse cx="0" cy="-150" rx="80" ry="102" fill="${BEL}"/></g>
  <g transform="translate(-112,-232)"><g id="${p}ArmL"><ellipse cx="-4" cy="52" rx="28" ry="56" fill="${GRY}" ${sw(7)}/><ellipse cx="-4" cy="104" rx="27" ry="24" fill="${DGR}" ${sw(7)}/></g></g>
  <g transform="translate(112,-232)"><g id="${p}ArmR"><ellipse cx="4" cy="52" rx="28" ry="56" fill="${GRY}" ${sw(7)}/><ellipse cx="4" cy="104" rx="27" ry="24" fill="${DGR}" ${sw(7)}/></g></g>
  <g transform="translate(0,-318)"><g id="${p}Head">
   <g transform="translate(-110,-211)"><g id="${p}EarL"><g transform="rotate(-12)"><ellipse rx="44" ry="51" fill="${GRY}" ${sw(7)}/><ellipse cy="5" rx="25" ry="30" fill="${DGR}"/></g></g></g>
   <g transform="translate(110,-211)"><g id="${p}EarR"><g transform="rotate(12)"><ellipse rx="44" ry="51" fill="${GRY}" ${sw(7)}/><ellipse cy="5" rx="25" ry="30" fill="${DGR}"/></g></g></g>
   <ellipse cx="0" cy="-98" rx="168" ry="118" fill="${GRY}" ${sw(7)}/>
   <path d="M-154,-130 Q0,-170 154,-130 Q134,-68 53,-73 Q0,-94 -53,-73 Q-134,-68 -154,-130Z" fill="${DGR}"/>
   <ellipse cx="0" cy="-47" rx="69" ry="44" fill="${MUZ}"/>
   <g id="${p}Eyes">${eyeR(-64)}${eyeR(64)}</g>
   <g id="${p}EyesHappy" opacity="0"><path d="M-98,-100 Q-64,-140 -30,-100" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/><path d="M30,-100 Q64,-140 98,-100" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/></g>
   <g transform="translate(-64,-172)"><path id="${p}BrowL" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <g transform="translate(64,-172)"><path id="${p}BrowR" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <ellipse cx="0" cy="-73" rx="21" ry="14" fill="${OL}"/><circle cx="-7" cy="-77" r="4.5" fill="#fff"/>
   <ellipse cx="-99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/><ellipse cx="99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/>
   <g transform="translate(0,-40)">
    <g id="${p}mSm"><path d="M-34,0 Q-8,20 14,8 Q28,2 36,-12" fill="none" ${sw(7)}/></g>
    <g id="${p}mOp" opacity="0"><path d="M-34,-2 Q0,-6 34,-2 Q34,38 0,42 Q-34,38 -34,-2Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="30" rx="20" ry="11" fill="#FF8FA0"/></g>
    <g id="${p}mBg" opacity="0"><path d="M-54,-4 Q0,-10 54,-4 Q58,56 0,62 Q-58,56 -54,-4Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="46" rx="30" ry="15" fill="#FF8FA0"/></g>
    <g id="${p}mFr" opacity="0"><path d="M-30,18 Q0,-8 30,18" fill="none" ${sw(7)}/></g>
    <g id="${p}mO" opacity="0"><ellipse cx="0" cy="14" rx="15" ry="19" fill="${MW}" ${sw(5)}/></g>
   </g>
   <g id="${p}Sweat" opacity="0" transform="translate(150,-170)"><path d="M0,-26 C14,-6 20,6 0,16 C-20,6 -14,-6 0,-26Z" fill="#8AD7FF" ${sw(4)}/></g>
   <g id="${p}Tear" opacity="0" transform="translate(-92,-70)"><path d="M0,-14 C9,-2 12,4 0,10 C-12,4 -9,-2 0,-14Z" fill="#8AD7FF" ${sw(3)}/></g>
   <path d="M-113,-188 Q0,-278 113,-188 Q0,-211 -113,-188Z" fill="${CAP}" ${sw(6)}/>
   <path d="M87,-208 L168,-199 L97,-179Z" fill="${CAP}" ${sw(6)}/>
   ${hat?`<g transform="translate(0,-244)">${panSVG('ph')}</g>`:''}
  </g></g>
 </g>
</g></g></g>`;}
document.getElementById('panMount').innerHTML=panSVG('pan');
/* ---------------- MOCHI THE CAT (cast #3: blue-grey tabby, white belly, pink ears, red collar + bell, curly tail) ---------------- */
const MCG='#A9B4C2', MCD='#7C8796';
function mochiSVG(p){
 const eyeR=(x)=>`<g transform="translate(${x},-108)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="36" ry="43" fill="#fff" ${sw(6)}/><g class="${p}Pupil"><circle r="21" fill="${OL}"/><circle cx="-6" cy="-8" r="7" fill="#fff"/></g></g></g></g>`;
 const lid=(x)=>`<g transform="translate(${x},0)"><path d="M-44,-160 L44,-160 L44,-106 Q0,-90 -44,-106Z" fill="${MCG}"/><path d="M-42,-106 Q0,-90 42,-106" fill="none" ${sw(6)}/></g>`;
 const legG=(s,x)=>`<g transform="translate(${x},-52)"><g id="${p}${s}"><ellipse cx="0" cy="22" rx="30" ry="26" fill="${MCG}" ${sw(7)}/><ellipse cx="2" cy="40" rx="52" ry="23" fill="${MCD}" ${sw(7)}/></g></g>`;
 const ear=(sx)=>`<g transform="translate(${sx*-96},-196) scale(${sx},1)"><path d="M-52,14 L52,-124 L78,14Z" fill="${MCG}" ${sw(7)}/><path d="M-26,2 L48,-90 L62,2Z" fill="#FFB6C8"/></g>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean">
 <ellipse cx="0" cy="6" rx="150" ry="24" fill="rgba(60,30,10,.22)"/>
 <g transform="translate(112,-120)"><g id="${p}Tail"><path d="M10,40 C150,40 190,-100 130,-210 C108,-248 70,-220 88,-190 C125,-120 85,-40 0,-40Z" fill="${MCG}" ${sw(7)}/></g></g>
 ${legG('LegL',-58)}${legG('LegR',58)}
 <g id="${p}Body">
  <ellipse cx="0" cy="-170" rx="134" ry="140" fill="${MCG}" ${sw(7)}/>
  <g id="${p}Belly"><ellipse cx="0" cy="-150" rx="84" ry="106" fill="#fff"/></g>
  <g transform="translate(-114,-232)"><g id="${p}ArmL"><ellipse cx="-4" cy="52" rx="30" ry="58" fill="${MCG}" ${sw(7)}/><ellipse cx="-4" cy="104" rx="28" ry="25" fill="${MCD}" ${sw(7)}/></g></g>
  <g transform="translate(114,-232)"><g id="${p}ArmR"><ellipse cx="4" cy="52" rx="30" ry="58" fill="${MCG}" ${sw(7)}/><ellipse cx="4" cy="104" rx="28" ry="25" fill="${MCD}" ${sw(7)}/></g></g>
  <g transform="translate(0,-318)"><g id="${p}Head">
   <g id="${p}EarL">${ear(1)}</g><g id="${p}EarR">${ear(-1)}</g>
   <ellipse cx="0" cy="-98" rx="172" ry="130" fill="${MCG}" ${sw(7)}/>
   <path d="M0,-226 L0,-190 M-42,-218 L-35,-186 M42,-218 L35,-186" fill="none" ${sw(9)}/>
   <ellipse cx="0" cy="-54" rx="64" ry="42" fill="#fff"/>
   <g fill="none" ${sw(4)}><path d="M-136,-76 L-238,-94"/><path d="M-136,-56 L-238,-52"/><path d="M136,-76 L238,-94"/><path d="M136,-56 L238,-52"/></g>
   <g id="${p}Eyes">${eyeR(-64)}${eyeR(64)}</g>
   <g id="${p}Lids" opacity="0">${lid(-64)}${lid(64)}</g>
   <g id="${p}EyesSleep" opacity="0"><path d="M-98,-112 Q-64,-80 -30,-112" fill="none" ${sw(11)}/><path d="M30,-112 Q64,-80 98,-112" fill="none" ${sw(11)}/></g>
   <g id="${p}EyesHappy" opacity="0"><path d="M-98,-100 Q-64,-140 -30,-100" fill="none" ${sw(12)}/><path d="M30,-100 Q64,-140 98,-100" fill="none" ${sw(12)}/></g>
   <g transform="translate(-64,-172)"><path id="${p}BrowL" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <g transform="translate(64,-172)"><path id="${p}BrowR" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <path d="M-20,-78 Q0,-84 20,-78 Q0,-54 -20,-78Z" fill="#FF8FA0" ${sw(5)}/>
   <ellipse cx="-99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/><ellipse cx="99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/>
   <g transform="translate(0,-38)">
    <g id="${p}mSm"><path d="M-34,0 Q-17,20 0,2 Q17,20 34,0" fill="none" ${sw(7)}/></g>
    <g id="${p}mOp" opacity="0"><path d="M-34,-2 Q0,-6 34,-2 Q34,38 0,42 Q-34,38 -34,-2Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="30" rx="20" ry="11" fill="#FF8FA0"/></g>
    <g id="${p}mBg" opacity="0"><path d="M-54,-4 Q0,-10 54,-4 Q58,56 0,62 Q-58,56 -54,-4Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="46" rx="30" ry="15" fill="#FF8FA0"/></g>
    <g id="${p}mFr" opacity="0"><path d="M-28,14 Q0,6 28,14" fill="none" ${sw(7)}/></g>
    <g id="${p}mO" opacity="0"><ellipse cx="0" cy="14" rx="15" ry="19" fill="${MW}" ${sw(5)}/></g>
   </g>
  </g></g>
  <g transform="translate(0,-282)"><path d="M-100,-8 Q0,32 100,-8 Q0,50 -100,-8Z" fill="#E8484F" ${sw(6)}/><circle cx="0" cy="34" r="20" fill="#FFD84A" ${sw(5)}/><path d="M0,34 L0,48" fill="none" ${sw(4)}/></g>
 </g>
</g></g></g>`;}

/* ---------------- NIBBLES THE MOUSE, full body (cast #20): big round ears, buck teeth, pink paws, curly tail ---------------- */
const MGR='#CFD3DC', MPK='#F4A6B7';
const wedgeSVG=(extra='')=>`<path d="M-72,26 L78,-18 L50,52Z" fill="#FFD84A" ${sw(6)}/><path d="M-72,26 L50,52 L50,70 L-72,44Z" fill="#E8B52E" ${sw(5)}/><path d="M50,52 L78,-18 L78,0 L50,70Z" fill="#E8B52E" ${sw(5)}/><circle cx="26" cy="12" r="8" fill="#E8B52E"/><circle cx="-6" cy="28" r="6" fill="#E8B52E"/><circle cx="46" cy="30" r="5" fill="#E8B52E"/>${extra}`;
function mouseSVG(p){
 const eyeR=(x)=>`<g transform="translate(${x},-108)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="36" ry="43" fill="#fff" ${sw(6)}/><g class="${p}Pupil"><circle r="21" fill="${OL}"/><circle cx="-6" cy="-8" r="7" fill="#fff"/></g></g></g></g>`;
 const teeth=`<rect x="-24" y="-3" width="22" height="19" rx="3" fill="#fff" ${sw(3)}/><rect x="2" y="-3" width="22" height="19" rx="3" fill="#fff" ${sw(3)}/>`;
 const legG=(s,x)=>`<g transform="translate(${x},-50)"><g id="${p}${s}"><ellipse cx="0" cy="20" rx="26" ry="24" fill="${MGR}" ${sw(7)}/><ellipse cx="2" cy="38" rx="50" ry="22" fill="${MPK}" ${sw(7)}/></g></g>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean">
 <ellipse cx="0" cy="6" rx="130" ry="22" fill="rgba(60,30,10,.22)"/>
 <g transform="translate(92,-78)"><g id="${p}Tail"><path d="M0,0 q112,22 112,-84 q0,-72 -52,-92" fill="none" stroke="${OL}" stroke-width="18" stroke-linecap="round"/><path d="M0,0 q112,22 112,-84 q0,-72 -52,-92" fill="none" stroke="${MPK}" stroke-width="9" stroke-linecap="round"/></g></g>
 ${legG('LegL',-54)}${legG('LegR',54)}
 <g id="${p}Body">
  <ellipse cx="0" cy="-168" rx="124" ry="132" fill="${MGR}" ${sw(7)}/>
  <ellipse cx="0" cy="-150" rx="78" ry="98" fill="#fff"/>
  <g id="${p}WedgeG" opacity="0" transform="translate(0,-132) scale(1.55)">${wedgeSVG()}</g>
  <g transform="translate(-106,-232)"><g id="${p}ArmL"><ellipse cx="-4" cy="48" rx="25" ry="52" fill="${MGR}" ${sw(7)}/><ellipse cx="-4" cy="96" rx="24" ry="22" fill="${MPK}" ${sw(7)}/></g></g>
  <g transform="translate(106,-232)"><g id="${p}ArmR"><ellipse cx="4" cy="48" rx="25" ry="52" fill="${MGR}" ${sw(7)}/><ellipse cx="4" cy="96" rx="24" ry="22" fill="${MPK}" ${sw(7)}/></g></g>
  <g transform="translate(0,-318)"><g id="${p}Head">
   <g transform="translate(-146,-201)"><g id="${p}EarL"><circle r="76" fill="${MGR}" ${sw(7)}/><circle cy="4" r="48" fill="#FFB6C8"/></g></g>
   <g transform="translate(146,-201)"><g id="${p}EarR"><circle r="76" fill="${MGR}" ${sw(7)}/><circle cy="4" r="48" fill="#FFB6C8"/></g></g>
   <ellipse cx="0" cy="-98" rx="168" ry="133" fill="${MGR}" ${sw(7)}/>
   <g id="${p}Eyes">${eyeR(-64)}${eyeR(64)}</g>
   <g id="${p}EyesHappy" opacity="0"><path d="M-98,-100 Q-64,-140 -30,-100" fill="none" ${sw(12)}/><path d="M30,-100 Q64,-140 98,-100" fill="none" ${sw(12)}/></g>
   <g transform="translate(-64,-172)"><path id="${p}BrowL" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <g transform="translate(64,-172)"><path id="${p}BrowR" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <ellipse cx="0" cy="-76" rx="22" ry="14" fill="#FF8FA0"/><circle cx="-7" cy="-80" r="4.5" fill="#fff"/>
   <ellipse cx="-99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/><ellipse cx="99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/>
   <g transform="translate(0,-44)">
    <g id="${p}mSm"><path d="M-30,0 Q0,22 30,0" fill="none" ${sw(7)}/>${teeth}</g>
    <g id="${p}mOp" opacity="0"><path d="M-34,-2 Q0,-6 34,-2 Q34,38 0,42 Q-34,38 -34,-2Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="30" rx="20" ry="11" fill="#FF8FA0"/>${teeth}</g>
    <g id="${p}mBg" opacity="0"><path d="M-48,-4 Q0,-10 48,-4 Q52,50 0,56 Q-52,50 -48,-4Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="40" rx="26" ry="13" fill="#FF8FA0"/>${teeth}</g>
    <g id="${p}mFr" opacity="0"><path d="M-30,18 Q0,-8 30,18" fill="none" ${sw(7)}/></g>
    <g id="${p}mO" opacity="0"><ellipse cx="0" cy="14" rx="15" ry="19" fill="${MW}" ${sw(5)}/>${teeth}</g>
   </g>
   <g id="${p}Cheese" transform="translate(0,64)" opacity="0">
    ${wedgeSVG('<ellipse cx="-34" cy="24" rx="26" ry="20" fill="#F4A6B7" stroke="'+OL+'" stroke-width="6"/><ellipse cx="40" cy="6" rx="26" ry="20" fill="#F4A6B7" stroke="'+OL+'" stroke-width="6"/>')}
   </g>
  </g></g>
 </g>
</g></g></g>`;}

/* ---------------- the big cheese wheel + the cut wedge, on the table ---------------- */
const CHX=1160, CHTOP=1062;          // wheel centre x, y of the top face (Mochi's feet rest on it)
const cheeseBigSVG=`<g id="cheeseWheel">
 <ellipse cx="${CHX}" cy="1168" rx="190" ry="16" fill="rgba(60,30,10,.2)"/>
 <path d="M${CHX-168},${CHTOP} L${CHX-168},1138 Q${CHX-168},1176 ${CHX},1176 Q${CHX+168},1176 ${CHX+168},1138 L${CHX+168},${CHTOP}Z" fill="#F2B632" ${sw(7)}/>
 <ellipse cx="${CHX}" cy="${CHTOP}" rx="168" ry="38" fill="#FFD84A" ${sw(7)}/>
 <ellipse cx="${CHX}" cy="${CHTOP}" rx="132" ry="26" fill="#FFE382" opacity=".8"/>
 <g fill="#E8A92A"><ellipse cx="${CHX-60}" cy="${CHTOP-4}" rx="17" ry="7"/><ellipse cx="${CHX+64}" cy="${CHTOP+8}" rx="14" ry="6"/><ellipse cx="${CHX+6}" cy="${CHTOP+2}" rx="9" ry="4"/>
  <circle cx="${CHX-118}" cy="1110" r="12"/><circle cx="${CHX-30}" cy="1138" r="9"/><circle cx="${CHX+52}" cy="1108" r="14"/><circle cx="${CHX+124}" cy="1136" r="9"/></g>
 <path d="M${CHX-150},1096 Q${CHX-150},1146 ${CHX-110},1160" fill="none" stroke="#FFF2B0" stroke-width="9" stroke-linecap="round" opacity=".7"/>
</g>`;
const WDX=1060, WDY=1098;           // the cut wedge lying in front of the wheel
const wedgeBigSVG=`<g id="wedgeBig" transform="translate(${WDX},${WDY}) scale(1.25)"><g id="wedgeBigIn">${wedgeSVG()}</g></g>`;

/* ---------------- Truffle the Pig as a window silhouette (chef hat!) ---------------- */
const pigSilSVG=`<g id="pigG" opacity="0" clip-path="url(#cpGlass)"><g id="pigIn">
  <g fill="#3A2B3C">
   <path d="M432,560 L404,448 L522,512Z"/><path d="M668,560 L696,448 L578,512Z"/>
   <ellipse cx="550" cy="672" rx="180" ry="150"/>
  </g>
  <g id="pigSnout"><ellipse cx="550" cy="716" rx="76" ry="50" fill="#5B4660"/><ellipse cx="528" cy="716" rx="11" ry="17" fill="#2A1E2C"/><ellipse cx="572" cy="716" rx="11" ry="17" fill="#2A1E2C"/></g>
  <g id="pigEyes"><g class="pEye"><ellipse cx="490" cy="640" rx="19" ry="23" fill="#fff"/><circle cx="494" cy="644" r="9" fill="#1E120A"/></g><g class="pEye"><ellipse cx="610" cy="640" rx="19" ry="23" fill="#fff"/><circle cx="606" cy="644" r="9" fill="#1E120A"/></g></g>
  <g fill="#D6D9EA" stroke="#2b1a14" stroke-width="6" stroke-linejoin="round"><circle cx="484" cy="470" r="46"/><circle cx="550" cy="440" r="58"/><circle cx="616" cy="470" r="46"/><rect x="456" y="480" width="188" height="52" rx="14"/></g>
 </g></g>`;

document.getElementById('nbMount').innerHTML=mouseSVG('nb');
document.getElementById('mcMount').innerHTML=mochiSVG('mc');
document.getElementById('nmMount').innerHTML=mouseSVG('nm');
document.getElementById('cheeseMount').innerHTML=cheeseBigSVG;
document.getElementById('wedgeMount').innerHTML=wedgeBigSVG;
document.getElementById('pigMount').innerHTML=pigSilSVG;


/* ---------------- cereal bowls + spoon ---------------- */
const bowlSVG=(id)=>`<g id="${id}" opacity="0"><g id="${id}In">
 <path d="M-100,-30 L100,-30 Q94,64 0,74 Q-94,64 -100,-30Z" fill="#fff" ${sw(7)}/>
 <path d="M-88,10 Q0,34 88,10" fill="none" stroke="#6FB7E9" stroke-width="10" stroke-linecap="round"/>
 <ellipse cx="0" cy="-30" rx="100" ry="22" fill="#fff" ${sw(7)}/><ellipse cx="0" cy="-30" rx="84" ry="15" fill="#FFF6DD"/>
 <g fill="none" stroke="#E7A33A" stroke-width="9"><circle cx="-40" cy="-34" r="9"/><circle cx="-6" cy="-30" r="9"/><circle cx="32" cy="-36" r="9"/><circle cx="58" cy="-28" r="8"/><circle cx="-62" cy="-26" r="8"/></g>
</g></g>`;
document.getElementById('bowlMount').innerHTML=bowlSVG('bowl')+bowlSVG('bowl2')+`<g id="spoon" opacity="0"><g id="spoonIn"><path d="M0,0 L70,-70" stroke="#C9CED6" stroke-width="12" stroke-linecap="round"/><ellipse cx="-4" cy="6" rx="26" ry="16" transform="rotate(-40 -4 6)" fill="#E5E9F0" ${sw(5)}/></g></g>`;

/* ---------------- fx pools: hearts, sparkles, syrup drops, cereal bits, bubbles, steam ---------------- */
const heartPath='M0,14 C-34,-8 -26,-34 -10,-30 C-4,-28 0,-22 0,-18 C0,-22 4,-28 10,-30 C26,-34 34,-8 0,14Z';
const starPath='M0,-26 Q4,-4 26,0 Q4,4 0,26 Q-4,4 -26,0 Q-4,-4 0,-26Z';
const NH=16, NS=14, ND=8, NB=10, NU=8;
let fx='';
for(let i=0;i<NH;i++) fx+=`<g id="hw${i}"><g id="hr${i}" class="hrt" opacity="0"><path d="${heartPath}" fill="#FF3D6E" ${sw(3)}/></g></g>`;
for(let i=0;i<NS;i++) fx+=`<g id="sw${i}"><g id="sp${i}" class="spk" opacity="0"><path d="${starPath}" fill="#FFF6B0" stroke="#FFD84A" stroke-width="3"/></g></g>`;
for(let i=0;i<ND;i++) fx+=`<g id="dw${i}"><g id="dr${i}" class="drp" opacity="0"><path d="M0,-14 C9,-2 12,4 0,10 C-12,4 -9,-2 0,-14Z" fill="#D9821A" ${sw(3)}/></g></g>`;
for(let i=0;i<NB;i++) fx+=`<g id="bw${i}"><g id="bt${i}" class="bit" opacity="0"><circle r="10" fill="none" stroke="#E7A33A" stroke-width="8"/></g></g>`;
for(let i=0;i<NU;i++) fx+=`<g id="uw${i}"><g id="ub${i}" class="bub" opacity="0"><circle r="15" fill="#fff" fill-opacity=".6" ${sw(4)}/><circle cx="-5" cy="-5" r="4" fill="#fff"/></g></g>`;
for(let i=0;i<3;i++) fx+=`<g transform="translate(${1040+i*50},1030)"><path class="steam s${i}" opacity="0" d="M0,0 C14,-26 -14,-46 0,-76 C14,-106 -14,-126 0,-156" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/></g>`;
for(let i=0;i<6;i++) fx+=`<g id="cw${i}"><g id="cc${i}" class="ccb" opacity="0"><rect x="-17" y="-17" width="34" height="34" rx="7" fill="#FFD84A" ${sw(5)}/><circle cx="-4" cy="-4" r="5" fill="#E8B52E"/><circle cx="7" cy="8" r="4" fill="#E8B52E"/></g></g>`;
for(let i=0;i<4;i++) fx+=`<g id="zw${i}"><text id="zz${i}" class="zzz" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="84" fill="#fff" stroke="#2b1a14" stroke-width="11" stroke-linejoin="round" paint-order="stroke" opacity="0">Z</text></g>`;
document.getElementById('fxMount').innerHTML=fx;

/* ---------------- captions (word-timed by Whisper, words from the real script) ---------------- */
const HLC={'':'#FFE14D',MOCHI:'#9FB4FF',FLAPJACK:'#FF8FC4',TRUFFLE:'#FFA6B8',BO:'#FFB35C',NIBBLES:'#E6B7D6'};
const CAP_BOTTOM=new Set([1,2,3,4,5,6,7,8,9,10,11]);
const capsEl=document.getElementById('caps'), capsB=document.getElementById('capsB'), allChunks=[];
for(const ln of [1,2,3,4,5,6,7,8,9,10,11]){let idx=0;const ws=WD[ln], tag=PLAN.tags[ln], hl=HLC[tag];
 PLAN.chunks[ln].forEach((txt,ci)=>{const el=document.createElement('div');el.className='cg';
  if(tag){const tg=document.createElement('div');tg.className='tag';tg.textContent=tag+':';tg.style.color=hl;el.appendChild(tg);}
  const items=txt.split(' ').map(pt=>{const sp=document.createElement('span');sp.className='w';sp.textContent=pt;el.appendChild(sp);const w=ws[idx++];return{sp,s:L[ln]+w.s,e:L[ln]+w.e,hl};});
  (CAP_BOTTOM.has(ln)?capsB:capsEl).appendChild(el);allChunks.push({el,items});});}

/* ---------------- TIMELINE ---------------- */
const tl=gsap.timeline({paused:true});
// every fromTo starts at its own time (not at authoring time) so seeks are deterministic
{const _ft=tl.fromTo.bind(tl);tl.fromTo=(t,f,to,pos)=>_ft(t,f,Object.assign({immediateRender:false},to),pos);}
const BX=540, FLOOR=1640, TT=1165, PL=68, RKT=TT, RKB=1400, RKF=1600, TUBX=1090, TUBY=1110, RKX=1370;
const W=(ln,i)=>L[ln]+WD[ln][i].s, WE=(ln,i)=>L[ln]+WD[ln][i].e;

gsap.set('#cam',{transformOrigin:'0 0'});
gsap.set('#boSq,#boLean,#boBody,#bowlIn,#bowl2In,.spk,.hrt,.drp,.bit,.bub,.ccb,.zzz,#wedgeBigIn',{svgOrigin:'0 0'});
gsap.set('#pigIn',{svgOrigin:'550 736'});gsap.set('#pigSnout',{svgOrigin:'550 716'});
gsap.set('#boTail,#boLegL,#boLegR,#boArmL,#boArmR,#boHead,#boEarL,#boEarR,#boScarfTail,.boEye,.boEyeW,.boBrow,.boPupil',{svgOrigin:'0 0'});
for(const p of ['pan','bh']) gsap.set(`#${p},#${p}Sq,#${p}Shake,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
for(const p of ['mc','nb','nm']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Body,#${p}Head,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('.cg',{transformOrigin:'50% 50%'});
gsap.set('.steam',{attr:{stroke:'#FFE27A'}});
// ---- starting state = the last frame of video #3 (Nibbles in his hole); everything else waits off-screen
const MCS=.66, NSC=.46, BOX=500, BOS=.88, FJY=TT-PL;
gsap.set('#bo',{x:BOX,y:FLOOR,scale:BOS});
gsap.set('#bowl,#bowl2,#spoon',{opacity:0});
gsap.set('#pan',{opacity:0,x:BOX,y:1122});gsap.set('#panLegs',{opacity:1});gsap.set('#panEyesClosed',{opacity:0});gsap.set('#panEyes',{opacity:1});
gsap.set('#panGlaze',{opacity:1});gsap.set('#panArmL',{rotation:-30});gsap.set('#panArmR',{rotation:30});
gsap.set('#bh',{opacity:1});gsap.set('#bhGlaze',{opacity:1});gsap.set('#bhArmL',{rotation:-40});gsap.set('#bhArmR',{rotation:40});
gsap.set('#mc',{x:CHX,y:CHTOP,scale:MCS});
gsap.set('#nb',{x:1640,y:1476,scale:NSC});gsap.set('#nbCheese',{opacity:1});
gsap.set('#nm',{opacity:0,x:1640,y:1476,scale:NSC});
gsap.set('#pigG',{opacity:0});

let camCur=null;
const camSet=(t,x0,y0,s)=>{camCur=[x0,y0,s];tl.set('#cam',{x:-x0*s,y:-y0*s,scale:s},t);};
const camTo=(t,d,x0,y0,s,ease='sine.inOut')=>{const [a,b,c]=camCur;tl.fromTo('#cam',{x:-a*c,y:-b*c,scale:c},{x:-x0*s,y:-y0*s,scale:s,duration:d,ease},t);camCur=[x0,y0,s];};
const shake=(t,amp=14,n=6)=>{for(let i=0;i<n;i++){tl.to('#shake',{x:(i%2?1:-1)*amp*(1-i/n),y:(i%2?-1:1)*amp*.7*(1-i/n),duration:.045},t+i*.045);}tl.to('#shake',{x:0,y:0,duration:.05},t+n*.045);};

/* --- Bo helpers (as in video 1) --- */
const MOUTHS=['mSmile','mOpen','mBig','mFrown','mO'];
const bm=(t,m)=>MOUTHS.forEach(k=>tl.set('#'+k,{opacity:k===m?1:0},t));
const blink=(t)=>{tl.to('.boEye',{scaleY:.1,duration:.05},t).to('.boEye',{scaleY:1,duration:.07},t+.06);};
const look=(t,dx,dy,d=.14)=>tl.to('.boPupil',{x:dx,y:dy,duration:d,ease:'power2.out'},t);
const eyesMode=(t,m)=>{tl.set('#boEyes',{opacity:m==='hearts'?0:1},t);tl.set('#boHeartEyes',{opacity:m==='hearts'?1:0},t);
 if(m!=='hearts') tl.to('.boEyeW',{scale:m==='wide'?1.22:1,duration:.1,ease:'back.out(2)'},t);
 if(m!=='hearts') tl.to('.boPupil',{scale:m==='wide'?.62:1,duration:.1},t);};
const brows=(t,l,r,y=0,d=.15)=>{tl.to('#boBrowL',{rotation:l,y,duration:d},t);tl.to('#boBrowR',{rotation:r,y,duration:d},t);};
function cycle(legs,arms,t0,t1,period,legAmp,armAmp,sq,bob){
 const h=period/2;let k=0;
 tl.set(legs.concat(arms),{rotation:0},t0);
 for(let t=t0;t<t1-h+1e-6;t+=h,k++){const a=k%2?1:-1;
  tl.to(legs[0],{rotation:legAmp*a,duration:h,ease:'sine.inOut'},t);tl.to(legs[1],{rotation:-legAmp*a,duration:h,ease:'sine.inOut'},t);
  if(arms.length){tl.to(arms[0],{rotation:-armAmp*a,duration:h,ease:'sine.inOut'},t);tl.to(arms[1],{rotation:armAmp*a,duration:h,ease:'sine.inOut'},t);}
  tl.fromTo(sq,{y:0},{y:-bob,duration:h/2,ease:'power1.out'},t);tl.to(sq,{y:0,duration:h/2,ease:'power1.in'},t+h/2);}
 tl.to(legs.concat(arms),{rotation:0,duration:.15},t1);}

/* --- Flapjack helpers (one per instance) --- */
function mkPan(p){const MS=['Sm','Gr','Wo','Oh'];
 return{
  pm:(t,m)=>MS.forEach(k=>tl.set(`#${p}${k}`,{opacity:k===m?1:0},t)),
  blink:(t)=>{tl.to(`.${p}Eye`,{scaleY:.1,duration:.05},t).to(`.${p}Eye`,{scaleY:1,duration:.07},t+.06);},
  look:(t,dx,dy,d=.12)=>tl.to(`.${p}Pupil`,{x:dx,y:dy,duration:d,ease:'power2.out'},t),
  eyes:(t,open)=>{tl.set(`#${p}Eyes`,{opacity:open?1:0},t);tl.set(`#${p}EyesClosed`,{opacity:open?0:1},t);},
  brows:(t,on,l=16,r=-16)=>{tl.set(`#${p}BrowL,#${p}BrowR`,{opacity:on?1:0},t);if(on){tl.to(`#${p}BrowL`,{rotation:l,duration:.12},t);tl.to(`#${p}BrowR`,{rotation:r,duration:.12},t);}},
  talk:(t0,t1,a='Gr',b='Sm',st=.13)=>{let k=0;for(let t=t0;t<t1;t+=st,k++)tl.set(`#${p}${k%2?b:a}`,{opacity:1},t),tl.set(`#${p}${k%2?a:b}`,{opacity:0},t);tl.set(`#${p}${b}`,{opacity:1},t1);tl.set(`#${p}${a}`,{opacity:0},t1);}
 };}
const FJ=mkPan('pan'), FB=mkPan('bh');

/* --- Rocky helpers (one per instance) --- */
function mkRock(p){const MS=['mSm','mOp','mBg','mFr','mO'];
 return{
  m:(t,k)=>MS.forEach(s=>tl.set(`#${p}${s}`,{opacity:s===k?1:0},t)),
  blink:(t)=>{tl.to(`.${p}Eye`,{scaleY:.1,duration:.05},t).to(`.${p}Eye`,{scaleY:1,duration:.07},t+.06);},
  look:(t,dx,dy,d=.14)=>tl.to(`.${p}Pupil`,{x:dx,y:dy,duration:d,ease:'power2.out'},t),
  eyes:(t,mode)=>{tl.set(`#${p}Eyes`,{opacity:mode==='happy'?0:1},t);tl.set(`#${p}EyesHappy`,{opacity:mode==='happy'?1:0},t);
   if(mode!=='happy'){tl.to(`.${p}EyeW`,{scale:mode==='wide'?1.2:1,duration:.1,ease:'back.out(2)'},t);tl.to(`.${p}Pupil`,{scale:mode==='wide'?.62:1,duration:.1},t);}},
  brows:(t,l,r,y=0,d=.15)=>{tl.to(`#${p}BrowL`,{rotation:l,y,duration:d},t);tl.to(`#${p}BrowR`,{rotation:r,y,duration:d},t);},
  talk:(t0,t1,a='mOp',b='mSm',st=.12)=>{let k=0;for(let t=t0;t<t1;t+=st,k++){tl.set(`#${p}${k%2?b:a}`,{opacity:1},t);tl.set(`#${p}${k%2?a:b}`,{opacity:0},t);}tl.set(`#${p}${b}`,{opacity:1},t1);tl.set(`#${p}${a}`,{opacity:0},t1);}
 };}
const MC=mkRock('mc'), NM=mkRock('nb'), NN=mkRock('nm');

/* --- fx --- */
const cnt={h:0,s:0,d:0,b:0,u:0};
function hearts(t,x,y,n=5,sp=60,rise=300,dly=.08){for(let k=0;k<n;k++){const i=(cnt.h++)%NH,tt=t+k*dly;
 tl.set('#hw'+i,{x:x+(k-(n-1)/2)*sp+(k%2?12:-12),y:y+(k%2?-24:0)},tt);
 tl.fromTo('#hr'+i,{opacity:0,y:0,scale:.3},{opacity:1,y:-rise*.25,scale:1,duration:.3,ease:'back.out(2)'},tt);
 tl.to('#hr'+i,{y:-rise,opacity:0,duration:1.0,ease:'sine.out'},tt+.3);}}
function sparks(t,x,y,n=6,r=120){for(let k=0;k<n;k++){const i=(cnt.s++)%NS,a=k/n*Math.PI*2+.4,tt=t+k*.04,rr=r*(.6+(k%2)*.5);
 tl.set('#sw'+i,{x:x+Math.cos(a)*rr,y:y+Math.sin(a)*rr},tt);
 tl.fromTo('#sp'+i,{opacity:0,scale:.2,rotation:0},{opacity:1,scale:1.1,rotation:40,duration:.22,ease:'back.out(3)'},tt);
 tl.to('#sp'+i,{opacity:0,scale:.2,duration:.28},tt+.5);}}
function drops(t,x,y,n=6){for(let k=0;k<n;k++){const i=(cnt.d++)%ND,dx=(k-(n-1)/2)*38;
 tl.set('#dw'+i,{x,y},t);
 tl.fromTo('#dr'+i,{opacity:1,x:0,y:0,scale:1},{x:dx,y:-150-(k%3)*40,duration:.28,ease:'power2.out'},t);
 tl.to('#dr'+i,{x:dx*1.5,y:30,opacity:0,duration:.3,ease:'power2.in'},t+.28);}}
function bits(t,x,y,n=6){for(let k=0;k<n;k++){const i=(cnt.b++)%NB,dx=(k%2?1:-1)*(40+k*18);
 tl.set('#bw'+i,{x,y},t+k*.02);
 tl.fromTo('#bt'+i,{opacity:1,x:0,y:0,rotation:0},{x:dx,y:-130-(k%3)*45,rotation:200,duration:.3,ease:'power2.out'},t+k*.02);
 tl.to('#bt'+i,{x:dx*1.4,y:60,opacity:0,duration:.35,ease:'power2.in'},t+k*.02+.3);}}
function bubbles(t,x,y,n=4){for(let k=0;k<n;k++){const i=(cnt.u++)%NU,tt=t+k*.18,dx=(k%2?1:-1)*(20+k*14);
 tl.set('#uw'+i,{x:x+dx,y},tt);
 tl.fromTo('#ub'+i,{opacity:0,scale:.3,y:0},{opacity:1,scale:1,y:-60,duration:.4,ease:'sine.out'},tt);
 tl.to('#ub'+i,{y:-130,scale:1.3,opacity:0,duration:.35,ease:'sine.in'},tt+.4);}}
function steam(a,b){for(let i=0;i<3;i++)for(let t=a+i*.45;t<b;t+=1.35){tl.fromTo('.s'+i,{opacity:0,y:0},{opacity:.75,y:-30,duration:.6,ease:'sine.out'},t).to('.s'+i,{opacity:0,y:-60,duration:.7},t+.6);}}

/* ===== captions ===== */
allChunks.forEach((c,i)=>{const nxt=allChunks[i+1];const s=c.items[0].s-.03;let e=c.items[c.items.length-1].e+.2;if(nxt)e=Math.min(e,nxt.items[0].s-.05);
 tl.fromTo(c.el,{opacity:0,scale:.82},{opacity:1,scale:1,duration:.13,ease:'back.out(2.4)'},s);
 c.items.forEach(w=>{tl.fromTo(w.sp,{color:'#ffffff',scale:1},{color:w.hl,scale:1.14,duration:.07,ease:'back.out(3)'},w.s);tl.to(w.sp,{color:'#ffffff',scale:1,duration:.1},w.e);});
 tl.set(c.el,{opacity:0},e);});

/* ===== this episode's key moments (all derived from the voice timings) ===== */
const WIDE=[305,215,.97];
const NBY=1448;                                          // Nibbles' standing height in the hole
const TRA=700, TRB=1020;                                   // Flapjack's running track on the table top
const tBite=[W(1,1),W(1,2)+.04,W(1,3),W(1,4)];           // 4 bites of his last cheese ("GOBBLED HIS LAST BITE")
const tWant=W(1,9);                                      // "WANTED"
const tHop=L[4]-.5;                                      // Flapjack hops off Bo's head onto the table
const tWake=L[5]-.55;                                    // Mochi stirs
const tDown=L[6]-.5;                                     // Mochi steps down off the cheese
const tch0=L[6]-.1;                                      // the chase
const tN0=L[6]+.9;                                      // Nibbles slips out of his hole
const tPickN=L[8]-.35;                                   // Nibbles takes the wedge
const tToss=[W(9,0)+.1,W(9,1)+.2,W(9,1)+.5];           // cheese cubes fly: Mochi, Bo, Flapjack
const tHush=W(10,0)-.05, tPig=W(10,2)-.35;                 // "BUT THEN..." / "SNIFF, SNIFF"
const tStk=L[11]+DU[11]+.15;

/* --- small helpers --- */
let ccn=0;
function chunk(t,x0,y0,x1,y1,dur=.6,hgt=220){const i=(ccn++)%6;
 tl.set('#cw'+i,{x:x0,y:y0},t);
 tl.fromTo('#cc'+i,{opacity:1,x:0,rotation:0,scale:1},{x:x1-x0,rotation:380,duration:dur,ease:'none'},t);
 tl.fromTo('#cc'+i,{y:0},{y:-hgt,duration:dur*.45,ease:'power2.out'},t).to('#cc'+i,{y:y1-y0,duration:dur*.55,ease:'power2.in'},t+dur*.45);
 tl.set('#cc'+i,{opacity:0},t+dur);}
let zzn=0;
function zzz(t0,t1,x,y){let k=0;for(let t=t0;t<t1;t+=.95,k++){const i=(zzn++)%4;
 tl.set('#zw'+i,{x:x+(k%2)*26,y},t);
 tl.fromTo('#zz'+i,{opacity:0,scale:.4,y:0},{opacity:1,scale:1,y:-60,duration:.35,ease:'back.out(2)'},t);
 tl.to('#zz'+i,{y:-150,opacity:0,scale:1.25,duration:.6,ease:'sine.in'},t+.35);}}
const mcEyes=(t,mode)=>{
 tl.set('#mcEyes',{opacity:(mode==='sleep'||mode==='happy')?0:1},t);
 tl.set('#mcEyesSleep',{opacity:mode==='sleep'?1:0},t);
 tl.set('#mcEyesHappy',{opacity:mode==='happy'?1:0},t);
 tl.set('#mcLids',{opacity:mode==='lids'?1:0},t);
 if(mode==='wide'||mode==='open'||mode==='lids'){tl.to('.mcEyeW',{scale:mode==='wide'?1.2:1,duration:.1},t);tl.to('.mcPupil',{scale:mode==='wide'?.62:1,duration:.1},t);}};
const arc=(sel,t0,dur,y0,h,y1=y0)=>{tl.fromTo(sel,{y:y0},{y:Math.min(y0,y1)-h,duration:dur*.45,ease:'power2.out'},t0).to(sel,{y:y1,duration:dur*.55,ease:'power2.in'},t0+dur*.45);};

/* ================= SCENE 1: Nibbles gobbles his last bite of cheese ================= */
camSet(0,1370,900,2.0);
tl.to('#nb',{y:NBY,duration:.3,ease:'back.out(2)'},.05);
NM.m(0,'mSm');NM.eyes(0,'normal');NM.look(0,0,10,.01);NM.brows(0,0,0,0,.01);
tl.fromTo('#nbHead',{rotation:-2},{rotation:2,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},0);
tBite.forEach((t,i)=>{
 tl.to('#nbCheese',{scale:[.76,.5,.26,.001][i],duration:.09,ease:'power2.out'},t);
 NM.m(t-.04,'mBg');NM.m(t+.11,'mSm');
 tl.fromTo('#nbHead',{y:0},{y:5,duration:.07,yoyo:true,repeat:1},t);});
tl.set('#nbCheese',{opacity:0},tBite[3]+.1);
sparks(tBite[3]+.12,1640,1330,5,100);
NM.eyes(tBite[3]+.2,'happy');
// licks his lips, then notices the cheese is gone
NM.eyes(tWant-.25,'normal');NM.m(tWant-.25,'mFr');NM.brows(tWant-.25,-16,16,-8,.15);NM.look(tWant-.2,0,-16,.15);
tl.fromTo('#nbHead',{y:0},{y:-10,duration:.12,yoyo:true,repeat:3},tWant+.1);     // sniff, sniff
tl.fromTo('#nbEarL',{rotation:0},{rotation:-14,duration:.25,yoyo:true,repeat:3},tWant);
tl.fromTo('#nbEarR',{rotation:0},{rotation:14,duration:.25,yoyo:true,repeat:3},tWant+.1);
NM.look(W(1,10)+.1,34,-6,.25);                        // looks toward the table: something smells good over there

/* ================= SCENE 2: Mochi is napping on the big cheese ================= */
camTo(L[2]-.8,.95,760,480,1.3);
mcEyes(0,'sleep');MC.m(0,'mSm');
tl.set('#mcHead',{rotation:13},0);tl.set('#mcSq',{scaleY:.86},0);
tl.set('#mcArmL',{rotation:-28},0);tl.set('#mcArmR',{rotation:28},0);
tl.fromTo('#mcSq',{scaleY:.86},{scaleY:.91,duration:1.15,yoyo:true,repeat:Math.ceil((tWake-.1)/1.15),ease:'sine.inOut'},0);
tl.fromTo('#mcTail',{rotation:-5},{rotation:7,duration:1.4,yoyo:true,repeat:Math.ceil(tWake/1.4),ease:'sine.inOut'},0);
zzz(L[2]-.7,tWake,1262,800);
tl.fromTo('#mcEarL',{rotation:0},{rotation:-8,duration:.1,yoyo:true,repeat:1},W(2,5));
sparks(W(2,9)-.05,CHX,1000,7,170);                      // "the BIG CHEESE" glitters
camTo(W(2,8)-.1,.7,780,470,1.38);

/* ================= SCENE 3: Bo: "Operation Cheese is a go!" ================= */
camTo(L[3]-.55,.8,...WIDE);
look(L[3]-.5,22,-12,.2);brows(L[3]-.5,12,-12,-6,.15);bm(L[3]-.5,'mSmile');
[0,1,2,3,4].forEach(i=>bm(W(3,i),['mOpen','mBig','mOpen','mSmile','mBig'][i]));bm(WE(3,4)+.12,'mSmile');
tl.to('#boArmR',{rotation:-165,duration:.22,ease:'back.out(2.5)'},W(3,2));
tl.fromTo('#boArmR',{rotation:-165},{rotation:-135,duration:.14,yoyo:true,repeat:3},W(3,4)-.1);
tl.fromTo('#boSq',{y:0},{y:-30,duration:.12,yoyo:true,repeat:3,ease:'power1.out'},W(3,4)-.1);
FB.pm(L[3]-.3,'Sm');FB.look(L[3]-.3,18,-4,.15);FB.brows(L[3]-.3,true,14,-14);
tl.fromTo('#bhSq',{scaleY:1},{scaleY:.9,duration:.12,yoyo:true,repeat:3},W(3,4)-.1);
hearts(W(3,1)+.05,520,1000,3,70,200);

/* ================= SCENE 4: Flapjack bounces up as bait: "Catch me if you can!" ================= */
tl.set('#bh',{opacity:0},tHop);tl.set('#pan',{opacity:1,x:BOX,y:1122},tHop);
tl.fromTo('#pan',{x:BOX},{x:740,duration:.5,ease:'none'},tHop);
arc('#pan',tHop,.5,1122,200,FJY);
tl.to('#boArmR',{rotation:0,duration:.3},tHop+.1);
eyesMode(tHop+.3,'normal');look(tHop+.3,26,-16,.15);bm(tHop+.3,'mOpen');brows(tHop+.3,-14,14,-12,.1);
FJ.pm(tHop,'Gr');FJ.brows(tHop,true,14,-14);FJ.look(tHop,18,0,.1);
tl.fromTo('#panSq',{scaleX:1.14,scaleY:.84},{scaleX:1,scaleY:1,duration:.4,ease:'elastic.out(1,.4)'},tHop+.5);
tl.set('#panGlaze',{opacity:1},tHop);
FJ.talk(L[4]+.05,L[4]+DU[4]-.05,'Gr','Sm');
tl.fromTo('#panSq',{scaleY:1},{scaleY:.88,duration:.1,yoyo:true,repeat:Math.round(DU[4]/.2)},L[4]+.1);
tl.fromTo('#panArmL',{rotation:-60},{rotation:-150,duration:.15,yoyo:true,repeat:Math.round(DU[4]/.3)},L[4]);
tl.fromTo('#panArmR',{rotation:60},{rotation:150,duration:.15,yoyo:true,repeat:Math.round(DU[4]/.3)},L[4]+.07);
tl.to('#pan',{x:840,duration:DU[4],ease:'sine.inOut'},L[4]);
hearts(L[4]+.3,760,950,2,70,180);
// Mochi's ear twitches
tl.fromTo('#mcEarL',{rotation:0},{rotation:-12,duration:.1,yoyo:true,repeat:1},L[4]+.3);
tl.fromTo('#mcEarR',{rotation:0},{rotation:12,duration:.1,yoyo:true,repeat:1},L[4]+.9);

/* ================= SCENE 5: Mochi wakes up: "Hmph. Obviously." ================= */
camTo(tWake-.2,.7,640,430,1.25);
mcEyes(tWake,'lids');MC.m(tWake,'mOp');
tl.to('#mcHead',{rotation:0,duration:.4,ease:'sine.out'},tWake);
tl.to('#mcSq',{scaleY:1,duration:.55,ease:'back.out(1.6)'},tWake+.1);
tl.to('#mcArmL',{rotation:140,duration:.35,ease:'sine.out'},tWake);tl.to('#mcArmR',{rotation:-140,duration:.35,ease:'sine.out'},tWake);      // big stretch
MC.m(tWake+.15,'mBg');MC.m(tWake+.55,'mFr');
tl.to('#mcArmL',{rotation:0,duration:.3},tWake+.5);tl.to('#mcArmR',{rotation:0,duration:.3},tWake+.5);
MC.brows(tWake+.5,8,-8,2,.2);MC.look(tWake+.55,-26,0,.25);
// "HMPH." turns her nose up, "OBVIOUSLY." rolls her eyes
tl.to('#mcHead',{rotation:-9,duration:.25},W(5,0));MC.m(W(5,0),'mFr');
MC.look(W(5,1),-22,-24,.18);MC.look(W(5,1)+.45,18,-22,.25);MC.look(W(5,1)+.8,-24,6,.2);
MC.talk(W(5,1),WE(5,1)-.05,'mOp','mFr',.15);
tl.to('#mcHead',{rotation:7,duration:.35,ease:'sine.inOut'},W(5,1));
tl.to('#mcHead',{rotation:0,duration:.25},L[5]+DU[5]-.2);
mcEyes(L[5]+DU[5]-.15,'open');MC.m(L[5]+DU[5],'mSm');MC.brows(L[5]+DU[5],10,-10,0,.1);
// Flapjack realises what she has done
FJ.pm(tWake+.1,'Oh');FJ.look(tWake+.1,22,-6,.1);FJ.brows(tWake+.1,true,-16,16);
tl.fromTo('#panShake',{rotation:-4},{rotation:4,duration:.06,yoyo:true,repeat:Math.round((L[5]+DU[5]-tWake)/.06)},tWake+.4);
tl.set('#panShake',{rotation:0},L[5]+DU[5]);
FJ.pm(L[5]+DU[5]-.15,'Wo');
// Bo cannot look
eyesMode(tWake,'wide');bm(tWake,'mO');look(tWake,26,-10,.1);
tl.set('#boSweat',{opacity:1},tWake+.4);

/* ================= SCENE 6: the chase on the table top ================= */
camTo(tDown-.2,.6,...WIDE);
// Mochi steps down off the cheese
tl.fromTo('#mc',{x:CHX},{x:1010,duration:.45,ease:'none'},tDown);
arc('#mc',tDown,.45,CHTOP,120,TT);
tl.to('#mcArmL',{rotation:90,duration:.2},tDown);tl.to('#mcArmR',{rotation:-90,duration:.2},tDown);
tl.to('#mcArmL',{rotation:0,duration:.2},tDown+.4);tl.to('#mcArmR',{rotation:0,duration:.2},tDown+.4);
MC.m(tDown,'mBg');MC.m(tDown+.5,'mSm');
// Flapjack path (F) and Mochi's chasing path (M)
const fk=[], mk=[];                       // keyframes [t, x, kind]
fk.push([0,830,'run']);
let t=.45;fk.push([t,TRA,'run']);
const hopsF=[];
const cycles=Math.ceil((L[8]-tch0+.5)/2);
for(let c=0;c<cycles;c++){
 hopsF.push([t,t+.5,TRA,TRA+200]);fk.push([t+.5,TRA+200,'hop']);t+=.5;fk.push([t+.5,TRB,'run']);t+=.5;
 hopsF.push([t,t+.5,TRB,TRB-200]);fk.push([t+.5,TRB-200,'hop']);t+=.5;fk.push([t+.5,TRA,'run']);t+=.5;}
const tA=(()=>{let x=.45;while(tch0+x<L[7]+.2||false)x+=2;return x;})();      // the moment Mochi finally catches her (first arrival at the left end after the camera left)
// M: lunges under every hop, overshoots, turns
mk.push([0,1010]);let mt=.7,left=true;
while(mt<tA+.2){mk.push([mt,left?TRA+100:TRB-100]);mk.push([mt+.25,left?TRA+50:TRB+(-100)+60]);mt+=1.0;left=!left;}
const mAt=(arr,tt)=>{if(tt<=arr[0][0])return arr[0][1];for(let k=1;k<arr.length;k++)if(tt<=arr[k][0]){const a=arr[k-1],b=arr[k];return a[1]+(b[1]-a[1])*((tt-a[0])/(b[0]-a[0]));}return arr[arr.length-1][1];};
// Flapjack tweens
for(let k=1;k<fk.length;k++){const a=fk[k-1],b=fk[k];if(a[0]>=tA)break;const d=Math.min(b[0],tA)-a[0];if(d<=0)continue;
 tl.fromTo('#pan',{x:a[1]},{x:a[1]+(b[1]-a[1])*(d/(b[0]-a[0])),duration:d,ease:'none'},tch0+a[0]);}
hopsF.forEach(h=>{if(h[0]<tA)arc('#pan',tch0+h[0],h[1]-h[0],FJY,220,FJY);});
// the legs and arms of the runner
tl.set('#panLegs',{opacity:1},tch0);
cycle(['#panLegL','#panLegR'],[],tch0,tch0+tA,.22,42,0,'#panSq',5);
tl.fromTo('#panArmL',{rotation:-120},{rotation:-40,duration:.12,yoyo:true,repeat:Math.round(tA/.12)},tch0);
tl.fromTo('#panArmR',{rotation:120},{rotation:40,duration:.12,yoyo:true,repeat:Math.round(tA/.12)},tch0+.06);
FJ.pm(tch0,'Wo');FJ.look(tch0,-18,0,.1);
hopsF.forEach(h=>{if(h[0]<tA){FJ.pm(tch0+h[0],'Gr');FJ.pm(tch0+h[1],'Wo');}});
// Mochi tweens (lazy cat, but fast when it counts)
for(let k=1;k<mk.length;k++){const a=mk[k-1],b=mk[k];if(a[0]>=tA)break;const d=Math.min(b[0],tA)-a[0];
 tl.fromTo('#mc',{x:a[1]},{x:a[1]+(b[1]-a[1])*(d/(b[0]-a[0])),duration:d,ease:'none'},tch0+a[0]);
 tl.to('#mcLean',{rotation:b[1]>a[1]?10:-10,duration:.15},tch0+a[0]);}
cycle(['#mcLegL','#mcLegR'],['#mcArmL','#mcArmR'],tch0,tch0+tA,.28,30,40,'#mcSq',10);
tl.fromTo('#mcTail',{rotation:-12},{rotation:14,duration:.14,yoyo:true,repeat:Math.round(tA/.14)},tch0);
MC.m(tch0,'mBg');MC.brows(tch0,16,-16,0,.1);MC.look(tch0,0,-22,.1);
mcEyes(tch0,'wide');
for(let tt=tch0+.6;tt<tch0+tA-.3;tt+=1.0){tl.to('#mcArmL',{rotation:150,duration:.12},tt);tl.to('#mcArmR',{rotation:-150,duration:.12},tt);}   // pounces
// Bo watches the ping-pong
for(let tt=tch0;tt<tch0+tA;tt+=.5){look(tt,(Math.floor((tt-tch0)/.5)%2)?-26:26,-14,.2);}
shake(tch0+.9,5,3);shake(tch0+2.9,5,3);

/* ================= SCENE 7: Nibbles tiptoes up to the cheese ================= */
camTo(L[7]-.75,.9,950,270,1.0);
tl.set('#nb',{opacity:0},tN0);tl.set('#nm',{opacity:1,x:1640,y:NBY,scale:NSC},tN0);
NN.m(tN0,'mSm');NN.eyes(tN0,'wide');NN.look(tN0,-20,6,.1);NN.brows(tN0,-12,12,-8,.1);
tl.set('#nmCheese',{opacity:0},tN0);
sparks(tN0,1640,1380,4,70);
// hop out to the floor, tiptoe to the table leg
const tN1=tN0+.3, tN2=tN1+.8, tN3=tN2+.9, tN4=tN3+.35;
tl.fromTo('#nm',{x:1640},{x:1590,duration:.3,ease:'none'},tN0);arc('#nm',tN0,.3,NBY,50,1580);
tl.fromTo('#nm',{x:1590},{x:1470,duration:tN2-tN1,ease:'none'},tN1);
cycle(['#nmLegL','#nmLegR'],[],tN1,tN2,.4,22,0,'#nmSq',5);
tl.to('#nmArmL',{rotation:-22,duration:.2},tN1);tl.to('#nmArmR',{rotation:22,duration:.2},tN1);
NN.look(tN1+.2,-24,0,.15);NN.look(tN1+.6,-24,-18,.15);
// climb the table leg
tl.to('#nm',{x:1458,duration:.2},tN2);
tl.fromTo('#nm',{y:1580},{y:1190,duration:tN3-tN2,ease:'none'},tN2);
cycle(['#nmLegL','#nmLegR'],[],tN2,tN3,.3,32,0,'#nmSq',3);
for(let tt=tN2,k=0;tt<tN3-.05;tt+=.15,k++){tl.to('#nmArmL',{rotation:k%2?150:60,duration:.15,ease:'none'},tt);tl.to('#nmArmR',{rotation:k%2?-60:-150,duration:.15,ease:'none'},tt);}
NN.look(tN2,-10,-26,.1);NN.m(tN2,'mO');tl.set('#nmBrowL',{rotation:-10},tN2);
// over the edge
tl.to('#nm',{x:1432,y:TT,duration:.35,ease:'power2.out'},tN3);
tl.to('#nmArmL',{rotation:-20,duration:.2},tN3+.15);tl.to('#nmArmR',{rotation:20,duration:.2},tN3+.15);
NN.m(tN3+.2,'mSm');NN.look(tN3+.2,-26,4,.15);
// the slow, suspicious tiptoe past the cheese wheel
const tTip0=Math.max(tN4,W(7,2)-.1), tTip1=tPickN-.1, XP=1222;
tl.fromTo('#nm',{x:1432},{x:XP,duration:tTip1-tTip0,ease:'none'},tTip0);
cycle(['#nmLegL','#nmLegR'],[],tTip0,tTip1,.62,14,0,'#nmSq',7);
for(let tt=tTip0,k=0;tt<tTip1;tt+=.55,k++){NN.look(tt,k%2?-26:12,k%2?4:-6,.18);}
NN.eyes(tTip0,'wide');NN.brows(tTip0,-14,14,-10,.1);
tl.fromTo('#nmTail',{rotation:-8},{rotation:10,duration:.35,yoyo:true,repeat:Math.round((tTip1-tTip0)/.35)},tTip0);
// grab the wedge
tl.set('#wedgeBig',{opacity:0},tPickN);
tl.set('#nmWedgeG',{opacity:1},tPickN);
tl.fromTo('#nmWedgeG',{scale:1.15},{scale:1.55,duration:.25,ease:'back.out(3)'},tPickN);
tl.to('#nmArmL',{rotation:-38,duration:.15},tPickN);tl.to('#nmArmR',{rotation:38,duration:.15},tPickN);
NN.m(tPickN,'mBg');NN.eyes(tPickN,'wide');NN.look(tPickN,0,10,.1);
sparks(tPickN+.1,XP,1050,6,110);

/* ================= SCENE 8: "Squeak! Cheese!" ================= */
camTo(L[8]-.45,.5,880,560,1.6);
NN.eyes(L[8]-.05,'normal');NN.m(L[8]-.05,'mSm');NN.brows(L[8]-.05,-8,8,-6,.1);NN.look(L[8],0,0,.1);
NN.talk(L[8],L[8]+DU[8]-.05,'mOp','mSm',.11);
tl.fromTo('#nm',{y:TT},{y:TT-46,duration:.13,yoyo:true,repeat:5,ease:'power1.out'},L[8]);
tl.to('#nmArmL',{rotation:-150,duration:.2,ease:'back.out(2)'},W(8,1));tl.to('#nmArmR',{rotation:150,duration:.2,ease:'back.out(2)'},W(8,1));
hearts(L[8]+.2,XP-215,1040,2,60,240);hearts(L[8]+.3,XP+215,1040,2,60,240);sparks(W(8,1),XP,1020,8,210);
tl.fromTo('#nmHead',{rotation:-5},{rotation:5,duration:.12,yoyo:true,repeat:5},L[8]);

/* ================= SCENE 9: cheese for everyone! ... sniff, sniff ================= */
camTo(L[9]-.25,.6,...WIDE);
// Mochi has caught the pancake (offscreen): she holds her like a plush toy
tl.set('#pan',{x:775,y:FJY},tch0+tA);tl.set('#mc',{x:830,y:TT},tch0+tA);
tl.set('#mcLean',{rotation:0},tch0+tA);
tl.set('#panLegs',{opacity:0},tch0+tA);
tl.to('#panSq',{scaleX:1.12,scaleY:.7,duration:.15},tch0+tA);
tl.set('#panEyes',{opacity:0},tch0+tA);tl.set('#panEyesClosed',{opacity:1},tch0+tA);
tl.to('#mcArmL',{rotation:-45,duration:.2},tch0+tA);tl.to('#mcArmR',{rotation:45,duration:.2},tch0+tA);
mcEyes(tch0+tA,'lids');MC.m(tch0+tA,'mFr');MC.brows(tch0+tA,10,-10,0,.1);MC.look(tch0+tA,26,0,.1);
tl.to('#mcTail',{rotation:0,duration:.2},tch0+tA);
// everybody had looked right: Bo calms down
eyesMode(L[9]-.2,'normal');bm(L[9]-.2,'mSmile');brows(L[9]-.2,0,0,0,.15);look(L[9]-.2,26,-6,.2);tl.set('#boSweat',{opacity:0},L[9]);
// Nibbles tosses cheese cubes
const NIX=XP, NIY=980;
chunk(tToss[0],NIX,NIY,830,930,.55,150);                // to Mochi
chunk(tToss[1],NIX,NIY,BOX,1286,.8,330);               // to Bo
chunk(tToss[2],NIX,NIY,775,1070,.62,200);              // to Flapjack
[tToss[0],tToss[1],tToss[2]].forEach((t,i)=>{tl.to('#nmArmR',{rotation:-110,duration:.1},t-.1);tl.to('#nmArmR',{rotation:38,duration:.2},t+.1);tl.to('#nmWedgeG',{scale:1.55-.1*(i+1),duration:.1},t);});
NN.eyes(tToss[0]-.1,'happy');NN.m(tToss[0]-.1,'mBg');
// Mochi catches hers; the cheese melts her heart
MC.m(tToss[0]+.45,'mOp');tl.set('#mcLids',{opacity:0},tToss[0]+.45);mcEyes(tToss[0]+.45,'open');
MC.m(tToss[0]+.6,'mFr');
MC.talk(tToss[0]+.62,tToss[0]+1.35,'mSm','mFr',.13);
mcEyes(tToss[0]+.9,'happy');MC.m(tToss[0]+1.4,'mSm');
sparks(tToss[0]+.9,830,900,5,90);hearts(tToss[0]+1.0,830,900,3,70,200);
// she lets Flapjack go
tl.to('#panSq',{scaleX:1,scaleY:1,duration:.3,ease:'elastic.out(1,.4)'},tToss[0]+1.1);
tl.set('#panEyesClosed',{opacity:0},tToss[0]+1.1);tl.set('#panEyes',{opacity:1},tToss[0]+1.1);
// Bo catches his in the mouth
bm(tToss[1]+.55,'mBig');bm(tToss[1]+.72,'mSmile');look(tToss[1]+.2,0,-30,.15);
tl.fromTo('#boHead',{rotation:0},{rotation:-6,duration:.12,yoyo:true,repeat:3},tToss[1]+.75);
eyesMode(tToss[1]+.8,'hearts');hearts(tToss[1]+.85,BOX,1100,3,70,220);
// Flapjack's cube
FJ.pm(tToss[2]+.45,'Gr');FJ.look(tToss[2]+.4,10,-14,.1);
tl.fromTo('#panSq',{scaleY:1},{scaleY:.86,duration:.1,yoyo:true,repeat:5},tToss[2]+.6);
FJ.pm(tToss[2]+1.0,'Sm');
// Nibbles keeps the biggest piece and munches
NN.m(tToss[2]+.3,'mSm');
// ---- "BUT THEN...": everybody freezes and looks up at the window
eyesMode(tHush,'wide');bm(tHush,'mO');look(tHush,-22,-30,.1);brows(tHush,-18,18,-14,.1);
FB.pm(tHush,'Oh');
FJ.pm(tHush,'Oh');FJ.look(tHush,-20,-20,.1);
mcEyes(tHush,'wide');MC.m(tHush,'mO');MC.look(tHush,-20,-26,.1);MC.brows(tHush,-14,14,-10,.1);
tl.fromTo('#mcSq',{y:0},{y:-24,duration:.14,ease:'power2.out'},tHush).to('#mcSq',{y:0,duration:.2,ease:'bounce.out'},tHush+.14);
NN.eyes(tHush,'wide');NN.m(tHush,'mO');NN.look(tHush,-26,-30,.1);
tl.fromTo('#boSq',{y:0},{y:-40,duration:.14,ease:'power2.out'},tHush).to('#boSq',{y:0,duration:.2,ease:'bounce.out'},tHush+.14);
// smell lines drift from the cheese towards the window
steam(tHush+.2,L[11]+DU[11]);
// the silhouette of a chef rises in the window and sniffs
tl.fromTo('#pigG',{opacity:0},{opacity:1,duration:.25},tPig);
tl.fromTo('#pigIn',{y:260,x:70,rotation:8},{y:0,x:0,rotation:0,duration:.6,ease:'back.out(1.5)'},tPig);
tl.fromTo('#pigSnout',{scale:1},{scale:1.22,duration:.1,yoyo:true,repeat:7},tPig+.6);
tl.fromTo('#pigIn',{y:0},{y:-14,duration:.11,yoyo:true,repeat:5},tPig+.65);
// "Needs a pinch more love!"
tl.fromTo('#pigIn',{scaleY:1},{scaleY:.94,duration:.14,yoyo:true,repeat:Math.max(1,Math.round(DU[11]/.28))},L[11]);
tl.fromTo('#pigIn',{rotation:-3},{rotation:3,duration:.3,yoyo:true,repeat:Math.max(1,Math.round(DU[11]/.6))},L[11]);
// ---- sticker
camTo(tHush+.3,5.5,290,200,1.06,'sine.inOut');
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},tStk);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},tStk+.45);
tl.to('#pigIn',{y:-10,duration:.2,yoyo:true,repeat:3},29.0);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
