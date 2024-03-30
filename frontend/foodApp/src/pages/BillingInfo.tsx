import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { topRated } from '../models/topRated';
import AdminNavBar from "../components/AdminNavBar";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { customerBillingInfo } from '../models/customerBillingInfo';
function BillingInfo() {
    const [topProduct, setTopRated] = useState<customerBillingInfo[]>([]);
    const fetchData = async () => {
        try {
           
            const response = await axios.get('http://127.0.0.1:5000/billingInfo');
          
            const products:customerBillingInfo[] =  response.data.map((item:any)=>({
              purchaseid:item[0],
              name:item[1],
              title:item[2],
              price:item[3],
              quantity:item[4],
              total_amount:item[5]
            
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
    <h1>Billing Information</h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Product</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">quantity</TableCell>
            <TableCell align="right">Total</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
        {topProduct.map((item, index)=>(
            <TableRow
            key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
            
              <TableCell align="right">{item.purchaseid}</TableCell>
              <TableCell align="right">{item.name}</TableCell>
              <TableCell align="right">{item.title}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>

            <TableCell align="right">{item.total_amount}</TableCell>
            </TableRow>
         ))}
        </TableBody>
      </Table>
    </TableContainer>
   
    
    </div>
    </>
  )
}

export default BillingInfo