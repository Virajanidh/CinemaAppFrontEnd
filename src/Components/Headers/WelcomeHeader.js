import { Layout } from "antd";
import "./WelcomeHeader.css";

function Welcomeheader(){
    const {Header}=Layout

return(
    <div >
       <Header>
              <div className="logo" />
              Welcome !!
            </Header>
        </div>
)

}
export default Welcomeheader;