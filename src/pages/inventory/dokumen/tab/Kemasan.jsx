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

const KemasanTab = ({ data, onChange }) => {
    const [kemasanPage, setKemasanPage] = useState(0);
    const [petiKemasPage, setPetiKemasPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Data dari props dengan fallback ke default data
    const kemasanData = data?.kemasan || [];
    const petiKemasData = data?.petiKemas || [];

    const handleChangeKemasanPage = (event, newPage) => {
        setKemasanPage(newPage);
    };

    const handleChangePetiKemasPage = (event, newPage) => {
        setPetiKemasPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setKemasanPage(0);
        setPetiKemasPage(0);
    };

    const handleDataChange = (newData) => {
        if (onChange) {
            onChange({
                ...data,
                ...newData
            });
        }
    };

    // Untuk pagination data
    const paginatedKemasanData = kemasanData.slice(
        kemasanPage * rowsPerPage,
        kemasanPage * rowsPerPage + rowsPerPage
    );

    const paginatedPetiKemasData = petiKemasData.slice(
        petiKemasPage * rowsPerPage,
        petiKemasPage * rowsPerPage + rowsPerPage
    );

    const renderPagination = (page, handleChangePage, data, dataType) => (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2
        }}>
            <Typography variant="body2" color="text.secondary">
                Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, data.length)} of {data.length} entries
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
                    disabled={page >= Math.ceil(data.length / rowsPerPage) - 1}
                    size="small"
                >
                    <KeyboardArrowRight />
                </IconButton>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ p: 0, width: '100%' }}>
            <Paper elevation={0} sx={{
                p: 3,
                bgcolor: '#f8f9fa',
                border: '1px solid #e0e0e0',
                width: '100%'
            }}>

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

                {/* Tabel Kemasan */}
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                    Komasan
                </Typography>
                <TableContainer
                    component={Paper}
                    elevation={0}
                    sx={{
                        border: '1px solid #e0e0e0',
                        mb: 3
                    }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="kemasan table">
                        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, width: '20%' }}>NO</TableCell>
                                <TableCell sx={{ fontWeight: 600, width: '40%' }}>JENIS KEMASAN</TableCell>
                                <TableCell sx={{ fontWeight: 600, width: '40%' }}>JUMLAH</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedKemasanData.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': { bgcolor: '#fafafa' }
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.no || kemasanPage * rowsPerPage + index + 1}
                                    </TableCell>
                                    <TableCell>{row.jenisKemasan}</TableCell>
                                    <TableCell>{row.jumlah}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {renderPagination(kemasanPage, handleChangeKemasanPage, kemasanData, 'kemasan')}

                {/* Tabel Peti Kemas */}
                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, mt: 4 }}>
                    Peti Kemas
                </Typography>
                <TableContainer
                    component={Paper}
                    elevation={0}
                    sx={{
                        border: '1px solid #e0e0e0',
                        mb: 3
                    }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="peti-kemas table">
                        <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, width: '20%' }}>NO</TableCell>
                                <TableCell sx={{ fontWeight: 600, width: '40%' }}>NOMOR</TableCell>
                                <TableCell sx={{ fontWeight: 600, width: '40%' }}>JENIS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedPetiKemasData.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': { bgcolor: '#fafafa' }
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.no || petiKemasPage * rowsPerPage + index + 1}
                                    </TableCell>
                                    <TableCell>{row.nomor}</TableCell>
                                    <TableCell>{row.jenis}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {renderPagination(petiKemasPage, handleChangePetiKemasPage, petiKemasData, 'petiKemas')}
            </Paper>
        </Box>
    );
};

export default KemasanTab;