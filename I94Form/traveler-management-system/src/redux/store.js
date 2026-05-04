import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import travelerReducer from './reducer';
import travelerSaga from './saga';


const rootReducer = combineReducers({
    travelerState: travelerReducer,

});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(travelerSaga);

export default store;