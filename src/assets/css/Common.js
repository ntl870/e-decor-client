import { createTheme, makeStyles } from "@material-ui/core";

/* -------------- colors ---------------------*/
export const primaryColor = "#004643";
export const secondaryColor = "#abd1c6";
export const disabledColor = "#BCBCBC";

export const backgroundColor = "#004643";
export const headlineColor = "#fffffe";
export const paragraphColor = "#abd1c6";
export const buttonColor = "#f9bc60";
export const buttonTextColor = "#f9bc60";

/* ------------ common component styles -------*/
export const commonStyle = makeStyles(() => ({}));

/* ----------- customized theme styles -------*/
export const theme = createTheme({
  palette: {
    // primary: {
    //   main: primaryColor,
    // },
    // secondary: {
    //   main: secondaryColor,
    // },
  },
  typography: {
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h6: {},
    h5: {},
    button: {
      fontSize: "1rem",
      textTransform: "capitalize",
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: "none",
      },
    },
  },
});
