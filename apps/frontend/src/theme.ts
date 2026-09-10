import { createTheme } from "@mui/material";

const HANDWRITING = '"Caveat Variable", cursive';
const STANDARD = '"Arial", "sans-serif"';

const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#606C38" },
        secondary: { main: "#BC6C25" },
        background: { default: "#fefae0" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#A3B26A" },
        secondary: { main: "#DDA15E" },
        background: { default: "#283618" },
      },
    },
  },
  typography: {
    fontFamily: STANDARD,
    h1: {
      fontFamily: HANDWRITING,
      fontSize: "2.5rem",
    },
  },
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: HANDWRITING,
        },
      },
    },
  },
});

export default theme;
