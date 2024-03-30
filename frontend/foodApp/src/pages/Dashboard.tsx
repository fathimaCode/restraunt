import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Product } from "../models/product";
import Swal from "sweetalert2";
import axios from "axios";
import AdminNavBar from "../components/AdminNavBar";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function Dashboard() {
  const [productList, setProductList] = useState<Product[]>([]);
  const redirect = useNavigate();
  const handleDelete =async (id:any)=>{
    try {
     
      const response = await axios.delete(`http://localhost:3001/productRoute/delete/${id}`);
      Swal.fire({
        title: "Deleted",
        text: `${id} is deleted in Pro Builder`,
        icon: "success"
      });

      fetchData();
  } catch (error) {
      console.error('There was a problem fetching the data:', error);
  }
  }



  const fetchData = async () => {
      try {
         
          const response = await axios.get('http://localhost:3001/productRoute/getAll');
        
          const products:Product[] =  response.data.map((item:any)=>({
            _id:item[0],
            title:item[1],
            quantity:item[2],
            price:item[3],
            img:item[4],
            created_at:item[5],
            
          }));
          setProductList(products);
         console.log(products)
      } catch (error) {
          console.error('There was a problem fetching the data:', error);
      }
  };
  useEffect(() => {
     

      fetchData();
  }, []);
  function productInfo(quantity: number, _id: number): import("react").MouseEventHandler<HTMLElement> {
   return()=>{
    localStorage.setItem("pid",_id.toString())
    localStorage.setItem("quantity",quantity.toString())
    redirect("/update")
   }
  }

  return (
    <>
    <AdminNavBar/>
    <div className="admin_dashboard">
     
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Created_at</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {productList.map(item=>(
            <TableRow
            key={item._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="right"><img src={`http://localhost:3001/static/product/${item.img}`} alt="" height={50} width={50}/></TableCell>
              <TableCell align="right">{item.title}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.created_at}</TableCell>
              <TableCell align="right"><i className="ri-edit-box-fill" onClick={productInfo(item.quantity,item._id)}></i></TableCell>
            </TableRow>
         ))}
        </TableBody>
      </Table>
    </TableContainer>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Created_at</TableCell>
            <TableCell align="right">Created_at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {productList.map(item=>(
            <TableRow
            key={item._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="right"><img src={`http://127.0.0.1:5000/static/product/${item.img}`} alt="" height={50} width={50}/></TableCell>
              <TableCell align="right">{item.title}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.created_at}</TableCell>
              <TableCell align="right"><i className="ri-edit-box-fill" onClick={productInfo(item.quantity,item._id)}></i></TableCell>
            </TableRow>
         ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </div>
    </>
  )
}

export default Dashboard