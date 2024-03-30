import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import Menu from './pages/Menu'
import AddFood from './pages/AddFood'
import CartPage from './pages/CartPage'
import UpdateStock from './pages/UpdateStock'
import BillPage from './pages/BillPage'
import TopRated from './pages/TopRated'
import BillingInfo from './pages/BillingInfo'
import StockInfo from './pages/StockInfo'

function App() {


  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/menu' element={<Menu/>}></Route>
    <Route path='/dashboard' element={<Dashboard/>}></Route>
    <Route path='/addFood' element={<AddFood/>}></Route>
    <Route path='/cart' element={<CartPage/>}></Route>
    <Route path='/admin' element={<Admin/>}></Route>
    <Route path='/update' element={<UpdateStock/>}></Route>
    <Route path='/myBills' element={<BillPage/>}></Route>
    <Route path='/toprate' element={<TopRated/>}></Route>
    <Route path='/billingInfo' element={<BillingInfo/>}></Route>
    <Route path='/stockInfo' element={<StockInfo/>}></Route>
    </Routes>
    </>
  )
}

export default App
