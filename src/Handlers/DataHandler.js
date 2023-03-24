export default class DataHandler {

    static SESSION_DATA = {
        username:'email',
        password:'password'
        // accessToken: '',
        // token_expiry: 0,
        // userID: 'userID',
        // UserEmail: 'UserEmail'
    }


    static setToSession(name, value) {
        sessionStorage.setItem(name, value);
    }

    static getFromSession(name) {
        return sessionStorage.getItem(name);
    }

    static removeFromSession(name) {
        return sessionStorage.removeItem(name);
    }

    static clearSession() {
        sessionStorage.clear();
    }
}