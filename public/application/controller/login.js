const user = require("../model/user");  
const msuper = require("../model/super");  
const bcrypt = require('bcrypt');


const saltRounds = 10;

const getLoginPage=(req,res,next) => 
{
    let base_url=req.protocol + '://' + req.get('host')+"/";

    
        const data={
            title:"Welcome to login", 
            base_url:base_url
        }
   
        
         res.render("admin_panel/login",{data:data});
}
 

const checkLogin=(req,res,next) => 
{

 

    let username=req.body.username;
    let password=req.body.password;

    msuper.getUserByUsername(username,(err,view)=>{
        


        if(err)
        {  
            return res.redirect('/admin/'); //res.status(201).json({message:err, });
         }
        else{
            
                if(isEmptyObject(view)!=false || err!=null || view==null)
                {
                    return res.redirect('/admin/');  //res.status(200).json({ message:"User not found !"});
                }
                else
                { 
                        bcrypt.compare(password, view.password, function(error, response) 
                        {
                                if(response)
                                {
                                    req.session.user = view; 
                                    return res.redirect('/dashboard'); 
                                    
                                }else{
                                    //return res.redirect('/admin/');  //res.status(200).json({ message: password not match !"});
                                    res.status(200).json({ message: error});
                                }	
                        });
            
 
                }
        }

         
          
      });



    
      
}


const getlogOut=(req,res,next) => 
{
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        return res.redirect('/admin/'); 
    } else {
        return res.redirect('/admin/'); 
    }
}
 
 









module.exports={
    getLoginPage, 
    checkLogin,
}
 

function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }