import React from 'react';
import {Provider} from 'mobx-react';
import mixpanel from 'mixpanel-browser';
import {MixpanelProvider} from './context/MixpanelContext';

import withRoot from './withRoot';
import Main from './screens/main.screen';

mixpanel.init("9c26590bc0a9d6d3cb9d238674675485");

const App = ({store, ...props}) => (
	<MixpanelProvider mixpanel={mixpanel}>
		<Provider {...store}>
			<Main {...props}/>
		</Provider>
	</MixpanelProvider>);

export default withRoot(App);

// https://reactjs.org/docs/typechecking-with-proptypes.html
