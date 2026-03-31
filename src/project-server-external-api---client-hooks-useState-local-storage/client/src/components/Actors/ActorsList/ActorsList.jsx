import './ActorsList.scss';
import { Actor } from '../../';

const ActorsList = (props) => {
	const { actorsList } = props;
	const list = actorsList.map(actor => {
		return (<Actor
			key={actor.id}
			posterId={actor.profile_path}
			name={actor.name}
			character={actor.character}
		/>);
	});
	return (
		<div className="actors">
			{list}
		</div>
	);
};

export default ActorsList;