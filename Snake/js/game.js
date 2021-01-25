// Constants
const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const ground = new Image()
const food = new Image()

// Sounds
const snakeSound = new Audio()
const scoreSound = new Audio()

// Files
food.src = 'img/food.png'
ground.src = 'img/ground.png'
snakeSound.src = 'sounds/snakeSound.mp3'
scoreSound.src = 'sounds/scoreSound.mp3'

// Variables
let box = 32
let dir
let score = 0

// Food object
let foodSpawn = {
    x: Math.floor((Math.random() * 17 + 1)) * box,  
    y: Math.floor((Math.random() * 15 + 3)) * box
}

// Snake object
let snakeSpawn = []
snakeSpawn[0] = {
    x: 9 * box,
    y: 10 * box
}

// Event 
document.addEventListener('keydown', (event) => {
    if(event.keyCode === 37 && dir != 'right'){
        dir = 'left'
    } else if (event.keyCode === 38 && dir != 'down'){
        dir = 'up'
    } else if(event.keyCode === 39 && dir != 'left'){
        dir = 'right'
    } else if(event.keyCode === 40 && dir != 'up'){
        dir = 'down'
    }
})

// Interaction of snake and snake-body
const eatTail = (head, arrs) => {
    for(let arr of arrs){
        if(head.x === arr.x && head.y === arr.y){
            clearInterval(game)
            location.reload()
            alert(`Ваш счёт ${score}`)
        }
    }
}

// Main function
const drawGame = () => {

    ctx.drawImage(ground, 0, 0) // background drawing
    ctx.drawImage(food, foodSpawn.x, foodSpawn.y) // food drawing
    
    //Snake drawing and moving 
    for(let snake of snakeSpawn){
        ctx.fillStyle = 'green' 
        ctx.fillRect(snake.x, snake.y, box, box)
    }

    // Score text
    ctx.fillStyle = 'white'
    ctx.font = '50px Arial'
    ctx.fillText(score, box * 2.5, box * 1.7)

    // Keyboard control
    ctx.fillStyle = 'white'
    ctx.font = '25px Arial'
    ctx.fillText('Управление на стрелочках :)', box * 8, box * 1.3)
    
    // Position 
    let snakeX = snakeSpawn[0].x
    let snakeY = snakeSpawn[0].y

    // Interaction of snake and food
    if(snakeX === foodSpawn.x && snakeY === foodSpawn.y){
        score++
        snakeSound.play()
        foodSpawn = {
            x: Math.floor((Math.random() * 17 + 1)) * box,  
            y: Math.floor((Math.random() * 15 + 3)) * box
        }

        if(score % 10 === 0){
            scoreSound.play()
        }

    } else {
        snakeSpawn.pop()
    }

    // Interaction of snake and borders
    if(snakeX < box || snakeX > box * 17 
        || snakeY < 3 * box || snakeY > box * 17){
            clearInterval(game)
            location.reload()
            alert(`Ваш счёт ${score}`)
        }
    
    // Control(event)
    if(dir === 'left'){ snakeX -= box}
    if(dir === 'right'){ snakeX += box}
    if(dir === 'up'){ snakeY -= box}
    if(dir === 'down'){ snakeY += box}
    
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snakeSpawn)

    snakeSpawn.unshift(newHead)

}

// Call Main
const game = setInterval(drawGame, 100)

