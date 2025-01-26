import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  InputAdornment,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { customerService } from "../../services/customerService";
import { Person, Email } from "@mui/icons-material";
import "../../styles/global.css";

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px #00ff9f; }
  50% { box-shadow: 0 0 20px #00ff9f; }
  100% { box-shadow: 0 0 5px #00ff9f; }
`;

const scanlineAnimation = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

const FormContainer = styled.div`
  background: rgba(26, 26, 26, 0.9);
  border: 1px solid #00ff9f;
  padding: 48px;
  position: relative;
  overflow: hidden;
  animation: ${glowAnimation} 2s infinite;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: linear-gradient(transparent, #00ff9f, transparent);
    animation: ${scanlineAnimation} 3s linear infinite;
  }
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 40px;
  
  & .MuiOutlinedInput-root {
    color: #00ff9f;
    font-family: 'Share Tech Mono', monospace;
    
    & input {
      padding: 20px;
      height: 24px;
      line-height: 24px;
      font-size: 1.1rem;
    }

    & fieldset {
      border-color: #00ff9f;
      border-width: 2px;
      
      legend {
        font-size: 0.85em;
        margin-left: -4px;
      }
    }

    &:hover fieldset {
      border-color: #00ff9f;
    }

    &.Mui-focused fieldset {
      border-color: #00ff9f;
    }
  }

  & .MuiInputLabel-root {
    color: #00ff9f;
    font-family: 'Share Tech Mono', monospace;
    font-size: 1.1rem;
    transform: translate(20px, 20px) scale(1);

    &.Mui-focused,
    &.MuiFormLabel-filled {
      transform: translate(20px, -9px) scale(0.75);
      background-color: #1a1a1a;
      padding: 0 8px;
    }
  }

  & .MuiOutlinedInput-input {
    &::placeholder {
      color: rgba(0, 255, 159, 0.5);
      opacity: 1;
      font-family: 'Share Tech Mono', monospace;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 255, 159, 0.2);
`;

export function CustomerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      loadCustomer();
    }
  }, [id]);

  async function loadCustomer() {
    try {
      setLoading(true);
      const data = await customerService.getCustomerById(id);
      setFormData(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error loading customer");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isEditing) {
        await customerService.updateCustomer(id, formData);
      } else {
        await customerService.createCustomer(formData);
      }
      navigate("/app/customers");
    } catch (err) {
      setError(err.response?.data?.message || `Error ${isEditing ? "updating" : "creating"} customer`);
      console.error(err);
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

  if (loading && isEditing) {
    return (
      <div className="cyber-container internal">
        <div className="cyber-box" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <CircularProgress sx={{ color: "#00ff9f" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="cyber-container internal">
      <div className="cyber-box" style={{ maxWidth: "600px" }}>
        <h1 className="cyber-title">{`>`} {isEditing ? "EDIT" : "NEW"} CUSTOMER_</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="cyber-input">
            <Person className="cyber-input-icon" />
            <input
              type="text"
              name="name"
              required
              placeholder="Enter customer name..."
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
              placeholder="Enter customer email..."
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {error && (
            <div className="cyber-error">
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: "16px" }}>
            <button 
              type="submit" 
              className="cyber-button"
              disabled={loading}
              style={{ margin: 0 }}
            >
              {loading ? "SAVING..." : "SAVE"}
            </button>

            <button 
              type="button" 
              className="cyber-button"
              onClick={() => navigate("/app/customers")}
              style={{ 
                margin: 0,
                backgroundColor: "transparent",
                color: "#00ff9f",
                border: "2px solid #00ff9f"
              }}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 