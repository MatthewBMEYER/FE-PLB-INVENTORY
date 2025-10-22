import React, { useState, useEffect } from "react";
import {
  Box,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Collapse,
} from "@mui/material";
import { ChevronRight, FolderOpen, Archive, Settings } from "@mui/icons-material";
import { Menu as MenuIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

// 🧩 Icon mapping
const iconMap = {
  Browse: <FolderOpen />,
  Inventory: <Archive />,
  Settings: <Settings />,
};

export default function Sidebar({ open, toggleDrawer, menuItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});
  const [savedMenus, setSavedMenus] = useState({});

  const handleToggleSubMenu = (key) => {
    setOpenMenus((prev) => {
      const isCurrentlyOpen = !!prev[key];
      // Close all, then toggle only the clicked one
      return {
        [key]: !isCurrentlyOpen,
      };
    });
  };

  useEffect(() => {
    if (!open) {
      setSavedMenus(openMenus);  // Save before collapsing
      setOpenMenus({});
    } else {
      setOpenMenus(savedMenus); // Restore when reopened
    }
  }, [open]);

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.child && item.child.some((sub) => sub.path === location.pathname)) {
        setOpenMenus({ [item.text]: true });
      }
    });
  }, [location.pathname, menuItems]);
  

  return (
    <Paper
      elevation={3}
      sx={{
        width: open ? drawerWidth : 72,
        borderRadius: 3,
        transition: "width 0.3s ease",
        overflow: "hidden",
        height: "100%",
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Toolbar sx={{ justifyContent: open ? "space-between" : "center", px: 2 }}>
        {open && (
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            INVENTORY
          </Typography>
        )}
        <IconButton onClick={toggleDrawer} sx={{ color: "#e2e8f0" }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <List sx={{ mt: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          if (item.child && item.child.length > 0) {
            const isExpanded = openMenus[item.text] || false;
            const icon = iconMap[item.text] || <FolderOpen />;

            return (
              <React.Fragment key={item.text}>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => handleToggleSubMenu(item.text)}
                    sx={{
                      minHeight: 70,
                      justifyContent: open ? "space-between" : "center",
                      px: 2,
                      borderRadius: 2,
                      mx: 1,
                      my: 0.5,
                      "&:hover": { backgroundColor: "#1e293b" },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 2 : "auto",
                          justifyContent: "center",
                          color: "#94a3b8",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      {open && (
                        <ListItemText
                          primary={item.text}
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        />
                      )}
                    </Box>
                    {open && (
                      <ChevronRight
                        sx={{
                          color: "#94a3b8",
                          transition: "transform 0.3s",
                          transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.child.map((subItem) => (
                      <ListItem key={subItem.text} disablePadding sx={{ display: "block" }}>
                        <ListItemButton
                          onClick={() => navigate(subItem.path)}
                          selected={location.pathname === subItem.path}
                          sx={{
                            minHeight: 40,
                            pl: open ? 8 : 4,
                            mx: 1.5,
                            my: 0.25,
                            borderRadius: 2,
                            backgroundColor:
                              location.pathname === subItem.path ? "#1e40af" : "#1e293b",
                            color:
                              location.pathname === subItem.path ? "#fff" : "#cbd5e1",
                            "&:hover": { backgroundColor: "#334155" },
                            "&.Mui-selected": {
                              backgroundColor: "#1e40af",
                              color: "#fff",
                              "& .MuiListItemIcon-root": { color: "#fff" },
                            },
                          }}
                        >
                          {open && (
                            <ListItemText
                              primary={subItem.text}
                              sx={{ fontSize: "0.85rem" }}
                            />
                          )}
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          }

          // Menu tanpa anak
          const icon = iconMap[item.text] || <FolderOpen />;

          return (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                selected={isActive}
                onClick={() => navigate(item.path)}
                sx={{
                  minHeight: 44,
                  justifyContent: open ? "initial" : "center",
                  px: 2,
                  borderRadius: 2,
                  mx: 1,
                  my: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: "#1e40af",
                    color: "#fff",
                    "& .MuiListItemIcon-root": { color: "#fff" },
                  },
                  "&:hover": { backgroundColor: "#1e293b" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                    color: "#94a3b8",
                  }}
                >
                  {icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.text}
                    sx={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
