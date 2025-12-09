import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'

const LatestProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestProducts();
  }, []);

  const fetchLatestProducts = async () => {
    try {
      const response = await api.get('/latest-products');
      
      if (response.data.status === 200) {
        setProducts(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching latest products:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProductImage = (product) => {
    if (product.image) {
      return `http://localhost:8000/upload/products/thumb_${product.image}`;
    }
    if (product.images && product.images.length > 0) {
      return `http://localhost:8000/upload/products/thumb_${product.images[0].image}`;
    }
    // Fallback image if nothing is available
    return 'https://placehold.co/300x300?text=No+Image';
  };

  // Don't render section if no products available (after loading)
  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <section className="latest-products" aria-label="Latest products">
      <div className="section-header">
        <h2 className="section-title">New Arrivals</h2>
        <Link to="/shop" className="section-cta">View all</Link>
      </div>
      {loading ? (
        <div className="loading-state">Loading products...</div>
      ) : (
        <div className="product-grid latest-product-grid">
          {products.map((p) => (
            <article key={p.id} className="product-card latest-product-card">
              <Link to={`/product/${p.id}`} className="product-image-wrap">
                <img 
                  src={getProductImage(p)} 
                  alt={p.title} 
                  className="product-image"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/300x300?text=No+Image';
                  }}
                />
              </Link>
              <div className="product-info">
                <Link to={`/product/${p.id}`} className="product-title-link">
                  <h3 className="product-title">{p.title}</h3>
                </Link>
                <div className="product-price-container">
                  <span className="product-price">${parseFloat(p.price).toFixed(2)}</span>
                  {p.compare_price && (
                    <span className="product-compare-price">
                      ${parseFloat(p.compare_price).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default LatestProduct





