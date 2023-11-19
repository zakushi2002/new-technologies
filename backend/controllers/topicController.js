const Topic = require("../models/topic");
const ApiMessageDto = require("../dto/apiMessageDto");
const {
  TOPIC_ERROR_ID_EXISTED,
  TOPIC_ERROR_NOT_FOUND,
} = require("../dto/apiMessageDto");

const save = async (req, res) => {
  let apiMessageDto;
  const { topicName, major, description, createdBy } = req.body;
  const status = 0;

  if (!topicName || !major || !createdBy) {
    apiMessageDto = new ApiMessageDto(
      false,
      "Missing required fields",
      400,
      {}
    );
    res.status(400).json(apiMessageDto);
    return;
  }

  const topic = new Topic({ topicName, major, description, createdBy, status });

  await topic
    .save()
    .then(() => {
      apiMessageDto = new ApiMessageDto(
        true,
        "Topic created successfully",
        201,
        {}
      );
      res.status(201).json(apiMessageDto);
    })
    .catch((err) => {
      apiMessageDto = new ApiMessageDto(false, err.message, 500, {});
      res.status(500).json(apiMessageDto);
    });
};

const getTopics = async (req, res) => {
  let apiMessageDto;
  let topicList = {};

  await Topic.find()
    .populate("major")
    .then((topic) => {
      topicList = topic;
      apiMessageDto = new ApiMessageDto(true, "", 200, topicList);
      res.status(200).json(apiMessageDto);
    })
    .catch((err) => {
      apiMessageDto = new ApiMessageDto(false, err.message, 500, {});
      res.status(500).json(apiMessageDto);
    });
};
module.exports = {
  save,
  getTopics,
};
