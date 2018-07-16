import React, {Component} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Form from './components'

// download html2canvas and jsPDF and save the files in app/ext, or somewhere else
// the built versions are directly consumable
//import {html2canvas, jsPDF} from './ext';


export default class Export extends Component {

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 1);
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }

  render() {
    return (<div>
      <div className="mb5">
        <button onClick={this.printDocument}>Print</button>
      </div>
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
        <Form />
      </div>
    </div>);
  }
}
