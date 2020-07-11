const express = require("express");
const mongoose = require("mongoose");

const app = express();

const items = require("./routes/api/items");
//Middleware
app.use(express.json());
//app.use(bodyParser.json());

//DB CONFIG
const db = require("./config/keys").mongoURI;

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Monggo DB Connected"))
  .catch((err) => console.log(err));

//use routes
app.use("/api/items", items);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));