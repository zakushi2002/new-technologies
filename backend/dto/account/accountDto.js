class AccountDto {
  constructor(account) {
    this.id = account._id;
    this.name = account.fullName;
    this.email = account.email;
    this.kind = account.kind;
    this.avatar = account.avatar;
    this.status = account.status;
    this.createdDate = account.createdAt;
    this.updatedDate = account.updatedAt;
  }
}

module.exports = AccountDto;
