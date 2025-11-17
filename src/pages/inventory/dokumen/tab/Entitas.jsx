import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Grid,
    MenuItem,
    Select,
    FormControl
} from '@mui/material';

const Entitas = ({ data, onChange }) => {
    const [formData, setFormData] = useState({
        // PPJK
        ppjkJenisIdentitas: data?.entitas?.ppjk?.jenisIdentitas || '-',
        ppjkNomorIdentitas: data?.entitas?.ppjk?.nomorIdentitas || '-',
        ppjkNama: data?.entitas?.ppjk?.nama || '-',
        ppjkAlamat: data?.entitas?.ppjk?.alamat || '-',

        // Importir
        importirJenisIdentitas: data?.entitas?.importir?.jenisIdentitas || '-',
        importirNomorIdentitas: data?.entitas?.importir?.nomorIdentitas || '-',
        importirNITKU: data?.entitas?.importir?.nitku || '-',
        importirNama: data?.entitas?.importir?.nama || '-',
        importirAlamat: data?.entitas?.importir?.alamat || '-',
        importirAPINIB: data?.entitas?.importir?.apiNib || '-',
        importirStatus: data?.entitas?.importir?.status || '-',

        // Pemilik Barang
        pemilikJenisIdentitas: data?.entitas?.pemilikBarang?.jenisIdentitas || '-',
        pemilikNomorIdentitas: data?.entitas?.pemilikBarang?.nomorIdentitas || '-',
        pemilikNITKU: data?.entitas?.pemilikBarang?.nitku || '-',
        pemilikNama: data?.entitas?.pemilikBarang?.nama || '-',
        pemilikAlamat: data?.entitas?.pemilikBarang?.alamat || '-',
        pemilikAfiliasi: data?.entitas?.pemilikBarang?.afiliasi || '-',

        // NPWP Permusatan
        npwpJenisIdentitas: data?.entitas?.npwpPermusatan?.jenisIdentitas || '-',
        npwpNomorIdentitas: data?.entitas?.npwpPermusatan?.nomorIdentitas || '-',
        npwpNITKU: data?.entitas?.npwpPermusatan?.nitku || '-',
        npwpNama: data?.entitas?.npwpPermusatan?.nama || '-',
        npwpAlamat: data?.entitas?.npwpPermusatan?.alamat || '-',

        // Pengirim
        pengirimNama: data?.entitas?.pengirim?.nama || '-',
        pengirimAlamat: data?.entitas?.pengirim?.alamat || '-',
        pengirimNegara: data?.entitas?.pengirim?.negara || '-',

        // Penjual
        penjualNama: data?.entitas?.penjual?.nama || '-',
        penjualAlamat: data?.entitas?.penjual?.alamat || '-',
        penjualNegara: data?.entitas?.penjual?.negara || '-'
    });

    const handleChange = (field) => (event) => {
        const newValue = event.target.value;
        const updatedData = {
            ...formData,
            [field]: newValue
        };
        setFormData(updatedData);
        if (onChange) {
            // Transform formData back to the structured format
            const structuredData = {
                entitas: {
                    ppjk: {
                        jenisIdentitas: updatedData.ppjkJenisIdentitas,
                        nomorIdentitas: updatedData.ppjkNomorIdentitas,
                        nama: updatedData.ppjkNama,
                        alamat: updatedData.ppjkAlamat
                    },
                    importir: {
                        jenisIdentitas: updatedData.importirJenisIdentitas,
                        nomorIdentitas: updatedData.importirNomorIdentitas,
                        nitku: updatedData.importirNITKU,
                        nama: updatedData.importirNama,
                        alamat: updatedData.importirAlamat,
                        apiNib: updatedData.importirAPINIB,
                        status: updatedData.importirStatus
                    },
                    pemilikBarang: {
                        jenisIdentitas: updatedData.pemilikJenisIdentitas,
                        nomorIdentitas: updatedData.pemilikNomorIdentitas,
                        nitku: updatedData.pemilikNITKU,
                        nama: updatedData.pemilikNama,
                        alamat: updatedData.pemilikAlamat,
                        afiliasi: updatedData.pemilikAfiliasi
                    },
                    npwpPermusatan: {
                        jenisIdentitas: updatedData.npwpJenisIdentitas,
                        nomorIdentitas: updatedData.npwpNomorIdentitas,
                        nitku: updatedData.npwpNITKU,
                        nama: updatedData.npwpNama,
                        alamat: updatedData.npwpAlamat
                    },
                    pengirim: {
                        nama: updatedData.pengirimNama,
                        alamat: updatedData.pengirimAlamat,
                        negara: updatedData.pengirimNegara
                    },
                    penjual: {
                        nama: updatedData.penjualNama,
                        alamat: updatedData.penjualAlamat,
                        negara: updatedData.penjualNegara
                    }
                }
            };
            onChange(structuredData);
        }
    };

    // ... (rest of the JSX code remains the same)
    return (
        <Box sx={{ p: 0, width: '100%' }}>
            <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
                {/* Kolom 1 - PPJK dan Importir */}
                <Grid item xs={12} md={6} sx={{ flex: 1 }}>
                    {/* PPJK Card */}
                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e0e0e0',
                        height: 'auto',
                        mb: 3
                    }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                            PPJK
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Jenis Identitas
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.ppjkJenisIdentitas}
                                    onChange={handleChange('ppjkJenisIdentitas')}
                                >
                                    <MenuItem value="6 - NPWP 16 DIGIT">6 - NPWP 16 DIGIT</MenuItem>
                                    <MenuItem value="1 - KTP">1 - KTP</MenuItem>
                                    <MenuItem value="2 - PASSPORT">2 - PASSPORT</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nomor Identitas
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.ppjkNomorIdentitas}
                                onChange={handleChange('ppjkNomorIdentitas')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nama
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.ppjkNama}
                                onChange={handleChange('ppjkNama')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Alamat
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                value={formData.ppjkAlamat}
                                onChange={handleChange('ppjkAlamat')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>
                    </Paper>

                    {/* Importir Card */}
                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e0e0e0',
                        height: 'auto'
                    }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                            Importir
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Jenis Identitas
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.importirJenisIdentitas}
                                    onChange={handleChange('importirJenisIdentitas')}
                                >
                                    <MenuItem value="6 - NPWP 16 DIGIT">6 - NPWP 16 DIGIT</MenuItem>
                                    <MenuItem value="1 - KTP">1 - KTP</MenuItem>
                                    <MenuItem value="2 - PASSPORT">2 - PASSPORT</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nomor Identitas
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.importirNomorIdentitas}
                                onChange={handleChange('importirNomorIdentitas')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                NITKU
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.importirNITKU}
                                onChange={handleChange('importirNITKU')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nama
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.importirNama}
                                onChange={handleChange('importirNama')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Alamat
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                value={formData.importirAlamat}
                                onChange={handleChange('importirAlamat')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                API/NIB
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.importirAPINIB}
                                    onChange={handleChange('importirAPINIB')}
                                >
                                    <MenuItem value="02 - API-P">02 - API-P</MenuItem>
                                    <MenuItem value="01 - NIB">01 - NIB</MenuItem>
                                    <MenuItem value="03 - API-U">03 - API-U</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Status
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.importirStatus}
                                    onChange={handleChange('importirStatus')}
                                >
                                    <MenuItem value="LAINNYA - LAINNYA">LAINNYA - LAINNYA</MenuItem>
                                    <MenuItem value="PRODUSEN - PRODUSEN">PRODUSEN - PRODUSEN</MenuItem>
                                    <MenuItem value="DISTRIBUTOR - DISTRIBUTOR">DISTRIBUTOR - DISTRIBUTOR</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Paper>
                </Grid>

                {/* Kolom 2 - Pemilik Barang dan NPWP Permusatan */}
                <Grid item xs={12} md={6} sx={{ flex: 1 }}>
                    {/* Pemilik Barang Card */}
                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e0e0e0',
                        height: 'auto',
                        mb: 3
                    }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                            Pemilik Barang
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Jenis Identitas
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.pemilikJenisIdentitas}
                                    onChange={handleChange('pemilikJenisIdentitas')}
                                >
                                    <MenuItem value="6 - NPWP 16 DIGIT">6 - NPWP 16 DIGIT</MenuItem>
                                    <MenuItem value="1 - KTP">1 - KTP</MenuItem>
                                    <MenuItem value="2 - PASSPORT">2 - PASSPORT</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nomor Identitas
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.pemilikNomorIdentitas}
                                onChange={handleChange('pemilikNomorIdentitas')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                NITKU
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.pemilikNITKU}
                                onChange={handleChange('pemilikNITKU')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nama
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.pemilikNama}
                                onChange={handleChange('pemilikNama')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Alamat
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                value={formData.pemilikAlamat}
                                onChange={handleChange('pemilikAlamat')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Afiliasi
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.pemilikAfiliasi}
                                    onChange={handleChange('pemilikAfiliasi')}
                                >
                                    <MenuItem value="TAH - Tidak berhubungan">TAH - Tidak berhubungan</MenuItem>
                                    <MenuItem value="BEA - Berhubungan">BEA - Berhubungan</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Paper>

                    {/* NPWP Permusatan Card */}
                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e0e0e0',
                        height: 'auto',
                        mb: 3
                    }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                            NPWP Permusatan
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Jenis Identitas
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.npwpJenisIdentitas}
                                    onChange={handleChange('npwpJenisIdentitas')}
                                >
                                    <MenuItem value="6 - NPWP 16 DIGIT">6 - NPWP 16 DIGIT</MenuItem>
                                    <MenuItem value="1 - KTP">1 - KTP</MenuItem>
                                    <MenuItem value="2 - PASSPORT">2 - PASSPORT</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nomor Identitas
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.npwpNomorIdentitas}
                                onChange={handleChange('npwpNomorIdentitas')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                NITKU
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.npwpNITKU}
                                onChange={handleChange('npwpNITKU')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nama
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.npwpNama}
                                onChange={handleChange('npwpNama')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Alamat
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                value={formData.npwpAlamat}
                                onChange={handleChange('npwpAlamat')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Kolom 3 - Pengirim dan Penjual */}
                <Grid item xs={12} md={6} sx={{ flex: 1 }}>
                    {/* Pengirim Card */}
                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e0e0e0',
                        height: 'auto',
                        mb: 3
                    }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                            Pengirim
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nama
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.pengirimNama}
                                onChange={handleChange('pengirimNama')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Alamat
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                value={formData.pengirimAlamat}
                                onChange={handleChange('pengirimAlamat')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Negara
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.pengirimNegara}
                                    onChange={handleChange('pengirimNegara')}
                                >
                                    <MenuItem value="JP-JAPAN">JP - JAPAN</MenuItem>
                                    <MenuItem value="CN-CHINA">CN - CHINA</MenuItem>
                                    <MenuItem value="US-USA">US - USA</MenuItem>
                                    <MenuItem value="SG-SINGAPORE">SG - SINGAPORE</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Paper>

                    {/* Penjual Card */}
                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e0e0e0',
                        height: 'auto'
                    }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                            Penjual
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nama
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.penjualNama}
                                onChange={handleChange('penjualNama')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Alamat
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                value={formData.penjualAlamat}
                                onChange={handleChange('penjualAlamat')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Negara
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.penjualNegara}
                                    onChange={handleChange('penjualNegara')}
                                >
                                    <MenuItem value="JP - JAPAN">JP - JAPAN</MenuItem>
                                    <MenuItem value="CN - CHINA">CN - CHINA</MenuItem>
                                    <MenuItem value="US - USA">US - USA</MenuItem>
                                    <MenuItem value="SG - SINGAPORE">SG - SINGAPORE</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Entitas;