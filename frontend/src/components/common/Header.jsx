import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const Header = () => {
  const navigate = useNavigate()
  const { getCartItemsCount } = useCart()
  const cartCount = getCartItemsCount()

  return (
    <header className="site-header">
      <nav className="nav">
        <div className="nav-left">
          <Link to="/" className="logo" aria-label="Homepage">ShopMate</Link>
          <ul className="nav-categories" role="menubar" aria-label="Product categories">
            <li role="none"><Link to="/shop" role="menuitem" className="nav-link">Shop</Link></li>
            <li role="none"><a role="menuitem" href="#" className="nav-link">Man</a></li>
            <li role="none"><a role="menuitem" href="#" className="nav-link">Women</a></li>
            <li role="none"><a role="menuitem" href="#" className="nav-link">Child</a></li>
          </ul>
        </div>

        <div className="nav-right">
          <button className="icon-button" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="icon-button" aria-label="User account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 22a8 8 0 1 0-16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="icon-button" 
            aria-label="Cart"
            onClick={() => navigate('/cart')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M6 6h15l-1.5 9H8L6 3H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="21" r="1.5" fill="currentColor"/>
              <circle cx="18" cy="21" r="1.5" fill="currentColor"/>
            </svg>
            {cartCount > 0 && (
              <span className="cart-count" aria-hidden="true">{cartCount}</span>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Header


