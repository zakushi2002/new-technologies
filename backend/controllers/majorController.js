const Major = require("../models/major");
const ApiMessageDto = require("../dto/apiMessageDto");
const {
  MAJOR_ERROR_NOT_FOUND,
  MAJOR_ERROR_ID_EXISTED,
} = require("../dto/errorCode");

/**
 * Create and save a new major
 * //TODO: consider lecturerId
 */
const save = async (req, res) => {
  let { id, majorName, lecturerId } = req.body;
  if (!majorName || !id) {
    res.status(400).json({ message: "Missing required fields!" });
    return;
  }
  const apiMessageDto = new ApiMessageDto();
  const newMajor = new Major({
    id,
    majorName,
  });

  const error = newMajor.validateSync();
  const isMajorExist = await isMajorExisted(id);
  console.log(isMajorExist ? "true" : "false");
  if (error) {
    res.status(400).json({ message: error });
    return;
  } else if (!isMajorExist) {
    await newMajor.save();
    apiMessageDto.setMessage("Create major successfully!");
    apiMessageDto.setData(newMajor.id.toString());
    res.status(201).json(apiMessageDto);
  } else {
    apiMessageDto.setCode(MAJOR_ERROR_ID_EXISTED);
    apiMessageDto.setMessage("Major's Id existed");
    apiMessageDto.setResult(false);
    res.status(400).json(apiMessageDto);
  }
};

const isMajorExisted = async (id) => {
  let foundMajor;
  await Major.findOne({
    id: id,
  })
    .then((major) => {
      foundMajor = major;
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
  console.log(foundMajor);
  return foundMajor ? true : false;
};

/**
 * Find a Major by its id
 */
const findMajorById = async (req, res) => {
  const id = req.params.id;
  let foundMajor = {};
  let apiMessageDto;

  await Major.findOne({
    id: id,
  })
    .then((major) => {
      foundMajor = major;
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });

  if (foundMajor) {
    apiMessageDto = new ApiMessageDto(true, "", 200, foundMajor);
    res.status(200).json(apiMessageDto);
  } else {
    apiMessageDto = new ApiMessageDto(false, "Major not found", 404, {});
    res.status(404).json(apiMessageDto);
  }
};

/**
 * Find a major then update information as {majorName, lecturerId}
 */
const editMajor = async (req, res) => {
  const { id, majorName, lecturerId } = req.body;
  let edittedMajor = {};
  let apiMessageDto;

  if (!id || !majorName) {
    res.status(400).json({ message: "Missing required fields!" });
    return;
  }
  edittedMajor = {
    id: id,
    majorName: majorName,
  };
  if (lecturerId) edittedMajor.lecturerId = lectureId;

  await Major.findOneAndUpdate(
    {
      id: id,
    },
    edittedMajor,
    {
      new: true,
      runValidators: true,
    }
  )
    .then((doc) => {
      apiMessageDto = new ApiMessageDto(
        true,
        "Edit Major successfully",
        200,
        {}
      );
      res.status(200).json(apiMessageDto);
    })
    .catch((err) => {
      apiMessageDto = new ApiMessageDto(
        false,
        "Edit Major unsuccessfully",
        500,
        {}
      );
      res.status(500).json(apiMessageDto);
      console.error(err);
    });
};

module.exports = { save, findMajorById, editMajor };
