import { Box, List, Alert, CircularProgress } from "@mui/material";
import ItemRow from "./ItemRow";
import type { Item } from "@shopping/domain";
import { sortItems } from "../utils/sortItems";

type Props = {
  items: Item[];
  isLoading: boolean;
  error: string | null;
  onToggleBought: (item: Item) => void;
  mode: "normal" | "edit";
  onEdit: (item: Item) => void;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
};

function PaperSheet({
  items,
  isLoading,
  error,
  onToggleBought,
  mode,
  onEdit,
  selectedIds,
  onToggleSelect,
}: Props) {
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
          {sortItems(items, mode).map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onToggleBought={onToggleBought}
              mode={mode}
              onEdit={onEdit}
              isSelected={selectedIds.has(item.id)}
              onToggleSelect={onToggleSelect}
            />
          ))}
        </List>
      )}
    </Box>
  );
}

export default PaperSheet;
