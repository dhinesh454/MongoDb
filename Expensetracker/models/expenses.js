const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const expenseSchema = new Schema({
  amount:{
    type:Number,
    required:true
  },

  description:{
    type:String,
    required:true
  },

  category :{
    type:String,
    required:true
  },

  userId:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true
  }

});

const Expense = mongoose.model('Expense',expenseSchema);

module.exports = Expense;





















// const Sequelize=require('sequelize');

// const sequelize=require('../Utils/database');


// const Expense=sequelize.define('expense',{
//     id:
//     {
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true,
       
//     },

//     amount:Sequelize.INTEGER,
//     description:Sequelize.STRING,
//     category:Sequelize.STRING,
    
// });
// module.exports=Expense;