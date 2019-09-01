export default texturesJson => fetch('http://localhost:3000/setTextures', {
  method: 'post',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify(texturesJson),
});
