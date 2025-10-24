import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import theme from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BrowseLaporanPemasukan from "./pages/browse/LaporanPemasukan";
import BrowseLaporanPengeluaran from "./pages/browse/LaporanPengeluaran";
import BrowseLaporanMutasi from "./pages/browse/LaporanMutasi";
import InventoryInbound from "./pages/inventory/Inbound";
import InventoryOutbound from "./pages/inventory/Outbound";
import InventoryMutasi from "./pages/inventory/Mutasi";
import Configuration from "./pages/settings/Configuration";
import User from "./pages/settings/User";




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
            <Route path="/browse/pemasukan" element={<BrowseLaporanPemasukan />} />
            <Route path="/browse/pengeluaran" element={<BrowseLaporanPengeluaran />} />
            <Route path="/browse/mutasi" element={<BrowseLaporanMutasi />} />
            <Route path="/inventory/inbound" element={<InventoryInbound />} />
            <Route path="/inventory/outbound" element={<InventoryOutbound />} />
            <Route path="/inventory/mutasi" element={<InventoryMutasi />} />
            <Route path="/admin/configuration" element={<Configuration />} />
            <Route path="/admin/user" element={<User />} />
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );
}
