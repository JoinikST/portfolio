document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const gridDimension = 8
    const squares = []
    const candyColors = [
        'url(images/piece1.png)',
        'url(images/piece2.png)',
        'url(images/piece3.png)',
        'url(images/piece4.png)',
        'url(images/piece5.png)',
        'url(images/piece6.png)'
    ]
    let score = 0
    scoreDisplay.innerHTML = score

    // Create Board
    function createBoard() {
        for (let i = 0; i < gridDimension*gridDimension; i++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColorIndex = Math.floor(Math.random() * candyColors.length)
            square.style.backgroundImage = candyColors[randomColorIndex]
            grid.appendChild(square)
            squares.push(square)
        }
    }

    createBoard()

    // Drag the candies
    let colorBeingDragged
    let colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced

    squares.forEach(square => {
        square.addEventListener('dragstart', dragStart)
        square.addEventListener('dragend', dragEnd)
        square.addEventListener('dragover', dragOver)
        square.addEventListener('dragenter', dragEnter)
        square.addEventListener('dragleave', dragLeave)
        square.addEventListener('drop', dragDrop)
    })

    function dragStart() {
        colorBeingDragged = this.style.backgroundImage
        squareIdBeingDragged = parseInt(this.id)
    }
    function dragEnd() {
        let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged - gridDimension,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + gridDimension
        ]

        let validMove = validMoves.includes(squareIdBeingReplaced)
        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        } else {
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        }
    }
    function dragOver(e) {
        e.preventDefault()
    }
    function dragEnter(e) {
        e.preventDefault()
    }
    function dragLeave(e) {
        e.preventDefault()
    }
    function dragDrop() {
        colorBeingReplaced = this.style.backgroundImage
        squareIdBeingReplaced = parseInt(this.id)
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
        this.style.backgroundImage = colorBeingDragged
    }

    function moveDown() {
        for (i = 0; i<55; i++) {
            const firstRow = [0,1,2,3,4,5,6,7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && squares[i].style.backgroundImage === '') {
                let randomColorIndex = Math.floor(Math.random() * candyColors.length)
                squares[i].style.backgroundImage = candyColors[randomColorIndex]
            }
            if (squares[i + gridDimension].style.backgroundImage === '') {
                squares[i + gridDimension].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ''
            }
        }
    }

    function checkRowForThree() {
        for (i = 0; i < 61; i ++) {
            let rowOfThree = [i, i+1, i+2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
            if (notValid.includes(i)) continue
            if (rowOfThree.every(index => !isBlank && squares[index].style.backgroundImage === decidedColor)) {
                score += 3
                scoreDisplay.innerHTML = score
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    function checkColumnForThree() {
        for (i = 0; i < 47; i ++) {
            let columnOfThree = [i, i+gridDimension, i+(gridDimension*2)]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (columnOfThree.every(index => !isBlank && squares[index].style.backgroundImage === decidedColor)) {
                score += 3
                scoreDisplay.innerHTML = score
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    function checkRowForFour() {
        for (i = 0; i < 60; i ++) {
            let rowOfFour = [i, i+1, i+2, i+3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]
            if (notValid.includes(i)) continue
            if (rowOfFour.every(index => !isBlank && squares[index].style.backgroundImage === decidedColor)) {
                score += 4
                scoreDisplay.innerHTML = score
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    function checkColumnForFour() {
        for (i = 0; i < 39; i ++) {
            let columnOfFour = [i, i+gridDimension, i+(gridDimension*2), i+(gridDimension*3)]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (columnOfFour.every(index => !isBlank && squares[index].style.backgroundImage === decidedColor)) {
                score += 4
                scoreDisplay.innerHTML = score
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    window.setInterval(function() {
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
        moveDown()
    }, 100)
})
