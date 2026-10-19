/* ---- starting state of #59 ("The Magic Hat"): the lit circus; Mochi stands next to a starry table with the black magic hat on it and a wand in her hand, the others watch. Rocky is hidden (he will pop out of the hat) ---- */
const HAT59=[1700,1900,.8];                                                                  // the magic table (the hat sits on top: its top rim is ~347 px above the table's feet at this scale)
const HATTOP=[HAT59[0],HAT59[1]-434*HAT59[2]];                                               // centre of the hat's opening
const M59={gm:[560,ROWB,1.05],pt:[900,ROWB,.7],bp:[1550,ROWB,.66],nm:[2350,ROWB,.54],
           tf:[760,ROWF,.74],zp:[1030,ROWF,.7],mc:[1330,ROWF,.74],cm:[2250,ROWF,.76],
           bo:[620,ROWD+BOY,.88],wd:[900,ROWD-50,.9],pan:[1180,ROWD-50,.9],pd:[1470,ROWD-50,1.05],pm:[1930,ROWD-50,.95],pk:[2130,ROWD-30,.62],nb:[2390,ROWD+10,.8],
           pb:[860,ROWD+14,PBS],gh:[1500,700,.7]};
startCircus(M59);
gsap.set('#ldrW,#trpW',{opacity:0});                                                          // (the ladder of #58 stays in the template: hide it)
gsap.set('#mtbW',{opacity:1,x:HAT59[0],y:HAT59[1],scale:HAT59[2]});gsap.set('#mtb',{scale:1});gsap.set('#mhat',{rotation:0,scale:1});
gsap.set('#wandW',{opacity:1,x:M59.mc[0]+150,y:M59.mc[1]-150,scale:1,rotation:0});gsap.set('#wand',{rotation:15});
gsap.set('#rk',{opacity:0,x:HATTOP[0],y:HATTOP[1],scale:.25});gsap.set('#rkArmL,#rkArmR',{rotation:0});gsap.set('#rkSq',{y:0,rotation:0});
gsap.set('#jpcW0',{opacity:0});
