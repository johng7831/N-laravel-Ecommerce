import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from './Layout'
import FeaturedProduct from './FeaturedProduct'
import { useCart } from '../../context/CartContext'
import api from '../../utils/api'
import './Shop.css'

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await api.get(`/products/${id}`)

        if (response.data?.status === 200 && response.data.data) {
          setProduct(response.data.data)
        } else {
          setProduct(null)
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product. Please try again later.')
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const getProductImage = (p) => {
    if (!p) return 'https://via.placeholder.com/600x600?text=No+Image'

    if (p.image) {
      return `http://localhost:8000/upload/products/${p.image}`
    }

    if (p.images && p.images.length > 0) {
      return `http://localhost:8000/upload/products/${p.images[0].image}`
    }

    return 'https://via.placeholder.com/600x600?text=No+Image'
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
      navigate('/cart')
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="product-page">
          <div className="product-loading">
            <p>Loading product...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="product-page">
          <div className="product-not-found">
            <h2>{error || 'Product not found'}</h2>
            <button onClick={() => navigate('/shop')} className="back-to-shop-button">
              Back to Shop
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="product-page">
        <div className="product-container">
          <div className="product-media">
            <img src={getProductImage(product)} alt={product.title} className="product-hero-image" />
          </div>
          <div className="product-details">
            <span className="product-brand">
              {product.brand_id ? `Brand #${product.brand_id}` : ''}
            </span>
            <h1 className="product-title">{product.title}</h1>
            <p className="product-price">
              ${parseFloat(product.price).toFixed(2)}
            </p>
            {product.description && (
              <p className="product-description">{product.description}</p>
            )}
            <button className="add-to-cart-button" type="button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
        <FeaturedProduct />
      </div>
    </Layout>
  )
}

export default Product