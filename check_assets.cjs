const fs = require('fs');
const data = fs.readFileSync('./src/data.js', 'utf8');
const paths = [...data.matchAll(/\/assets\/[^'"`\s]+/g)].map(m => m[0]);
const missing = paths.filter(p => !fs.existsSync('./public' + p));
console.log('Missing assets:', missing);
