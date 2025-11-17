import React, { useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Typography,
    Select,
    MenuItem,
    FormControl,
    IconButton
} from '@mui/material';
import {
    KeyboardArrowLeft,
    KeyboardArrowRight
} from '@mui/icons-material';

const PungutanTab = ({ data, onChange }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Data dari props dengan fallback ke default data
    const tableData = data?.pungutan || [];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDataChange = (newData) => {
        if (onChange) {
            onChange({
                ...data,
                pungutan: newData
            });
        }
    };

    // Untuk pagination data
    const paginatedData = tableData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box sx={{ p: 0, width: '100%' }}>
            <Paper elevation={0} sx={{
                p: 3,
                bgcolor: '#f8f9fa',
                border: '1px solid #e0e0e0',
                width: '100%'
            }}>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                    Pungutan
                </Typography>

                {/* Header dengan Show entries */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Show
                        </Typography>
                        <FormControl size="small" sx={{ minWidth: 80 }}>
                            <Select
                                value={rowsPerPage}
                                onChange={handleChangeRowsPerPage}
                                sx={{ bgcolor: 'white' }}
                            >
                                <MenuItem value={10}>10 entries</MenuItem>
                                <MenuItem value={25}>25 entries</MenuItem>
                                <MenuItem value={50}>50 entries</MenuItem>
                                <MenuItem value={100}>100 entries</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                {/* Tabel */}
                <TableContainer
                    component={Paper}
                    elevation={0}
                    sx={{
                        border: '1px solid #e0e0e0',
                        mb: 2
                    }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="pungutan table">
                        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, width: '15%' }}>PUNGUTAN</TableCell>
                                <TableCell sx={{ fontWeight: 600, width: '10%' }}>DIBAYARKAN</TableCell>
                                <TableCell sx={{ fontWeight: 600, width: '15%' }}>DITANGGUNG PEMERINTAH</TableCell>
                                <TableCell sx={{ fontWeight: 600, width: '10%' }}>DITUNDA</TableCell>
                                <TableCell sx={{ fontWeight: 600, width: '15%' }}>TIDAK DIPUNGUT</TableCell>
                                <TableCell sx={{ fontWeight: 600, width: '10%' }}>DIREBASKAN</TableCell>
                                <TableCell sx={{ fontWeight: 600, width: '15%' }}>SUDAH DILUNASI</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': { bgcolor: '#fafafa' }
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.pungutan}
                                    </TableCell>
                                    <TableCell>{row.dibayarkan}</TableCell>
                                    <TableCell>{row.ditanggungPemerintah}</TableCell>
                                    <TableCell>{row.ditunda}</TableCell>
                                    <TableCell>{row.tidakDipungut}</TableCell>
                                    <TableCell>{row.direbaskan}</TableCell>
                                    <TableCell>{row.sudahDilunasi}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Footer dengan pagination dan info */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="body2" color="text.secondary">
                        Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, tableData.length)} of {tableData.length} entries
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                            onClick={() => handleChangePage(null, page - 1)}
                            disabled={page === 0}
                            size="small"
                        >
                            <KeyboardArrowLeft />
                        </IconButton>

                        <Typography variant="body2" sx={{ mx: 1 }}>
                            {page + 1}
                        </Typography>

                        <IconButton
                            onClick={() => handleChangePage(null, page + 1)}
                            disabled={page >= Math.ceil(tableData.length / rowsPerPage) - 1}
                            size="small"
                        >
                            <KeyboardArrowRight />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default PungutanTab;