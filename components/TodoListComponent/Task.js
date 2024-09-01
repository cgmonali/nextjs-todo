import { useState } from 'react';
import classes from './Task.module.css';

function Task({ id, task, onDelete, onMove }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);

        if (checked) {
            onMove(id, task);
        }
    };

    return (
        <div className={classes.taskContainer}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <div className={classes.taskName}>{task}</div>
            <button
                className={classes.deleteTask}
                onClick={() => onDelete(id)}
            >
                Delete
            </button>
        </div>
    );
}

export default Task;
