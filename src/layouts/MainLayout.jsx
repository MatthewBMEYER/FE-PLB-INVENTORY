import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../components/Sidebar.jsx";
import TopBar from "../components/Topbar.jsx";
import {
  LayoutDashboard,
  FileCheck2,
  PackageSearch,
  Archive,
  TimerReset,
  Settings,
} from "lucide-react";

const ICONS = {
  dashboard: <LayoutDashboard size={20} />,
  doclaim: <FileCheck2 size={20} />,
  mydo: <PackageSearch size={20} />,
  billofloadings: <Archive size={20} />,
  doextenstion: <TimerReset size={20} />,
  dopayments: <FileCheck2 size={20} />,
  settings: <Settings size={20} />,
};

export default function MainLayout() {
  const [open, setOpen] = useState(true); // sidebar expanded/collapsed
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [userName, setUserName] = useState("");
  const [roleName, setRoleName] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const drawerWidth = open ? 240 : 72;

  useEffect(() => {
    const storedMenus = JSON.parse(localStorage.getItem("roleMenus")) || [];

    const formattedMenu = storedMenus.map((menu) => {
      const iconKey = menu.header_menu.toLowerCase().replace(/\s+/g, "");
      const icon = ICONS[iconKey] || <LayoutDashboard size={20} />;

      if (menu.child?.length > 0) {
        return {
          text: menu.header_menu,
          icon,
          child: menu.child.map((child) => ({
            text: child.child_menu,
            path: child.direction.startsWith("/")
              ? child.direction
              : `/${child.direction}`,
          })),
        };
      }

      return {
        text: menu.header_menu,
        icon,
        path: `/${iconKey}`,
      };
    });

    setMenuItems(formattedMenu);
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserName(storedUser.nama_user);
      setRoleName(storedUser.nama_role);
    }
  }, []);

  const toggleDrawer = () => setOpen(!open);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleConfig = () => {
    handleMenuClose();
    alert("Halaman Konfigurasi belum tersedia");
  };

  const handleChangePassword = () => {
    handleMenuClose();
    alert("Halaman Ubah Password belum tersedia");
  };

  const handleLogout = () => {
    handleMenuClose();
    navigate("/login");
  };

  const findCurrentPathItem = (menus) => {
    for (const menu of menus) {
      if (menu.path && menu.path === location.pathname) return menu;
      if (menu.child) {
        const found = menu.child.find((c) => c.path === location.pathname);
        if (found) return { ...found, icon: menu.icon };
      }
    }
    return null;
  };

  const currentPathItem = findCurrentPathItem(menuItems);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f1f5f9", // neutral bg
        padding: 2, // outer padding (space from window edge)
        gap: 2, // spacing between sidebar and content
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <CssBaseline />

      {/* SIDEBAR */}
      <Box
        sx={{
          width: drawerWidth,
          transition: "all 0.3s ease",
          height: "100%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Sidebar open={open} toggleDrawer={toggleDrawer} menuItems={menuItems} />
      </Box>

      {/* CONTENT AREA */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          transition: "flex 0.3s ease",
          gap: 1,
          minWidth: 0,
        }}
      >
        {/* TOPBAR (already floating/paper) */}
        <Box>
          <TopBar
            anchorEl={anchorEl}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
            handleConfig={handleConfig}
            handleChangePassword={handleChangePassword}
            handleLogout={handleLogout}
            currentPathItem={currentPathItem}
            userName={userName}
            roleName={roleName}
            toggleDrawer={toggleDrawer}
          />
        </Box>

        {/* OUTLET (this is the card/floating content) */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            backgroundColor: "#fff",
            padding: 3,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
            borderRadius: 3,
            maxHeight: "calc(100vh - 64px - 16px)", // topbar height + gap
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );


}
