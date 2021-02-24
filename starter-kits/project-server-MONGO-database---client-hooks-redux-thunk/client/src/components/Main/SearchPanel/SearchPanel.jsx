import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchActions } from '../../../store/actions/actions';
import './SearchPanel.scss';
import { ButtonClick, Check, Dropdown } from '../../';
import cultureService from '../../../services/culture.service';

const years = () => {
	let currentYear = new Date().getFullYear(), years = [];
	const startYear = 1900;
	years.push('--Select Year--');
	while (currentYear >= startYear) {
		years.push(currentYear--);
	}
	return years.map(year => { return { value: year, title: year }; });
};

const searchTypesList = ['Actor', 'Crew', 'Character', 'Production', 'Movie', 'Vote'].map(type => { return { value: type.toLowerCase(), title: type }; });
const statusesList = ['--Select Status--', 'Announced', 'Completed', 'Development', 'Filming', 'Optioned Property', 'Post-production',
	'Pre-production', 'Released', 'Script', 'Treatment/Outline', 'Turnaround'].map(status => { return { value: status, title: status }; });

const yearsList = years();
const countriesList = cultureService.getDropCountriesCode();
const languagesList = cultureService.getDropLanguages();

const SearchPanel = (props) => {
	const dispatch = useDispatch();
	const searchText = useSelector((state) => state.search.searchText);
	const genres = useSelector((state) => state.search.genres);
	const searchType = useSelector((state) => state.search.searchType);
	const year = useSelector((state) => state.search.year);
	const status = useSelector((state) => state.search.status);
	const production_country = useSelector((state) => state.search.production_country);
	const original_language = useSelector((state) => state.search.original_language);
	const onSetSearchValue = (fieldName, fieldValue) => dispatch(searchActions.setSearchValue(fieldName, fieldValue));
	const onSetLeaveSearch = () => dispatch(searchActions.setLeaveSearch());
	const { isOptionsPanel, genresList, onOptionsButtonClick, onSearchButtonClick } = props;

	useEffect(() => {
		return () => {
			onSetLeaveSearch();
		};
	}, []);

	const handleSearchTextChange = useCallback((e) => {
		onSetSearchValue('searchText', e.target.value);
	}, [searchText]);

	const handleOnSelectChange = useCallback((e) => {
		onSetSearchValue(e.target.name, e.target.value);
	}, [searchType, year, status, production_country, original_language]);

	const handleOnCheckChange = useCallback((e) => {
		let updatedGenres = [...genres];
		if (e.target.checked) {
			updatedGenres.push(parseInt(e.target.name));
		}
		else {
			updatedGenres = updatedGenres.filter(genre => parseInt(genre) !== parseInt(e.target.name));
		}
		onSetSearchValue('genres', updatedGenres);
	}, [genres]);

	const handleResetButtonClick = useCallback(() => {
		onSetLeaveSearch();
	}, []);

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			onSearchButtonClick();
		}
	};

	const advancePanelClass = isOptionsPanel ? ' active' : '';
	return (
		<div className="search">
			<div className={`search-area${advancePanelClass}`}>
				<div className="search-container">
					<button className="search-icon" onClick={onSearchButtonClick}>
						<i className="fa fa-search" aria-hidden="true"></i>
					</button>
					<input type="text" className="search-input" onChange={handleSearchTextChange} onKeyDown={handleKeyDown} placeholder="Search" value={searchText || ''} spellCheck="false" />
					<ButtonClick
						buttonText={'Options'}
						buttonTitle={'Options'}
						isLoading={false}
						onClick={onOptionsButtonClick}
					/>
				</div>
			</div>
			<div className={`advance-options${advancePanelClass}`}>
				<div className={`panel${advancePanelClass}`}>
					<div className="genres">
						<div className="genresList">
							{genresList.map(genre => {
								return (
									<Check
										key={genre.id}
										labelTitle={genre.name}
										checkName={genre.id}
										value={genres.findIndex(g => g === genre.id) > -1}
										onCheckChange={handleOnCheckChange}
									/>
								);
							})}
						</div>
					</div>
					<div className="options">
						<Dropdown
							labelTitle="searchType"
							dropName="searchType"
							value={searchType || searchTypesList[0]}
							dropOptions={searchTypesList}
							onDropChange={handleOnSelectChange}
						/>
						<Dropdown
							labelTitle="year"
							dropName="year"
							value={year || yearsList[0]}
							dropOptions={yearsList}
							onDropChange={handleOnSelectChange}
						/>
						<Dropdown
							labelTitle="Status"
							dropName="status"
							value={status || statusesList[0]}
							dropOptions={statusesList}
							onDropChange={handleOnSelectChange}
						/>
						<Dropdown
							labelTitle="Production Country"
							dropName="production_country"
							value={production_country || 'N/A'}
							dropOptions={countriesList}
							onDropChange={handleOnSelectChange}
						/>
						<Dropdown
							labelTitle="Original Language"
							dropName="original_language"
							value={original_language || 'N/A'}
							dropOptions={languagesList}
							onDropChange={handleOnSelectChange}
						/>
					</div>
				</div>
				<div className={`clear${advancePanelClass}`}>
					<ButtonClick
						buttonText={'Reset'}
						buttonTitle={'Reset'}
						isLoading={false}
						onClick={handleResetButtonClick}
					/>
				</div>
			</div>
		</div>
	);
};

export default SearchPanel;