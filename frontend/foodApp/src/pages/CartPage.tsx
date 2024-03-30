import React, { useEffect, useState } from 'react'
import { Carts } from '../models/carts';
import NavBar from '../components/NavBar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PurchaseItem } from '../models/purchaseItem';
import { useNavigate } from 'react-router-dom';
import { BillView } from '../models/billView';


function CartPage() {
    const [carts, setCartItem] = useState<Carts[]>([]);
   
    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [orderCalories, setorderCalories] = useState(0);
    const [bill, setbills] = useState(0);
    const [gender, setGender] = useState('');
    const [myCalories, setmyCalories] = useState(0);
    const redirect = useNavigate();
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
      };
      const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
    };
      const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(e.target.value);
      };
      const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(e.target.value);
      };
      const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAge(e.target.value);
      };
    useEffect(() => {
        const cartData = localStorage.getItem("cart");
        console.log("line 39: "+cartData)
        if(cartData){
          const initialCartItems = JSON.parse(cartData) as Carts[]
          console.log(initialCartItems)
        }
        if(cartData){
            const parsedCartData = JSON.parse(cartData) as Carts[]
            let cc =0;
            let bb=0
            parsedCartData.forEach(item=>{
                cc +=item.calories
                bb +=item.subtotal
               console.log(item.calories)
            })
            setCartItem(parsedCartData)
          
            setorderCalories(cc)
            setbills(bb)
        }
       
        
    }, []);
    function predictCalories(): React.MouseEventHandler<HTMLButtonElement>  {
       return ()=>{
        const user_data ={
              age:age,
             weight:weight,
             height:height,
             gender:gender
        }
        console.log(user_data)
        axios
          .post('http://127.0.0.1:5000/predictCalories', user_data)
          .then((response: { data: any; }) => {
            console.log(response)
            setmyCalories(response.data)
          })
          .catch((error: any) => {
          
            console.error('There was a problem creating the user:', error);
            
          });
        console.log(name)
       }
    }
    function deleteCartItem(productId: number): React.MouseEventHandler<HTMLButtonElement> {
      return ()=>{
        let updatedOrderCalories = 0;
    let updatedBill = 0;
        const updatedCarts = carts.filter(item => item.product._id !== productId);
        setCartItem(updatedCarts);
        updatedCarts.forEach(item => {
          updatedOrderCalories += item.calories;
          updatedBill += item.subtotal;
        });
        localStorage.setItem("cart", JSON.stringify(updatedCarts));
        setorderCalories(updatedOrderCalories);
        setbills(updatedBill);

      }
    }
  
  function purchaseBtnActivate(): React.MouseEventHandler<HTMLButtonElement>  {
    return()=>{
      console.log(carts)
      console.log(name)
      if(name==""){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Kindly fill all user details",
         
        });
      }
      else{
        const purchaseItems: PurchaseItem[] = carts.map((item, index) => ({
          quantity: item.quantity,
          created_at: item.created_at,
          productId: item.product._id,
          subtotal: item.subtotal,
          calories: item.calories
        }));
        
        const bilItems: BillView[] = carts.map((item, index) => ({
          quantity: item.quantity,
          created_at: item.created_at,
          productId: item.product._id,
          title:item.product.title,
          purchaseImage:item.product.img,
          subtotal: item.subtotal,
          calories: item.calories
        }));
        const purchase_Data ={
          username:name,
           items:purchaseItems,
           predictedCalories:myCalories,
           orderdCalories:orderCalories,
           totalAmount:bill,
           age:age,
           weight:weight,
           height:height,

          
        }
        axios
        .post('http://127.0.0.1:5000/purchase', purchase_Data)
        .then((response: { data: any; }) => {
          console.log(response)
          const billData ={
            username:name,
             items:bilItems,
             predictedCalories:myCalories,
             orderdCalories:orderCalories,
             totalAmount:bill,
             age:age,

             weight:weight,
             height:height,
  
            
          }
          const billDataString = JSON.stringify(billData);
          localStorage.setItem("myBill",billDataString)
          localStorage.setItem("cart","")
          redirect('/myBills')
        })
        .catch((error: any) => {
      
          console.error('There was a problem creating the user:', error);
          
        });
      }
    }
  }

  return (
    <>
    <NavBar />
   
        <div className='cartViewContainer'>
            <div className='row_details'>
         <div className='cartdetails'>
         <table>
                <thead className='thead'>
                   <tr>
                    <th className='heading'>S.No</th>
                    <th className='heading'></th>
                    <th className='heading'>Product</th>
                    <th className='heading'>Price</th>
                    <th className='heading'>Quantity</th>
                    <th className='heading'>Total</th>
                   </tr>
                </thead>
                <tbody>
                {carts.map((item,index)=>(
                    
                    <tr  key={index} className='tbl_row'>
                        <td className='cartItems'>{index+1}</td>
                        <td className='cartItems'> <img src={`http://127.0.0.1:5000/static/product/${item.product.img}`}  alt="" height={80}width={80} /></td>
                        <td className='cartItems'>
                            <div className='col'>
                            <p>{item.product.title}</p>
                            </div>
                        </td>
                       <td className='cartItems'>{item.product.price}</td>
                       <td className='cartItems'>{item.quantity}</td>
                       <td className='cartItems'>{item.subtotal}</td>
                       <td className='cartItems'><i className="ri-close-large-line" onClick={deleteCartItem(item.product._id)}></i></td>
                        
                    </tr>    ))}
                </tbody>
            </table>
         </div>
            <div className='userDetails'>
                <p>User Information</p>
                <div className='userInfo'>
                    <input type="text" placeholder='username' 
                     value={name}
                   onChange={handleNameChange}/>
                    <input type="number" placeholder='age'  value={age}
                   onChange={handleAgeChange}/>
                    <input type="number" placeholder='weight'  value={weight}
                   onChange={handleWeightChange}/>
                    <input type="number" placeholder='height'  value={height}
                   onChange={handleHeightChange}/>
                   <select value={gender} onChange={handleGenderChange}>
                                <option value="0">Male</option>
                                <option value="1">Female</option>
                            </select>
                    <button className='predictBtn' onClick={predictCalories()}>Predict Calories</button>
                </div>
                <p>
  Predicted Calories: 
  {myCalories > orderCalories ? (
    <span className='predict success'>{myCalories}</span>
  ) : (
    <span className='predict failed'>{myCalories}</span>
  )}
</p>
            </div>
            </div>
           <div className='totalContainer'>
           <p>Total Amount:{bill}</p>
           <p>Total Calories: {orderCalories}</p> 
           <button className='purchaseBtn' onClick={purchaseBtnActivate()}>Purchase</button>
           </div>
           
        </div>

    </>
  )
}

export default CartPage