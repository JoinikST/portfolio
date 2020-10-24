document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodlerLeft = 50
    let startPoint = 150
    let doodlerBottom = startPoint
    let isGameOver = false
    let platformCount = 5
    let platforms = []
    let upTimerId
    let downTimerId
    let leftTimerId
    let rightTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let score = 0
    
    function createDoodler() {
        grid.appendChild(doodler)
        doodler.classList.add('doodler')
        doodlerLeft = platforms[0].left
        doodler.style.left = doodlerLeft + 'px'
        doodler.style.bottom = doodlerBottom + 'px'
    }

    class Platform {
        constructor(newPlatBottom) {
            this.bottom = newPlatBottom
            this.left = Math.random() * 315 // grid width - platform width
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left +'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }

    function createPlatforms() {
        for (let i = 0; i < platformCount; i++) {
            let platGap = 600 / platformCount
            let newPlatBottom = 100 + (i * platGap)
            let newPlatform = new Platform(newPlatBottom)
            platforms.push(newPlatform)
        }
    }

    function movePlatforms() {
        if (doodlerBottom > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'

                if (platform.bottom < 10) {
                    platforms[0].visual.classList.remove('platform')
                    platforms.shift()
                    score ++
                    let newPlatform = new Platform(600)
                    platforms.push(newPlatform)
                }
            })
        }
    }

    function jump() {
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function () {
            doodlerBottom += 20
            doodler.style.bottom = doodlerBottom + 'px'
            if (doodlerBottom > startPoint + 200) {
                fall()
            }
        }, 30)
    }

    function fall() {
        clearInterval(upTimerId)
        isJumping = false
        downTimerId = setInterval(function () {
            doodlerBottom -= 5
            doodler.style.bottom = doodlerBottom + 'px'
            if (doodlerBottom <= 0) {
                gameOver()
            }
            platforms.forEach(platform => {
                if (doodlerBottom >= platform.bottom &&
                    doodlerBottom <= platform.bottom +15 &&
                    (doodlerLeft + 60) >= platform.left &&
                    doodlerLeft <= (platform.left + 85) &&
                    !isJumping) {
                        startPoint = doodlerBottom
                        jump()
                    }
            })
        }, 30)
    }

    function gameOver() {
        isGameOver = true
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = "<span>" + score + "</span><br/>Press F5 to play again"
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
    }

    function control(e) {
        if (e.key === "ArrowLeft" && !isGoingLeft && !isGameOver) {
            moveLeft()
        } else if (e.key === "ArrowRight" && !isGoingRight && !isGameOver) {
            moveRight()
        } else if (e.key === "ArrowUp") {
            moveStraight()
        }
    }

    function moveStraight() {
        isGoingRight = false
        isGoingLeft = false
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
    }

    function moveLeft() {
        if (isGoingRight) {
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true
        leftTimerId = setInterval(function () {
            if (doodlerLeft >= 0) {
                doodlerLeft -= 5
                doodler.style.left = doodlerLeft + 'px'
            } else moveRight()
        }, 30)
    }

    function moveRight() {
        if (isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        isGoingRight = true
        rightTimerId = setInterval(function () {
            if (doodlerLeft <= (400-60)) {
                doodlerLeft += 5
                doodler.style.left = doodlerLeft + 'px'
            } else moveLeft()
        }, 30)
    }

    function start() {
        if (!isGameOver) {
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms, 30)
            jump()
            document.addEventListener('keyup', control)
        }
    }

    start()
})

