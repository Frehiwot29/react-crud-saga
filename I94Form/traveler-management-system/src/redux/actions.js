import {SUBMIT_TRAVELER_FFAILURE,SUBMIT_TRAVELER_SUCCESS,SUBMIT_TRAVELER_REQUEST} from './constants';

export const submitTravelerRequest = (travelerData) => ({
  type: SUBMIT_TRAVELER_REQUEST,
  payload: travelerData
});

export const submitTravelerSuccess = (travelerData) => ({
  type: SUBMIT_TRAVELER_SUCCESS,
  payload: travelerData
});

export const submitTravelerFailure = (error) => ({
  type: SUBMIT_TRAVELER_FFAILURE,
  payload: error
});
