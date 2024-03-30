import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { topRated } from '../models/topRated';
import AdminNavBar from "../components/AdminNavBar";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
function StockInfo() {
    const [topProduct, setTopRated] = useState<topRated[]>([]);
    const fetchData = async () => {
        try {
           
            const response = await axios.get('http://127.0.0.1:5000/stockInfo');
          
            const products:topRated[] =  response.data.map((item:any)=>({
              img:item[4],
              title:item[1],
              quantity:item[2],
            
            }));
            setTopRated(products);
           console.log(`Stock Update: ${products}`)
        } catch (error) {
            console.error('There was a problem fetching the data:', error);
        }
    };
    useEffect(() => {
       
  
        fetchData();
    }, []);
  return (
    <>
     <AdminNavBar/>
    <div className="admin_dashboard">
    <h1>Update the Stock Quantities</h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Quantity</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
        {topProduct.map((item, index)=>(
            <TableRow
            key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="right"><img src={`http://127.0.0.1:5000/static/product/${item.img}`} alt="" height={50} width={50}/></TableCell>
              <TableCell align="right">{item.title}</TableCell>
              <TableCell align="right" className='color_change'>{item.quantity}</TableCell>
           
            </TableRow>
         ))}
        </TableBody>
      </Table>
    </TableContainer>
   
    
    </div>
    </>
  )
}

export default StockInfo