import { SET_USER_TOKEN_MUTATION, UPDATE_AREA, SET_USER_DATA_MUTATION } from "../../StoreConstants";

export default {
    [SET_USER_TOKEN_MUTATION](state, payload) {
        state.pubKey = payload.pubKey;
        state.prvKey = payload.prvKey;
        state.area = payload.area;
        state.user_id = payload.user_id;
        state.token = payload.token;
        state.role = payload.role;

    },
    [UPDATE_AREA](state, payload) {
        state.area = payload.area;
    },
    [SET_USER_DATA_MUTATION](state, payload) {
        state.pubKey = payload.pubKey;
        state.prvKey = payload.prvKey;
        state.area = payload.area;
        state.user_id = payload.user_id;
        state.name = payload.name;
        state.role = payload.role;
    }
};