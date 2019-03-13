import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import {DEFAULT_PLAYER} from '../../constants/players';
import {withMixpanel} from '../../context/MixpanelContext';

import CropperComponent from "../cropper.component";
import OptionalHeaderComponent from './optional-header.component';
import PlayerFormComponent from './player-form.component';

const styles = {
	form: {
		display : 'flex',
		flexWrap: 'wrap',
	}
};

@withStyles(styles)
@withMixpanel
@inject('PlayersStore', 'OptionsStore')
@observer
class PlayerEditComponent extends Component {

	static propTypes = {
		PlayersStore: PropTypes.object,
		OptionsStore: PropTypes.object,
		classes     : PropTypes.object,
		anchor      : PropTypes.oneOf(['left', 'right']),
		mixpanel: PropTypes.object
	};

	constructor(props) {
		super(props);
		const {PlayersStore} = this.props;
		let {image} = DEFAULT_PLAYER;

		if (PlayersStore.editMode) {
			image = PlayersStore.selectedPlayer.image;
		}

		this.state = {
			...DEFAULT_PLAYER,
			image,
			croppedImage: null,
			openPosition: false,
			error       : null,
		};
	}

	onSubmit = (data) => {
		const {PlayersStore, mixpanel} = this.props;

		const {image} = this.state;

		const player = {
			...data,
			image,
		};

		if (PlayersStore.editMode) {
			mixpanel.track(`Edit Player`);
			PlayersStore.selectedPlayer.edit(player);
		} else {
			mixpanel.track(`Add Player`);
			PlayersStore.addPlayer(player);
		}

		this.onClose();
	};

	onCrop = croppedImage => {
		this.props.mixpanel.track('Crop Image.');
		this.setState({image: croppedImage, croppedImage})
	};

	onClose = () => {
		const {PlayersStore, OptionsStore, anchor} = this.props;
		if (PlayersStore.showPlayerModal) {
			PlayersStore.togglePlayerModal();
		}
		OptionsStore.closeDrawer(anchor);
	};

	render() {
		const {classes, anchor} = this.props;
		const {image, croppedImage} = this.state;

		return (
			<div>
				<OptionalHeaderComponent anchor={anchor} onClick={this.onClose} title="Player"/>
				<Divider/>
				<form className={classes.form} noValidate autoComplete="off">
					<CropperComponent
						image={croppedImage || image}
						defaultImage={image}
						onCrop={this.onCrop}/>

					<PlayerFormComponent onSubmit={this.onSubmit}/>
				</form>
			</div>
		);
	}

	componentWillUnmount() {
		this.setState({...DEFAULT_PLAYER});
		this.onClose();
	}
}

export default PlayerEditComponent;
