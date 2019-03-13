import React from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';

// A theme with custom primary and secondary color.
const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		primary  : {
			light: red[300],
			main : red[500],
			dark : red[700],
		},
		secondary: {
			light: indigo[300],
			main : indigo[500],
			dark : indigo[700],
		},
	},
});

function withRoot(Component) {
	function WithRoot(props) {
		// MuiThemeProvider makes the theme available down the React tree
		// thanks to React context.
		return (
			<MuiThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline/>
				<Component {...props} />
			</MuiThemeProvider>
		);
	}

	return WithRoot;
}

export default withRoot;
