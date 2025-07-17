import React from 'react';
import { Provider } from 'mobx-react';
import mixpanel from 'mixpanel-browser';
import { MixpanelProvider } from './context/MixpanelContext';
import { MenuProvider } from './hooks/MenuProvider';

import withRoot from './withRoot';
import Main from './screens/main.screen';

mixpanel.init('9c26590bc0a9d6d3cb9d238674675485');

// https://reactjs.org/docs/typechecking-with-proptypes.html
const App = ({ store, ...props }) => (
  <MixpanelProvider mixpanel={mixpanel}>
    <Provider {...store}>
      <MenuProvider>
        <Main {...props} />
      </MenuProvider>
    </Provider>
  </MixpanelProvider>
);

export default withRoot(App);
