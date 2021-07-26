import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import Form from "./components/Form";
import Todos from "./components/Todos";
import FilterButton from "./components/FilterButton";
import { Alert, Container, Row, Col, ButtonGroup } from "react-bootstrap";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function updateTasks(id, newName) {
    const editedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });

    setTasks(editedTasks);
  }

  function addTasks(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTasks(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todos
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTasks={deleteTasks}
        updateTasks={updateTasks}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      id={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = (
    <Alert variant='warning' className='text-center'>
      {taskList.length} {tasksNoun} remaining
    </Alert>
  );

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    const storeTasks = localStorage.getItem("props");
    if (storeTasks) setTasks(JSON.parse(storeTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem("props", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <Container fluid className='py-5'>
      <Row className='justify-content-md-center pb-3'>
        <Col xs lg='5' className='justify-content-center text-center'>
          <Form addTasks={addTasks} />
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Col xs lg='5' className='justify-content-center text-center'>
          <ButtonGroup>{filterList}</ButtonGroup>
        </Col>
      </Row>
      <Row className='justify-content-md-center pt-3'>
        <Col xs lg='5' className='justify-content-center text-center'>
          <h2 ref={listHeadingRef}>{headingText}</h2>
        </Col>
      </Row>
      <Row className='justify-content-md-center pt-3'>
        <Col xs lg='5' className='justify-content-center text-center'>
          <ul style={{ marginLeft: "auto", marginRight: "auto" }}>
            {taskList}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
