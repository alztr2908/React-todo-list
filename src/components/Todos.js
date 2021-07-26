import "../custom.css";
import { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";

const Todos = (props) => {
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
    <>
      <Button
        className='p-3'
        variant='primary'
        onClick={() => setIsEditing(true)}
      >
        Edit
      </Button>
      <Button
        className='ps-3'
        variant='danger'
        onClick={() => props.deleteTasks(props.id)}
      >
        Delete
      </Button>
    </>
  );

  const popOverEdit = (
    <>
      <Button variant='warning' onClick={() => setIsEditing(false)}>
        Cancel
      </Button>
      <Button
        className='ps-3'
        variant='outline-success'
        onClick={() => handleSubmit()}
        type='submit'
      >
        Save
      </Button>
    </>
  );

  const viewTemplate = (
    <div className='d-flex flex-wrap'>
      <input
        type='checkbox'
        defaultChecked={props.completed}
        onChange={() => props.toggleTaskCompleted(props.id)}
        style={{ width: "3em", height: "3em" }}
      />
      {/* <h3 className='d-flex align-items-center ms-3 longWord '>{props.name}</h3> */}
      <h3 className='align-items-center ms-3 longWord '>{props.name}</h3>
    </div>
  );

  const newNameMessage = `New name for ${props.name}`;
  const editTemplate = (
    <>
      <Form.Control
        size='lg'
        type='text'
        placeholder={newNameMessage}
        value={name}
        onChange={handleChange}
      />
    </>
  );

  const doTask = isEditing ? editTemplate : viewTemplate;
  const doButton = isEditing ? popOverEdit : popOverSettings;

  return (
    <li className='my-2'>
      <Row className='justify-content-md-center ml-6'>
        <Col sm={8} className='d-flex p-3 box'>
          {doTask}
        </Col>
        <Col className='d-flex pe-2'>{doButton}</Col>
      </Row>
    </li>
  );
};

export default Todos;
