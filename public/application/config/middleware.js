// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
    //console.log(req.session.usr);
    const route_name=req._parsedOriginalUrl.pathname;

    if (req.session.user && req.cookies.user_sid) {
        
            if(route_name=="/admin/")
            {
                res.redirect('/dashboard');
            }else
            { 
                 next();// res.redirect('/dashboard');
            }

    } else 
    {
        if(route_name=="/admin/")
        {
            next();
        }
        else{  
        res.redirect('/admin/');
        }
    }    
};
 

module.exports=sessionChecker;
