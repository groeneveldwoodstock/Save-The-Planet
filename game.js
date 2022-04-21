kaboom({
  ...{"fullscreen":true,"width":240,"height":240,"scale":1,"startScene":"main","version":"0.5.0","clearColor":[0,0,0,1]},
  global: true,
});
loadRoot('images/')
loadSprite('invader', 'invader.png')
loadSprite('invader2', 'invader2.png')
loadSprite('invader3', 'invader3.png')
loadSprite('invader4', 'invader4.png') 
loadSprite('spaceship', 'spaceship.png')
loadSprite('wall', 'wall.png')
loadSprite('rubble','rubble.png')
loadSprite('earth', 'earth.png')

function spawnRubble(r) {
  const obj = add([sprite('rubble'), pos(r), 'rubble'])
  wait(1, () => {
    destroy(obj)
  })
}
function spawnBullet(p) {
  add([
    rect(6,18), 
    pos(p), 
    origin('center'), 
    color(0.5, 0.5, 1),
    'bullet'
    ])
}

//level1  
scene("level1", (args = {}) => {
const MOVE_SPEED = 200
const INVADER_SPEED = 100
let CURRENT_SPEED = INVADER_SPEED
const LEVEL_DOWN = 400     
const TIME_LEFT = 30
const BULLET_SPEED = 350
layer(['obj', 'ui'], 'obj')
addLevel(
  [
  '!************    &',
  '!^^^^^^^^^^^^    &',
  '!^^^^^^^^^^^^    &', 
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
], 
{
  width: 30,
  height: 22,
  '^' : [ sprite('invader'), scale(0.7), 'space-invader'],
  '*' : [ sprite('invader2'), scale(0.7), 'space-invader'],
  '-' : [ sprite('invader3'), scale(0.7), 'space-invader'],
  '+' : [ sprite('invader4'), scale(0.7), 'space-invader'],
  '!' : [ sprite('wall'), 'left-wall'],
  '&' : [ sprite('wall'), 'right-wall'],
})
const player = add([
  sprite('spaceship'),
  pos(width() / 2, 400),
  origin('center')
])
const planet = add([
  sprite('earth'),
  pos(width() / 2, 450),
  origin('center')
])
keyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
})
keyDown('right', () => {
  player.move(MOVE_SPEED, 0)
})
keyPress('space', () => {
spawnBullet(player.pos.add(0, -25))
 })

