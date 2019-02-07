const user = require("../model/user");  
const msuper = require("../model/super");  
var multer = require('multer');
var path = require('path');
const bcrypt = require('bcrypt');

 


var limits = { fileSize: 10 * 1024 * 1024 }
const saltRounds = 10;

const getDashboard=(req,res,next) => 
{
    let base_url=req.protocol + '://' + req.get('host')+"/";

    
        const data={
            title:"Welcome to login", 
            base_url:base_url,
            page_name:"subpage/dashboard",
            s_data:req.session.user
        }
 
        
         res.render("admin_panel/index",{data:data});
}
  


const getRegistration=(req,res,next) => 
{
    let base_url=req.protocol + '://' + req.get('host')+"/";

    
        const data={
            title:"Welcome to login", 
            base_url:base_url,
            page_name:"subpage/registration",
            s_data:req.session.user
        }
 
        
         res.render("admin_panel/index",{data:data});
}
  




const createNewUser=(req,res,next) => 
{    
   
   
    let user_data={
        username: req.body.username,
        password:req.body.password,
        email:req.body.email,
    }

    let profile_data={
        full_name: req.body.username,
        mobile: req.body.username,
        gender:req.body.gender,
        present_address: req.body.present_address,
        permanent_address: req.body.permanent_address, 
    }

  

     
                    user_image_upload(req,res,(err)=>{
                        if(err){
                            res.status(201).json({message:err, });
                        }else{
                            
                        var image_file_name="";    
                                if(req.file == undefined)
                                {
                                     res.status(201).json({message:"no file", });
                                }else{
                                // res.status(201).json({message:req.file.filename, });    
                                image_file_name=req.file.filename;
                                }

                                res.status(201).json({message:req.body, });
 
                                bcrypt.hash(user_data.password,saltRounds,(err,hash)=>{
                                    user_data['password']=hash    ;    
                
 
                                            user.insertUser(user_data,(err,data)=>{
                                                            
                                                    if(err)
                                                    {  
                                                         
                                                     res.status(201).json({message:err, });
                                                    }
                                                    else
                                                    {
                    
                                                        profile_data['user_id']=data._id;
                                                        profile_data['image']=image_file_name;
                    
                                                        user.insertProfile(profile_data,(err,data)=>{
                    
                    
                                                            let base_url=req.protocol + '://' + req.get('host')+"/";
                                                            const cdata={
                                                                title:"Welcome to login", 
                                                                base_url:base_url
                                                            }
                                                            res.render("admin_panel/login",{data:cdata});
                    
                    
                                                        })
                                                            
                                                    }
                    
                                                })
                
                                        });
 
                                         

                        }

                    }) 
                    


 

 
}



/*----------------------- user image upload------------------------*/

// file storage engine

const user_image_upload_storage = multer.diskStorage({
destination:'./public/ducument/user_img/',
filename: (req,file,cb)=>{
    cb(null,req.session.user._id+"_userimage"+".png");
}

})

// init upload file
const user_image_upload = multer({
    storage:user_image_upload_storage,
    limits:{fileSize:1000000},
    fileFilter:(req,file,cb)=>{     
        checkImgFileType(file,cb);
    }
}).single('user_image');
 

/*------------------------------- user image uplaod colse-----------------------------*/

 // check file type
 function checkImgFileType(file,cb)
 {
     
    const filetypes = /jpeg|jpg|png|gif/;
    const extname= filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null,true);
    }else{
        return cb('Images only');
    }

 }

 
 



module.exports={
    getDashboard, 
    getRegistration, 
    createNewUser,
}
 