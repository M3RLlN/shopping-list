import { IconButton } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useColorScheme } from "@mui/material/styles";

function ThemeToggleButton() {
  const { mode, setMode } = useColorScheme();

  return (
    <IconButton color="inherit" onClick={() => setMode(mode === "light" ? "dark" : "light")}>
      {mode === "light" ? <DarkModeOutlined /> : <LightModeOutlined />}
    </IconButton>
  );
}

export default ThemeToggleButton;
