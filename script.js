let gridSize = 20;
let tileSize = (720 / gridSize) - 2;

const r = document.querySelector(':root');
const rs = getComputedStyle(r);

r.style.setProperty('--size', tileSize.toString() + 'px');
// alert(rs.getPropertyValue('--size'));

const canvas = document.getElementById('canvas');

const tile = document.createElement('div');
tile.classList.add('tile', 'tile-borders');
console.log(tile.classList);

// canvas.appendChild(tile);
for (let i = 0; i < gridSize * gridSize; i++) {
    canvas.appendChild(tile.cloneNode(true));
}

console.log(`grid size = ${gridSize}`);
console.log(`tileSize = ${tileSize}`);
console.log(`${rs.getPropertyValue('--size')}`);
