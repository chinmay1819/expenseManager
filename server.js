const express = require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

// connecting to atlas
mongoose.connect("mongodb+srv://chinmay1819:c9403000981@cluster0.8j3na.mongodb.net/Exone",{useNewUrlParser: true},)

// creating a data schema
const expenseSchema= {
    reason : String,
    amount : Number
}

const e = mongoose.model("Expense",expenseSchema);


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})


app.post("/",function(req,res){
    let newe=new e({
        reason:req.body.reason,
        amount:req.body.amount
    });
    newe.save();
    res.redirect("/");
})

// for showing all expenses 
app.get("/allExpenditure",async(req,res)=>{
    let data=await e.find();
    res.send(data);
})


app.get("/getPurchase:id",async(req,res)=>{
    let data=await e.find({reason:"id"});
    res.send(data);

})

app.listen(3000,function(){
    console.log("Server is Running fine !");

})
