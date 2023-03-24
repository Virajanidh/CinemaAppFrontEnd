
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { SmileFilled ,HddFilled,IdcardFilled,ContactsFilled,GoldFilled} from '@ant-design/icons';
//import { Icon } from '@ant-design/compatible';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProfileEdit from './Profile/ProfileEdit';
import MovieDashboard from './Movie/MovieDashboard';
import ReservDashboard from './Reservations/ReservDashboard';
import InventoryDashboard from './Inventory/InventoryDashboard';

const { Header, Content, Footer } = Layout;


function Home() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [current, setCurrent] = useState('movie');
  const navigate=useNavigate();

 


  const handleClick = e => {
    setCurrent(e.key);
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" >

        </div>
        <Menu
          onClick={handleClick} selectedKeys={[current]}
          theme="dark"
          mode="horizontal"
        // defaultSelectedKeys={['2']}
        // items={new Array(3).fill(null).map((_, index) => {
        //   const key = index + 1;
        //   return {
        //     key,
        //     label: `nav ${key}`,
        //   };
        // })}
        >


          <Menu.Item key="movie">
            <GoldFilled  style={{ fontSize: '22px', color: '#08c' }} />Movies</Menu.Item>
          <Menu.Item key="inventoryManagement">
            <HddFilled  style={{ fontSize: '22px', color: '#08c' }} />InventoryManagement</Menu.Item>
          <Menu.Item key="reservations">
            <ContactsFilled style={{ fontSize: '22px', color: '#08c' }} />Reservations</Menu.Item>
          <Menu.Item key="profile" >
            <IdcardFilled style={{ fontSize: '22px', color: '#08c' }} /> Profile
          </Menu.Item>
        </Menu>

      {current=="profile"? <ProfileEdit/>:null}
      {current=="movie"?<MovieDashboard/>:null}
      {current=="reservation"?<ReservDashboard/>:null}
      {current=="inventoryManagement"?<InventoryDashboard/>:null}
      
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        {/* <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
          <Breadcrumb.Item>Update</Breadcrumb.Item>
         
        </Breadcrumb> */}
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
   
        </div>
      </Content>
      
      {/* <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer> */}
    </Layout>
  );
};

export default Home;