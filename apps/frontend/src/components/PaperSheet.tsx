import { Box, List } from "@mui/material";
import ItemRow from "./ItemRow";

const items = [
  {
    id: "i1",
    label: "Mehl",
    amount: 2,
    unit: "x",
    bought: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "i2",
    label: "Wasser",
    amount: 12,
    unit: "l",
    bought: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "i3",
    label: "Katzenfutter",
    amount: 2,
    unit: "kg",
    bought: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  { id: "i4", label: "Bügeleisen", bought: false, createdAt: new Date(), updatedAt: new Date() },
  {
    id: "i5",
    label: "Zement",
    amount: 2,
    unit: "kg",
    bought: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function PaperSheet() {
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
