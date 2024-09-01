import { useState } from 'react';
import AddTask from '@/components/AddComponent/AddTask';
import Task from '../../components/TodoListComponent/Task';
import { MongoClient } from 'mongodb';

function TodoList(props) {
    const [tasks, setTasks] = useState(props.DUMMY_MEETUPS);

    const handleAddTask = async (newTask) => {
        try {
            const response = await fetch('/api/add-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task: newTask,status: 'incomplete'  }),

            });

            const result = await response.json();

            if (response.ok) {
                // Update the tasks state with the newly added task
                setTasks((prevTasks) => [
                    ...prevTasks,
                    { task: newTask, id: result.insertedId },
                ]);
            } else {
                console.error('Failed to add task:', result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            const response = await fetch(`/api/delete-task?id=${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (response.ok) {
                // Remove the deleted task from the state
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            } else {
                console.error('Failed to delete task:', result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleMoveTask = async (id, task) => {
        try {
            const response = await fetch('/api/move-task', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, task, status: 'completed' }),
            });

            const result = await response.json();

            if (response.ok) {
                // Optionally remove the task from the state if it is moved
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            } else {
                console.error('Failed to move task:', result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Today</h1>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    id={task.id}
                    task={task.task}
                    onDelete={handleDeleteTask}
                    onMove={handleMoveTask}
                />
            ))}
            <AddTask onAddTask={handleAddTask} />
        </div>
    );
}

export async function getServerSideProps() {
    let client;

    try {
        const client = await MongoClient.connect("mongodb+srv://monalicg2407:MdAI8yK7oAeDJeV2@cluster0.ltq9m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    const db = client.db();
        const meetupsCollection = db.collection('todolist');
        const meetups = await meetupsCollection.find().toArray();

        return {
            props: {
                DUMMY_MEETUPS: meetups.map((meetup) => ({
                    task: meetup.task,
                    id: meetup._id.toString(),
                })),
            },
        };
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        return {
            props: {
                DUMMY_MEETUPS: [],
            },
        };
    } finally {
        client && client.close();
    }
}

export default TodoList;
