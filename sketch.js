const gridContainer = document.querySelector('.gridContainer');
let slider = document.querySelector('.slider');
let gridSize = document.querySelector('.gridSize');
let colorChoice = document.querySelector('#colorPicker');

// initial setup
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

let colorModeBtn = document.querySelector('.colorModeBtn');
let rainbowBtn = document.querySelector('.rainbowBtn');
let clearBtn = document.querySelector('.clearBtn');
let buttons = document.querySelectorAll('button')
let btnSelected = "colorModeBtn";
eval(btnSelected).classList.add('active'); //eval allows me to call the object instead of string value

// Show selected buttons & setup btnSelected
buttons.forEach(btn => btn.addEventListener('click', function(event) {
    eval(btnSelected).classList.remove('active'); 

    let clickBtn = event.target.classList.value;
    if(clickBtn != "clearBtn") {
        btnSelected = clickBtn;
        btn.classList.add('active');
    } else {
        clearGrid();
        eval(btnSelected).classList.add('active');
    }
}));

// Setup for changing color (Color MODE)
// colorChoice.addEventListener('input', () => {
//     color = colorChoice.value;
// });


function generateRainbow() {
    let randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    return randomColor;
}

const collection = gridContainer.children;
function clearGrid() {
    for(let i = 0; i < collection.length; i++) {
        collection[i].style.backgroundColor = '#f5f5f5';
    }
}

function removeGrid() {
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

    removeGrid();
    createSquares(numSquares);
    setGridXX(row, column);

    // Listens to user's mouse hover over individual squares and change the background color
    let squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener('mouseover', function () {
        switch(btnSelected) {
            case 'colorModeBtn':
                color = colorChoice.value;
                square.style.backgroundColor = color;
                break;
            case 'rainbowBtn':
                color = generateRainbow();
                console.log(color);
                square.style.backgroundColor = color;
                break;
            default:
                square.style.backgroundColor = color;
        }
    }));
}

startSketch();
