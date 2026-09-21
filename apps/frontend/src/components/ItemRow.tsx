import { ListItem, ListItemText, Checkbox, Box, IconButton } from "@mui/material";
import type { Item } from "@shopping/domain";
import { EditOutlined } from "@mui/icons-material";

type Props = {
  item: Item;
  onToggleBought: (item: Item) => void;
  mode: "normal" | "edit";
  onEdit: (item: Item) => void;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
};

/**
 * One row: an edit button in edit mode, label, amount, unit, and a checkbox whose meaning depends on mode.
 */
function ItemRow({ item, onToggleBought, mode, onEdit, isSelected, onToggleSelect }: Props) {
  return (
    <ListItem
      secondaryAction={
        // Same checkbox, "bought" in normal mode, "selected for deletion" in edit mode.
        <Checkbox
          onChange={mode === "normal" ? () => onToggleBought(item) : () => onToggleSelect(item.id)}
          checked={mode === "normal" ? item.bought : isSelected}
        />
      }
    >
      {mode === "edit" && (
        <IconButton sx={{ paddingY: 0, paddingLeft: 0 }} onClick={() => onEdit(item)}>
          <EditOutlined />
        </IconButton>
      )}
      <Box
        // The strikethrough is one line drawn over this box, not textDecoration,
        // which would break across the gaps between the three text elements below.
        sx={{
          display: "flex",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            borderTop: "2px solid currentColor",
            display: item.bought ? "block" : "none",
          },
        }}
      >
        <ListItemText primary={item.label} sx={{ flexGrow: 0 }} />
        {item.amount && <ListItemText primary={item.amount} sx={{ flexGrow: 0, marginLeft: 2 }} />}
        {item.unit && <ListItemText primary={item.unit} sx={{ marginLeft: 0.5 }} />}
      </Box>
    </ListItem>
  );
}

export default ItemRow;
