import './App.css';
import TodoItem from './components/ToDoItem';
import {todosData} from './components/todosData';
import React from 'react';

function App() {
  const todosItems = todosData.map(task => {
    return (
      <TodoItem
        key={task.id}
        completed={task.completed}
        desc={task.text}
      />
    );
  });

  const inputRef = React.createRef();
  const runClick = () => {
    console.log(inputRef.current.value);
  };

  return (
    <div className="App">
      <div className="todo-list">
        {todosItems}
      </div>
      <div className="input-container">
        <input type="text" ref={inputRef} className="input-text" placeholder="Add a new task" />
        <button onClick={runClick} className="btn">Add Task</button>
      </div>
    </div>
  );
}

export default App;
