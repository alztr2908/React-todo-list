const FiltertButton = (props) => {
  return (
    <button
      type='button'
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span>{props.name}</span>
    </button>
  );
};

export default FiltertButton;
