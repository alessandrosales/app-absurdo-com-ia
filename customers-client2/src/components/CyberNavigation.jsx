import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const NavContainer = styled.div`
  width: 250px;
  background: rgba(26, 26, 26, 0.9);
  border-right: 1px solid #00ff9f;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 255, 159, 0.2);
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  color: ${props => props.active ? '#00ff9f' : '#b3b3b3'};
  border: 1px solid ${props => props.active ? '#00ff9f' : 'transparent'};
  background: ${props => props.active ? 'rgba(0, 255, 159, 0.1)' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 159, 0.1);
    border-color: #00ff9f;
    box-shadow: 0 0 10px rgba(0, 255, 159, 0.3);
  }

  svg {
    margin-right: 10px;
  }
`;

const navItems = [
  { path: "/dashboard", icon: <DashboardIcon />, text: "DASHBOARD" },
  { path: "/customers", icon: <PeopleIcon />, text: "CUSTOMERS" },
  { path: "/profile", icon: <PersonIcon />, text: "PROFILE" },
  { path: "/settings", icon: <SettingsIcon />, text: "SETTINGS" },
];

export function CyberNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavContainer>
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          active={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          {item.text}
        </NavItem>
      ))}
    </NavContainer>
  );
} 