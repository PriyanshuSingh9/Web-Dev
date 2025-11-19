function createGrid(size) {
    const container = document.querySelector('.board');
    for (let r = 0; r < size; r++) {
        const row = document.createElement('div');
        row.style.height = `${container.clientHeight / size}px`
        row.style.width = `${container.clientWidth}px`
        row.classList.add('row');
        for (let i = 0; i < size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.height = `${container.clientHeight / size}px`;
            cell.style.width = `${container.clientWidth / size}px`;
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

createGrid(16);
function paintMode() {
}

let options = document.querySelector('options');
options.addEventListener('click', (e) => {
    let target = e.target.classList;
    if (target.contains("paint")) {
        paintMode();
    }
    else if (target.contains("erase")) {
        eraseMode();
    }
    else if (target.contains("clear")) {
        clearGrid();
    }
    else {
        console.log("clicked outside button");
    }
});

// range event listener


// hover event listener