const gameBoard = (function () {

    const board = document.querySelector('.gameboard');

    let gridState = [];

    // Create a new tile with an attribute that tracks it's position in the grid.
    const createTile = (posx, posy) => {
        const newTile = document.createElement('div');
        newTile.setAttribute('data-gridPos', `${posx}-${posy}`)
        newTile.classList.add('tile');
        newTile.addEventListener('click', () => {
            newTile.textContent = 'x';
        });
        return newTile
    }

    // Populate the starting state of the game board.
    const gameReset = () => {
        gridState = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];

        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                const newTile = createTile(i, j);
                newTile.textContent = gridState[i][j];
                board.appendChild(newTile);
            }
        }
    }

    // Refresh the grid to reflect new game state.
    const updateGrid = () => {
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                const updateTile = document.querySelector(`[data-gridPos = "${i}-${j}"]`);
                updateTile.textContent = gridState[i][j];
            }
        }
    }

    gameReset();

    return {
        gridState,
        updateGrid
    }
})();

const Player = () => {
    
    window.addEventListener('click', function(e) {
        const gridSelection = document.querySelector('.tile')
        if (!gridSelection) return
        console.log('yup');
    });
};

const player1 = Player();