import { seatTypes } from "../Reducers/types";
import { addSeatService,getSeatDetails,getBookingDetails,editSeatService,editSeatPriceService } from "../Services/SeatService";
export const SeatActions = {

    addSeat,
    getSeat,
    getBookingAction,
    updateSeatData,
    updateSeatPriceData
};
function addSeat(paramdata){
    return async dispatch => {
        try {
            const data = await addSeatService(paramdata);
            console.log(data)
            dispatch(success(data));
        } catch (error) {
            console.log(error)
            
        }
    };

    function success(data) {
        return {type: seatTypes.SEAT_INFO,data}
    }
    
}
function getSeat(id){
    return async dispatch => {
        try {
            const data = await getSeatDetails(id);
            console.log(data)
            dispatch(success(data));
        } catch (error) {
            console.log(error)
            
        }
    };

    function success(data) {
        return {type: seatTypes.SEAT_ALLOCATION,data}
    }
    
}
function getBookingAction(id){
    return async dispatch => {
        try {
            const data = await getBookingDetails(id);
            console.log(data)
            dispatch(success(data));
        } catch (error) {
            console.log(error)
            
        }
    };

    function success(data) {
        return {type: seatTypes.BOOKING,data}
    }
    
}

function updateSeatData(paramdata,id){
    return async dispatch => {
        try {
            const data = await editSeatService(paramdata,id);
            console.log(data)
          //  dispatch(success(data));
        } catch (error) {
            console.log(error)
            
        }
    };

    function success(data) {
        return {type: seatTypes.BOOKING,data}
    }
}
function updateSeatPriceData(paramdata,id){
    return async dispatch => {
        try {
            const data = await editSeatPriceService(paramdata,id);
            console.log(data)
          //  dispatch(success(data));
        } catch (error) {
            console.log(error)
            
        }
    };

    function success(data) {
        return {type: seatTypes.BOOKING,data}
    }
}

