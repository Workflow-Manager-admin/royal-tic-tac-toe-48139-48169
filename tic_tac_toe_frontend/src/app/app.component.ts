import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
/**
 * Root component for Tic Tac Toe: manages game logic, state, and restart functionality.
 */
export class AppComponent {
  title = 'Royal Tic Tac Toe';
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  xIsNext: boolean = true;
  winner: string | null = null;
  isDraw: boolean = false;

  // PUBLIC_INTERFACE
  /**
   * Handles a cell click: marks the move, checks for winner/draw, switches turn.
   */
  makeMove(row: number, col: number): void {
    if (this.board[row][col] || this.winner || this.isDraw) {
      return;
    }
    this.board[row][col] = this.xIsNext ? 'X' : 'O';
    if (this.calculateWinner()) {
      this.winner = this.board[row][col];
    } else if (this.isBoardFull()) {
      this.isDraw = true;
    } else {
      this.xIsNext = !this.xIsNext;
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Checks board state for winner. Returns winner symbol if found, null otherwise.
   */
  calculateWinner(): string | null {
    const lines = [
      // Rows
      [{r: 0, c: 0}, {r: 0, c: 1}, {r: 0, c: 2}],
      [{r: 1, c: 0}, {r: 1, c: 1}, {r: 1, c: 2}],
      [{r: 2, c: 0}, {r: 2, c: 1}, {r: 2, c: 2}],
      // Columns
      [{r: 0, c: 0}, {r: 1, c: 0}, {r: 2, c: 0}],
      [{r: 0, c: 1}, {r: 1, c: 1}, {r: 2, c: 1}],
      [{r: 0, c: 2}, {r: 1, c: 2}, {r: 2, c: 2}],
      // Diagonals
      [{r: 0, c: 0}, {r: 1, c: 1}, {r: 2, c: 2}],
      [{r: 0, c: 2}, {r: 1, c: 1}, {r: 2, c: 0}],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      const v = this.board[a.r][a.c];
      if (v && v === this.board[b.r][b.c] && v === this.board[c.r][c.c]) {
        return v;
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  /**
   * Checks if the board is completely filled.
   */
  isBoardFull(): boolean {
    return this.board.every(row => row.every(cell => cell !== ''));
  }

  // PUBLIC_INTERFACE
  /**
   * Restarts the game, clearing the board and state.
   */
  restartGame(): void {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.xIsNext = true;
    this.winner = null;
    this.isDraw = false;
  }

  // PUBLIC_INTERFACE
  /**
   * Returns game status message for display above the board.
   */
  get statusMessage(): string {
    if (this.winner) {
      return this.winner === 'X'
        ? 'King (X) Wins!'
        : 'Queen (O) Wins!';
    } else if (this.isDraw) {
      return "It's a Draw!";
    } else {
      return this.xIsNext
        ? 'King (X) Turn'
        : 'Queen (O) Turn';
    }
  }
}
