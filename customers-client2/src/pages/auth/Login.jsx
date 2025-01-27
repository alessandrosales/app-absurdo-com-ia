import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import "../../styles/global.css";
import { MatrixEffect } from "../../components/MatrixEffect";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/app/dashboard");
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
      <MatrixEffect />
      <div className="cyber-box">
        <h1 className="cyber-title">{`>`} LOGIN_</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="cyber-input">
            <Person className="cyber-input-icon" />
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
              placeholder="Enter your password..."
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

          <button 
            type="submit" 
            className="cyber-button"
            disabled={loading}
          >
            {loading ? "ACCESSING..." : "ACCESS SYSTEM"}
          </button>

          <div className="links-container">
            <Link to="/signup" className="cyber-link">CREATE ACCOUNT</Link>
            <Link to="/recover" className="cyber-link">RESET PASSWORD</Link>
          </div>
        </form>
      </div>
    </div>
  );
} 