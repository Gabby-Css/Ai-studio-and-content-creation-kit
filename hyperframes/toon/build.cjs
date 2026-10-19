const fs=require('fs');const w=JSON.parse(fs.readFileSync(__dirname+'/words.json','utf8'));
const t=fs.readFileSync(__dirname+'/build/template.tpl','utf8').replace('__WORDS__',JSON.stringify(w));
fs.writeFileSync(__dirname+'/index.html',t);console.log('built index.html',t.length);
