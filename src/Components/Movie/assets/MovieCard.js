import { Space, Button, Layout, Col, Divider, Row, Modal, Card } from "antd";
import { EditOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import EditMovie from "../EditMovie";
import { useDispatch,useSelector } from "react-redux";
import { MovieActions } from "../../../Actions/MovieActions";
import { connect } from 'react-redux';


export class MovieCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    };
    this.handleAddMovieClick = this.handleAddMovieClick.bind(this)
    this.handleModalCancel =this.handleModalCancel.bind(this)
    this.handleModalOk=this.handleModalOk.bind(this)
    this.setIsModalVisible =this.setIsModalVisible.bind(this)
  }


  handleAddMovieClick=()=> {
    this.setIsModalVisible(true);
    
  };
  handleModalCancel = () => {
    this.setIsModalVisible(false);
    this.props.getMovies(this.props.userInformation.cinemaId)

  };

  handleModalOk = () => {
    this.setIsModalVisible(false);
    this.props.getMovies(this.props.userInformation.cinemaId)
  };

  setIsModalVisible=(value)=> {
    this.setState({
      isModalVisible: value
    })
  }

  render() {
    const { oneMovie } = this.props
    return (
      <div>
        <Layout>
          {/* <Space direction="vertical" size={16}> */}
          <Card
            size="small"
            title={oneMovie.title}
            extra={<a>
              <EditOutlined style={{ fontSize: '22px', color: '#08c', alignItems: 'right' }} />
              <Button type="primary" ghost onClick={this.handleAddMovieClick}>Modify</Button>
            </a>}
          // style={{
          //   width: 400,
          // }}
          >
            <Modal
                                title={oneMovie.title}
                                visible={this.state.isModalVisible}
                                onCancel={this.handleModalCancel}
                                onOk={this.handleModalOk}
                            >
                                <EditMovie movie={oneMovie}/>
                            </Modal>
            <p>{oneMovie.description}</p>
            <p>Released Date : {oneMovie.releaseDate}</p>
            <p>Language : {oneMovie.language}</p>
            <p>Country : {oneMovie.country}</p>
            <p>Movie Duration : {oneMovie.movieDuration} </p>

          </Card>
          {/* </Space> */}
          <div>
            {/* <EditOutlined  style={{ fontSize: '22px', color: '#08c',alignItems:'right' }} /> */}
            {/* <Button  style={{backgroundColor:'#859291'}}>Modify</Button> */}
          </div>
        </Layout>
      </div>
    );

  }

}
const mapStateToProps = state => ({
userInformation:state.user.userInformation

});

const mapActionsToProps = {
  getMovies: MovieActions.getMovies
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(MovieCard);
