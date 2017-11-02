import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
const reducer = combineReducers({
	form: formReducer
});

const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
