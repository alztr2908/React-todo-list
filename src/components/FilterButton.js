import { ToggleButton } from "react-bootstrap";

const FilterButton = (props) => {
  const color = {
    All: "outline-success",
    Active: "outline-danger",
    Completed: "outline-warning",
  };

  return (
    <ToggleButton
      id={props.id}
      type='radio'
      variant={color[props.name]}
      checked={props.isPressed}
      onChange={() => props.setFilter(props.name)}
      // onClick={() => props.setFilter(props.name)}
    >
      <span>{props.name}</span>
    </ToggleButton>
  );
};

export default FilterButton;
