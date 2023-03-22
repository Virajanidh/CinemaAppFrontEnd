import {userTypes} from './types'; 
const initialState = {
  userInfomation:{},
  isSignIn :false,
  signInError:"",
};

const UserReducer = (state = initialState, action)=> {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isSignIn : true,
        userInfomation:action.data,
        signInError:""
        
      };
    
    case userTypes.SIGN_OUT:
      return {
        ...state,
        isSignIn : false,
        userInfomation : {},
        signInError:""
        
      };
    case userTypes.SIGN_IN_FAIL:
        return{
            ...state,
            isSignIn : false,
            userInfomation : {},
            signInError:"Credentails are invalid. Try Again"
        }
    default:
      return state;
  }
}
 export default UserReducer;