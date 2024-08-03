import React from 'react';
import "./ToDoItem.scss";

const TodoItem = (props) => {
    return (
        <div className='todo-item'>
            <input type='checkbox' checked={props.completed} onChange={props.handleChange} />
            <p className={`desc ${props.completed ? 'completed' : ''}`}>{props.desc}</p>
            <button onClick={props.deleteTask}>Delete task</button>
        </div>
    );
}

export default TodoItem;
