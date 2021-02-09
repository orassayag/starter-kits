import React from 'react';
import './CrewBox.scss';
import { Field, Gender } from '../../';

const CrewBox = (props) => {
	const { crew, onCrewBoxValueChange, onCrewBoxRemoveClick } = props;
	const { id, name, gender, job, department, profile_path, errorField } = crew;
	return (
		<div className={`container${errorField ? ' error-container' : ''}`}>
			<div className="delete" data-id={id} onClick={onCrewBoxRemoveClick}>
				<i className="fa fa-times" aria-hidden="true"></i>
			</div>
			<p className="title">Crew</p>
			<Field
				labelTitle="Full Name"
				inputType="text"
				inputName="name"
				dataId={id}
				value={name}
				isError={errorField === 'name'}
				onValueChange={onCrewBoxValueChange}
			/>
			<Field
				labelTitle="Job"
				inputType="text"
				inputName="job"
				dataId={id}
				value={job}
				isError={errorField === 'job'}
				onValueChange={onCrewBoxValueChange}
			/>
			<Field
				labelTitle="Department"
				inputType="text"
				inputName="department"
				dataId={id}
				value={department}
				isError={errorField === 'department'}
				onValueChange={onCrewBoxValueChange}
			/>
			<Gender
				labelTitle="Gender"
				genderName="gender"
				dataId={id}
				value={gender}
				onGenderChange={onCrewBoxValueChange}
			/>
			<Field
				labelTitle="Profile Path"
				inputType="text"
				inputName="profile_path"
				dataId={id}
				value={profile_path}
				isError={errorField === 'profile_path'}
				onValueChange={onCrewBoxValueChange}
			/>
		</div>
	);
};

export default CrewBox;