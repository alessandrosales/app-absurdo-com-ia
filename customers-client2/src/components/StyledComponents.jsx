import styled from "styled-components";
import { TextField, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { glowAnimation, scanlineAnimation } from "./animations";

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0a0a0a;
  padding: 20px;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 255, 159, 0.03),
      rgba(0, 255, 159, 0.03) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }
`;

export const LoginBox = styled.div`
  background: rgba(26, 26, 26, 0.9);
  border: 1px solid #00ff9f;
  padding: 48px 40px;
  width: 100%;
  max-width: 420px;
  position: relative;
  overflow: hidden;
  animation: ${glowAnimation} 2s infinite;
  box-shadow: 0 0 30px rgba(0, 255, 159, 0.1);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: linear-gradient(transparent, #00ff9f, transparent);
    animation: ${scanlineAnimation} 3s linear infinite;
  }
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 32px;

  & .MuiOutlinedInput-root {
    color: #00ff9f;
    font-family: "Share Tech Mono", monospace;
    height: 56px;

    & input {
      padding: 16px;
      padding-left: 56px;
      font-size: 1.1rem;
      height: 100%;
      line-height: 1.2;
      &::placeholder {
        color: rgba(0, 255, 159, 0.5);
        opacity: 1;
        font-family: "Share Tech Mono", monospace;
      }
    }

    & .MuiInputAdornment-root {
      position: absolute;
      left: 16px;
      height: 100%;
      max-height: none;
      pointer-events: none;

      & .MuiSvgIcon-root {
        color: #00ff9f;
        font-size: 24px;
      }
    }

    & .MuiInputAdornment-end {
      position: absolute;
      right: 16px;
      left: auto;
      pointer-events: auto;
    }

    & fieldset {
      border-color: #00ff9f;
      border-width: 2px;

      legend {
        font-size: 0.85em;
        margin-left: -4px;
      }
    }

    &:hover fieldset {
      border-color: #00ff9f;
      box-shadow: 0 0 8px rgba(0, 255, 159, 0.4);
    }

    &.Mui-focused fieldset {
      border-color: #00ff9f;
      box-shadow: 0 0 15px rgba(0, 255, 159, 0.4);
    }
  }
`;

export const StyledLink = styled(Link)`
  color: #00ff9f;
  text-decoration: none;
  font-family: "Share Tech Mono", monospace;
  position: relative;

  &:hover {
    text-shadow: 0 0 8px #00ff9f;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 1px;
      background-color: #00ff9f;
      box-shadow: 0 0 8px #00ff9f;
    }
  }
`;

export const StyledButton = styled(Button)`
  background-color: #00ff9f;
  color: #000;
  font-size: 1.1rem;
  padding: 16px;
  margin-top: 16px;
  margin-bottom: 32px;
  font-family: "Share Tech Mono", monospace;
  height: 56px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #00cc7d;
    box-shadow: 0 0 20px rgba(0, 255, 159, 0.4);
  }

  &:disabled {
    background-color: rgba(0, 255, 159, 0.5);
  }
`;

export const LinksContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
  gap: 24px;
  font-family: "Share Tech Mono", monospace;
`;

// ... resto dos componentes estilizados do arquivo styles.js ... 