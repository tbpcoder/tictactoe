const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

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
const winningMessageText = document.querySelector('[data-winning-text]')
const result = document.getElementById('result')
const restart = document.getElementById('restart')
board.classList.add(X_CLASS)
let turn = true


cellElements.forEach(cell => {
    cell.addEventListener('click',handleClick, {once: true})
});


function handleClick(e){
    const cell = e.target
    const currentClass = turn?X_CLASS:CIRCLE_CLASS
    palceMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)
    }else{
        turn = !turn
        setBoardHoverClass()    
    }
}

restart.addEventListener('click',() =>{window.location.reload()})

function endGame(draw){
    if(draw){
        winningMessageText.innerText = "Draw!"
    }else{
        winningMessageText.innerText = `${turn?"X's ":"O's "} Winns! `
    }
    result.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function palceMark(cell, currentClass){
    cell.classList.add(currentClass)
}


function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(turn)
        board.classList.add(X_CLASS)
    else
        board.classList.add(CIRCLE_CLASS)
}

function checkWin(currentClass){
    return winns.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}