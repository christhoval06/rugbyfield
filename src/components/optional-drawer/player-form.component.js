import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import ArrowForward from '@material-ui/icons/ArrowForward';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';

import {
	DEFAULT_FIELD,
	DEFAULT_PLAYER,
	PLAYER_GROUP_BACKS,
	PLAYER_GROUP_FORDWARDS,
	PLAYER_POSITIONS,
	PLAYER_SUBSTITUTE,
	POSITION_IN_GROUP_BACKS
} from '../../constants/players';

const styles = theme => ({
	button              : {
		margin: theme.spacing.unit,
	},
	formContainer       : {
		display      : 'flex',
		width        : '100%',
		flexDirection: 'column'
	},
	toolbar             : theme.mixins.toolbar,
	centered            : {
		display       : 'flex',
		justifyContent: 'center',
		alignItems    : 'center',
	},
	ended               : {
		display       : 'flex',
		justifyContent: 'center',
		alignItems    : 'flex-end',
	},
	textField           : {
		width: '100%',
	},
	formControl         : {
		margin: theme.spacing.unit,
	},
	lengthInputAdornment: {
		color   : '#bbb',
		fontSize: 14
	},
	InputEditMode       : {
		display   : 'flex',
		alignItems: 'center',
		padding   : '5px 24px'
	},
	InputEditModeText   : {
		flex          : 1,
		display       : 'flex',
		justifyContent: 'left',
		alignItems    : 'center',
	},
	InputEditModeButton : {
		display       : 'flex',
		justifyContent: 'center',
		alignItems    : 'center',
	}
});

@withStyles(styles)
@inject('OptionsStore', 'PlayersStore')
@observer
class PlayerFormComponent extends Component {
	static propTypes = {
		classes     : PropTypes.object,
		OptionsStore: PropTypes.object,
		PlayersStore: PropTypes.object,
		onSubmit    : PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		const {PlayersStore} = this.props;
		let {name, number, position, image} = DEFAULT_PLAYER;

		if (PlayersStore.editMode) {
			name = PlayersStore.selectedPlayer.name;
			number = `${PlayersStore.selectedPlayer.number}`;
			position = PlayersStore.selectedPlayer.position;
		}

		this.state = {
			name,
			number,
			position    : position || 'default',
			error       : props.error,
			openPosition: false,
			nameLength  : (name || '').length,
			numberLength: (number || '').length,
			fromIsValid : false,
			editName    : false,
			editPosition: false,
			editNumber  : false,
		};
	}

	// componentWillMount() {
	// 	const {PlayersStore} = this.props;
	// 	let {name, number, position, image} = DEFAULT_PLAYER;
	//
	// 	if (PlayersStore.editMode) {
	// 		name = PlayersStore.selectedPlayer.name;
	// 		number = `${PlayersStore.selectedPlayer.number}`;
	// 		position = PlayersStore.selectedPlayer.position;
	// 	}
	//
	// 	return {error, name, number, position: };
	//
	// }

	getPositionValueVariant = (attr) => {
		const {OptionsStore} = this.props;
		if (typeof attr !== 'object') {
			return attr;
		}
		return attr[OptionsStore.gameVariant];
	};
	getPlayerPositionValue = (key, value, find) => {
		const position = PLAYER_POSITIONS.find(p => p[key] === value);
		const toFind = position[find];
		return this.getPositionValueVariant(toFind);
	};

	_getPlayerPosition = e => {
		const position = e.target.value;
		if (position === PLAYER_SUBSTITUTE) return this.setState({position});
		this.setState({
			position,
			number: this.getPlayerPositionValue('short', position, 'number'),
		});
	};

	_getPlayerPositionName = () => this.getPlayerPositionValue('short', this.state.position, 'name');

	_onSubmit = () => {
		const {onSubmit} = this.props;
		const {name, number, position} = this.state;
		onSubmit({
			name,
			number: parseInt(number, 10),
			position,
			group : POSITION_IN_GROUP_BACKS.includes(position) ? PLAYER_GROUP_BACKS : PLAYER_GROUP_FORDWARDS
		});
	};

	handleChange = name => event => {
		this.setState({
			[name]           : event.target.value,
			[`${name}Length`]: event.target.value.length
		});
	};

