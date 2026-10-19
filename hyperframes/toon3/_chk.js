
const OL='#2b1a14', OR='#F58A2B', CR='#FFEBCB', GR='#2EBE85', BR='#7A3E1D', MW='#7B1E2C';
const sw=(w)=>`stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const PLAN={"words":{"1":[{"w":"KNOCK,","s":0,"e":0.34},{"w":"KNOCK!","s":0.58,"e":0.7},{"w":"IT","s":1.16,"e":1.2},{"w":"WAS","s":1.2,"e":1.32},{"w":"BARNABY","s":1.32,"e":1.66},{"w":"THE","s":1.66,"e":1.84},{"w":"BEAR,","s":1.84,"e":2.02},{"w":"AND","s":2.02,"e":2.26},{"w":"HE","s":2.26,"e":2.38},{"w":"BROUGHT","s":2.38,"e":2.58},{"w":"HONEY!","s":2.58,"e":2.82}],"2":[{"w":"SPLASH!","s":0,"e":0.42},{"w":"HE","s":0.76,"e":0.84},{"w":"TOSSED","s":0.84,"e":1.06},{"w":"THE","s":1.06,"e":1.26},{"w":"JAR","s":1.26,"e":1.5},{"w":"RIGHT","s":1.5,"e":1.8},{"w":"INTO","s":1.8,"e":2.02},{"w":"FLAPJACK'S","s":2.02,"e":2.6},{"w":"BATH!","s":2.6,"e":2.8}],"3":[{"w":"JUST","s":0,"e":0.16},{"w":"ONE","s":0.16,"e":0.4},{"w":"TINY","s":0.4,"e":0.64},{"w":"BITE!","s":0.64,"e":0.94}],"4":[{"w":"BUT","s":0,"e":0.16},{"w":"THE","s":0.16,"e":0.3},{"w":"SWEET","s":0.3,"e":0.54},{"w":"SMELL","s":0.54,"e":0.82},{"w":"CALLED","s":0.82,"e":1.1},{"w":"THE","s":1.1,"e":1.22},{"w":"BEES!","s":1.22,"e":1.42}],"5":[{"w":"THEY","s":0,"e":0.2},{"w":"CHASED","s":0.2,"e":0.54},{"w":"EVERYONE","s":0.54,"e":1.06},{"w":"AROUND","s":1.06,"e":1.32},{"w":"THE","s":1.32,"e":1.5},{"w":"KITCHEN!","s":1.5,"e":1.78}],"6":[{"w":"ROCKY","s":0,"e":0.3},{"w":"TOSSED","s":0.3,"e":0.58},{"w":"THE","s":0.58,"e":0.78},{"w":"JAR","s":0.78,"e":1},{"w":"OUTSIDE,","s":1,"e":1.5},{"w":"AND","s":1.9,"e":2.04},{"w":"THE","s":2.04,"e":2.14},{"w":"BEES","s":2.14,"e":2.32},{"w":"FOLLOWED!","s":2.32,"e":2.7}],"7":[{"w":"IS","s":0,"e":0.24},{"w":"IT","s":0.24,"e":0.34},{"w":"SNACK","s":0.34,"e":0.72},{"w":"TIME","s":0.72,"e":1.16},{"w":"YET?","s":1.16,"e":1.52}],"8":[{"w":"CATCH","s":0,"e":0.26},{"w":"ME","s":0.26,"e":0.48},{"w":"IF","s":0.48,"e":0.6},{"w":"YOU","s":0.6,"e":0.7},{"w":"CAN!","s":0.7,"e":1.04}],"9":[{"w":"NOBODY","s":0,"e":0.34},{"w":"SAW","s":0.34,"e":0.72},{"w":"ANYTHING.","s":0.72,"e":1.08}],"10":[{"w":"THEN...","s":0,"e":0.38},{"w":"SQUEAK?","s":0.38,"e":1.04}],"11":[{"w":"SQUEAK!","s":0,"e":0.5},{"w":"CHEESE?","s":0.5,"e":1.218}]},"chunks":{"1":["KNOCK, KNOCK!","IT WAS BARNABY","THE BEAR, AND HE","BROUGHT HONEY!"],"2":["SPLASH!","HE TOSSED THE JAR","RIGHT INTO","FLAPJACK'S BATH!"],"3":["JUST ONE TINY BITE!"],"4":["BUT THE SWEET","SMELL CALLED","THE BEES!"],"5":["THEY CHASED","EVERYONE AROUND","THE KITCHEN!"],"6":["ROCKY TOSSED","THE JAR OUTSIDE,","AND THE BEES","FOLLOWED!"],"7":["IS IT SNACK TIME YET?"],"8":["CATCH ME IF YOU CAN!"],"9":["NOBODY SAW ANYTHING."],"10":["THEN...","SQUEAK?"],"11":["SQUEAK! CHEESE?"]},"tags":{"1":"","2":"","3":"BO","4":"","5":"","6":"","7":"BARNABY","8":"FLAPJACK","9":"ROCKY","10":"","11":"NIBBLES"},"dur":{"1":3.072,"2":3.051,"3":1.301,"4":1.749,"5":2.069,"6":2.944,"7":2.112,"8":1.6,"9":1.429,"10":1.195,"11":1.218},"LINE_T":{"1":0.2,"2":6.25,"3":9.75,"4":13.35,"5":15.3,"6":19.55,"7":3.45,"8":11.25,"9":17.65,"10":23.45,"11":25.5}};
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
document.getElementById('rkMount').innerHTML=rockySVG('rk',false);
/* ---------------- BARNABY THE BEAR (cast #6: brown fur, tan muzzle, red bow tie) + the honey jar ---------------- */
const BRN='#B5722F', DBR='#8A4E1E', TAN='#F0CFA0';
const jarSVG=(id)=>`<g id="${id}"><g id="${id}In">
 <path d="M-58,-72 L-58,62 Q-58,80 -40,80 L40,80 Q58,80 58,62 L58,-72 Q58,-86 40,-86 L-40,-86 Q-58,-86 -58,-72Z" fill="#F2A900" ${sw(6)}/>
 <path d="M-40,-62 L-40,46" stroke="#FFE08A" stroke-width="11" stroke-linecap="round" opacity=".85"/>
 <rect x="-50" y="-116" width="100" height="34" rx="11" fill="#C9833A" ${sw(6)}/>
 <rect x="-42" y="-30" width="84" height="56" rx="9" fill="#FFF3D0" ${sw(4)}/>
 <text x="0" y="5" text-anchor="middle" font-family="Baloo2,sans-serif" font-weight="800" font-size="25" fill="#7A3E1D">HONEY</text>
 <path d="M-34,-86 q-5,34 9,38 q13,-4 7,-38z" fill="#FFC21A" ${sw(4)}/>
