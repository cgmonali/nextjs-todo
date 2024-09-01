import AddTask from "./AddTask";
import { useState } from "react";
import classes from './AddButton.module.css';
function AddButton() {

    const [task, setTask] = useState("");

    const addTask = () => {
        console.log("Add task");
        setTask(true);
    }

    return (
        <>
        <button className={classes.addButton} onClick={addTask}>Add</button>
        {task && <AddTask />}
    </>
    )
}

export default AddButton;