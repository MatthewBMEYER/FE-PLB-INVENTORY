import React from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  LayoutDashboard,
  Settings,
  KeyRound,
  LogOut,
  Briefcase,
  ChevronDown,
} from "lucide-react";

export default function TopBar({
  anchorEl,
  handleMenuOpen,
  handleMenuClose,
  handleChangePassword,
  handleLogout,
  currentPathItem,
  userName,
  roleName,
}) {

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        backgroundColor: "#1e293b",
        color: "#e2e8f0",
        mb: 2,
        px: 2,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: 100,
        }}
      >
        {/* Left Side - Path Info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {currentPathItem?.icon || <LayoutDashboard size={24} />}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {currentPathItem?.text || "Dashboard"}
          </Typography>
        </Box>

        {/* Right Side - Profile Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            src="/path-to-image.jpg"
            alt={userName}
            sx={{
              width: 40,
              height: 40,
              border: "2px solid #94a3b8",
              transition: "0.3s",
              cursor: "pointer",
              "&:hover": {
                borderColor: "#6366f1",
                transform: "scale(1.05)",
              },
            }}
            onClick={handleMenuOpen}
          />

          <Box sx={{ display: "flex", flexDirection: "column", cursor: "pointer" }} onClick={handleMenuOpen}>
            <Typography sx={{ fontWeight: 600 }}>Hi, {userName}</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Briefcase size={14} style={{ marginRight: 4, color: "#cbd5e1" }} />
              <Typography sx={{ fontSize: 13, color: "#cbd5e1" }}>
                {roleName}
              </Typography>
            </Box>
          </Box>


          <IconButton onClick={handleMenuOpen} sx={{ p: 0.5, color: "#e2e8f0" }}>
            <ChevronDown size={18} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: 200,
                borderRadius: 2,
              },
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {/* <MenuItem onClick={handleConfig}>
              <Settings size={16} style={{ marginRight: 8 }} /> Konfigurasi
            </MenuItem> */}
            <MenuItem onClick={handleChangePassword}>
              <KeyRound size={16} style={{ marginRight: 8 }} /> Ubah Password
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogOut size={16} style={{ marginRight: 8 }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Paper>
  );
}
