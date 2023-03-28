import { Layout, Space } from 'antd';
import { Button, Col, Divider, Row, Modal, Card } from "antd";
import { PlusSquareOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { SeatActions } from '../../Actions/SeatActions';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Bookings from './assests/Bookings';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  // textAlign: 'left',
  color: '#C3E6E3',
  height: 64,
  paddingInline: 30,
  lineHeight: '64px',
  backgroundColor: '#3c4452',
};
const contentStyle = {
  // textAlign: 'left',
  fontSize: 20,
  minHeight: 120,
  //lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#FFFFFF',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#1A57BF',
  backgroundColor: '#FFFFFF',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#FFFFFF',
};
function ReservDashboard() {

  const [isModalVisible, setIsModalVisible] = useState(false)
  const { isSignIn, signInError, userInfomation } = useSelector((state) => state.user)
  const [seats,setSeats]=useState([])

  const handleAddSeats = () => {
    setIsModalVisible(true)
  }
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(SeatActions.getBookingAction(userInfomation.cinemaId))
}, []);


  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
      size={[0, 48]}
    >

      <Layout>
        <Header style={headerStyle}>Manage your inventory</Header>
        <Layout>
          <Sider style={siderStyle}>
            

          </Sider>
          <Content style={contentStyle}>
            

            <Bookings />

          </Content>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Space>

  );
}
export default ReservDashboard;