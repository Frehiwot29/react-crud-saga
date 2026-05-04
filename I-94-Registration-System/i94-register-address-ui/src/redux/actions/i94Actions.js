// actions/i94Actions.js
import  { I94_ACTION_TYPES } from '../constants/i94Contants';

export const fetchRecords = () => ({
  type: I94_ACTION_TYPES.FETCH_RECORDS_REQUEST
});

export const fetchRecordsSuccess = (records) => ({
  type: I94_ACTION_TYPES.FETCH_RECORDS_SUCCESS,
  payload: records
});

export const fetchRecordsFailure = (error) => ({
  type: I94_ACTION_TYPES.FETCH_RECORDS_FAILURE,
  payload: error
});

export const createRecord = (recordData) => ({
  type: I94_ACTION_TYPES.CREATE_RECORD_REQUEST,
  payload: recordData
});

export const createRecordSuccess = (record) => ({
  type: I94_ACTION_TYPES.CREATE_RECORD_SUCCESS,
  payload: record
});

export const createRecordFailure = (error) => ({
  type: I94_ACTION_TYPES.CREATE_RECORD_FAILURE,
  payload: error
});

export const updateRecord = (id, recordData) => ({
  type: I94_ACTION_TYPES.UPDATE_RECORD_REQUEST,
  payload: { id, recordData }
});

export const updateRecordSuccess = (record) => ({
  type: I94_ACTION_TYPES.UPDATE_RECORD_SUCCESS,
  payload: record
});
export const fillFormWithPreviousAddress = (addressData) => ({
  type: I94_ACTION_TYPES.FILL_FORM_WITH_PREVIOUS_ADDRESS,
  payload: addressData
});

export const updateRecordFailure = (error) => ({
  type: I94_ACTION_TYPES.UPDATE_RECORD_FAILURE,
  payload: error
});

export const deleteRecord = (id) => ({
  type: I94_ACTION_TYPES.DELETE_RECORD_REQUEST,
  payload: id
});

export const deleteRecordSuccess = (id) => ({
  type: I94_ACTION_TYPES.DELETE_RECORD_SUCCESS,
  payload: id
});

export const deleteRecordFailure = (error) => ({
  type: I94_ACTION_TYPES.DELETE_RECORD_FAILURE,
  payload: error
});

export const setEditingRecord = (record) => ({
  type: I94_ACTION_TYPES.SET_EDITING_RECORD,
  payload: record
});

export const clearEditingRecord = () => ({
  type: I94_ACTION_TYPES.CLEAR_EDITING_RECORD
});

// Address reuse actions
export const setPreviousAddress = (addressData) => ({
  type: I94_ACTION_TYPES.SET_PREVIOUS_ADDRESS,
  payload: addressData
});

export const usePreviousAddress = () => ({
  type: I94_ACTION_TYPES.USE_PREVIOUS_ADDRESS
});

export const clearPreviousAddress = () => ({
  type: I94_ACTION_TYPES.CLEAR_PREVIOUS_ADDRESS
});