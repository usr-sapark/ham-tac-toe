export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner ? <p>Winner Is {winner} </p> : <p>아이코 비겼땅</p>}
      <button onClick={onRestart}>다시하기!</button>
    </div>
  );
}
