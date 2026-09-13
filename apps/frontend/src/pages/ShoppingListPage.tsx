import { Box, Snackbar, Alert } from "@mui/material";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import PaperSheet from "../components/PaperSheet";
import { useItems } from "../hooks/useItems";
import AddFab from "../components/AddFab";
import { useState } from "react";
import ItemFormDialog from "../components/ItemFormDialog";

function ShoppingListPage() {
  const { items, isLoading, error, toggleBought, notice, clearNotice, addItem } = useItems();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const openAddDialog = () => {
    setIsDialogOpen(true);
  };

  const closeAddDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      <AppHeader />
      <Box sx={{ padding: 2, display: "flex", flex: 1, minHeight: 0, position: "relative" }}>
        <PaperSheet
          items={items}
          isLoading={isLoading}
          error={error}
          onToggleBought={toggleBought}
        />
        <AddFab onClick={openAddDialog} />
      </Box>
      <AppFooter />
      <Snackbar open={notice != null} autoHideDuration={6000} onClose={clearNotice}>
        <Alert severity="error" onClose={clearNotice}>
          {notice}
        </Alert>
      </Snackbar>
      <ItemFormDialog open={isDialogOpen} onClose={closeAddDialog} onSave={addItem} />
    </Box>
  );
}

export default ShoppingListPage;
