import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import theme from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BrowseLaporan from "./pages/browse/BrowseLaporan";
import InventoryInbound from "./pages/inventory/Inbound";
import InventoryOutbound from "./pages/inventory/Outbound";
import InventoryMutasi from "./pages/inventory/Mutasi";
import Configuration from "./pages/settings/Configuration";
import Master from "./pages/settings/Master";




export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/browse/laporan" element={<BrowseLaporan />} />
            <Route path="/inventory/inbound" element={<InventoryInbound />} />
            <Route path="/inventory/outbound" element={<InventoryOutbound />} />
            <Route path="/inventory/mutasi" element={<InventoryMutasi />} />
            <Route path="/admin/configuration" element={<Configuration />} />
            <Route path="/admin/master" element={<Master />} />
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );
}
