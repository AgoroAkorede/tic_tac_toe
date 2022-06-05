const cellElements = document.querySelectorAll('[data-cell]')
const WinnerMessage = document.querySelector('[data-winner-message]')
const winnerPage = document.getElementById('winner_page')
const RestartBtn=document.getElementById('restartBtn')
const X_CLASS = "x"

const CIRCLE_CLASS = "circle"

let circleTurn
const WINARR = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 0, 4, 8 ],
    [ 2, 4, 6 ], 
]

StartGame()

RestartBtn.addEventListener('click', StartGame)


function  StartGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    });
    winnerPage.classList.remove('show')
}
function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell,currentClass)
   
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    }
    else {
        swapTurn()   
    }
    //CheckForDraw
    //SwitchTurn
   
}
const placeMark = (cell,currentClass) => {
    cell.classList.add(currentClass)
}

const swapTurn = () => {
    circleTurn = !circleTurn
}
const checkWin = (currentClass) => {
    return WINARR.some(combination => {
        return combination.every(index => {
            return cellElements[ index ].classList.contains(currentClass)
        })
    })
}
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS)||cell.classList.contains(CIRCLE_CLASS)
    })    
}
function endGame(draw) {
    if (draw) {
        WinnerMessage.innerText = `Draw 🤝`
        winnerPage.classList.add('draw')
    }
    else {
       
        WinnerMessage.innerText=`${circleTurn?"O Wins":"X Wins"}🥳🥳`
    }
    winnerPage.classList.add('show')
    
}
