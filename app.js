const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schoolRoutes = require("./router/schoolRouter");
const DB = "mongodb+srv://root:root@tousif.ikbis15.mongodb.net/School?retryWrites=true&w=majority&appName=tousif";
const app = express();
app.use(bodyParser.json());

mongoose.connect(DB)
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error(err));

app.use("/", schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
console.log(`Server running on port ${PORT}`);
});
