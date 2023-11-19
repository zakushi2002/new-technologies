const AccountDto = require("../account/accountDto");
const MajorDto = require("../major/majorDto");
class LecturerDto {
  constructor(lecturer) {
    this.id = lecturer._id;
    this.lectureId = lecturer.lectureId;
    this.faculty = lecturer.faculty;
    this.majorId = new MajorDto(lecturer.majorId);
    this.account = new AccountDto(lecturer.accountId);
  }
}

module.exports = LecturerDto;