action('bullet', (b) => {
  b.move(0, -BULLET_SPEED)
  if (b.pos.y < 0) {
    destroy(b)
  }
})
collides('bullet', 'space-invader', (b,s) => {
  camShake(2)
  destroy(b)
  destroy(s)
  spawnRubble(s.pos.add())
  score.value++
  score.text = "Aliens Killed: " + score.value
  if (score.value>35){
    announce.text=("Get ready for the next level!")
    timer.time +=5
    wait(5, () => {
      go('level2');
    })
  }
})
const instructions = add([
  text("Arrow Keys To Move\nSpace Bar To Shoot"),  
  pos(25, 550),
  layer('ui'),
  scale(2),
])
const score = add([
  text("Aliens Killed: " + '0'),  
  pos(25, 500),
  layer('ui'),
  scale(3),
  {
    value: 0,
  }
])
const announce = add([
  text("Destroy Them All Before You Run Out Of Time"),  
  pos(25, 2),
  layer('ui'),
  scale(1.5),
])
const timer = add([
  text('0'),
  pos(25,525),
  scale(2),
  layer('ui'),
  {
    time: TIME_LEFT,
  },
])
timer.action(() =>  {
  timer.time -= dt()
  timer.text = 'Time left: ' + timer.time.toFixed(0)
  if (timer.time <= 0 ) {
    go('lose', { score: score.value })
  }
})
action('space-invader', (s) => {
  s.move(CURRENT_SPEED, 0)
})
collides('space-invader', 'right-wall', () => {
  CURRENT_SPEED = -INVADER_SPEED
  every('space-invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})
collides('space-invader', 'left-wall', () => {
  CURRENT_SPEED = INVADER_SPEED
  every('space-invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})
player.overlaps('space-invader', () => {
  go('lose', {score: score.value})
})
action('space-invader', (s) => {
  if (s.pos.y >= (400)) {
      go('lose', { score: score.value })
  }
})
});

//level2  
scene("level2", (args = {}) => {
const MOVE_SPEED = 200
const INVADER_SPEED = 105
let CURRENT_SPEED = INVADER_SPEED
const LEVEL_DOWN = 300
const TIME_LEFT = 30
const BULLET_SPEED = 400
layer(['obj', 'ui'], 'obj')
addLevel(
  [
  '!  ******  ******  &',
  '!  ^^^^^^  ^^^^^^  &',
  '!                  &', 
  '!                  &',
  '!                  &',
  '!                  &',
  '!  ------  ------  &',
  '!                  &',
  '!                  &',
  '!                  &',
  '!                  &',
  '!                  &',
], 
{
  width: 30,
  height: 22,
  '^' : [ sprite('invader'), scale(0.7), 'space-invader'],
  '*' : [ sprite('invader2'), scale(0.7), 'space-invader'],
  '-' : [ sprite('invader3'), scale(0.7), 'space-invader'],
  '+' : [ sprite('invader4'), scale(0.7), 'space-invader'],
  '!' : [ sprite('wall'), 'left-wall'],
  '&' : [ sprite('wall'), 'right-wall'],
})
const player = add([
  sprite('spaceship'),
  pos(width() / 2, 400),
  origin('center')
])
const planet = add([
  sprite('earth'),
  pos(width() / 2, 450),
  origin('center')
])
keyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
})
keyDown('right', () => {
  player.move(MOVE_SPEED, 0)
})
keyPress('space', () => {
spawnBullet(player.pos.add(0, -25))
 })
action('bullet', (b) => {
  b.move(0, -BULLET_SPEED)
  if (b.pos.y < 0) {
    destroy(b)
  }
})
//change
collides('bullet', 'space-invader', (b,s) => {
  camShake(2)
  destroy(b)
  destroy(s)
  spawnRubble(s.pos.add())
  score.value++
  score.text = "Aliens Killed: " + score.value
  if (score.value>71){
    announce.text=("Get ready for the next level!")
    timer.time +=5
    wait(5, () => {
      go('level3');
    })
  }
})
//change
const score = add([
  text("Aliens Killed: " + '36'),  
  pos(25, 500),
  layer('ui'),
  scale(3),
  {
    value: 36,
  }
])
const instructions = add([
  text("Arrow Keys To Move\nSpace Bar To Shoot"),  
  pos(25, 550),
  layer('ui'),
  scale(2),
])
const announce = add([
  text("They have divided!"),  
  pos(25, 2),
  layer('ui'),
  scale(2),
])
const timer = add([
  text('0'),
  pos(25,525),
  scale(2),
  layer('ui'),
  {
    time: TIME_LEFT,
  },
])
timer.action(() =>  {
  timer.time -= dt()
  timer.text = 'Time left: ' + timer.time.toFixed(0)
  if (timer.time <= 0 ) {
    go('lose', { score: score.value })
  }
})
action('space-invader', (s) => {
  s.move(CURRENT_SPEED, 0)
})
collides('space-invader', 'right-wall', () => {
  CURRENT_SPEED = -INVADER_SPEED
  every('space-invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})
collides('space-invader', 'left-wall', () => {
  CURRENT_SPEED = INVADER_SPEED
  every('space-invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})
player.overlaps('space-invader', () => {
  go('lose', { score: score.value })
})
action('space-invader', (s) => {
  if (s.pos.y >= (400)) {
      go('lose', { score: score.value })
  }
})
});

//level3  
scene("level3", (args = {}) => {
const MOVE_SPEED = 200
const INVADER_SPEED = 115
let CURRENT_SPEED = INVADER_SPEED
const LEVEL_DOWN = 400
const TIME_LEFT = 40
const BULLET_SPEED = 400
layer(['obj', 'ui'], 'obj')
addLevel(
  [
  '! ++ ++ ++ ++ ++ &',
  '!                &',
  '!  **   **   **  &', 
  '!                &',
  '! ^ ^ ^^^^^^ ^ ^ &',
  '!                &',
  '!                &',
  '! -- -- -- -- -- &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
], 
{
  width: 30,
  height: 22,
  '^' : [ sprite('invader'), scale(0.7), 'space-invader'],
  '*' : [ sprite('invader2'), scale(0.7), 'space-invader'],
  '-' : [ sprite('invader3'), scale(0.7), 'space-invader'],
  '+' : [ sprite('invader4'), scale(0.7), 'space-invader'],
  '!' : [ sprite('wall'), 'left-wall'],
  '&' : [ sprite('wall'), 'right-wall'],
})
const player = add([
  sprite('spaceship'),
  pos(width() / 2, 400),
  origin('center')
])
const planet = add([
  sprite('earth'),
  pos(width() / 2, 450),
  origin('center')
])
keyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
})
keyDown('right', () => {
  player.move(MOVE_SPEED, 0)
})
keyPress('space', () => {
spawnBullet(player.pos.add(0, -25))
 })
action('bullet', (b) => {
  b.move(0, -BULLET_SPEED)
  if (b.pos.y < 0) {
    destroy(b)
  }
})
//change
collides('bullet', 'space-invader', (b,s) => {
  camShake(2)
  destroy(b)
  destroy(s)
  spawnRubble(s.pos.add())
  score.value++
  score.text = "Aliens Killed: " + score.value
  if (score.value>107){
    announce.text=("Get ready for the next level!")
    timer.time +=5
    wait(5, () => {
      go('level4');
    })
  }
})
//change
const score = add([
  text("Aliens Killed: " + '72'),  
  pos(25, 500),
  layer('ui'),
  scale(3),
  {
    value: 72,
  }
])
const announce = add([
  text("A new formation!"),  
  pos(25, 2),
  layer('ui'),
  scale(2),
])
const instructions = add([
  text("Arrow Keys To Move\nSpace Bar To Shoot"),  
  pos(25, 550),
  layer('ui'),
  scale(2),
])
const timer = add([
  text('0'),
  pos(25,525),
  scale(2),
  layer('ui'),
  {
    time: TIME_LEFT,
  },
])
timer.action(() =>  {
  timer.time -= dt()
  timer.text = 'Time left: ' + timer.time.toFixed(0)
  if (timer.time <= 0 ) {
    go('lose', { score: score.value })
  }
})
action('space-invader', (s) => {
  s.move(CURRENT_SPEED, 0)
})
collides('space-invader', 'right-wall', () => {
  CURRENT_SPEED = -INVADER_SPEED
  every('space-invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})
collides('space-invader', 'left-wall', () => {
  CURRENT_SPEED = INVADER_SPEED
  every('space-invader', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})
player.overlaps('space-invader', () => {
  go('lose', { score: score.value })
})

action('space-invader', (s) => {
  if (s.pos.y >= (400)) {
      go('lose', { score: score.value })
  }
})
});

//level4  
scene("level4", (args = {}) => {
  const MOVE_SPEED = 200
  const INVADER_SPEED = 120
  let CURRENT_SPEED = INVADER_SPEED
  const LEVEL_DOWN = 300
  const TIME_LEFT = 25
  const BULLET_SPEED = 400
  layer(['obj', 'ui'], 'obj')
  addLevel(
    [
    '! +   +   +   + &',
    '!               &',
    '!  *    *    *  &', 
    '!               &',
    '!     + +  +    &',
    '!               &',
    '!               &',
    '! -  -  -  -  - &',
    '!        +      &',
    '!               &',
    '!               &',
    '!               &',
  ], 
  {
    width: 30,
    height: 22,
    '^' : [ sprite('invader'), scale(0.7), 'space-invader'],
    '*' : [ sprite('invader2'), scale(0.7), 'space-invader'],
    '-' : [ sprite('invader3'), scale(0.7), 'space-invader'],
    '+' : [ sprite('invader4'), scale(0.7), 'space-invader'],
    '!' : [ sprite('wall'), 'left-wall'],
    '&' : [ sprite('wall'), 'right-wall'],
  })
  const player = add([
    sprite('spaceship'),
    pos(width() / 2, 400),
    origin('center')
  ])
  const planet = add([
    sprite('earth'),
    pos(width() / 2, 450),
    origin('center')
  ])
  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
  })
  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
  })
  keyPress('space', () => {
  spawnBullet(player.pos.add(0, -25))
   })
  action('bullet', (b) => {
    b.move(0, -BULLET_SPEED)
    if (b.pos.y < 0) {
      destroy(b)
    }
  })
  //change
  collides('bullet', 'space-invader', (b,s) => {
    camShake(2)
    destroy(b)
    destroy(s)
    spawnRubble(s.pos.add())
    score.value++
    score.text = "Aliens Killed: " + score.value
    if (score.value>123){
      announce.text=("Get ready for the next level!")
      timer.time +=5
      wait(5, () => {
        go('level5');
      })
    }
  })
  //change
  const score = add([
    text("Aliens Killed: " + '108'),  
    pos(25, 500),
    layer('ui'),
    scale(3),
    {
      value: 108,
    }
  ])
  const announce = add([
    text("They spread out\nto avoid missles!"),  
    pos(25, 2),
    layer('ui'),
    scale(2),
  ])
  const instructions = add([
    text("Arrow Keys To Move\nSpace Bar To Shoot"),  
    pos(25, 550),
    layer('ui'),
    scale(2),
  ])
  const timer = add([
    text('0'),
    pos(25,525),
    scale(2),
    layer('ui'),
    {
      time: TIME_LEFT,
    },
  ])
  timer.action(() =>  {
    timer.time -= dt()
    timer.text = 'Time left: ' + timer.time.toFixed(0)
    if (timer.time <= 0 ) {
      go('lose', { score: score.value })
    }
  })
  action('space-invader', (s) => {
    s.move(CURRENT_SPEED, 0)
  })
  collides('space-invader', 'right-wall', () => {
    CURRENT_SPEED = -INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  collides('space-invader', 'left-wall', () => {
    CURRENT_SPEED = INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  player.overlaps('space-invader', () => {
    go('lose', { score: score.value })
  })
  action('space-invader', (s) => {
    if (s.pos.y >= (400)) {
        go('lose', { score: score.value })
    }
  })
  });

//level5  
scene("level5", (args = {}) => {
  const MOVE_SPEED = 200
  const INVADER_SPEED = 125
  let CURRENT_SPEED = INVADER_SPEED
  const LEVEL_DOWN = 300
  const TIME_LEFT = 40
  const BULLET_SPEED = 400
  layer(['obj', 'ui'], 'obj')
  addLevel(
    [
    '! ^ ^ ^ ^ ^ ^ ^ &',
    '!               &',
    '! - + * * * + - &', 
    '! - + * * * + - &',
    '!               &',
    '!               &',
    '! - + * * * + - &',
    '! - + * * * + - &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
  ], 
  {
    width: 30,
    height: 22,
    '^' : [ sprite('invader'), scale(0.7), 'space-invader'],
    '*' : [ sprite('invader2'), scale(0.7), 'space-invader'],
    '-' : [ sprite('invader3'), scale(0.7), 'space-invader'],
    '+' : [ sprite('invader4'), scale(0.7), 'space-invader'],
    '!' : [ sprite('wall'), 'left-wall'],
    '&' : [ sprite('wall'), 'right-wall'],
  })
  const player = add([
    sprite('spaceship'),
    pos(width() / 2, 400),
    origin('center')
  ])
  const planet = add([
    sprite('earth'),
    pos(width() / 2, 450),
    origin('center')
  ])
  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
  })
  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
  })
  keyPress('space', () => {
  spawnBullet(player.pos.add(0, -25))
   })
  action('bullet', (b) => {
    b.move(0, -BULLET_SPEED)
    if (b.pos.y < 0) {
      destroy(b)
    }
  })
  //change
  collides('bullet', 'space-invader', (b,s) => {
    camShake(2)
    destroy(b)
    destroy(s)
    spawnRubble(s.pos.add())
    score.value++
    score.text = "Aliens Killed: " + score.value
    if (score.value>158){
      announce.text=("Get ready for the next level!")
      timer.time +=5
      wait(5, () => {
        go('level6');
      })
    }
  })
  //change
  const score = add([
    text("Aliens Killed: " + '124'),  
    pos(25, 500),
    layer('ui'),
    scale(3),
    {
      value: 124,
    }
  ])
  const announce = add([
    text("Shoot the ones\non the edges to\nslow the advance"),  
    pos(25, 2),
    layer('ui'),
    scale(2),
  ])
  const instructions = add([
    text("Arrow Keys To Move\nSpace Bar To Shoot"),  
    pos(25, 550),
    layer('ui'),
    scale(2),
  ])
  const timer = add([
    text('0'),
    pos(25,525),
    scale(2),
    layer('ui'),
    {
      time: TIME_LEFT,
    },
  ])
  timer.action(() =>  {
    timer.time -= dt()
    timer.text = 'Time left: ' + timer.time.toFixed(0)
    if (timer.time <= 0 ) {
      go('lose', { score: score.value })
    }
  })
  action('space-invader', (s) => {
    s.move(CURRENT_SPEED, 0)
  })
  collides('space-invader', 'right-wall', () => {
    CURRENT_SPEED = -INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  collides('space-invader', 'left-wall', () => {
    CURRENT_SPEED = INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  player.overlaps('space-invader', () => {
    go('lose', { score: score.value })
  })
  action('space-invader', (s) => {
    if (s.pos.y >= (400)) {
        go('lose', { score: score.value })
    }
  })
  });

//level6  
scene("level6", (args = {}) => {
  const MOVE_SPEED = 200
  const INVADER_SPEED = 120
  let CURRENT_SPEED = INVADER_SPEED
  const LEVEL_DOWN = 350
  const TIME_LEFT = 40
  const BULLET_SPEED = 400
  layer(['obj', 'ui'], 'obj')
  addLevel(
    [
    '! ^^^^^^^^^^^^^ &',
    '! -   +++++   - &',
    '! -   * * *   - &', 
    '! -   * * *   - &',
    '! -   +++++   - &',
    '! -   +++++   - &',
    '! -   * * *   - &',
    '! -           - &',
    '!               &',
    '!     * * *     &',
    '!               &',
    '!               &',
  ], 
  {
    width: 30,
    height: 22,
    '^' : [ sprite('invader'), scale(0.7), 'space-invader'],
    '*' : [ sprite('invader2'), scale(0.7), 'space-invader'],
    '-' : [ sprite('invader3'), scale(0.7), 'space-invader'],
    '+' : [ sprite('invader4'), scale(0.7), 'space-invader'],
    '!' : [ sprite('wall'), 'left-wall'],
    '&' : [ sprite('wall'), 'right-wall'],
  })
  const player = add([
    sprite('spaceship'),
    pos(width() / 2, 400),
    origin('center')
  ])
  const planet = add([
    sprite('earth'),
    pos(width() / 2, 450),
    origin('center')
  ])
  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
  })
  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
  })
  keyPress('space', () => {
  spawnBullet(player.pos.add(0, -25))
   })
  action('bullet', (b) => {
    b.move(0, -BULLET_SPEED)
    if (b.pos.y < 0) {
      destroy(b)
    }
  })
  //change
  collides('bullet', 'space-invader', (b,s) => {
    camShake(2)
    destroy(b)
    destroy(s)
    spawnRubble(s.pos.add())
    score.value++
    score.text = "Aliens Killed: " + score.value
    if (score.value>212){
      announce.text=("Get ready for the next level!")
      timer.time +=5
      wait(5, () => {
        go('level7');
      })
    }
  })
  //change
  const score = add([
    text("Aliens Killed: " + '159'),  
    pos(25, 500),
    layer('ui'),
    scale(3),
    {
      value: 159,
    }
  ])
  const announce = add([
    text("Their largest fleet\nSO FAR"),  
    pos(25, 2),
    layer('ui'),
    scale(2),
  ])
  const instructions = add([
    text("Arrow Keys To Move\nSpace Bar To Shoot"),  
    pos(25, 550),
    layer('ui'),
    scale(2),
  ])
  const timer = add([
    text('0'),
    pos(25,525),
    scale(2),
    layer('ui'),
    {
      time: TIME_LEFT,
    },
  ])
  timer.action(() =>  {
    timer.time -= dt()
    timer.text = 'Time left: ' + timer.time.toFixed(0)
    if (timer.time <= 0 ) {
      go('lose', { score: score.value })
    }
  })
  action('space-invader', (s) => {
    s.move(CURRENT_SPEED, 0)
  })
  collides('space-invader', 'right-wall', () => {
    CURRENT_SPEED = -INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  collides('space-invader', 'left-wall', () => {
    CURRENT_SPEED = INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  player.overlaps('space-invader', () => {
    go('lose', { score: score.value })
  })
  action('space-invader', (s) => {
    if (s.pos.y >= (400)) {
        go('lose', { score: score.value })
    }
  })
  });

//level7  
scene("level7", (args = {}) => {
  const MOVE_SPEED = 200
  const INVADER_SPEED = 150
  let CURRENT_SPEED = INVADER_SPEED
  const LEVEL_DOWN = 450
  const TIME_LEFT = 20
  const BULLET_SPEED = 300
  layer(['obj', 'ui'], 'obj')
  addLevel(
    [
    '!             ^ &',
    '!             - &',
    '!             * &', 
    '!             + &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
  ], 
  {
    width: 30,
    height: 22,
    '^' : [ sprite('invader'), scale(0.7), 'space-invader'],
    '*' : [ sprite('invader2'), scale(0.7), 'space-invader'],
    '-' : [ sprite('invader3'), scale(0.7), 'space-invader'],
    '+' : [ sprite('invader4'), scale(0.7), 'space-invader'],
    '!' : [ sprite('wall'), 'left-wall'],
    '&' : [ sprite('wall'), 'right-wall'],
  })
  const player = add([
    sprite('spaceship'),
    pos(width() / 2, 400),
    origin('center')
  ])
  const planet = add([
    sprite('earth'),
    pos(width() / 2, 450),
    origin('center')
  ])
  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
  })
  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
  })
  keyPress('space', () => {
  spawnBullet(player.pos.add(0, -25))
   })
  action('bullet', (b) => {
    b.move(0, -BULLET_SPEED)
    if (b.pos.y < 0) {
      destroy(b)
    }
  })
  //change
  collides('bullet', 'space-invader', (b,s) => {
    camShake(2)
    destroy(b)
    destroy(s)
    spawnRubble(s.pos.add())
    score.value++
    score.text = "Aliens Killed: " + score.value
    if (score.value>216){
      announce.text=("Get ready for the next level!")
      timer.time +=5
      wait(5, () => {
        go('level8');
      })
    }
  })
  //change
  const score = add([
    text("Aliens Killed: " + '213'),  
    pos(25, 500),
    layer('ui'),
    scale(3),
    {
      value: 213,
    }
  ])
  const announce = add([
    text("When you kill 500\nthe planet is safe."),  
    pos(25, 2),
    layer('ui'),
    scale(2),
  ])
  const instructions = add([
    text("Arrow Keys To Move\nSpace Bar To Shoot"),  
    pos(25, 550),
    layer('ui'),
    scale(2),
  ])
  const timer = add([
    text('0'),
    pos(25,525),
    scale(2),
    layer('ui'),
    {
      time: TIME_LEFT,
    },
  ])
  timer.action(() =>  {
    timer.time -= dt()
    timer.text = 'Time left: ' + timer.time.toFixed(0)
    if (timer.time <= 0 ) {
      go('lose', { score: score.value })
    }
  })
  action('space-invader', (s) => {
    s.move(CURRENT_SPEED, 0)
  })
  collides('space-invader', 'right-wall', () => {
    CURRENT_SPEED = -INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  collides('space-invader', 'left-wall', () => {
    CURRENT_SPEED = INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  player.overlaps('space-invader', () => {
    go('lose', { score: score.value })
  })
  action('space-invader', (s) => {
    if (s.pos.y >= (400)) {
        go('lose', { score: score.value })
    }
  })
  });

//level8  
scene("level8", (args = {}) => {
  const MOVE_SPEED = 200
  const INVADER_SPEED = 120
  let CURRENT_SPEED = INVADER_SPEED
  const LEVEL_DOWN = 300
  const TIME_LEFT = 40
  const BULLET_SPEED = 400
  layer(['obj', 'ui'], 'obj')
  addLevel(
    [
    '! ^^^^^^^^^^^^^ &',
    '! -+++++++++++- &',
    '! -***********- &', 
    '! -***********- &',
    '! -***********- &',
    '! -   +++++   - &',
    '! -   * * *   - &',
    '!               &',
    '! -   * * *   - &',
    '!               &',
    '!               &',
    '!               &',
  ], 
  {
    width: 30,
    height: 22,
    '^' : [ sprite('invader'), scale(0.7), 'space-invader'],
    '*' : [ sprite('invader2'), scale(0.7), 'space-invader'],
    '-' : [ sprite('invader3'), scale(0.7), 'space-invader'],
    '+' : [ sprite('invader4'), scale(0.7), 'space-invader'],
    '!' : [ sprite('wall'), 'left-wall'],
    '&' : [ sprite('wall'), 'right-wall'],
  })
  const player = add([
    sprite('spaceship'),
    pos(width() / 2, 400),
    origin('center')
  ])
  const planet = add([
    sprite('earth'),
    pos(width() / 2, 450),
    origin('center')
  ])
  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
  })
  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
  })
  keyPress('space', () => {
  spawnBullet(player.pos.add(0, -25))
   })
  action('bullet', (b) => {
    b.move(0, -BULLET_SPEED)
    if (b.pos.y < 0) {
      destroy(b)
    }
  })
  //change
  collides('bullet', 'space-invader', (b,s) => {
    camShake(2)
    destroy(b)
    destroy(s)
    spawnRubble(s.pos.add())
    score.value++
    score.text = "Aliens Killed: " + score.value
    if (score.value>298){
      announce.text=("Get ready for the next level!")
      timer.time +=5
      wait(5, () => {
        go('level9');
      })
    }
  })
  //change
  const score = add([
    text("Aliens Killed: " + '217'),  
    pos(25, 500),
    layer('ui'),
    scale(3),
    {
      value: 217,
    }
  ])
  const announce = add([
    text("A larger fleet!"),  
    pos(25, 2),
    layer('ui'),
    scale(2),
  ])
  const instructions = add([
    text("Arrow Keys To Move\nSpace Bar To Shoot"),  
    pos(25, 550),
    layer('ui'),
    scale(2),
  ])
  const timer = add([
    text('0'),
    pos(25,525),
    scale(2),
    layer('ui'),
    {
      time: TIME_LEFT,
    },
  ])
  timer.action(() =>  {
    timer.time -= dt()
    timer.text = 'Time left: ' + timer.time.toFixed(0)
    if (timer.time <= 0 ) {
      go('lose', { score: score.value })
    }
  })
  action('space-invader', (s) => {
    s.move(CURRENT_SPEED, 0)
  })
  collides('space-invader', 'right-wall', () => {
    CURRENT_SPEED = -INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  collides('space-invader', 'left-wall', () => {
    CURRENT_SPEED = INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  player.overlaps('space-invader', () => {
    go('lose', { score: score.value })
  })
  action('space-invader', (s) => {
    if (s.pos.y >= (400)) {
        go('lose', { score: score.value })
    }
  })
  });

//level9  
scene("level9", (args = {}) => {
  const MOVE_SPEED = 200
  const INVADER_SPEED = 120
  let CURRENT_SPEED = INVADER_SPEED
  const LEVEL_DOWN = 300
  const TIME_LEFT = 40
  const BULLET_SPEED = 400
  layer(['obj', 'ui'], 'obj')
  addLevel(
    [
    '! ^^^^^^^^^^^^^ &',
    '! -+++++++++++- &',
    '! -***********- &', 
    '! -***********- &',
    '! -***********- &',
    '! ^^^^^^^^^^^^^ &',
    '! ^^^^^^^^^^^^^ &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
  ], 
  {
    width: 30,
    height: 22,
    '^' : [ sprite('invader'), scale(0.7), 'space-invader'],
    '*' : [ sprite('invader2'), scale(0.7), 'space-invader'],
    '-' : [ sprite('invader3'), scale(0.7), 'space-invader'],
    '+' : [ sprite('invader4'), scale(0.7), 'space-invader'],
    '!' : [ sprite('wall'), 'left-wall'],
    '&' : [ sprite('wall'), 'right-wall'],
  })
  const player = add([
    sprite('spaceship'),
    pos(width() / 2, 400),
    origin('center')
  ])
  const planet = add([
    sprite('earth'),
    pos(width() / 2, 450),
    origin('center')
  ])
  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
  })
  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
  })
  keyPress('space', () => {
  spawnBullet(player.pos.add(0, -25))
   })
  action('bullet', (b) => {
    b.move(0, -BULLET_SPEED)
    if (b.pos.y < 0) {
      destroy(b)
    }
  })
  //change
  collides('bullet', 'space-invader', (b,s) => {
    camShake(2)
    destroy(b)
    destroy(s)
    spawnRubble(s.pos.add())
    score.value++
    score.text = "Aliens Killed: " + score.value
    if (score.value>389){
      announce.text=("When 500 alien ships\nhave been destroyed you win!")
      timer.time +=5
      wait(5, () => {
        go('level10');
      })
    }
  })
  //change
  const score = add([
    text("Aliens Killed: " + '299'),  
    pos(25, 500),
    layer('ui'),
    scale(3),
    {
      value: 299,
    }
  ])
  const announce = add([
    text("A larger fleet!"),  
    pos(25, 2),
    layer('ui'),
    scale(2),
  ])
  const instructions = add([
    text("Arrow Keys To Move\nSpace Bar To Shoot"),  
    pos(25, 550),
    layer('ui'),
    scale(2),
  ])
  const timer = add([
    text('0'),
    pos(25,525),
    scale(2),
    layer('ui'),
    {
      time: TIME_LEFT,
    },
  ])
  timer.action(() =>  {
    timer.time -= dt()
    timer.text = 'Time left: ' + timer.time.toFixed(0)
    if (timer.time <= 0 ) {
      go('lose', { score: score.value })
    }
  })
  action('space-invader', (s) => {
    s.move(CURRENT_SPEED, 0)
  })
  collides('space-invader', 'right-wall', () => {
    CURRENT_SPEED = -INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  collides('space-invader', 'left-wall', () => {
    CURRENT_SPEED = INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  player.overlaps('space-invader', () => {
    go('lose', { score: score.value })
  })
  action('space-invader', (s) => {
    if (s.pos.y >= (400)) {
        go('lose', { score: score.value })
    }
  })
  });

  //level10
  scene("level10", (args = {}) => {
    const MOVE_SPEED = 200
    const INVADER_SPEED = 160
    let CURRENT_SPEED = INVADER_SPEED
    const LEVEL_DOWN = 500
    const TIME_LEFT = 20
    const BULLET_SPEED = 350
    layer(['obj', 'ui'], 'obj')
    addLevel(
      [
      '!             ^ &',
      '!      -        &',
      '!        *      &', 
      '!  +            &',
      '!            -  &',
      '!               &',
      '!               &',
      '!               &',
      '!               &',
      '!               &',
      '!               &',
      '!               &',
    ], 
    {
      width: 30,
      height: 22,
      '^' : [ sprite('invader'), scale(0.7), 'space-invader'],
      '*' : [ sprite('invader2'), scale(0.7), 'space-invader'],
      '-' : [ sprite('invader3'), scale(0.7), 'space-invader'],
      '+' : [ sprite('invader4'), scale(0.7), 'space-invader'],
      '!' : [ sprite('wall'), 'left-wall'],
      '&' : [ sprite('wall'), 'right-wall'],
    })
    const player = add([
      sprite('spaceship'),
      pos(width() / 2, 400),
      origin('center')
    ])
    const planet = add([
      sprite('earth'),
      pos(width() / 2, 450),
      origin('center')
    ])
    keyDown('left', () => {
      player.move(-MOVE_SPEED, 0)
    })
    keyDown('right', () => {
      player.move(MOVE_SPEED, 0)
    })
    keyPress('space', () => {
    spawnBullet(player.pos.add(0, -25))
     })
    action('bullet', (b) => {
      b.move(0, -BULLET_SPEED)
      if (b.pos.y < 0) {
        destroy(b)
      }
    })
    //change
    collides('bullet', 'space-invader', (b,s) => {
      camShake(2)
      destroy(b)
      destroy(s)
      spawnRubble(s.pos.add())
      score.value++
      score.text = "Aliens Killed: " + score.value
      if (score.value>394){
        announce.text=("Get ready for the next level!")
        timer.time +=5
        wait(5, () => {
          go('level11');
        })
      }
    })
    //change
    const score = add([
      text("Aliens Killed: " + '390'),  
      pos(25, 500),
      layer('ui'),
      scale(3),
      {
        value: 390,
      }
    ])
    const announce = add([
      text("When you kill 500\nthe planet is safe."),  
      pos(25, 2),
      layer('ui'),
      scale(2),
    ])
    const instructions = add([
      text("Arrow Keys To Move\nSpace Bar To Shoot"),  
      pos(25, 550),
      layer('ui'),
      scale(2),
    ])
    const timer = add([
      text('0'),
      pos(25,525),
      scale(2),
      layer('ui'),
      {
        time: TIME_LEFT,
      },
    ])
    timer.action(() =>  {
      timer.time -= dt()
      timer.text = 'Time left: ' + timer.time.toFixed(0)
      if (timer.time <= 0 ) {
        go('lose', { score: score.value })
      }
    })
    action('space-invader', (s) => {
      s.move(CURRENT_SPEED, 0)
    })
    collides('space-invader', 'right-wall', () => {
      CURRENT_SPEED = -INVADER_SPEED
      every('space-invader', (s) => {
        s.move(0, LEVEL_DOWN)
      })
    })
    collides('space-invader', 'left-wall', () => {
      CURRENT_SPEED = INVADER_SPEED
      every('space-invader', (s) => {
        s.move(0, LEVEL_DOWN)
      })
    })
    player.overlaps('space-invader', () => {
      go('lose', { score: score.value })
    })
    action('space-invader', (s) => {
      if (s.pos.y >= (400)) {
          go('lose', { score: score.value })
      }
    })
    });

//level11  
scene("level11", (args = {}) => {
  const MOVE_SPEED = 200
  const INVADER_SPEED = 130
  let CURRENT_SPEED = INVADER_SPEED
  const LEVEL_DOWN = 350
  const TIME_LEFT = 40
  const BULLET_SPEED = 400
  layer(['obj', 'ui'], 'obj')
  addLevel(
    [
    '!++++++++++++   &',
    '!^^^^^^^^^^^^   &',
    '!^^^^^^^^^^^^   &', 
    '!************   &',
    '!************   &',
    '!               &',
    '!               &',
    '!^^^^^^^^^^^^   &',
    '!^^^^^^^^^^^^   &',
    '!               &',
    '!               &',
    '!               &',
  ], 
  {
    width: 30,
    height: 22,
    '^' : [ sprite('invader'), scale(0.7), 'space-invader'],
    '*' : [ sprite('invader2'), scale(0.7), 'space-invader'],
    '-' : [ sprite('invader3'), scale(0.7), 'space-invader'],
    '+' : [ sprite('invader4'), scale(0.7), 'space-invader'],
    '!' : [ sprite('wall'), 'left-wall'],
    '&' : [ sprite('wall'), 'right-wall'],
  })
  const player = add([
    sprite('spaceship'),
    pos(width() / 2, 400),
    origin('center')
  ])
  const planet = add([
    sprite('earth'),
    pos(width() / 2, 450),
    origin('center')
  ])
  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
  })
  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
  })
  keyPress('space', () => {
  spawnBullet(player.pos.add(0, -25))
   })
  action('bullet', (b) => {
    b.move(0, -BULLET_SPEED)
    if (b.pos.y < 0) {
      destroy(b)
    }
  })
  //change
  collides('bullet', 'space-invader', (b,s) => {
    camShake(2)
    destroy(b)
    destroy(s)
    spawnRubble(s.pos.add())
    score.value++
    score.text = "Aliens Killed: " + score.value
    if (score.value>478){
      announce.text=("When 500 alien ships\nhave been destroyed you win!")
      timer.time +=5
      wait(5, () => {
        go('level12');
      })
    }
  })
  //change
  const score = add([
    text("Aliens Killed: " + '395'),  
    pos(25, 500),
    layer('ui'),
    scale(3),
    {
      value: 395,
    }
  ])
  const announce = add([
    text("LEVEL 11"),  
    pos(25, 2),
    layer('ui'),
    scale(2),
  ])
  const instructions = add([
    text("Arrow Keys To Move\nSpace Bar To Shoot"),  
    pos(25, 550),
    layer('ui'),
    scale(2),
  ])
  const timer = add([
    text('0'),
    pos(25,525),
    scale(2),
    layer('ui'),
    {
      time: TIME_LEFT,
    },
  ])
  timer.action(() =>  {
    timer.time -= dt()
    timer.text = 'Time left: ' + timer.time.toFixed(0)
    if (timer.time <= 0 ) {
      go('lose', { score: score.value })
    }
  })
  action('space-invader', (s) => {
    s.move(CURRENT_SPEED, 0)
  })
  collides('space-invader', 'right-wall', () => {
    CURRENT_SPEED = -INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  collides('space-invader', 'left-wall', () => {
    CURRENT_SPEED = INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  player.overlaps('space-invader', () => {
    go('lose', { score: score.value })
  })
  action('space-invader', (s) => {
    if (s.pos.y >= (400)) {
        go('lose', { score: score.value })
    }
  })
  });

//level12  
scene("level12", (args = {}) => {
  const MOVE_SPEED = 200
  const INVADER_SPEED = 135
  let CURRENT_SPEED = INVADER_SPEED
  const LEVEL_DOWN = 350
  const TIME_LEFT = 40
  const BULLET_SPEED = 400
  layer(['obj', 'ui'], 'obj')
  addLevel(
    [
    '!   +++++++     &',
    '!  ^  ^  ^  ^   &',
    '!    *  *  *    &', 
    '!               &',
    '!               &',
    '!               &',
    '!               &',
    '!   --  ---     &',
    '!      +     +  &',
    '!               &',
    '!               &',
    '!               &',
  ], 
  {
    width: 30,
    height: 22,
    '^' : [ sprite('invader'), scale(0.7), 'space-invader'],
    '*' : [ sprite('invader2'), scale(0.7), 'space-invader'],
    '-' : [ sprite('invader3'), scale(0.7), 'space-invader'],
    '+' : [ sprite('invader4'), scale(0.7), 'space-invader'],
    '!' : [ sprite('wall'), 'left-wall'],
    '&' : [ sprite('wall'), 'right-wall'],
  })
  const player = add([
    sprite('spaceship'),
    pos(width() / 2, 400),
    origin('center')
  ])
  const planet = add([
    sprite('earth'),
    pos(width() / 2, 450),
    origin('center')
  ])
  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
  })
  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
  })
  keyPress('space', () => {
  spawnBullet(player.pos.add(0, -25))
   })
  action('bullet', (b) => {
    b.move(0, -BULLET_SPEED)
    if (b.pos.y < 0) {
      destroy(b)
    }
  })
  //change
  collides('bullet', 'space-invader', (b,s) => {
    camShake(2)
    destroy(b)
    destroy(s)
    spawnRubble(s.pos.add())
    score.value++
    score.text = "Aliens Killed: " + score.value
    if (score.value>499){
      announce.text=("You Have Done It!")
      timer.time +=5
      wait(5, () => {
        go('win');
      })
    }
  })
  //change
  const score = add([
    text("Aliens Killed: " + '479'),  
    pos(25, 500),
    layer('ui'),
    scale(3),
    {
      value: 479,
    }
  ])
  const announce = add([
    text("LEVEL 12"),  
    pos(25, 2),
    layer('ui'),
    scale(2),
  ])
  const instructions = add([
    text("Arrow Keys To Move\nSpace Bar To Shoot"),  
    pos(25, 550),
    layer('ui'),
    scale(2),
  ])
  const timer = add([
    text('0'),
    pos(25,525),
    scale(2),
    layer('ui'),
    {
      time: TIME_LEFT,
    },
  ])
  timer.action(() =>  {
    timer.time -= dt()
    timer.text = 'Time left: ' + timer.time.toFixed(0)
    if (timer.time <= 0 ) {
      go('lose', { score: score.value })
    }
  })
  action('space-invader', (s) => {
    s.move(CURRENT_SPEED, 0)
  })
  collides('space-invader', 'right-wall', () => {
    CURRENT_SPEED = -INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  collides('space-invader', 'left-wall', () => {
    CURRENT_SPEED = INVADER_SPEED
    every('space-invader', (s) => {
      s.move(0, LEVEL_DOWN)
    })
  })
  player.overlaps('space-invader', () => {
    go('lose', { score: score.value })
  })
  action('space-invader', (s) => {
    if (s.pos.y >= (400)) {
        go('lose', { score: score.value })
    }
  })
  });
//Lose Scene
scene('lose', ({score}) => {
  layers(['bg', 'obj', 'ui'], 'obj')
  add([
    text('Game Over\nAliens Killed: ' + score + '\nThe aliens have\ntaken the planet.'),
    scale(4),
    origin('center'),
    pos(width() / 2, 75),
    color(255, 255, 255)])
  add([
    rect(160, 40),origin('center'),
    pos(width()/2, 180),
    "button",
    {
      clickAction: () => go('menu'),
    },
  ]);
  add([
    text("Play Again"),origin('center'),
    pos(width()/2, 180),
    scale(2),
    color(0, 255, 0)
  ]);
  action("button", b => {

    if (b.isHovered()) {
      b.use(color(0.7, 0.7, 0.7));
    } else {
      b.use(color(255, 0, 0));
    }
    if (b.isClicked()) {
      b.clickAction();
    }
  });
});

//Win Scene
scene('win', () => {
  layers(['bg', 'obj', 'ui'], 'obj')
  add([
    text('YOU HAVE WON!\n500 Alien Ships\n Destroyed!\nThe Planet is safe!'),
    scale(4),
    origin('center'),
    pos(width() / 2, 75),
    color(255, 255, 255)])
  add([
    rect(160, 40),origin('center'),
    pos(width()/2, 195),
    "button",
    {
      clickAction: () => go('menu'),
    },
  ]);
  add([
    text("Play Again"),origin('center'),
    pos(width()/2, 195),
    scale(2),
    color(0, 255, 0)
  ]);
  action("button", b => {

    if (b.isHovered()) {
      b.use(color(0.7, 0.7, 0.7));
    } else {
      b.use(color(255, 0, 0));
    }
    if (b.isClicked()) {
      b.clickAction();
    }
  });
});

//Menu
scene("menu", () => {
  add([
    text("Protect The Planet\nBy Mr. Groeneveld\nPope HS\nComputer Science"), origin('center'),
    pos(width()/2, 60),
    scale(3),
  ]);
  add([
    rect(160, 40),origin('center'),
    pos(width()/2, 180),
    "button",
    {
      clickAction: () => go("level1"),
    },
  ]);
  add([
    text("Play game"),origin('center'),
    pos(width()/2, 180),
    scale(2),
    color(0, 255, 0)
  ]);
  add([
    rect(255, 40),origin('center'),
    pos(width()/2, 240),
    "button",
    {
      clickAction: () => window.open('https://kaboomjs.com/', '_blank'),
    },
  ]);
  add([
    text("Learn Kaboom.js"),origin('center'),
    pos(width()/2, 240),
    scale(2),
    color(0, 0, 255)
  ]);
  
  action("button", b => {

    if (b.isHovered()) {
      b.use(color(0.7, 0.7, 0.7));
    } else {
      b.use(color(255, 0, 0));
    }
    if (b.isClicked()) {
      b.clickAction();
    }
  });
});

start("menu");