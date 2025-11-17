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

const PengangkutTab = ({ data, onChange }) => {
    const [formData, setFormData] = useState({
        // BC 1.1
        bcType: data?.pengangkut?.bcType || '-',
        nomorTutupPU: data?.pengangkut?.nomorTutupPU || '',
        tanggalTutupPU: data?.pengangkut?.tanggalTutupPU || '',
        nomorPOS: data?.pengangkut?.nomorPOS || '',
        nomorSubPOS: data?.pengangkut?.nomorSubPOS || '',
        nomorSubSubPOS: data?.pengangkut?.nomorSubSubPOS || '',

        // Pengangkut
        caraPengangkutan: data?.pengangkut?.caraPengangkutan || '-',
        namaSaranaAngkut: data?.pengangkut?.namaSaranaAngkut || '-',
        nomorVoyage: data?.pengangkut?.nomorVoyage || '-',
        bendera: data?.pengangkut?.bendera || '-',
        perkiraanTanggalTiba: data?.pengangkut?.perkiraanTanggalTiba || '-',

        // Pelabuhan & Tempat Penimbunan
        pelabuhanMuat: data?.pengangkut?.pelabuhanMuat || '-',
        pelabuhanTransit: data?.pengangkut?.pelabuhanTransit || '',
        pelabuhanTujuan: data?.pengangkut?.pelabuhanTujuan || '-',
        tempatPenimbunan: data?.pengangkut?.tempatPenimbunan || ''
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
                pengangkut: {
                    bcType: updatedData.bcType,
                    nomorTutupPU: updatedData.nomorTutupPU,
                    tanggalTutupPU: updatedData.tanggalTutupPU,
                    nomorPOS: updatedData.nomorPOS,
                    nomorSubPOS: updatedData.nomorSubPOS,
                    nomorSubSubPOS: updatedData.nomorSubSubPOS,
                    caraPengangkutan: updatedData.caraPengangkutan,
                    namaSaranaAngkut: updatedData.namaSaranaAngkut,
                    nomorVoyage: updatedData.nomorVoyage,
                    bendera: updatedData.bendera,
                    perkiraanTanggalTiba: updatedData.perkiraanTanggalTiba,
                    pelabuhanMuat: updatedData.pelabuhanMuat,
                    pelabuhanTransit: updatedData.pelabuhanTransit,
                    pelabuhanTujuan: updatedData.pelabuhanTujuan,
                    tempatPenimbunan: updatedData.tempatPenimbunan
                }
            };
            onChange(structuredData);
        }
    };

    return (
        <Box sx={{ p: 0, width: '100%' }}>
            <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
                {/* Card 1 - BC 1.1 */}
                <Grid item xs={12} md={4} sx={{ flex: 1 }}>
                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e0e0e0',
                        height: 'auto'
                    }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                            BC 1.1
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nomor Tutup PU
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white', mb: 2 }}>
                                <Select
                                    value={formData.bcType}
                                    onChange={handleChange('bcType')}
                                >
                                    <MenuItem value="BC11 - BC 1.1">BC11 - BC 1.1</MenuItem>
                                    <MenuItem value="BC12 - BC 1.2">BC12 - BC 1.2</MenuItem>
                                    <MenuItem value="BC13 - BC 1.3">BC13 - BC 1.3</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                value={formData.nomorTutupPU}
                                onChange={handleChange('nomorTutupPU')}
                                size="small"
                                sx={{ bgcolor: 'white', mb: 2 }}
                                placeholder="NOMOR TUTUP PU"
                            />
                            <TextField
                                fullWidth
                                value={formData.tanggalTutupPU}
                                onChange={handleChange('tanggalTutupPU')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                                placeholder="TANGGAL TUTUP PU"
                            />
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nomor POS
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.nomorPOS}
                                onChange={handleChange('nomorPOS')}
                                size="small"
                                sx={{ bgcolor: 'white', mb: 2 }}
                                placeholder="NOMOR POS"
                            />
                            <TextField
                                fullWidth
                                value={formData.nomorSubPOS}
                                onChange={handleChange('nomorSubPOS')}
                                size="small"
                                sx={{ bgcolor: 'white', mb: 2 }}
                                placeholder="NOMOR SUB POS"
                            />
                            <TextField
                                fullWidth
                                value={formData.nomorSubSubPOS}
                                onChange={handleChange('nomorSubSubPOS')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                                placeholder="NOMOR SUB SUB POS"
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Card 2 - Pengangkut */}
                <Grid item xs={12} md={4} sx={{ flex: 1 }}>
                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e0e0e0',
                        height: 'auto'
                    }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                            Pengangkut
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Cara Pengangkutan
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.caraPengangkutan}
                                    onChange={handleChange('caraPengangkutan')}
                                >
                                    <MenuItem value="1 - LAUT">1 - LAUT</MenuItem>
                                    <MenuItem value="2 - UDARA">2 - UDARA</MenuItem>
                                    <MenuItem value="3 - DARAT">3 - DARAT</MenuItem>
                                    <MenuItem value="4 - POS">4 - POS</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nama Sarana Angkut
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.namaSaranaAngkut}
                                onChange={handleChange('namaSaranaAngkut')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Nomor Voy/Flight
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.nomorVoyage}
                                onChange={handleChange('nomorVoyage')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Bendera
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.bendera}
                                    onChange={handleChange('bendera')}
                                >
                                    <MenuItem value="LR - LIBERIA">LR - LIBERIA</MenuItem>
                                    <MenuItem value="ID - INDONESIA">ID - INDONESIA</MenuItem>
                                    <MenuItem value="SG - SINGAPORE">SG - SINGAPORE</MenuItem>
                                    <MenuItem value="JP - JAPAN">JP - JAPAN</MenuItem>
                                    <MenuItem value="PA - PANAMA">PA - PANAMA</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Perkiraan Tanggal Tiba
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.perkiraanTanggalTiba}
                                onChange={handleChange('perkiraanTanggalTiba')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* Card 3 - Pelabuhan & Tempat Penimbunan */}
                <Grid item xs={12} md={4} sx={{ flex: 1 }}>
                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f8f9fa',
                        border: '1px solid #e0e0e0',
                        height: 'auto'
                    }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                            Pelabuhan & Tempat Penimbunan
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Pelabuhan Muat
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ bgcolor: 'white' }}>
                                <Select
                                    value={formData.pelabuhanMuat}
                                    onChange={handleChange('pelabuhanMuat')}
                                >
                                    <MenuItem value="JPNGO - Nagoya, Aichi">JPNGO - Nagoya, Aichi</MenuItem>
                                    <MenuItem value="JPTKO - Tokyo">JPTKO - Tokyo</MenuItem>
                                    <MenuItem value="CNSHA - Shanghai">CNSHA - Shanghai</MenuItem>
                                    <MenuItem value="SGSIN - Singapore">SGSIN - Singapore</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Pelabuhan Transit
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.pelabuhanTransit}
                                onChange={handleChange('pelabuhanTransit')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                                placeholder="- Pelabuhan Transit"
                            />
                        </Box>

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
                                    <MenuItem value="IDMED - Medan">IDMED - Medan</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Tempat Penimbunan
                            </Typography>
                            <TextField
                                fullWidth
                                value={formData.tempatPenimbunan}
                                onChange={handleChange('tempatPenimbunan')}
                                size="small"
                                sx={{ bgcolor: 'white' }}
                                placeholder="- Tempat Penimbunan"
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PengangkutTab;