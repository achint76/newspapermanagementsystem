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
const fs = require('fs');
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

const updatePDF = async(req,res)=>{
    if(req.file){
        const uid = req.params.id;
        const pdfPath = req.file.path;
        const data = req.body;
        const updatedata = await models.Newspaper.update({
            title: data.title,
            description: data.description,
            publish_date: data.publish_date,
            pdf: pdfPath
        }, {
            where :{
                id: uid
            }
        });
        res.json({message: 'updated', data: updatedata});
    }
    else
    
    
    res.status(500).send('file updation failed');
}

// const deletePDF = async(req,res)=> {
//     const uid = req.params.id;
//    // const newspaper = await models.Newspaper.findByPk(id);
//     const deletedata = await models.Newspaper.destroy({
//         where: {
//             id: uid
//         }
//     })
//     console.log(deletedata,"DELEETDATAAAAA");
//     console.log(deletedata.pdf,"PDFPDFPDFPDFP");
//     if(deletedata){
//         fs.unlink(pdfPath, (err) => {
//             if(err)
//             return res.status(500).json({ message: 'Error deleting PDF file', error: err.message });
//             res.status(200).json({message: 'data deleted', data: deletedata})
//         });
//     }
    
// else
// res.status(400).send('file deletion failed');
// }
const deletePDF = async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        // First, retrieve the newspaper to get its PDF path
      const newspaper = await models.Newspaper.findByPk(id);

        if (!newspaper) {
            return res.status(404).json({ message: 'Newspaper not found' });
        }

        // Get the PDF file path from the newspaper object
        const pdfPath = newspaper.pdf;

        // Delete the newspaper from the database
        const deleted = await models.Newspaper.destroy({
            where: { id },
        });

        if (deleted === 1) {
            // Newspaper deleted successfully, now delete the associated PDF file
            fs.unlink(pdfPath, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error deleting PDF file', error: err.message });
                }
                res.status(200).json({ message: 'Newspaper and associated PDF file deleted' });
            });
        } else {
            res.status(404).json({ message: 'No records were deleted' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete newspaper', error: error.message });
    }
};
module.exports = {
    handleFileUpload,
    getPDF,
    updatePDF,
    deletePDF
};


