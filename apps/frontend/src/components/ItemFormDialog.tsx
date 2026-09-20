import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  DialogActions,
  DialogContent,
  Box,
} from "@mui/material";
import type { CreateItemInput, UpdateItemInput, Item } from "@shopping/domain";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (item: CreateItemInput) => void;
  onUpdate: (id: string, item: UpdateItemInput) => void;
  itemToEdit: Item | null;
};

function ItemFormDialog({ open, onClose, onCreate, onUpdate, itemToEdit }: Props) {
  const [label, setLabel] = useState<string>(() => itemToEdit?.label ?? "");
  const [amount, setAmount] = useState<string>(() =>
    itemToEdit?.amount != undefined ? String(itemToEdit.amount) : "",
  );
  const [unit, setUnit] = useState<string>(() =>
    itemToEdit?.unit != undefined ? itemToEdit.unit : "",
  );

  const resetForm = () => {
    setLabel("");
    setAmount("");
    setUnit("");
  };

  const handleSave = () => {
    const item: CreateItemInput = {
      label: label,
    };
    if (amount != "") item.amount = Number(amount);
    if (unit != "") item.unit = unit;
    if (itemToEdit == null) {
      onCreate(item);
    } else {
      onUpdate(itemToEdit.id, item);
    }
    resetForm();
    onClose();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      slotProps={{ paper: { sx: { backgroundColor: "primary.main" } } }}
    >
      <DialogTitle sx={{ color: "primary.contrastText" }}>
        {itemToEdit == null ? "Neuer Eintrag" : "Eintrag bearbeiten"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            slotProps={{
              input: { sx: { backgroundColor: "background.paper" } },
            }}
            placeholder="Name"
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
            }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              slotProps={{
                input: { sx: { backgroundColor: "background.paper" } },
                htmlInput: { inputMode: "numeric" },
              }}
              placeholder="Menge"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <TextField
              slotProps={{
                input: { sx: { backgroundColor: "background.paper" } },
              }}
              placeholder="Einheit"
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value);
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 0 }} disableSpacing>
        <Button
          sx={{ borderRadius: 0 }}
          variant="contained"
          disableElevation
          color="error"
          fullWidth
          onClick={handleCancel}
        >
          Abbrechen
        </Button>
        <Button
          sx={{ borderRadius: 0 }}
          variant="contained"
          disableElevation
          color="secondary"
          fullWidth
          onClick={handleSave}
        >
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ItemFormDialog;
