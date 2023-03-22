import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import Welcomeheader from "../Headers/WelcomeHeader";
import { UserActions } from '../../Actions/UserActions';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

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
    Tag
} from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // width:'100vh'
    //height: '70vh' // optional - set the height of the container to the viewport height
};

const cityList = ["Colombo", "Kandy", "Galle", "Jaffna", "Anuradhapura", "Badulla", "Batticaloa", "Hambantota", "Kalutara", "Kegalle", "Kilinochchi", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"];



function SignUp() {

    const [noOfSeats, setNoOfSeats] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const dispatch=useDispatch();
    const navigate=useNavigate();


    const seatNo = [...new Array(10001)]
        .map((each, index) => ({ label: index, value: index }));

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = () => {
        const data=
            {
                name:name,
                totalSeats:parseInt(noOfSeats),
                password: password,
                email:email,
                city:selectedCity
            }
        console.log(data)
        dispatch(UserActions.userSignUp(data))
        navigate("/home")

    }

    

    const validateInteger = (rule, value, callback) => {
        if (value && !Number.isInteger(Number(value))) {
            onFinishFailed('Please enter an integer');
        } else {
            callback();
        }
    }

    const handleSeatsAvailableChange=(value)=>{
setNoOfSeats(value)
console.log(value)
    }

    return (
        <>
            <div>
                <Welcomeheader />
            </div>
            <div style={cardContainerStyle}>
                <Space direction="vertical" size={30} align="center">

                    <Card
                        title="Register"
                        extra={<a href="/">Login</a>}
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

                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"

                            >

                                <Form.Item label="Cinema hall name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input the name!',
                                        },
                                    ]}
                                >
                                    <Input value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                </Form.Item >
                                <Form.Item label="Total Number of seats available"
                                    rules={[{
                                        validator: validateInteger.apply,
                                        message: 'Please input a number!'
                                    }]}
                                     
                                >
                                    <Input  onChange={(e) => setNoOfSeats(e.target.value)}  />
                                </Form.Item>
                                <Form.Item label="City">
                                    <Select id="city"
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}>
                                        <Select.Option value="">Select a city</Select.Option>
                                        {cityList.map((city) => (
                                            <Select.Option key={city} value={city}>
                                                {city}
                                            </Select.Option>))}


                                    </Select>
                                </Form.Item>

                                <Form.Item label="Email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input the name!',
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
                                        Register
                                    </Button>
                                </Form.Item>
                            </Form>

                        </div>
                    </Card>
                    =
                </Space>
            </div>
        </>
    );
};

export default SignUp;


