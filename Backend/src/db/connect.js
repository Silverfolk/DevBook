const mongoose = require("mongoose");

const ConnectDB= async () =>{
 await mongoose.connect(process.env.MONGO_URL).
then(()=>{
console.log("Database connection established");
}).catch((err)=>{
  console.log("error: " + err);
});
}
module.exports = ConnectDB;