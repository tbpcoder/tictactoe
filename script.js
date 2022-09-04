const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

const display = (() => {
    const winningMessageText = document.querySelector('[data-winning-text]')
    const palceMark = (cell, currentClass) => {
        cell.classList.add(currentClass)
    }

    const setBoardHoverClass = (turn) => {
        board.classList.remove(X_CLASS)
        board.classList.remove(CIRCLE_CLASS)
        if(turn)
            board.classList.add(X_CLASS)
        else
            board.classList.add(CIRCLE_CLASS)
    }

    const endGame = (draw, turn) => {
        if(draw){
            winningMessageText.innerText = "Draw!"
        }else{
            winningMessageText.innerText = `${turn?"X's ":"O's "} Winns! `
        }
        result.classList.add('show')
    }

    return {palceMark, setBoardHoverClass, endGame}
})()

const gameBoard = (() => {
    const player = (name, mark, score) => {
        return {name, mark, score}
    }

    const playerx = player('x', [], 0)
    const playero = player('o', [], 0)

    const winns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    const cellElements = document.querySelectorAll('[data-cell]')
    const board = document.getElementById('board')
    const result = document.getElementById('result')
    const restart = document.getElementById('restart')
    let turn


    const startGame = () => {
        turn = true
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS)
            cell.classList.remove(CIRCLE_CLASS)
            cell.removeEventListener('click', handleClick)
            cell.addEventListener('click', handleClick, { once: true })
        })
        display.setBoardHoverClass(turn)
        result.classList.remove('show')
    }

    function handleClick(e){
        const cell = e.target
        const currentClass = turn?X_CLASS:CIRCLE_CLASS
        display.palceMark(cell, currentClass)
        if(checkWin(currentClass)){
            display.endGame(false, turn)
        }else if(isDraw()){
            display.endGame(true, turn)
        }else{
            turn = !turn
            display.setBoardHoverClass(turn)    
        }
    }

    function checkWin(currentClass){
        return winns.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass)
            })
        })
    }

    function isDraw(){
        return [...cellElements].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
        })
    }

    restart.addEventListener('click', startGame)

    return {startGame}

})()

gameBoard.startGame()