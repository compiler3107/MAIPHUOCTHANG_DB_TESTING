const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const router = require("./routers/index");

dotenv.config();
const app = express();
const port = 8080;

//Connect database
// mongoose.connect((process.env.MONGODB_URL), ()=>{
//     console.log('Connect to Mongodb')
// })
mongoose.connect(process.env.MONGODB_URL);

app.use(express.static("image"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("combined"));

app.get("/", (req, res) => res.send("Hello"));

//Route init
router(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
