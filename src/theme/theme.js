// src/theme/theme.js
import { createTheme } from '@mui/material/styles';
import '@fontsource/poppins';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#1e293b',
      light: '#334155',
      dark: '#0f172a',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  components: {
    // Global CSS override
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // Custom scrollbar untuk webkit browsers (Chrome, Safari, Edge)
          '&::-webkit-scrollbar': {
            width: '12px',
            height: '12px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f5f9',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#cbd5e1',
            borderRadius: '10px',
            border: '2px solid #f1f5f9',
            '&:hover': {
              background: '#94a3b8',
            },
          },
          // Firefox scrollbar
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 #f1f5f9',
        },
        // Custom scrollbar untuk semua elemen dengan scroll
        '*::-webkit-scrollbar': {
          width: '10px',
          height: '10px',
        },
        '*::-webkit-scrollbar-track': {
          background: '#f1f5f9',
          borderRadius: '8px',
        },
        '*::-webkit-scrollbar-thumb': {
          background: '#cbd5e1',
          borderRadius: '8px',
          border: '2px solid #f1f5f9',
          '&:hover': {
            background: '#94a3b8',
          },
        },
      },
    },
    // Button overrides
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 500,
          boxShadow: 'none',
          // Hilangkan outline hitam saat di-click
          '&:focus': {
            outline: 'none',
          },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'currentColor',
            outlineOffset: '2px',
          },
          '&.MuiButton-contained': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
            },
            '&:active': {
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
            },
          },
        },
      },
    },
    // IconButton overrides
    MuiIconButton: {
      styleOverrides: {
        root: {
          // Hilangkan outline hitam saat di-click
          '&:focus': {
            outline: 'none',
          },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'currentColor',
            outlineOffset: '2px',
          },
        },
      },
    },
    // TableCell overrides - prevent text wrap
    MuiTableCell: {
      styleOverrides: {
        root: {
          whiteSpace: 'nowrap',
          padding: '12px 16px',
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#f8fafc',
          color: '#1e293b',
          whiteSpace: 'nowrap',
        },
      },
    },
    // Paper overrides - smooth shadows
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
        },
        elevation4: {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    // Card overrides
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    // Dialog overrides
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    // TextField overrides
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:focus-within': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '2px',
              },
            },
          },
        },
      },
    },
    // Input overrides - hilangkan outline
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
            },
          },
          '&:focus': {
            outline: 'none',
          },
        },
        input: {
          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
    // Select overrides
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            outline: 'none',
            backgroundColor: 'transparent',
          },
        },
      },
    },
    // Chip overrides
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '6px',
        },
      },
    },
    // TableContainer overrides - custom scroll
    MuiTableContainer: {
      styleOverrides: {
        root: {
          '&::-webkit-scrollbar': {
            width: '10px',
            height: '10px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f5f9',
            borderRadius: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#cbd5e1',
            borderRadius: '8px',
            border: '2px solid #f1f5f9',
            '&:hover': {
              background: '#94a3b8',
            },
          },
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 #f1f5f9',
        },
      },
    },
    // Tabs overrides
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          '&:focus': {
            outline: 'none',
          },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'currentColor',
            outlineOffset: '2px',
          },
        },
      },
    },
    // Menu overrides
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        },
      },
    },
    // MenuItem overrides
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
    // Tooltip overrides
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1e293b',
          fontSize: '0.75rem',
          fontWeight: 500,
          borderRadius: '6px',
          padding: '6px 12px',
        },
        arrow: {
          color: '#1e293b',
        },
      },
    },
    // Link overrides
    MuiLink: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
          },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'currentColor',
            outlineOffset: '2px',
          },
        },
      },
    },
  },
});

export default theme;