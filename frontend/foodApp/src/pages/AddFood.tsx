import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminNavBar from "../components/AdminNavBar";

function AddFood() {
 
    const [quantity, setQuantity] = useState('');
    const [title, settitle] = useState('');
    const [price, setprice] = useState('');
  
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const redirect = useNavigate();
    const currentDate = new Date();
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        settitle(event.target.value);
    };

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setQuantity(event.target.value);
    };
    
   
    const handlePriceChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setprice(event.target.value);
    };
    const uploadFile = async(file: any)=>{
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await axios.post('http://localhost:3001/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            return response.data; // Assuming the server responds with some data
          } catch (error) {
            console.error('Error uploading file:', error);
            throw error; // Rethrow the error to handle it in the calling code
          }
      }
  
  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        const product_data = {
            title:title,
            quantity:quantity,
            img:file?file.name:'',
            price:price,
            created_at: currentDate.toDateString()
            }
            console.log(product_data)
            try {
                axios
                .post('http://localhost:3001/productRoute/create', product_data)
                .then((response: { data: any; }) => {
                  console.log(response.data)
                  uploadFile(file)
                  Swal.fire({
                    title: "Success",
                    text: `product added`,
                    icon: "success"
                  });
               redirect('/dashboard')
                })
                .catch((error: any) => {
                  // Handle error here
                  console.error('There was a problem creating the user:', error);
                  
                });
            } catch (error) {
                console.error('Error uploading image:', error);
            }
         
           
       
    };

    return (
        <>
         <AdminNavBar/>
            <div className="FoodContainer">
               
                <form onSubmit={handleSubmit} className="foodForm">
                    <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
                    <input type="text" placeholder="Quantity" value={quantity} onChange={handleQuantityChange} />
                    <input type="text" placeholder="Price" value={price} onChange={handlePriceChange} />
                   
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit" className="addbtn">Add</button>
                </form>
                {message && <p className="error">{message}</p>}
            </div>
        </>
    );
}

export default AddFood;
