const express = require("express");
const mongoose = require("mongoose");

const app = express();
const path = require("path");
const items = require("./routes/api/items");
const persons = require("./routes/api/persons");
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
app.use("/api/persons", persons);

//serve static assets when on PRODUCTION
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static()("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
