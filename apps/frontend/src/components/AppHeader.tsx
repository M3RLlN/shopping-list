import { Box, Typography } from "@mui/material";
import ThemeToggleButton from "./ThemeToggleButton";

function AppHeader() {
  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ flex: 1 }} />
      <Typography variant="h1">Einkaufsliste</Typography>
      <Box sx={{ flex: 1, textAlign: "right" }}>
        <ThemeToggleButton />
      </Box>
    </Box>
  );
}

export default AppHeader;
