import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Form from './components'
import axios from 'axios'

// download html2canvas and jsPDF and save the files in app/ext, or somewhere else
// the built versions are directly consumable
//import {html2canvas, jsPDF} from './ext';


export default class Export extends Component {

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

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 1);

        var data = new FormData();
        data.append("image_data", imgData);
        /* const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf"); */
        axios.post('/api/submit', data).then((res) => {
          console.log(res);
      });
      });
  }

  render() {

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
              <input type="text" class="form-control" id='campusName' placeholder="Campus Name" onChange={this.handleInputChange} />
            </div>
            <div className='form-group col-sm-4'>
              <input type="text" class="form-control" id='schoolName' placeholder="School Name" onChange={this.handleInputChange} />
            </div>
            <div class='form-group col-sm-4'>
              <input type="text" class='form-control' id='roomNumber' placeholder="Room Number" onChange={this.handleInputChange} />
            </div>
          </div>

          <Form />

        </div>
        <button onClick={this.printDocument} className='btn btn-primary center'>Submit</button>

      </div>);

  }
}
