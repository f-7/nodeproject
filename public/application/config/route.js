const sessionChecker= require("./middleware");

module.exports=(app,express,mvc)=>{

    const autorizeMethod=['/registration','/logout','/dashboard','/admin/','/','/index.html','/about.html','/blog.html','/contact.html','/portfolio.html','/services.html'];
    

    app.get('*', function(req, res, next)
    {
        const route_name=req._parsedOriginalUrl.pathname;
 
      
        if(autorizeMethod.indexOf(route_name)>=0)
        {
            next();
        }else{
            let data={
                error:"Page is not found ..."
            }

            res.render('error/404.ejs',{data:data});
        }
    
     });
 


const base= require(mvc.controller+"index");
const login= require(mvc.controller+"login");
const dashboard= require(mvc.controller+"dashboard");
 
app.get("/",base.getHomepage);
app.get("/index.html",base.getHomepage);
app.get("/about.html",base.getAboutpage);
app.get("/blog.html",base.getBlogpage);
app.get("/contact.html",base.getContactpage);
app.get("/portfolio.html",base.getPortfoliopage);
app.get("/services.html",base.getServicespage);


//app.get("/admin",login.createNewUser); //create for new user;



//app.get("/logout",login.getlogOut);

 

app.get("/admin",sessionChecker,login.getLoginPage);
app.post("/admin",login.checkLogin);

app.get("/dashboard",sessionChecker,dashboard.getDashboard);

app.get("/registration",sessionChecker,dashboard.getRegistration);

app.post("/registration",sessionChecker,dashboard.createNewUser);

app.post("/registrationd",(req,res,next)=>{

    res.status(201).json({message:req.files.file });

});






















// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/admin/');
    } else {
        res.redirect('/admin/');
    }
});









}