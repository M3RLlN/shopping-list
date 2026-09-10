import { CssBaseline, ThemeProvider } from "@mui/material";
import ShoppingListPage from "./pages/ShoppingListPage";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme} defaultMode="light">
      <CssBaseline />
      <ShoppingListPage />
    </ThemeProvider>
  );
}

export default App;
