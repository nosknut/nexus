import React from "react";
import Board from "./Board.js";
import "./Game.css";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        move: 0,
        changedSquare: null,
      }],
      flippedHistory: true,
      stepNumber: 0,
      xIsNext: true,
    };
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    const flipped = this.state.flippedHistory;
    const moves = (flipped ? history.slice().reverse() : history).map((step, move) => {
      const desc = step.changedSquare ?
        ('Go to move #' + step.move + ': [x:' + step.changedSquare.x + ', y:' + step.changedSquare.y + ']')
        : 'Go to game start';

      const isCurrentStep = this.state.stepNumber === step.move;

      const style = isCurrentStep ? {
        background: "rgb(60, 60, 70)",
      } : null;

      return (
        <li key={step.move} id="historyBtnLi">
          <button
            onClick={() => this.jumpTo(step.move)}
            style={style}
          >{desc}</button>

        </li>
      );
    });
/*
<div id="historyArrow" style={isCurrentStep ? {visibility: "visible"} : undefined}>&#8592;</div>
 */

    let status;
    if (winner) {
      status = 'Winner: ' + winner.player;
    } else if (!current.squares.includes(null)) {
      status = 'Tie';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            status={winner ? {...current, highlighted: winner.winningSquares.slice()} : {...current, highlighted: []}}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <h2>{status}</h2>
          <button onClick={() => this.setState({...this.state, flippedHistory: !this.state.flippedHistory})}>Flip
            history
          </button>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i] != null) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        move: history.length,
        changedSquare: {
          x: (i % 3) + 1,
          y: (Math.floor(i / 3) + 1),
        },
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          player: squares[a],
          winningSquares: lines[i].slice(),
        };
      }
    }
    return null;
  }
}