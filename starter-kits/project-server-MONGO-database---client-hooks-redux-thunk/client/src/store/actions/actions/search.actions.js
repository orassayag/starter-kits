import { searchTypes } from '../types';

export const setSearchValue = (fieldName, fieldValue) => {
    return {
        type: searchTypes.SEARCH_SET_SEARCH_VALUE,
        fieldName: fieldName,
        fieldValue: fieldValue
    };
};

export const setLeaveSearch = () => {
    return {
        type: searchTypes.SEARCH_SET_LEAVE_SEARCH
    };
};