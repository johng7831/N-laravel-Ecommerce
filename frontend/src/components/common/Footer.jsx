import React from 'react'

const Footer = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-top">
        <div className="footer-col">
          <h4 className="footer-title">About ShopMate</h4>
          <p className="footer-text">Your destination for modern styles, quality basics, and seasonal collections.</p>
        </div>
        <div className="footer-col">
          <h4 className="footer-title">Support</h4>
          <ul className="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4 className="footer-title">Newsletter</h4>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" className="newsletter-input" placeholder="Your email" aria-label="Your email"/>
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ShopMate. All rights reserved.</span>
        <div className="footer-socials">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Facebook">FB</a>
          <a href="#" aria-label="Twitter">X</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer


