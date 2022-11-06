const GRID_CONTAINER = document.querySelector('.gridContainer');
let slider = document.querySelector('.slider');
let gridSize = document.querySelector('.gridSize');
let colorChoice = document.querySelector('#colorPicker');

// initial setup
let row = 16;
let column = 16;
let color = colorChoice.value;

// Setup for SLIDER's range value and Grid Size
gridSize.innerHTML = `${slider.value} x ${slider.value}`;
slider.addEventListener('input', () => {
    gridSize.innerHTML = `${slider.value} x ${slider.value}`;
    row = slider.value;
    column = slider.value;
    startSketch();
});

// Color/Rainbow/Warm/Cool Btn Selected, and Eraser setup
let colorModeBtn = document.querySelector('.colorModeBtn');
let rainbowBtn = document.querySelector('.rainbowBtn');
let warmBtn = document.querySelector('.warmBtn');
let coolBtn = document.querySelector('.coolBtn');
let clearBtn = document.querySelector('.clearBtn');
let eraser = document.querySelector('.eraser');
let buttons = document.querySelectorAll('button');
let btnSelected = "colorModeBtn";
eval(btnSelected).classList.add('active'); //eval() allows me to call the object instead of string value
eraser.addEventListener('animationend', function () { this.style.animation = '' });

// Show selected buttons & setup btnSelected
buttons.forEach(btn => btn.addEventListener('click', function(event) {
    eval(btnSelected).classList.remove('active'); 

    let clickBtn = event.target.classList.value;
    if(clickBtn != "clearBtn" && clickBtn != "eraser") {
        btnSelected = clickBtn;
        btn.classList.add('active');
    } else if (clickBtn == "clearBtn") {
        clearGrid();
        // keep the current selectedBtn to show "active" css selector, except for eraser
        if(btnSelected != "eraser"){
            eval(btnSelected).classList.add('active');
        }
    } else {
        // btnSelected is Eraser, no need to 'active' it, just play a shaking animation
        eraser.style.animation = "shake2 .5s forwards";
        btnSelected = clickBtn;
    }
}));

// Keep track of toggleState & mouseDown event
let mouseDown = false
let toggleSwitch = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeColor(e) {
    if(toggleSwitch && e.type === 'mouseover' && !mouseDown) {
        return
    }

    switch(btnSelected) {
        case 'colorModeBtn':
            color = colorChoice.value;
            e.target.style.backgroundColor = color;
            break;
        case 'rainbowBtn':
            color = generateRainbow();
            e.target.style.backgroundColor = color;
            break;
        case 'warmBtn':
            color = generateWarm();
            e.target.style.backgroundColor = color;
            break;
        case 'coolBtn':
            color = generateCool();
            e.target.style.backgroundColor = color;
            break;
        case 'eraser':
            color = "#f5f5f5";
            e.target.style.backgroundColor = color;
        default:
            e.target.style.backgroundColor = color;
    }
}

function generateRainbow() {
    // Generate random HEX value
    let randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    return randomColor;
}

function rand(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateWarm() {
    // hue: red(0%)->orange(30%)->yellow(60%)->green(120%)...rose(330%) | saturation: 35-90 | lightness: lighter range
    let hsl1 = "hsl(" + rand(0,100) + ", "+ rand(35, 100) + "%, "+ rand(40,90) +"%)";
    return hsl1;
}

function generateCool() {
    // hue: green(120%)->blue(240%)->purple(270%) | saturation: 40-90 | lightness: darker range
    var hsl2 = "hsl(" + rand(170,250) + ", "+ rand(40, 90) + "%, "+ rand(20,80) +"%)";
    return hsl2;
}

const gridCollection = GRID_CONTAINER.children;
function clearGrid() {
    for(let i = 0; i < gridCollection.length; i++) {
        gridCollection[i].style.backgroundColor = '#f5f5f5';
    }
}

function removeGrid() {
    while (GRID_CONTAINER.firstChild) { 
        GRID_CONTAINER.removeChild(GRID_CONTAINER.firstChild); 
    }
}

// Sets up css container's Grid to have the input # of rows and columns
function setGridXX(row, column) {
    GRID_CONTAINER.style.cssText = `grid-template-rows: repeat(${row}, 1fr);
    grid-template-columns: repeat(${column},1fr);`;
}

function createSquares(numSquares) {
    for(let i = 0; i < numSquares; i++) {
        let div = document.createElement('div');
        div.classList.add("square");
        GRID_CONTAINER.appendChild(div);
    }
}

function startSketch() {
    let numSquares = row * column;

    removeGrid();
    createSquares(numSquares);
    setGridXX(row, column);

    // Sets grid to intially listen for drag/mouseover event and change color base on selectedBtn
    let squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener('mouseover', changeColor));

    // TOGGLE SWITCH setup for different event conditions (HOVER/MANUAL)
    let checkbox = document.querySelector("input[type=checkbox]");

    checkbox.addEventListener('change', function() {
        if(this.checked) {
            squares.forEach(function(square) {
                // implement click/drag
                toggleSwitch = true;
                square.addEventListener('mousedown', changeColor);

            })
            console.log("Checkbox is checked..");
        } else {
            squares.forEach(function(square) {
                toggleSwitch = false;
                square.removeEventListener('mousedown', changeColor);
            })
            console.log("Checkbox is off..");
        }
    });
}

startSketch();
