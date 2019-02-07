module.exports=(app,express,mongoose)=>{
 

mongoose.connect('mongodb://localhost/frzdb');
const db =mongoose.connection;

db.on("error",(err)=>{
    console.log(err);
});
db.once("open",()=>{
    console.log("database connection successfully done!");
})

}