const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forgotpasswordSchema = new Schema({
    active:{
        type:Boolean
    },

    expiresby:{
        type:Date
    },

    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const ForgotPassword = mongoose.model('ForgotPassword',forgotpasswordSchema);

module.exports = ForgotPassword;

















const Sequelize=require('sequelize');
const sequelize=require('../Utils/database');

const Forgotpassword=sequelize.define('forgotpassword',{
    id:{
        type:Sequelize.UUID,
        allowNull:false,
        primaryKey:true
    },

    active:Sequelize.BOOLEAN,

    expiresby:Sequelize.DATE,

   
})

module.exports=Forgotpassword;
