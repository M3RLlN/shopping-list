import { CssBaseline, ThemeProvider } from "@mui/material";
import ShoppingListPage from "./pages/ShoppingListPage";
import theme from "./theme";

/**
 * Root component: theme, CSS reset, the page.
 */
function App() {
  return (
    // Only the starting point, MUI remembers the real choice in localStorage afterwards.
    <ThemeProvider theme={theme} defaultMode="light">
      <CssBaseline />
      <ShoppingListPage />
    </ThemeProvider>
  );
}

export default App;
