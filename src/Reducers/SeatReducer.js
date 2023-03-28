import {seatTypes} from './types'; 
const initialState = {
  seatInfo:[],
  seatAllo:[
],
  booking:[

  ]
};

const SeatReducer = (state = initialState, action)=> {
  switch (action.type) {
    case seatTypes.SEAT_INFO:
      return {
        ...state,
        seatInfo:action.data
        
      };
      case seatTypes.SEAT_ALLOCATION:
        return {
          ...state,
          seatAllo:action.data
          
        };
      case seatTypes.BOOKING:
        return{
          ...state,
          booking:action.data

        }
     
    
    default:
      return state;
  }
}
 export default SeatReducer;