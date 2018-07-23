const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const base64 = require('base64-img')
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const moment = require('moment');
const app = express();
const port = process.env.PORT || 5000;

app.use(fileUpload());
app.use(express.json());

// API calls
app.post('/api/submit', (req, res) => {

    console.log(req.body.campus);
    res.sendStatus(200);

    let cbm = '';
    const fileName = `${req.body.campus} ${moment().format('MM-DD-YY')}`

    switch(req.body.campus) {
        case 'Connect':
            cbm = 'creinoza'
            break;
        case 'East End':
            cbm = 'restrada'
            break;
        case 'Nexus':
            cbm = 'bsenegal'
            break;
        case 'North':
            cbm = 'dlinnell'
            break;
        case 'Northeast':
            cbm = 'aleonetti'
            break;
        case 'Sharpstown':
            cbm = 'gcruz'
            break;
        case 'Southeast':
            cbm = 'thefner'
            break;
        case 'Southwest':
            cbm = 'lhubbard'
            break;
        case 'Sunnyside':
            cbm = 'drivera'
            break;
        case 'Third Ward':
            cbm = 'rmalveaux'
            break;
        case 'West':
            cbm = 'gcastillo'
            break;
    }

    "Connect", "East End", "Nexus", "North", "Northeast", "Sharpstown", "Southeast", "Southwest", "Sunnyside", "Third Ward", "West"

    base64.img(req.body.image_data, '', fileName, function (err, filepath) {

        const doc = new PDFDocument
        console.log(fileName);

        doc.pipe(fs.createWriteStream(`./${fileName}.pdf`))
        doc.image(`${fileName}.jpg`, 32.5, 15, { height: 770 })
        doc.end()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kippopsform@gmail.com',
                pass: 'K!PpOp$form'
            }
        });

        const mailOptions = {
            sender: 'kippopsform@gmail.com',
            to: `${cbm}@kipphouston.org`,
            subject: 'KIPP Ops Form',
            text: 'A KIPP Ops Form has been submitted to you',
            attachments: [{
                filename: `${fileName}.pdf`,
                path: `./${fileName}.pdf`,
                contentType: 'application/pdf'
            }]
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) throw err

            fs.unlink(`${fileName}.jpg`, (err) => {

                fs.unlink(`./${fileName}.pdf`, (err) => {
                    res.sendStatus(200);

                });

            })

        });

    });

});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));