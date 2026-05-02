// address.actions.js
import {
    ADD_ADDRESS,
    EDIT_ADDRESS,
    DELETE_ADDRESS,
    SET_ADDRESSES,
    SET_LAST_ADDRESS
} from './address.constants';

export const addAddress = (address) => ({
    type: ADD_ADDRESS,
    payload: address
});

export const editAddress = (address) => ({
    type: EDIT_ADDRESS,
    payload: address
});

export const deleteAddress = (id) => ({
    type: DELETE_ADDRESS,
    payload: id
});

export const setAddresses = (addresses) => ({
    type: SET_ADDRESSES,
    payload: addresses
});

export const setLastAddress = (address) => ({
    type: SET_LAST_ADDRESS,
    payload: address
});