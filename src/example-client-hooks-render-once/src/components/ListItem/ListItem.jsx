import { memo } from 'react';

const listItem = memo(({ name, id, onClick }) => {
	console.log('render');
	return (
		<li onClick={() => onClick(id)}>
			{id}: {name}
		</li>
	);
});

export default listItem;