import React from 'react'
import Header from './Header'
import Footer from './Footer'
import LatestProduct from './LatestProduct'

const Layout = ({children}) => {
  return (
    <div>
      <div className="announcement-bar">
        <span>Free shipping on orders over $50 • New arrivals dropping weekly</span>
      </div>
      <Header/>
      {children}
      <Footer/>
    </div>
  )
}

export default Layout