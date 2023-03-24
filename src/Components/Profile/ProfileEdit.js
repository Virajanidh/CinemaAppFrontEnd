import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Welcomeheader from "../Headers/WelcomeHeader";
import { UserActions } from '../../Actions/UserActions';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch ,useSelector} from "react-redux";

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
    Typography
} from 'antd';
import SignIn from '../SignIn';
import Home from '../Home';

const { RangePicker } = DatePicker;
const { Text } = Typography;
const { TextArea } = Input;
const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100vh'
};

const cityList = ["Colombo", "Kandy", "Galle", "Jaffna", "Anuradhapura", "Badulla", "Batticaloa", "Hambantota", "Kalutara", "Kegalle", "Kilinochchi", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"];



function ProfileEdit() {

    const { isSignIn, signInError,userInfomation } = useSelector((state) => state.user)
    const initialValues = {
        name: userInfomation.name,
        password: '',
        email: userInfomation.email,
        selectedCity:userInfomation.city,
        noOfSeats:userInfomation.totalSeats

      };

  //  const [noOfSeats, setNoOfSeats] = useState(null);
    //const [selectedCity, setSelectedCity] = useState(null);
    const [name, setName] = useState(userInfomation.name);
    const [password, setPassword] = useState(userInfomation.password);
    const [email, setEmail] = useState(userInfomation.email);

    console.log(name,password,email)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const seatNo = [...new Array(10001)]
        .map((each, index) => ({ label: index, value: index }));

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = (values) => {
        const data =
        {
            name: name,
            totalSeats: parseInt(values.noOfSeats),
            password: password,
            email: email,
            city: values.selectedCity
        }
        console.log(data)
        dispatch(UserActions.profileUpdate(data,userInfomation.cinemaId))
    

    }

    const validatePositiveInteger = (rule, value, callback) => {
        if (value && !/^[1-9]\d*$/.test(value)) {
          callback('Please enter a positive integer');
        } else {
          callback();
        }
      };

    

   
    return (
        <>
        
            
            <div style={cardContainerStyle}>
                <Space direction="vertical" size={30} align="center">

                    <Card
                        title="Update Your details"
                        
                        style={{
                            width: 1000,
                            xs: {
                                width: 1000
                            }
                        }}

                    >
                        <div>
                            <Form
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"

                                style={{ maxWidth: 800 }}
                                initialValues={initialValues}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"

                            >

                                <Form.Item
                                    label="Cinema hall name"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your cinema hall name!',
                                        },
                                    ]}
                                >
                                    <Input value={name}
                                        onChange={(e) => setName(e.target.value)}/>
                                </Form.Item>

                                
                                <Form.Item 
                                label="Total Number of seats available"
                                name="noOfSeats"
                                    rules={[{
                                        required:true,
                                        validator: validatePositiveInteger,
                                    }]}

                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item 
                                label="City"
                                name="selectedCity"
                                rules={[{
                                   required:true,
                                    message: 'Please select a location!'
                                }]}>
                                    <Select id="city"
                                        // value={selectedCity}
                                        // onChange={(e) => setSelectedCity(e.target.value)}
                                        >
                                        
                                        {cityList.map((city) => (
                                            <Select.Option key={city} value={city}>
                                                {city}
                                            </Select.Option>))}


                                    </Select>
                                </Form.Item>

                                <Form.Item 
                                label="Email"
                                name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input the Email address!',
                                        },
                                    ]}
                                >
                                    <Input value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </Form.Item >

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </Form.Item>





                                <Form.Item label="Upload" valuePropName="fileList">
                                    <Upload action="/upload.do" listType="picture-card">
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    </Upload>
                                </Form.Item>

                                <Form.Item label="Button">
                                    <Button type="primary" htmlType="submit" >
                                        Update
                                    </Button>
                                </Form.Item>
                                {signInError ? <Text wrapperCol={{
                    offset: 8,
                    span: 16,
                  }} type="danger">{signInError}</Text> : null}
                            </Form>

                        </div>
                    </Card>
                    =
                </Space>
            </div>
        </>
    );
};

export default ProfileEdit;


