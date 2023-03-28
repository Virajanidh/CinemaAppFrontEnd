import React, { useEffect } from 'react';
import { Table, InputNumber, Input, Button } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { SeatActions } from '../../../Actions/SeatActions';

const { Column } = Table;


function EditSeatDetails(props) {
  const [dataArray, setDataArray] = useState([]);
  const [dataArray2, setDataArray2] = useState([]);
  const { seatAllo } = useSelector((state) => state.seat);
  const dispatch = useDispatch();

  useEffect(() => {
    setDataArray(seatAllo)
}, [])

  const handleCellChange = (record, dataIndex, value) => {
    console.log(value, ":",record,":",dataIndex)
    const updatedRecord = { ...record, [dataIndex]: value };
    console.log(updatedRecord)
   updateArray(updatedRecord,dataIndex)
   if(dataIndex==2){
    const data =
        {
            noOfSeats: value,
            seatId:record[4]
            
        }
        dispatch(SeatActions.updateSeatData(data,record[4]))
   }
   else if(dataIndex==3){
    const data =
        {
            price: value,
            movieSeatId:record[5]
            
        }
        console.log(record[5])
        dispatch(SeatActions.updateSeatPriceData(data,record[5]))
   }
  
   //setDataArray(dataArray.map((r) => (r.id === updatedRecord.id ? updatedRecord : r)));
  };

  const updateArray =(updatedRecord,dataIndex)=>{
    for(var i=0;i<dataArray.length;i++){
        
        if(dataArray[i][4]==updatedRecord[4]){
          updateValue(updatedRecord[dataIndex],i,dataIndex)
          console.log('set')
        }
        else{
            
        }
       
    }
  }
  const updateValue = (newValue, outerIndex, innerIndex) => {
    const newArray = [...dataArray];
    const innerArray = newArray[outerIndex]

    innerArray[innerIndex] = newValue;
    newArray[outerIndex] = innerArray;
    setDataArray(newArray);
  }

  const handleRowSave = (record) => {
    dispatch(SeatActions.updateSeatData(record));
  };

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
      render: (numberOfSeats, record) => (
        <InputNumber
          value={numberOfSeats}
          min={1}
          max={1000}
          onChange={(value) => handleCellChange(record, 2, value)}
        />
      ),
    },
    {
      title: 'Price (Rs)',
      dataIndex: 3,
      render: (price, record) => (
        <Input
          value={price}
          onChange={(e) => handleCellChange(record, 3, e.target.value)}
        />
      ),
    },
    {
        title:"Action",
        dataIndex:"action",
        render:(text, record) => (
          <Button onClick={() => handleRowSave(record)}>Save</Button>
        )
    }

  ];

  return (
    <Table columns={columns} dataSource={dataArray} rowKey="id" pagination={false} scroll={{ y: 500 }}>
      <Column
        title="Action"
        dataIndex="action"
        render={(text, record) => (
          <Button onClick={() => handleRowSave(record)}>Save</Button>
        )}
      />
    </Table>
  );
}

export default EditSeatDetails;
