// Viết chương trình sử dụng module http (không dùng các thư viện khác, Express, ....) để xây dựng webserver với các yêu cầu sau:
// - Tên file <MSSV>.js

// - Web server thực thi ở port 5000

// - Web server có 3 endpoint / và /<MSSV>/<id>, /message/<id>

// - Chương trình khởi tạo danh sách mygroup có 1 item là {id: <MSSV>, name:<Họ Tên Sinh Viên>}

// - Xuất data cho mỗi endpoint:

//     + /  : xuất ra tất cả thông tin trong mygroup dạng json

//     + /<MSSV>/<id> : nếu POST thì add item mới vào mygroup, item post dạng json, item phải là MSSV của thành viên nhóm trong đề tài cuối kỳ và chưa có trong danh sách mygroup. Nếu item không thỏa mãn yêu cầu thì xuất ra "Not valid"

//                            nếu GET thì nhận <id> và trả về thông tin tương ứng, thông tin trả về dạng json, nếu không có trả về {error:'not valid'}

//     + /message/<id>: chỉ nhận giao thức GET, trả về dạng html theo form: <html><body><ul><li> <Họ Tên sinh viên></li></ul></body></html>. Nếu không có <id> thì trả về tên tất cả sinh viên trong mygruop, nếu không có thì trả về text "Not valid"

const http = require("node:http");
const port = 5000;
let mygroup = [
  { id: 20110420, name: "Nguyễn Huỳnh Thanh Toàn" },
  { id: 20110354, name: "Bùi Ngọc Ánh" },
  { id: 20110374, name: "Trần Minh Gia Khánh" },
];
let error = { error: "not valid" };
const server = http.createServer((req, res) => {
  const { method, url } = req;
  let [_, __, id] = url.split("/");
  if (method === "GET") {
    if (url === "/") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(mygroup));
    } else if (url === `/message/${id}`) {
      id = parseFloat(id);
      res.writeHead(200, { "Content-Type": "text/html" });
      if (typeof id === "number" && id) {
        const member = mygroup.find((item) => item.id === id);
        if (member) {
          res.end(`<html><body><ul><li>${member.name}</li></ul></body></html>`);
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify(error));
        }
      } else {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify(error));
      }
    } else if (url === "/message") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `<html><body><ul>${mygroup
          .map((item) => `<li>${item.name}</li>`)
          .join("")}</ul></body></html>`
      );
    } else {
      error.error = "Method not allowed";
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify(error));
    }
  } else if (url === `/MSSV/${id}`) {
    id = parseFloat(id);
    if (typeof id === "number" && id) {
      const member = mygroup.find((item) => item.id === id);
      if (member) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(member));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify(error));
      }
    } else {
      error.error = "Bad request";
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify(error));
    }
  } else if (method === "POST") {
    if (url === `/MSSV`) {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        const { id, name } = JSON.parse(body);
        if (id && name) {
          if (mygroup.find((item) => item.id === id)) {
            error.error = "id already exists";
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(error));
          } else {
            mygroup.push({ id, name });
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end("Member added successfully.");
          }
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify(error));
        }
      });
    } else {
      error.error = "Method not allowed";
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify(error));
    }
  } else {
    error.error = "Not found";
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(error));
  }
});
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`http://localhost:${port} or http://127.0.0.1:${port}`);
  console.log(`Using Postman to test the server`);
  console.log(`Press Ctrl+C to quit.`);
});
