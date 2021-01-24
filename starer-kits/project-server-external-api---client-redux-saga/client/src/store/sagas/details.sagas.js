import { put } from 'redux-saga/effects';
import { detailsActions } from '../actions/actions';
import movieService from '../../services/movie.service';

export function* loadDetailsSaga(action) {
	const { movieId } = action;
	try {
		yield put(detailsActions.setMovieDetails({
			movie: null,
			youtubeKey: null,
			credits: null
		}));
		const movie = yield movieService.getMovie(movieId);
		const videosResults = yield movieService.getVideos(movieId);
		const videos = videosResults ? videosResults.results.filter(video => video.site.toLowerCase() === 'youtube').map(video => video) : null;
		const credits = yield movieService.getCredits(movieId);
		yield put(detailsActions.setMovieDetails({
			movie: movie,
			youtubeKey: videos.length > 0 ? videos[0].key : null,
			credits: credits
		}));
	}
	catch (error) { }
}