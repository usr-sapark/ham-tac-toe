import { useState } from "react";
// components
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
// utils
import { deriveWinner } from "./utils/game_logic";
import { derivePlayer } from "./utils/game_logic";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
// -----------------------------------------------------------

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const curPlayer = derivePlayer(gameTurns[0]?.player);
  const winner = deriveWinner(gameTurns);
  const hasDraw = gameTurns.length === 9 && !winner;

  // Restart Func
  const handleRestart = () => {
    setGameTurns([]);
  };
  // Box Click Func
  const handleSelectBox = (rowIdx, colIdx) => {
    for (let i = 0; i < gameTurns.length; i++) {
      const turn = gameTurns[i];
      if (turn.square.row == rowIdx && turn.square.col == colIdx) {
        alert("중복 입력 금지");
        // handleSelectBox함수 종료 -> setGameTurns실행 안됨
        return;
      }
    }
    setGameTurns((prevTurns) => {
      const updatedTurns = [
        {
          square: { row: rowIdx, col: colIdx },
          player: derivePlayer(prevTurns[0]?.player),
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  // Username Sync Func
  const handleNameChange = (symbol, newName) => {
    setPlayers((prev) => {
      if (symbol === "O") {
        return {
          O: newName,
          X: prev.X,
        };
      } else {
        return {
          X: newName,
          O: prev.O,
        };
      }
    });
  };

  /* 축약 형태
setPlayers(prev => {
  return {
  ...prev,
  [symbol]: newName
  };
})
  */

  return (
    <main>
      <div id="game-container">
        {(winner || hasDraw) && (
          <GameOver winner={players[winner]} onRestart={handleRestart} />
        )}

        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={curPlayer === "X"}
            onChangeName={handleNameChange}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={curPlayer === "O"}
            onChangeName={handleNameChange}
          />
        </ol>
        <GameBoard onSelectBox={handleSelectBox} gameTurns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
