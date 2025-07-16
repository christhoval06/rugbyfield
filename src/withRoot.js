import React from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import indigo from '@mui/material/colors/indigo';
import red from '@mui/material/colors/red';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

const styles = {
  'html, body, #app': {
    width: `100%`,
    height: `100%`,
    margin: 0,
    padding: 0,
    overflowY: 'hidden',
  },

  body: {
    // backgroundColor: '#dfdfdf',
  },

  ':focus': {
    outline: 'none !important',
  },
};

// A theme with custom primary and secondary color.
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: styles,
    },
  },
  typography: {
    useNextVariants: true,
  },
  palette: {
    // mode: 'dark',
    primary: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
    secondary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
    },
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={styles} />
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline enableColorScheme />
        <Component {...props} />
      </ThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
