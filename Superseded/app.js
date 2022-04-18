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

    const resetGridState = () => {
        return [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
    };

    // Populate the starting state of the game board.
    function gameReset() {

        gridState = resetGridState();

        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                const newTile = createTile(i, j);
                newTile.textContent = gridState[i][j];
                board.appendChild(newTile);
            }
        }
    }

    const getAvailableTiles = () => {
        const availableTiles = []
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (gridState[i][j] == '') {
                    availableTiles.push(`${i}-${j}`);
                }
            }
        }
        return availableTiles
    };

    const checkForWin = (symbol) => {
        return gridState.some((moves) => moves.every((move) => move === symbol));
    };

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
        resetGridState,
        updateGrid,
        getAvailableTiles,
        checkForWin
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
    // Game controls.
    const controls = document.querySelector('.controls');
    const gameContainer = document.querySelector('.game');
    const pvp_Button = document.querySelector('.player-vs-player');
    const pvai_Button = document.querySelector('.player-vs-ai');
    const gameModeText = document.querySelector('.game-mode');
    const changeGameModeButton = document.querySelector('.select-new-mode');

    // Game event below.
    let gameOn = true;
    const grid = gameBoard.gridState;
    const allTiles = document.querySelectorAll('.tile');
    let playMode = '';

    // Display toggle funtions.
    function toggleControls() {
        controls.style.display = controls.style.display == 'flex' ? 'none' : 'flex';
        gameContainer.style.display = gameContainer.style.display == 'none' ? 'flex' : 'none';
    };

    const currentPlayMode = (players, pMode) =>  {
        gameOn = true;
        gameModeText.textContent = players;
        playMode = pMode;
    }

    // Adding toggle functionality to control buttons.
    pvp_Button.addEventListener('mousedown', () => {
        toggleControls();
        currentPlayMode('Player vs. Player', 'pvp');
    });

    pvai_Button.addEventListener('mousedown', () => {
        toggleControls();
        currentPlayMode('Player vs. AI', 'pvai');
    });

    changeGameModeButton.addEventListener('mousedown', () => {
        toggleControls();
        gameBoard.gridState = gameBoard.resetGridState();
        const allTiles = document.querySelectorAll('.tile');
        allTiles.forEach(tile => {
            tile.textContent = '';
        });
    });

    // Game win alert.
    function winnerIs(name) {
        alert(`The winner is: ${name}!`)
    }

    function assessWinner() {
        const player1Win = gameBoard.checkForWin(player1.mark);
        const player2Win = gameBoard.checkForWin(player2.mark);
        if (player1Win) {
            winnerIs('Player 1');
            gameOn = false;
        }
        if (player2Win) {
            winnerIs('Player 2');
            gameOn = false;
        }
    }

    window.addEventListener('click', function(e) {
        if (!gameOn) return
        if (!e.target.classList.contains('tile')) return

        let currentTilePos = e.target.dataset.gridpos;
        let availableTiles = gameBoard.getAvailableTiles();
        if (!(availableTiles.includes(currentTilePos))) {
            return
        }

        if (playMode == 'pvp') {
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
        }
        assessWinner();
    };

    if (playMode == 'pvai') {

        e.target.textContent = player1.mark;
        gameBoard.gridState[currentTilePos[0]][currentTilePos[2]] = player1.mark;

        const randomSelection = Math.floor(Math.random() * availableTiles.length);
        const aiSelection = availableTiles[randomSelection];
        const aiTile = document.querySelector(`[data-gridpos="${aiSelection}"]`);
        aiTile.textContent = player2.mark;
        gameBoard.gridState[aiSelection[0]][aiSelection[2]] = player2.mark;
        availableTiles = gameBoard.getAvailableTiles();

        assessWinner();
    }
    });
    return {
        playMode,
        gameOn
    }
})();
