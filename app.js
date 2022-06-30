const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
//const helpers = require('./helpers'); // for file type constraint

const port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
app.listen(port, () => console.log(`Listening on port ${port}...`));
app.get('/', function(req, res) {  
    res.sendFile(path.join(__dirname, '/index.html'));
});  
app.post('/upload-doc', (req, res) => {
    console.log("inside app file")
    let upload = multer({ storage: storage/*, fileFilter: helpers.imageFilter */}).single('doc');
 
    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        console.log("inside res")
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
          
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

       
     });
});
