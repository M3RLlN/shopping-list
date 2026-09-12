import { Box, List, Alert, CircularProgress } from "@mui/material";
import ItemRow from "./ItemRow";
import type { Item } from "@shopping/domain";

type Props = {
  items: Item[];
  isLoading: boolean;
  error: string | null;
  onToggleBought: (item: Item) => void;
};

function PaperSheet({ items, isLoading, error, onToggleBought }: Props) {
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
            <ItemRow key={item.id} item={item} onToggleBought={onToggleBought} />
          ))}
        </List>
      )}
    </Box>
  );
}

export default PaperSheet;
