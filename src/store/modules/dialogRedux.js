const Handle_ACTION_DIALOG = 'ActionDialog/Handle_ACTION_DIALOG'; // add, update
const CANCEL_ACTION_DIALOG = 'ActivateDialog/CANCEL_DIALOG';

export const handleActionDialog = (rowData, type_, action) => ({
    type: Handle_ACTION_DIALOG,
    rowData,
    type_,
    action
});

export const cancelActionDialog = (closeActionDialog) => ({
    type: CANCEL_ACTION_DIALOG,
    closeActionDialog
});

const initialState = {
    closeActionDialog: null,
    rowData: [],
    type_: '',
    action: ''
}

export default function dialog(state = initialState, action) {
    switch(action.type) {
        case Handle_ACTION_DIALOG:
            console.log('rowData : ' + action.rowData);
            return {
                ...state,
                rowData: action.rowData,
                type: action.type_,
                action: action.action
            }
        case CANCEL_ACTION_DIALOG:
            // console.log('cancelDialog : ' + action.closeActionDialog);
            return {
                ...state,
                closeActionDialog: action.closeActionDialog
            }
        default:
            return state;
    }
}