</g></g>`;
function bearSVG(p){
 const eyeR=(x)=>`<g transform="translate(${x},-108)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="36" ry="43" fill="#fff" ${sw(6)}/><g class="${p}Pupil"><circle r="21" fill="${OL}"/><circle cx="-6" cy="-8" r="7" fill="#fff"/></g></g></g></g>`;
 const legG=(s,x)=>`<g transform="translate(${x},-52)"><g id="${p}${s}"><ellipse cx="0" cy="22" rx="30" ry="26" fill="${BRN}" ${sw(7)}/><ellipse cx="2" cy="40" rx="52" ry="23" fill="${DBR}" ${sw(7)}/></g></g>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean">
 <ellipse cx="0" cy="6" rx="150" ry="24" fill="rgba(60,30,10,.22)"/>
 <g transform="translate(-100,-90)"><g id="${p}Tail"><circle r="30" fill="${BRN}" ${sw(6)}/></g></g>
 ${legG('LegL',-58)}${legG('LegR',58)}
 <g id="${p}Body">
  <ellipse cx="0" cy="-170" rx="133" ry="140" fill="${BRN}" ${sw(7)}/>
  <g id="${p}Belly"><ellipse cx="0" cy="-150" rx="82" ry="104" fill="${TAN}"/></g>
  <g transform="translate(-116,-232)"><g id="${p}ArmL"><ellipse cx="-4" cy="52" rx="30" ry="58" fill="${BRN}" ${sw(7)}/><ellipse cx="-4" cy="104" rx="28" ry="25" fill="${DBR}" ${sw(7)}/></g></g>
  <g transform="translate(116,-232)"><g id="${p}ArmR"><ellipse cx="4" cy="52" rx="30" ry="58" fill="${BRN}" ${sw(7)}/><ellipse cx="4" cy="104" rx="28" ry="25" fill="${DBR}" ${sw(7)}/><g id="${p}JarG" transform="translate(4,196) scale(.85)">${jarSVG(p+'Jar')}</g></g></g>
  <g transform="translate(0,-318)"><g id="${p}Head">
   <g transform="translate(-115,-211)"><g id="${p}EarL"><ellipse rx="51" ry="51" fill="${BRN}" ${sw(7)}/><ellipse cy="3" rx="28" ry="28" fill="${TAN}"/></g></g>
   <g transform="translate(115,-211)"><g id="${p}EarR"><ellipse rx="51" ry="51" fill="${BRN}" ${sw(7)}/><ellipse cy="3" rx="28" ry="28" fill="${TAN}"/></g></g>
   <ellipse cx="0" cy="-98" rx="168" ry="133" fill="${BRN}" ${sw(7)}/>
   <ellipse cx="0" cy="-52" rx="81" ry="55" fill="${TAN}"/>
   <g id="${p}Eyes">${eyeR(-64)}${eyeR(64)}</g>
   <g id="${p}EyesHappy" opacity="0"><path d="M-98,-100 Q-64,-140 -30,-100" fill="none" ${sw(12)}/><path d="M30,-100 Q64,-140 98,-100" fill="none" ${sw(12)}/></g>
   <g transform="translate(-64,-172)"><path id="${p}BrowL" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <g transform="translate(64,-172)"><path id="${p}BrowR" d="M-30,4 Q0,-10 30,4" fill="none" ${sw(9)}/></g>
   <ellipse cx="0" cy="-73" rx="21" ry="14" fill="${OL}"/><circle cx="-7" cy="-77" r="4.5" fill="#fff"/>
   <ellipse cx="-99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/><ellipse cx="99" cy="-75" rx="19" ry="11" fill="#FF7A7A" opacity=".42"/>
   <g transform="translate(0,-40)">
    <g id="${p}mSm"><path d="M-34,0 Q0,24 34,0" fill="none" ${sw(7)}/></g>
    <g id="${p}mOp" opacity="0"><path d="M-34,-2 Q0,-6 34,-2 Q34,38 0,42 Q-34,38 -34,-2Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="30" rx="20" ry="11" fill="#FF8FA0"/></g>
    <g id="${p}mBg" opacity="0"><path d="M-54,-4 Q0,-10 54,-4 Q58,56 0,62 Q-58,56 -54,-4Z" fill="${MW}" ${sw(6)}/><ellipse cx="0" cy="46" rx="30" ry="15" fill="#FF8FA0"/></g>
    <g id="${p}mFr" opacity="0"><path d="M-30,18 Q0,-8 30,18" fill="none" ${sw(7)}/></g>
    <g id="${p}mO" opacity="0"><ellipse cx="0" cy="14" rx="15" ry="19" fill="${MW}" ${sw(5)}/></g>
   </g>
  </g></g>
  <g transform="translate(0,-262)"><path d="M0,0 L-56,-30 L-56,30Z" fill="#E8484F" ${sw(6)}/><path d="M0,0 L56,-30 L56,30Z" fill="#E8484F" ${sw(6)}/><ellipse rx="16" ry="16" fill="#C93A40" ${sw(6)}/></g>
 </g>
</g></g></g>`;}

