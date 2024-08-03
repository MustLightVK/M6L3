import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import TodoItem from './components/ToDoItem';
import { todosData } from './components/todosData';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import About from './components/About';
import { v4 as uuidv4 } from 'uuid'; /* Проблема: Использование простого счетчика для генерации идентификаторов может привести
                                        к дублированию id при добавлении и удалении элементов, так как длина списка изменяется.
                                        Решение: Генерация уникальных идентификаторов с помощью uuid обеспечивает уникальность id,
                                        предотвращая повторение идентификаторов независимо от изменений в списке.*/

// Функция для обеспечения уникальности идентификаторов задач
const ensureUniqueIds = (tasks) => {
  const seenIds = new Set();
  return tasks.map(task => {
    if (seenIds.has(task.id)) {
      task.id = uuidv4(); // Присвоение нового уникального идентификатора
    }
    seenIds.add(task.id);
    return task;
  });
};

const App = () => {
  const savedTasks = localStorage.getItem('todoItems');
  // Проверяем и обновляем идентификаторы задач при инициализации
  const initialTasks = savedTasks ? ensureUniqueIds(JSON.parse(savedTasks)) : ensureUniqueIds(todosData);
  const [todoItems, setTodoItems] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');

  // Сохранение задач в localStorage
  const saveTasksLocalStorage = useCallback(() => {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }, [todoItems]);

  useEffect(() => {
    window.addEventListener('beforeunload', saveTasksLocalStorage);
    return () => {
      window.removeEventListener('beforeunload', saveTasksLocalStorage);
    };
  }, [saveTasksLocalStorage]);

  // Обработка изменения состояния задачи (выполнена/не выполнена)
  const handleChange = (id) => {
    setTodoItems(prevItems => prevItems.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    }));
  };

  // Обработка ввода нового значения задачи
  const getNewValue = (e) => {
    setNewTask(e.target.value);
  };

  // Добавление новой задачи
  const addTask = () => {
    if (newTask.trim() === '') {
      return;
    }
    const newTaskItem = {
      id: uuidv4(),
      text: newTask,
      completed: false,
    };
    setTodoItems(prevItems => [...prevItems, newTaskItem]);
    setNewTask('');
  };

  // Удаление задачи
  const deleteTask = (id) => {
    setTodoItems(prevItems => prevItems.filter(task => task.id !== id));
  };

  const activeTasks = todoItems.filter(task => !task.completed);
  const completedTasks = todoItems.filter(task => task.completed);

  // Формирование списка задач для отображения
  const finalTasks = [...activeTasks, ...completedTasks].map(task => (
    <TodoItem
      key={task.id}
      id={task.id}
      completed={task.completed}
      desc={task.text}
      handleChange={() => handleChange(task.id)}
      deleteTask={() => deleteTask(task.id)}
    />
  ));

  return (
    <Router>
      <div className="App">
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/">Home</Link></li>
            <li className="nav-item"><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="input-container">
                  <input
                    type="text"
                    value={newTask}
                    onChange={getNewValue}
                    className="input-text"
                  />
                  <button onClick={addTask} className="btn">Add Task</button>
                </div>
                <div className="todo-list">
                  {finalTasks}
                </div>
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
