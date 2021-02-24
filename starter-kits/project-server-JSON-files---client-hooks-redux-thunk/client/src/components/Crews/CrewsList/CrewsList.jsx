import './CrewsList.scss';
import { Crew } from '../../';

const CrewsList = (props) => {
	const { crewsList } = props;
	const list = crewsList.map(crew => {
		return (<Crew
			key={crew.name}
			posterId={crew.profile_path}
			name={crew.name}
			job={crew.job}
			department={crew.department}
		/>);
	});
	return (
		<div className="crews">
			{list}
		</div>
	);
};

export default CrewsList;