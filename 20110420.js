// Sinh viên viết chương trình parse nội dung file csv dữ liệu covid-19 từ link: https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports
// Chương trình cần xuất ra số lượng ca mắc covid (Confirmed), số ca tử vong (Deaths) và số ca khỏi bệnh (Recovered) trong 1 khoảng thời gian  của 1 quốc gia. Chương trình chạy console có dạng: node <MSSV>.js <start_date> <end_date> <country>
// Trong đó:
// - start_date, end_date có định dạng dd-mm-yyyy
// - country là string tên quốc gia, nếu không nhập country thì xuất ra tất cả. Nếu tên quốc gia có khoảng cách thì thay khoảng cách thành dấu _ trong tham số country
// Data có thể đọc trực tiếp trên link github hoặc lưu trong thư mục data cùng cấp với file <MSSV>.js
// Chương trình xuất ra 3 con số <Confirmed> <Deaths> <Recovered>  trên cùng 1 dòng, cách nhau 1 khoảng cách và không có bất kỳ thông tin nào khác
const fs = require("fs");
const https = require("https");
const csv = require("csv-parser");
const path = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports`;
const startDate = process.argv[2];
const endDate = process.argv[3];
const country = process.argv[4] ? process.argv[4].replace("_", " ") : null;

function getData(pathURL) {
  return new Promise((resolve, reject) => {
    https
      .get(pathURL, (res) => {
        let data = ``;
        res.on(`data`, (chunk) => {
          data += chunk;
        });
        res.on(`end`, () => {
          resolve(data);
        });
      })
      .on(`error`, (err) => {
        reject(err);
      });
  });
}

async function processData() {
  const splitStart = startDate.split("-");
  const spliteEnd = endDate.split("-");
  let start = new Date(splitStart[2], splitStart[1] - 1, splitStart[0]);
  start.setHours(start.getHours() + 7); // Thêm 7 giờ để lấy đúng ngày
  const end = new Date(spliteEnd[2], spliteEnd[1] - 1, spliteEnd[0]);
  end.setHours(end.getHours() + 7);
  const numberOfDays = (end - start) / 86400000 + 1; // Số ngày cần lấy dữ liệu
  let confirmedTotal = 0;
  let deathsTotal = 0;
  let recoveredTotal = 0;

  for (let i = 0; i < numberOfDays; i++) {
    if (i === 0) {
      start.setDate(start.getDate());
    } else {
      start.setDate(start.getDate() + 1);
    }
    const formatDate = convertToFormatDate(start);

    let data = await getData(`${path}/${formatDate}.csv`);
    // console.log(`${path}/${formatDate}.csv`);
    let records = [];
    fs.writeFileSync(`./${formatDate}.csv`, data); // Lưu dữ liệu xuống file tạm thời
    fs.createReadStream(`./${formatDate}.csv`)
      .pipe(csv())
      .on("data", (row) => {
        records.push(row);
      })
      .on("end", () => {
        let confirmed = 0;
        let deaths = 0;
        let recovered = 0;
        for (let record of records) {
          if (record["Country_Region"] === country) {
            // console.log(record);
            let c = parseInt(record["Confirmed"]);
            let d = parseInt(record["Deaths"]);
            let r = parseInt(record["Recovered"]);
            // Kiểm tra dữ liệu có rỗng hay không
            if (isNaN(c)) c = 0;
            if (isNaN(d)) d = 0;
            if (isNaN(r)) r = 0;
            confirmed += c;
            deaths += d;
            recovered += r;
          }
        }
        // console.log(`${confirmed} ${deaths} ${recovered}`);
        confirmedTotal += confirmed;
        deathsTotal += deaths;
        recoveredTotal += recovered;

        fs.unlinkSync(`./${formatDate}.csv`); // Xóa file tạm thời
      });
  }
  // Delay 2s để đợi dữ liệu được lấy về
  setTimeout(function () {
    console.log(`${confirmedTotal} ${deathsTotal} ${recoveredTotal}`);
  }, 2000);
}

// Convert date to format mm-dd-yyyy
function convertToFormatDate(dateFormat) {
  const pad = (v) => v.padStart(2, `0`);
  let file = dateFormat
    .toLocaleDateString("nl-NL")
    .split(/[-/]/)
    .map(pad)
    .join("-");
  const toFragments = (dateString) => dateString.split(/[-/]/).map(pad);
  const dateTo_mmddyyyy = ([date, month, year], divider = "-") =>
    `${month}${divider}${date}${divider}${year}`;
  return dateTo_mmddyyyy(toFragments(file));
}

processData();
