export default scene => {
  const radioGroup = document.getElementById('radio-textures');

  [
    'block1',
    'plat1',
    'platform1',
    'platform2',
    'platform3',
    'stair',
    'vase1',
    'vertical-block1',
    'wall1',
  ].forEach(texture => {
    const div = document.createElement('div');

    const input = document.createElement('input');
    input.id = texture;
    input.type = 'radio';
    input.value = texture;
    input.name = 'texture';
    input.onchange = () => scene.scene.restart();

    const label = document.createElement('label');
    const text = document.createTextNode(texture);
    label.for = texture;
    label.appendChild(text);

    const img = document.createElement('img');
    img.src = `assets/${texture}.png`;

    div.appendChild(input);
    div.appendChild(label);
    div.appendChild(img);

    radioGroup.appendChild(div);
  });

  radioGroup.children[0].firstChild.checked = true;
};
