import React from "react";
import { Button, Checkbox, Form, Input, Typography, Card, Space } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { UserActions } from "../../Actions/UserActions";
import { useSelector } from "react-redux";
import Home from "../Home";

const { Text } = Typography;

function SignIn() {

  const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh' // optional - set the height of the container to the viewport height
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSignIn, signInError } = useSelector((state) => state.user)

  const onFinish = (values) => {
    console.log(values.username, ":", values.password)
    dispatch(UserActions.userSignIn(values.username, values.password))
  };
  if (isSignIn) {
    // navigate('/home')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (!isSignIn) {

    return (

      <div style={cardContainerStyle}>
        <Space direction="vertical" size={30} align="center">

          <Card
            title="Login"
            extra={<a href="/signup">Create Account</a>}
            style={{
              width: 400,
              xs: {
                width: 1000
              }
            }}

          >
            <div>


              <div>
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="on"

                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

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
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit" >
                      Sign In
                    </Button>
                  </Form.Item>
                  {signInError ? <Text wrapperCol={{
                    offset: 8,
                    span: 16,
                  }} type="danger">{signInError}</Text> : null}
                </Form >

              </div>


            </div>
          </Card>

        </Space>
      </div>



    );

  }
  else {
    return <div>
      <Home />
    </div>
  }

}


export default SignIn;
