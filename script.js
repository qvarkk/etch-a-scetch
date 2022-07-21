// Storing css variables in rs variable
const r = document.querySelector(':root');
const rs = getComputedStyle(r);

// Creates tile node and adds classes to it
const tile = document.createElement('div');
tile.classList.add('tile', 'tile-borders');

// Loops for grid's area times and creates a tile on every step
let tileSize;
let allTiles;
const canvas = document.getElementById('canvas');
let createNewCanvas  = (gridSize) => {
    for (let i = 0; i < gridSize * gridSize; i++) {
        tileSize = (720 / gridSize) - 2;
        canvas.appendChild(tile.cloneNode(true));
        r.style.setProperty('--size', tileSize.toString() + 'px');
    }

    // Creating a node list of all tiles to make them responsible on click
    allTiles = document.querySelectorAll('.tile');
    allTiles.forEach((tile) => {
        tile.addEventListener('click', () => {
            tile.style.backgroundColor = 'black';
        })
        tile.addEventListener('dblclick', () => {
            tile.style.backgroundColor = 'white';
        })
    });
}
// To create canvas on page load
createNewCanvas(16);



// If input after clicking "change size" button is wrong, it won't create new canvas
let checkForInput = (inputSize) => {
    if (5 <= inputSize && inputSize <= 100) {
        allTiles = document.querySelectorAll('.tile');
        allTiles.forEach((tile) => {
            canvas.removeChild(tile);
        });
        createNewCanvas(inputSize);
    } else if (inputSize === null) { // in case if user tries to close the prompt
        return;
    } else {
        console.log(inputSize);
        alert('Wrong input value, try again!');
        inputSize = prompt('Enter new size you want to see (min 5, max 100)');
        checkForInput(inputSize);
    }
};

// 
let inputedSize;
const sizeButton = document.getElementById('change-size');
sizeButton.addEventListener('click', () => {
    inputedSize = prompt('Enter new size you want to see (min 10, max 100)');
    checkForInput(inputedSize);
});