import React, { useState } from 'react';
import "./ToDoItem.scss";

const TodoItem = (props) => {
    const [isChecked, setIsChecked] = useState(props.completed);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className='todo-item'>
            <label className='checkbox-container'>
                <input 
                    type="checkbox" 
                    checked={isChecked} 
                    onChange={handleCheckboxChange} 
                />
                <span className="checkmark"></span>
            </label>
            <p className={`desc ${isChecked ? 'completed' : ''}`}>{props.desc}</p>
        </div>
    );
}

export default TodoItem;
