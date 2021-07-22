import "../custom.css";
import { useState } from "react";

const Todos = (props) => {
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (name !== "") {
      props.updateTasks(props.id, name);
    }
    setName("");
    setIsEditing(false);
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  const viewTemplate = (
    <div className='box'>
      <h3>{props.name}</h3>
      <div className='todoButton'>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => props.deleteTasks(props.id)}>Delete</button>
      </div>
    </div>
  );

  const editTemplate = (
    <form className='box' onSubmit={handleSubmit}>
      <input type='text' value={name} onChange={handleChange} />
      <div className='todoButton'>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
        <button type='submit'>Save</button>
      </div>
    </form>
  );

  return <li>{isEditing ? editTemplate : viewTemplate}</li>;
};

export default Todos;
