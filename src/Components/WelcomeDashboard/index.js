import SignIn from "../SignIn";
import Welcomeheader from "../Headers/WelcomeHeader";
import { Card, Space } from 'antd';

function WelcomeDashboard() {

    const cardContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh' // optional - set the height of the container to the viewport height
      };

    return (
        <div >
            <div>
                    <Welcomeheader />
                </div>
                <div>
                    <SignIn/>
                </div>

        {/* <div style={cardContainerStyle}>
                    <Space direction="vertical" size={30} align="center">

                    <Card
            title="Login"
            extra={<a href="/signup">Create Account</a>}
            style={{
                width: 400,
                xs:{
                    width:1000
                }
            }}
            
            >
                            <div>
                        <SignIn />
                    </div>
                </Card>
                =
            </Space>
            </div> */}


        </div>
    );
}
export default WelcomeDashboard;