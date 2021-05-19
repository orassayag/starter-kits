// our-domain.com
import { Fragment } from 'react';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import settings from '../settings/settings';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
    {
        _id: 'm1',
        title: 'A First Meetup',
        image: 'https://officechai.com/wp-content/uploads/2015/05/Cyberecture-egg-shaped-building-mumbai.jpg',
        address: 'Some address 5, 12345, Some City',
        description: 'This is a first meetup!'
    },
    {
        _id: 'm2',
        title: 'A Second Meetup',
        image: 'https://officechai.com/wp-content/uploads/2015/05/Cyberecture-egg-shaped-building-mumbai.jpg',
        address: 'Some address 10, 12345, Some City',
        description: 'This is a second meetup!'
    }
];

const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of highly active React meetups!" />
            </Head>
            <MeetupList
                meetups={props.meetups}
            />
        </Fragment>
    );
};

// Re-generate the server side page (create new version of the page from
// the server) each incoming request.
// Use this when you need access to req or res objects, or/and
// your data will change every request.
// Then, your page would be not be cached by the server, and
// the server will create a new page for each request.
/*     export const getServerSideProps = async(context) => {
        const req = context.req;
        const res = context.res;
        if (req || res) { }
        // Fetch data from an API.
        return {
            props: {
                meetups: DUMMY_MEETUPS
            }
        };
    }; */

// Re-generate the server side page (create new version of the page from
// the server) every X seconds (revalidate: X).
// Use this when you don't need access to req or res objects, or/and
// your data will not change every request.
// Than, your page would be cached by the server, until the next time
// the server will create a new page.
// THIS CODE WILL RUN ONLY DURING BUILD TIME.
export const getStaticProps = async () => {
    // Fetch data from an API.
    let meetups = DUMMY_MEETUPS;
    if (!settings.isLocalData) {
        const client = await MongoClient.connect(settings.mongoDBConnectionString, { useUnifiedTopology: true });
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        meetups = await meetupsCollection.find().toArray();
        client.close();
    }
    return {
        props: {
            meetups: meetups.map(meetup => ({
                id: meetup._id.toString(),
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                description: meetup.description
            }))
        },
        revalidate: 1
    };
};

export default HomePage;