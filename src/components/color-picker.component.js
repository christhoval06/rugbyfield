import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {SketchPicker} from 'react-color';

const styles = {
	color  : {
		width       : 100,
		height      : 14,
		borderRadius: 2,
	},
	swatch : {
		padding     : 5,
		background  : '#fff',
		borderRadius: 1,
		boxShadow   : '0 0 0 1px rgba(0,0,0,.1)',
		display     : 'inline-block',
		cursor      : 'pointer',
	},
	popover: {
		position: 'absolute',
		zIndex  : 2,
	},
	cover  : {
		position: 'fixed',
		top     : 0,
		right   : 0,
		bottom  : 0,
		left    : 0,
	}
};

@withStyles(styles)
class ColorPickerComponent extends Component {
	static propTypes = {
		classes        : PropTypes.object,
		onColorSelected: PropTypes.func.isRequired,
		color          : PropTypes.string.isRequired,
		defaultColor   : PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			displayColorPicker: false,
			color             : props.color,
			defaultColor      : props.defaultColor
		};
	}

	onClick = () => {
		this.setState({displayColorPicker: !this.state.displayColorPicker})
	};

	onClose = () => {
		this.setState({displayColorPicker: false})
	};

	onChange(color) {
		this.setState({color: color.hex});
		this.props.onColorSelected(color.hex);
	}

	render() {
		const {classes, className} = this.props;
		const {displayColorPicker, color} = this.state;
		return (
			<div className={classNames('color-picker-container', className)}>
				<div className={classes.swatch} onClick={this.onClick}>
					<div className={classes.color} style={{background: color}}/>
				</div>
				{displayColorPicker && (
					<div className={classes.popover}>
						<div className={classes.cover} onClick={this.onClose}/>
						<SketchPicker color={color} onChange={color => this.onChange(color)}/>
					</div>
				)}
			</div>
		);
	}
}

export default ColorPickerComponent;
