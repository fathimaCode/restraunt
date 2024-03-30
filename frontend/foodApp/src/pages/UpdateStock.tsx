import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminNavBar from "../components/AdminNavBar";

function UpdateStock() {
   
  
    const [stock, setStock] = useState('');
    
    const redirect = useNavigate();
    const pid = localStorage.getItem("pid");
    console.log(pid)

    const handleStock = (event: ChangeEvent<HTMLInputElement>): void => {
        setStock(event.target.value);
    };


    
 
  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const product_data = {
            stock:stock,
            id:pid

            }
            axios
            .post('http://127.0.0.1:5000/updateStock', product_data)
            .then((response: { data: any; }) => {
              console.log(response)
              redirect('/dashboard')
            })
            .catch((error: any) => {
            
              console.error('There was a problem creating the user:', error);
              
            });
           
       // adddProduct(product_data)
    };

    return (
        <>
         <AdminNavBar/>
            <div className="FoodContainer">
               
                <form onSubmit={handleSubmit} className="foodForm">
                    <input type="text" placeholder="Quantity" value={stock} onChange={handleStock} />
                    <button type="submit" className="addbtn">Update</button>
                </form>
              
            </div>
        </>
    );
}

export default UpdateStock;