/* ---------------- NIBBLES THE MOUSE (cast #20) — head + paws + cheese, peeks out of a mouse hole ---------------- */
function nbSVG(p){
 const eyeR=(x)=>`<g transform="translate(${x},-108)"><g class="${p}EyeW"><g class="${p}Eye"><ellipse rx="36" ry="43" fill="#fff" ${sw(6)}/><g class="${p}Pupil"><circle r="21" fill="${OL}"/><circle cx="-6" cy="-8" r="7" fill="#fff"/></g></g></g></g>`;
 const teeth=`<rect x="-24" y="-3" width="22" height="19" rx="3" fill="#fff" ${sw(3)}/><rect x="2" y="-3" width="22" height="19" rx="3" fill="#fff" ${sw(3)}/>`;
 return `<g id="${p}"><g id="${p}Sq"><g id="${p}Lean"><g transform="translate(0,-318)"><g id="${p}Head">
   <g transform="translate(-146,-201)"><g id="${p}EarL"><circle r="76" fill="#CFD3DC" ${sw(7)}/><circle cy="4" r="48" fill="#FFB6C8"/></g></g>
   <g transform="translate(146,-201)"><g id="${p}EarR"><circle r="76" fill="#CFD3DC" ${sw(7)}/><circle cy="4" r="48" fill="#FFB6C8"/></g></g>
   <ellipse cx="0" cy="-98" rx="168" ry="133" fill="#CFD3DC" ${sw(7)}/>
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
   <g id="${p}Cheese" transform="translate(0,64)">
    <path d="M-72,26 L78,-18 L50,52Z" fill="#FFD84A" ${sw(6)}/><circle cx="26" cy="12" r="8" fill="#E8B52E"/><circle cx="-6" cy="28" r="6" fill="#E8B52E"/><circle cx="46" cy="30" r="5" fill="#E8B52E"/>
    <ellipse cx="-34" cy="24" rx="26" ry="20" fill="#F4A6B7" ${sw(6)}/><ellipse cx="40" cy="6" rx="26" ry="20" fill="#F4A6B7" ${sw(6)}/>
   </g>
  </g></g></g></g></g>`;}

/* ---------------- bees ---------------- */
const beeSVG=(i)=>`<g id="bee${i}w" opacity="0"><g id="bee${i}" class="beeB">
 <g id="bee${i}Wl"><ellipse cx="-4" cy="-17" rx="12" ry="19" transform="rotate(-22 -4 -17)" fill="#E8F6FF" stroke="${OL}" stroke-width="3" opacity=".92"/></g>
 <g id="bee${i}Wr"><ellipse cx="12" cy="-17" rx="12" ry="19" transform="rotate(22 12 -17)" fill="#E8F6FF" stroke="${OL}" stroke-width="3" opacity=".92"/></g>
 <ellipse cx="0" cy="0" rx="27" ry="19" fill="#FFD23F" ${sw(4)}/>
 <path d="M-7,-18 Q-1,0 -7,18 M11,-18 Q17,0 11,18" fill="none" stroke="${OL}" stroke-width="7"/>
 <circle cx="-28" cy="-1" r="12" fill="#FFD23F" ${sw(4)}/><circle cx="-32" cy="-4" r="3.6" fill="${OL}"/>
 <path d="M-36,-11 q-6,-10 -15,-8 M-30,-12 q-2,-12 -10,-15" fill="none" stroke="${OL}" stroke-width="3" stroke-linecap="round"/>
 <path d="M27,0 l11,2 -11,4z" fill="${OL}"/>
</g></g>`;

document.getElementById('bwMount').innerHTML=bearSVG('bw');
document.getElementById('nbMount').innerHTML=nbSVG('nb');
document.getElementById('jarMount').innerHTML=jarSVG('jar');


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
for(let i=0;i<7;i++) fx+=beeSVG(i);
document.getElementById('fxMount').innerHTML=fx;

