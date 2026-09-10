import { Box } from "@mui/material";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import PaperSheet from "../components/PaperSheet";

function ShoppingListPage() {
  return (
    <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      <AppHeader />
      <Box sx={{ padding: 2, display: "flex", flex: 1 }}>
        <PaperSheet />
      </Box>
      <AppFooter />
    </Box>
  );
}

export default ShoppingListPage;
