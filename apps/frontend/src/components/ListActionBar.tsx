import { Button } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";

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
      startIcon={<EditOutlined />}
      onClick={onEnterEditMode}
    >
      Bearbeiten und Löschen
    </Button>
  );
}

export default ListActionBar;
