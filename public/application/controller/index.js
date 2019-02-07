const msuper = require("../model/super");  
const saltRounds = 10;
 


const getHomepage=(req,res,next) => 
{
     

    msuper.getLatestNews((err,view)=>{
			
        const data={
            title:"Welcome page",
            page_name:"home",
            news:view
        }

        
         res.render("index",{data:data});
          
      },3);



    

}

const getAboutpage=(req,res,next) => 
{
     
    const data={
        title:"About | frzf7 ",
        page_name:"about"
    }

     res.render("index",{data:data});

}




const getBlogpage=(req,res,next) => 
{
     
    const data={
        title:"My blog",
        page_name:"blog"
    }

     res.render("index",{data:data});

}



const getContactpage=(req,res,next) => 
{
     
    const data={
        title:"Contact information",
        page_name:"contact"
    }

     res.render("index",{data:data});

}


const getPortfoliopage=(req,res,next) => 
{
     
    const data={
        title:"Portfolio info",
        page_name:"portfolio"
    }

     res.render("index",{data:data});

}

const getServicespage=(req,res,next) => 
{
     
    const data={
        title:"Services",
        page_name:"services"
    }

     res.render("index",{data:data});

}








module.exports={
    getHomepage,
    getAboutpage,
    getBlogpage,
    getContactpage,
    getPortfoliopage,
    getServicespage, 
}


/*


var idata={
        title: "Hellow kori makho tel na hole tipe dibo tomar cotbel",
        image:"test_img.png",
        details:"ami doctor tipedhor halo kori makho tel payment saro"
    }


    msuper.insertNews(idata,(err,data)=>{
					 
        if(err)
        {  
            res.status(201).json({
                message:err, 
            }); 
        }
       else{
                console.log(data); 
       }

    })

    */
