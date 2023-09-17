// Viết chương trình đọc nội dung file txt (tham số từ command line) và hiện nội dung file lên console
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "content.txt");
fs.readFile(filePath, { encoding: "utf8" }, (err, data) => {
  if (err) throw err;
  console.log(data);
});
