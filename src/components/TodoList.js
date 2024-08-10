import React, { useState, useCallback, useEffect } from 'react';
import TodoItem from './ToDoItem';
import { todosData } from './todosData';
import { v4 as uuidv4 } from 'uuid';
import './TodoList.scss';

const ensureUniqueIds = (tasks) => {
    const seenIds = new Set();
        return tasks.map(task => {
            if (seenIds.has(task.id)) {
            task.id = uuidv4(); 
            }
            seenIds.add(task.id);
            return task;
        });
    };

    const TodoList = () => {
    const savedTasks = localStorage.getItem('todoItems');
    const initialTasks = savedTasks ? ensureUniqueIds(JSON.parse(savedTasks)) : ensureUniqueIds(todosData);
    const [todoItems, setTodoItems] = useState(initialTasks);
    const [newTask, setNewTask] = useState('');

    const saveTasksLocalStorage = useCallback(() => {
        localStorage.setItem('todoItems', JSON.stringify(todoItems));
    }, [todoItems]);

    useEffect(() => {
        window.addEventListener('beforeunload', saveTasksLocalStorage);
        return () => {
        window.removeEventListener('beforeunload', saveTasksLocalStorage);
        };
    }, [saveTasksLocalStorage]);

    const handleChange = (id) => {
        setTodoItems(prevItems => prevItems.map(item => {
        if (item.id === id) {
            return { ...item, completed: !item.completed };
        }
        return item;
        }));
    };

    const getNewValue = (e) => {
        setNewTask(e.target.value);
    };

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

    const deleteTask = (id) => {
        setTodoItems(prevItems => prevItems.filter(task => task.id !== id));
    };

    const activeTasks = todoItems.filter(task => !task.completed);
    const completedTasks = todoItems.filter(task => task.completed);

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
        <div>
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
        </div>
    );
};

export default TodoList;
