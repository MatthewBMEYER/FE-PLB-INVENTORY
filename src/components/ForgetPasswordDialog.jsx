// components/ForgetPasswordDialog.jsx
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

export default function ForgetPasswordDialog({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:801/user/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Password berhasil direset dan dikirim ke email kamu.");
        setEmail(""); // reset form hanya kalau sukses
        onClose();
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Gagal reset password");
    } finally {
      setLoading(false) ; //loading stop
    }



    // setLoading(false);
    // setEmail("");
    // onClose();
  };

  return (
     <Dialog open={open} onClose={false}>
      <DialogTitle>Lupa Password</DialogTitle>
      <DialogContent>
        <>
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
      </>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Batal
        </Button>
        <Button
          type="button" //nambah ini
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