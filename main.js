// Make starting HTML page that asks for names and choice (x or y)
const container = document.getElementById('container');



const player = document.getElementsByClassName("player");
const positions = Array.from(document.querySelectorAll(".position"));
const reset = document.getElementsByClassName("reset")


const starting_page = () => {
  const starting_page = document.createElement('div');
  starting_page.classList.add('starting-page');
  starting_page.style.position = 'fixed';
  starting_page.style.top = '0%';
  starting_page.style.left = '0';
  starting_page.style.right = '0';
  starting_page.style.bottom = '0';
  starting_page.style.backgroundColor = 'rgba(0, 0, 0, .9)';
  starting_page.style.justifyContent = 'center';
  starting_page.style.alignContent = 'center';
  starting_page.style.color = 'white';
  starting_page.style.textAlign = 'center'
  starting_page.style.fontSize = 'xx-large'
  starting_page.innerText = "Choose your move X or O: "
  document.body.appendChild(starting_page)

  const first_move = document.createElement('div');
  first_move.classList.add('first-move');
  starting_page.appendChild(first_move);
  
  const choice_x = document.createElement('button');
  choice_x.classList.add('choice');
  choice_x.innerText = 'X';
  choice_x.style.alignItems = 'center';
  choice_x.style.fontSize = '3 rem'

  const choice_o = document.createElement('button');
  choice_o.classList.add('choice');
  choice_o.innerText = 'O';
  choice_o.style.alignItems = 'center';
  choice_o.style.fontSize = '3 rem'


  first_move.append(choice_x, choice_o)

}

starting_page()

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
        player_wins(player_choice)
      }
    })
  }
}

const player_wins = function(winner) {
  container.innerHTML = '';
  let winning_message = document.createElement('div');
  container.appendChild(winning_message)
  winning_message.style.minHeight = '100vh';
  winning_message.style.minWidth = '100vh';
  winning_message.style.backgroundColor = 'black';
  winning_message.style.textAlign = 'center';
  winning_message.style.fontSize = 'xx-large';
  winning_message.style.color = 'white';



  winning_message.innerText = `Congratulations Player ${winner}, you won as X!`
}

positions.forEach(position => {
  position.addEventListener('click', () => {
    if(position.innerText == '') {
      game_board.update_board(position);
      if (position.innerText == 'x') {
        x.push(position.id);
        x.sort();
        logic(x);
      };
      if (position.innerText == 'o') {
        o.push(position.id);
        o.sort()
        logic(o);
      };
    };
  });
});
    

let current_move = '';

const choices = Array.from(document.querySelectorAll(".choice"));
choices.forEach(choice => {
  choice.addEventListener('click', () => {
  current_move = choice.innerText;
  console.log(current_move)
  document.querySelector(".starting-page").innerHTML = '';
})})
