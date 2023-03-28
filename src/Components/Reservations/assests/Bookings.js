import React from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { SeatActions } from '../../../Actions/SeatActions';



const columns = [
  {
    title: 'Movie title',
    dataIndex: 0,
  },
  {
    title: 'Date',
    dataIndex: 1,
  },
  {
    title: 'Show time',
    dataIndex: 2,
  },
  {
    title: 'Total Bookings',
    dataIndex: 3,
  },
  {
    title: 'Seat Type',
    dataIndex: 4,
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
    title: 'Total seats',
    dataIndex: 5,
  },
  
];

function Bookings(props)  {

  const [dataArray, setDataArray] = useState( []);
  const { booking } = useSelector((state) => state.seat)
 
  // return <div>hellos</div> 
   return <Table columns={columns} dataSource={booking} />;
};

export default Bookings;