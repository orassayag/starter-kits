import './Crew.scss';

const Crew = (props) => {
	const { posterId, name, job, department } = props;
	const imageURL = posterId ? `https://image.tmdb.org/t/p/w185${posterId}` : 'https://m.media-amazon.com/images/G/01/imdb/images/nopicture/32x44/name-2138558783._CB468460248_.png';
	return (
		<div className="crew">
			<div className="image" style={{ backgroundImage: `url('${imageURL}')` }}></div>
			<div className="name">{`${name} | ${job} | ${department}`}</div>
		</div>
	);
};

export default Crew;