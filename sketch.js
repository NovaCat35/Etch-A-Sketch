const container = document.querySelector('.container');
let square = document.querySelectorAll('.square');

// Sets up css container's Grid to have the input # of rows and columns
function setGridXX(row, column) {
    container.style.cssText = `grid-template-columns: repeat(${column}, 1fr); 
    grid-template-rows: repeat(${row}, 1fr);`;
}

function createSquares(numSquares) {
    for(let i = 0; i < numSquares; i++) {
        let div = document.createElement('div');
        div.classList.add("square");
        container.appendChild(div);
    }
}

function startSketch() {
    let row = 16;
    let column = 16;
    let numSquares = row * column;

    createSquares(numSquares);
    setGridXX(row, column);

    // Listens to user's mouse hover over individual squares and change the background color
    let squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener('mouseover', function (e) {
        square.style.backgroundColor = "black";
    }));
}

startSketch();
