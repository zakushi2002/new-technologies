const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = 5000;
const {} = require("./controllers/postController");
const hbs = require("hbs"); // Import thư viện Handlebars
// Sử dụng body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Cấu hình Express để sử dụng Handlebars
app.set("view engine", "hbs");

// Đặt thư mục chứa các file view (templates)
app.set("views", __dirname + "/views");
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
const postReq = require("./routes/postsRoute");
// const commentReq = require("./routes/commentsRoute");
app.use("/", postReq);
// app.use("/", commentReq);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
