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
  choice_o.style.fontSize = '3 rem';

  first_move.append(choice_x, choice_o);
}

starting_page()

// Getting the player's choice for first move

let current_move = '';
const choices = Array.from(document.querySelectorAll(".choice"));
  choices.forEach(choice => {
    choice.addEventListener('click', () => {
      current_move = choice.innerText;
      document.querySelector(".starting-page").remove();
  });
});

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
    positions.forEach(position => {
      tie_checker.push(position.innerText);
    })
    if (tie_checker.includes('')) {
      if (a != '' || b != '' || c != '') {
        if (a === b && b === c) {
          player_wins(a);    
        }
      }
    }
    if (!tie_checker.includes('')) {
      // For tie
      player_tie()
    }
    }
  )
}

player_tie = () => {
  container.innerHTML = '';
  let winning_message = document.createElement('div');
  container.appendChild(winning_message)
  winning_message.style.minHeight = '100vh';
  winning_message.style.minWidth = '100vh';
  winning_message.style.backgroundColor = 'black';
  winning_message.style.textAlign = 'center';
  winning_message.style.fontSize = 'xx-large';
  winning_message.style.color = 'white';
  winning_message.innerText = 'Tie! Click Reset to Play Again';

}

const player_wins = function(winner ='Tie') {
  container.innerHTML = '';
  let winning_message = document.createElement('div');
  container.appendChild(winning_message)
  winning_message.style.minHeight = '100vh';
  winning_message.style.minWidth = '100vh';
  winning_message.style.backgroundColor = 'gray';
  winning_message.style.textAlign = 'center';
  winning_message.style.fontSize = 'xx-large';
  winning_message.style.color = 'white';
  winning_message.innerText = `Congratulations Player ${winner}, you won as ${winner}`
}


// Making reset and updating the screen function
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
  return {reset_board, update_board,};
  }
)();

positions.forEach(position => {
    position.addEventListener('click', () => {
      if(position.innerText === '') {
        game_board.update_board(position);
        if (position.innerText == 'X') {
          logic();
        };
        if (position.innerText == 'O') {
          logic();
        };
      };
    });
  });