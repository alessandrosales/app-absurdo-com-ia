import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { router } from "./routes";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App; 