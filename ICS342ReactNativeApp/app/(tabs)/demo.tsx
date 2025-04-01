import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handlePress = (index) => {
    if (board[index] || winner) return; // Ignore if cell is filled or game is over

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winnerFound = checkWinner(newBoard);
    if (winnerFound) {
      setWinner(winnerFound);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'); // Switch turns
    }
  };

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return 'X' or 'O' as winner
      }
    }

    if (!board.includes(null)) return 'Draw'; // If no winner and board is full

    return null; // No winner yet
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic-Tac-Toe</Text>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity key={index} style={styles.cell} onPress={() => handlePress(index)}>
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {winner && (
        <Text style={styles.winnerText}>
          {winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}
        </Text>
      )}
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
