import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Button,
    Typography,
    CircularProgress,
    Alert,
    Snackbar,
    Tabs,
    Tab,
    Divider
} from '@mui/material';
import {
    ArrowBack as BackIcon,
    PictureAsPdf as PdfIcon,
    Download as DownloadIcon
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/api';

//tab
import HeaderTab from './tab/Header';
import EntitasTab from './tab/Entitas';
import DokumenTab from './tab/Dokumen';
import PengangkutTab from './tab/Pengangkut';
import KemasanTab from './tab/Kemasan';
import TransaksiTab from './tab/Transaksi';
import BarangTab from './tab/Barang';
import PungutanTab from './tab/Pungutan';
import PernyataanTab from './tab/Pernyataan';


// Komponen Tab Panel
function TabPanel({ children, value, index, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const LihatPengajuan = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const [pengajuanData, setPengajuanData] = useState({});

    const fetchPengajuanData = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await api.inventory.dokumen.lihatPengajuan(id);

            if (response.data.kode === 200) {
                setPengajuanData(response.data.data || {});
            } else {
                setError('Gagal memuat data pengajuan');
                setSnackbarOpen(true);
            }
        } catch (err) {
            console.error('Error fetching pengajuan data:', err);
            setError('Terjadi kesalahan saat memuat data pengajuan');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPengajuanData();
    }, [id]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleGeneratePDF = () => {
        console.log('Generate PDF clicked for ID:', id);
    };

    const handleDownloadPDF = () => {
        console.log('Download PDF clicked for ID:', id);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const tabLabels = [
        'Header',
        'Entitas',
        'Dokumen',
        'Pengangkut',
        'Kemasan & Peti Kemas',
        'Transaksi',
        'Barang',
        'Pungutan',
        'Pernyataan'
    ];

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: 0, minHeight: '0' }}>
            {/* Header Section */}
            <Box
                sx={{
                    mb: 3,
                    p: 3,
                    background: '#1e293b',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.2)',
                    color: 'white'
                }}
            >
                <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
                    Lihat Pengajuan
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Detail lengkap data pengajuan - ID: {id}
                </Typography>
            </Box>

            {/* Action Bar */}
            <Box
                sx={{
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2
                }}
            >
                <Button
                    variant="outlined"
                    startIcon={<BackIcon />}
                    onClick={handleBack}
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        px: 3
                    }}
                >
                    Kembali
                </Button>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<PdfIcon />}
                        onClick={handleGeneratePDF}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 3,
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                        }}
                    >
                        Generate PDF
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownloadPDF}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 3,
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                        }}
                    >
                        Download PDF
                    </Button>
                </Box>
            </Box>

            {/* Content Section */}
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
                }}
            >
                {/* Tabs Navigation */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                    >
                        {tabLabels.map((label, index) => (
                            <Tab
                                key={index}
                                label={label}
                                id={`tab-${index}`}
                                aria-controls={`tabpanel-${index}`}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 550,
                                    minHeight: 60,
                                }}
                            />
                        ))}
                    </Tabs>
                </Box>

                {/* Render masing-masing tab dengan komponen terpisah */}
                <TabPanel value={activeTab} index={0}>
                    <HeaderTab data={pengajuanData} />
                </TabPanel>

                <TabPanel value={activeTab} index={1}>
                    <EntitasTab data={pengajuanData} />
                </TabPanel>

                <TabPanel value={activeTab} index={2}>
                    <DokumenTab data={pengajuanData} />
                </TabPanel>

                <TabPanel value={activeTab} index={3}>
                    <PengangkutTab data={pengajuanData} />
                </TabPanel>

                <TabPanel value={activeTab} index={4}>
                    <KemasanTab data={pengajuanData} />
                </TabPanel>

                <TabPanel value={activeTab} index={5}>
                    <TransaksiTab data={pengajuanData} />
                </TabPanel>

                <TabPanel value={activeTab} index={6}>
                    <BarangTab data={pengajuanData} />
                </TabPanel>

                <TabPanel value={activeTab} index={7}>
                    <PungutanTab data={pengajuanData} />
                </TabPanel>

                <TabPanel value={activeTab} index={8}>
                    <PernyataanTab data={pengajuanData} />
                </TabPanel>
            </Paper>

            {/* Error Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="error"
                    sx={{
                        width: '100%',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LihatPengajuan;