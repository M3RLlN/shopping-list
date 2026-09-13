import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  DialogActions,
  DialogContent,
  Box,
} from "@mui/material";
import type { CreateItemInput } from "@shopping/domain";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (item: CreateItemInput) => void;
};

function ItemFormDialog({ open, onClose, onSave }: Props) {
  const [label, setLabel] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [unit, setUnit] = useState<string>("");

  const resetForm = () => {
    setLabel("");
    setAmount("");
    setUnit("");
  };

  const handleSave = () => {
    const item: CreateItemInput = {
      label: label,
      amount: amount === "" ? undefined : Number(amount),
      unit: unit === "" ? undefined : unit,
    };
    onSave(item);
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
      <DialogTitle sx={{ color: "primary.contrastText" }}>Neuer Eintrag</DialogTitle>
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
          color="error"
          fullWidth
          onClick={handleCancel}
        >
          Abbrechen
        </Button>
        <Button
          sx={{ borderRadius: 0 }}
          variant="contained"
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
