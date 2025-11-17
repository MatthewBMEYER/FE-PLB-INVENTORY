import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Grid
} from '@mui/material';

const PernyataanTab = ({ data, onChange }) => {
    const [formData, setFormData] = useState({
        tempat: data?.pernyataan?.tempat || '',
        tanggal: data?.pernyataan?.tanggal || '',
        nama: data?.pernyataan?.nama || '',
        jabatan: data?.pernyataan?.jabatan || ''
    });

    const declarationTemplate = `Dengan ini saya menyatakan :
a. bertanggung jawab atas kebenaran hal-hal yang diberitahukan dalam dokumen ini dan keabsahan dokumen pelengkap pabean yang menjadi dasar pembuatan dokumen ini; dan
b. apabila dalam jangka waktu paling lambat 1 (satu) hari setelah tanggal pemberitahuan kesiapan barang, saya tidak hadir untuk menyaksikan pemeriksaan fisik, maka saya menguasakan penyaksian kepada pengusaha TPS dengan resiko dan biaya menjadi tanggung jawab saya.`;

    const handleChange = (field) => (event) => {
        const newValue = event.target.value;
        const updatedData = {
            ...formData,
            [field]: newValue
        };
        setFormData(updatedData);
        if (onChange) {
            const structuredData = {
                pernyataan: {
                    tempat: updatedData.tempat,
                    tanggal: updatedData.tanggal,
                    nama: updatedData.nama,
                    jabatan: updatedData.jabatan
                }
            };
            onChange(structuredData);
        }
    };

    return (
        <Box sx={{ p: 0, width: '100%' }}>
            <Paper elevation={0} sx={{
                p: 3,
                bgcolor: '#f8f9fa',
                border: '1px solid #e0e0e0',
                width: '100%'
            }}>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                    Pernyataan
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper
                            elevation={1}
                            sx={{
                                p: 3,
                                bgcolor: '#ebf9ff',
                                border: '1px solid #e0e0e0'
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    whiteSpace: 'pre-wrap',
                                    lineHeight: 1.6
                                }}
                            >
                                {declarationTemplate}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Tempat & Tanggal Section */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Tempat & Tanggal
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Tempat"
                                    value={formData.tempat}
                                    onChange={handleChange('tempat')}
                                    size="small"
                                    sx={{ bgcolor: 'white' }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Tanggal"
                                    value={formData.tanggal}
                                    onChange={handleChange('tanggal')}
                                    size="small"
                                    sx={{ bgcolor: 'white' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Nama & Jabatan Section */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Nama & Jabatan
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Nama"
                                    value={formData.nama}
                                    onChange={handleChange('nama')}
                                    size="small"
                                    sx={{ bgcolor: 'white' }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Jabatan"
                                    value={formData.jabatan}
                                    onChange={handleChange('jabatan')}
                                    size="small"
                                    sx={{ bgcolor: 'white' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default PernyataanTab;