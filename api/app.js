"use strict";

// load modules
const express = require("express");
const morgan = require("morgan");
const db = require("./models/index");
const routes = require("./routes");

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// create the Express app
const app = express();
const cors = require("cors");

// setup morgan which gives us http request logging
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", routes);
app.use(
  cors({
    origin: "http://127.0.0.1:3000/",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

(async () => {
  try {
    // Test the connection to the database
    await db.sequelize.authenticate();
    console.log("Connection to the database successful!");
    // Sync the models
    console.log("Synchronizing the models with the database...");
    await db.sequelize.sync();
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();

// setup a friendly greeting for the root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!",
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set("port", process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
