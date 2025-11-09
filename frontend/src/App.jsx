import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AdminAuthProvider } from './context/AdminAuth'
import Home from './components/common/Home.jsx'
import Shop from './components/common/Shop.jsx'
import Product from './components/common/product.jsx'
import Cart from './components/common/cart.jsx'
import Checkout from './components/common/checkout.jsx'
import Login from './components/common/Login.jsx'
import Dashboard from './components/common/Dashboard.jsx'
import AdminRequireAuth from './components/common/AdminRequireAuth.jsx'

function App() {
  return (
    <CartProvider>
      <AdminAuthProvider>
        <BrowserRouter> 
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/admin/login' element={<Login />} />
            <Route path='/admin/dashboard' element={
              <AdminRequireAuth>
                <Dashboard />
              </AdminRequireAuth>
            } />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </CartProvider>
  )
}

export default App
