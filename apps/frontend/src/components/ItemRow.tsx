import { ListItem, ListItemText, Checkbox, Box } from "@mui/material";
import type { Item } from "@shopping/domain";

type Props = {
  item: Item;
  onToggleBought: (item: Item) => void;
};

function ItemRow({ item, onToggleBought }: Props) {
  return (
    <ListItem
      secondaryAction={<Checkbox onChange={() => onToggleBought(item)} checked={item.bought} />}
    >
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
            borderTop: "1px solid currentColor",
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
