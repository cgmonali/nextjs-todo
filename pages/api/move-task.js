import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { id, task } = req.body;

        let client;

        try {
            const client = await MongoClient.connect("mongodb+srv://monalicg2407:MdAI8yK7oAeDJeV2@cluster0.ltq9m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
            const db = client.db();

            // Insert the task into the "completedTasks" collection
            await db.collection('completedTasks').insertOne({ task });

            // Optionally, remove the task from the "todolist" collection
            await db.collection('todolist').deleteOne({ _id: new ObjectId(id) });

            res.status(201).json({ message: 'Task moved to completedTasks' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to move task' });
        } finally {
            client && client.close();
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
