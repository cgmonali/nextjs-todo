import { MongoClient,ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const client = await MongoClient.connect("mongodb+srv://monalicg2407:MdAI8yK7oAeDJeV2@cluster0.ltq9m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        const db = client.db();
        const meetupsCollection = db.collection("todolist");

        const { id } = req.query;
        console.log(id);

        const result = await meetupsCollection.deleteOne({ _id: new ObjectId(id) });
        console.log(result);
        client.close();

        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
