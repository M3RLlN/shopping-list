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

function ItemRow({ item, onToggleBought, mode, onEdit, isSelected, onToggleSelect }: Props) {
  return (
    <ListItem
      secondaryAction={
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
