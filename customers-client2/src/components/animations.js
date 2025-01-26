import { keyframes } from "styled-components";

export const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px #00ff9f; }
  50% { box-shadow: 0 0 20px #00ff9f; }
  100% { box-shadow: 0 0 5px #00ff9f; }
`;

export const scanlineAnimation = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;
