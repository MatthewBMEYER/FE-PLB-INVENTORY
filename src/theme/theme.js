// src/theme/theme.js
import { createTheme } from '@mui/material/styles';
import '@fontsource/poppins'; // install dulu dengan `npm install @fontsource/poppins`

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
  },
  // Tambahan jika mau custom warna, dsb
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

export default theme;
