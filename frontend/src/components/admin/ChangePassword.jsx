import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import "./Admin.css";
import { AdminAuthContext } from "../../context/AdminAuth";
import api from "../../utils/api";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AdminAuthContext);
  const [formData, setFormData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.password_confirmation) {
      setError("New password and confirmation do not match.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await api.post("/admin/change-password", formData);
      const payload = response?.data || {};

      if (payload.status !== 200) {
        throw new Error(payload.message || "Unable to update password.");
      }

      setSuccess(payload.message || "Password updated successfully.");
      // Log out after a short delay so user can read the message
      setTimeout(() => {
        logout();
        navigate("/admin/login");
      }, 900);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.current_password?.[0] ||
        err?.response?.data?.errors?.password?.[0] ||
        err.message ||
        "Something went wrong.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="categories-page">
        <div className="categories-header">
          <div>
            <p className="categories-subtitle">Update your admin credentials</p>
            <h1 className="categories-title">Change Password</h1>
          </div>
        </div>

        <form className="category-form" onSubmit={handleSubmit}>
          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <div className="form-group">
            <label htmlFor="current_password">Current password</label>
            <input
              id="current_password"
              name="current_password"
              type="password"
              value={formData.current_password}
              onChange={handleChange}
              required
              placeholder="Enter current password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">New password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              placeholder="At least 8 characters"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm new password</label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
              minLength={8}
              placeholder="Re-enter new password"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={() => navigate(-1)}
              disabled={submitting}
            >
              Cancel
            </button>
            <button type="submit" className="primary-btn" disabled={submitting}>
              {submitting ? "Saving..." : "Update password"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ChangePassword;

