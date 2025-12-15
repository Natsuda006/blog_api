// const express = require("express")
// require("dotenv").config();
// const mongoose = require("mongoose");
// const cors = require("cors");
// const e = require("express");
// const PORT = process.env.PORT ;
// const DB_URL = process.env.DB_URL ;
// const BASE_URL = process.env.BASE_URL ;

// const UserRouter = require("./routers/user.router");
// const app = express();
// app.use(express.json());
// app.use(cors({ origin:BASE_URL, methods:["GET","POST","PUT","DELETE"] }));
// app.get("/", (req, res) => {
//     res.send("Welcome to the Blog API");
// });

// //connect to database
// if(!DB_URL){
//     console.error("DB_URL is missing Please set DB_URL in .env file");
// }else{
//     mongoose.connect(DB_URL)
//     .then(() => {
//         console.log("Connected to mongodb successfully");
//     }).catch((error) => {
//         console.error("MongoDB connection error", error.massage);
//     });
// }

// //user router
// app.use("/api/v1/user", UserRouter);

// app.listen(PORT,() => {
//     console.log("Server is running on http://localhost:" + PORT);
// });


const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const UserRouter = require("./routers/user.router");
const PostRouter = require("./routers/post.router");

const app = express();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

app.use(express.json());
app.use(cors()); // เปิดทั้งหมดก่อน

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API");
});

// connect to database
if (!DB_URL) {
  console.error("DB_URL is missing. Please set DB_URL in .env file");
} else {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connected to mongodb successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection error", error.message);
    });
}

// user router
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/post", PostRouter);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
