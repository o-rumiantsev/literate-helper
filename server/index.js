'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');

const texturesPath = path.join(__dirname, 'textures.json');

http.createServer((req, res) => {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('access-control-allow-methods', 'GET, POST');
  res.setHeader('access-control-allow-headers', 'content-type');

  if (req.url === '/getTextures') {
    const data = fs.readFileSync(texturesPath, 'utf8');
    res.setHeader('content-type', 'application/json');
    res.end(data);
  } else if (req.url === '/setTextures') {
    const chunks = [];
    req
      .on('data', data => chunks.push(data))
      .on('end', () => {
        const rawData = chunks.join('');
        if (!rawData) {
          res.end();
          return;
        }
        const data = JSON.parse(rawData);
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(texturesPath, jsonData);
        res.end();
      })
  }
}).listen(3000, () => {
  console.log('Helper Server Started');
});