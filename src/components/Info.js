import React, { Component } from 'react';

class Info extends Component {

    state = {
        teacherName: '',
        campusName: '',
        schoolName: '',
        roomNumber: ''
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div class="form-row">
                <div class="form-group col-sm-12">
                    <input type="text" class="form-control" id='teacherName' placeholder="Name" onChange={this.handleInputChange} />
                </div>
                <div className='form-group col-sm-4'>
                    <input type="text" class="form-control" id='campusName' placeholder="Campus Name" onChange={this.handleInputChange} />
                </div>
                <div className='form-group col-sm-4'>
                    <input type="text" class="form-control" id='schoolName' placeholder="School Name" onChange={this.handleInputChange} />
                </div>
                <div class='form-group col-sm-4'>
                    <input type="text" class='form-control' id='roomNumber' placeholder="Room Number" onChange={this.handleInputChange} />
                </div>
            </div>
        )
    }

}

export default Info