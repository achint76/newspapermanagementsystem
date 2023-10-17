
const fs = require('fs');
const models = require('../models')
const upload = require('../middleware/newspapermiddleware');
const { Op } = require('sequelize');

const handleMagazineUpload =async(req,res)=>{
    if (req.file && (req.userdata.user_type == "admin" || req.userdata.user_type == "sub-admin")) {
        const pdfPath = req.file.path;
        const data = req.body;
        const uploadpdf = await models.Magazine.create({
            title: data.title,
            description: data.description,
            publish_date: data.publish_date,
            pdf: pdfPath,
        });
        res.json({ message: 'magazine pdf created', data: uploadpdf });
    } else {
        res.status(500).send('magazine upload failed');
    }
}
    



const getMagazinePDF = async (req, res) => {
    if (req.userdata.user_type === "admin" || req.userdata.user_type === "sub-admin") {
        try {
            // Fetch magazines and order them by the publish_date in descending order
            const getpdf = await models.Magazine.findAll({
                order: [['publish_date', 'DESC']],
            });

            res.json({ message: 'Magazine pdf info', data: getpdf });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching magazine data', error: error.message });
        }
    } else {
        res.status(400).send("Unauthorized admin or sub-admin");
    }
};


const updateMagazinePDF = async(req,res)=>{
    if (req.file && (req.userdata.user_type == "admin" || req.userdata.user_type == "sub-admin")) {
        const uid = req.params.id;
        const pdfPath = req.file.path;
        const data = req.body;
        const updatedata = await models.Magazine.update({
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
    
    
    res.status(500).send('Magazine file updation failed');
}

    
// else
// res.status(400).send('file deletion failed');
// }
const deleteMagazinePDF = async (req, res) => {
    if (req.userdata.user_type == "admin" || req.userdata.user_type == "sub-admin"){
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        // First, retrieve the newspaper to get its PDF path
      const magazine = await models.Magazine.findByPk(id);

        if (!magazine) {
            return res.status(404).json({ message: 'Magazine not found' });
        }

        // Get the PDF file path from the newspaper object
        const pdfPath = magazine.pdf;

        // Delete the newspaper from the database
        const deleted = await models.Magazine.destroy({
            where: { id },
        });

        if (deleted === 1) {
            // Newspaper deleted successfully, now delete the associated PDF file
            fs.unlink(pdfPath, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error deleting PDF file', error: err.message });
                }
                res.status(200).json({ message: 'Magazine and associated PDF file deleted' });
            });
        } else {
            res.status(404).json({ message: 'No records were deleted' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete magazine', error: error.message });
    }
}else
res.status(400).send("Unauthorized admin or sub-admin");
};

const getMagazinePDFbydate = async (req, res) => {
    if (req.userdata.user_type === "admin" || req.userdata.user_type === "sub-admin") {
        try {
            const requestedDate = req.query.date; // Get the date from the query parameter
            console.log(requestedDate);
            // Check if the requested date is provided
            if (!requestedDate) {
                return res.status(400).json({ message: 'Date parameter is required' });
            }

            // Fetch magazines with the specified publish_date
            const getpdf = await models.Magazine.findAll({
                where: {
                    publish_date: new Date(requestedDate)
                },
                
            });
             console.log("DATA ISSSSSSSS", getpdf);
            res.json({ message: 'Magazine pdf info for the specified date', data: getpdf });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching magazine data', error: error.message });
        }
    } else {
        res.status(400).send("Unauthorized admin or sub-admin");
    }
};

module.exports = {
    handleMagazineUpload,
    getMagazinePDF,
    updateMagazinePDF,
    deleteMagazinePDF,
    getMagazinePDFbydate
};


