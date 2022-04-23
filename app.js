const menu = document.querySelector('.menu')
const board = document.querySelector('.board')
const gridCells = document.querySelectorAll('.cell')
const pvpButton = document.getElementById('playervsplayer')
const pvaiButton = document.getElementById('playervsai')
const gameMessage = document.getElementById('gameMessage')

const xTurn = 'xTurn'
const oTurn = 'oTurn'
const xClass = 'X'
const oClass = 'O'

const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let gameMode

pvpButton.addEventListener('click', () => {
    startGame()
    gameMode = 'pvp'
    toggleMenuView()
})

pvaiButton.addEventListener('click', () => {
    startGame()
    gameMode = 'pvai'
    toggleMenuView()
})

function toggleMenuView() {
    menu.classList.remove('show')
}

function startGame() {
    gridCells.forEach(cell => {
        cell.innerText = ''
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
        gameMode = ''
        cell.removeEventListener('click', clickHandler)
        cell.addEventListener('click', clickHandler, { once: true })
        board.classList.remove(xTurn)
        board.classList.remove(oTurn)
        board.classList.add(xTurn)
    })
}

function clickHandler(e) {
    const currentCell = e.target
    let currentClass
    if (gameMode == 'pvp') {
        currentClass = board.classList.contains(xTurn) ? xClass : oClass
        console.log(currentClass)
        currentCell.innerText = board.classList.contains(xTurn) ? 'X' : 'O'
        currentCell.classList.add(board.classList.contains(xTurn) ? xClass : oClass)
        switchTurns()
    }   else if (gameMode == 'pvai') {
        currentCell.innerText = 'X'
        currentCell.classList.add(xClass)
        currentClass = xClass
        randomAIMove(currentClass)
    }
    if (checkForWin(currentClass)) {
        gameMessage.innerText = `${currentClass == xClass ? 'X' : 'O'} Wins!`
        menu.classList.add('show')
    } else if (checkForDraw()) {
        gameMessage.innerText = 'Draw!'
        menu.classList.add('show')
    }
}

function checkForWin(currentClass) {
    return winningMoves.some(combination => {
        return combination.every(index => {
            return gridCells[index].classList.contains(currentClass)
        })
    })
}

function checkForDraw() {
    return [...gridCells].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
}

function randomAIMove(currentClass) {
    const availableMoves = [...gridCells].filter(cell => {
        return cell.classList.length == 1
    })
    if (availableMoves.length == 0) return
    const index = Math.floor(Math.random() * availableMoves.length)
    availableMoves[index].innerText = 'O'
    availableMoves[index].classList.add('O')
    currentClass = oClass
}

function switchTurns() {
    if (board.classList.contains(xTurn)) {
        board.classList.remove(xTurn)
        board.classList.add(oTurn)
    } else {
        board.classList.remove(oTurn)
        board.classList.add(xTurn)
    }
}