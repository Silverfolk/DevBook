const express = require("express");
require("dotenv").config();

const ConnectDB=require('./db/connect');//fetching the function to make connection btw application and database 

const app = express();
var cors = require("cors");

const mainrouter=require("./routes/api/mainrouter")


app.use(cors());
app.use(express.json());
// after this i'll make a central file for routing 
app.use("/api", mainrouter);



//Port and Connect to DB
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL);
    ConnectDB();
    app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
      console.log("error =>", error);
  }
};
start();