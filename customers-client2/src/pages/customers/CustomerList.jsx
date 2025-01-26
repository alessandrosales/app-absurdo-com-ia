import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { customerService } from "../../services/customerService";
import "../../styles/global.css";

export function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, customer: null });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [searchTerm, customers]);

  async function loadCustomers() {
    try {
      setLoading(true);
      const data = await customerService.getAllCustomers();
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (err) {
      console.error("Error loading customers:", err);
      setError(err.response?.data?.message || "Error loading customers");
    } finally {
      setLoading(false);
    }
  }

  function filterCustomers() {
    if (!searchTerm) {
      setFilteredCustomers(customers);
      return;
    }

    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }

  const handleDeleteClick = (customer) => {
    setDeleteDialog({ open: true, customer });
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      await customerService.deleteCustomer(deleteDialog.customer.id);
      setDeleteDialog({ open: false, customer: null });
      await loadCustomers();
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting customer");
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
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
      <div className="cyber-box" style={{ maxWidth: "800px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <h1 className="cyber-title" style={{ margin: 0 }}>{`>`} CUSTOMER DATABASE_</h1>
          <button
            className="cyber-button"
            style={{ 
              margin: 0, 
              width: "auto", 
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
            onClick={() => navigate("/app/customers/new")}
          >
            <AddIcon style={{ fontSize: "20px" }} /> NEW ENTRY
          </button>
        </div>

        <div className="cyber-input" style={{ marginBottom: "24px" }}>
          <SearchIcon className="cyber-input-icon" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error && (
          <div className="cyber-error">
            {error}
          </div>
        )}

        <div className="cyber-table">
          <div className="cyber-table-header">
            <div className="cyber-table-cell">ID</div>
            <div className="cyber-table-cell">NAME</div>
            <div className="cyber-table-cell">EMAIL</div>
            <div className="cyber-table-cell">ACTIONS</div>
          </div>
          
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="cyber-table-row">
              <div className="cyber-table-cell">{customer.id}</div>
              <div className="cyber-table-cell">{customer.name}</div>
              <div className="cyber-table-cell">{customer.email}</div>
              <div className="cyber-table-cell">
                <IconButton
                  size="small"
                  onClick={() => navigate(`/app/customers/${customer.id}/edit`)}
                  sx={{ color: "#00ff9f", marginRight: "8px" }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteClick(customer)}
                  sx={{ color: "#ff0055" }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}

          {filteredCustomers.length === 0 && (
            <div className="cyber-table-row">
              <div className="cyber-table-cell" colSpan={4} style={{ justifyContent: "center" }}>
                No customers found
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={deleteDialog.open}
        onClose={() => !deleteLoading && setDeleteDialog({ open: false, customer: null })}
        PaperProps={{
          style: {
            backgroundColor: "#1a1a1a",
            border: "1px solid #00ff9f",
            boxShadow: "0 0 20px rgba(0, 255, 159, 0.2)",
          },
        }}
      >
        <DialogTitle sx={{ color: "#00ff9f" }}>CONFIRM DELETE</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "#b3b3b3" }}>
            Are you sure you want to delete customer "{deleteDialog.customer?.name}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, customer: null })}
            disabled={deleteLoading}
            sx={{ color: "#b3b3b3" }}
          >
            CANCEL
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            disabled={deleteLoading}
            sx={{
              color: "#ff0055",
              "&:disabled": {
                color: "rgba(255, 0, 85, 0.5)",
              },
            }}
          >
            {deleteLoading ? <CircularProgress size={24} color="error" /> : "DELETE"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} 