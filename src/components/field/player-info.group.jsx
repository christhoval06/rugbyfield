import React from 'react';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import PlayerInfoStyleCard from './PlayerInfoStyleCard';
import PlayerInfoStyleSimple from './PlayerInfoStyleSimple';

const PlayerInfoGroup = ({ OptionsStore, player, attr, template = 'simple' }) => {
  if (!OptionsStore.showText) {
    return null;
  }

  const withAvatar = OptionsStore.showImages || OptionsStore.showOnlyInitials;

  let PlayerInfoWithStyle = PlayerInfoStyleSimple;
  if (template === 'card') {
	PlayerInfoWithStyle = PlayerInfoStyleCard
  }

  return (
    <PlayerInfoWithStyle
      player={player}
      attr={attr}
      fontSize={OptionsStore.playerFontSize}
      withAvatar={withAvatar}
    />
  );
};

PlayerInfoGroup.propTypes = {
  OptionsStore: PropTypes.object,
  player: PropTypes.object,
  attr: PropTypes.object,
  template: PropTypes.oneOf(['simple', 'card']),
};

export default compose(inject('OptionsStore'), observer)(PlayerInfoGroup);
