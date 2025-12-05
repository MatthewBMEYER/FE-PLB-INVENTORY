import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Link,
  Alert,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import api from "../api/api";
import GoogleIcon from "../assets/google-color.svg"

export default function LoginForm({ onLogin, setIsLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openForgotDialog, setOpenForgotDialog] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.user.login({
        email,
        pwd: password,
      });

      if (res.data.kode === 200) {
        onLogin(res.data.data);
      } else {
        setError(res.data.message || "Login gagal.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Login Success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Decode the JWT token
      const decoded = jwtDecode(credentialResponse.credential);

      // Call backend with Google data
      const res = await api.user.googleAuth({
        token: credentialResponse.credential,
        email: decoded.email,
        name: decoded.name,
        google_id: decoded.sub,
        picture: decoded.picture
      });

      if (res.data.kode === 200 || res.data.kode === 201) {
        // Success - user logged in or registered
        onLogin(res.data.data);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      console.error('Google auth error:', err);
      setError(err.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  // Handle Google Login Failure
  const handleGoogleFailure = (error) => {
    console.error("Google Login Failed:", error);
    setError("Gagal login dengan Google. Silakan coba lagi.");
  };

  // Custom Google Login Button
  const CustomGoogleButton = ({ onClick }) => (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: "100%" }} onClick={onClick}>
      <img src={GoogleIcon} alt="Description" width={30} />
    </Box>
  );

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            position: 'end',
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
        sx={{ mt: 3, mb: 2, py: 1.5 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
      </Button>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" color="text.secondary">
          or sign in with
        </Typography>
      </Divider>

      {/* Custom Google Button */}
      <Box sx={{ mb: 3, position: 'relative' }}>
        <CustomGoogleButton
          onClick={() => {
            const googleButton = document.querySelector('div[role="button"][aria-labelledby="button-label"]');
            if (googleButton) googleButton.click();
          }}
          disabled={googleLoading}
        />
        {/* Hidden Google Login trigger */}
        <Box sx={{ display: 'none' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap={false}
            theme="outline"
            size="large"
            type="icon"
            shape="rectangular"
            locale="en"
            ux_mode="popup"
          />
        </Box>
      </Box>

      <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
        <Grid>
          <Link
            component="button"
            variant="body2"
            onClick={() => setIsLogin(false)}
            sx={{ cursor: "pointer" }}
          >
            Register
          </Link>
        </Grid>
        <Grid>
          <Link
            component="button"
            variant="body2"
            onClick={() => setOpenForgotDialog(true)}
            sx={{ cursor: "pointer" }}
          >
            Forgot password?
          </Link>
        </Grid>
      </Grid>

      <ForgotPasswordDialog
        open={openForgotDialog}
        onClose={() => setOpenForgotDialog(false)}
      />
    </Box>
  );
}