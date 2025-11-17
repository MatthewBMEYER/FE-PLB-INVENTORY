import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Grid,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';

const HeaderTab = ({ data, onChange }) => {
    const [formData, setFormData] = useState({
        nomorPengajuan: data?.header?.nomorPengajuan || '-',
        tanggalPengajuan: data?.header?.tanggalPengajuan || '-',
        pelabuhanTujuan: data?.header?.pelabuhanTujuan || '-',
        kantorPabean: data?.header?.kantorPabean || '-',
        jenisPIB: data?.header?.jenisPIB || '-',
        jenisImport: data?.header?.jenisImport || '-',
        caraBayar: data?.header?.caraBayar || '-'
    });

    const handleChange = (field) => (event) => {
        const newValue = event.target.value;
        const updatedData = {
            ...formData,
            [field]: newValue
        };
        setFormData(updatedData);
        if (onChange) {
            onChange(updatedData);
        }
    };

    return (
        <Box sx={{ p: 0, width: '100%' }}>
            <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
                {/* Kolom Kiri - Pengajuan */}
                <Grid item xs={12} md={4} sx={{ display: 'flex', flex: 1 }}>
                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e0e0e0',
                        width: '100%',
                    }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                            Pengajuan
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nomor Pengajuan (CAR)
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.nomorPengajuan}
                                onChange={handleChange('nomorPengajuan')}
                                size="small"
                                sx={{
                                    bgcolor: 'white',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#00c853',
                                        },
                                    }
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Tanggal & Waktu
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.tanggalPengajuan}
                                onChange={handleChange('tanggalPengajuan')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Kolom Tengah - Kantor Pabean */}
                <Grid item xs={12} md={4} sx={{ display: 'flex', flex: 1 }}>
                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e0e0e0',
                        width: '100%',
                    }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                            Kantor Pabean
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Pelabuhan Tujuan
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.pelabuhanTujuan}
                                    onChange={handleChange('pelabuhanTujuan')}
                                >
                                    <MenuItem value="IDTPP - Tanjung Priok">IDTPP - Tanjung Priok</MenuItem>
                                    <MenuItem value="IDJKT - Jakarta">IDJKT - Jakarta</MenuItem>
                                    <MenuItem value="IDSUB - Surabaya">IDSUB - Surabaya</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Kantor Pabean
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.kantorPabean}
                                    onChange={handleChange('kantorPabean')}
                                >
                                    <MenuItem value="040300 - KPU TANJUNG PRIOK">040300 - KPU TANJUNG PRIOK</MenuItem>
                                    <MenuItem value="040100 - KPU JAKARTA">040100 - KPU JAKARTA</MenuItem>
                                    <MenuItem value="070300 - KPU SURABAYA">070300 - KPU SURABAYA</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Paper>
                </Grid>

                {/* Kolom Kanan - Keterangan Lain */}
                <Grid item xs={12} md={4} sx={{ display: 'flex', flex: 1 }}>
                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e0e0e0',
                        width: '100%',
                    }}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                            Keterangan Lain
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Jenis PIB
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.jenisPIB}
                                    onChange={handleChange('jenisPIB')}
                                >
                                    <MenuItem value="1 - BIASA">1 - BIASA</MenuItem>
                                    <MenuItem value="2 - BERKALA">2 - BERKALA</MenuItem>
                                    <MenuItem value="3 - KHUSUS">3 - KHUSUS</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Jenis Import
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.jenisImport}
                                    onChange={handleChange('jenisImport')}
                                >
                                    <MenuItem value="1 - UNTUK DIPAKAI">1 - UNTUK DIPAKAI</MenuItem>
                                    <MenuItem value="2 - SEMENTARA">2 - SEMENTARA</MenuItem>
                                    <MenuItem value="3 - RE-IMPOR">3 - RE-IMPOR</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Cara Bayar
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.caraBayar}
                                    onChange={handleChange('caraBayar')}
                                >
                                    <MenuItem value="1 - TUNAI">1 - TUNAI</MenuItem>
                                    <MenuItem value="2 - BERKALA">2 - BERKALA</MenuItem>
                                    <MenuItem value="3 - KREDIT">3 - KREDIT</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HeaderTab;