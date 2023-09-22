const e = require("express");
const myGroup = require("../models/mygroup");
const error = { error: "Not valid" };
const apiMessage = { message: "Success" };

const getMyGroup = (req, res) => {
  res.status(200).json(myGroup);
};

const addMember = (req, res) => {
  const { id, name } = req.body;
  if (id && name) {
    if (myGroup.find((item) => item.id === id)) {
      res.status(200).json(error);
    }
    myGroup.push({ id, name });
    apiMessage.message = `Member added successfully.`;
    res.status(201).json(apiMessage);
  } else {
    res.status(400).json(error);
  }
};

const findById = (req, res) => {
  const id = Number(req.params.id);
  const member = myGroup.find((item) => item.id === id);
  if (member && id) {
    res.status(200).json(member);
  } else {
    res.status(404).json(error);
  }
};

const message = (req, res) => {
  const id = Number(req.params.id);
  const member = myGroup.find((item) => item.id === id);
  if (member && id) {
    res.send(`<html><body><ul><li>${member.name}</li></ul></body></html>`);
  } else {
    res.status(404).json(error);
  }
};

const messageAll = (req, res) => {
  res.send(
    `<html><body><ul>${myGroup
      .map((item) => `<li>${item.name}</li>`)
      .join("")}</ul></body></html>`
  );
};
module.exports = { getMyGroup, addMember, findById, message, messageAll };
