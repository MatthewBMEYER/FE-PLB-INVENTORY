// components/ForgotPasswordDialog.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import api from "../api/api";

export default function ForgotPasswordDialog({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);

    try {
      const response = await api.user.forgotPassword(email);

      const result = await response.json();

      if (res.data.kode === 200) {
        alert(res.data.message); 
      } else {
        alert(res.data.message || "Terjadi kesalahan.");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal reset password");
    }

    setLoading(false);
    setEmail("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Lupa Password</DialogTitle>
      <DialogContent>
        <Typography variant="body2" mb={1}>
          Masukkan email kamu. Password akan di-reset dan dikirim ke email kamu.
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Batal
        </Button>
        <Button
          onClick={handleResetPassword}
          variant="contained"
          disabled={!email || loading}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Kirim"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}