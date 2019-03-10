import React, { Component } from 'react';
import { Button, TextField, FormGroup } from '@material-ui/core';

import PropTypes from 'prop-types'
import uuid from 'uuid'

class AddTask  extends Component {
	constructor(){
		super();
		this.state = {
			newTask: {
				name: "",
				id: uuid.v4(),
				done: false
			}
		}
	}

	handleSubmit(e){
		// We pass in the event and prevent it's submission.
		if(this.state.newTask.name === ''){
			alert("Please add a name");
		} else {
			this.props.addTask(this.state.newTask);

			this.setState({
				newTask: {
					name: "",
					id: uuid.v4(),
					done: false
				}
			});
		}
		e.preventDefault();
	}

	handleChange(e) {
		this.setState({ 
			newTask: {
				name: e.target.value,
				id: uuid.v4(),
				done: false
			}
		});
  }

  render() {
    return (
			<form onSubmit={this.handleSubmit.bind(this)}>
				<FormGroup>
          <TextField
						value={this.state.newTask.name}
						onChange={this.handleChange.bind(this)}
            label="Enter Task"
          />
					<br/>
					<Button type="submit" color="primary" variant="contained" value="Add">Add</Button>
					<br/>
				</FormGroup>
      </form>
    );
  }
}

AddTask.propTypes = {
	addTask: PropTypes.func.isRequired
}

export default AddTask;
