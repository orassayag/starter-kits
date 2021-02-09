import { countries, languages } from 'countries-list';

class CultureService {

	constructor() { }

	getDropLanguages() {
		const languagesList = [];
		const keys = Object.keys(languages);
		for (let i = 0, length = keys.length; i < length; i++) {
			const value = languages[keys[i]];
			languagesList.push({ value: keys[i], title: value.name });
		}
		return this.sort(languagesList);
	}

	getDropCountries() {
		const countriesList = [];
		const keys = Object.keys(countries);
		for (let i = 0, length = keys.length; i < length; i++) {
			const value = countries[keys[i]];
			countriesList.push({ value: value.name, title: value.name });
		}
		return this.sort(countriesList);
	}

	getDropCountriesCode() {
		const countriesList = [];
		const keys = Object.keys(countries);
		for (let i = 0, length = keys.length; i < length; i++) {
			const value = countries[keys[i]];
			countriesList.push({ value: keys[i], title: value.name });
		}
		return this.sort(countriesList);
	}

	sort(list) {
		return list.sort((a, b) => {
			const textA = a.title.toLowerCase();
			const textB = b.title.toLowerCase();
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		});
	}
}

export default new CultureService();