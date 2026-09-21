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

/**
 * The paper sheet: item list, loading spinner, and error message.
 */
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
        // Extra room so the last row does not hide behind AddFab.
        paddingBottom: 8,
        flex: 1,
        backgroundColor: "background.paper",
        boxShadow: 10,
        overflow: "auto",
        // Two gradients draw the grid lines, using the theme's divider color.
        backgroundImage:
          "linear-gradient(to right, var(--mui-palette-divider) 1px, transparent 1px), linear-gradient(to bottom, var(--mui-palette-divider) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        backgroundPosition: "center",
      }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      {isLoading && <CircularProgress />}
      {!isLoading && !error && (
        <List sx={{ padding: 0 }}>
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
