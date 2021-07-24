import "../custom.css";
import { useState } from "react";
import { Button, OverlayTrigger, Popover, Alert } from "react-bootstrap";

const Todos = (props) => {
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  console.log(props);

  function handleSubmit() {
    if (name !== "") {
      props.updateTasks(props.id, name);
    }
    setName("");
    setIsEditing(false);
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  const popOverSettings = (
    <Popover>
      <Button variant='primary' onClick={() => setIsEditing(true)}>
        Edit
      </Button>
      <Button variant='danger' onClick={() => props.deleteTasks(props.id)}>
        Delete
      </Button>
    </Popover>
  );

  const popOverEdit = (
    <Popover>
      <Button variant='warning' onClick={() => setIsEditing(false)}>
        Cancel
      </Button>
      <Button
        variant='outline-success'
        onClick={() => handleSubmit()}
        type='submit'
      >
        Save
      </Button>
    </Popover>
  );

  const viewTemplate = (
    <div style={{ display: "flex" }}>
      <h3>{props.name}</h3>
      <input
        type='checkbox'
        defaultChecked={props.completed}
        onChange={() => props.toggleTaskCompleted(props.id)}
      />
    </div>
  );

  const editTemplate = (
    <>
      <input type='text' value={name} onChange={handleChange} />
      <br />
    </>
  );

  const doTask = isEditing ? editTemplate : viewTemplate;
  const doButton = isEditing ? popOverEdit : popOverSettings;

  return (
    <li>
      <div className='box'>
        <div className='taskMargin'>{doTask}</div>
        <div class='line-break'></div>

        <OverlayTrigger
          delay={{ show: 250, hide: 400 }}
          placement='right'
          overlay={doButton}
        >
          <Button variant='success' onClick={() => setIsEditing(false)}>
            Settings
          </Button>
        </OverlayTrigger>
      </div>
    </li>
  );
};

export default Todos;
