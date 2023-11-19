const Account = require("../models/account");
const Lecturer = require("../models/lecturer");
const LecturerDto = require("../dto/lecturer/lecturerDto");
const ApiMessageDto = require("../dto/apiMessageDto");
const { ACCOUNT_KIND_LECTURER } = require("../constant/constant");
const { findAccountByEmail } = require("./accountController");
const {
  ACCOUNT_ERROR_EMAIL_EXISTED,
  LECTURER_ERROR_LECTURER_ID_EXISTED,
  LECTURER_ERROR_NOT_FOUND,
} = require("../dto/errorCode");
/**
 * Create and save a new lecturer account
 */
const createLecturer = async (req, res) => {
  let apiMessageDto;
  const {
    fullName,
    lecturerId,
    birthdate,
    faculty,
    majorId,
    phone,
    address,
    email,
    avatar,
  } = req.body;

  if (
    !fullName ||
    !email ||
    !avatar ||
    !lecturerId ||
    !birthdate ||
    !faculty ||
    !majorId ||
    !phone ||
    !address ||
    !email ||
    !avatar
  ) {
    apiMessageDto = new ApiMessageDto(
      false,
      "Missing required fields!",
      400,
      {}
    );
    res.status(400).json();
    return;
  }
  let newAccount = await findAccountByEmail(email);
  if (newAccount) {
    apiMessageDto = new ApiMessageDto(
      false,
      "Email existed!",
      ACCOUNT_ERROR_EMAIL_EXISTED,
      {}
    );
    res.status(400).json(apiMessageDto);
    return;
  }
  let newLecturer = await findByLecturerId(lecturerId);
  if (newLecturer) {
    apiMessageDto = new ApiMessageDto(
      false,
      "LecturerId existed!",
      LECTURER_ERROR_LECTURER_ID_EXISTED,
      {}
    );
    res.status(400).json(apiMessageDto);
    return;
  }
  newAccount = new Account({
    fullName,
    email,
    avatar,
    birthdate,
    phone,
    address,
  });
  newAccount.kind = ACCOUNT_KIND_LECTURER;

  let error = newAccount.validateSync();
  if (error) {
    apiMessageDto = new ApiMessageDto(false, error, 400, {});
    res.status(400).json(apiMessageDto);
    return;
  }
  await newAccount
    .save()
    .then((doc) => {
      newAccount = doc;
    })
    .catch((err) => {
      console.error(err);
    });
  newLecturer = new Lecturer({
    accountId: newAccount._id,
    lecturerId,
    faculty,
    majorId,
  });
  await newLecturer
    .save()
    .then((doc) => {
      console.log(doc);
      apiMessageDto = new ApiMessageDto(
        true,
        "Create Lecturer account successfully!",
        201,
        doc._id
      );
      res.status(201).json(apiMessageDto);
    })
    .catch((err) => {
      console.error(err);
    });
};

const findByLecturerId = async (lecturerId) => {
  let lecturerFound;
  await Lecturer.findOne({ lecturerId: lecturerId })
    .then((lecturer) => {
      lecturerFound = lecturer;
    })
    .catch((err) => {
      console.error(err);
    });
  return lecturerFound;
};

const getLecturer = async (req, res) => {
  let apiMessageDto = new ApiMessageDto();
  let lecturer;
  await Lecturer.findOne({ _id: req.params.id })
    .populate("accountId")
    .populate("majorId")
    .then((doc) => {
      lecturer = doc;
    })
    .catch((err) => {
      lecturer = null;
      console.error(err);
    });
  if (!lecturer) {
    apiMessageDto = new ApiMessageDto(
      false,
      "Lecturer not found!",
      LECTURER_ERROR_NOT_FOUND,
      lecturer
    );
    res.status(404).json(apiMessageDto);
    return;
  }
  apiMessageDto = new ApiMessageDto(
    true,
    "Lecturer found!",
    200,
    new LecturerDto(lecturer)
  );
  res.status(200).json(apiMessageDto);
};

const findAll = async (req, res) => {
  let apiMessageDto;
  let lecturers = [];
  await Lecturer.find({})
    .populate("accountId")
    .populate("majorId")
    .then((doc) => {
      doc.forEach((lecturer) => {
        lecturers.push(new LecturerDto(lecturer));
      });
    })
    .catch((err) => {
      apiMessageDto = new ApiMessageDto(false, err, 500, {});
      res.status(500).json(apiMessageDto);
    });
  apiMessageDto = new ApiMessageDto(
    true,
    "List lecturer successfully!",
    200,
    lecturers
  );
  res.status(200).json(apiMessageDto);
};

const getAllLecturers = async (req, res) => {
  let apiMessageDto = new ApiMessageDto();
  let lecturer;
  await Lecturer.find({})
    .populate("accountId")
    .populate("majorId")
    .then((doc) => {
      lecturer = doc;
    })
    .catch((err) => {
      lecturer = null;
      console.error(err);
    });
  if (!lecturer) {
    apiMessageDto = new ApiMessageDto(
      false,
      "Lecturer not found!",
      LECTURER_ERROR_NOT_FOUND,
      lecturer
    );
    res.status(404).json(apiMessageDto);
    return;
  }
  apiMessageDto = new ApiMessageDto(true, "Lecturer found!", 200, lecturer);
  res.status(200).json(apiMessageDto);
};
module.exports = { createLecturer, getLecturer, getAllLecturers, findAll };
