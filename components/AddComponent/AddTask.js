import React, { useRef } from 'react';
import classes from './AddTask.module.css';

function AddTask({ onAddTask }) {
    const taskInputRef = useRef(null);

    const handleAddTask = () => {
        const task = taskInputRef.current.value;
        if (task.trim()) {
            onAddTask(task);  // Call the passed function to add the task
            taskInputRef.current.value = '';  // Clear the input field
        }
    };

    return (
        <div className={classes.addTaskContainer}>
            <input type="text" placeholder="Add task" ref={taskInputRef} />
            <button className={classes.addTask} onClick={handleAddTask}>Add</button>
        </div>
    );
}

export default AddTask;
