// Sinh viên xây dựng 1 blog đơn giản với các chức năng:

// - Post bài viết

// - Xem các bài viết đã post

// + Danh sách các bài post (trang index)

// + Chi tiết 1 bài post (có các comments)

// - Xóa bài post

// - Sửa 1 bài post

// - Comment vào bài viết

// Yêu cầu:

// - Sử dụng express, hbs template

// - Data được lưu trong 1 mảng, khi restart webserver sẽ mất data, bài post có 1 ID riêng

// - Tổ chức theo mô hình MVC

// - Sử dụng view có template hbs

// - Kết hợp được nhiều thành phần về CSS, javascript (jQuery) sẽ được điểm cộng
const express = require("express");
const app = express(); // app express
const port = 5000; // port
const hostname = `localhost` || `127.0.0.1`; // hostname
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");
const articleRouter = require("./routes/articleRouter");
const mainRouter = require("./routes/app");
const configViewEngine = require("./config/viewEngine");
configViewEngine(app);

app.use((req, res, next) => {
  const date = new Date();
  const time = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log(`${req.method} ${req.url} ${time}`);
  next();
});
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.get("/", mainRouter);
app.use("/articles", articleRouter);
app.use("/v1/post", postRouter);
app.use("/v1/comment", commentRouter);
app.listen(port, hostname, () => {
  console.log(`Server listening on port ${port}!\nhttp://${hostname}:${port}`);
});
