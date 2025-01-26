import {
  Box,
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  useTheme as useMuiTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  LightMode,
  DarkMode,
  NotificationsOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { useTheme } from "../../contexts/ThemeContext";

export default function Topbar({ isSidebarOpen, setIsSidebarOpen }) {
  const muiTheme = useMuiTheme();
  const { toggleColorMode, mode } = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        background: muiTheme.palette.background.paper,
        color: muiTheme.palette.text.primary,
      }}
    >
      <Toolbar>
        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Box display="flex">
          <IconButton>
            <NotificationsOutlined />
          </IconButton>
          <IconButton>
            <PersonOutlined />
          </IconButton>
          <IconButton onClick={toggleColorMode}>
            {mode === "dark" ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

Topbar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
}; 