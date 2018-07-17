const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const base64 = require('base64-img')
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const app = express();
const port = process.env.PORT || 5000;

app.use(fileUpload());
app.use(express.json());

// API calls
app.post('/api/submit', (req, res) => {

    console.log(req.body.campus);
    res.sendStatus(200);

    let cbm = '';

    switch(req.body.campus) {
        case 'Connect':
            cbm = 'creinoza'
            break;
        case 'North':
            cbm = 'dlinnell'
            break;
    }

    base64.img(req.body.image_data, '', 'form', function (err, filepath) {

        const doc = new PDFDocument

        doc.pipe(fs.createWriteStream('./form.pdf'))
        doc.image('form.jpg', 32.5, 15, { height: 770 })
        doc.end()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kippemailtest@gmail.com',
                pass: 'dallas1404'
            }
        });

        const mailOptions = {
            sender: 'dlinnell2@gmail.com',
            to: `${cbm}@kipphouston.org`,
            subject: 'KIPP Ops Form',
            text: 'A KIPP Ops Form has been submitted to you',
            attachments: [{
                filename: 'form.pdf',
                path: './form.pdf',
                contentType: 'application/pdf'
            }]
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) throw err

            fs.unlink('./form.jpg', (err) => {

                fs.unlink('./form.pdf', (err) => {
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