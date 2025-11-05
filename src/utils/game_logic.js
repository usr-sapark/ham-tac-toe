/* 우승 조합 */
export const WINNING_COMBINATIONS = [
  // 가로
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ], //a
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ], //b
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ], //c
  // 세로
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  // 대각선
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
];

// ----------------------------------------------

/* 다음 플레이어를 지정하는 함수 */
export const derivePlayer = (prevPlayer) => {
  return prevPlayer === "X" ? "O" : "X";
};

/* 승자 판별 함수 */
export function deriveWinner(gameTurns) {
  // gameTurns -> 3x3 보드판으로 변경
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  // 각 턴을 보드 위에 반영
  for (const turn of gameTurns) {
    const { row, col } = turn.square;
    board[row][col] = turn.player;
  }

  // 승리 조합 체크
  for (const combination of WINNING_COMBINATIONS) {
    const [[r1, c1], [r2, c2], [r3, c3]] = combination;

    const first = board[r1][c1];
    const second = board[r2][c2];
    const third = board[r3][c3];

    // 값 비교 로직
    const allFilled = first !== null;
    const allSame = first === second && first === third;
    if (allFilled && allSame) {
      return first;
    }

    /* 값 비교 로직 축약 코드
     if (first && first === second && first === third) {
      return first;
    }
    */
  }
}
