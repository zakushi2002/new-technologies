const express = require("express");
const path = require("path");
const app = express(); // app express
const port = 5000; // port
const hostname = `localhost` || `127.0.0.1`; // hostname

// console.log(__dirname); // path of current directory
// config template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// config static folder (public - css, js, img)
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, hostname, () => {
  console.log(`Server listening on port ${port}!\nhttp://${hostname}:${port}`);
});
