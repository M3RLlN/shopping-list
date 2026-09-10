import { Box } from "@mui/material";

function PaperSheet() {
  return (
    <Box
      sx={{
        padding: 2,
        flex: 1,
        backgroundColor: "background.paper",
        boxShadow: 10,
      }}
    >
      Body
    </Box>
  );
}

export default PaperSheet;
