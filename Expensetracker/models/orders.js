const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    paymentid:String,
    orderid:String,
    status:String,
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})



const Order = mongoose.model('Order',orderSchema);

module.exports = Order;










// const Sequelize=require('sequelize');

// const sequelize=require('../Utils/database');

// const Order=sequelize.define('order',{

//     id:
//     {
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true,
        
//     },
//     paymentid:Sequelize.STRING,
//     orderid:Sequelize.STRING,
//     status:Sequelize.STRING,

// });

// module.exports=Order;