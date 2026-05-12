/**
 * Basic Pac-Man movement and interaction
 */
// Movement control
input.onButtonPressed(Button.A, function () {
    pacman.change(LedSpriteProperty.X, -1)
})
input.onButtonPressed(Button.AB, function () {
    pacman.change(LedSpriteProperty.Y, 1)
})
input.onButtonPressed(Button.B, function () {
    pacman.change(LedSpriteProperty.X, 1)
})
input.onGesture(Gesture.TiltRight, function () {
    pacman.change(LedSpriteProperty.Y, -1)
})
let score = 0
let pacman: game.LedSprite = null
// Initialize game
pacman = game.createSprite(2, 2)
let ghost = game.createSprite(0, 0)
let food = game.createSprite(4, 4)
food.set(LedSpriteProperty.Brightness, 100)
// Game Loop
basic.forever(function () {
    // Ghost follows Pac-Man
    if (ghost.get(LedSpriteProperty.X) < pacman.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X, 1)
    } else if (ghost.get(LedSpriteProperty.X) > pacman.get(LedSpriteProperty.X)) {
        ghost.change(LedSpriteProperty.X, -1)
    } else if (ghost.get(LedSpriteProperty.Y) < pacman.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y, 1)
    } else if (ghost.get(LedSpriteProperty.Y) > pacman.get(LedSpriteProperty.Y)) {
        ghost.change(LedSpriteProperty.Y, -1)
    }
    // Eating food
    if (pacman.isTouching(food)) {
        score += 1
        food.delete()
        food = game.createSprite(randint(0, 4), randint(0, 4))
        food.set(LedSpriteProperty.Brightness, 100)
    }
    // Collision with ghost
    if (pacman.isTouching(ghost)) {
        game.gameOver()
    }
    basic.pause(500)
})
