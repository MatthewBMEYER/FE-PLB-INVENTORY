import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  Chip,
  Stack,
  MenuItem,
  Pagination,
  CircularProgress,
} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from "@mui/material/Slide";
import axios from "axios";

export default function User() {
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [rolesError, setRolesError] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editRole, setEditRole] = useState(null);
  const [accessState, setAccessState] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [menuLabels, setMenuLabels] = useState([]);

  const rowsPerPage = 6;

  //Slide animation for snackbar
  const SlideTransition = (props) => {
    return <Slide {...props} direction="left" />;
  };

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error" | "info" | "warning"
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get("http://localhost:801/setting/roles");
      const rolesData = res.data.data.map(r => ({
        id: r.role_id,
        role: r.nama_role,
        isactive: r.isactive,
        access: [],
      }));

      // Fetch access for each role
      const rolesWithAccess = await Promise.all(
        rolesData.map(async (role) => {
          try {
            const accessRes = await axios.get(`http://localhost:801/setting/roles/${role.id}/access`);
            const headers = accessRes.data.data; // array of header_menu strings
            
            // Create boolean array matching menuLabels order
            const access = menuLabels.map(label => headers.includes(label));
            
            return { ...role, access };
          } catch (err) {
            console.error(`Failed to fetch access for role ${role.id}:`, err);
            return { ...role, access: [] };
          }
        })
      );

      setRoles(rolesWithAccess);
      setLoadingRoles(false);
    } catch (err) {
      setRolesError("Failed to load roles from the server.", err);
      setLoadingRoles(false);
    }
  };

  const fetchMenuLabels = async () => {
    try {
      const res = await axios.get("http://localhost:801/setting/menu-headers");
      setMenuLabels(res.data.data);
    } catch (err) {
      console.error("Failed to load menu headers:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchMenuLabels();
    };
    loadData();
  }, []);

  useEffect(() => {
    if (menuLabels.length > 0) {
      fetchRoles();
    }
  }, [menuLabels]);

  const handleAccessEdit = async (role) => {
    setEditRole(role);

    try {
      const res = await axios.get(`http://localhost:801/setting/roles/${role.id}/access`);
      const headers = res.data.data; // list of header_menu
      const newAccessState = menuLabels.map(label => headers.includes(label));
      setAccessState(newAccessState);
    } catch (err) {
      console.error("Failed to fetch role access:", err);
    }
  };

  const handleAccessChange = (index) => {
    const newState = [...accessState];
    newState[index] = !newState[index];
    setAccessState(newState);
  };

  const handleAccessSave = async () => {
    const selectedHeaders = menuLabels.filter((_, i) => accessState[i]);

    try {
      await axios.put(`http://localhost:801/setting/roles/${editRole.id}/access`, {
        headers: selectedHeaders,
      });

      await fetchRoles(); // Refresh updated access
      showSnackbar("Access updated successfully.", "success");
    } catch (err) {
      console.error("Failed to save access:", err);
      showSnackbar("Failed to save role access. Please try again.", "error");
    }

    setEditRole(null);
  };

  // --------------------------

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:801/setting/users");
      const mappedUsers = res.data.data.map((u) => ({
        id: u.m_user_id,
        name: u.nama_user,
        email: u.email,
        role: u.nama_role,
        role_id: u.role_id,
        active: u.isactive === "1" || u.isactive === 1,
      }));
      setUsers(mappedUsers);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await axios.get("http://localhost:801/setting/roles");
      const mappedRoles = res.data.data.map((r) => ({
        id: r.role_id,
        role: r.nama_role,
      }));
      setRoles(mappedRoles);
    };

    fetchRoles();
  }, []);

