import { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material";
import PropTypes from "prop-types";
import { getDesignTokens } from "../theme";

const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => useContext(ThemeContext); 