// Viết chương trình sử dụng module express để xây dựng webserver với các yêu cầu sau:
// - Sinh viên push toàn bộ code (theo folder) lên github
// - Tên folder của project <MSSV>, ví dụ sinh viên 19110090 thì tên folder gốc là 19110090
// - Chương trình tổ chức theo kiến trúc MVC với các folder: controllers, views, models, routes, file thực thi chính là index.js
// - Web server thực thi ở port 5000
// - Web server có 3 endpoint / và /<MSSV>/<id>, /message/<id>
// - Chương trình khởi tạo danh sách mygroup có 1 item là {id: <MSSV>, name:<Họ Tên Sinh Viên>}, mygroup phải đặt trong models
// - Xuất data cho mỗi endpoint:
//     + /  : xuất ra tất cả thông tin trong mygroup dạng json
//     + /<MSSV>/<id> : nếu POST thì add item mới vào mygroup, item post dạng json, item phải là MSSV của thành viên nhóm trong đề tài cuối kỳ và chưa có trong danh sách mygroup. Nếu item không thỏa mãn yêu cầu thì xuất ra "Not valid"
//                            nếu GET thì nhận <id> và trả về thông tin tương ứng, thông tin trả về dạng json, nếu không có trả về {error:'not valid'}
//     + /message/<id>: chỉ nhận giao thức GET, trả về dạng html theo form: <html><body><ul><li> <Họ Tên sinh viên></li></ul></body></html>. Nếu không có <id> thì trả về tên tất cả sinh viên trong mygruop, nếu không có thì trả về text "Not valid"
// - Controller xử lý cho <MSSV>, index (endpoint /) và message
// - Sử dụng route của express để chọn controller phù hợp
// - Viết hàm log để hiện thị ra console chi tiết giao thức POST hay GET, url là gì

const express = require("express");
const app = express(); // app express
const port = 5000; // port
const hostname = `localhost` || `127.0.0.1`; // hostname
const myGroupRouter = require("./routes/myGroupRouter");

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
app.use(express.json());
app.use(myGroupRouter);

app.listen(port, hostname, () => {
  console.log(`Server listening on port ${port}!\nhttp://${hostname}:${port}`);
});
