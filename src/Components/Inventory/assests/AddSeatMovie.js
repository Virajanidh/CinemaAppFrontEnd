import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
    Upload,
    Card, Space,
    Tag,
    Typography,
    Calendar,
    Alert,
    Table
} from 'antd';
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { SeatActions } from '../../../Actions/SeatActions';


const { Text } = Typography;
const { TextArea } = Input;

function AddSeatMovie() {


    const [dataSource, setDataSource] = useState([
        {
          key: '1',
          type: 'BALCONY',
          noOfSeats: 0,
          price: 0,
          noOfSeatsError: false,
        },
        {
          key: '2',
          type: 'MIDDLE',
          noOfSeats: 0,
          price: 0,
          noOfSeatsError: false,
        },
        {
          key: '3',
          type: 'LOWER',
          noOfSeats: 0,
          price: 0,
          noOfSeatsError: false,
        },
      ]);
    const [releaseDate, setReleaseDate] = useState("");
    const [showArray, setShowArray] = useState([]);
    const [showTimeArray, setShowTimeArray] = useState([]);
      // const [duration, setDuration] = useState(null);
    const { isSignIn, signInError, userInfomation } = useSelector((state) => state.user)
    const { allMovies } = useSelector((state) => state.movie)
    const [isVisibleAlert,setIsVisibleAlert]=useState([false])
    const errorMsg="Total number of allocations can not exceed your total numbers of seats.(Your total number of seats:"+userInfomation.totalSeats+")"
console.log(isVisibleAlert)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSeatChange = (value, key) => {
        const newData = [...dataSource];
        const index = newData.findIndex(item => key === item.key);
        newData[index].noOfSeats = value;
        newData[index].noOfSeatsError = !Number.isInteger(value); // Check if input is an integer
        setDataSource(newData);
      };

    const handlePriceChange = (value, key) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, price: value });
        setDataSource(newData);
    };

    const columns = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'No. of Seats',
            dataIndex: 'noOfSeats',
            key: 'noOfSeats',
            render: (text, record) => (
                <InputNumber
                    min={1}
                   // max={100}
                    step={1}
                    defaultValue={text}
                    onChange={(value) => handleSeatChange(value, record.key)}
                    formatter={(value) => { // Use formatter prop to check if input is an integer
                        if (record.noOfSeatsError) {
                          return 'Numbers only';
                        }
                        return value;
                      }}
                />
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => (
                <InputNumber
                    min={0}
                    //max={10000}
                    step={1}
                    defaultValue={text}
                    formatter={(value) => `$ ${value}`}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={(value) => handlePriceChange(value, record.key)}
                />
            ),
        },
    ];


    const seatNo = [...new Array(10001)]
        .map((each, index) => ({ label: index, value: index }));

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = (values) => {
        console.log(values)
        console.log(dataSource)
        var array={}
        var totalSeatSelected=dataSource[0].noOfSeats+dataSource[1].noOfSeats+dataSource[2].noOfSeats;
        if(totalSeatSelected>userInfomation.totalSeats){
            setIsVisibleAlert(true);
            console.log()
        }
        else {
            setIsVisibleAlert(false)
            console.log(dataSource[0]['key'])
            // for(var i=0;i<3;i++){
            //     var newlist=[]
            //     newlist[0]=dataSource[i][1]
            //     newlist[1]=dataSource[i][2]
            //     newlist[2]=dataSource[i][3] 
            //     array[i]=newlist
            // }
            // console.log(array)
            var paramData ={
                movieId: values.movieId,
                cinemaId:userInfomation.cinemaId,
                seatDetails : dataSource
            }
            dispatch(SeatActions.addSeat(paramData))
            dispatch(SeatActions.getSeat(userInfomation.cinemaId))
        }
    }

 
    return (
        <div>


            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"

                style={{ maxWidth: 800 }}

                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"

            >
                <Form.Item
                    label="Movie"
                    name="movieId"
                    rules={[{
                        required: true,
                        message: 'Please select a Movie!'
                    }]}>
                    <Select id="movieId"
                    // value={selectedCity}
                    // onChange={(e) => setSelectedCity(e.target.value)}
                    >

                        {allMovies.map((movie) => (
                            <Select.Option key={movie.title} value={movie.movieId}>
                                {movie.title}
                            </Select.Option>))}


                    </Select>
                </Form.Item>

                <Form.Item
                label="Allocate seats"
                name="seatAllocate"
                >
                    <Table dataSource={dataSource} columns={columns} size="small"/>
                </Form.Item>

                <Form.Item label="Button">
                    <Button type="primary" htmlType="submit" >
                        Add
                    </Button>
                </Form.Item>
                
                {isVisibleAlert && <Alert message={errorMsg}  n />  }
                
                
            </Form>


        </div>
    )
}
export default AddSeatMovie;