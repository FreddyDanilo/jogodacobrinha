const game = () => {
    const canvas = document.querySelector("#canvas"), context = canvas.getContext("2d")
    let snake = []
    let foodX = Math.floor(Math.random() * 30), foodY = Math.floor(Math.random() * 30)
    let velocityX = 0, velocityY = 0
    let grid = 20
    let positionX = Math.floor(Math.random() * 30), positionY = Math.floor(Math.random() * 30)
    let size = 3, score = 0
    const start = document.querySelector("[name='iniciar']")
    const pause = document.querySelector("[name='pausar']")
    const stop = document.querySelector("[name='parar']")

    const camp = () => {
        context.fillStyle = "rgba(50, 50, 50, 1)"
        context.fillRect(0, 0, canvas.width, canvas.height)
    }

    const snakeEvents = () => {
        camp()

        context.fillStyle = "rgba(255, 215, 0, 1)"
        for (const s of snake) {
            context.fillRect(s.x * grid, s.y * grid, grid - 1, grid - 1)
            if (s.x === positionX && s.y === positionY) {
                size = 3, score = 0
                document.querySelector("h1").textContent = ("000" + score).slice(-3)
            }
        }

        snake.push({ x: positionX, y: positionY })
        positionX += velocityX, positionY += velocityY

        while (snake.length > size) snake.shift()

        if (positionX < 0) positionX = 30
        else if (positionX >= 30) positionX = -1
        if (positionY < 0) positionY = 30
        else if (positionY >= 30) positionY = -1

        context.fillStyle = "rgba(9, 156, 255, 1)"
        context.fillRect(foodX * grid, foodY * grid, grid - 1, grid - 1)

        if (positionX === foodX && positionY === foodY) {
            foodX = Math.floor(Math.random() * 30)
            foodY = Math.floor(Math.random() * 30)
            size++, score++
            document.querySelector("h1").textContent = ("000" + score).slice(-3)
        }
    }
    snakeEvents()

    const movimentation = (tecla) => {
        switch (tecla.keyCode) {
            case 38: // Seta para Cima
                if (velocityY !== 1) velocityX = 0, velocityY = -1
                break;
            case 40: // Seta para Baixo
                if (velocityY !== -1) velocityX = 0, velocityY = 1
                break;
            case 37: // Seta para Esquerda
                if (velocityX !== 1) velocityX = -1, velocityY = 0
                break;
            case 39: // Seta para Direita
                if (velocityX !== -1) velocityX = 1, velocityY = 0
                break;
        }
    }
    window.onkeydown = tecla => movimentation(tecla)

    start.onclick = () => {
        if (start.getAttribute("data") === "iniciar") {
            start.setAttribute("disabled", "true")
            stop.removeAttribute("disabled")
            pause.removeAttribute("disabled")
            interval = setInterval(snakeEvents, 100)
        } else if (start.getAttribute("data") === "continuar") {
            start.setAttribute("disabled", "true")
            stop.removeAttribute("disabled")
            pause.removeAttribute("disabled")
            interval = setInterval(snakeEvents, 100)
        } else if (start.getAttribute("data") === "reiniciar") {
            start.setAttribute("disabled", "true")
            stop.removeAttribute("disabled")
            pause.removeAttribute("disabled")
            interval = setInterval(snakeEvents, 100)
        }
    }

    pause.onclick = () => {
        start.removeAttribute("disabled")
        start.setAttribute("data", "continuar")
        start.textContent = "Continuar"
        pause.setAttribute("disabled", "true")
        clearInterval(interval)
    }

    stop.onclick = () => {
        start.removeAttribute("disabled")
        start.setAttribute("data", "reiniciar")
        start.textContent = "Reiniciar"
        pause.setAttribute("disabled", "true")
        stop.setAttribute("disabled", "true")
        clearInterval(interval)
        foodX = Math.floor(Math.random() * 30), foodY = Math.floor(Math.random() * 30)
        positionX = Math.floor(Math.random() * 30), positionY = Math.floor(Math.random() * 30)
        size = 3, score = 0
        document.querySelector("h1").textContent = ("000" + score).slice(-3)
    }
}

window.onload = game
