// address.saga.js
import { takeLatest, put, select } from 'redux-saga/effects';
import { ADD_ADDRESS, EDIT_ADDRESS, DELETE_ADDRESS } from './address.constants';
import { setAddresses, setLastAddress } from './address.actions';

// selector
const getAddresses = (state) => state.address.list;

// ADD
function* handleAddAddress(action) {
    const current = yield select(getAddresses);

    const newAddress = {
        ...action.payload,
        id: Date.now() // simple unique ID
    };

    const updated = [...current, newAddress];

    yield put(setAddresses(updated));
    yield put(setLastAddress(newAddress));

    localStorage.setItem('addresses', JSON.stringify(updated));
}

// EDIT
function* handleEditAddress(action) {
    const current = yield select(getAddresses);

    const updated = current.map(addr =>
        addr.id === action.payload.id ? action.payload : addr
    );

    yield put(setAddresses(updated));
    yield put(setLastAddress(action.payload));

    localStorage.setItem('addresses', JSON.stringify(updated));
}

// DELETE
function* handleDeleteAddress(action) {
    const current = yield select(getAddresses);

    const updated = current.filter(addr => addr.id !== action.payload);

    yield put(setAddresses(updated));

    localStorage.setItem('addresses', JSON.stringify(updated));
}

export default function* addressSaga() {
    yield takeLatest(ADD_ADDRESS, handleAddAddress);
    yield takeLatest(EDIT_ADDRESS, handleEditAddress);
    yield takeLatest(DELETE_ADDRESS, handleDeleteAddress);
}