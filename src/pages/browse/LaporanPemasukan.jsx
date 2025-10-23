import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import { Search, Download, FilterAlt } from "@mui/icons-material";
import api from "../../api/api";


export default function BrowseLaporan() {
  const [filters, setFilters] = useState({
    tglDocStart: "",
    tglDocEnd: "",
    tglDaftarStart: "",
    tglDaftarEnd: "",
    tglBuktiStart: "",
    tglBuktiEnd: "",
    jenisLaporan: "",
    jenisDoc: "",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;


  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // === HANDLE SEARCH ===
  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();

      const response = await api.browse.laporan_pemasukan.search(params);

      if (response.data.kode === 200) {
        setData(response.data.data);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching laporan:", error);
      alert("Gagal memuat data laporan");
    } finally {
      setLoading(false);
    }
  };

  // === HANDLE EXPORT EXCEL ===
  const handleExport = async () => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await api.browse.laporan_pemasukan.download(params);
  
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
  
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Laporan_Pemasukan.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error export laporan:", error);
      alert("Gagal export ke Excel");
    }
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };


  return (
    <Box p={3}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        📦 Browse Laporan PLB
      </Typography>

      {/* === FILTER BAR === */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
        elevation={2}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <FilterAlt color="primary" fontSize="small" />
          <Typography variant="subtitle2" fontWeight={600}>
            Filter Laporan
          </Typography>
        </Stack>

        <Grid container spacing={1.5}>
          {/* --- Tanggal Dokumen --- */}
          <Grid>
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                borderRadius: 1.5,
                background: "#f9fafb",
              }}
            >
              <Typography
                variant="caption"
                fontWeight={600}
                color="text.secondary"
                mb={0.5}
                display="block"
              >
                Tanggal Dokumen
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  type="date"
                  name="tglDocStart"
                  size="small"
                  fullWidth
                  value={filters.tglDocStart}
                  onChange={handleChange}
                />
                <TextField
                  type="date"
                  name="tglDocEnd"
                  size="small"
                  fullWidth
                  value={filters.tglDocEnd}
                  onChange={handleChange}
                />
              </Stack>
            </Paper>
          </Grid>

          {/* --- Tanggal Daftar --- */}
          <Grid>
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                borderRadius: 1.5,
                background: "#f9fafb",
              }}
            >
              <Typography
                variant="caption"
                fontWeight={600}
                color="text.secondary"
                mb={0.5}
                display="block"
              >
                Tanggal Daftar
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  type="date"
                  name="tglDaftarStart"
                  size="small"
                  fullWidth
                  value={filters.tglDaftarStart}
                  onChange={handleChange}
                />
                <TextField
                  type="date"
                  name="tglDaftarEnd"
                  size="small"
                  fullWidth
                  value={filters.tglDaftarEnd}
                  onChange={handleChange}
                />
              </Stack>
            </Paper>
          </Grid>

          {/* --- Tanggal Bukti --- */}
          <Grid>
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                borderRadius: 1.5,
                background: "#f9fafb",
              }}
            >
              <Typography
                variant="caption"
                fontWeight={600}
                color="text.secondary"
                mb={0.5}
                display="block"
              >
                Tanggal Bukti
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  type="date"
                  name="tglBuktiStart"
                  size="small"
                  fullWidth
                  value={filters.tglBuktiStart}
                  onChange={handleChange}
                />
                <TextField
                  type="date"
                  name="tglBuktiEnd"
                  size="small"
                  fullWidth
                  value={filters.tglBuktiEnd}
                  onChange={handleChange}
                />
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* --- DROPDOWN & BUTTON --- */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.5}
          mt={0.5}
          alignItems={{ xs: "stretch", md: "center" }}
        >
          <TextField
            select
            label="Jenis Dokumen"
            name="jenisDoc"
            value={filters.jenisDoc}
            onChange={handleChange}
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">Semua</MenuItem>
            <MenuItem value="BC 1.6">BC 1.6</MenuItem>
            <MenuItem value="BC 2.3">BC 2.3</MenuItem>
            <MenuItem value="BC 2.6.2">BC 2.6.2</MenuItem>
            <MenuItem value="BC 2.7">BC 2.7</MenuItem>
            <MenuItem value="BC 2.8">BC 2.8</MenuItem>
          </TextField>
        </Stack>

        <Stack direction="row" alignItems="center">
          <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={handleSearch}
              size="medium"
              sx={{ height: 40, px: 2.5 }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Tampilkan"}
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={handleExport}
              size="medium"
              sx={{ height: 40, px: 2.5 }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Export Excel"}
            </Button>
          </Stack>
        </Stack>

      </Paper>

      {/* === HASIL LAPORAN === */}
      <Paper sx={{ p: 2, borderRadius: 2 }} elevation={2}>
        <Typography variant="subtitle2" fontWeight={600} mb={1.5}>
          📄 Hasil Laporan
        </Typography>

        {data.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            (Data laporan akan tampil setelah filter dijalankan)
          </Typography>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              borderRadius: 8,
              overflow: "hidden",
              fontSize: "13px",
            }}
          >
            <thead style={{ background: "#f1f5f9" }}>
              <tr>
                {[
                  "No",
                  "Dokumen",
                  "Nomor Daftar",
                  "Tanggal Daftar",
                  "No Bukti Terima",
                  "Tanggal Bukti Terima",
                  "Pengirim / Pemasok",
                  "Nama Pemilik",
                  "Kode Barang",
                  "Nama Barang",
                  "Satuan",
                  "Jumlah"
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "8px 10px",
                      fontWeight: 600,
                      fontSize: 13,
                      color: "#334155",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((d) => (
                <tr key={d.no}>
                  <td style={{ padding: "6px 10px" }}>{d.no}</td>
                  <td style={{ padding: "6px 10px" }}>{d.dokumen}</td>
                  <td style={{ padding: "6px 10px" }}>{d.no_daftar}</td>
                  <td style={{ padding: "6px 10px" }}>{d.tgl_daftar}</td>
                  <td style={{ padding: "6px 10px" }}>{d.no_bukti_penerimaan}</td>
                  <td style={{ padding: "6px 10px" }}>{d.tgl_bukti_penerimaan}</td>
                  <td style={{ padding: "6px 10px" }}>{d.pengirim}</td>
                  <td style={{ padding: "6px 10px" }}>{d.nama_pemilik}</td>
                  <td style={{ padding: "6px 10px" }}>{d.kode_barang}</td>
                  <td style={{ padding: "6px 10px" }}>{d.nama_barang}</td>
                  <td style={{ padding: "6px 10px" }}>{d.satuan}</td>
                  <td style={{ padding: "6px 10px" }}>{d.jumlah}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {totalPages > 1 && (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-end"
            alignItems="center"
            mt={2}
          >
            <Button
              variant="outlined"
              size="small"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </Button>

            {getPageNumbers().map((pageNum) => (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? "contained" : "outlined"}
                size="small"
                onClick={() => setCurrentPage(pageNum)}
                sx={{
                  minWidth: 36,
                  px: 1,
                  bgcolor: pageNum === currentPage ? "primary.main" : "inherit",
                  color: pageNum === currentPage ? "#fff" : "inherit",
                }}
              >
                {pageNum}
              </Button>
            ))}

            <Button
              variant="outlined"
              size="small"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </Stack>
        )}
      </Paper>
    </Box>
  );
}
