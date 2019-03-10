import React, { Component } from 'react';
import PropTypes from 'prop-types'

import "react-day-picker/lib/style.css";
import DayPicker from 'react-day-picker';

import "./calendar.css";

class Calendar extends Component {

  render() {
		let modifiers;

		modifiers = {
			completed: this.props.completed,
			incomplete: this.props.incomplete,
		};

    return (
				<div>
					<DayPicker modifiers={modifiers} />
				</div>
    );
  }
}

Calendar.propTypes = {
	completed: PropTypes.array.isRequired,
	incomplete: PropTypes.array.isRequired
}

export default Calendar;
