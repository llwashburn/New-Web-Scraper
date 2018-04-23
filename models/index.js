const mongoose = require("mongoose");
const CONNECTION_URI =
  process.env.MONGODB_URI || "mongod://localhost/New-Web-Scraper";

mongoose.Promise = Promise;

mongoose
  .connect(MONGODB_URI, {
    useMongoClient: true
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(err => console.log(err));
