const Row = (props) => {
  return Object.values(props).map((value) => {
    return <td key={value}>{value}</td>;
  });
};

export default Row;
