// our-domain.com/some-meetup-name
import { Fragment } from 'react';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import settings from '../../settings/settings';
import MeetupDetails from '../../components/meetups/MeetupDetails';

const MeetupDetailsPage = (props) => {

    if (settings.isLocalData) {
        return (
            <MeetupDetails
                image="https://officechai.com/wp-content/uploads/2015/05/Cyberecture-egg-shaped-building-mumbai.jpg"
                title="A First Meetup"
                address="Some Street 5, Some City"
                description="The is a first meetup"
            />
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{props.data.title}</title>
                <meta name="description" content={props.data.description} />
            </Head>
            <MeetupDetails
                image={props.data.image}
                title={props.data.title}
                address={props.data.address}
                description={props.data.description}
            />
        </Fragment>
    );
};

export const getStaticPaths = async () => {
    // Fetch data for a map all available IDs.
    let paths = [
        {
            params: {
                meetupId: 'm1'
            }
        },
        {
            params: {
                meetupId: 'm2'
            }
        }
    ];
    if (!settings.isLocalData) {
        const client = await MongoClient.connect(settings.mongoDBConnectionString, { useUnifiedTopology: true });
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
        paths = meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }));
        client.close();
    }
    return {
        fallback: 'blocking',
        paths: paths
    };
};

export const getStaticProps = async (context) => {
    // Fetch data for a single meetup.
    let data = {
        id: 'm1',
        image: 'https://officechai.com/wp-content/uploads/2015/05/Cyberecture-egg-shaped-building-mumbai.jpg',
        title: 'A First Meetup',
        address: 'Some Street 5, Some City',
        description: 'The is a first meetup'
    };
    if (!settings.isLocalData) {
        const meetupId = context.params.meetupId;
        const client = await MongoClient.connect(settings.mongoDBConnectionString, { useUnifiedTopology: true });
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const meetup = await meetupsCollection.findOne({
            _id: ObjectId(meetupId)
        });
        client.close();
        data = {
            id: meetup._id.toString(),
            image: meetup.image,
            title: meetup.title,
            address: meetup.address,
            description: meetup.description
        };
    }
    return {
        props: {
            data: data
        }
    };
};

export default MeetupDetailsPage;