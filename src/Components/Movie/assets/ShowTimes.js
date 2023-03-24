import { Calendar, Col, Radio, Row, Select, Typography, theme, Alert, TimePicker, Form, Button ,Space} from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useState } from 'react';
import dayLocaleData from 'dayjs/plugin/localeData';
dayjs.extend(dayLocaleData);





function ShowTimes(props) {

    const { token } = theme.useToken();
    const [date, setDate] = useState(new Date());
    const [oneshow,setOneshow]=useState(null);
    const [showArray,setShowArray]=useState([])


    const handleShowtime =(time, timeString)=>{
        console.log('Selected Time:', time);
        console.log('Formatted Time:', timeString);
        setOneshow(timeString)
    }

    const addShow=()=>{
        
        const newArray = [...showArray, oneshow];
        setShowArray(newArray)
        console.log(showArray)
    }

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
        setDate(value.format('YYYY-MM-DD'));
       // props.onDateChange(value.format('YYYY-MM-DD'));

    };
    const addShowDate=()=>{
        const passData={
             date:date,
             showTimeArray:showArray
         }
        
        props.onDateChange(oneshow) 

    }
    const onFinish = (values) => {
        console.log(values.showTime)

    }
    const onFinishFailed=()=>{
        console.log("erro")
    }
    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };
    return (
        <div style={wrapperStyle}>
            
            
                    <TimePicker.RangePicker onChange={handleShowtime} />
                
                    
                    {/* <Space wrap>
    <TimePicker use12Hours onChange={onChange} />
    <TimePicker use12Hours format="h:mm:ss A" onChange={onChange} />
    <TimePicker use12Hours format="h:mm a" onChange={onChange} />
  </Space> */}
                    <div>
                    <Button onClick={addShowDate} >
                                            Add show 
                                        </Button>
                    </div>
                   
                
        </div>
    );
};
export default ShowTimes;
