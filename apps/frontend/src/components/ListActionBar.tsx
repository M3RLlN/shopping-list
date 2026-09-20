import { Button, Box } from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";

type Props = {
  onEnterEditMode: () => void;
};

function ListActionBar({ onEnterEditMode }: Props) {
  return (
    <Button
      sx={{ borderRadius: 0, flexDirection: "column", "& .MuiButton-startIcon": { margin: 0 } }}
      variant="contained"
      disableElevation
      color="secondary"
      fullWidth
      startIcon={
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, lineHeight: 1 }}>
          <EditOutlined fontSize="small" /> /
          <DeleteOutlined fontSize="small" />
        </Box>
      }
      onClick={onEnterEditMode}
    >
      Bearbeiten und Löschen
    </Button>
  );
}

export default ListActionBar;
