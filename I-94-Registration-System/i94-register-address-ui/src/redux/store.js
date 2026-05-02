// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import i94Reducer from './reducers/i94Reducer';
import i94Saga from './sagas/i94Sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  i94: i94Reducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(i94Saga);

export default store;