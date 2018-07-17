const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const base64 = require('base64-img')
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 5000;

app.use(fileUpload());
app.use(express.json());

// API calls
app.post('/api/submit', (req, res) => {

    base64.img(req.body.image_data, '', 'form', function (err, filepath) {

        fs.readFile("./form.jpg", function (err, data) {

            if (err) throw err

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'kippemailtest@gmail.com',
                    pass: 'dallas1404'
                }
            });

            const mailOptions = {
                sender: 'dlinnell2@gmail.com', // sender address
                to: 'dlinnell@kipphouston.org', // list of receivers
                subject: 'Test', // Subject line
                body: 'Test',
                attachments: [{ 'filename': 'form.jpg', 'content': data }]
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) throw err

                fs.unlink('./form.jpg', (err) => {
                    res.sendStatus(200);

                })

            });

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