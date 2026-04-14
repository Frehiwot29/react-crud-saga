import {SUBMIT_TRAVELER_FFAILURE,SUBMIT_TRAVELER_REQUEST,SUBMIT_TRAVELER_SUCCESS,FETCH_ANNOUNCEMENT_FAILURE,FETCH_ANNOUNCEMENT_REQUEST,FETCH_ANNOUNCEMENT_SUCCESS} from "./constants";
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
export const fetchAnnouncementRequest = () => ({
  type: FETCH_ANNOUNCEMENT_REQUEST,
});

export const fetchAnnouncementSuccess = (announcement) => ({
  type: FETCH_ANNOUNCEMENT_SUCCESS,
  payload: announcement,
});

export const fetchAnnouncementFailure = (error) => ({
  type: FETCH_ANNOUNCEMENT_FAILURE,
  payload: error,
});
