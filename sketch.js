const gridContainer = document.querySelector('.gridContainer');
let slider = document.querySelector('.slider');
let gridSize = document.querySelector('.gridSize');
let colorChoice = document.querySelector('#colorPicker');

let row = 16;
let column = 16;
let color = colorChoice.value;

// Setup for slider's range value and Grid Size
gridSize.innerHTML = `${slider.value} x ${slider.value}`;
slider.addEventListener('input', () => {
    gridSize.innerHTML = `${slider.value} x ${slider.value}`;
    row = slider.value;
    column = slider.value;
    startSketch();
});

// Setup for changing color
colorChoice.addEventListener('input', () => {
    color = colorChoice.value;
});

function clearGrid() {
    while (gridContainer.firstChild) { 
        gridContainer.removeChild(gridContainer.firstChild); 
    }
}

// Sets up css container's Grid to have the input # of rows and columns
function setGridXX(row, column) {
    gridContainer.style.cssText = `grid-template-rows: repeat(${row}, 1fr);
    grid-template-columns: repeat(${column},1fr);`;
}

function createSquares(numSquares) {
    for(let i = 0; i < numSquares; i++) {
        let div = document.createElement('div');
        div.classList.add("square");
        gridContainer.appendChild(div);
    }
}

function startSketch() {
    let numSquares = row * column;

    clearGrid();
    createSquares(numSquares);
    setGridXX(row, column);

    // Listens to user's mouse hover over individual squares and change the background color
    let squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener('mouseover', function (e) {
        square.style.backgroundColor = color;
        console.log(color);
    }));
}

startSketch();
