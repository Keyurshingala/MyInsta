import express from "express";
import  path  from "path";
// import multer from "multer";

const post = new express.Router()

// const upload = multer({ dest: '../images' })
// post.post('/post', upload.single('post'), async(req, res, next) => {
// // req.file is the `avatar` file
//     console.log(req.files)
//   // req.body will hold the text fields, if there were any
//     console.log(req.body);

//     res.send("upd")
// })

post.post('/post', function (req, res)  {
    let sampleFile;
    let uploadPath;


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.post;
    // uploadPath = __dirname + '../images/' + sampleFile.name;
    uploadPath = path.resolve("images").toString()+'\\' + sampleFile.name;
    console.log(uploadPath);

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });
});

export default post