const paginatedUsers = users.slice(
  (currentPage - 1) * rowsPerPage,
  currentPage * rowsPerPage
);

  return (
    <Box sx={{ px: 3, py: 1 }}>
      {/* Section 1: Role Menu Settings */}
      <Typography variant="subtitle1" mb={1} fontWeight={600}>
        Role Menu Settings
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ mb: 3, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)" }}
      >
        {loadingRoles ? (
          <Box p={4} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : rolesError ? (
          <Box p={4} color="error.main" textAlign="center">
            {rolesError}
          </Box>
        ) : (
          <Table size="small">
            <TableHead sx={{ backgroundColor: "#f8fafc" }}>
              <TableRow sx={{ height: 36 }}>
                <TableCell sx={{ color: "black", py: 0.5 }}>Role</TableCell>
                <TableCell sx={{ color: "black", py: 0.5 }}>Menu Access</TableCell>
                <TableCell align="right" sx={{ color: "black", py: 0.5 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.role}</TableCell>
                  <TableCell>
                    {Array.isArray(data.access) && data.access.length > 0 ? (
                      <Box
                        display="flex"
                        flexWrap="wrap"
                        gap={1}
                      >
                        {data.access.map((canAccess, i) =>
                          canAccess ? (
                            <Chip
                              key={i}
                              label={menuLabels[i]}
                              size="small"
                              variant="outlined"
                              sx={{
                                backgroundColor: "rgba(101, 211, 255, 0.18)",
                                color: "rgba(40, 83, 100, 0.8)", // blue text
                                borderColor: "rgba(255, 255, 255, 0.4)",
                                fontWeight: 500,
                                borderRadius: "5px",
                                px: 1.5,
                              }}
                            />
                          ) : null
                        )}
                      </Box>
                    ) : (
                      "No access assigned"
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleAccessEdit(data)}
                      sx={{
                        textTransform: "none",
                        fontSize: "0.75rem",
                        py: 0.25,
                        px: 1.5,
                        my: 0.5,
                      }}
                    >
                      Set Access
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Section 2: User Role Management */}
      <Typography variant="subtitle1" mb={1} fontWeight={600}>
        User Role Management
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)' }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ color: "Black" }}>Name</TableCell>
              <TableCell sx={{ color: "Black" }}>Email</TableCell>
              <TableCell sx={{ color: "Black" }}>Role</TableCell>
              <TableCell sx={{ color: "Black" }}>Active</TableCell>
              <TableCell align="right" sx={{ color: "Black" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.active ? "Active" : "Inactive"}</TableCell>
                <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setEditUser(user)}
                      sx={{ textTransform: "none", fontSize: "0.75rem", py: 0.25, px: 1.5, my: 0.7 }}
                    >
                      Edit
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="right" my={2}>
          <Pagination
            count={Math.ceil(users.length / rowsPerPage)}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
          />
        </Box>
      </TableContainer>

      {/* Dialog for Editing User Role & Status */}
      <Dialog open={!!editUser} onClose={() => setEditUser(null)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {editUser && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              minWidth={400}
              gap={2}
              mt={1}
            >
              <Typography variant="body2" sx={{ minWidth: 100 }}>{editUser.name}</Typography>

              <Select
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: e.target.value })
                }
                size="small"
                sx={{ minWidth: 160 }}
              >
                {roles.map((r) => (
                  <MenuItem key={r.id} value={r.role}>
                    {r.role}
                  </MenuItem>
                ))}
              </Select>

              <Switch
                checked={editUser.active}
                onChange={() =>
                  setEditUser({ ...editUser, active: !editUser.active })
                }
                color="primary"
              />
              <Button
                variant="contained"
                size="small"
                onClick={async () => {
                  try {
                    await axios.put(`http://localhost:801/master/users/${editUser.id}`, {
                      role_id: roles.find((r) => r.role === editUser.role)?.id,
                      isactive: editUser.active ? 1 : 0,
                    });

                    setUsers((prev) =>
                      prev.map((u) => (u.id === editUser.id ? { ...u, ...editUser } : u))
                    );
                    setEditUser(null);
                    showSnackbar("User updated successfully.", "success"); // 🟢
                  } catch (err) {
                    console.error("Failed to update user", err);
                    showSnackbar("Failed to update user. Please try again.", "error"); // 🔴
                  }
                }}
              >
                Save
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Access Toggle */}
      <Dialog open={!!editRole} onClose={() => setEditRole(null)}>
        <DialogTitle>Set {editRole?.role} Access</DialogTitle>
        <DialogContent>
          {menuLabels.map((label, index) => (
            <Box
              key={label}
              display="flex"
              alignItems="center"
              minWidth={300}
              justifyContent="space-between"
              my={1}
            >
              <Typography>{label}</Typography>
              <Switch
                checked={accessState[index] || false}
                onChange={() => handleAccessChange(index)}
                color="primary"
              />
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditRole(null)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAccessSave}
            disabled={!accessState.length} // disable if no menuLabels loaded
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* POP messege */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            borderRadius: 2,
            fontWeight: 500,
            boxShadow: 4,
            backgroundColor:
              snackbar.severity === "success"
                ? "#4caf50"
                : snackbar.severity === "error"
                ? "#f44336"
                : snackbar.severity === "warning"
                ? "#ff9800"
                : "#2196f3",
          }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
  
}