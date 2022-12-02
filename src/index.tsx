import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./screens/App";
import ReactGA from "react-ga4";
import StyledComponentsThemeProvider, {
  FixedGlobalStyle,
  ThemedGlobalStyle,
} from "./theme";
import { store } from "./state";
import { Provider } from "react-redux";
import { isMobile } from "web3modal";

const GOOGLE_ANALYTICS_ID: string | undefined =
  process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
if (typeof GOOGLE_ANALYTICS_ID === "string") {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
    gaOptions: {
      storage: "none",
      storeGac: false,
    },
  });
  ReactGA.set({
    anonymizeIp: true,
    customBrowserType: !isMobile
      ? "desktop"
      : "web3" in window || "ethereum" in window
      ? "mobileWeb3"
      : "mobileRegular",
  });
} else {
  ReactGA.initialize("test", { testMode: true });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FixedGlobalStyle />
      <StyledComponentsThemeProvider>
        <ThemedGlobalStyle />
        <App />
      </StyledComponentsThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
