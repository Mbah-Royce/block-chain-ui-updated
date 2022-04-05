export default class SignupValidations {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    static getErrorMessageFromResponse(error) {
        let message = [];
        switch (error.response.status) {
            case 422:
                {
                    if (error.response.data.errors) {
                        let err = error.response.data.errors;
                        let keys = Object.keys(err);
                        keys.forEach((key, index) => {
                            message[index] = err[key];
                        });
                    } else {
                        let err = error.response.data;
                        message[0] = err;

                    }
                    break;
                }
            case 500:
                {
                    message[0] = ["Unexpected Error"];
                    break;
                }
            default:
                {
                    return message[0] = "Uxpected Error";
                }
        }
        return message;
    }
}