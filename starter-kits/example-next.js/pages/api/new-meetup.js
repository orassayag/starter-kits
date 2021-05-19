// api/new-meetup
import { MongoClient } from 'mongodb';
import settings from '../../settings/settings';

const handler = async (req, res) => {
    // Only POST requests.
    if (!settings.isLocalData && req.method === 'POST') {
        const data = req.body;
        const client = await MongoClient.connect(settings.mongoDBConnectionString, { useUnifiedTopology: true });
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        if (result) { }
        client.close();
        res.status(201).json({ message: 'Meetup inserted!' });
    }
};

export default handler;