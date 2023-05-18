import "@/styles/custom.css";
import { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "@/utils/theme";
import { Provider } from "react-redux";
import { store } from "../utils/redux-arch/store";

export default function App({ Component, pageProps }) {
  const theme = createTheme(themeSettings("light"))
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
    </Provider>
  );
}
