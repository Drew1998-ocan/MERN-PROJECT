require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");

// EXPRESS APP

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// ROUTES
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);


// CONNECTING TO THE DATABASE (MONGO DB)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen to the request
    app.listen(process.env.PORT, function () {
      console.log("running on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.error(error);
  });
