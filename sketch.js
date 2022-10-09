const container = document.querySelector('.container');


function setGridXX(row, column) {
    container.style.cssText = `grid-template-columns: repeat(${column}, 1fr); 
    grid-template-rows: repeat(${row}, 1fr);`;
}

function createDiv(numSquares) {
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

    createDiv(numSquares);
    setGridXX(row, column);
}

startSketch();
