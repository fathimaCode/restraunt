import { Link } from 'react-router-dom';
import foodLogo from '../assets/logo.png'

function AdminNavBar() {
  return (
    <>
       <div className='header'>
        <div className='food_logo'>
          <img src={foodLogo} className="logo" alt="Food logo" />
        </div>
        <div className='menus'>
          <ul>
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/addFood">Add Food</Link></li>
            <li><Link to="/toprate">Top-Rated</Link></li>
            <li><Link to="/stockInfo">Notification</Link></li>
            <li><Link to="/billingInfo">Billing</Link></li>
            <li>
              <Link to="/">
            <i className="ri-logout-circle-r-line"></i>
            </Link>
            </li>
          </ul>
        </div>
      </div>
    
    </>
  )
}

export default AdminNavBar