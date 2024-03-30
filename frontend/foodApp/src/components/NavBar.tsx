import { Link } from 'react-router-dom';
import foodLogo from '../assets/logo.png';

interface NavBarProps {
  children?: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  return (
    <>
      <div className='header'>
        <div className='food_logo'>
          <img src={foodLogo} className="logo" alt="Food logo" />
        </div>
        <div className='menus'>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menus</Link></li>
            <li><Link to="/admin">Admin Portal</Link></li>
            <li><Link to="/cart">
              <i className="ri-shopping-cart-line"></i>
            </Link></li>
          </ul>
        </div>
      </div>
      {children}
    </>
  );
}

export default NavBar;
