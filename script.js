// I'M GETTING LOST IN THIS CODE. But now I know that code has to be well formated!

const colorPara = document.getElementById('curr-color');
const colorButtons = document.querySelectorAll('.color-button');
let currColor = 'black';

const colors = ['red', 'green', 'blue', 'white', 'black', 'gray', 'red', 'green', 'greenyellow', 'blue', 'aqua', 'orange', 'yellow', 'purple', 'pink', 'salmon', 'brown'];

const selectRandomColor = () => {
    let index = Math.floor(Math.random() * 14);
    return colors[index];
};

colorButtons.forEach(button => {
    if (button.classList[1] !== 'rgb' && button.classList[1] !== 'opacity') {
        button.addEventListener('click', () => {
            currColor = button.classList[1];
            if (currColor !== 'greenyellow') {
                colorPara.innerHTML = 'Current color: ' + currColor;
            } else {
                colorPara.innerHTML = 'Current color: salad';
            }
            // Updating a node list of all tiles to make them responsible on click
            allTiles = document.querySelectorAll('.tile');
            allTiles.forEach((tile) => {
                tile.addEventListener('mouseover', () => {
                    tile.style.backgroundColor = currColor;
                })
            });
        });
    } else if (button.classList[1] === 'rgb') {
        button.addEventListener('click', () => {
            colorPara.innerHTML = 'Current color: rainbow+';
            allTiles = document.querySelectorAll('.tile');
            allTiles.forEach((tile) => {
                tile.addEventListener('mouseover', () => {
                    tile.style.backgroundColor = selectRandomColor();
                })
            });
        });
    } else if (button.classList[1] === 'opacity') {
        button.addEventListener('click', () => {
            let will = confirm('Selecting this color will delete your existing picture, proceed?');
            if (will === true) {
                let sizing = prompt('Enter new size you want to see (min 5, max 100)');
                checkForInputOpacity(sizing);
                allTiles = document.querySelectorAll('.tile');
                allTiles.forEach((tile) => {
                    tile.style.opacity = '1';
                    tile.addEventListener('mouseover', () => {
                        tile.style.opacity = (parseFloat(tile.style.opacity) - 0.1).toString();
                })
            });
            } else {
                return;
            } 
        });
    }
});

// console.log(colorButtons[0].classList[1])

// Storing css variables in rs variable
const r = document.querySelector(':root');
const rs = getComputedStyle(r);

// To make it toggled on every canvas creation
const bordersToggles = document.getElementsByName('border');

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
    // To toggle borders on
    bordersToggles[0].checked = true;

    // Creating a node list of all tiles to make them responsible on click
    allTiles = document.querySelectorAll('.tile');
    allTiles.forEach((tile) => {
        tile.addEventListener('mouseover', () => {
            tile.style.backgroundColor = currColor;
        })
    });
}

let createNewCanvasOpacity  = (gridSize) => {
    for (let i = 0; i < gridSize * gridSize; i++) {
        tileSize = (720 / gridSize) - 2;
        canvas.appendChild(tile.cloneNode(true));
        r.style.setProperty('--size', tileSize.toString() + 'px');
    }
    // To toggle borders on
    bordersToggles[0].checked = true;
    colorPara.innerHTML = 'Current color: -opacity';

    // Creating a node list of all tiles to make them responsible on click
    allTiles = document.querySelectorAll('.tile');
    allTiles.forEach((tile) => {
        tile.style.backgroundColor = 'black';
    });
}

// Functions to switch borders

const blackBorders = () => {
    allTiles = document.querySelectorAll('.tile');
    allTiles.forEach((tile) => {
        tile.classList.add('tile-borders');
    });
};
const transBorders = () => {
    allTiles = document.querySelectorAll('.tile');
    allTiles.forEach((tile) => {
        tile.classList.remove('tile-borders');
    });
};

// Assigning 
bordersToggles[0].addEventListener('click', blackBorders);
bordersToggles[1].addEventListener('click', transBorders);

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
        inputSize = prompt('Enter canvas size you want to draw on (min 5, max 100)');
        checkForInput(inputSize);
    }
};

let checkForInputOpacity = (inputSize) => {
    if (5 <= inputSize && inputSize <= 100) {
        allTiles = document.querySelectorAll('.tile');
        allTiles.forEach((tile) => {
            canvas.removeChild(tile);
        });
        createNewCanvasOpacity(inputSize);
    } else if (inputSize === null) { // in case if user tries to close the prompt
        return;
    } else {
        console.log(inputSize);
        alert('Wrong input value, try again!');
        inputSize = prompt('Enter canvas size you want to draw on (min 5, max 100)');
        checkForInputOpacity(inputSize);
    }
};

// Creates event for change size button
let inputedSize;
const sizeButton = document.getElementById('change-size');
sizeButton.addEventListener('click', () => {
    inputedSize = prompt('Enter new size you want to see (min 5, max 100)');
    checkForInput(inputedSize);
});

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
    allTiles = document.querySelectorAll('.tile');
        allTiles.forEach((tile) => {
            canvas.removeChild(tile);
        });
    createNewCanvas(Math.sqrt(allTiles.length));
    currColor = 'black';
    colorPara.innerHTML = 'Current color: black';
});