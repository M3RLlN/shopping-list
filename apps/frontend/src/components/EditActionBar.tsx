import { Box, Button } from "@mui/material";
import { ArrowBackOutlined, DeleteOutlined } from "@mui/icons-material";

type Props = {
  onExitEditMode: () => void;
  onDeleteSelected: () => void;
  selectedCount: number;
};

/**
 * Bottom bar in edit mode: back to normal, or delete the selected items.
 */
function EditActionBar({ onExitEditMode, onDeleteSelected, selectedCount }: Props) {
  return (
    <Box sx={{ display: "flex" }}>
      <Button
        // No slotProps on this Button version, same reason as in ListActionBar.tsx.
        sx={{ borderRadius: 0, flexDirection: "column", "& .MuiButton-startIcon": { margin: 0 } }}
        variant="contained"
        disableElevation
        color="secondary"
        fullWidth
        startIcon={<ArrowBackOutlined />}
        onClick={onExitEditMode}
      >
        Zurück
      </Button>
      <Button
        sx={{ borderRadius: 0, flexDirection: "column", "& .MuiButton-startIcon": { margin: 0 } }}
        variant="contained"
        disableElevation
        color="error"
        fullWidth
        startIcon={<DeleteOutlined />}
        onClick={onDeleteSelected}
      >
        Löschen {selectedCount}
      </Button>
    </Box>
  );
}

export default EditActionBar;
