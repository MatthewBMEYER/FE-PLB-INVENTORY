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
    FormControlLabel,
    Checkbox
} from '@mui/material';

const TransaksiTab = ({ data, onChange }) => {
    const [formData, setFormData] = useState({
        // Valuta & MOPBW
        valuta: data?.transaksi?.valuta || '',
        mopbw: data?.transaksi?.mopbw || '',

        // Joris Transaksi & Checkbox
        jorisTransaksi: data?.transaksi?.jorisTransaksi || '',
        informasiKomponenBiaya: data?.transaksi?.informasiKomponenBiaya || false,

        // Harga Barang
        hargaBarangTipe: data?.transaksi?.hargaBarangTipe || '',
        hargaBarang: data?.transaksi?.hargaBarang || '',
        nilaiPabean: data?.transaksi?.nilaiPabean || '',

        // Harga Lainnya
        biayaPenambahan: data?.transaksi?.biayaPenambahan || '',
        biayaPengurangan: data?.transaksi?.biayaPengurangan || '',
        freight: data?.transaksi?.freight || '',

        // Asuransi
        asuransiTipe: data?.transaksi?.asuransiTipe || '',
        nilaiAsuransi: data?.transaksi?.nilaiAsuransi || '',
        voluntaryDeclaration: data?.transaksi?.voluntaryDeclaration || '',

        // Berat
        beratKotor: data?.transaksi?.beratKotor || '',
        beratBersih: data?.transaksi?.beratBersih || ''
    });

    const handleChange = (field) => (event) => {
        const newValue = event.target.value;
        const updatedData = {
            ...formData,
            [field]: newValue
        };
        setFormData(updatedData);
        if (onChange) {
            const structuredData = {
                transaksi: {
                    valuta: updatedData.valuta,
                    mopbw: updatedData.mopbw,
                    jorisTransaksi: updatedData.jorisTransaksi,
                    informasiKomponenBiaya: updatedData.informasiKomponenBiaya,
                    hargaBarangTipe: updatedData.hargaBarangTipe,
                    hargaBarang: updatedData.hargaBarang,
                    nilaiPabean: updatedData.nilaiPabean,
                    biayaPenambahan: updatedData.biayaPenambahan,
                    biayaPengurangan: updatedData.biayaPengurangan,
                    freight: updatedData.freight,
                    asuransiTipe: updatedData.asuransiTipe,
                    nilaiAsuransi: updatedData.nilaiAsuransi,
                    voluntaryDeclaration: updatedData.voluntaryDeclaration,
                    beratKotor: updatedData.beratKotor,
                    beratBersih: updatedData.beratBersih
                }
            };
            onChange(structuredData);
        }
    };

    const handleCheckboxChange = (field) => (event) => {
        const newValue = event.target.checked;
        const updatedData = {
            ...formData,
            [field]: newValue
        };
        setFormData(updatedData);
        if (onChange) {
            const structuredData = {
                transaksi: {
                    valuta: updatedData.valuta,
                    mopbw: updatedData.mopbw,
                    jorisTransaksi: updatedData.jorisTransaksi,
                    informasiKomponenBiaya: updatedData.informasiKomponenBiaya,
                    hargaBarangTipe: updatedData.hargaBarangTipe,
                    hargaBarang: updatedData.hargaBarang,
                    nilaiPabean: updatedData.nilaiPabean,
                    biayaPenambahan: updatedData.biayaPenambahan,
                    biayaPengurangan: updatedData.biayaPengurangan,
                    freight: updatedData.freight,
                    asuransiTipe: updatedData.asuransiTipe,
                    nilaiAsuransi: updatedData.nilaiAsuransi,
                    voluntaryDeclaration: updatedData.voluntaryDeclaration,
                    beratKotor: updatedData.beratKotor,
                    beratBersih: updatedData.beratBersih
                }
            };
            onChange(structuredData);
        }
    };

    return (
        <Box sx={{ p: 0, width: '100%' }}>
            <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
                {/* Kolom 1 - Harga */}
                <Grid item xs={12} md={4} sx={{ flex: 1 }}>
                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e0e0e0',
                        height: 'auto'
                    }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                            Harga
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Valuta
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.valuta}
                                    onChange={handleChange('valuta')}
                                >
                                    <MenuItem value="USD">USD - US DOLLAR</MenuItem>
                                    <MenuItem value="IDR">IDR - Indonesian Rupiah</MenuItem>
                                    <MenuItem value="EUR">EUR - Euro</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                MOPBW
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.mopbw}
                                onChange={handleChange('mopbw')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Joris Transaksi
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                value={formData.jorisTransaksi}
                                onChange={handleChange('jorisTransaksi')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.informasiKomponenBiaya}
                                        onChange={handleCheckboxChange('informasiKomponenBiaya')}
                                    />
                                }
                                label="Informasi Komponen Biaya"
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Harga Barang
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white', mb: 2 }}>
                                <Select
                                    value={formData.hargaBarangTipe}
                                    onChange={handleChange('hargaBarangTipe')}
                                >
                                    <MenuItem value="FOB">FOB - Free on Board</MenuItem>
                                    <MenuItem value="CIF">CIF - Cost, Insurance & Freight</MenuItem>
                                    <MenuItem value="EXW">EXW - Ex Works</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                value={formData.hargaBarang}
                                onChange={handleChange('hargaBarang')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                                InputProps={{
                                    startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nilai Pabean
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.nilaiPabean}
                                onChange={handleChange('nilaiPabean')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Kolom 2 - Harga Lainnya */}
                <Grid item xs={12} md={4} sx={{ flex: 1 }}>
                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e0e0e0',
                        height: 'auto'
                    }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                            Harga Lainnya
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Biaya Penambahan
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.biayaPenambahan}
                                onChange={handleChange('biayaPenambahan')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Biaya Pengurangan
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.biayaPengurangan}
                                onChange={handleChange('biayaPengurangan')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Freight
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.freight}
                                onChange={handleChange('freight')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Asuransi
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white', mb: 2 }}>
                                <Select
                                    value={formData.asuransiTipe}
                                    onChange={handleChange('asuransiTipe')}
                                >
                                    <MenuItem value="DN">DN - DALAN NEGEIL</MenuItem>
                                    <MenuItem value="LAINNYA">Lainnya</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                value={formData.nilaiAsuransi}
                                onChange={handleChange('nilaiAsuransi')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Voluntary Declaration
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.voluntaryDeclaration}
                                onChange={handleChange('voluntaryDeclaration')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Kolom 3 - Berat */}
                <Grid item xs={12} md={4} sx={{ flex: 1 }}>
                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e0e0e0',
                        height: 'auto'
                    }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                            Berat
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Berat Kotor
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.beratKotor}
                                onChange={handleChange('beratKotor')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Berat Bersih
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.beratBersih}
                                onChange={handleChange('beratBersih')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TransaksiTab;