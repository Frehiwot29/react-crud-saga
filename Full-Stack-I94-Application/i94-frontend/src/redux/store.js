import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import I94Reducers from './reducers/I94Reducers';
import rootSaga from './sagas/I94Saga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  i94: I94Reducers,
});

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store; // ✅ MUST be default export