// const express = require('express');
// const multer = require('multer');
// const app = express();

// const upload = multer({
//     storage: multer.diskStorage({
//         destination: function(req,file,cb)
//         {
//             cb(null,"uploads")
//         },
//         filename: function(req,file,cb)
//         {
//             cb(null, file.fieldname + "-"+ Date.now()+ ",pdf")
//         }
//     })
// }).single("newspaper_pdf")
// app.post("/upload", upload, (req,res) => {
//     res.send("file upload");
// });
// module.exports = {
//     createNewspaper :  async function(req,res){

// //     }
// // }

const models = require('../models')
const upload = require('../middleware/newspapermiddleware');
const handleFileUpload =async(req,res)=>{
    if (req.file) {
        const pdfPath = req.file.path;
        const data = req.body;
        const uploadpdf = await models.Newspaper.create({
            title: data.title,
            description: data.description,
            publish_date: data.publish_date,
            pdf: pdfPath,
        });
        res.json({ message: 'pdf created', data: uploadpdf });
    } else {
        res.status(500).send('File upload failed');
    }
}
    



const getPDF = async(req,res)=>{
   // getfile(req,res,async function(error){
       // return res.status(500).send('File GET failed');
       // const pdfPath = req.file.path;
       // res.status(200).json({ message: 'PDF file uploaded successfully', data:pdfPath });
        // const uploadpdf = await models.Newspaper.create({
            
        // })
        //console.log(req.text,"AAAAAAAAAAAAAAA");
        //const data = req.body;
       // console.log("DATADATADATA", data.title);
        const getpdf = await models.Newspaper.findAll();
            // title: data.title,
            // description: data.description,
            // publish_date: data.publish_date,
            // pdf: pdfPath 
        //})
        res.json({message: 'pdf created', data: getpdf})
   // })
    
};

module.exports = {
    handleFileUpload,
    getPDF
};


