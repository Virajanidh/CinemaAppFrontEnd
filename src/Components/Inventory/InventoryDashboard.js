import { Layout, Space } from 'antd';
import { Button, Col, Divider, Row, Modal, Card } from "antd";
import { PlusSquareOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AddSeatMovie from './assests/AddSeatMovie';
import SeatDetails from './assests/SeatDetails';
import { SeatActions } from '../../Actions/SeatActions';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import EditSeatDetails from './assests/EditSeatDetails';
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
  backgroundColor: '#99a2b2',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#FFFFFF',
};
function InventoryDashboard() {

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditVisible, setEditVisible] = useState(false)
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
  const handleEdit =()=>{
    setEditVisible(true);
  }

  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(SeatActions.getSeat(userInfomation.cinemaId))
});


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
            <div >
              {/* <PlusSquareOutlined style={{ fontSize: '22px', color: '#08c' }} /> */}
              <Button type="primary" style={{color:"black"}} ghost onClick={handleAddSeats}>
                Add seat details
              </Button>
              
            </div>
            <div>
              {/* <EditOutlined style={{ fontSize: '22px', color: '#08c' ,paddingInline: '5' }} /> */}
              <Button type="primary" style={{color:"black"}} ghost onClick={handleEdit}>
                Edit seat details
              </Button>
              </div>

          </Sider>
          <Content style={contentStyle}>
            <Modal
              title="Allocate seats"
              visible={isModalVisible}
              onCancel={handleModalCancel}
              //onOk={handleModalOk}
              footer={null} 
            >
              <AddSeatMovie />
            </Modal>
{isEditVisible ?<EditSeatDetails/>:<SeatDetails />}


          </Content>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Space>

  );
}
export default InventoryDashboard;