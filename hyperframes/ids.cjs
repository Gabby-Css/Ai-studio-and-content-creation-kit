// node ids.cjs N [regex]  -> lists element ids/class names created by the page of toonN (static template + JS-built svg) by loading it headless
const puppeteer=require('puppeteer');const path=require('path');
(async()=>{const N=process.argv[2],re=new RegExp(process.argv[3]||'.','');
 const b=await puppeteer.launch({headless:'new',args:['--no-sandbox']});const p=await b.newPage();await p.setViewport({width:1080,height:1920});
 await p.goto('file:///'+__dirname.replace(/\/g,'/')+'/toon'+N+'/index.html',{waitUntil:'load',timeout:600000});await new Promise(r=>setTimeout(r,1500));
 const ids=await p.evaluate(()=>[...document.querySelectorAll('[id]')].map(e=>e.id));console.log(ids.filter(i=>re.test(i)).join(' '));await b.close();})();
