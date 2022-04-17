const gameBoard = (function () {

    const board = document.querySelector('.gameboard');

    let gridState = [];

    // Create a new tile with an attribute that tracks it's position in the grid.
    const createTile = (posx, posy) => {
        const newTile = document.createElement('div');
        newTile.setAttribute('data-gridPos', `${posx}-${posy}`)
        newTile.classList.add('tile');
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

const Player = (z) => {
    const mark = z;
    isTurn = true;
    return {
        mark,
        isTurn
    }
};

const player1 = Player('x');
const player2 = Player('o');

const gameController = (function () {
    const gameOn = true;
    const grid = gameBoard.gridState;
    const allTiles = document.querySelectorAll('.tile')
    
    // const evalGameState = () => {
    //     console.log(grid);
    // };

    window.addEventListener('click', function(e) {
        if (!gameOn) return
        if (!e.target.classList.contains('tile')) return

        let currentTilePos = e.target.dataset.gridpos

        if (player1.isTurn) {
            e.target.textContent = player1.mark;
            gameBoard.gridState[currentTilePos[0]][currentTilePos[2]] = player1.mark;
            player1.isTurn = false;
            player2.isTurn - true;
        } else {
            e.target.textContent = player2.mark;
            gameBoard.gridState[currentTilePos[0]][currentTilePos[2]] = player2.mark;
            player1.isTurn = true;
            player2.isTurn - false;
        };
    });

})();
