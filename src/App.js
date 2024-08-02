import './App.scss';
import TodoItem from './components/ToDoItem';
import {todosData} from './components/todosData';
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    const savedTasks = localStorage.getItem('todoItems');
    this.state = {
      todoItems: savedTasks ? JSON.parse(savedTasks) : todosData,
      newTask: ''
    }
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.saveTasksLocalStorage);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveTasksLocalStorage);
  }

  saveTasksLocalStorage = () => {
    localStorage.setItem('todoItems', JSON.stringify(this.state.todoItems));
  }

  handleChange = (id) => {
    this.setState(prevState => {
      const updatedTodoItems = prevState.todoItems.map(item => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
      return { todoItems: updatedTodoItems };
    });
  };

  getNewValue = e => {
    this.setState({
      newTask: e.target.value
    });
  };

  addTask = () => {
    if(this.state.newTask.trim() === '') {
      return;
    }
    const newTaskItem = {
      id: this.state.todoItems.length + 1,
      text: this.state.newTask,
      completed: false,
    }
    this.setState(prevState => ({
      todoItems: [...prevState.todoItems, newTaskItem],
      newTask: ''
    }), () => this.saveTasksLocalStorage());
  };

  deleteTask = (id) => {
    this.setState(prevState => ({
      todoItems: prevState.todoItems.filter(task => task.id !== id)
    }), () => this.saveTasksLocalStorage());
  };

  render() {
    const {todoItems} = this.state;
    const activeTasks = todoItems.filter(task => task.completed === false);
    const completedTasks = todoItems.filter(task => task.completed === true);

    const finalTasks = [...activeTasks, ...completedTasks].map(task => (
      <TodoItem
        key={task.id}
        completed={task.completed}
        desc={task.text}
        handleChange={() => this.handleChange(task.id)}
        deleteTask={() => this.deleteTask(task.id)}
      />
    ));

    return (
      <div className="App">
          <input type='text' onChange={this.getNewValue}></input>
          <button onClick={this.addTask}>Add a new Task</button>
          {finalTasks}
      </div>
    );
  }
}

export default App;
