import React from "react";
import { ThemeProvider } from "styled-components";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    font?: string;
    textColor?: string;
    overlayColor?: string;
    hoverBackColor?: string;
    hoverTextColor?: string;
    disabledTextColor?: string;
    tooltipTextColor?: string;
    tooltipBackColor?: string;
    shadowColor?: string;
    borderColor?: string;
    background?: string;
  }
}

const theme = {
  font: "CooperHewitt",
  textColor: "black",
  overlayColor: "rgba(25, 25, 25, 0.9)",
  hoverBackColor: "rgb(230, 230, 230)",
  hoverTextColor: "black",
  disabledTextColor: "gray",
  tooltipTextColor: "white",
  tooltipBackColor: "black",
  shadowColor: "rgba(0, 0, 0, 0.2)",
  borderColor: "rgb(200, 200, 200)",
  background: `linear-gradient(rgba(255,255,255,.5), rgba(230,230,230,.5)),
  url('/noise.svg');`
};

const Theme = ({ children }: baseProps) => <ThemeProvider {...{ theme }}>{children}</ThemeProvider>;

Theme.theme = theme;

export default Theme;
