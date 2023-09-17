// Viết chương trình sử dụng Nodejs chạy trên command line thực hiện các phép toán Cộng, Trừ, Nhân, Chia. Các tham số được nhập từ command line: +,-,*,/ tương ứng với 4 phép toán, sau đó là nhập 2 số a và b. Chương trình hiện kết quả trên console.
const a = parseFloat(process.argv[3]);
const b = parseFloat(process.argv[4]);
const operator = process.argv[2];
switch (operator) {
  case "+":
    console.log(a + b);
    break;
  case "-":
    console.log(a - b);
    break;
  case "*":
    console.log(a * b);
    break;
  case "/":
    if (b === 0) {
      console.log("Cannot divide by zero");
    } else {
      console.log(a / b);
    }
    break;
  default:
    console.log("Invalid operator");
    break;
}
