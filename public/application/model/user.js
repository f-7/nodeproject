var mongoose = require("mongoose");
 var validator =require("validator");
 
 
 const userSchema= new mongoose.Schema({
	username : {
		type : String,
		required : true,	
		minlength: 3
	},
	 email : {
		  type :String,
		  required :true,
		   unique : true,
		  validate:{
			  validator: validator.isEmail,
			  message: '{VALUE} is not a valid email',
			  isAsync: false
			}
	  },
	  password : {
		  type :String,
		  required :true, 
	  },
crated : {
		type : Date,
	    required : true,
		default : Date.now
},	  
status : {
	type : Number,
	required : true,
	default : "1"
}		
	 
	 
 } );
 
 
 
 const userProfileSchema= new mongoose.Schema({
	
	user_id : {
		type : String,
		required : true,	
		minlength: 5
	},
	full_name : {
		type : String,
		required : true,	
		minlength: 3
	},
	mobile : {
		type : String,
		required : true,	
		minlength: 3
	},
	gender : {
		type : Number,
		required : true, 
	},
	 image : {
		  type :String, 
	  },
	present_address : {
		type :String, 
	},
	permanent_address : {
		type :String, 
	},

	 
 });


let users=mongoose.model("users",userSchema);
let profile=mongoose.model("users_profile",userProfileSchema);
 
 
  module.exports.insertUser=(data,callback)=>{

	
	 users.create(data,callback); 
	  
  }
  
  module.exports.insertProfile=(data,callback)=>{
	profile.create(data,callback); 	 
 }