var mongoose = require("mongoose");
var soalt=10;

const latestNewsSchema= new mongoose.Schema({
        title : {type : String,},
        image : {type :String, },
        details : {type :String, },
        crated : {type : Date, },	  
        status : {type : Number, }		
    
	  });
 
 
 let news=mongoose.model("latest_news",latestNewsSchema);

 module.exports.insertNews=(data,callback)=>{
    collection.create(data,callback); 
     
 }


 module.exports.getLatestNews = (callback,limit="")=>{
    limit=(limit)?parseInt(limit, soalt):"";
    mongoose.model('latest_news').find(callback).limit(limit);
}


module.exports.checkValidUser = (username,password,callback)=>{
 
   mongoose.model('users').findOne({username:username,password:password},callback);
}
 
module.exports.getUserByUsername = (username,callback)=>{
 
   mongoose.model('users').findOne({username:username},callback);
}
 