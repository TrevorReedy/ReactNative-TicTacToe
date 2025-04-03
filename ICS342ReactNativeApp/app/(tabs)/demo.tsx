import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/* 
GAME FLOW:

start:
   human (X) makes a move by clicking on an empty cell.
   board state is updated with the human's move.
   after the human's move, the game checks if there is a winner or if the board is full.
   if there is a winner or the board is full (draw), the game ends.
   if the game is still ongoing, proceed to the next step.

AI's turn:
   if the game is ongoing, pass the updated board state to `makeAIMove` to let the AI take its turn.
   in `makeAIMove`, the AI calculates the best possible move using the `getBestMove` function, which utilizes the miniMax algorithm to evaluate all potential moves.
   once the AI chooses the best move, the board state is updated with the AI's move.

check for winner:
   after the AI makes its move, the game checks again for a winner or a draw.
   if there is a winner (either X or O), the game ends and displays the winner.
   if the board is full and no winner, the game ends in a draw.

end:
   if the game ends (winner or draw), display the appropriate message ("You Win", "AI Wins", "Draw").
*/








const TicTacToe = () => {
  //default values for human and AI teams
  const human = 'X'
  const AI = 'O'

  // Setting up state variables using React's useState hook
  const [board, setBoard] = useState(Array(9).fill(null)); //defines array board as a stateful object, fills array indices with null as default
  const [currentPlayer, setCurrentPlayer] = useState(human); //defines currentPlayer as a stateful object, passing a default value of human == ('X')
  const [winner, setWinner] = useState(null); // defines winner as a stateful object, passing in a default value of null




  // function to handle the player's move when a cell is pressed
  const handlePress = (index) => {
    if (board[index] || winner) return; //exits early if game is won or if the index is already filled
    
  // human's move: create a shallow copy of the board and update the selected cell
    const newBoard = [...board]; //creates a shallow copy of board
    newBoard[index] = human;
    setBoard(newBoard);          //passes shallow copy of board to setBoard to trigger a change in state
              
    
    const winnerFound = checkWinner(newBoard);
    if (winnerFound) {
      setWinner(winnerFound); // checks for winning patterns
      return;
    }
    
    // AI move
    setTimeout(() => makeAIMove(newBoard), 500); // Small delay (300ms) for better UX, feels like the AI is "thinking"
  };



  const makeAIMove = (currentBoard) => {
    const bestMove = getBestMove(currentBoard) //since currentBoard will always be passed as a shallow copy we do not need to create anther shallow copy

    if (bestMove === -1) return; //no moves left
    
    const newBoard = [...currentBoard]; //create shallow copy to update state indirectly
    newBoard[bestMove] = AI
    setBoard(newBoard)

    //check for winner after evert AI turn
    const winnerFound = checkWinner(newBoard)
    if(winnerFound) {
      setWinner(winnerFound)
    }
    }

//should always recieved a shallow copy of board, no need to repeat this copy here
const getBestMove = (board) => {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = AI;  // Simulate AI move
      const score = miniMax(board, false);  // Recursively get score for Human's turn
      board[i] = null;  // Undo move

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  console.log(bestMove) //testing to see if recursion is calling infinitely      
  return bestMove;
};

  
  const miniMax = (board, isMaximizing) => {
    const winner = checkWinner(board);
    //default terminal checks for a won game
    if (winner === AI) return 1;    // AI wins
    if (winner === human) return -1; // Human wins
    if (winner === 'Draw') return 0; // Tie

        

        
    let bestScore = isMaximizing ? -Infinity : Infinity; // if isMaxing (boolean) is true then bestScore = -Infinity, else bestScore = -Infinity


//itterates over each index of Board
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = isMaximizing ? AI : human;  // Simulate move, if isMaximizing (boolean) is True then place AI(0), else place human (X)
        const score = miniMax(board, !isMaximizing); // Recursively simulate next turn
        board[i] = null //reset board index, this is on a shallow board and therefore no state update needs to occur
        
        bestScore = isMaximizing ? Math.max(bestScore, score) : Math.min(bestScore, score); //if isMaximizing (boolean) is true, then find the max between bestScore and score, else find the minimum
          }
        }
        return bestScore;

  }

        

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern; //a,b,c are mapped to the corresponding index in a element of winPatterns. ex) the first ittereation would assign [a,b,c] === [0,1,2]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return 'X' or 'O' as winner
      }
    }
    return board.includes(null) ? null : 'Draw'; // Check for draw
  };









  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(human);
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>
      <View style={styles.board}>
{/* board.map acts as a constructor creating touchable (interactive) cells, 
    taking in the board array and then defining a key value (index) and passing 
    that key value to handle placement upon press */}
        {board.map((cell, index) => (
          <TouchableOpacity key={index} style={styles.cell} onPress={() => handlePress(index)}> 
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/*if winner exists (does not equal null), then the test below will render into the UI.*/}
      {winner && (
        <Text style={styles.winnerText}>
          {winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`} {/*if draw then display ""It's a draw, else display propper winner */}
        </Text>
      )}
      {/*on button press the reset button with call the resetGame function*/}
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  board: { width: 300, flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: 100, height: 100, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  cellText: { fontSize: 36, fontWeight: 'bold' },
  winnerText: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  resetButton: { marginTop: 20, padding: 10, backgroundColor: '#007bff', borderRadius: 5 },
  resetText: { color: 'white', fontSize: 18 },
});

export default TicTacToe;
