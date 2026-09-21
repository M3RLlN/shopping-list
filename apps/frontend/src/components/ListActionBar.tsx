import { Button, Box } from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";

type Props = {
  onEnterEditMode: () => void;
};

/**
 * Bottom bar in normal mode, switches the page into edit mode.
 */
function ListActionBar({ onEnterEditMode }: Props) {
  return (
    <Button
      // No slotProps on this Button version, the &-selector is the simplest way in.
      sx={{ borderRadius: 0, flexDirection: "column", "& .MuiButton-startIcon": { margin: 0 } }}
      variant="contained"
      disableElevation
      color="secondary"
      fullWidth
      startIcon={
        // fontSize="small" is required here, MUI only auto-shrinks the first direct child of startIcon.
        // lineHeight: 1 stops the "/" from stretching the bar.
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
