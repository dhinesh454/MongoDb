

const Expense=require('../models/expenses');
const User=require('../models/user');
const s3Services=require('../services/S3service')
const DownloadedFile=require('../models/downloadfile');








///string validation use this for post get functions in controller
const isstringinvalid=(string)=>
{
   if(string== undefined ||string.length===0) 
   {
      return true;
   }
   else 
   {
      return false;
   }

}





///post expense

const addexpense=async(req,res,next)=>{
   // const t=await sequelize.transaction();
    try {
      const {amount,description,category}=req.body;
      console.log(amount,description,category);
      console.log('userId>>>>>>',req.user._id)

      if(isstringinvalid(amount.toString())||isstringinvalid(description)||isstringinvalid(category)){
          return res.status(400).json({message:"something missing",success:false})
      }
     
      const data=await Expense.create({amount,description,category,userId:req.user._id});
      const totalExpense=Number(req.user.totalExpenses)+Number(amount);

      console.log(totalExpense);

      await User.updateOne({_id:req.user._id},{totalExpenses:totalExpense});

  ////whenever we commit then only save the details if on has error its not work
         // await t.commit();
      res.status(201).json({newExpense:data,success:true});
  
    }catch(error){
      //   await t.rollback()  ///abort the transcation 
        res.status(500).json({error,success:false})
        console.log(JSON.stringify(error));
    }
    
  }
  
  
 
  



  ///get expense
  const getexpense=async(req,res,next)=>{
  
     try {

      const check =req.user.ispremiumuser;
      const page=+req.query.page||1;
      const pageSize= +req.query.pageSize||10;
     

        // Count total expenses for the user
      const totalExpenses = await Expense.countDocuments({ userId: req.user._id });

          // Retrieve expenses with pagination
      const data = await Expense.find({ userId: req.user._id })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ _id: -1 });
       
      res.status(200).json({
         allExpenses: data,
         currentPage: page,
         hasNextPage: pageSize * page < totalExpenses,
         nextPage: page + 1,
         hasPreviousPage: page > 1,
         previousPage: page - 1,
         lastPage: Math.ceil(totalExpenses / pageSize) 
      })
     
     } catch (error) {

        console.log(error);
        res.status(500).json({error,success:false})
        console.log(JSON.stringify(error));
        
     }
  }
  
  
  







  //delete expense 
  const deleteExpense=async(req,res,next)=>{

         const expenseId=req.params.id;
         console.log(expenseId);

     if(expenseId==undefined||expenseId==null||expenseId==''){
         console.log('Id is Missing');
         return res.status(400).json({message:"ID missing",success:false})
     }
   
  try {
         console.log(expenseId);
         const expenses=await Expense.findById(expenseId);
         console.log('ExpenseDeleted'); 
         console.log(expenses);
         
         const totalExpense=Number(req.user.totalExpenses)-Number(expenses.amount)

         await Expense.deleteOne({_id:expenseId,userId:req.user._id});
         console.log("total",totalExpense);

      //   req.user.totalExpenses = totalExpense;
      //   await req.user.save({ transaction: t });
         await User.updateOne({_id:req.user._id},{totalExpenses:totalExpense})
      

         res.sendStatus(200);
         console.log(`successfully deleted  ${expenseId}`);
     
  } catch (error) {

         res.status(500).json({error,success:false})
         console.log(JSON.stringify(error));
  }
  
  }



  ///download 
const downloadexpense=async(req,res)=>{
try {
     
      // const expense=await Expense.findAll({where:{userId:req.user.id}});
      const expenses=await Expense.find({UserId:req.user._id})


      const stringifiedExpenses=JSON.stringify(expenses);
      const filename=`Expense${req.user._id}/${new Date()}.txt`
      //parameters data &filename
      const fileUrl=await s3Services.uploadToS3(stringifiedExpenses,filename);
      console.log(fileUrl);
      
      await DownloadedFile.create({
         fileUrl:fileUrl,
         createdAt:new Date(),
         userId:req.user._id
       });
      res.status(200).json({fileUrl,success:true})   
} catch (error) {
       console.log(error);
       res.status(500).json({fileUrl:"",success:false,error})
}


}

  module.exports={
   addexpense,
   getexpense,
   deleteExpense,
   isstringinvalid,
   downloadexpense
   
  }