/* ---------------- captions (word-timed by Whisper, words from the real script) ---------------- */
const HLC={'':'#FFE14D',ROCKY:'#A9B8FF',FLAPJACK:'#FF8FC4',BARNABY:'#F0A868',BO:'#FFB35C',NIBBLES:'#E6B7D6'};
const CAP_BOTTOM=new Set([1,2,3,4,5,6,7,8,9,10,11]);
const capsEl=document.getElementById('caps'), capsB=document.getElementById('capsB'), allChunks=[];
for(const ln of [1,7,2,3,8,4,5,9,6,10,11]){let idx=0;const ws=WD[ln], tag=PLAN.tags[ln], hl=HLC[tag];
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
gsap.set('#boSq,#boLean,#boBody,#bowlIn,#bowl2In,.spk,.hrt,.drp,.bit,.bub,.beeB,#duck,#jar,#jarIn,#bwJarIn',{svgOrigin:'0 0'});
gsap.set('#duck',{svgOrigin:'1092 1066'});gsap.set('#barnIn',{svgOrigin:'550 736'});
gsap.set('#boTail,#boLegL,#boLegR,#boArmL,#boArmR,#boHead,#boEarL,#boEarR,#boScarfTail,.boEye,.boEyeW,.boBrow,.boPupil',{svgOrigin:'0 0'});
for(const p of ['pan','bh']) gsap.set(`#${p},#${p}Sq,#${p}Shake,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
for(const p of ['rk','bw']) gsap.set(`#${p},#${p}Sq,#${p}Lean,#${p}Body,#${p}Head,#${p}Belly,#${p}Tail,#${p}LegL,#${p}LegR,#${p}ArmL,#${p}ArmR,#${p}EarL,#${p}EarR,.${p}Eye,.${p}EyeW,.${p}Pupil,#${p}BrowL,#${p}BrowR`,{svgOrigin:'0 0'});
gsap.set('#nb,#nbSq,#nbLean,#nbHead,#nbEarL,#nbEarR,.nbEye,.nbEyeW,.nbPupil,#nbBrowL,#nbBrowR',{svgOrigin:'0 0'});
gsap.set('.cg',{transformOrigin:'50% 50%'});
// ---- starting state = the last frame of video #2 (everyone frozen, Barnaby's silhouette in the window)
gsap.set('#bo',{x:BX,y:FLOOR});
gsap.set('#bowl',{opacity:1,x:BX+130,y:1500});gsap.set('#spoon',{opacity:1,x:BX+210,y:1470});gsap.set('#bowl2',{opacity:1,x:1235,y:1095});
gsap.set('#pan',{x:TUBX-8,y:TUBY});gsap.set('#panLegs',{opacity:0});gsap.set('#panEyes',{opacity:0});gsap.set('#panEyesClosed',{opacity:1});
gsap.set('#panArmL',{rotation:-82});gsap.set('#panArmR',{rotation:82});
gsap.set('#bh',{opacity:0});gsap.set('#bhArmL',{rotation:-120});gsap.set('#bhArmR',{rotation:120});
gsap.set('#rk',{x:1235,y:RKB,scale:.85,opacity:1});
gsap.set('#bw',{x:550,y:973,scale:.8,opacity:0});
gsap.set('#barnG',{opacity:1});
gsap.set('#jar',{opacity:0,x:716,y:655,scale:.7});
gsap.set('#nb',{x:1640,y:1620,scale:.46});

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
const BW=mkRock('bw'), RK=mkRock('rk'), NM=mkRock('nb');

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
const NBEE=7;
const tK1=.14, tK2=.42;                              // knock-knock replay of video #2's last frame
const tRev=W(1,4)-.12;                               // "BARNABY": silhouette -> colour
const tJarUp=W(1,9)-.2;                              // "HONEY": his paw lifts the jar
const rel=L[2]-.5, spl=rel+.62;                      // jar leaves the paw / lands in the bath ("SPLASH!")
const tB1=L[3]-.45;                                  // Bo sneaks toward the tub
const tFJ=L[8]-.3;                                   // Flapjack hops onto Bo's head
const bee0=L[4]-.1;                                  // bees pour out of the window
const ch0=W(5,1)-.35, ch1=L[9]+DU[9]+.1;             // the chase
const tJump=W(6,0)-.4;                               // Rocky leaps onto the table
const tPick=W(6,1)-.05, tThrow=W(6,3)-.05;           // lifts / throws the jar
const bf0=W(6,5)-.15;                                // the bees follow the jar
const tSq=W(10,1), tNb=tSq+.5, nbEnd=L[11]+DU[11];   // "SQUEAK?" -> Nibbles

/* --- bee helpers --- */
function flyBee(i,t0,pts,durs){const w='#bee'+i+'w',b='#bee'+i;let t=t0;
 tl.set(w,{x:pts[0][0],y:pts[0][1],opacity:1},t0);
 for(let k=1;k<pts.length;k++){const dx=pts[k][0]-pts[k-1][0];
  tl.set(b,{scaleX:dx>0?-1:1},t);tl.to(w,{x:pts[k][0],y:pts[k][1],duration:durs[k-1],ease:'none'},t);t+=durs[k-1];}
 tl.to(w,{opacity:0,duration:.12},t);return t;}
function flapBee(i,t0,t1){const n=Math.max(1,Math.floor((t1-t0)/.05));
 tl.fromTo('#bee'+i+'Wl',{scaleY:1},{scaleY:.25,duration:.05,yoyo:true,repeat:n,ease:'none'},t0);
 tl.fromTo('#bee'+i+'Wr',{scaleY:1},{scaleY:.25,duration:.05,yoyo:true,repeat:n,ease:'none'},t0);}

/* ================= SCENE 1: knock-knock -> Barnaby brought honey ================= */
camSet(0,335,215,.97);camTo(0,rel-.25,350,230,1.0,'sine.inOut');
bm(0,'mO');eyesMode(0,'wide');look(0,-20,-26,.01);brows(0,-18,18,-16,.01);
RK.m(0,'mO');RK.eyes(0,'wide');RK.look(0,-16,-20,.01);RK.brows(0,-20,20,-12,.01);
tl.set('#panEyesClosed',{opacity:0},0);tl.set('#panEyes',{opacity:1},0);FJ.pm(0,'Oh');FJ.look(0,-10,-12,.01);
[tK1,tK2].forEach(t=>{tl.set('#knockFx',{opacity:1},t);tl.set('#knockFx',{opacity:0},t+.12);tl.fromTo('#barnIn',{y:0},{y:-14,duration:.06,yoyo:true,repeat:1},t);shake(t,6,3);});
// the silhouette turns into Barnaby
tl.to('#barnG',{opacity:0,duration:.25},tRev);
tl.fromTo('#bw',{opacity:0,scale:.7},{opacity:1,scale:.8,duration:.3,ease:'back.out(2.2)'},tRev);
BW.m(tRev,'mSm');BW.look(tRev,0,8,.05);BW.brows(tRev,-6,6,-4,.1);BW.blink(tRev+1.1);
tl.fromTo('#bwHead',{rotation:-3},{rotation:3,duration:.6,yoyo:true,repeat:Math.max(1,Math.round((L[7]-tRev)/.6)-1),ease:'sine.inOut'},tRev);
// friends relax: it is a visitor, not a monster
eyesMode(tRev+.1,'normal');bm(tRev+.1,'mOpen');look(tRev+.1,0,-14,.1);brows(tRev+.1,0,0,0,.1);
RK.eyes(tRev+.1,'normal');RK.m(tRev+.1,'mSm');RK.brows(tRev+.1,0,0,0,.1);RK.look(tRev+.1,-14,-14,.1);
FJ.pm(tRev+.1,'Sm');FJ.look(tRev+.1,-8,-12,.1);
// "...he brought honey!": paw lifts the jar, Bo gets heart eyes
tl.to('#bwArmR',{rotation:-150,duration:.35,ease:'back.out(2)'},tJarUp);
sparks(tJarUp+.25,705,650,6,90);
eyesMode(tJarUp+.1,'hearts');bm(tJarUp+.1,'mBig');
tl.fromTo('#boHeartEyes',{scale:1},{scale:1.16,duration:.3,yoyo:true,repeat:Math.max(1,Math.round((rel-tJarUp)/.3)),ease:'sine.inOut'},tJarUp+.1);
RK.eyes(tJarUp+.1,'happy');RK.m(tJarUp+.1,'mBg');
tl.fromTo('#panSq',{scaleY:1},{scaleY:1.06,duration:.35,yoyo:true,repeat:Math.max(1,Math.round((rel-tJarUp)/.35)),ease:'sine.inOut'},tJarUp);
hearts(tJarUp+.2,560,1000,4,70,260);
// Barnaby: "Is it snack time yet?"
BW.talk(L[7],L[7]+DU[7]-.08,'mOp','mSm');
tl.fromTo('#bwHead',{rotation:-5},{rotation:5,duration:.25,yoyo:true,repeat:6,ease:'sine.inOut'},L[7]);
tl.fromTo('#boSq',{y:0},{y:-46,duration:.14,yoyo:true,repeat:5,ease:'power1.out'},L[7]+.15);
tl.to('#boArmL',{rotation:-30,duration:.2},L[7]+.1).to('#boArmR',{rotation:30,duration:.2},L[7]+.1);
tl.to('#boArmL,#boArmR',{rotation:0,duration:.25},L[7]+1.3);
hearts(L[7]+.3,880,1000,3,70,240);

/* ================= SCENE 2: the jar flies into Flapjack's bath ================= */
tl.to('#bwArmR',{rotation:-178,duration:.2,ease:'power2.out'},rel-.28);
tl.to('#bwArmR',{rotation:-40,duration:.16,ease:'power3.in'},rel-.08);
BW.m(rel-.28,'mBg');BW.brows(rel-.28,-14,14,-8,.1);
tl.set('#bwJarG',{opacity:0},rel);
tl.set('#jar',{opacity:1,x:716,y:655,scale:.7,rotation:0},rel);
tl.fromTo('#jar',{x:716},{x:TUBX+5,duration:spl-rel,ease:'none'},rel);
tl.fromTo('#jar',{y:655},{y:470,duration:.22,ease:'power2.out'},rel).to('#jar',{y:1075,duration:spl-rel-.22,ease:'power2.in'},rel+.22);
tl.fromTo('#jar',{rotation:0},{rotation:300,duration:spl-rel,ease:'none'},rel);
tl.fromTo('#jar',{scale:.7},{scale:1,duration:spl-rel,ease:'none'},rel);
// SPLASH!
tl.to('#jar',{rotation:392,x:TUBX+28,y:1068,duration:.3,ease:'back.out(2)'},spl);
drops(spl,TUBX,1050,8);bubbles(spl+.05,TUBX,1040,5);
tl.to('#honeyPool',{opacity:1,duration:.3},spl);
shake(spl,9,4);
camTo(spl-.3,.9,470,430,1.15);
tl.fromTo('#panSq',{scaleX:1.16,scaleY:.84},{scaleX:1,scaleY:1,duration:.45,ease:'elastic.out(1,.4)'},spl);
tl.set('#panEyesClosed',{opacity:0},spl);tl.set('#panEyes',{opacity:1},spl);FJ.pm(spl,'Oh');FJ.look(spl,0,-10,.1);
tl.to('#panGlaze',{opacity:1,duration:.5},spl+.1);
tl.to('#panArmL',{rotation:-60,duration:.2},spl+.2);tl.to('#panArmR',{rotation:60,duration:.2},spl+.2);
FJ.pm(spl+.9,'Gr');
eyesMode(spl,'hearts');bm(spl,'mBig');
RK.eyes(spl,'wide');RK.look(spl,10,6,.1);RK.m(spl+.1,'mBg');
BW.eyes(spl,'happy');BW.m(spl,'mBg');BW.brows(spl,0,0,0,.1);
tl.to('#bwArmR',{rotation:0,duration:.3},spl);
sparks(spl+.3,TUBX,980,7,130);

/* ================= SCENE 3: "Just one tiny bite!"  /  "Catch me if you can!" ================= */
tl.to('#bowl',{y:1595,duration:.25,ease:'bounce.out'},tB1-.05);
tl.to('#spoon',{x:BX+190,y:1585,rotation:30,duration:.25},tB1-.05);
tl.fromTo('#bo',{x:BX},{x:780,duration:.7,ease:'sine.inOut'},tB1);
cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],tB1,tB1+.7,.34,22,12,'#boSq',8);
camTo(tB1,.9,470,430,1.15);
tl.to('#boLean',{rotation:13,duration:.3,ease:'sine.in'},tB1+.65);
eyesMode(tB1+.3,'normal');brows(tB1+.3,-10,10,-10,.1);look(tB1+.3,20,6,.1);
bm(W(3,0),'mOpen');bm(W(3,1),'mSmile');bm(W(3,2),'mOpen');bm(W(3,3),'mBig');bm(WE(3,3)+.12,'mSmile');
tl.fromTo('#boHeartEyes',{scale:1},{scale:1.1,duration:.2,yoyo:true,repeat:3},tB1+.5);
// Bo's chomp (the pancake is in danger!)
tl.fromTo('#boHead',{rotation:0},{rotation:-6,duration:.12,yoyo:true,repeat:3},W(3,3));
// Flapjack worries
FJ.pm(L[3],'Wo');FJ.brows(L[3],true,-14,14);FJ.look(L[3],-16,2,.1);
tl.fromTo('#panShake',{rotation:-3},{rotation:3,duration:.07,yoyo:true,repeat:Math.max(1,Math.round((tFJ-L[3])/.07))},L[3]);
tl.set('#panShake',{rotation:0},tFJ);
// ... she hops onto Bo's head, out of reach
tl.set('#panLegs',{opacity:1},tFJ);
tl.fromTo('#pan',{x:TUBX-8},{x:780,duration:.45,ease:'none'},tFJ);
tl.fromTo('#pan',{y:TUBY},{y:760,duration:.22,ease:'power2.out'},tFJ).to('#pan',{y:1052,duration:.23,ease:'power2.in'},tFJ+.22);
tl.fromTo('#panArmL',{rotation:-60},{rotation:-150,duration:.15,yoyo:true,repeat:2},tFJ);tl.fromTo('#panArmR',{rotation:60},{rotation:150,duration:.15,yoyo:true,repeat:2},tFJ);
FJ.brows(tFJ,false);
tl.set('#pan',{opacity:0},tFJ+.45);tl.set('#bh',{opacity:1},tFJ+.45);tl.set('#bhGlaze',{opacity:1},tFJ+.45);
FB.pm(tFJ+.45,'Gr');FB.eyes(tFJ+.45,true);FB.look(tFJ+.45,0,10,.1);
tl.set('#bhArmL',{rotation:-130},tFJ+.45);tl.set('#bhArmR',{rotation:130},tFJ+.45);
// Bo looks up, cross-eyed
tl.to('#boLean',{rotation:0,duration:.2},tFJ+.45);
eyesMode(tFJ+.45,'wide');bm(tFJ+.45,'mO');look(tFJ+.45,0,-30,.1);brows(tFJ+.45,-14,14,-14,.1);
// Flapjack: "Catch me if you can!"
FB.talk(L[8]+.1,L[8]+DU[8],'Gr','Sm');
tl.fromTo('#bhSq',{scaleY:1},{scaleY:.86,duration:.1,yoyo:true,repeat:11},L[8]+.1);
tl.fromTo('#bhArmL',{rotation:-130},{rotation:-165,duration:.16,yoyo:true,repeat:9},L[8]+.1);tl.fromTo('#bhArmR',{rotation:130},{rotation:165,duration:.16,yoyo:true,repeat:9},L[8]+.18);
tl.fromTo('#bhShake',{rotation:-7},{rotation:7,duration:.2,yoyo:true,repeat:7,ease:'sine.inOut'},L[8]+.1);
hearts(L[8]+.3,780,780,3,80,200);
// Rocky watches
RK.eyes(tB1,'normal');RK.look(tB1,-10,2,.1);RK.m(tB1,'mSm');