	render() {
		const {OptionsStore, PlayersStore, classes} = this.props;
		const {error, name, number, position, nameLength, numberLength, editName, editPosition, editNumber} = this.state;

		const editMode = PlayersStore.editMode;
		console.log('position', position);
		return (
			<div className={classes.formContainer}>
				{position === PLAYER_SUBSTITUTE && (
					<FormControl className={classes.formControl} error={error && error.attribute === 'number'}>
						<Typography color="secondary">Number</Typography>
						{(editMode && !editNumber) && (
							<div className={classNames(classes.toolbar, classes.InputEditMode)}>
								<Typography className={classes.InputEditModeText}>{number}</Typography>
								<IconButton className={classes.InputEditModeButton}
											onClick={() => this.setState({editNumber: true})}>
									<Edit/>
								</IconButton>
							</div>
						)}
						{(!editMode || editNumber) && (
							<div className={classNames(classes.toolbar, classes.textField, classes.ended)}>
								<TextField
									className={classes.textField}
									defaultValue={number}
									onChange={this.handleChange('number')}
									error={error && (error.attribute === 'number')}
									helperText={error && (error.attribute === 'number') ? error.message : 'Player Number. Example: 6'}
									margin="normal"
									inputProps={{
										name     : 'name',
										maxLength: DEFAULT_FIELD.numberMaxLength
									}}
									InputProps={{
										endAdornment:
											<InputAdornment className={classes.lengthInputAdornment}
															position="end">{DEFAULT_FIELD.numberMaxLength - numberLength}</InputAdornment>,
									}}
									fullWidth={true}/>
							</div>)
						}
					</FormControl>)}

				<Divider/>

				<FormControl className={classes.formControl} error={error && (error.attribute === 'name')} required>
					<Typography color="secondary">Full Name</Typography>
					{(editMode && !editName) && (
						<div className={classNames(classes.toolbar, classes.InputEditMode)}>
							<Typography className={classes.InputEditModeText}>{name}</Typography>
							<IconButton className={classes.InputEditModeButton}
										onClick={() => this.setState({editName: true})}>
								<Edit/>
							</IconButton>
						</div>
					)}
					{(!editMode || editName) && (
						<div className={classNames(classes.toolbar, classes.textField, classes.ended)}>
							<TextField
								className={classes.textField}
								defaultValue={name}
								error={error && (error.attribute === 'name')}
								helperText={error && (error.attribute === 'name') ? error.message : 'Player Name. Example: C BARBA'}
								onChange={this.handleChange('name')}
								margin="normal"
								inputProps={{
									name     : 'name',
									maxLength: DEFAULT_FIELD.nameMaxLength,
								}}
								InputProps={{
									endAdornment:
										<InputAdornment className={classes.lengthInputAdornment}
														position="end">{DEFAULT_FIELD.nameMaxLength - nameLength}</InputAdornment>,
								}}
								fullWidth={true}/>
						</div>)
					}
				</FormControl>

				<Divider/>

				<FormControl className={classes.formControl} error={error && error.attribute === 'position'}>
					<Typography color="secondary">Position</Typography>
					{(editMode && !editPosition) && (
						<div className={classNames(classes.toolbar, classes.InputEditMode)}>
							<Typography
								className={classes.InputEditModeText}>{this._getPlayerPositionName()}</Typography>
							<IconButton className={classes.InputEditModeButton}
										onClick={() => this.setState({editPosition: true})}>
								<Edit/>
							</IconButton>
						</div>
					)}
					{(!editMode || editPosition) && (
						<div className={classNames(classes.toolbar, classes.textField, classes.ended)}>
							<TextField
								select
								helperText={error && (error.attribute === 'position') ? error.message : 'Player Position. Example: Lock'}
								className={classes.textField}
								error={error && (error.attribute === 'position')}
								value={position}
								onChange={this._getPlayerPosition}
								inputProps={{name: 'position'}}>
								<MenuItem disabled={true} value="default"><em>Select a position</em></MenuItem>
								{PLAYER_POSITIONS.filter(p => p.game_variants.includes(OptionsStore.gameVariant)).map((p, i) => (
									<MenuItem key={i}
											  value={p.short}>{this.getPositionValueVariant(p.name)}</MenuItem>))}
							</TextField>
						</div>)
					}
				</FormControl>

				<Divider/>

				<div className={classNames(classes.toolbar, classes.centered)}>
					<Fab color="primary" aria-label="add" className={classes.button}
						 onClick={this._onSubmit}>
						<ArrowForward/>
					</Fab>
				</div>
			</div>
		);
	}
}

export default PlayerFormComponent;
