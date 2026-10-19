PAIRS = [
    ("const PK=[105,-120];                                       // Pebble's seat in Bo's kart: x offset, and y offset from the kart's origin (its ground contact)", "const PK=[105,4];                                          // Pebble's seat in Bo's kart: x offset, y offset from a seated racer's character origin"),
    ("y:KY('bo')+PK[1],scale:PBS", "y:FEET('bo')+PK[1],scale:PBS"),
    ("document.getElementById('rsLand').insertAdjacentHTML('beforeend',SRV_HTML);\ndocument.getElementById('fxMount').insertAdjacentHTML('beforeend',SPL_HTML+SGL_HTML);", "document.getElementById('rsLand').insertAdjacentHTML('beforeend',SRV_HTML+SPL_HTML);               // river + puddle are ground: behind the karts\ndocument.getElementById('fxMount').insertAdjacentHTML('beforeend',SGL_HTML);"),
    ("gsap.set('#syrupR',{opacity:1,x:RIVX});", "gsap.set('#syrupR',{opacity:0,x:RIVX});                   // appears when the camera pans to it (scene 4)"),
]
