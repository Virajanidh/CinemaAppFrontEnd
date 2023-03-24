import {userTypes} from './types'; 
const initialState = {
  userInfomation:{},
  isSignIn :false,
  signInError:"",
  password:"",
  updateError:''
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
      case userTypes.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        userInfomation:action.data,
        signInError:"",

        
      };
      case userTypes.PROFILE_UPDATE__FAIL:
        return {
          ...state,
          updateError:"Can not update"
          
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
    case userTypes.SIGN_UP_FAIL:
      return{
        ...state,
        isSignIn : false,
        userInfomation : {},
        signInError:"Email address already exists."
      }
    default:
      return state;
  }
}
 export default UserReducer;