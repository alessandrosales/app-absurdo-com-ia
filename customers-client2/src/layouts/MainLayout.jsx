import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import { styled, keyframes } from "styled-components";
import { Sidebar } from "../components/Sidebar";
import { MatrixEffect } from "../components/MatrixEffect";

const drawerWidth = 240;

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const Header = styled.header`
  background-color: rgba(26, 26, 26, 0.95);
  border-bottom: 1px solid #00ff9f;
  padding: 16px 24px;
  color: #00ff9f;
  font-family: 'Share Tech Mono', monospace;
  display: flex;
  align-items: center;
  box-shadow: 0 0 20px rgba(0, 255, 159, 0.1);
`;

const CursorBlink = styled.span`
  display: inline-block;
  width: 12px;
  height: 24px;
  background-color: #00ff9f;
  margin-left: 8px;
  animation: ${blinkAnimation} 1s infinite;
`;

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #1a1a1a;
`;

const ContentArea = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/app/dashboard" },
    { text: "Customers", icon: <PeopleIcon />, path: "/app/customers" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    navigate("/login");
  };

  const drawer = (
    <Box sx={{ 
      height: "100%", 
      backgroundColor: "#1a1a1a",
      borderRight: "1px solid #00ff9f" 
    }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              color: "#00ff9f",
              "&.Mui-selected": {
                backgroundColor: "rgba(0, 255, 159, 0.1)",
              },
              "&:hover": {
                backgroundColor: "rgba(0, 255, 159, 0.05)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#00ff9f" }}>{item.icon}</ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                "& .MuiTypography-root": { 
                  fontFamily: "'Share Tech Mono', monospace" 
                } 
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <MainContainer>
      <MatrixEffect />
      <Sidebar />
      <ContentArea>
        <Header>
          <div style={{ fontSize: "24px", letterSpacing: "2px" }}>
            {`> CYBERPANEL_`}
            <CursorBlink />
          </div>
        </Header>
        <Outlet />
      </ContentArea>
    </MainContainer>
  );
} 