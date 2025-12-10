import React, { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import api from "../../../utils/api";
import "../Admin.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/all-order-details");
      const payload = response?.data || {};

      if (payload.orders && Array.isArray(payload.orders)) {
        setOrders(payload.orders);
      } else {
        setOrders([]);
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch orders";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="categories-page">
        <div className="categories-header">
          <div>
            <p className="categories-subtitle">
              Review and manage all customer orders.
            </p>
            <h1 className="categories-title">Orders</h1>
          </div>
          <button
            onClick={fetchOrders}
            className="add-category-btn"
            style={{ backgroundColor: "#6b7280" }}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {loading && (
          <div className="empty-state">
            <p>Loading orders...</p>
          </div>
        )}

        {error && !loading && (
          <div className="empty-state">
            <p style={{ color: "#ef4444" }}>Error: {error}</p>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="empty-state">
            <p>No orders found.</p>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table className="categories-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Items</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.name || order.user?.name || "-"}</td>
                    <td>{order.email || order.user?.email || "-"}</td>
                    <td>${Number(order.total_price || 0).toFixed(2)}</td>
                    <td>{order.status || "Pending"}</td>
                    <td>
                      {order.payment_method || "-"} /{" "}
                      {order.payment_status || "-"}
                    </td>
                    <td>{order.order_items?.length || 0}</td>
                    <td>
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;

