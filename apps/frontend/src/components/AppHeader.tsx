import { Box, Typography } from "@mui/material";
import ThemeToggleButton from "./ThemeToggleButton";

/**
 * Top bar: app title, centered, with the theme toggle on the right.
 */
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
      {/* Two equal flex boxes center the title without a measured pixel width,
       which would break once the toggle icon's size changes. */}
      <Box sx={{ flex: 1 }} />
      <Typography variant="h1">Einkaufsliste</Typography>
      <Box sx={{ flex: 1, textAlign: "right" }}>
        <ThemeToggleButton />
      </Box>
    </Box>
  );
}

export default AppHeader;
