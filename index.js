const express = require("express");
const app = express();
const urlRouter = require("./routes/url");
const { connectToMongoDB } = require("./connection");
const path = require("path");
const { URL } = require("./models/url");
const staticRouter = require('./routes/staticRouter')

const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/url-shortner").then(() => {
  console.log(`Mongo DB Connected`);
});
////middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}))

//// EJS for SSR
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
////routes
app.use("/url", urlRouter);
// app.get('/:shortid')
app.use("/test", staticRouter);

////server connection
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
