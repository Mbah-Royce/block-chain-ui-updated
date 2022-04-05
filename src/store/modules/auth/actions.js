import axiosInstance from "../../../../services/AxiosInterceptor";
import {
    SET_USER_TOKEN_MUTATION,
    CREATE_WALLET_ACTION,
    AUTO_LOGIN_ACTION,
    ACCESS_WALLET,
    LOGOUT_ACTION,
    TRANSATION_SUBMIT,
    GET_USER_INFO,
    UPDATE_AREA,
    ISSUE_CERTIFICATE,
    SET_USER_DATA_MUTATION
} from "../../StoreConstants";
// import elliptic from 'elliptic';

export default {
    async [TRANSATION_SUBMIT](context, payload) {
        var EC = require("elliptic").ec;
        var ec = new EC("secp256k1");
        var keypair = ec.genKeyPair();
        payload.message;
        payload.senderPub;
        payload.receiverPub;
        var signature = keypair.sign(payload.message).toDER();
        // console.log(keypair.verify(payload.message, signature));
        let postData = {
            amount: payload.area,
            reciever: payload.reciever,
            sender: payload.sender,
            signature: signature.toString("hex"),
            type: payload.type,
            serial_no: payload.serial_no,
            area: payload.area,
            partitionId: payload.partitionId
        };
        console.log(postData);
        await axiosInstance
            .post("user/transaction", postData)
            .then((response) => {
                if (response.status === 201) {
                    console.log(response.data.data);
                }
                console.log(response);
            })
            .catch((error) => {
                console.log(error.response);
                throw error;
            });
    },
    async [LOGOUT_ACTION](context) {
        let tokenData = {
            pubKey: null,
            user_id: null,
            prvKey: null,
            area: null
        };
        context.commit(SET_USER_TOKEN_MUTATION, { token: null });
        context.commit(SET_USER_DATA_MUTATION, tokenData);
        localStorage.removeItem("userData");
        localStorage.removeItem("userToken");
    },
    async [ACCESS_WALLET](context, payload) {
        let postData = {
            public_key: payload.publicKey,
            private_key: payload.privateKey
        };
        await axiosInstance
            .post("user/login", postData)
            .then((response) => {
                if (response.status === 200) {
                    let userData = {
                        pubKey: response.data.data.publicKey,
                        user_id: response.data.data.id,
                        prvKey: response.data.data.privateKey,
                        area: response.data.data.area,
                        name: response.data.data.name,
                        role: response.data.data.role
                    };
                    let userToken = {
                        token: response.data.data.token
                    };
                    context.commit(SET_USER_TOKEN_MUTATION, { token: response.data.data.token });
                    context.commit(SET_USER_DATA_MUTATION, userData);
                    localStorage.setItem("userData", JSON.stringify(userData));
                    localStorage.setItem("userToken", JSON.stringify(userToken));
                }
                if (response.status === 422) {
                    throw response;
                }
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                throw error.response.data.errors;
            });
    },
    async [CREATE_WALLET_ACTION](context, payload) {
        var EC = require("elliptic").ec;
        var ec = new EC("secp256k1");
        var keypair = ec.genKeyPair();
        var prv = keypair.getPrivate("hex");
        var pub = keypair.getPublic("hex");
        // var prvKey = BigInt(prv, 16).toString();
        var pubKey = pub;
        let postData = {
            email: payload.email,
            name: payload.name,
            public_key: pubKey,
            private_key: prv,
        };
        await axiosInstance
            .post("user/register", postData)
            .then((response) => {
                if (response.status === 201) {
                    let userData = {
                        pubKey: response.data.data.publicKey,
                        user_id: response.data.data.id,
                        prvKey: response.data.data.privateKey,
                        area: response.data.data.area,
                        name: response.data.data.name,
                        role: response.data.data.role
                    };
                    let userToken = {
                        token: response.data.data.token
                    };
                    context.commit(SET_USER_TOKEN_MUTATION, { token: response.data.data.token });
                    context.commit(SET_USER_DATA_MUTATION, userData);
                    localStorage.setItem("userData", JSON.stringify(userData));
                    localStorage.setItem("userToken", JSON.stringify(userToken));
                }
                console.log(response.data.data);
            })
            .catch((error) => {
                console.log(error.response);
                throw error.response.data.errors;
            });
    },
    [AUTO_LOGIN_ACTION](context) {
        let userDataString = localStorage.getItem("userData");
        let userTokenString = localStorage.getItem("userToken");
        if (userDataString && userTokenString) {
            let userData = JSON.parse(userDataString);
            let userToken = JSON.parse(userTokenString);
            context.commit(SET_USER_TOKEN_MUTATION, userToken);
            context.commit(SET_USER_DATA_MUTATION, userData)
        }
        // if(userTokenString){

        // }
    },
    async [GET_USER_INFO](context) {
        await axiosInstance.get("user/info")
            .then((response) => {
                console.log(response.data.data)
                if (response.status === 200) {
                    let userData = {
                        pubKey: response.data.data.publicKey,
                        user_id: response.data.data.id,
                        prvKey: response.data.data.privateKey,
                        area: response.data.data.area,
                        name: response.data.data.name
                    };
                    context.commit(SET_USER_DATA_MUTATION, userData);
                    localStorage.removeItem("userData");
                    localStorage.setItem("userData", JSON.stringify(userData));
                    context.commit(UPDATE_AREA, { area: response.data.data.area })
                    localStorage.key
                }
            }).catch((error) => {
                console.log(error.response)
            })
    },

    async [ISSUE_CERTIFICATE](context, payload) {
        var EC = require("elliptic").ec;
        var ec = new EC("secp256k1");
        var keypair = ec.genKeyPair();
        var signature = keypair.sign(payload.message).toDER();
        let postData = {
            reciever: payload.reciever,
            sender: payload.sender,
            location: payload.location,
            area: payload.area,
            signature: signature.toString("hex"),
        };
        console.log(postData);
        await axiosInstance.post("user/certificate", postData)
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error.response)
                throw error
            })
    }


};