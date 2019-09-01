export default () => new Promise(resolve => {
  const req = new XMLHttpRequest();
  req.open('GET', 'http://localhost:3000/getTextures');
  req.send();
  req.onload = () => resolve(JSON.parse(req.responseText));
});
