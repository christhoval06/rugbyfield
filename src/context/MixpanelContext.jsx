import React from 'react';
import PropTypes from 'prop-types';

const MixpanelContext = React.createContext(null);

export const withMixpanel = (Component) =>
  React.forwardRef((props, ref) => (
    <MixpanelContext.Consumer>
      {(mixpanel) => <Component {...props} mixpanel={mixpanel} ref={ref} />}
    </MixpanelContext.Consumer>
  ));

MixpanelContext.Provider.propTypes = {
  value: PropTypes.shape({
    init: PropTypes.func.isRequired,
    track: PropTypes.func.isRequired,
  }),
};

export class MixpanelProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    mixpanel: PropTypes.shape({
      init: PropTypes.func.isRequired,
      track: PropTypes.func.isRequired,
      register: PropTypes.func.isRequired,
      people: PropTypes.object.isRequired,
    }),
  };

  render() {
    return (
      <MixpanelContext.Provider value={this.props.mixpanel}>
        {this.props.children}
      </MixpanelContext.Provider>
    );
  }
}

export const MixpanelConsumer = MixpanelContext.Consumer;

export default MixpanelContext;