/* ================= SCENE 4: the sweet smell calls the bees ================= */
camTo(bee0-.35,.9,350,230,1.0);
const orb0=bee0+1.6, orb1=bf0;
const chPts=[[0,780]];
{let tt=0,dir=1;const span=ch1-ch0-.5;while(tt<span){tt+=.55;chPts.push([tt,dir>0?1090:650]);dir=-dir;}chPts.push([Math.max(tt+.45,ch1-ch0),780]);}
const chEnd=ch0+chPts[chPts.length-1][0];
const boXAt=(t)=>{const r=t-ch0;if(r<=0)return 780;for(let k=1;k<chPts.length;k++){if(r<=chPts[k][0]){const a=chPts[k-1],b=chPts[k];return a[1]+(b[1]-a[1])*((r-a[0])/(b[0]-a[0]));}}return 780;};
for(let i=0;i<NBEE;i++){
 const t0=bee0+i*.11, wx=480+i*38, wy=430+(i%3)*50;
 const pts=[[wx,wy]], durs=[];
 [[wx+50,wy+70],[640+i*12,650],[760,860]].forEach(p=>{pts.push(p);durs.push(.3);});
 const R=130+(i%3)*42, ph=i*.9, om=7+(i%2)*1.6;
 let t=t0+.9;
 const tOrb=Math.max(t,orb0);
 // approach the orbit start
 const startA=ph;pts.push([boXAt(tOrb)+R*Math.cos(startA),985+.45*R*Math.sin(startA)]);durs.push(Math.max(.1,tOrb-t));t=tOrb;
 for(;t<orb1;t+=.1){const a=ph+om*(t+.1-orb0);pts.push([boXAt(t+.1)+R*Math.cos(a),985+.45*R*Math.sin(a)]);durs.push(.1);}
 // streaming out of the window after the jar
 [[boXAt(orb1)-200,780],[640,620],[548+(i-3)*12,520]].forEach((p,k)=>{pts.push(p);durs.push([.4,.4,.3][k]);});
 const tEnd=flyBee(i,t0,pts,durs);flapBee(i,t0,tEnd);
}
// everybody hears the buzzing
eyesMode(bee0,'wide');bm(bee0,'mO');look(bee0,-22,-16,.1);brows(bee0,-18,18,-14,.1);
tl.set('#boSweat',{opacity:1},bee0+.3);
FB.pm(bee0+.2,'Oh');FB.look(bee0+.2,-18,-8,.1);
RK.eyes(bee0,'wide');RK.m(bee0,'mO');RK.look(bee0,-14,-14,.1);tl.set('#rkSweat',{opacity:1},bee0+.3);
tl.fromTo('#bhShake',{rotation:-9},{rotation:9,duration:.06,yoyo:true,repeat:Math.max(1,Math.round((ch0-bee0)/.06))},bee0+.2);
shake(bee0+.9,6,4);

