const Handle_SEARCH_VISIT = 'SearchVisit/Handle_SEARCH_VISIT';

export const handleSearchVisit = (searchData) => ({
    type: Handle_SEARCH_VISIT,
    searchData,
});

const initialState = {
    searchData: [],
}

export default function dialog(state = initialState, action) {
    switch(action.type) {
        case Handle_SEARCH_VISIT:
            console.log('searchData : ' + action.searchData);
            return {
                ...state,
                searchData: action.searchData,
            }
        default:
            return state;
    }
}