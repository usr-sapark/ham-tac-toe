import { useState } from "react";
// components
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
// utils
import { deriveWinner } from "./utils/game_logic";
import { derivePlayer } from "./utils/game_logic";

function App() {
  // gameLog & GamdBoard
  const [gameTurns, setGameTurns] = useState([]);
  const curPlayer = derivePlayer(gameTurns[0]?.player);

  // 승자 결정 함수
  const winner = deriveWinner(gameTurns);

  // 박스 클릭 함수
  const handleSelectBox = (rowIdx, colIdx) => {
    for (let i = 0; i < gameTurns.length; i++) {
      const turn = gameTurns[i];
      if (turn.square.row == rowIdx && turn.square.col == colIdx) {
        alert("중복 입력 금지");
        // handleSelectBox함수를 종료시켜 setGameTurns가 실행되지 못하는 원리
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

  // console.log(gameTurns);

  return (
    <main>
      <div id="game-container">
        {/* {winner && <h2>🎉 Winner: {winner}</h2>} */}
        {winner && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>🎉 Winner: {winner}</h2>
              <button onClick={() => window.location.reload()}>
                다시하기!
              </button>
            </div>
          </div>
        )}

        <ol id="players" className="highlight-player">
          <Player name="player 1" symbol="X" isActive={curPlayer === "X"} />
          <Player name="player 2" symbol="O" isActive={curPlayer === "O"} />
        </ol>
        <GameBoard onSelectBox={handleSelectBox} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