/* ================= SCENE 5: the chase around the kitchen ================= */
tl.set('#bhShake',{rotation:0},ch0);
for(let k=1;k<chPts.length;k++){const a=chPts[k-1],b=chPts[k];
 tl.fromTo('#bo',{x:a[1]},{x:b[1],duration:b[0]-a[0],ease:'sine.inOut'},ch0+a[0]);
 tl.to('#boLean',{rotation:b[1]>a[1]?14:-14,duration:.15},ch0+a[0]);}
cycle(['#boLegL','#boLegR'],['#boArmL','#boArmR'],ch0,chEnd,.26,34,46,'#boSq',14);
cycle(['#bhLegL','#bhLegR'],[],ch0,chEnd,.24,40,0,'#bhSq',6);
tl.fromTo('#boTail',{rotation:-12},{rotation:12,duration:.13,yoyo:true,repeat:Math.round((chEnd-ch0)/.13)},ch0);
tl.fromTo('#boScarfTail',{rotation:-20},{rotation:25,duration:.12,yoyo:true,repeat:Math.round((chEnd-ch0)/.12)},ch0);
bm(ch0,'mBig');brows(ch0,16,-16,0,.1);look(ch0,16,-6,.1);
FB.pm(ch0,'Wo');
tl.fromTo('#bhShake',{rotation:-6},{rotation:6,duration:.12,yoyo:true,repeat:Math.round((chEnd-ch0)/.12)},ch0);
shake(ch0+.5,5,3);shake(ch0+1.6,5,3);shake(ch0+2.7,5,3);
// Rocky dives under the table (his cap peeks out)
tl.to('#rk',{y:1600,duration:.18,ease:'power2.in'},ch0-.05);
// Rocky: "Nobody saw anything."
tl.to('#rk',{y:1500,duration:.2,ease:'back.out(2)'},L[9]-.12);
RK.m(L[9]-.1,'mSm');RK.eyes(L[9]-.1,'normal');RK.brows(L[9]-.1,-10,10,-6,.1);RK.look(L[9],-14,-4,.1);RK.look(L[9]+.6,14,-4,.2);
RK.talk(L[9],L[9]+DU[9]-.1);
tl.set('#rkSweat',{opacity:1},L[9]);
tl.to('#rk',{y:1600,duration:.2,ease:'power2.in'},L[9]+DU[9]-.05);
// Bo runs out of breath at the end
tl.to('#boLean',{rotation:0,duration:.3},chEnd);
bm(chEnd,'mOpen');tl.fromTo('#boBody',{scaleY:1},{scaleY:1.05,duration:.3,yoyo:true,repeat:5,ease:'sine.inOut'},chEnd);

