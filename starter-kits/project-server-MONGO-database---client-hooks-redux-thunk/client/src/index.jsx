import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { detailsReducer, favoritesReducer, formReducer, mainReducer, searchReducer } from './store/reducers';
import App from './pages/App/App';
import './assert/css/font-awesome.min.css';
import './index.scss';

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const rootReducer = combineReducers({
  details: detailsReducer,
  favorites: favoritesReducer,
  form: formReducer,
  main: mainReducer,
  search: searchReducer
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const app = (
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
ReactDOM.render(app, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();