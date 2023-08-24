const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const downloadSchema = new Schema({
    fileUrl:{
        type:String,
        required:true
    },
     
    createdAt:{
        type:Date,
        required:true
    },

    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const DownloadedFile = mongoose.model('DownloadedFile',downloadSchema)

module.exports = DownloadedFile;












// const Sequelize=require('sequelize');

// const sequelize=require('../Utils/database');

// const DownloadedFile = sequelize.define('file',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
    
//    url:Sequelize.STRING,
//    userId:Sequelize.INTEGER

// });

// module.exports = DownloadedFile;