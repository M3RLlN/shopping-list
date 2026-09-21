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

/**
 * The only place that calls useItems. Everything else only receives data and calls a function it was given,
 * e.g. onToggleBought, when the user does something.
 */
function ShoppingListPage() {
  const {
    items,
    isLoading,
    error,
    toggleBought,
    notice,
    clearNotice,
    addItem,
    updateItem,
    deleteMany,
  } = useItems();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<"normal" | "edit">("normal");
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const openAddDialog = () => {
    setIsDialogOpen(true);
  };

  /**
   * Also clears editingItem, otherwise the next "add" reopens the last edited item.
   */
  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const enterEditMode = () => {
    setMode("edit");
  };

  const exitEditMode = () => {
    setMode("normal");
    setSelectedIds(new Set());
  };

  const openEditDialog = (item: Item) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  /**
   * Clears the selection but stays in edit mode, so the user can keep deleting.
   */
  const deleteSelected = async () => {
    await deleteMany(Array.from(selectedIds));
    setSelectedIds(new Set());
  };

  const toggleSelected = (id: string) => {
    const updatedIds = new Set(selectedIds);
    if (updatedIds.has(id)) {
      updatedIds.delete(id);
    } else {
      updatedIds.add(id);
    }
    setSelectedIds(updatedIds);
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
          selectedIds={selectedIds}
          onToggleSelect={toggleSelected}
        />
        <AddFab onClick={openAddDialog} />
      </Box>
      {mode === "normal" ? (
        <ListActionBar onEnterEditMode={enterEditMode} />
      ) : (
        <EditActionBar
          onExitEditMode={exitEditMode}
          onDeleteSelected={deleteSelected}
          selectedCount={selectedIds.size}
        />
      )}
      <Snackbar open={notice != null} autoHideDuration={6000} onClose={clearNotice}>
        <Alert severity="error" onClose={clearNotice}>
          {notice}
        </Alert>
      </Snackbar>
      <ItemFormDialog
        // A new key creates a fresh ItemFormDialog, so its lazy initializers run again with the new item's values.
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
