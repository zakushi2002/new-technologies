// Viết chương trình tạo object là Sinhvien có event là hoc, khi event được trigger, tùy theo tham số truyền vào sinh viên sẽ học chương trình tương ứng
const EventEmitter = require("events");

class Student extends EventEmitter {
  learn(subject) {
    this.on("learn", (subject) => {
      console.log(`I'm learning ${subject}.`);
    });
    this.emit("learn", subject);
  }
}
const student = new Student();
student.learn("New technologies in software engineering");

// const EventEmitter = require("events");
// const event = new EventEmitter();
// const student = {
//   learn(subject) {
//     console.log(`I'm learning ${subject}`);
//   },
//   hoc(mon) {
//     console.log(`Tôi đang học ${mon}`);
//   },
// };
// event.on("learn", function (subject) {
//   student.learn(subject);
// });
// event.on("hoc", function (mon) {
//   student.hoc(mon);
// });
// event.emit("learn", "Nodejs");
// event.emit("hoc", "Nodejs");
