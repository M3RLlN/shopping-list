import { Box, List } from "@mui/material";
import ItemRow from "./ItemRow";
import { useItems } from "../hooks/useItems";

function PaperSheet() {
  const { items } = useItems();

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
      <List>
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </List>
    </Box>
  );
}

export default PaperSheet;
