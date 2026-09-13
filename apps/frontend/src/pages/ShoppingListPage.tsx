import { Box, Snackbar, Alert } from "@mui/material";
import AppHeader from "../components/AppHeader";
import PaperSheet from "../components/PaperSheet";
import { useItems } from "../hooks/useItems";
import AddFab from "../components/AddFab";
import { useState } from "react";
import ItemFormDialog from "../components/ItemFormDialog";
import ListActionBar from "../components/ListActionBar";
import EditActionBar from "../components/EditActionBar";
import type { Item } from "@shopping/domain";

function ShoppingListPage() {
  const { items, isLoading, error, toggleBought, notice, clearNotice, addItem, updateItem } =
    useItems();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<"normal" | "edit">("normal");
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const openAddDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const enterEditMode = () => {
    setMode("edit");
  };

  const exitEditMode = () => {
    setMode("normal");
  };

  const openEditDialog = (item: Item) => {
    setEditingItem(item);
    setIsDialogOpen(true);
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
          mode={mode}
          onEdit={openEditDialog}
        />
        <AddFab onClick={openAddDialog} />
      </Box>
      {mode === "normal" ? (
        <ListActionBar onEnterEditMode={enterEditMode} />
      ) : (
        <EditActionBar
          onExitEditMode={exitEditMode}
          onDeleteSelected={() => {}}
          selectedCount={0}
        />
      )}
      <Snackbar open={notice != null} autoHideDuration={6000} onClose={clearNotice}>
        <Alert severity="error" onClose={clearNotice}>
          {notice}
        </Alert>
      </Snackbar>
      <ItemFormDialog
        key={editingItem?.id ?? "new"}
        open={isDialogOpen}
        onClose={closeDialog}
        onCreate={addItem}
        onUpdate={updateItem}
        itemToEdit={editingItem}
      />
    </Box>
  );
}

export default ShoppingListPage;
