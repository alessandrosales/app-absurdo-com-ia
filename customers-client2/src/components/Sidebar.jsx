import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";

const SidebarContainer = styled.div`
  width: 240px;
  background-color: rgba(26, 26, 26, 0.95);
  border-right: 1px solid #00ff9f;
  height: 100vh;
  padding: 20px 0;
  box-shadow: 4px 0 20px rgba(0, 255, 159, 0.1);
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: #00ff9f;
  text-decoration: none;
  font-family: 'Share Tech Mono', monospace;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 255, 159, 0.05);
  }
  
  &.active {
    background-color: rgba(0, 255, 159, 0.1);
  }
`;

const MenuIcon = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 24px;
  background: none;
  border: none;
  color: #00ff9f;
  font-family: 'Share Tech Mono', monospace;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: auto;
  
  &:hover {
    background-color: rgba(0, 255, 159, 0.05);
  }
`;

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { text: "DASHBOARD", icon: <DashboardIcon />, path: "/app/dashboard" },
    { text: "CUSTOMERS", icon: <PeopleIcon />, path: "/app/customers" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <SidebarContainer>
      {menuItems.map((item) => (
        <MenuItem
          key={item.text}
          to={item.path}
          className={location.pathname === item.path ? "active" : ""}
        >
          <MenuIcon>{item.icon}</MenuIcon>
          {item.text}
        </MenuItem>
      ))}
      
      <LogoutButton onClick={handleLogout}>
        <MenuIcon><LogoutIcon /></MenuIcon>
        LOGOUT
      </LogoutButton>
    </SidebarContainer>
  );
} 