import React, { Component } from 'react';
import { Redirect } from 'react-router'
import html2canvas from 'html2canvas';
import ClassDaily from '../../components/ClassDaily';
import ClassWeekly from '../../components/ClassWeekly';
import OfficeAreas from '../../components/OfficeAreas';
import Restrooms from '../../components/Restrooms';
import CommonAreas from '../../components/CommonAreas';
import Comments from '../../components/Comments';
import items from '../../items.json';
import campus from '../../campus.json';

class Form extends Component {

    state = {
        teacherName: '',
        campusName: '',
        schoolName: '',
        roomNumber: '',
        message: 'Submit',
        redirect: false
    }

    handleCampusChange = (event) => {
        this.setState({campusName:event.target.value})
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    printDocument = () => {

        this.setState({ message: 'Submitting, please wait' })

        const input = document.getElementById('divToPrint');

        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/jpeg', 1);

                const data = new FormData();
                data.append("image_data", imgData);
                data.append("campus", this.state.campusName);

                fetch('/api/submit', {

                    method: 'POST',
                    body: data,

                }).then((res) => {
                    this.setState({ redirect: true })

                });

            });

    }

    render() {

        if (this.state.redirect) {
            return <Redirect to='/success' />;
        } else {

            return (

                <div>
                    <div id="divToPrint" className="mt4 container" style={{
                        backgroundColor: '#f5f5f5',
                        width: '210mm',
                        minHeight: '297mm',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        <h1 className='center'>Maintenance Form 2018-2019</h1>
                        <h3 className='center'>Please fill out all fields</h3>
                        <h4 className='center'>Check all items not addressed</h4>

                        <div class="form-row">
                            <div class="form-group col-sm-12">
                                <input type="text" class="form-control" id='teacherName' placeholder="Name" onChange={this.handleInputChange} />
                            </div>
                            <div className='form-group col-sm-4'>
                                <select class="form-control" id="campusName" onChange={this.handleCampusChange}>
                                    {campus.map(campus => (
                                        <option>{campus}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-group col-sm-4'>
                                <input type="text" class="form-control" id='schoolName' placeholder="School Name" onChange={this.handleInputChange} />
                            </div>
                            <div class='form-group col-sm-4'>
                                <input type="text" class='form-control' id='roomNumber' placeholder="Room Number" onChange={this.handleInputChange} />
                            </div>
                        </div>


                        <form>

                            <h6>Classroom (Daily)</h6>
                            <ClassDaily daily={items[0]} />

                            <h6>Classroom (Weekly)</h6>
                            <ClassWeekly weekly={items[1]} />

                            <h6>Office Areas</h6>
                            <OfficeAreas officeAreas={items[2]} />

                            <h6>Restrooms</h6>
                            <Restrooms restrooms={items[3]} />

                            <h6>Common Areas</h6>
                            <CommonAreas commonAreas={items[4]} />

                            <h6>Additional Comments</h6>
                            <Comments />

                        </form>

                    </div>
                    
                    <button onClick={this.printDocument} className='btn btn-primary center'>{this.state.message}</button>

                </div>
            )

        }
    }
}

export default Form;