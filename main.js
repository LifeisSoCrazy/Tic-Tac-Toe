// displayController(); the function used to display the function onto the tic-tac-toe board
// gameBoard(): the function used to implement the correct logic

const player = document.getElementsByClassName("player");
const positions = Array.from(document.getElementsByClassName("position"));
const reset = document.getElementsByClassName("reset")
const choices = Array.from(document.querySelectorAll(".choice"));


positions.forEach(position => {
  position.addEventListener('click', () => {
    if(position.innerText == '') {
      game_board.update_board(position);
      console.log(position.innerText)
    };
  })});


let first_move = '';

let current_move = '';

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    current_move = choice.innerText;
    choice.disabled = true;
    console.log(choice);
  });
})

const game_board = (() => {
  const reset_board = () => {
    positions.forEach(position => {
      position.innerText = '';
    });
  };

  

  const update_board = 
    // return letter based on players turn
    (e) => {
    switch(current_move) {
      case 'x':
        e.innerText = 'x';
        current_move = 'o';
        break;
      case 'o':
        e.innerText = 'o';
        current_move = 'x';
        break;
    };
  };
  
  const player_turn = (e) => {
    // Return players turn
    let x_o = e
    if (x_o == 'x') { return x_o = 'o' }
    if (x_o == 'o') { return x_o = 'x' }
  }
  
  return {reset_board, update_board, player_turn};
})();


