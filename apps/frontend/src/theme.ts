import { createTheme } from "@mui/material";

const HANDWRITING = '"Caveat Variable", cursive';
const STANDARD = '"Arial", "sans-serif"';

const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" }, // A selector ("class" or "data") is required, without it MUI ignores setMode() and follows the OS setting.
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#606C38" },
        secondary: { main: "#BC6C25" },
        background: { default: "#fefae0" },
        error: { main: "#d32f2f" },
        divider: "#7777771e", // Also used as the grid line color in PaperSheet.tsx.
      },
    },
    dark: {
      palette: {
        primary: { main: "#A3B26A" },
        secondary: { main: "#DDA15E" },
        background: { default: "#283618" },
        error: { main: "#f44336", contrastText: "rgba(0,0,0,0.87)" }, // Set explicitly, MUI's own contrast pick was unreadable against this red.
        divider: "#fefae017",
      },
    },
  },
  typography: {
    fontFamily: STANDARD,
    h1: {
      fontFamily: HANDWRITING,
      fontWeight: 700,
      fontSize: "2.5rem",
    },
  },
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: HANDWRITING,
          fontWeight: 700,
          fontSize: "1.3rem",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: HANDWRITING,
          fontWeight: 700,
          fontSize: "2rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: HANDWRITING,
          fontWeight: 700,
          fontSize: "1.3rem",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0,0,0,0.85)",
        },
      },
    },
  },
});

export default theme;
