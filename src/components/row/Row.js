const Row = (props) => {
  return Object.values(props).map((value) => {
    let isRed = false;
    if (value < 0) {
      isRed = true;
    }
    return (
      <td data-negative-value={isRed} key={value}>
        {value}
      </td>
    );
  });
};

export default Row;
