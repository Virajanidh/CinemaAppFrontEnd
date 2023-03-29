import React from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { SeatActions } from '../../../Actions/SeatActions';



const columns = [
  {
    title: 'Title',
    dataIndex: 0,
  },
  {
    title: 'Seat Type',
    dataIndex: 1,
    render: (seatType) => {
      switch (seatType) {
        case 0:
          return 'LOWER';
        case 1:
          return 'MIDDLE';
        case 2:
          return 'BALCONY';
        default:
          return '';
      }
    },
  },
  {
    title: 'No. of Seats',
    dataIndex: 2,
  },
  {
    title: 'Price ($)',
    dataIndex: 3,
  },
];

function SeatDetails(props)  {

  const [dataArray, setDataArray] = useState( []);
  const { seatAllo } = useSelector((state) => state.seat)
  console.log(seatAllo)
    
  return <Table columns={columns} dataSource={seatAllo} />;
};

export default SeatDetails;