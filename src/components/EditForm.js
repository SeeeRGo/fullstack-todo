import React from 'react'

class EditForm extends React.Component {
	render() {
		return (
			<form onSubmit={this.props.handleSubmit}>
				<input type="text" name="title" />
				<input type="text" name="body" />
				<button>Submit</button>
			</form>
			)
	}
}

export default EditForm