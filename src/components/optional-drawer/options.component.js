import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

import {DEFAULT_OPTIONS} from "../../constants/options";
import {GAME_VARIANTS} from "../../constants/players";

import {withMixpanel} from '../../context/MixpanelContext';

import CropperComponent from "../cropper.component";
import OptionalHeaderComponent from './optional-header.component';
import ColorPickerComponent from "../color-picker.component";

const styles = theme => ({
	form            : {
		display : 'flex',
		flexWrap: 'wrap',
	},
	formContainer   : {
		display      : 'flex',
		width        : '100%',
		flexDirection: 'column',
	},
	formControl     : {
		...theme.mixins.toolbar,
		margin        : theme.spacing.unit,
		display       : 'flex',
		justifyContent: 'center',
		alignItems    : 'left',
	},
	formControlLabel: {
		...theme.mixins.toolbar,
		margin    : theme.spacing.unit,
		display   : 'flex',
		// justifyContent: 'center',
		alignItems: 'left',
	},
	flex            : {
		flex: 1,
	},
	row             : {
		display       : 'flex',
		justifyContent: 'left',
		alignItems    : 'center',
		flexDirection : 'row',
	}
});

@withStyles(styles)
@withMixpanel
@inject('OptionsStore')
@observer
class OptionsComponent extends Component {

	static propTypes = {
		OptionsStore: PropTypes.object,
		classes     : PropTypes.object,
		anchor      : PropTypes.oneOf(['left', 'right']),
		mixpanel    : PropTypes.object
	};

	constructor(props) {
		super(props);
		const {OptionsStore} = this.props;
		this.state = {
			...DEFAULT_OPTIONS,
			...OptionsStore,
			croppedImage: null
		};
	}

	onSubmit = () => {
		const {OptionsStore} = this.props;
		const {showText, showImages, gameVariant, teamName, teamImage, imagePlayersRadius, imageSubstitutesRadius, backgroundColor, playerFontSize, SubstitutesFontSize, showOnlyInitials} = this.state;
		this.props.mixpanel.track(`Save Options`);
		OptionsStore.save({
			showText,
			showImages,
			showOnlyInitials,
			gameVariant,
			teamName,
			teamImage,
			imagePlayersRadius    : parseInt(imagePlayersRadius, 10),
			imageSubstitutesRadius: parseInt(imageSubstitutesRadius, 10),
			backgroundColor,
			playerFontSize        : parseInt(playerFontSize, 10),
			SubstitutesFontSize   : parseInt(SubstitutesFontSize, 10)
		});
		this.onClose();
	};

	onCrop = croppedImage => {
		this.props.mixpanel.track(`Options change Image.`);
		this.setState({teamImage: croppedImage, croppedImage})
	};

	handleChange = name => event => this.setState({
		[name]           : event.target.value,
		[`${name}Length`]: event.target.value.length
	});

	handleChangeBoolean = name => event => {
		this.props.mixpanel.track(`Options prefers ${name}-> ${event.target.checked ? 'SI' : 'NO'}.`);
		this.setState({[name]: event.target.checked});
	};

	onClose = () => {
		const {OptionsStore, anchor} = this.props;
		if (OptionsStore.showModal) {
			OptionsStore.toggleShowModal();
		}
		OptionsStore.closeDrawer(anchor);
	};

