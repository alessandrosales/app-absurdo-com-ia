import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00ff9f",
      light: "#50fdb4",
      dark: "#00b36b",
    },
    secondary: {
      main: "#ff0055",
      light: "#ff4081",
      dark: "#c51162",
    },
    background: {
      default: "#0a0a0a",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#00ff9f",
      secondary: "#b3b3b3",
    },
  },
  typography: {
    fontFamily: "'Share Tech Mono', monospace",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
      `,
    },
  },
});
