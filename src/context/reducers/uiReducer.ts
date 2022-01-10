import { saveItem } from "../../helpers/storageHelpers";
import {
    SET_AVATAR_SEED,
    SET_DARK_MODE,
    SET_LOADING,
    SET_LOADING_TEXT,
    TOGGLE_CONTACT_MODAL
}

    from "../actions";

interface UiReducer {
    type: string;
    payload: any;
}

interface State {
    avatarSeed: string;
    darkMode: boolean;
    isLoading: boolean;
    loadingText: string;
    isError: boolean;
    

}


export const uiReducer = (state: State, action: UiReducer) => {

    switch (action.type) {
        case SET_AVATAR_SEED:
            saveItem("AvSeed", action.payload);
            return {
                ...state,
                avatarSeed: action.payload
            }

        case SET_DARK_MODE:
            return {
                ...state,
                darkMode: !state.darkMode
            }

        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case SET_LOADING_TEXT:
            return {
                ...state,
                loadingText: action.payload
            }

        case TOGGLE_CONTACT_MODAL:
            return {
                ...state,
                contactModal: action.payload
            }
        default: return state;

    }
}