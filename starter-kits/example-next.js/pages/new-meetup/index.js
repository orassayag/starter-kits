// our-domain.com/new-meetup
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
    const router = useRouter();
    const addMeetupHandler = async (data) => {
        await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        router.push('/');
    };

    return (
        <Fragment>
            <Head>
                <title>Add A New Meetup</title>
                <meta name="description" content="Add your own meetups and create amazing networking opportunities!" />
            </Head>
            <NewMeetupForm
                onAddMeetup={addMeetupHandler}
            />
        </Fragment>
    );
};

export default NewMeetupPage;