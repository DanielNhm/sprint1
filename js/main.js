'use strict'


var gBoard = []
var size = 4
const MINE = '💣'
const FLAG = '🚩'
var isFlaged = true
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function onInit() {
    var elTable = document.querySelector('tbody')
    elTable.innerHTML=''
    gBoard =[]
    createBoard()
    renderBoard()
    renderNumbers()
   


}

function renderBoard() {
    var strHTML = ''
    var elTable = document.querySelector('tbody')
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr >\n`
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j]
            var className = (cell.isMine) ? 'mine' : ''


            // Add a cell title
            var title = `Cell: ${i + 1}, ${j + 1}`

            strHTML += `<td title="${title}" class="cell ${className} unmark" oncontextmenu="onCellMarked(this,event)" onclick="onCellClicked(${i}, ${j})"
                         data-i="${i}" data-j="${j}" ><span class="x">${cell.isMine ? MINE : ''}</span><span class="flag"></span>
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }
    elTable.innerHTML += strHTML
}
function renderNumbers(){
    var elCell
    for(var i =0; i<size;i++){
        for(var j = 0;j<size;j++){
            if(gBoard[i][j].isMine)continue
            elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"] .x`)
            elCell.innerHTML = (Math.random() > 0.4) ? getRandomInt(0,5) : ''


        }
    }
}
function onCellClicked(i, j) {
    var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
    // var elSpanCell = document.querySelector(`[data-i="${i}"][data-j="${j}"] span`)
    //elSpanCell.style.display = "block"
    if(gBoard[i][j].isMarked)
    return
    elCell.classList.remove("unmark")
    elCell.style.background = "white"
    expandShown(elCell, i, j)

}
function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.isMine && !currCell.isMarked) {
                return
            }
            else if (!currCell.isShown)
                return
        }
    }
    console.log('Game Over')
}
function createBoard() {
    for (var i = 0; i < size; i++) {
        var arr = []
        for (var j = 0; j < size; j++) {
            arr.push(createCell())
        }
        gBoard.push(arr)
    }
    gBoard[1][3].isMine = true
    gBoard[2][2].isMine = true

}
function updateMine() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var countMine = setMinesNegsCount(i, j)
            gBoard[i][j].setMinesNegsCount = countMine

        }

    }
}
function createCell() {
    var cell = {
        minesAroundCount: 4,
        isShown: false,
        isMine: false,
        isMarked: false
    }
    return cell
}
function setMinesNegsCount(rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= gBoard[0].length) continue
            var currCell = gBoard[i][j]
            if (currCell.isMine)
                count++
        }
    }
    return count
}
function expandShown(elCell, rowIdx, colIdx) {
    if (elCell.innerText === '')
        for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
            if (i < 0 || i >= gBoard.length) continue
            for (var j = colIdx - 1; j <= colIdx + 1; j++) {
                if (i === rowIdx && j === colIdx) continue
                if (j < 0 || j >= gBoard[0].length) continue
                var elSpanCurrCell = document.querySelector(`[data-i="${i}"][data-j="${j}"] span`)
                var elCurrCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)

                if (elSpanCurrCell.innerText === MINE)
                    continue
                elCurrCell.classList.remove("unmark")
                elCurrCell.style.background = "white"
            }

        }
}
function onCellMarked(elCell, event) {
    event.preventDefault()
    console.log((elCell.dataset.i))
    var elSpanFlag = document.querySelector(`[data-i="${elCell.dataset.i}"][data-j="${elCell.dataset.j}"] .flag`)

    if (gBoard[elCell.dataset.i][elCell.dataset.j].isMarked) {
        elSpanFlag.innerHTML = ''
        gBoard[elCell.dataset.i][elCell.dataset.j].isMarked = false
        return

    }
    if (elCell.classList.contains('unmark') && !gBoard[elCell.dataset.i][elCell.dataset.j].isMarked) {
        elSpanFlag.innerHTML = FLAG
        gBoard[elCell.dataset.i][elCell.dataset.j].isMarked = true
    }

}
function chooseLevel(elBtn) {
   // clearInterval(Interval)
  //  var elCell = document.querySelector('.cell')
   // var eltens
   // var elsec
    //gcount = 1
  //  eltens = document.querySelector('.tens')
    //elsec = document.querySelector('.seconds')
    //var elNextNum = document.querySelector('.nextnum')
   // elNextNum.innerHTML = ' ' + gcount
   // eltens.innerHTML = "0" + '0'
    //elsec.innerHTML = "0" + '0'
    //elCell.innerHTML = ''
    //seconds = 0
   // tens = 0
   // console.log('elcell', elCell)
    size = parseInt(elBtn.value)
    onInit()
    //gNums = buildArray()
   // renderBoard(size)
  
  }
  
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min 
}

