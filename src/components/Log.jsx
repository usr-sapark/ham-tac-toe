const Log = ({ turns }) => {
  return (
    <ol id="log">
      {turns.map((item, idx) => {
        return (
          <li id="log" key={`${item.square.row}${item.square.col}`}>
            {idx + 1} / {item?.player} selected / {item?.square.row},
            {item?.square.col}
          </li>
        );
      })}
    </ol>
  );
};

export default Log;
