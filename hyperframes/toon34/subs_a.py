PAIRS = [
    ("const TUN_HTML=(LEN)=>{const E=(x0,x1,n,a,ph)=>{let d='';for(let i=0;i<=n;i++){const y=(i/n)*4600;d+=`L${(x0+(x1-x0)*i/n+Math.sin(i*1.7+ph)*a).toFixed(0)},${y.toFixed(0)} `;}return d;};",
     "const TUN_HTML=(LEN)=>{const PT=(x0,x1,n,a,ph)=>Array.from({length:n+1},(_,i)=>[x0+(x1-x0)*i/n+Math.sin(i*1.7+ph)*a,(i/n)*4600]);const E=(pts)=>pts.map(([x,y])=>`L${x.toFixed(0)},${y.toFixed(0)}`).join(' ');"),
    ("<path d=\"M0,0 ${E(10,30,23,26,0)} L${LEN},4600 ${E(LEN-8,LEN+14,23,24,2).split('L').reverse().join('L')} Z\" fill=\"#9B8F7E\" ${sw(9)}/>",
     "<path d=\"M0,0 ${E(PT(10,30,23,26,0))} ${E(PT(LEN-8,LEN+14,23,24,2).reverse())} Z\" fill=\"#9B8F7E\" ${sw(9)}/>"),
    ("const EYES_HTML=`<g id=\"wallEyes\" opacity=\"0\">${[[-1,0],[1,1]].map(([s,i])=>'').join('')}</g>`;\n", ""),
]
