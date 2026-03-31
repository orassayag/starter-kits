import './ActorBox.scss';
import { Field, Gender } from '../../';

const ActorBox = (props) => {
	const { actor, onActorBoxValueChange, onActorBoxRemoveClick } = props;
	const { id, name, character, gender, profile_path, errorField } = actor;
	return (
		<div className={`container${errorField ? ' error-container' : ''}`}>
			<div className="delete" data-id={id} onClick={onActorBoxRemoveClick}>
				<i className="fa fa-times" aria-hidden="true"></i>
			</div>
			<p className="title">Actor</p>
			<Field
				labelTitle="Full Name"
				inputType="text"
				inputName="name"
				dataId={id}
				value={name}
				isError={errorField === 'name'}
				onValueChange={onActorBoxValueChange}
			/>
			<Field
				labelTitle="Character"
				inputType="text"
				inputName="character"
				dataId={id}
				value={character}
				isError={errorField === 'character'}
				onValueChange={onActorBoxValueChange}
			/>
			<Gender
				labelTitle="Gender"
				genderName="gender"
				dataId={id}
				value={gender}
				onGenderChange={onActorBoxValueChange}
			/>
			<Field
				labelTitle="Profile Path"
				inputType="text"
				inputName="profile_path"
				dataId={id}
				value={profile_path}
				isError={errorField === 'profile_path'}
				onValueChange={onActorBoxValueChange}
			/>
		</div>
	);
};

export default ActorBox;