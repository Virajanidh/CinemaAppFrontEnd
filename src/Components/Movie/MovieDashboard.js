
import { Space, Button, Layout, Col, Divider, Row, Modal, Card } from "antd";
import { PlusSquareOutlined } from '@ant-design/icons';
import AddMovie from "./AddMovie";
import MovieCard from "./assets/MovieCard"
import { useEffect, useState } from "react";
import { MovieActions } from "../../Actions/MovieActions";
import { useSelector, useDispatch } from "react-redux";
import handleBeforeUnload from "./handleBeforeUnload";

const { Header, Footer, Sider, Content } = Layout;

const cardStyle = {
    background: '#0C141E',
    padding: '8px 8px',
};

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
    backgroundColor: '#108ee9',
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

function MovieDashboard() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [movies, setMovies] = useState([]);
    const { userInfomation } = useSelector((state) => state.user)
    const { allMovies } = useSelector((state) => state.movie)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(MovieActions.getMovies(userInfomation.cinemaId))
        window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    console.log(allMovies)

    const handleAddMovieClick = () => {
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleModalOk = () => {
        // Handle adding the movie here
        setIsModalVisible(false);
    };

    return (
        <div>
            <Space
                direction="vertical"
                style={{
                    width: '100%',
                }}
                size={[0, 48]}
            >


                <Layout>
                    <Header style={headerStyle}>
                        <div style={{ textAlign: "left" }}>Movie Dashboard</div>

                    </Header>
                    <Layout>
                        <Content style={contentStyle}>
                            <Modal
                                title="Add Movie"
                                visible={isModalVisible}
                                onCancel={handleModalCancel}
                                // onOk={handleModalOk}
                                footer={null} 
                            >
                                <AddMovie />
                            </Modal>



                            <Divider orientation="left">Your movies</Divider>
                            <div style={{ overflowX: 'auto' }}>
                                <Row
                                    gutter={[16, {
                                        xs: 8,
                                        sm: 16,
                                        md: 24,
                                        lg: 32,
                                    }]}
                                >

                                    {allMovies.map((movie) => (
                                        <Col className="gutter-row" span={8}>
                                        <div style={cardStyle}>

                                            <MovieCard oneMovie={movie} />
                                        </div>
                                    </Col>
                                        
                                        ))}


                                    

                                </Row>
                            </div>



                        </Content>

                        <Sider style={siderStyle}>

                            <div >
                                <PlusSquareOutlined style={{ fontSize: '22px', color: '#08c' }} />
                                <Button type="primary" style={{color:"black"}} ghost onClick={handleAddMovieClick}>
                                    Add movies
                                </Button>
                            </div>
                        </Sider>
                    </Layout>

                </Layout>


            </Space>
        </div>


    );

}
export default MovieDashboard;