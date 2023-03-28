import {userTypes} from '../Reducers/types';
import { signIn ,signUp,profileUpdateService ,signOut} from '../Services/UserService';
import DataHandler from '../Handlers/DataHandler';

export const UserActions = {

    userSignIn,
    userSignUp,
    profileUpdate,
    signOutAction
};

function userSignIn(username, password){
    return async dispatch => {
        try {
            const data = await signIn(username,password);
            console.log(data)
            DataHandler.setToSession('username', username);
            DataHandler.setToSession('password',password);
            dispatch(success(data));
        } catch (error) {
            console.log(error)
            dispatch(fail({error:"Credentails are invalid. Try Again"}))
        }
    };

    function success(data) {

        return {type: userTypes.SIGN_IN_SUCCESS,data}
    }
    function fail(text){
        return {type: userTypes.SIGN_IN_FAIL,text}
    }

}

function userSignUp(paramdata){
    return async dispatch => {
        try {
            const data = await signUp(paramdata);
            console.log(data)
            DataHandler.setToSession('username', paramdata.email);
            DataHandler.setToSession('password',paramdata.password);
            dispatch(success(data));
        } catch (error) {
            console.log(error)
            dispatch(fail())
        }
    };

    function success(data) {
        return {type: userTypes.SIGN_IN_SUCCESS,data}
    }
    function fail(text){
        return {type: userTypes.SIGN_UP_FAIL}
    }
}

function profileUpdate(paramdata,id){
    return async dispatch => {
        try {
            const data = await profileUpdateService(paramdata,id);
            console.log(data)
            dispatch(success(data));
        } catch (error) {
            console.log(error)
            dispatch(fail())
        }
    };

    function success(data) {
        return {type: userTypes.PROFILE_UPDATE_SUCCESS,data}
    }
    function fail(text){
        return {type: userTypes.PROFILE_UPDATE__FAIL}
    }
}
function signOutAction(){
    return async dispatch => {
        try {
            const data = await signOut();
            console.log(data)
            DataHandler.setToSession('username', "");
            DataHandler.setToSession('password', "");
            dispatch(success());
        } catch (error) {
            console.log(error)
            dispatch(fail({error:"Try Again"}))
        }
    };

    function success(data) {

        return {type: userTypes.LOGOUT}
    }
    function fail(text){
        return {type: userTypes.SIGN_IN_FAIL,text}
    }

}
