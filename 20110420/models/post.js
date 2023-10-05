const postList = [
  {
    id: 1,
    title: "Xây dựng blog đơn giản sử dụng ExpressJS với HBS template",
    createdDate: new Date(),
    content: `Sinh viên xây dựng 1 blog đơn giản với các chức năng:
        - Post bài viết

        - Xem các bài viết đã post
        
        + Danh sách các bài post (trang index)
        
        + Chi tiết 1 bài post (có các comments)
        
        - Xóa bài post
        
        - Sửa 1 bài post
        
        - Comment vào bài viết
        Yêu cầu:

        - Sử dụng express, hbs template

        - Data được lưu trong 1 mảng, khi restart webserver sẽ mất data, bài post có 1 ID riêng

        - Tổ chức theo mô hình MVC

        - Sử dụng view có template hbs

        - Kết hợp được nhiều thành phần về CSS, javascript (jQuery) sẽ được điểm cộng
        `,
    author: "Toan",
  },
];

let sequenceId = postList.length + 1;

module.exports = { postList, sequenceId };
