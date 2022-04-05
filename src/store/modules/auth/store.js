import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
export default {
    namespaced: true,
    state() {
        return {
            pubKey: "",
            user_id: "",
            prvKey: "",
            token: "",
            area: "",
            name: "",
            role: "",
        };
    },
    mutations,
    getters,
    actions,
};