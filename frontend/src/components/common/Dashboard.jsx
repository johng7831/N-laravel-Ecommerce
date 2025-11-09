import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuth";
import "./Shop.css";

const Dashboard = () => {
  const { user, logout } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div>
              <h1 className="dashboard-title">Admin Dashboard</h1>
              <p className="dashboard-subtitle">
                Welcome back, {user?.name || "Admin"}
              </p>
            </div>

            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </header>

        {/* Recent Orders */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Recent Orders</h2>
            <button className="view-all-button">View All</button>
          </div>

          <div className="table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Dashboard</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Products</th>
                  <th>Orders</th>
                  <th>Users</th>
                  <th>Shipping</th>
                  <th>Change Password</th>
                  <th>Logout</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>

        {/* Cards */}
        <div className="card-container">
          <div className="card">
            <div className="card-header">
              <h2>0</h2>
              <h3 className="card-title">Recent Orders</h3>
            </div>
          </div>
        </div>

        <div className="card-container">
          <div className="card">
            <div className="card-header">
            <h2>0</h2>
              <h3 className="card-title">Users</h3>
            </div>
          </div>
        </div>

        <div className="card-container">
          <div className="card">
            <div className="card-header">
            <h2>0</h2>
              <h3 className="card-title">Products</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
