import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  Dashboard,
  People,
  Person,
  Settings,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function Sidebar({
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/dashboard",
    },
    {
      text: "Clientes",
      icon: <People />,
      path: "/customers",
    },
    {
      text: "Perfil",
      icon: <Person />,
      path: "/profile",
    },
    {
      text: "Configurações",
      icon: <Settings />,
      path: "/settings",
    },
  ];

  return (
    <Box component="nav">
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant={isNonMobile ? "persistent" : "temporary"}
        anchor="left"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <Box width="100%">
          <Box p={3} display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: "bold",
                letterSpacing: "0.5px",
              }}
            >
              ADMIN
            </Typography>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <ChevronLeft />
            </IconButton>
          </Box>
          <List sx={{ px: 2 }}>
            {navItems.map(({ text, icon, path }) => {
              const isActive = location.pathname === path;

              return (
                <ListItem
                  key={text}
                  onClick={() => navigate(path)}
                  sx={{
                    borderRadius: "8px",
                    mb: 0.5,
                    backgroundColor: isActive
                      ? theme.palette.primary.light + "15"
                      : "transparent",
                    color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light + "15",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

Sidebar.propTypes = {
  isNonMobile: PropTypes.bool.isRequired,
  drawerWidth: PropTypes.string.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
}; 