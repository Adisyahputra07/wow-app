require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
// port
const port = 5000;
const router = require("./src/routes");

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/", router);

app.listen(port, () => console.log(`listen on port ${port}`));
