const Account = require("../models/account");
const AccountDto = require("../dto/account/accountDto");
const bcrypt = require("bcrypt");
const ApiMessageDto = require("../dto/apiMessageDto");
const {
  ACCOUNT_ERROR_NOT_FOUND,
  ACCOUNT_ERROR_EMAIL_EXISTED,
} = require("../dto/errorCode");
const { ACCOUNT_KIND_ADMIN } = require("../constant/constant");

/**
 * Create and save a new admin account
 */
const createAdmin = async (req, res) => {
  let apiMessageDto;
  const { fullName, email, password, avatar } = req.body;
  if (!fullName || !email || !password || !avatar) {
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
  const hashPassword = await bcrypt.hash(password, 10);
  newAccount = new Account({
    fullName,
    email,
    avatar,
  });
  newAccount.password = hashPassword;
  newAccount.kind = ACCOUNT_KIND_ADMIN;

  let error = newAccount.validateSync();
  if (error) {
    apiMessageDto = new ApiMessageDto(false, error, 400, {});
    res.status(400).json(apiMessageDto);
    return;
  }
  await newAccount
    .save()
    .then((account) => {
      console.log(account);
      apiMessageDto = new ApiMessageDto(
        true,
        "Create account successfully!",
        201,
        account._id
      );
      res.status(201).json(apiMessageDto);
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 * Find an account by its email
 */
const findAccountByEmail = async (email) => {
  let accountByEmail;
  await Account.findOne({ email: email })
    .then((account) => {
      accountByEmail = account;
    })
    .catch((err) => {
      console.error(err);
    });
  return accountByEmail;
};

/**
 * Find an account by its id
 */
const getAccount = async (req, res) => {
  let apiMessageDto = new ApiMessageDto();
  let account;
  await Account.findOne({ _id: req.params.id })
    .then((doc) => {
      account = doc;
    })
    .catch((err) => {
      account = null;
      console.error(err);
    });
  if (!account) {
    apiMessageDto = new ApiMessageDto(
      false,
      "Account not found!",
      ACCOUNT_ERROR_NOT_FOUND,
      {}
    );
    res.status(404).json(apiMessageDto);
    return;
  }
  apiMessageDto = new ApiMessageDto(
    true,
    "Get Account successfully!",
    200,
    new AccountDto(account)
  );
  res.status(200).json(apiMessageDto);
};

/**
 * Find an account then update information as {fullName, avatar}
 */
const updateAdmin = async (req, res) => {
  let apiMessageDto;
  const { id, fullName, avatar } = req.body;
  if ((!id, !fullName || !avatar)) {
    apiMessageDto = new ApiMessageDto(
      false,
      "Missing required fields!",
      400,
      {}
    );
    res.status(400).json(apiMessageDto);
    return;
  }

  let account;
  await Account.findOne({ _id: id })
    .then((doc) => {
      account = doc;
    })
    .catch((err) => {
      console.error(err);
    });

  if (!account) {
    apiMessageDto = new ApiMessageDto(
      false,
      "Account not found!",
      ACCOUNT_ERROR_NOT_FOUND,
      {}
    );
    res.status(404).json(apiMessageDto);
    return;
  }
  await Account.findOneAndUpdate(
    { _id: id },
    { fullName: fullName, avatar: avatar },
    { new: true, runValidators: true }
  )
    .then((account) => {
      apiMessageDto = new ApiMessageDto(
        true,
        "Update successfully!",
        200,
        account._id
      );
      res.status(200).json(apiMessageDto);
    })
    .catch((err) => {
      console.error(err);
    });
};

const deleteById = async (req, res) => {
  let apiMessageDto;
  let account;
  await Account.findOne({ _id: req.params.id })
    .then((doc) => {
      account = doc;
    })
    .catch((err) => {
      console.error(err);
    });
  if (!account) {
    apiMessageDto = new ApiMessageDto(
      false,
      "Account not found!",
      ACCOUNT_ERROR_NOT_FOUND,
      {}
    );
    res.status(404).json(apiMessageDto);
    return;
  }
  await Account.deleteOne({ _id: req.params.id })
    .then((account) => {
      apiMessageDto = new ApiMessageDto(
        true,
        "Delete successfully!",
        200,
        account._id
      );
      res.status(200).json(apiMessageDto);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  createAdmin,
  getAccount,
  updateAdmin,
  deleteById,
  findAccountByEmail,
};