	render() {
		const {classes, anchor} = this.props;
		const {showOnlyInitials, showText, showImages, croppedImage, gameVariant, teamName, teamImage, imagePlayersRadius, imageSubstitutesRadius, backgroundColor, playerFontSize, SubstitutesFontSize} = this.state;

		return (
			<div>
				<OptionalHeaderComponent anchor={anchor} onClick={this.onClose} title="Options"/>
				<Divider/>

				<form className={classes.form} noValidate autoComplete="off">

					<div className={classes.formContainer}>

						<FormControl className={classes.formControl}>
							<div className={classNames(classes.flex, classes.row)}>
								<Typography color="secondary">Background Color</Typography>
							</div>
							<ColorPickerComponent
								onColorSelected={color => this.setState({backgroundColor: color})}
								color={backgroundColor}
								defaultColor={DEFAULT_OPTIONS.backgroundColor}/>
						</FormControl>

						<Divider/>


						<FormControl className={classes.formControl}>
							<Typography color="secondary">Team Image</Typography>
							<CropperComponent
								image={croppedImage || teamImage}
								defaultImage={teamImage}
								onCrop={this.onCrop}/>

						</FormControl>

						<Divider/>

						<FormControl className={classes.formControl}>
							<Typography color="secondary">Game Variant</Typography>
							<Select
								value={gameVariant}
								onChange={this.handleChange('gameVariant')}
								inputProps={{
									name: 'game_variant',
								}}>
								<MenuItem disabled={true} value="default"><em>Select a variant</em></MenuItem>
								{Object.keys(GAME_VARIANTS).map((k, i) => (
									<MenuItem key={i} value={k}>{GAME_VARIANTS[k]}</MenuItem>))}
							</Select>
						</FormControl>

						<Divider/>

						<FormControl className={classes.formControl}>
							<Typography color="secondary">Team Name</Typography>
							<Input type="text" placeholder="Team Name"
								   defaultValue={teamName}
								   onChange={this.handleChange('teamName')}/>
						</FormControl>

						<Divider/>

						<FormControl className={classes.formControl}>
							<Typography color="secondary">Player Image Radius</Typography>
							<Input type="text"
								   placeholder="Radius"
								   defaultValue={imagePlayersRadius}
								   onChange={this.handleChange('imagePlayersRadius')}/>
						</FormControl>

						<Divider/>

						<FormControl className={classes.formControl}>
							<Typography color="secondary">Player FontSize</Typography>
							<Input type="text"
								   placeholder="Radius"
								   defaultValue={playerFontSize}
								   onChange={this.handleChange('playerFontSize')}/>
						</FormControl>

						<Divider/>

						<FormControl className={classes.formControl}>
							<Typography color="secondary">Substitutes Radius</Typography>
							<Input type="text"
								   placeholder="Radius"
								   defaultValue={imageSubstitutesRadius}
								   onChange={this.handleChange('imageSubstitutesRadius')}/>
						</FormControl>

						<Divider/>

						<FormControl className={classes.formControl}>
							<Typography color="secondary">Substitutes FontSize</Typography>
							<Input type="text"
								   placeholder="Radius"
								   defaultValue={SubstitutesFontSize}
								   onChange={this.handleChange('SubstitutesFontSize')}/>
						</FormControl>

						<Divider/>

						<FormControl className={classes.formControl}>
							<Typography color="secondary">Substitutes FontSize</Typography>
							<Input type="text"
								   placeholder="Radius"
								   defaultValue={SubstitutesFontSize}
								   onChange={this.handleChange('SubstitutesFontSize')}/>
						</FormControl>

						<FormControlLabel className={classes.formControlLabel}
										  control={
											  <Switch
												  checked={showText}
												  onChange={this.handleChangeBoolean('showText')}
												  value="showText"
												  color="primary"
											  />
										  }
										  label="Show Text"
						/>

						<FormControlLabel className={classes.formControlLabel}
										  control={
											  <Switch
												  checked={showImages}
												  onChange={this.handleChangeBoolean('showImages')}
												  value="showImages"
												  color="primary"
											  />
										  }
										  label="Show Images"
						/>

						<FormControlLabel className={classes.formControlLabel}
										  control={
											  <Switch
												  checked={showOnlyInitials}
												  onChange={this.handleChangeBoolean('showOnlyInitials')}
												  value="showImages"
												  color="primary"
											  />
										  }
										  label="Only Initials"
						/>

					</div>

					<Divider/>

					<Button color="primary"
							onClick={() => this.onSubmit()}>Save</Button>{' '}
					<Button color="secondary" onClick={() => this.onClose()}>Cancel</Button>

				</form>
			</div>
		);
	}

	componentWillUnmount() {
		this.setState({...DEFAULT_OPTIONS});
		this.onClose();
	}
}

export default OptionsComponent;
