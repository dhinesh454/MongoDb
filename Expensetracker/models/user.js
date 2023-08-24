
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
     },

     phonenumber:{
        type:Number,
        required:true
     },

     ispremiumuser:{
        type:Boolean
     },

     totalExpenses:{
        type:Number,
        default:0
     }
})

const User = mongoose.model('User',userSchema);

module.exports = User;























// const Sequelize=require('sequelize');
// const sequelize=require('../Utils/database')

// const User=sequelize.define('user',{

//     id:
//     {
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true,
//         unique:true
//     },
//     name:
//     {
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     email:
//     {
//         type:Sequelize.STRING,
//         unique:true,
//         allowNull:false,

//     },
//     phonenumber:
//     {
//         type:Sequelize.STRING,
//         unique:true,
//         allowNull:false
//     },
//     password:
//     {
//      type:Sequelize.STRING,
//      allowNull:false   
//     },
//     ispremiumuser:
//     {
//         type:Sequelize.BOOLEAN,
     
//     },
//     totalExpenses:
//     {
//         type:Sequelize.INTEGER,
//         defaultValue:0
//     }
    

// });

// module.exports=User;
