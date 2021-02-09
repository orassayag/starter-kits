import { formTypes } from '../types';

export const setForm = (fieldName, fieldValue) => {
    return {
        type: formTypes.FORM_SET_FORM_SUCCESS,
        fieldName: fieldName,
        fieldValue: fieldValue
    };
};

export const setFormStatus = (errorFieldName, statusMessage) => {
    return {
        type: formTypes.FORM_SET_FORM_STATUS_SUCCESS,
        errorFieldName: errorFieldName,
        statusMessage: statusMessage
    };
};

export const setLeaveForm = () => {
    return {
        type: formTypes.FORM_SET_FORM_LEAVE_SUCCESS
    };
};

export const setInitExistsForm = (movie) => {
    return {
        type: formTypes.FORM_INIT_EXISTS_FORM_SUCCESS,
        movie: movie
    };
};