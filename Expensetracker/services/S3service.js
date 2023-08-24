const AWS = require('aws-sdk');





  //uploadtos3
  const  uploadToS3=(data,filename)=>{
    const BUCKET_NAME='dhinesh-expensetracker'; ///always use process.env 
    const IAM_USER_KEY=process.env.S3BUCKET_ACCESS_KEY;
    const IAM_USER_SECRET=process.env.S3BUCKET_SECRET_KEY;
    
    let s3bucket=new AWS.S3({
     accessKeyId: IAM_USER_KEY,
     secretAccessKey: IAM_USER_SECRET,
     // bucket: BUCKET_NAME
    })


  
       var params={
        Bucket:BUCKET_NAME,
        Key:filename,
        Body:data,
        ACL:'public-read'
       }
     
       
       return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,result)=>{
           if(err){
              console.log('Something Went Wrong',err);
              reject(err)

           }
           else{
              console.log('success',result);
              resolve(result.Location)
              
           }
          })

       })


}
  module.exports={uploadToS3}


