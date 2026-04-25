import {CREATE_I94_FAILURE,CREATE_I94_REQUEST,CREATE_I94_SUCCESS} from './types';

export const createI94Request = (payload) => ({
    type: CREATE_I94_REQUEST,
    payload
});

export const createI94Success = (record) => ({
    type: CREATE_I94_SUCCESS,
    payload: record
});

export const createI94Failure = (error) => ({
    type: CREATE_I94_FAILURE,
    payload: error
});

export const createI94 = (formData) => {
    return async (dispatch) => {
        dispatch(createI94Request(formData));
        try {
            // Simulate API call with a timeout
            const response = await new Promise((resolve) =>
                setTimeout(() => resolve({ data: { message: 'I-94 created successfully!' } }), 1000)
            );
            dispatch(createI94Success(response.data));
        } catch (error) {
            dispatch(createI94Failure('Failed to create I-94. Please try again.'));
        }
    };
}