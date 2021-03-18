require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to db
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => {
  console.log("Connected to Database");
});

// routes
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

module.exports = app;
