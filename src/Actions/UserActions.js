import {userTypes} from '../Reducers/types';
import { signIn ,signUp } from '../Services/UserService';

export const UserActions = {

    userSignIn,
    userSignUp
};

function userSignIn(username, password){
    return async dispatch => {
        try {
            const data = await signIn(username,password);
            console.log(data)
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
            dispatch(success(data));
        } catch (error) {
            console.log(error)
            dispatch(fail("Sign In error"))
        }
    };

    function success(data) {
        return {type: userTypes.SIGN_IN_SUCCESS,data}
    }
    function fail(text){
        return {type: userTypes.SIGN_IN_FAIL,text}
    }
}

