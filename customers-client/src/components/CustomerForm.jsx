import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Alert,
  Stack,
} from "@mui/material";
import { customerService } from "../services/customerService";

export function CustomerForm({ onCustomerCreated }) {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customerService.createCustomer(formData);
      setSuccess(true);
      setError(null);
      setFormData({ name: "", email: "" });
      if (onCustomerCreated) {
        onCustomerCreated();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao criar cliente");
      setSuccess(false);
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
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Stack spacing={2}>
        <TextField
          required
          fullWidth
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Cadastrar Cliente
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
        {success && (
          <Alert severity="success">Cliente cadastrado com sucesso!</Alert>
        )}
      </Stack>
    </Box>
  );
} 