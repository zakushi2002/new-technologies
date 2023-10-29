const Account = require("../models/account");
const bcrypt = require("bcrypt");
const ApiMessageDto = require("../dto/apiMessageDto");
const { generateId } = require("../services/idGenerator");
const save = async (req, res) => {
  const { fullName, email, password, phone, address } = req.body;
  if (!fullName || !email || !password || !phone || !address) {
    res.status(400).json({ message: "Missing required fields!" });
    return;
  }
  const apiMessageDto = new ApiMessageDto();
  const hashPassword = await bcrypt.hash(password, 10);
  const newAccount = new Account({
    fullName,
    email,
    phone,
    address,
  });
  newAccount.id = generateId();
  newAccount.password = hashPassword;
  newAccount.avatar = "default-avatar.png";

  const error = newAccount.validateSync();
  if (error) {
    res.status(400).json({ message: error });
    return;
  }
  await newAccount.save();
  apiMessageDto.setMessage("Create account successfully!");
  apiMessageDto.setData(newAccount.id.toString());
  res.status(201).json(apiMessageDto);
};

module.exports = { save };
