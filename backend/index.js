const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8100"
};

app.use(cors(corsOptions));

// parse request of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true}));

const db = require("./models");
// normal use. Doesn't delete the database data
// db.sequelize.sync();

// In development, you may need to drop existing tables and re.sync database
db.sequelize.sync({ force: true}).then(() => {
    console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to cars application"});
});

require("./routes/cardex.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});