const fs = require('fs');
const path = require('path');
let way = path.join(__dirname, 'text.txt')
const stream = fs.createReadStream( way, 'utf-8');

let data = '';

stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));
stream.on('error', error => console.log('Error', error.message));
