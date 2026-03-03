const express = require("express");
const dbConnect = require("./db/dbConnect");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/auth.route")
const productRoute = require("./routes/product.route")

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}))


app.use(express.json());
app.use(cookieParser());
dbConnect();


app.get("/", (req, res) => {
  res.send("server is Working!")
});

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);


module.exports = app;