/* ================= SCENE 6: Rocky throws the jar out of the window ================= */
tl.fromTo('#rk',{y:1600},{y:900,duration:.25,ease:'power2.out'},tJump).to('#rk',{y:RKT,duration:.25,ease:'power2.in'},tJump+.25);
tl.fromTo('#rk',{x:1235,scale:.85},{x:1210,scale:.78,duration:.5,ease:'none'},tJump);
RK.m(tJump,'mO');RK.brows(tJump,0,0,0,.1);RK.look(tJump,-16,-6,.1);
tl.to('#rkArmL',{rotation:140,duration:.2,ease:'back.out(2)'},tPick-.15);tl.to('#rkArmR',{rotation:-140,duration:.2,ease:'back.out(2)'},tPick-.15);
// the jar floats up over Rocky's head
tl.to('#jar',{x:1210,y:610,rotation:360,scale:.9,duration:.4,ease:'power2.out'},tPick);
sparks(tPick+.3,1210,610,5,110);
RK.m(tPick,'mBg');RK.eyes(tPick,'normal');RK.look(tPick,-20,-10,.1);
// throw!
tl.to('#rkArmL',{rotation:-20,duration:.12,ease:'power3.in'},tThrow-.05);tl.to('#rkArmR',{rotation:20,duration:.12,ease:'power3.in'},tThrow-.05);
tl.to('#jar',{x:640,duration:.55,ease:'none'},tThrow);
tl.to('#jar',{y:470,duration:.25,ease:'power2.out'},tThrow).to('#jar',{y:600,duration:.3,ease:'power2.in'},tThrow+.25);
tl.to('#jar',{rotation:720,scale:.55,duration:.55,ease:'none'},tThrow);
tl.set('#jar',{opacity:0},tThrow+.55);
// Barnaby catches it
tl.set('#bwJarG',{opacity:1},tThrow+.55);
tl.to('#bwArmR',{rotation:-150,duration:.3,ease:'back.out(2)'},tThrow+.45);
BW.eyes(tThrow+.5,'happy');BW.m(tThrow+.55,'mBg');
sparks(tThrow+.6,690,640,6,90);
BW.talk(tThrow+.9,L[10]-.1,'mBg','mOp',.22);
tl.fromTo('#bwHead',{rotation:-4},{rotation:4,duration:.3,yoyo:true,repeat:Math.max(1,Math.round((L[10]-tThrow)/.3)),ease:'sine.inOut'},tThrow+.9);
RK.m(tThrow+.6,'mO');RK.eyes(tThrow+.6,'normal');RK.look(tThrow+.6,-20,-6,.1);
// the bees follow the jar outside, everyone relaxes
FB.pm(bf0+.4,'Sm');FB.look(bf0+.4,0,6,.2);
eyesMode(bf0+.5,'normal');bm(bf0+.5,'mSmile');brows(bf0+.5,0,0,0,.15);look(bf0+.5,0,0,.2);tl.set('#boSweat',{opacity:0},bf0+.6);
RK.m(bf0+.8,'mSm');tl.set('#rkSweat',{opacity:0},bf0+.8);
hearts(bf0+1.0,780,780,4,80,220);

