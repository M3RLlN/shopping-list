import { Box, Button } from "@mui/material";
import { ArrowBackOutlined, DeleteOutlined } from "@mui/icons-material";

type Props = {
  onExitEditMode: () => void;
  onDeleteSelected: () => void;
  selectedCount: number;
};

function EditActionBar({ onExitEditMode, onDeleteSelected, selectedCount }: Props) {
  return (
    <Box sx={{ display: "flex" }}>
      <Button
        sx={{ borderRadius: 0, flexDirection: "column", "& .MuiButton-startIcon": { margin: 0 } }}
        variant="contained"
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
