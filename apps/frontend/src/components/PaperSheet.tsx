import { Box, List, Alert, CircularProgress, Snackbar } from "@mui/material";
import ItemRow from "./ItemRow";
import { useItems } from "../hooks/useItems";

function PaperSheet() {
  const { items, isLoading, error, toggleBought, notice, clearNotice } = useItems();

  return (
    <Box
      sx={{
        padding: 2,
        flex: 1,
        backgroundColor: "background.paper",
        boxShadow: 10,
        overflow: "auto",
      }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      {isLoading && <CircularProgress />}
      {!isLoading && !error && (
        <List>
          {items.map((item) => (
            <ItemRow key={item.id} item={item} onToggleBought={toggleBought} />
          ))}
        </List>
      )}
      <Snackbar open={notice != null} autoHideDuration={6000} onClose={clearNotice}>
        <Alert severity="error" onClose={clearNotice}>
          {notice}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default PaperSheet;
