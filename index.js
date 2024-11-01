const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Net Eng 02 project. DabirRahmani");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("App listening on port 3000");
});
