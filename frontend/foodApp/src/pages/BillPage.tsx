import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import NavBar from "../components/NavBar";


function BillPage() {
    const storedBillDataString = localStorage.getItem("myBill");
    const storedBillData = JSON.parse(storedBillDataString!);
    const items = storedBillData.items;
  
    return (
      <>
      <NavBar/>
       <div className="MyBills">
        
        <div className="user_bill">
        <p>UserName: {storedBillData.username}</p>
        <p>Total Amount: Rs.{storedBillData.totalAmount}</p>
        <p>Orderd Calories: {storedBillData.orderdCalories} </p>
        <p>Predicted Calories: {storedBillData.predictedCalories} </p>
         
             
        </div>
        <div className="user_details">
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right">Created_at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {items.map((item:any, index:any) => (
            <TableRow
            key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="right"><img src={`http://127.0.0.1:5000/static/product/${item.purchaseImage}`} alt="" height={50} width={50}/></TableCell>
              <TableCell align="right">{item.title}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{item.calories}</TableCell>
              <TableCell align="right">{item.subtotal}</TableCell>
              <TableCell align="right">{item.created_at}</TableCell>
            </TableRow>
         ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
       </div>
       
          


    










         
      </>
    );
  }
  
  export default BillPage;
  