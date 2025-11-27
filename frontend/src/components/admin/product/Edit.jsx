import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import "../Admin.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    compare_price: "",
    category: "",
    brand: "",
    sku: "",
    qty: "",
    description: "",
    short_description: "",
    is_featured: "no",
    status: "1",
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetchCategories();
    fetchBrands();
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError("");

    try {
      const stored = localStorage.getItem("adminInfo");
      const adminInfo = stored ? JSON.parse(stored) : null;

      if (!adminInfo?.token) {
        throw new Error("You need to log in before editing products.");
      }

      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || payload.status !== 200) {
        throw new Error(payload.message || "Failed to load product");
      }

      const product = payload.data || {};
      setFormData({
        title: product.title || "",
        price: product.price?.toString() || "",
        compare_price: product.compare_price?.toString() || "",
        category: product.category_id?.toString() || "",
        brand: product.brand_id?.toString() || "",
        sku: product.sku || "",
        qty: product.qty?.toString() || "",
        description: product.description || "",
        short_description: product.short_description || "",
        is_featured: product.is_featured || "no",
        status: product.status?.toString() || "1",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const stored = localStorage.getItem("adminInfo");
      const adminInfo = stored ? JSON.parse(stored) : null;

      if (!adminInfo?.token) return;

      const response = await fetch("http://localhost:8000/api/categories", {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.status === 200) {
        setCategories(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchBrands = async () => {
    try {
      const stored = localStorage.getItem("adminInfo");
      const adminInfo = stored ? JSON.parse(stored) : null;

      if (!adminInfo?.token) return;

      const response = await fetch("http://localhost:8000/api/brands", {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.status === 200) {
        setBrands(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching brands:", err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const stored = localStorage.getItem("adminInfo");
      const adminInfo = stored ? JSON.parse(stored) : null;

      if (!adminInfo?.token) {
        throw new Error("You need to log in before editing products.");
      }

      const submitData = {
        title: formData.title,
        price: parseFloat(formData.price),
        compare_price: formData.compare_price
          ? parseFloat(formData.compare_price)
          : null,
        category: parseInt(formData.category),
        brand: parseInt(formData.brand),
        sku: formData.sku,
        qty: parseInt(formData.qty),
        description: formData.description,
        short_description: formData.short_description,
        is_featured: formData.is_featured,
        status: parseInt(formData.status),
      };

      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.status) {
        const errorMessage =
          payload.errors && Object.keys(payload.errors).length > 0
            ? Object.values(payload.errors)[0][0]
            : payload.message || "Failed to update product";
        throw new Error(errorMessage);
      }

      navigate("/admin/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="categories-page">
        <div className="categories-header">
          <div>
            <p className="categories-subtitle">Update product details</p>
            <h1 className="categories-title">Edit Product</h1>
          </div>
        </div>

        {loading ? (
          <div className="empty-state">
            <p>Loading product...</p>
          </div>
        ) : (
          <form className="category-form" onSubmit={handleSubmit}>
            {error && <p className="form-error">{error}</p>}

            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Product title"
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label htmlFor="price">Price *</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label htmlFor="compare_price">Compare Price</label>
                <input
                  id="compare_price"
                  name="compare_price"
                  type="number"
                  step="0.01"
                  value={formData.compare_price}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="brand">Brand *</label>
                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label htmlFor="sku">SKU *</label>
                <input
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                  placeholder="Product SKU"
                />
              </div>

              <div className="form-group">
                <label htmlFor="qty">Quantity *</label>
                <input
                  id="qty"
                  name="qty"
                  type="number"
                  value={formData.qty}
                  onChange={handleChange}
                  required
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="short_description">Short Description</label>
              <textarea
                id="short_description"
                name="short_description"
                rows="2"
                value={formData.short_description}
                onChange={handleChange}
                placeholder="Brief product description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed product description"
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label htmlFor="is_featured">Featured</label>
                <select
                  id="is_featured"
                  name="is_featured"
                  value={formData.is_featured}
                  onChange={handleChange}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="1">Active</option>
                  <option value="0">Hidden</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/admin/products")}
                disabled={submitting}
              >
                Cancel
              </button>
              <button type="submit" className="primary-btn" disabled={submitting}>
                {submitting ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export default EditProduct;