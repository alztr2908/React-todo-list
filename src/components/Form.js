import { useState } from "react";
import { Button, Form } from "react-bootstrap";

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
    <>
      <h1>Alz todo list</h1>
      <form onSubmit={handleSubmit}>
        <Form.Control
          size='lg'
          type='text'
          placeholder='Add Task'
          value={name}
          onChange={handleChange}
        />
        <Button variant='outline-danger' type='submitv'>
          Submit
        </Button>
      </form>
    </>
  );
};

export default Header;
