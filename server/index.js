const express = require("express");

const PORT = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("Test");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
