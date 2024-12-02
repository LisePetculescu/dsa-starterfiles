"use strict";

window.addEventListener("load", start);

// ****** CONTROLLER ******
// #region controller

function start() {
  console.log(`Javascript kører`);

  // start ticking
  tick();
  document.addEventListener("keydown", keyPressed);
}

const player = { row: 3, col: 0 };
let queue = [
  { row: 2, col: 5 },
  { row: 2, col: 6 },
  { row: 3, col: 6 }
];


function tick() {
  // setup next tick
  setTimeout(tick, 300);

  // TODO: Do stuff

  // // ++ er til højre
  // writeToCell(player.row, player.col++, 0);

  // -- er til venstre
  // writeToCell(player.row, player.col--, 0);

  let head = {
    row: queue[queue.length - 1].row,
    col: queue[queue.length - 1].col
  };

  for (const part of queue) {
    writeToCell(part.row, part.col, 0);
  }

  

  // const newHead = {
  //   row: queue[queue.length - 1].row,
  //   col: queue[queue.length - 1].col
  // };

  switch (direction) {
    case "ArrowLeft":
    case "a":
      moveLeft(head);
      break;
    case "ArrowRight":
    case "d":
      moveRight(head);
      break;
    case "ArrowUp":
    case "w":
      moveUp(head);
      break;
    case "ArrowDown":
    case "s":
      moveDown(head);
      break;
  }



  if (queue.length >2 ) {
    queue.push(head);
    queue.shift();
  } else if (queue.length) {

  }

  // writeToCell(player.row, player.col, 1);
  for (const part of queue) {
    writeToCell(part.row, part.col, 1);
  }

  // console.log(queue);
  
  // display the model in full
  displayBoard();
}

// #endregion controller

// ****** MODEL ******
// #region model
const model = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

let direction = "ArrowRight";

function moveRight(head) {
  // ++ er til højre
  writeToCell(head.row, head.col++, 0);

  if (head.col > 9) {
    head.col = 0;
  }
}

function moveLeft(head) {
  //-- er til venstre
  writeToCell(head.row, head.col--, 0);

  if (head.col < 0) {
    head.col = 9;
  }
}

function moveUp(head) {
  writeToCell(head.row--, head.col, 0);

  if (head.row < 0) {
    head.row = 9;
  }
}

function moveDown(head) {
  writeToCell(head.row++, head.col, 0);

  if (head.row > 9) {
    head.row = 0;
  }
}

// #endregion model

// ****** VIEW ******
// #region view

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const index = row * 10 + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}

function keyPressed(keyPress) {
  // direction = key.value;
  console.log(keyPress.key);
  direction = keyPress.key;
}

// #endregion view
