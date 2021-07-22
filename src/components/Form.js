import { useState } from "react";

const Header = (props) => {
  const [name, setName] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    if (name !== "") {
      props.addTasks(name);
    }

    setName("");
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={name} onChange={handleChange} />
      <br />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Header;
