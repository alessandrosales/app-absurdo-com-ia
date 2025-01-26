import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const scanline = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const TerminalContainer = styled.div`
  position: relative;
  background-color: #0a0a0a;
  color: #00ff9f;
  padding: 20px;
  font-family: 'Share Tech Mono', monospace;
  overflow: hidden;
  min-height: 100vh;
  
  &::before {
    content: "";
    position: absolute;
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

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 255, 159, 0.2) 50%,
      transparent 100%
    );
    animation: ${scanline} 6s linear infinite;
    pointer-events: none;
  }
`;

const TerminalHeader = styled.div`
  border-bottom: 2px solid #00ff9f;
  padding-bottom: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TerminalTitle = styled.h1`
  color: #00ff9f;
  margin: 0;
  font-size: 1.5em;
  text-shadow: 0 0 10px #00ff9f;
  
  &::after {
    content: "_";
    animation: ${blink} 1s step-end infinite;
  }
`;

const SystemStatus = styled.div`
  color: #00ff9f;
  font-family: 'Share Tech Mono', monospace;
  text-shadow: 0 0 5px #00ff9f;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #00ff9f;
    border-radius: 50%;
    box-shadow: 0 0 10px #00ff9f;
    animation: ${blink} 2s step-end infinite;
  }
`;

const TerminalContent = styled.div`
  position: relative;
  z-index: 1;
`;

export function CyberTerminal({ title, children }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <TerminalContainer>
      <TerminalHeader>
        <TerminalTitle>{title}</TerminalTitle>
        <SystemStatus>
          {formatTime(time)} | SYSTEM: ONLINE
        </SystemStatus>
      </TerminalHeader>
      <TerminalContent>
        {children}
      </TerminalContent>
    </TerminalContainer>
  );
} 