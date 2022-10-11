// displayController(); the function used to display the function onto the tic-tac-toe board
// gameBoard(): the function used to implement the correct logic
const player = document.getElementsByClassName("player");
const positions = Array.from(document.getElementsByClassName("position"));
const reset = document.getElementsByClassName("reset")

positions.forEach(position => {
  position.addEventListener('click', () =>
    game_board.update_board(position));
})

const game_board = (() => {
  const reset_board = () => {
    positions.forEach(position => {
      position.innerText = '';
    });
  };
  
  const update_board = 
      // return letter based on players turn
      (e) => {e.innerText = 'x'}
  const player_turn = function() {
    // Return players turn
  }
    return {reset_board, update_board};
})();



player_controller = () => {
  const player_turn = function() {
    let player_1 = document.getElementById("player-1");
    let player_2 = document.getElementById("player-2");
  }

  
}

