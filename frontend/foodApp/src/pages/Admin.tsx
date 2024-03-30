import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Admin: React.FC = () => {
  const redirect= useNavigate();
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(email=="admin@gmail.com" && password=="admin"){

      redirect("/dashboard")
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Email or password!",
       
      });
      console.error('There was a problem creating the user:');
    }
  
  }
  return (
    <>
    <div className="admin_container">
      <div className="admin_form">
        <h2>Admin Portal</h2>
        <form onSubmit={handleSubmit}  className="loginForm">
          <input type="text"  id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email Address"   />
          <input type="password"  id="password"
            value={password}
            placeholder='Password'
            onChange={handlePasswordChange}      />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Admin