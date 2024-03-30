
import { useEffect, useState } from 'react';
import MenuList from '../components/MenuList'
import NavBar from '../components/NavBar'
import { Carts } from '../models/carts';

function Menu() {

  return (
    <>
     <NavBar  >
     <MenuList/>
     </NavBar>
    
    </>
  )
}

export default Menu