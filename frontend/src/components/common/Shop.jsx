import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import FeaturedProduct from './FeaturedProduct'
import api from '../../utils/api';
import './Shop.css'

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');

  // ---------------------------
  // Fetch CATEGORIES
  // ---------------------------
  const fetchCategories = async () => {
    try {
      const response = await api.get('/get-categories');
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // ---------------------------
  // Fetch BRANDS
  // ---------------------------
  const fetchBrands = async () => {
    try {
      const response = await api.get('/get-brands');
      setBrands(response.data.data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  // ---------------------------
  // Fetch PRODUCTS
  // ---------------------------
  const fetchProducts = async () => {
    try {
      const response = await api.get('/get-products');
      setProducts(response.data.data || []); // <-- FIXED
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Initial load
  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProducts();
  }, []);

  // ---------------------------
  // LOCAL FILTER (works correctly with IDs)
  // ---------------------------
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === 'all' ||
      product.category_id === parseInt(selectedCategory);

    const brandMatch =
      selectedBrand === 'all' ||
      product.brand_id === parseInt(selectedBrand);

    return categoryMatch && brandMatch;
  });

  return (
    <Layout>
      <div className="shop-page">
        <div className="shop-container">

          {/* Sidebar Filters */}
          <aside className="shop-filters">
            <h2 className="filters-title">Filters</h2>

            {/* Category Filter */}
            <div className="filter-group">
              <h3 className="filter-group-title">Category</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === 'all'}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span>All</span>
                </label>

                {categories.map((cat) => (
                  <label key={cat.id} className="filter-option">
                    <input
                      type="radio"
                      name="category"
                      value={cat.id}
                      checked={selectedCategory == cat.id}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="filter-group">
              <h3 className="filter-group-title">Brand</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="brand"
                    value="all"
                    checked={selectedBrand === 'all'}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  />
                  <span>All</span>
                </label>

                {brands.map((brand) => (
                  <label key={brand.id} className="filter-option">
                    <input
                      type="radio"
                      name="brand"
                      value={brand.id}
                      checked={selectedBrand == brand.id}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    />
                    <span>{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="shop-content">
            <div className="shop-header">
              <h1 className="shop-title">Shop</h1>
              <p className="shop-results">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="shop-product-grid">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="shop-product-card">
                    <Link to={`/product/${product.id}`} className="product-image-wrap">
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="product-image"
                        onError={(e) => {
                          e.target.src =
                            'https://via.placeholder.com/300x400?text=' +
                            encodeURIComponent(product.title);
                        }}
                      />
                    </Link>
                    <div className="product-info">
                      <span className="product-brand">
                        Brand #{product.brand_id}
                      </span>
                      <h3 className="product-title">{product.title}</h3>
                      <span className="product-price">
                        ${product.price}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="no-products">
                <p>No products found matching your filters.</p>
              </div>
            )}
          </main>
        </div>

        <FeaturedProduct />
      </div>
    </Layout>
  );
};

export default Shop;
