function createGrid(size) {
    const board = document.querySelector(".board");
    board.innerHTML = "";
    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.style.height = `${board.clientHeight / size}px`
        row.style.width = `${board.clientWidth}px`
        row.classList.add('row');
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.classList.add('cell');
            cell.style.height = `${board.clientHeight / size}px`;
            cell.style.width = `${board.clientWidth / size}px`;
            row.appendChild(cell);
            cell.addEventListener("mouseover", handleHover)
        }
        board.appendChild(row);
    }
}

function randomRGB() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
}
createGrid(16);

function handleHover(e) {
    if (currentMode === "paint") {
        e.target.style.backgroundColor = randomRGB();
    } else if (currentMode === "erase") {
        e.target.style.backgroundColor = "white";
    }
}
function clearGrid() {
    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.style.backgroundColor = "white";
    })
}

let currentMode = "paint";
let options = document.querySelector(".options");
options.addEventListener("click", (e) => {
    let target = e.target.classList;
    if (target.contains("paint")) {
        currentMode = "paint";
    }
    else if (target.contains("erase")) {
        currentMode = "erase";
    }
    else if (target.contains("clear")) {
        clearGrid();
    }
    else {
        console.log("clicked outside button");
    }
});


const slider = document.querySelector("input");
slider.addEventListener("input", (e) => {
    let size = e.target.value;
    createGrid(size);
})
// this causes leaking of events as we dont turn any event off after another option is chosen

// function paintMode() {
//     let cells = document.querySelectorAll('.cell');
//     cells.forEach((cell) => {
//         cell.addEventListener('mouseover', () => {
//             cell.style.backgroundColor = randomRGB();
//         });
//     });
// }
// function eraseMode() {
//     let cells = document.querySelectorAll('.cell');
//     cells.forEach((cell) => {
//         cell.addEventListener('mouseover', () => {
//             cell.style.backgroundColor = "white";
//         });
//     });
// }