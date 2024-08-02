import React, { useState } from 'react';
import "./ToDoItem.scss";

const TodoItem = (props) => {
    const resolvedTask = {
        textDecoration : 'line-through'
    }
    return (
        <div className='todo-item'>
            <input type='checkbox' defaultChecked={props.completed} onChange = {props.handleChange}></input>
            <p style = {props.completed ? resolvedTask : {}}

            lassName='desc'>{props.desc}</p>
            <button onClick={props.deleteTask}>Delete task</button>
        </div>
    );
}

export default TodoItem;