/* ================= SCENE 7: "Then... squeak?" -> Nibbles ================= */
// freeze: ears up, everybody looks to the right
eyesMode(tSq-.1,'wide');bm(tSq-.1,'mO');look(tSq-.1,26,0,.08);brows(tSq-.1,-18,18,-16,.1);
RK.eyes(tSq-.1,'wide');RK.m(tSq-.1,'mO');RK.look(tSq-.1,20,0,.08);
FB.pm(tSq-.1,'Oh');FB.look(tSq-.1,16,0,.08);
tl.fromTo('#boSq',{y:0},{y:-50,duration:.14,ease:'power2.out'},tSq-.1).to('#boSq',{y:0,duration:.2,ease:'bounce.out'},tSq+.04);
// whip over to the little hole in the wall
camTo(tSq+.1,.8,1370,900,2.0,'power2.inOut');
tl.to('#nb',{y:1476,duration:.35,ease:'back.out(1.8)'},tNb);
NM.m(tNb,'mO');NM.eyes(tNb,'wide');NM.look(tNb,-14,6,.15);NM.look(tNb+.5,14,6,.2);NM.brows(tNb,-14,14,-10,.1);
tl.fromTo('#nbHead',{rotation:-4},{rotation:4,duration:.4,yoyo:true,repeat:Math.max(1,Math.round((L[11]-tNb)/.4)),ease:'sine.inOut'},tNb+.3);
tl.fromTo('#nbEarL',{rotation:0},{rotation:-12,duration:.3,yoyo:true,repeat:5,ease:'sine.inOut'},tNb+.3);
tl.fromTo('#nbEarR',{rotation:0},{rotation:12,duration:.3,yoyo:true,repeat:5,ease:'sine.inOut'},tNb+.4);
NM.blink(tNb+.8);
// "Squeak! Cheese?"
NM.m(L[11]-.05,'mSm');NM.eyes(L[11]-.05,'normal');NM.brows(L[11]-.05,-8,8,-6,.1);
NM.talk(L[11],nbEnd-.05,'mOp','mSm',.11);
tl.fromTo('#nbCheese',{y:64},{y:50,duration:.12,yoyo:true,repeat:7},L[11]);
tl.to('#nb',{y:1462,duration:.12,yoyo:true,repeat:5},L[11]);
sparks(L[11]+.2,1700,1230,5,80);
// sticker
tl.fromTo('#sticker',{opacity:0,scale:.3,rotation:-8},{opacity:1,scale:1,rotation:-2,duration:.35,ease:'back.out(2.4)'},nbEnd+.12);
tl.fromTo('#sticker',{y:0},{y:-10,duration:.5,yoyo:true,repeat:5,ease:'sine.inOut'},nbEnd+.55);
// final button: little hop on the last chord
tl.to('#nb',{y:1436,duration:.15,ease:'power2.out'},29.4).to('#nb',{y:1476,duration:.2,ease:'bounce.out'},29.55);

window.__timelines=window.__timelines||{};window.__timelines.main=tl;
