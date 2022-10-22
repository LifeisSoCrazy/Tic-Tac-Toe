// Make starting HTML page that asks for names and choice (x or y)
const container = document.querySelector('#container');



const player = document.getElementsByClassName("player");
const positions = Array.from(document.querySelectorAll(".position"));


const starting_page = () => {
  if(document.querySelector('.reset')) {
    document.querySelector('.reset').remove()
  }
  const starting_page = document.createElement('div');
  starting_page.classList.add('starting-page');
  starting_page.style.position = 'fixed';
  starting_page.style.top = '0%';
  starting_page.style.left = '0';
  starting_page.style.right = '0';
  starting_page.style.bottom = '0';
  starting_page.style.backgroundColor = 'rgba(0, 0, 0, 1)';
  starting_page.style.justifyContent = 'center';
  starting_page.style.alignContent = 'center';
  starting_page.style.color = 'white';
  starting_page.style.textAlign = 'center'
  starting_page.style.fontSize = '70px'
  starting_page.innerText = "Choose your move X or O: "
  document.body.appendChild(starting_page)

  const first_move = document.createElement('div');
  first_move.classList.add('first-move');
  starting_page.appendChild(first_move);
  
  const choice_x = document.createElement('button');
  choice_x.classList.add('choice');
  choice_x.innerText = 'X';

  const choice_o = document.createElement('button');
  choice_o.classList.add('choice');
  choice_o.innerText = 'O';


  first_move.append(choice_x, choice_o);
}

starting_page()

// Getting the player's choice for first move

const first_choice = () => {
  choices = Array.from(document.querySelectorAll(".choice"));
  choices.forEach(choice => {
  choice.addEventListener('click', () => {
    current_move = choice.innerText;
    document.querySelector(".starting-page").remove();
  });
});
}
first_choice()

// Code for the logic

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



const logic = () => {
  winning_combinations.forEach(combination => {
    let a = document.querySelector(`#${combination[0]}`).innerText;
    let b = document.querySelector(`#${combination[1]}`).innerText;
    let c = document.querySelector(`#${combination[2]}`).innerText;
    let tie_checker = []
    positions.forEach(position => tie_checker.push(position.innerText))
    if (tie_checker.includes('')) {
      if (a != '' || b != '' || c != '') {
        if (a === b && b === c) {
          player_wins(a);    
        }
      }
    }
    if (!tie_checker.includes('')) {
      // For tie
      player_tie();
    };
  });
};

// Make a reset button for win or tie
const reset_board = function(message) {
  let reset_class = document.createElement('div');
  reset_class.classList.add('reset');

  reset_class.innerText = "Choose your move X or O: "
  
  container.appendChild(reset_class);

  let reset_button = document.createElement('button');
  reset_button.classList.add('reset');
  document.querySelector(`.${message}`).appendChild(reset_button)
  reset_button.innerText = 'Reset';
  reset_button.onclick = function() {
    document.querySelector(`.${message}`).remove();
    starting_page();
    first_choice();
  };
};

player_tie = () => {
  positions.forEach(position => position.innerText = '');
  let tie = document.createElement('div');
  tie.classList.add('tie');
  container.appendChild(tie);
  tie.style.position = 'fixed';
  tie.style.top = '0';
  tie.style.left = '0';
  tie.style.right = '0';
  tie.style.bottom = '0';

  tie.style.minHeight = '100vh';
  tie.style.minWidth = '100vh';
  tie.style.backgroundColor = 'black';
  tie.style.textAlign = 'center';
  tie.style.fontSize = 'xx-large';
  tie.style.color = 'white';
  tie.innerText = 'Tie Click Reset to Play Again';
  reset_board('tie');
}

const player_wins = function(winner) {
  positions.forEach(position => position.innerText = '');
  let winning_message = document.createElement('div');
  winning_message.classList.add('winning-message')
  container.appendChild(winning_message)
  winning_message.style.position = 'fixed';
  winning_message.style.top = '0';
  winning_message.style.left = '0';
  winning_message.style.right = '0';
  winning_message.style.bottom = '0'
  
  winning_message.style.minHeight = '100vh';
  winning_message.style.minWidth = '100vh';
  winning_message.style.backgroundColor = 'black';
  winning_message.style.textAlign = 'center';
  winning_message.style.fontSize = '50px';
  winning_message.style.fontFamily = 'cursive'
  winning_message.style.color = 'white';
  winning_message.innerText = `Congratulations Player ${winner}, you won!`;
  reset_board('winning-message');
}

let current_move = '';

const game_board = (() => {
  const update_board = 
  // return letter based on players turn
  (e) => {
    switch(current_move) {
      case 'X':
        e.innerText = 'X';
        current_move = 'O';
        break;
        case 'O':
          e.innerText = 'O';
          current_move = 'X';
          break;
        };
      };
      return { update_board };
    }
    )();
    
    positions.forEach(position => {
      position.addEventListener('click', () => {
        if(position.innerText === '') {
          game_board.update_board(position);
          if (position.innerText === 'X') {
            logic();
          };
          if (position.innerText === 'O') {
            logic();
          }
        }
    })
  })