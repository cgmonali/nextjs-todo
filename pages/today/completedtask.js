import AddTask from '@/components/AddComponent/AddTask';
import AddButton from '../../components/AddComponent/AddButton'
import Task from '../../components/TodoListComponent/Task';
import { MongoClient } from 'mongodb';
import { useState } from 'react';
function completedTasks(props) {
    const [tasks, setTasks] = useState(props.DUMMY_MEETUPS);
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/delete-task?id=${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (response.ok) {
                // Optionally, refresh the page or update the state
                console.log(result.message);
                
                // window.location.reload(); // Simple way to refresh data
            } else {
                console.error('Failed to delete:', result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Today</h1>
            {props.DUMMY_MEETUPS.map(meetup => (
                 <Task key={meetup.id} 
            task={meetup.task} 
            id={meetup.id} 
            handleDelete={handleDelete}  />
                
            ))

            }
           
        </div>
    );
}
export async function getServerSideProps(){
    // fetch data from an API
    const client = await MongoClient.connect("mongodb+srv://monalicg2407:MdAI8yK7oAeDJeV2@cluster0.ltq9m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    const db = client.db();
    const meetupsCollection = db.collection("completedTasks");
    const meetups = await meetupsCollection.find().toArray();
    client.close();


    return {
        props: {
            DUMMY_MEETUPS: meetups.map(meetup => ({
                task: meetup.task,
                id: meetup._id.toString()
            }))
        }
    }
}
export default completedTasks;