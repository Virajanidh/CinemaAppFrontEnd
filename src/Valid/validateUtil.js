export default function validateInteger (rule, value, callback){
    if (isInDesiredForm(value)) {
        
        callback('Please enter an integer');
    } else {
        console.log("hello")
        callback();
    }
}



const isInDesiredForm=(str) =>{
    return /^\+?(0|[1-9]\d*)$/.test(str);
}