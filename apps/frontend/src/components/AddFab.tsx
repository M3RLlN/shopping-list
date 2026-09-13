import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

type Props = {
  onClick: () => void;
};

function AddFab({ onClick }: Props) {
  return (
    <Fab sx={{ position: "absolute", bottom: 24, right: 24 }} color="primary" onClick={onClick}>
      <Add />
    </Fab>
  );
}

export default AddFab;
