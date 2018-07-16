const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const base64Img = require('base64-img');
const pdfmake = require('pdfmake');
const app = express();
const port = process.env.PORT || 5000;

app.use(fileUpload());
app.use(express.json());

// API calls
app.post('/api/submit', (req, res) => {
    console.log(req.body)
    res.send({data:'hello'});
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));