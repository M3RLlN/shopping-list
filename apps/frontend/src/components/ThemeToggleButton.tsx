import { IconButton } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useColorScheme } from "@mui/material/styles";

/**
 * Switches the app between light and dark mode.
 */
function ThemeToggleButton() {
  const { mode, setMode } = useColorScheme();

  return (
    // "inherit" is one of a fixed set of words here, not a theme path.
    <IconButton color="inherit" onClick={() => setMode(mode === "light" ? "dark" : "light")}>
      {mode === "light" ? <DarkModeOutlined /> : <LightModeOutlined />}
    </IconButton>
  );
}

export default ThemeToggleButton;
