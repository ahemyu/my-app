import { useState } from 'react';

function Square({ val, onSquareClick }) {

  return <button className="square" onClick={onSquareClick}> {val} </button>
}


function Board({isXNext, squares, onPlay}) {
  function handleClick(i) {
    const nextSquares = squares.slice();
    if (nextSquares[i] != null || calculateWinner(squares)) {
      return;
    }
    if (isXNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);

  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Player " + winner + " won!";
  } else {
    status = "Next Player is " + (isXNext ? "X" : "O");
  }

  return (
    <>
      <h1>{status}</h1>
      <div className="board-row">
        <Square val={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square val={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square val={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square val={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square val={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square val={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square val={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square val={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square val={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  //const [isXNext, setIsXNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrrentMove] = useState(0);
  const isXNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(squares){
    const nextHistory = [...history.slice(0, currentMove+1), squares]; 
    setHistory(nextHistory);
    setCurrrentMove(nextHistory.length  - 1);
    // setIsXNext(!isXNext);
  }

  function jumpTo(nextMove){
    setCurrrentMove(nextMove);
    // setIsXNext(nextMove % 2 === 0); //can we use currentMove instead of nextMove here ??
  }

  const moves = history.map((squares, move) => {
    let description;
    if(move > 0){
      description = "Go to move # " + move;
    }else {
      description = "Go to start of the game "
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <ol> {moves} </ol>
      </div>
    </div>
  );



}