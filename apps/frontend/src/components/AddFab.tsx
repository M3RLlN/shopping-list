import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

type Props = {
  onClick: () => void;
};

/**
 * Floating add button, visible in both normal and edit mode.
 */
function AddFab({ onClick }: Props) {
  return (
    // PaperSheet needs extra paddingBottom so the list does not sit behind this button.
    <Fab sx={{ position: "absolute", bottom: 24, right: 24 }} color="primary" onClick={onClick}>
      <Add />
    </Fab>
  );
}

export default AddFab;
