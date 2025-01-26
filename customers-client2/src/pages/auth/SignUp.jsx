import { useState } from "react";
import { Link } from "react-router-dom";
import { Person, Lock, Email, Visibility, VisibilityOff } from "@mui/icons-material";
import "../../styles/global.css";

export function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // Implementar lógica de signup aqui
      console.log("SignUp:", formData);
    } catch (err) {
      setError(err.message || "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="cyber-container">
      <div className="cyber-box">
        <h1 className="cyber-title">{`>`} CREATE ACCOUNT_</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="cyber-input">
            <Person className="cyber-input-icon" />
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name..."
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="cyber-input">
            <Email className="cyber-input-icon" />
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email..."
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="cyber-input">
            <Lock className="cyber-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Create password..."
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="cyber-input-icon-right"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>

          <div className="cyber-input">
            <Lock className="cyber-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              required
              placeholder="Confirm password..."
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="cyber-error">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="cyber-button"
            disabled={loading}
          >
            {loading ? "CREATING..." : "CREATE ACCOUNT"}
          </button>

          <div className="links-container">
            <Link to="/login" className="cyber-link">BACK TO LOGIN</Link>
          </div>
        </form>
      </div>
    </div>
  );
} 