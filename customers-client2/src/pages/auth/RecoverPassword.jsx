import { useState } from "react";
import { Link } from "react-router-dom";
import { Email } from "@mui/icons-material";
import "../../styles/global.css";

export function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      // Implementar lógica de recuperação de senha aqui
      console.log("Recover:", email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Error sending recovery email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cyber-container">
      <div className="cyber-box">
        <h1 className="cyber-title">{`>`} RESET PASSWORD_</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="cyber-input">
            <Email className="cyber-input-icon" />
            <input
              type="email"
              required
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && (
            <div className="cyber-error">
              {error}
            </div>
          )}

          {success && (
            <div className="cyber-success">
              Recovery instructions sent to your email
            </div>
          )}

          <button 
            type="submit" 
            className="cyber-button"
            disabled={loading}
          >
            {loading ? "SENDING..." : "SEND RESET LINK"}
          </button>

          <div className="links-container">
            <Link to="/login" className="cyber-link">BACK TO LOGIN</Link>
          </div>
        </form>
      </div>
    </div>
  );
} 