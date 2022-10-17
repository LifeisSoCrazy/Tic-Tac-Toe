// Make starting HTML page that asks for names and choice (x or y)
const container = document.getElementById('container');

const starting_page = document.createElement('div');
starting_page.classList.add('starting-page');
starting_page.innerText = 'dddds';
starting_page.style.minHeight = '100%';
starting_page.style.backgroundColor = 'black';
starting_page.style.minHeight = '100vh';
starting_page.style.minWidth = '100vh';
container.appendChild(starting_page);

const winning_page = document.createElement('div');
winning_page.classList.add('winning-page');
winning_page.style.backgroundColor = 'black';
winning_page.style.minHeight = '100vh';
winning_page.style.minWidth = '100vh';
container.appendChild(winning_page);

const player = document.getElementsByClassName("player");
const positions = Array.from(document.getElementsByClassName("position"));
const reset = document.getElementsByClassName("reset")
const choices = Array.from(document.querySelectorAll(".choice"));

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
    
  return {reset_board, update_board,};
})();




const winning_combinations = 
[
  ['A1', 'A2', 'A3'],
  ['B1', 'B2', 'B3'],
  ['C1', 'C2', 'C3'],

  ['A1', 'B1', 'C1'],
  ['A2', 'B2', 'C2'],
  ['A3', 'B3', 'C3'],

  ['A1', 'B2', 'C3'],
  ['A3', 'B2', 'C1'],
];

let x = [];
let o = [];


const logic = (player_choice) => {
  for (let i=0; i < winning_combinations.length; i++) {
    winning_combinations.forEach(combination => {
      if (JSON.stringify(combination) === JSON.stringify(player_choice)) {
        console.log(`${str(player_choice)} wins`)
      }
    })
  }
}

positions.forEach(position => {
  position.addEventListener('click', () => {
    if(position.innerText == '') {
      game_board.update_board(position);
      if (position.innerText == 'x') {
        x.push(position.id);
        x.sort();
        logic(x);
      }
      if (position.innerText == 'o') {
        o.push(position.id);
        o.sort()
        logic(x);

      };
    }})});
  


let current_move = '';

choices.forEach(choice => {
  choice.addEventListener('click', () => {
    current_move = choice.innerText;
    choice.disabled = true;
  });
})