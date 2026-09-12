import { Box, Snackbar, Alert } from "@mui/material";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import PaperSheet from "../components/PaperSheet";
import { useItems } from "../hooks/useItems";

function ShoppingListPage() {
  const { items, isLoading, error, toggleBought, notice, clearNotice } = useItems();

  return (
    <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      <AppHeader />
      <Box sx={{ padding: 2, display: "flex", flex: 1, minHeight: 0 }}>
        <PaperSheet
          items={items}
          isLoading={isLoading}
          error={error}
          onToggleBought={toggleBought}
        />
      </Box>
      <AppFooter />
      <Snackbar open={notice != null} autoHideDuration={6000} onClose={clearNotice}>
        <Alert severity="error" onClose={clearNotice}>
          {notice}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ShoppingListPage;
