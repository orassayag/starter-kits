import './LinksList.scss';
import { Link } from '../../';

const LinksList = (props) => {
	const { linksList } = props;
	const list = linksList.map(link => {
		return (<Link
			key={link.id}
			name={link.name}
			url={link.url}
		/>);
	});
	return (
		<div className="links">
			{list}
		</div>
	);
};

export default LinksList;