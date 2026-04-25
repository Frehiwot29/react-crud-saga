import {combineReducers} from 'redux';
import i94Reducer from '../i94/reducer';

const rootReducer = combineReducers({
    i94: i94Reducer,
});

export default rootReducer; 