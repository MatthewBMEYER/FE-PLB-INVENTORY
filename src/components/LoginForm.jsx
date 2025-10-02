import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Grid,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import ForgetPasswordDialog from "./ForgetPasswordDialog";

export default function LoginForm({ onLogin, setIsLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openForgetDialog, setOpenForgetDialog] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:801/user/login", {
        email,
        pwd: password,
      });

      console.log(res);

      if (res.data.kode === 200) {
        alert("Login sukses!");
      } else {
        setError(res.data.message || "Login gagal.");
      }
    } catch (err) {
      console.error("LOGIN ERROR ===>", err);
      setError(err.response?.data?.message || "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <> {/* ✅ FIX: tambahin fragment biar bisa return lebih dari 1 element */}
      {/* <Box component="form" noValidate sx={{ mt: 1 }}> */}
      <>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          type="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            inputAdornment: {
              position: "end",
              children: (
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
          onClick={() => {
            handleSubmit();
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sign In"
          )}
        </Button>

        <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
          <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={() => setIsLogin(false)}
              sx={{ cursor: "pointer" }}
            >
              Register
            </Link>
          </Grid>
          <Grid item>
            <Link
              component="button"
              variant="body2"
              onClick={() => setOpenForgetDialog(true)}
              sx={{ cursor: "pointer" }}
            >
              Forget password?
            </Link>
          </Grid>
        </Grid>
      </>

      {/* ✅ FIX: sekarang ada di dalam fragment, bukan di luar return */}
      <ForgetPasswordDialog
        open={openForgetDialog}
        onClose={() => setOpenForgetDialog(false)}
      />
    </>
  );
}
